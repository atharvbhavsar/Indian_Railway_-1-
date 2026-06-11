import { supabase, isSupabaseConfigured } from "../api/supabaseClient";
import { logger } from "../logger";

export const userService = {
  /**
   * Get all users, including their role and basic profile.
   */
  async getAllUsers() {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("USERS")
        .select(`
          *,
          ROLE (role_name),
          MONITORING (
            risk_level,
            monitoring_status
          ),
          EMPLOYEE_PROFILE (
            joining_date,
            current_score,
            safety_score,
            monitoring_status,
            station_id,
            division,
            reporting_sm,
            work_location,
            shift,
            jurisdiction,
            category,
            pme_status,
            refresher_status,
            STATION (station_name, location)
          ),
          PME_RECORD (
            pme_due_date,
            pme_done_date,
            pme_status
          ),
          TRAINING_RECORD (
            training_date,
            expiry_date,
            course_name,
            status
          )
        `);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error fetching all users:", err);
      return [];
    }
  },

  /**
   * Get a specific user by their HRMS ID.
   * @param {string} hrmsId 
   */
  async getUserByHrmsId(hrmsId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("USERS")
        .select(`
          *,
          ROLE (role_name),
          EMPLOYEE_PROFILE (*)
        `)
        .eq("hrms_id", hrmsId.trim().toUpperCase())
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching user ${hrmsId}:`, err);
      return null;
    }
  },

  /**
   * Get all users filtered by a specific role.
   * @param {string} roleName 
   */
  async getUsersByRole(roleName) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("USERS")
        .select(`
          *,
          ROLE!inner(role_name),
          EMPLOYEE_PROFILE (*)
        `)
        .eq("ROLE.role_name", roleName);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error(`Error fetching users for role ${roleName}:`, err);
      return [];
    }
  },

  /**
   * Get all users assigned to a specific station (via their role subtype or profile).
   * @param {number} stationId 
   */
  async getUsersByStation(stationId) {
    if (!isSupabaseConfigured) return null;
    try {
      // NOTE: Assumes station_id is linked via EMPLOYEE_PROFILE or subtype
      const { data, error } = await supabase
        .from("EMPLOYEE_PROFILE")
        .select(`
          USERS (*, ROLE (role_name))
        `)
        .eq("station_id", stationId);
      if (error) throw error;

      return data.map(item => item.USERS);
    } catch (err) {
      logger.error(`Error fetching users for station ${stationId}:`, err);
      return [];
    }
  },

  /**
   * Search users by name, hrms_id, or email.
   * @param {string} query 
   */
  async searchUsers(query) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("USERS")
        .select("*, ROLE(role_name)")
        .or(`full_name.ilike.%${query}%,hrms_id.ilike.%${query}%,email.ilike.%${query}%`);
      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error searching users:", err);
      return [];
    }
  },

  /**
   * Create a new user record.
   * @param {object} userData 
   */
  async createUser(userData) {
    if (!isSupabaseConfigured) return null;
    try {
      // Resolve role ID
      const { data: roleData, error: roleError } = await supabase
        .from("ROLE")
        .select("role_id")
        .eq("role_name", userData.role)
        .single();
      if (roleError) throw roleError;

      const userPayload = {
        hrms_id: userData.hrmsId,
        username: userData.username || userData.hrmsId.toLowerCase(),
        full_name: userData.name,
        email: userData.email || `${userData.hrmsId.toLowerCase()}@rail.in`,
        mobile_no: userData.contact || "0000000000",
        password_hash: userData.password || "defaultPass123", // Assuming hash handled elsewhere
        role_id: roleData.role_id,
        status: "Active"
      };

      const { data, error } = await supabase.from("USERS").insert([userPayload]).select();
      if (error) throw error;
      return { success: true, user: data[0] };
    } catch (err) {
      logger.error("Error creating user:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Update an existing user.
   * @param {string} hrmsId 
   * @param {object} updates 
   */
  async updateUser(hrmsId, updates) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from("USERS")
        .update(updates)
        .eq("hrms_id", hrmsId)
        .select();
      if (error) throw error;
      return { success: true, user: data[0] };
    } catch (err) {
      logger.error("Error updating user:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Deactivate a user instead of deleting.
   * @param {string} hrmsId 
   */
  async deactivateUser(hrmsId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { error } = await supabase
        .from("USERS")
        .update({ status: 'Suspended' })
        .eq("hrms_id", hrmsId);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      logger.error("Error deactivating user:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Completely delete a user (Cascades to profile and subtypes).
   * @param {string} hrmsId 
   */
  async deleteUser(hrmsId) {
    if (!isSupabaseConfigured) return null;
    try {
      const { error } = await supabase.from("USERS").delete().eq("hrms_id", hrmsId);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      logger.error("Error deleting user:", err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Add or update a user profile.
   * Handles multi-table relational persistence for both base details, profile details, and subtype tables.
   */
  async saveUser(userData, mode) {
    if (!isSupabaseConfigured) return null;
    try {
      // 1. Resolve role ID
      const { data: roleData, error: roleError } = await supabase
        .from("ROLE")
        .select("role_id")
        .eq("role_name", userData.role)
        .single();
      if (roleError) throw roleError;

      // 2. Resolve station ID, division, and zone (if station is provided)
      let stationId = null;
      let derivedDivision = "Nagpur";
      let derivedZone = "Central Railway";
      if (userData.station && userData.station !== "—" && userData.station !== "Not Assigned") {
        const { data: stData } = await supabase
          .from("STATION")
          .select(`
            station_id,
            DIVISION (division_name, zone_name)
          `)
          .eq("station_name", userData.station)
          .limit(1)
          .maybeSingle();
        if (stData) {
          stationId = stData.station_id;
          derivedDivision = stData.DIVISION?.division_name || "Nagpur";
          derivedZone = stData.DIVISION?.zone_name || "Central Railway";
        }
      } else if (userData.role === "Traffic Inspector") {
        const jur = userData.linkedStations || userData.jurisdiction || "";
        const firstStation = jur.split(",")[0]?.trim();
        if (firstStation) {
          const { data: stData } = await supabase
            .from("STATION")
            .select(`
              station_id,
              DIVISION (division_name, zone_name)
            `)
            .eq("station_name", firstStation)
            .limit(1)
            .maybeSingle();
          if (stData) {
            derivedDivision = stData.DIVISION?.division_name || "Nagpur";
            derivedZone = stData.DIVISION?.zone_name || "Central Railway";
          }
        }
      }

      // Auto-resolve Reporting Station Master for Pointsman role based on station configuration
      let derivedReportingSm = "";
      let derivedSmRecordId = null;
      if (userData.role === "Pointsman" && stationId) {
        const { data: smProfiles } = await supabase
          .from("EMPLOYEE_PROFILE")
          .select(`
            user_id,
            USERS!inner (
              full_name,
              role_id,
              ROLE!inner (role_name)
            ),
            STATION_MASTER (sm_id)
          `)
          .eq("station_id", stationId)
          .eq("USERS.ROLE.role_name", "Station Master");

        if (smProfiles && smProfiles.length > 0) {
          derivedReportingSm = smProfiles[0].USERS?.full_name || "";
          derivedSmRecordId = smProfiles[0].STATION_MASTER?.sm_id || null;
        }
      }

      let userId;

      if (mode === "add") {
        // Validate HRMS ID, Email, Phone, and PF Number for uniqueness
        const orClauses = [];
        if (userData.hrmsId) orClauses.push(`hrms_id.eq.${userData.hrmsId}`);
        if (userData.email) orClauses.push(`email.eq.${userData.email}`);
        if (userData.contact) orClauses.push(`mobile_no.eq.${userData.contact}`);
        if (userData.pfNumber) orClauses.push(`pf_number.eq.${userData.pfNumber}`);

        if (orClauses.length > 0) {
          const { data: existingUser } = await supabase
            .from("USERS")
            .select("hrms_id, email, mobile_no, pf_number")
            .or(orClauses.join(","));

          if (existingUser && existingUser.length > 0) {
            const match = existingUser.find(u =>
              (userData.hrmsId && u.hrms_id === userData.hrmsId) ||
              (userData.email && u.email === userData.email) ||
              (userData.contact && u.mobile_no === userData.contact) ||
              (userData.pfNumber && u.pf_number === userData.pfNumber)
            );
            if (match) {
              if (userData.hrmsId && match.hrms_id === userData.hrmsId) throw new Error(`User with HRMS ID ${userData.hrmsId} already exists.`);
              if (userData.email && match.email === userData.email) throw new Error(`Email ${userData.email} is already in use.`);
              if (userData.contact && match.mobile_no === userData.contact) throw new Error(`Mobile Number ${userData.contact} is already in use.`);
              if (userData.pfNumber && match.pf_number === userData.pfNumber) throw new Error(`PF Number ${userData.pfNumber} is already in use.`);
            }
          }
        }

        // Insert new user
        const userPayload = {
          hrms_id: userData.hrmsId,
          username: userData.username || userData.hrmsId.toLowerCase(),
          full_name: userData.name,
          email: userData.email || `${userData.hrmsId.toLowerCase()}@rail.in`,
          mobile_no: userData.contact || "0000000000",
          password_hash: userData.password || "password123",
          role_id: roleData.role_id,
          status: "Active",
          pf_number: userData.pfNumber || null
        };

        const { data: newUser, error: userErr } = await supabase
          .from("USERS")
          .insert([userPayload])
          .select()
          .single();
        if (userErr) throw userErr;
        userId = newUser.user_id;

        // Insert employee profile
        const profilePayload = {
          user_id: userId,
          dob: userData.dob || "1990-01-01",
          joining_date: userData.lastDate || new Date().toISOString().split("T")[0],
          qualification: userData.qualification || "Graduate",
          address: userData.address || "",
          blood_group: userData.bloodGroup || "O+",
          current_score: userData.score !== undefined ? userData.score : 0,
          safety_score: userData.safetyScore !== undefined ? userData.safetyScore : 0,
          category: userData.category || "Untested",
          monitoring_status: userData.monitoringStatus || "Active",
          station_id: stationId,
          division: derivedDivision,
          reporting_sm: derivedReportingSm || userData.reportingSm || "",
          work_location: userData.workLocation || "",
          shift: userData.shift || "",
          jurisdiction: userData.jurisdiction || "",
          pme_status: userData.pmeStatus || "Fit",
          refresher_status: userData.refStatus || "Cleared"
        };

        const { error: profileErr } = await supabase
          .from("EMPLOYEE_PROFILE")
          .insert([profilePayload]);
        if (profileErr) throw profileErr;

        // Create subtype record
        const subtypeTable = userService.getSubtypeTable(userData.role);
        if (subtypeTable) {
          const subtypePayload = { user_id: userId };
          if (userData.role === 'Pointsman') {
            subtypePayload.shift = userData.shift || "Morning Shift (06:00 - 14:00)";
            subtypePayload.work_location = userData.workLocation || userData.station || "Nagpur Junction";
            // Link SM dynamically
            if (derivedSmRecordId) {
              subtypePayload.sm_id = derivedSmRecordId;
            } else if (userData.reportingSm) {
              const { data: smUser } = await supabase
                .from("USERS")
                .select("user_id")
                .eq("full_name", userData.reportingSm)
                .limit(1)
                .maybeSingle();
              if (smUser) {
                const { data: smRecord } = await supabase
                  .from("STATION_MASTER")
                  .select("sm_id")
                  .eq("user_id", smUser.user_id)
                  .limit(1)
                  .maybeSingle();
                if (smRecord) subtypePayload.sm_id = smRecord.sm_id;
              }
            }
          } else if (userData.role === 'Traffic Inspector') {
            subtypePayload.station_id = stationId;
            subtypePayload.jurisdiction = userData.jurisdiction || "Nagpur Division";
          } else if (userData.role !== 'Super Admin' && userData.role !== 'AOM/General') {
            subtypePayload.station_id = stationId;
          }
          await supabase.from(subtypeTable).insert([subtypePayload]);
        }
      } else {
        // Edit mode
        // 1. Get user details including existing values to perform a safe merge update
        const { data: existingUser, error: userError } = await supabase
          .from("USERS")
          .select(`
            user_id,
            role_id,
            full_name,
            email,
            mobile_no,
            pf_number,
            ROLE (role_name),
            EMPLOYEE_PROFILE (
              joining_date,
              current_score,
              station_id,
              division,
              reporting_sm,
              work_location,
              shift,
              jurisdiction,
              category,
              pme_status,
              refresher_status
            )
          `)
          .eq("hrms_id", userData.hrmsId)
          .single();
        if (userError) throw userError;
        userId = existingUser.user_id;

        const ep = Array.isArray(existingUser.EMPLOYEE_PROFILE)
          ? (existingUser.EMPLOYEE_PROFILE[0] || {})
          : (existingUser.EMPLOYEE_PROFILE || {});

        // Check if role has changed, and if so, perform a role shift
        const oldRoleName = existingUser.ROLE?.role_name;
        if (oldRoleName && oldRoleName !== userData.role) {
          const shiftRes = await userService.shiftUserRole(userData.hrmsId, userData.role);
          if (shiftRes && !shiftRes.success) {
            throw new Error(shiftRes.error || "Failed to shift user role.");
          }
        }

        // Validate if Email or PF Number is already in use by ANOTHER user
        const orEditClauses = [];
        if (userData.email && userData.email !== existingUser.email) orEditClauses.push(`email.eq.${userData.email}`);
        if (userData.pfNumber && userData.pfNumber !== existingUser.pf_number) orEditClauses.push(`pf_number.eq.${userData.pfNumber}`);

        if (orEditClauses.length > 0) {
          const { data: duplicateCheck } = await supabase
            .from("USERS")
            .select("hrms_id, email, pf_number")
            .or(orEditClauses.join(","))
            .neq("hrms_id", userData.hrmsId);

          if (duplicateCheck && duplicateCheck.length > 0) {
            const match = duplicateCheck.find(u =>
              (userData.email && u.email === userData.email) ||
              (userData.pfNumber && u.pf_number === userData.pfNumber)
            );
            if (match) {
              if (userData.email && match.email === userData.email) throw new Error(`Email ${userData.email} is already in use by another user.`);
              if (userData.pfNumber && match.pf_number === userData.pfNumber) throw new Error(`PF Number ${userData.pfNumber} is already in use by another user.`);
            }
          }
        }

        // Merge existing user values with updates, ignoring undefined/null/empty strings from partial updates
        const nameVal = userData.name !== undefined && userData.name !== "" ? userData.name : existingUser.full_name;
        const emailVal = userData.email !== undefined && userData.email !== "" ? userData.email : existingUser.email;
        const contactVal = userData.contact !== undefined && userData.contact !== "" ? userData.contact : existingUser.mobile_no;
        const pfNumberVal = userData.pfNumber !== undefined && userData.pfNumber !== "" ? userData.pfNumber : existingUser.pf_number;

        const joiningDateVal = userData.lastDate !== undefined && userData.lastDate !== "" ? userData.lastDate : ep.joining_date;
        const scoreVal = userData.score !== undefined ? userData.score : ep.current_score;
        const stationIdVal = stationId !== null ? stationId : ep.station_id;
        const divisionVal = userData.division !== undefined && userData.division !== "" ? derivedDivision : ep.division;
        const reportingSmVal = userData.reportingSm !== undefined && userData.reportingSm !== "" ? (derivedReportingSm || userData.reportingSm) : ep.reporting_sm;
        const workLocationVal = userData.workLocation !== undefined && userData.workLocation !== "" ? userData.workLocation : ep.work_location;
        const shiftVal = userData.shift !== undefined && userData.shift !== "" ? userData.shift : ep.shift;
        const jurisdictionVal = userData.jurisdiction !== undefined && userData.jurisdiction !== "" ? userData.jurisdiction : ep.jurisdiction;
        const categoryVal = userData.category !== undefined && userData.category !== "" ? userData.category : ep.category;
        const pmeStatusVal = userData.pmeStatus !== undefined && userData.pmeStatus !== "" ? userData.pmeStatus : ep.pme_status;
        const refStatusVal = userData.refStatus !== undefined && userData.refStatus !== "" ? userData.refStatus : ep.refresher_status;

        // 2. Update users
        const { error: userUpdateErr } = await supabase
          .from("USERS")
          .update({
            full_name: nameVal,
            email: emailVal,
            mobile_no: contactVal,
            pf_number: pfNumberVal
          })
          .eq("user_id", userId);
        if (userUpdateErr) throw userUpdateErr;

        // 3. Update profile
        const { error: profileUpdateErr } = await supabase
          .from("EMPLOYEE_PROFILE")
          .update({
            joining_date: joiningDateVal,
            current_score: scoreVal,
            station_id: stationIdVal,
            division: divisionVal,
            reporting_sm: reportingSmVal,
            work_location: workLocationVal,
            shift: shiftVal,
            jurisdiction: jurisdictionVal,
            category: categoryVal,
            pme_status: pmeStatusVal,
            refresher_status: refStatusVal
          })
          .eq("user_id", userId);
        if (profileUpdateErr) throw profileUpdateErr;

        // 4. Update subtype table
        const subtypeTable = userService.getSubtypeTable(userData.role);
        if (subtypeTable) {
          const subtypePayload = {};
          if (userData.role === 'Pointsman') {
            subtypePayload.shift = userData.shift;
            subtypePayload.work_location = userData.workLocation;
            if (derivedSmRecordId) {
              subtypePayload.sm_id = derivedSmRecordId;
            } else if (userData.reportingSm) {
              const { data: smUser } = await supabase
                .from("USERS")
                .select("user_id")
                .eq("full_name", userData.reportingSm)
                .limit(1)
                .maybeSingle();
              if (smUser) {
                const { data: smRecord } = await supabase
                  .from("STATION_MASTER")
                  .select("sm_id")
                  .eq("user_id", smUser.user_id)
                  .limit(1)
                  .maybeSingle();
                if (smRecord) {
                  subtypePayload.sm_id = smRecord.sm_id;
                } else {
                  subtypePayload.sm_id = null;
                }
              } else {
                subtypePayload.sm_id = null;
              }
            } else {
              subtypePayload.sm_id = null;
            }
          } else if (userData.role === 'Traffic Inspector') {
            subtypePayload.station_id = stationId;
            subtypePayload.jurisdiction = userData.jurisdiction;
          } else if (userData.role !== 'Super Admin' && userData.role !== 'AOM/General') {
            subtypePayload.station_id = stationId;
          }
          await supabase.from(subtypeTable).update(subtypePayload).eq("user_id", userId);
        }
      }

      return { success: true };
    } catch (err) {
      logger.error("Error saving user:", err);
      return { success: false, error: err.message };
    }
  },

  async shiftUserRole(hrmsId, newRoleName) {
    if (!isSupabaseConfigured) return null;
    try {
      const { data: user, error: userError } = await supabase
        .from("USERS")
        .select("user_id, role_id, ROLE (role_name)")
        .eq("hrms_id", hrmsId)
        .single();
      if (userError) throw userError;

      const oldRoleName = user.ROLE?.role_name;
      if (oldRoleName === newRoleName) return { success: true };

      const { data: roleData, error: roleError } = await supabase
        .from("ROLE")
        .select("role_id")
        .eq("role_name", newRoleName)
        .single();
      if (roleError) throw roleError;

      const { error: updateError } = await supabase
        .from("USERS")
        .update({ role_id: roleData.role_id })
        .eq("hrms_id", hrmsId);
      if (updateError) throw updateError;

      const oldSubtypeTable = userService.getSubtypeTable(oldRoleName);
      if (oldSubtypeTable) {
        await supabase.from(oldSubtypeTable).delete().eq("user_id", user.user_id);
      }

      const newSubtypeTable = userService.getSubtypeTable(newRoleName);
      if (newSubtypeTable) {
        const { data: profile } = await supabase
          .from("EMPLOYEE_PROFILE")
          .select("station_id")
          .eq("user_id", user.user_id)
          .single();

        let stationId = profile?.station_id;
        if (!stationId) {
          const { data: firstSt } = await supabase
            .from("STATION")
            .select("station_id")
            .limit(1)
            .maybeSingle();
          stationId = firstSt?.station_id || null;
        }

        const insertPayload = { user_id: user.user_id };
        if (newRoleName !== 'Super Admin' && newRoleName !== 'AOM/General') {
          insertPayload.station_id = stationId;
        }
        if (newRoleName === 'Traffic Inspector') {
          insertPayload.jurisdiction = "Nagpur Division";
        } else if (newRoleName === 'Pointsman') {
          insertPayload.shift = "Morning Shift (06:00 - 14:00)";
          insertPayload.work_location = "Nagpur Junction";
        }

        await supabase.from(newSubtypeTable).insert([insertPayload]);
      }

      return { success: true };
    } catch (err) {
      logger.error("Error shifting user role:", err);
      return { success: false, error: err.message };
    }
  },

  async updatePreferredLanguage(userId, language) {
    if (!isSupabaseConfigured) return { success: false };
    try {
      const { data, error } = await supabase
        .from("USERS")
        .update({ preferred_language: language })
        .eq("user_id", userId)
        .select();
      if (error) throw error;
      return { success: true, user: data[0] };
    } catch (err) {
      logger.error("Error updating preferred language in DB:", err);
      return { success: false, error: err.message };
    }
  },

  getSubtypeTable(roleName) {
    switch (roleName) {
      case "Super Admin": return "SUPER_ADMIN";
      case "AOM/General": return "AOM";
      case "Traffic Inspector": return "TRAFFIC_INSPECTOR";
      case "Station Superintendent": return "STATION_SUPERINTENDENT";
      case "Station Master": return "STATION_MASTER";
      case "Train Manager": return "TRAIN_MANAGER";
      case "Pointsman": return "POINTSMAN";
      default: return null;
    }
  }
};
