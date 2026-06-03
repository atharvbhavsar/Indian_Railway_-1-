import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const approvalService = {
  /**
   * Fetches assessments waiting for approval/review based on the user's role.
   * Traffic Inspectors look for 'Pending' assessments.
   * AOMs look for 'Approved' assessments (waiting for Review).
   * 
   * @param {string} roleName 
   * @param {string} userId - Optional supervisor ID for jurisdiction filtering
   */
  async getPendingSignoffs(roleName, userId = null) {
    if (!isSupabaseConfigured) return null;
    try {
      let query = supabase.from("ASSESSMENT").select(`
        *,
        USERS!employee_id (full_name, hrms_id, role_id, ROLE(role_name)),
        TEST_ATTEMPT (attempt_id, total_marks, obtained_marks, percentage, category)
      `);

      if (roleName === "Traffic Inspector") {
        query = query.eq("status", "Pending");
      } else if (roleName === "AOM/General") {
        // AOMs review things already approved by TIs
        query = query.eq("status", "Approved");
      } else {
        // Other roles do not have signoff queues
        return [];
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching pending signoffs for ${roleName}:`, err);
      return [];
    }
  },

  /**
   * Submits a Traffic Inspector approval and updates the parent assessment status.
   * 
   * @param {string} assessmentId 
   * @param {string} approvedByUserId 
   * @param {string} remarks 
   * @param {string} actionStatus - 'Approved' or 'Rejected'
   */
  async submitApproval(assessmentId, approvedByUserId, remarks, actionStatus = "Approved") {
    if (!isSupabaseConfigured) return null;
    try {
      // 1. Insert the Approval Record
      const { data: approvalData, error: approvalError } = await supabase
        .from("APPROVAL")
        .insert([{
          assessment_id: assessmentId,
          approved_by: approvedByUserId,
          approval_level: "Traffic Inspector",
          remarks: remarks
        }])
        .select()
        .single();

      if (approvalError) throw approvalError;

      // 2. Update parent assessment status
      const { error: updateError } = await supabase
        .from("ASSESSMENT")
        .update({ status: actionStatus })
        .eq("assessment_id", assessmentId);
        
      if (updateError) throw updateError;

      return { success: true, approval: approvalData };
    } catch (err) {
      logger.error("Error submitting approval:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Submits an AOM final review, linking back to the TI's approval record.
   * 
   * @param {string} approvalId - The ID of the TI's approval
   * @param {string} reviewedByUserId - The AOM's User ID
   * @param {string} remarks 
   */
  async submitReview(approvalId, reviewedByUserId, remarks) {
    if (!isSupabaseConfigured) return null;
    try {
      // 1. Insert the Review Record
      const { data: reviewData, error: reviewError } = await supabase
        .from("REVIEW")
        .insert([{
          approval_id: approvalId,
          reviewed_by: reviewedByUserId,
          review_level: "AOM",
          remarks: remarks
        }])
        .select()
        .single();

      if (reviewError) throw reviewError;

      return { success: true, review: reviewData };
    } catch (err) {
      logger.error("Error submitting review:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Retrieves the full audit trail of approvals and reviews for a given assessment.
   * 
   * @param {string} assessmentId 
   */
  async getApprovalHistory(assessmentId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("APPROVAL")
        .select(`
          *,
          USERS!approved_by (full_name, ROLE(role_name)),
          REVIEW (
            *,
            USERS!reviewed_by (full_name, ROLE(role_name))
          )
        `)
        .eq("assessment_id", assessmentId)
        .single();

      if (error && error.code !== "PGRST116") { // Ignore 'Not found' error
        throw error;
      }
      return data || null;
    } catch (err) {
      logger.error(`Error fetching approval history for assessment ${assessmentId}:`, err);
      return null;
    }
  }
};
