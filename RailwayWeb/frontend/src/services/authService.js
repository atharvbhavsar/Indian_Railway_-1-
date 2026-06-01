import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const authService = {
  async login(hrmsId, password) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("USERS")
          .select("*, ROLE (role_name)")
          .eq("hrms_id", hrmsId.trim().toUpperCase());

        if (error) throw error;
        
        if (data && data.length > 0) {
          const userRecord = data[0];
          const dbPassword = userRecord.password_hash || userRecord.password;
          if (dbPassword === password) {
            return {
              success: true,
              user: {
                hrmsId: userRecord.hrms_id,
                role: userRecord.ROLE?.role_name || "Pointsman",
                name: userRecord.full_name,
                userId: userRecord.user_id
              }
            };
          }
          return { success: false, error: "Invalid password" };
        }
        return { success: false, error: "HRMS ID not found in database" };
      } catch (err) {
        logger.error("Supabase login error, falling back to local auth:", err);
        return { success: false, error: err.message };
      }
    }
    return null; // Signals controller to use fallback
  }
};
