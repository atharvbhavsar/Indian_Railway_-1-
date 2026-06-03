import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const assessmentService = {
  /**
   * Fetches active questions for a specific role.
   * @param {number} roleId 
   */
  async getQuestionBank(roleId) {
    if (!isSupabaseConfigured) return null;
    try {
      let query = supabase.from("QUESTION_BANK").select("*").eq("is_active", true);
      if (roleId) {
        query = query.eq("role_id", roleId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching question bank:", err);
      return [];
    }
  },

  /**
   * Creates a new assessment schedule or checklist draft.
   * @param {object} assessmentData 
   */
  async createAssessment(assessmentData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        employee_id: assessmentData.employeeId,
        conducted_by: assessmentData.conductedBy,
        assessment_type: assessmentData.assessmentType || "Checklist Evaluation",
        due_date: assessmentData.dueDate || null,
        status: assessmentData.status || "Draft"
      };

      const { data, error } = await supabase.from("ASSESSMENT").insert([payload]).select();
      if (error) throw error;
      return { success: true, assessment: data[0] };
    } catch (err) {
      logger.error("Error creating assessment:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Submits a completed assessment exam (MCQ) or checklist.
   * Best practice: Calls a Supabase RPC to ensure transactional integrity 
   * across TEST_ATTEMPT and ANSWER_HISTORY tables.
   * @param {object} attemptData 
   * @param {array} answers - List of option selections
   */
  async submitTestAttempt(attemptData, answers = []) {
    if (!isSupabaseConfigured) return null;
    try {
      const score = Number(attemptData.obtainedMarks || attemptData.percentage || 0);
      if (isNaN(score) || score < 0 || score > 100) {
        throw new Error(`Validation Error: Out-of-bounds competency score of ${score}.`);
      }

      // If an RPC 'submit_exam_attempt_transaction' exists on the database, it should be called here:
      // const { data, error } = await supabase.rpc("submit_exam_attempt_transaction", { ... })
      
      // Fallback: Perform sequential inserts for demonstration if RPC is missing
      const attemptPayload = {
        assessment_id: attemptData.assessmentId,
        employee_id: attemptData.employeeId,
        total_marks: attemptData.totalMarks || 100,
        obtained_marks: attemptData.obtainedMarks,
        percentage: attemptData.percentage || score,
        category: attemptData.category || "A",
        submitted_at: new Date().toISOString()
      };

      const { data: testData, error: testError } = await supabase
        .from("TEST_ATTEMPT")
        .insert([attemptPayload])
        .select()
        .single();
      
      if (testError) throw testError;

      // Bulk insert answers if provided
      if (answers && answers.length > 0) {
        const answerPayloads = answers.map(ans => ({
          attempt_id: testData.attempt_id,
          question_id: ans.questionId,
          selected_option: ans.selectedOption,
          is_correct: ans.isCorrect,
          correct_option: ans.correctOption,
          marks_obtained: ans.marksObtained || (ans.isCorrect ? 1 : 0)
        }));

        const { error: ansError } = await supabase.from("ANSWER_HISTORY").insert(answerPayloads);
        if (ansError) {
          logger.warn("Test Attempt saved, but Answer History failed to bulk insert:", ansError);
        }
      }

      // Update parent assessment status to Pending Approval or Completed
      await supabase
        .from("ASSESSMENT")
        .update({ status: 'Pending' })
        .eq("assessment_id", attemptData.assessmentId);

      // --- OFFICIAL BUSINESS LOGIC: CATEGORY D AUTO-TRIGGER ---
      if (attemptPayload.category === "D") {
        try {
          // 1. Create a COUNSELLING_RECORD
          await supabase.from("COUNSELLING_RECORD").insert([{
            user_id: attemptData.employeeId,
            assessment_id: attemptData.assessmentId,
            remarks: `System Auto-Generated: Score was ${score}%. Immediate counselling required.`,
            status: 'Pending'
          }]);

          // 2. Schedule Retest after 1 Month
          const retestDate = new Date();
          retestDate.setMonth(retestDate.getMonth() + 1);
          await supabase.from("ASSESSMENT").insert([{
            employee_id: attemptData.employeeId,
            conducted_by: attemptData.conductedBy || "SYSTEM_AUTO",
            assessment_type: "Mandatory Retest (Category D)",
            due_date: retestDate.toISOString(),
            status: "Scheduled"
          }]);

          // 3. Update Profile to High Risk monitoring status
          await supabase
            .from("EMPLOYEE_PROFILE")
            .update({ monitoring_status: 'High Risk' })
            .eq("user_id", attemptData.employeeId);
            
          logger.info(`Category D Auto-Triggers successfully executed for employee: ${attemptData.employeeId}`);
        } catch (catDError) {
          logger.error("Failed to execute Category D Auto-Triggers:", catDError);
          // Non-fatal, allow attempt to return success but log failure of trigger
        }
      }

      return { success: true, attempt: testData };
    } catch (err) {
      logger.error("Error saving test attempt:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Retrieves the testing history of a specific user.
   * @param {string} userId 
   */
  async getTestHistory(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("TEST_ATTEMPT")
        .select(`
          *, 
          ASSESSMENT (assessment_type, assessment_date, status)
        `)
        .eq("employee_id", userId)
        .order("started_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching test attempts:", err);
      return [];
    }
  },

  /**
   * Retrieves detailed results of a specific assessment, including the breakdown of answers.
   * @param {string} attemptId 
   */
  async getAssessmentDetails(attemptId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("TEST_ATTEMPT")
        .select(`
          *,
          ASSESSMENT (*),
          ANSWER_HISTORY (
            *,
            QUESTION_BANK (question_text, option_a, option_b, option_c, option_d)
          )
        `)
        .eq("attempt_id", attemptId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching assessment details for ${attemptId}:`, err);
      return null;
    }
  },

  /**
   * Fetches basic analytics over an employee's history.
   * @param {string} userId 
   */
  async getAssessmentAnalytics(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      // NOTE: In production, this should ideally hit a PostgreSQL View (e.g. v_user_analytics).
      const { data, error } = await supabase
        .from("TEST_ATTEMPT")
        .select("obtained_marks, percentage, started_at")
        .eq("employee_id", userId)
        .order("started_at", { ascending: true });
        
      if (error) throw error;
      
      // Calculate trends in memory if View doesn't exist yet
      return {
        totalTaken: data.length,
        averageScore: data.length ? data.reduce((acc, curr) => acc + curr.percentage, 0) / data.length : 0,
        trend: data // pass raw payload to charting library
      };
    } catch (err) {
      logger.error("Error fetching assessment analytics:", err);
      return null;
    }
  }
};
