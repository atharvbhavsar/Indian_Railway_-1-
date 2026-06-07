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
    if (!isSupabaseConfigured) {
      return { success: false, error: "Supabase is not configured." };
    }

    try {
      let normData = {};
      let answersArray = [];
      let checklistAnswers = null;

      // 1. Normalize parameters depending on caller syntax
      if (typeof attemptData === "string") {
        // Caller passed (employeeId, record)
        const employeeId = attemptData;
        const record = answers; // Second argument
        normData = {
          employeeId: employeeId,
          obtainedMarks: record.totalScore !== undefined ? record.totalScore : record.obtained_marks,
          percentage: record.percentage || record.totalScore || 0,
          category: record.category || (record.percentage ? (record.percentage >= 80 ? "A" : record.percentage >= 50 ? "B" : record.percentage >= 26 ? "C" : "D") : "A"),
          totalMarks: record.totalMarks || record.total_marks || 100,
          assessmentId: record.assessmentId || record.assessment_id,
          conductedBy: record.conductedBy || record.conducted_by
        };
        if (record.responses && Array.isArray(record.responses)) {
          answersArray = record.responses.map((selected, idx) => ({
            questionId: idx + 1,
            selectedOption: selected,
            isCorrect: true,
            correctOption: selected,
            marksObtained: 4
          }));
        }
      } else {
        // Standard object call
        normData = {
          assessmentId: attemptData.assessmentId || attemptData.assessment_id,
          employeeId: attemptData.employeeId || attemptData.employee_id,
          totalMarks: attemptData.totalMarks || attemptData.total_marks || 100,
          obtainedMarks: attemptData.obtainedMarks !== undefined ? attemptData.obtainedMarks : attemptData.obtained_marks,
          percentage: attemptData.percentage !== undefined ? attemptData.percentage : (attemptData.obtainedMarks || 0),
          category: attemptData.category || "A",
          conductedBy: attemptData.conductedBy || attemptData.conducted_by
        };
        
        // Checklist answers can be embedded as attemptData.answers object
        if (attemptData.answers && !Array.isArray(attemptData.answers)) {
          checklistAnswers = attemptData.answers;
        } else if (Array.isArray(answers)) {
          answersArray = answers;
        } else if (Array.isArray(attemptData.answers)) {
          answersArray = attemptData.answers;
        }
      }

      // 2. Resolve employeeId HRMS ID to USERS UUID if needed
      let resolvedEmployeeId = normData.employeeId;
      if (resolvedEmployeeId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedEmployeeId)) {
        const { data: uData, error: uErr } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", resolvedEmployeeId)
          .single();
        if (!uErr && uData) {
          resolvedEmployeeId = uData.user_id;
        } else {
          throw new Error(`User UUID could not be resolved for employee HRMS ID ${resolvedEmployeeId}`);
        }
      }

      // 3. Resolve conductedBy HRMS ID to USERS UUID if needed
      let resolvedConductedBy = normData.conductedBy;
      if (resolvedConductedBy && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedConductedBy)) {
        const { data: cData, error: cErr } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", resolvedConductedBy)
          .single();
        if (!cErr && cData) {
          resolvedConductedBy = cData.user_id;
        } else {
          resolvedConductedBy = null;
        }
      }

      const score = Number(normData.obtainedMarks !== undefined ? normData.obtainedMarks : (normData.percentage || 0));
      if (isNaN(score) || score < 0 || score > 100) {
        throw new Error(`Validation Error: Out-of-bounds competency score of ${score}.`);
      }

      // 4. Resolve assessment_id if not provided BEFORE attempting RPC
      let assessmentId = normData.assessmentId;
      if (!assessmentId && resolvedEmployeeId) {
        const { data: activeAssessments, error: activeErr } = await supabase
          .from("ASSESSMENT")
          .select("assessment_id")
          .eq("employee_id", resolvedEmployeeId)
          .in("status", ["AVAILABLE", "LOCKED", "IN_PROGRESS", "Draft", "Pending", "Scheduled"])
          .order("created_at", { ascending: false })
          .limit(1);
        if (!activeErr && activeAssessments && activeAssessments.length > 0) {
          assessmentId = activeAssessments[0].assessment_id;
        } else {
          const conductedByUuid = resolvedConductedBy || resolvedEmployeeId;
          const { data: newAssess, error: newAssessErr } = await supabase
            .from("ASSESSMENT")
            .insert([{
              employee_id: resolvedEmployeeId,
              conducted_by: conductedByUuid,
              assessment_type: "Competency Assessment",
              status: "IN_PROGRESS"
            }])
            .select()
            .single();
          if (newAssessErr) throw newAssessErr;
          assessmentId = newAssess.assessment_id;
        }
      }

      // 5. Select the right answers format to send to database
      let pAnswersToSend = null;
      if (answersArray && answersArray.length > 0) {
        pAnswersToSend = answersArray.map(ans => ({
          questionId: ans.questionId || ans.question_id,
          selectedOption: ans.selectedOption || ans.selected_option || "A",
          isCorrect: ans.isCorrect !== undefined ? ans.isCorrect : (ans.is_correct !== undefined ? ans.is_correct : true),
          correctOption: ans.correctOption || ans.correct_option || "A",
          marksObtained: ans.marksObtained !== undefined ? ans.marksObtained : (ans.marks_obtained !== undefined ? ans.marks_obtained : 1)
        }));
      } else if (checklistAnswers) {
        pAnswersToSend = checklistAnswers;
      } else {
        pAnswersToSend = [];
      }

      // 6. Execute PostgreSQL RPC transaction
      logger.info(`Invoking submit_test_attempt_rpc for assessmentId ${assessmentId}...`);
      const { data: rpcData, error: rpcError } = await supabase.rpc("submit_test_attempt_rpc", {
        p_employee_id: resolvedEmployeeId,
        p_assessment_id: assessmentId || null,
        p_total_marks: Number(normData.totalMarks || 100),
        p_obtained_marks: Number(normData.obtainedMarks !== undefined ? normData.obtainedMarks : score),
        p_percentage: Number(normData.percentage !== undefined ? normData.percentage : score),
        p_category: normData.category || "A",
        p_conducted_by: resolvedConductedBy || resolvedEmployeeId,
        p_answers: pAnswersToSend
      });

      if (rpcError) {
        throw new Error(`submit_test_attempt_rpc transaction failed: ${rpcError.message} (code: ${rpcError.code})`);
      }

      // Handle table return types: PostgREST returns table functions as an array
      const resultData = Array.isArray(rpcData) ? rpcData[0] : rpcData;
      if (!resultData) {
        throw new Error("RPC returned no data.");
      }

      logger.info("Successfully completed atomic test attempt submission via RPC.");
      return { 
        success: true, 
        attempt: { 
          attempt_id: resultData.attempt_id, 
          assessment_id: resultData.assessment_id || assessmentId 
        } 
      };

    } catch (err) {
      logger.error("Transaction submission failed:", err.message);
      return { success: false, error: err.message };
    }
  },

  async getTestHistory(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      let resolvedUserId = userId;
      if (resolvedUserId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedUserId)) {
        const { data: uData, error: uErr } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", resolvedUserId)
          .single();
        if (!uErr && uData) {
          resolvedUserId = uData.user_id;
        } else {
          return [];
        }
      }

      const { data, error } = await supabase
        .from("TEST_ATTEMPT")
        .select(`
          *, 
          ASSESSMENT (assessment_type, assessment_date, status),
          ANSWER_HISTORY (*)
        `)
        .eq("employee_id", resolvedUserId)
        .order("started_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching test attempts:", err);
      return [];
    }
  },

  async triggerCategoryDProtocol(employeeId, assessmentId, score, category, counsellorId) {
    if (!isSupabaseConfigured) return;
    try {
      // Resolve employeeId HRMS ID to USERS UUID if needed
      let resolvedEmployeeId = employeeId;
      if (resolvedEmployeeId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedEmployeeId)) {
        const { data: uData } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", resolvedEmployeeId)
          .single();
        if (uData) resolvedEmployeeId = uData.user_id;
      }

      // Resolve counsellorId HRMS ID to USERS UUID if needed
      let resolvedCounsellorId = counsellorId;
      if (resolvedCounsellorId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedCounsellorId)) {
        const { data: cData } = await supabase
          .from("USERS")
          .select("user_id")
          .eq("hrms_id", resolvedCounsellorId)
          .single();
        if (cData) resolvedCounsellorId = cData.user_id;
      }

      // Check if counselling record already exists for this assessment
      const { data: existing } = await supabase
        .from("COUNSELLING_RECORD")
        .select("counselling_id")
        .eq("assessment_id", assessmentId)
        .maybeSingle();
      if (existing) {
        logger.info("Category D counselling record already exists for assessment. Skipping duplicate trigger.");
        return;
      }

      // 1. Create a COUNSELLING_RECORD
      await supabase.from("COUNSELLING_RECORD").insert([{
        user_id: resolvedEmployeeId,
        assessment_id: assessmentId,
        counsellor_id: resolvedCounsellorId || null,
        remarks: `System Auto-Generated: Score was ${score}%. Category D: Immediate safety counselling required.`,
        status: 'Pending'
      }]);

      // 2. Schedule Retest after 1 Month
      const retestDate = new Date();
      retestDate.setMonth(retestDate.getMonth() + 1);
      const retestDateStr = retestDate.toISOString().split('T')[0];

      // 2a. Insert into RETEST_SCHEDULING table
      try {
        await supabase.from("RETEST_SCHEDULING").insert([{
          employee_id: resolvedEmployeeId,
          original_assessment_id: assessmentId,
          scheduled_date: retestDateStr,
          status: 'Scheduled'
        }]);
      } catch (retestTableErr) {
        logger.warn("Failed to insert into RETEST_SCHEDULING table:", retestTableErr.message);
      }

      // 2b. Create a new locked assessment for the retest
      await supabase.from("ASSESSMENT").insert([{
        employee_id: resolvedEmployeeId,
        conducted_by: resolvedCounsellorId || resolvedEmployeeId,
        assessment_type: "Mandatory Retest (Category D)",
        due_date: retestDateStr,
        status: "LOCKED"
      }]);

      // 3. Update Profile to High Risk monitoring status & Category D
      await supabase
        .from("EMPLOYEE_PROFILE")
        .update({ 
          monitoring_status: 'High Risk',
          category: 'D',
          current_score: score
        })
        .eq("user_id", resolvedEmployeeId);

      // 4. Update MONITORING table risk level
      try {
        await supabase.from("MONITORING").upsert([{
          user_id: resolvedEmployeeId,
          monitoring_status: 'Under Observation',
          risk_level: 'High',
          remarks: `Automated high risk observation triggered after scoring ${score}% (Category D) on assessment.`
        }], { onConflict: 'user_id' });
      } catch (monitoringErr) {
        logger.warn("Failed to update MONITORING table:", monitoringErr.message);
      }

      // 5. Generate Notifications
      await supabase.from("NOTIFICATION").insert([{
        user_id: resolvedEmployeeId,
        title: "Mandatory Counselling & Retest Scheduled",
        message: `You have scored Category D (${score}%). Mandatory safety counselling has been scheduled, your profile is marked as High Risk, and a retest is scheduled in 1 month.`,
        is_read: false
      }]);

      if (resolvedCounsellorId && resolvedCounsellorId !== resolvedEmployeeId) {
        await supabase.from("NOTIFICATION").insert([{
          user_id: resolvedCounsellorId,
          title: "Category D Safety Warning: Employee graded D",
          message: `Safety Alert: Employee graded Category D with score of ${score}%. Counselling and high-risk monitoring protocols have been automatically triggered.`,
          is_read: false
        }]);
      }

      // 6. Write to Audit Log
      try {
        await supabase.from("AUDIT_LOG").insert([{
          user_id: resolvedCounsellorId || resolvedEmployeeId,
          action: 'CATEGORY_D_AUTO_TRIGGER',
          table_name: 'TEST_ATTEMPT',
          record_id: assessmentId
        }]);
      } catch (auditErr) {
        logger.warn("Failed to write to AUDIT_LOG table:", auditErr.message);
      }
    } catch (e) {
      logger.error("Error in triggerCategoryDProtocol helper:", e);
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
