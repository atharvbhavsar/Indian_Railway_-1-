import { supabase, isSupabaseConfigured } from "../api/supabaseClient";

export const authService = {
  /**
   * Logs a user in using Supabase Auth (email/password).
   * Note: For HRMS ID logins, ensure HRMS ID is mapped to a predictable email 
   * or use a custom Supabase Edge Function.
   * 
   * @param {string} email
   * @param {string} password
   */
  async login(emailOrHrms, password) {
    if (!isSupabaseConfigured) {
      return { success: false, error: "Supabase is not configured." };
    }

    try {
      // SIMPLE LOGIN MODE (Bypassing Supabase Auth)
      // We check the USERS table directly to match the HRMS ID or Email and password.
      const { data, error } = await supabase
        .from("USERS")
        .select("*")
        .or(`email.eq.${emailOrHrms},hrms_id.eq.${emailOrHrms}`)
        .single();

      if (error || !data) {
        return { success: false, error: "Invalid login credentials (User not found)." };
      }

      if (data.password_hash !== password) {
        return { success: false, error: "Invalid login credentials (Wrong password)." };
      }
      
      // Fetch the user's operational role and profile details after successful authentication
      const userProfile = await authService.getUserProfile(data.user_id);
      
      if (userProfile.status !== 'Active') {
        return { success: false, error: `Account is ${userProfile.status}. Contact administrator.` };
      }

      return {
        success: true,
        session: { user: { id: data.user_id } },
        user: userProfile
      };
    } catch (err) {
      return { success: false, error: err.message || "An unexpected error occurred during login." };
    }
  },

  /**
   * Logs out the current active session.
   */
  async logout() {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Gets the current active session. Useful for initial page loads.
   */
  async getSession() {
    if (!isSupabaseConfigured) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Subscribes to auth state changes (login, logout, token refresh).
   * @param {function} callback 
   */
  onAuthStateChange(callback) {
    if (!isSupabaseConfigured) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Retrieves the detailed user profile and role based on the Auth UUID.
   * Joins the core USERS table with the ROLE metadata table.
   * 
   * @param {string} userId - UUID from Supabase Auth
   */
  async getUserProfile(userId) {
    if (!isSupabaseConfigured) return null;
    
    let preferredLanguage = "en";
    try {
      const { data: langData, error: langError } = await supabase
        .from("USERS")
        .select("preferred_language")
        .eq("user_id", userId)
        .single();
      if (!langError && langData && langData.preferred_language) {
        preferredLanguage = langData.preferred_language;
      }
    } catch (langErr) {
      console.warn("preferred_language column may not exist. Please run migration. Defaulting to 'en'.", langErr);
    }
    
    const { data, error } = await supabase
      .from("USERS")
      .select(`
        user_id,
        hrms_id,
        full_name,
        email,
        mobile_no,
        status,
        ROLE (
          role_name
        ),
        EMPLOYEE_PROFILE (
          joining_date,
          current_score,
          safety_score,
          category,
          monitoring_status,
          division,
          reporting_sm,
          work_location,
          shift,
          jurisdiction,
          STATION (
            station_name,
            DIVISION (
              zone_name
            )
          )
        )
      `)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    const ep = Array.isArray(data.EMPLOYEE_PROFILE)
      ? (data.EMPLOYEE_PROFILE[0] || {})
      : (data.EMPLOYEE_PROFILE || {});

    const st = Array.isArray(ep?.STATION)
      ? (ep.STATION[0] || {})
      : (ep?.STATION || {});

    return {
      userId: data.user_id,
      hrmsId: data.hrms_id,
      name: data.full_name,
      email: data.email,
      mobile: data.mobile_no,
      status: data.status,
      preferredLanguage: preferredLanguage,
      role: data.ROLE?.role_name || null,
      station: st?.station_name || "—",
      joiningDate: ep?.joining_date || "—",
      division: ep?.division || "Nagpur",
      zone: st?.DIVISION?.zone_name || "Central Railway",
      category: ep?.category || "Untested",
      score: ep?.current_score != null ? ep.current_score : 0,
      safetyScore: ep?.safety_score != null ? ep.safety_score : 0,
      reportingSm: ep?.reporting_sm || "—",
      shift: ep?.shift || "—",
      workLocation: ep?.work_location || "—",
      jurisdiction: ep?.jurisdiction || "—",
      linkedStations: data.ROLE?.role_name === "Traffic Inspector" ? (ep?.jurisdiction || "") : ""
    };
  },
  
  /**
   * Helper function for Role-Based Access Control (RBAC).
   * Verifies if the current role is within the allowed roles array.
   * 
   * @param {string} currentRole - The user's active role.
   * @param {string[]} allowedRoles - Array of roles permitted (e.g. ['Traffic Inspector', 'AOM/General']).
   * @returns {boolean}
   */
  hasAccess(currentRole, allowedRoles) {
    if (!currentRole || !allowedRoles || !Array.isArray(allowedRoles)) {
      return false;
    }
    return allowedRoles.includes(currentRole);
  }
};
