import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const stationService = {
  async getAllStations() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("STATION").select("*");
        if (error) throw error;
        return data;
      } catch (err) {
        logger.error("Error fetching all stations:", err);
        return [];
      }
    }
    return null;
  },

  async saveStation(stationData, mode = "add") {
    if (isSupabaseConfigured) {
      try {
        const payload = {
          station_name: stationData.stationName,
          station_code: stationData.stationCode,
          zone: stationData.zone,
          division_id: 1, 
          category: stationData.category,
          platforms: parseInt(stationData.platforms) || 2,
          tracks: parseInt(stationData.tracks) || 2,
          status: stationData.status || "Active"
        };

        if (mode === "add") {
          const { error } = await supabase.from("STATION").insert([payload]);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("STATION").update(payload).eq("station_code", stationData.stationCode);
          if (error) throw error;
        }
        return { success: true };
      } catch (err) {
        logger.error("Error saving station:", err);
        return { success: false, error: err.message };
      }
    }
    return null;
  },

  async deleteStation(stationCode) {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("STATION").delete().eq("station_code", stationCode);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        logger.error("Error deleting station:", err);
        return { success: false, error: err.message };
      }
    }
    return null;
  }
};
