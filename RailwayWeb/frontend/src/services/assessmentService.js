import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const assessmentService = {
  async getTestHistory(userId) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("TEST_ATTEMPT")
          .select("*, ASSESSMENT (assessment_type, assessment_date, status)")
          .eq("employee_id", userId)
          .order("started_at", { ascending: false });

        if (error) throw error;
        return data;
      } catch (err) {
        logger.error("Error fetching test attempts:", err);
        return [];
      }
    }
    return null;
  },

  async submitTestAttempt(attemptData) {
    if (!attemptData || !attemptData.employee_id) {
      throw new Error("Validation Error: Missing employee identifier.");
    }
    const score = Number(attemptData.obtained_marks || attemptData.percentage || 0);
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error(`Validation Error: Out-of-bounds competency score of ${score}%. Marks must be between 0 and 100.`);
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("TEST_ATTEMPT").insert([attemptData]).select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        logger.error("Error saving test attempt:", err);
        return null;
      }
    }
    return null;
  }
};
