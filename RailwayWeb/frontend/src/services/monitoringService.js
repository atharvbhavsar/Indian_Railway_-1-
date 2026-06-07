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

      // Also update EMPLOYEE_PROFILE's pme_status
      await supabase
        .from("EMPLOYEE_PROFILE")
        .update({ pme_status: pmeData.status || "Fit" })
        .eq("user_id", userId);

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
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from("TRAINING_RECORD")
        .select("*")
        .eq("user_id", userId)
        .order("training_date", { ascending: false });
      if (error) throw error;

      // Parse JSON metadata stored in course_name
      return (data || []).map(row => {
        let meta = {};
        try {
          if (row.course_name && row.course_name.trim().startsWith("{")) {
            const parsed = JSON.parse(row.course_name);
            meta = {
              courseName:  parsed.n || parsed.courseName || "Refresher Course",
              refStatus:   parsed.s || parsed.refStatus || "Cleared",
              remarks:     parsed.r || parsed.remarks || "",
              conductedBy: parsed.c || parsed.conductedBy || "",
              nextDueDate: parsed.d || parsed.nextDueDate || row.expiry_date || null,
            };
          } else {
            meta = {
              courseName:  row.course_name || "Refresher Course",
              refStatus:   "Cleared",
              remarks:     "",
              conductedBy: "",
              nextDueDate: row.expiry_date || null,
            };
          }
        } catch (_) {
          meta = {
            courseName:  row.course_name || "Refresher Course",
            refStatus:   "Cleared",
            remarks:     "",
            conductedBy: "",
            nextDueDate: row.expiry_date || null,
          };
        }
        return {
          training_id: row.training_id,
          user_id: row.user_id,
          trainingDate: row.training_date,
          expiryDate: row.expiry_date,
          createdAt: row.created_at,
          // enriched from parsed metadata
          courseName:  meta.courseName,
          refStatus:   meta.refStatus,
          remarks:     meta.remarks,
          conductedBy: meta.conductedBy,
          nextDueDate: meta.nextDueDate,
        };
      });
    } catch (err) {
      logger.error("Error fetching Refresher history:", err);
      return [];
    }
  },

  /**
   * Logs a new Refresher Course record for a pointsman.
   * Rich metadata is JSON-encoded in the course_name column.
   * EMPLOYEE_PROFILE.refresher_status is always synced to the new status.
   */
  async logRefresherCourse(userId, refData) {
    if (!isSupabaseConfigured) return { success: false, error: "Supabase not configured" };
    try {
      // Compress the keys and values to fit inside character varying(150)
      const remarks = (refData.remarks || "").substring(0, 50);
      const conductedBy = (refData.conductedBy || "").substring(0, 30);
      
      const meta = JSON.stringify({
        s: refData.refStatus   || "Completed",
        r: remarks,
        c: conductedBy,
        d: refData.nextDueDate || null,
      });

      const payload = {
        user_id:       userId,
        course_name:   meta,
        training_date: refData.trainingDate,
        expiry_date:   refData.nextDueDate || refData.trainingDate,
        status:        "Cleared",          // DB constraint only allows "Cleared"
      };

      const { data, error } = await supabase
        .from("TRAINING_RECORD")
        .insert([payload])
        .select();
      if (error) throw error;

      // Sync refresher_status in EMPLOYEE_PROFILE
      await supabase
        .from("EMPLOYEE_PROFILE")
        .update({ refresher_status: refData.refStatus || "Cleared" })
        .eq("user_id", userId);

      return { success: true, record: data[0] };
    } catch (err) {
      logger.error("Error saving Refresher Course record:", err);
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
