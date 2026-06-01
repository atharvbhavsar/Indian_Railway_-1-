import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const userService = {
  async getAllUsers() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("USERS")
          .select("*, ROLE (role_name), EMPLOYEE_PROFILE (*, STATION (*))");
        if (error) throw error;
        return data;
      } catch (err) {
        logger.error("Error fetching all users:", err);
        return [];
      }
    }
    return null;
  },

  async saveUser(userData, mode = "add") {
    if (isSupabaseConfigured) {
      try {
        const { data: roleData, error: roleError } = await supabase
          .from("ROLE")
          .select("role_id")
          .eq("role_name", userData.designation || userData.role)
          .single();
        if (roleError) throw roleError;
        const roleId = roleData.role_id;

        let stationId = null;
        if (userData.stationName || userData.station) {
          const { data: sData } = await supabase
            .from("STATION")
            .select("station_id")
            .eq("station_name", userData.stationName || userData.station)
            .limit(1);
          if (sData && sData.length > 0) stationId = sData[0].station_id;
        }

        const userPayload = {
          hrms_id: userData.hrmsId || userData.employeeId,
          username: (userData.hrmsId || userData.employeeId).toLowerCase(),
          full_name: userData.employeeName || userData.name,
          email: userData.emailId || userData.email || `${(userData.hrmsId || userData.employeeId).toLowerCase()}@rail.in`,
          mobile_no: userData.mobileNo || userData.contact || userData.phone,
          role_id: roleId,
          status: userData.status || "Active"
        };

        let userId = null;
        if (mode === "add") {
          const { data, error } = await supabase.from("USERS").insert([userPayload]).select();
          if (error) throw error;
          userId = data[0].user_id;
        } else {
          const { data, error } = await supabase.from("USERS").update(userPayload).eq("hrms_id", userData.hrmsId || userData.employeeId).select();
          if (error) throw error;
          userId = data[0].user_id;
        }

        const profilePayload = {
          user_id: userId,
          gender: userData.gender || "Male",
          age: parseInt(userData.age) || 35,
          date_of_joining: userData.doj || userData.lastDate || new Date().toISOString().split('T')[0],
          base_pay: userData.basePay || "₹28,500",
          current_score: parseInt(userData.lastScore || userData.score) || 80,
          safety_score: parseInt(userData.safetyScore) || 85,
          disciplinary_record: userData.disciplinary || "None",
          incidents_count: parseInt(userData.incidents) || 0,
          monitoring_status: userData.monitoringStatus || "Active",
          station_id: stationId
        };

        const { error: profileError } = await supabase.from("EMPLOYEE_PROFILE").upsert([profilePayload], { onConflict: "user_id" });
        if (profileError) throw profileError;

        return { success: true, userId };
      } catch (err) {
        logger.error("Error saving user to Supabase:", err);
        return { success: false, error: err.message };
      }
    }
    return null;
  },

  async deleteUser(hrmsId) {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("USERS").delete().eq("hrms_id", hrmsId);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        logger.error("Error deleting user:", err);
        return { success: false, error: err.message };
      }
    }
    return null;
  },

  async shiftUserRole(hrmsId, newRoleName) {
    if (isSupabaseConfigured) {
      try {
        const { data: roleData, error: roleError } = await supabase.from("ROLE").select("role_id").eq("role_name", newRoleName).single();
        if (roleError) throw roleError;

        const { error } = await supabase.from("USERS").update({ role_id: roleData.role_id }).eq("hrms_id", hrmsId);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        logger.error("Error shifting role:", err);
        return { success: false, error: err.message };
      }
    }
    return null;
  }
};
