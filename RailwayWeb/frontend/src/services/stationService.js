import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const stationService = {
  /**
   * Get all stations, including their division and zone details.
   */
  async getAllStations() {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("STATION")
        .select(`
          station_id,
          station_name,
          station_code,
          location,
          DIVISION (division_id, division_name, zone_name)
        `);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching all stations:", err);
      return [];
    }
  },

  /**
   * Get a specific station by its primary key ID.
   * @param {number} stationId 
   */
  async getStationById(stationId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("STATION")
        .select(`
          station_id,
          station_name,
          station_code,
          location,
          DIVISION (division_id, division_name, zone_name)
        `)
        .eq("station_id", stationId)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching station ${stationId}:`, err);
      return null;
    }
  },

  /**
   * Get all stations belonging to a specific division.
   * @param {number} divisionId 
   */
  async getStationsByDivision(divisionId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("STATION")
        .select(`
          station_id,
          station_name,
          station_code,
          location,
          DIVISION (division_id, division_name, zone_name)
        `)
        .eq("division_id", divisionId);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching stations for division ${divisionId}:`, err);
      return [];
    }
  },

  /**
   * Get all stations belonging to a specific zone.
   * Requires filtering through the joined DIVISION table.
   * @param {string} zoneName 
   */
  async getStationsByZone(zoneName) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("STATION")
        .select(`
          station_id,
          station_name,
          station_code,
          location,
          DIVISION!inner(division_id, division_name, zone_name)
        `)
        .eq("DIVISION.zone_name", zoneName);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching stations for zone ${zoneName}:`, err);
      return [];
    }
  },

  /**
   * Create a new station.
   * @param {object} stationData 
   */
  async createStation(stationData) {
    if (!isSupabaseConfigured) return null;
    try {
      const payload = {
        station_name: stationData.stationName,
        station_code: stationData.stationCode,
        location: stationData.location || "",
        division_id: stationData.divisionId || 1 // Fallback if not provided
      };

      const { data, error } = await supabase.from("STATION").insert([payload]).select();
      if (error) throw error;
      return { success: true, station: data[0] };
    } catch (err) {
      logger.error("Error creating station:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Update an existing station.
   * @param {number} stationId 
   * @param {object} updates 
   */
  async updateStation(stationId, updates) {
    if (!isSupabaseConfigured) return null;
    try {
      // Map frontend camelCase to snake_case payload
      const payload = {};
      if (updates.stationName) payload.station_name = updates.stationName;
      if (updates.stationCode) payload.station_code = updates.stationCode;
      if (updates.location) payload.location = updates.location;
      if (updates.divisionId) payload.division_id = updates.divisionId;

      const { data, error } = await supabase
        .from("STATION")
        .update(payload)
        .eq("station_id", stationId)
        .select();
      if (error) throw error;
      return { success: true, station: data[0] };
    } catch (err) {
      logger.error("Error updating station:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Deactivate a station (Soft delete or delete depending on schema constraints).
   * Note: RSES schema enforces ON DELETE RESTRICT from DIVISION.
   * @param {number} stationId 
   */
  async deactivateStation(stationId) {
    if (!isSupabaseConfigured) return null;
    try {
      // Standard schema doesn't have an 'is_active' column yet.
      // If the frontend needs to hide stations without breaking existing references, 
      // an 'is_active' boolean should be added to the STATION table in Supabase.
      // For now, we will attempt a physical delete.
      const { error } = await supabase
        .from("STATION")
        .delete()
        .eq("station_id", stationId);
      
      if (error) throw error;
      return { success: true };
    } catch (err) {
      logger.error("Error deactivating station:", err);
      return { success: false, error: err.message };
    }
  },

  async saveStation(stationData, mode) {
    if (!isSupabaseConfigured) return null;
    try {
      // Find or create division
      let divisionId = 1;
      const { data: divData, error: divError } = await supabase
        .from("DIVISION")
        .select("division_id")
        .eq("division_name", stationData.division || "Nagpur")
        .single();
      
      if (divError || !divData) {
        // Insert division
        const { data: newDiv, error: newDivError } = await supabase
          .from("DIVISION")
          .insert([{ division_name: stationData.division || "Nagpur", zone_name: stationData.zone || "Central Railway" }])
          .select();
        if (!newDivError && newDiv) {
          divisionId = newDiv[0].division_id;
        }
      } else {
        divisionId = divData.division_id;
      }

      const payload = {
        station_name: stationData.station_name || stationData.stationName,
        station_code: stationData.station_code || stationData.stationCode,
        location: stationData.location || "",
        division_id: divisionId
      };

      if (mode === "add") {
        const { data, error } = await supabase.from("STATION").insert([payload]).select();
        if (error) throw error;
        return { success: true, station: data[0] };
      } else {
        const { data, error } = await supabase
          .from("STATION")
          .update(payload)
          .eq("station_code", payload.station_code)
          .select();
        if (error) throw error;
        return { success: true, station: data[0] };
      }
    } catch (err) {
      logger.error("Error saving station:", err);
      return { success: false, error: err.message };
    }
  },

  async deleteStation(stationId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { error } = await supabase
        .from("STATION")
        .delete()
        .or(`station_id.eq.${isNaN(Number(stationId)) ? -1 : stationId},station_code.eq.${stationId}`);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      logger.error("Error deleting station:", err);
      return { success: false, error: err.message };
    }
  }
};
