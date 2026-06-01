import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const incidentService = {
  async getIncidents(userId = null) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from("SAFETY_RECORD").select("*");
        if (userId) {
          query = query.eq("user_id", userId);
        }
        const { data, error } = await query.order("incident_date", { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        logger.error("Error fetching safety incidents:", err);
        return [];
      }
    }
    return null;
  },

  async logIncident(incidentData) {
    if (!incidentData || !incidentData.user_id) {
      throw new Error("Validation Error: Missing user association for safety record.");
    }
    if (!incidentData.incident_type || incidentData.incident_type.trim().length === 0) {
      throw new Error("Validation Error: Incident type category is required.");
    }
    if (incidentData.remarks) {
      incidentData.remarks = incidentData.remarks.replace(/<[^>]*>/g, "").trim();
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("SAFETY_RECORD").insert([incidentData]).select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        logger.error("Error logging safety incident:", err);
        return null;
      }
    }
    return null;
  }
};
