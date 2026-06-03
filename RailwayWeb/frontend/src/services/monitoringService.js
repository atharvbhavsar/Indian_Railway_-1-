import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const monitoringService = {
  // ==========================================
  // 1. RISK MONITORING (MONITORING Table)
  // ==========================================

  /**
   * Fetches the overall risk and monitoring status for a specific user.
   */
  async getMonitoringStatus(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("MONITORING")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (error && error.code !== "PGRST116") throw error; // Ignore Not Found
      return data;
    } catch (err) {
      logger.error(`Error fetching monitoring status for user ${userId}:`, err);
      return null;
    }
  },

  /**
   * Updates or inserts a risk monitoring evaluation.
   */
  async updateMonitoringStatus(userId, statusData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        user_id: userId,
        monitoring_status: statusData.status || "Active",
        risk_level: statusData.riskLevel || "Low",
        remarks: statusData.remarks || "",
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("MONITORING")
        .upsert([payload], { onConflict: "user_id" })
        .select();

      if (error) throw error;
      return { success: true, monitoring: data[0] };
    } catch (err) {
      logger.error("Error updating monitoring status:", err);
      return { success: false, error: err.message };
    }
  },


  // ==========================================
  // 2. PERIODICAL MEDICAL (PME_RECORD Table)
  // ==========================================

  async getPmeHistory(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("PME_RECORD")
        .select("*")
        .eq("user_id", userId)
        .order("pme_due_date", { ascending: false });
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching PME history:", err);
      return [];
    }
  },

  async logPmeRecord(userId, pmeData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        user_id: userId,
        pme_due_date: pmeData.dueDate,
        pme_done_date: pmeData.doneDate || null,
        pme_status: pmeData.status || "Fit"
      };
      const { data, error } = await supabase.from("PME_RECORD").insert([payload]).select();
      if (error) throw error;
      return { success: true, record: data[0] };
    } catch (err) {
      logger.error("Error saving PME record:", err);
      return { success: false, error: err.message };
    }
  },


  // ==========================================
  // 3. REFRESHER TRAINING (TRAINING_RECORD Table)
  // ==========================================

  async getRefresherHistory(userId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("TRAINING_RECORD")
        .select("*")
        .eq("user_id", userId)
        .order("expiry_date", { ascending: false });
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching Refresher history:", err);
      return [];
    }
  },

  async logRefresherTraining(userId, refData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        user_id: userId,
        course_name: refData.courseName || "General Refresher",
        training_date: refData.trainingDate,
        expiry_date: refData.expiryDate,
        status: refData.status || "Cleared"
      };
      const { data, error } = await supabase.from("TRAINING_RECORD").insert([payload]).select();
      if (error) throw error;
      return { success: true, record: data[0] };
    } catch (err) {
      logger.error("Error saving Refresher record:", err);
      return { success: false, error: err.message };
    }
  },


  // ==========================================
  // 4. COUNSELING & INSPECTION (SAFETY_RECORD Table)
  // ==========================================

  /**
   * Fetches the unified safety log (Inspections, Counseling).
   * @param {string} userId - Target employee
   * @param {string} incidentType - 'Inspection' | 'Counseling'
   */
  async getSafetyRecords(userId, incidentType = null) {
    if (!isSupabaseConfigured) return null;
    try {
      let query = supabase
        .from("SAFETY_RECORD")
        .select("*")
        .eq("user_id", userId)
        .order("incident_date", { ascending: false });
      
      if (incidentType) {
        query = query.eq("incident_type", incidentType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching safety records:", err);
      return [];
    }
  },

  /**
   * Logs a counseling session or a physical station inspection.
   */
  async createSafetyRecord(recordData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        user_id: recordData.userId,
        incident_type: recordData.type, // 'Counseling' or 'Inspection'
        incident_date: recordData.date || new Date().toISOString().split('T')[0],
        description: recordData.description,
        action_taken: recordData.actionTaken || ""
      };
      const { data, error } = await supabase.from("SAFETY_RECORD").insert([payload]).select();
      if (error) throw error;
      return { success: true, record: data[0] };
    } catch (err) {
      logger.error(`Error saving ${recordData.type} record:`, err);
      return { success: false, error: err.message };
    }
  }
};
