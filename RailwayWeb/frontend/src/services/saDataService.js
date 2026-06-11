import { dbService, isSupabaseConfigured, supabase } from "../supabaseClient";

export const saDataService = {
  async fetchStations(staff = []) {
    if (!isSupabaseConfigured) return [];
    try {
      const stationsData = await dbService.getAllStations();
      if (stationsData && stationsData.length > 0) {
        return stationsData.map((s, index) => {
          const stName = s.station_name;
          const stStaff = staff.filter(user => user.station === stName);

          const smCount = stStaff.filter(user => user.role === "sm").length;
          const pmCount = stStaff.filter(user => user.role === "pointsmen").length;
          const highRisk = stStaff.filter(user => user.risk === "High").length;
          const pending = stStaff.filter(user => user.status === "Pending").length;

          const totalScore = stStaff.reduce((sum, user) => sum + (user.score || 0), 0);
          const score = stStaff.length > 0 ? Math.round(totalScore / stStaff.length) : (s.avg_score || 0);

          let locationObj = {};
          try {
            if (s.location) {
              locationObj = JSON.parse(s.location);
            }
          } catch (e) {
            locationObj = { address: s.location || "" };
          }

          const matchingTi = staff.find(user =>
            (user.role === "ti" || user.role === "Traffic Inspector") &&
            (user.linkedStations || user.jurisdiction || "")
              .split(",")
              .map(x => x.trim().toLowerCase())
              .includes(stName.toLowerCase())
          );
          const assignedTi = matchingTi ? (matchingTi.id || matchingTi.hrmsId || matchingTi.employeeId) : (locationObj.assignedTi || "");

          let ti = "—";
          if (matchingTi) {
            ti = `${matchingTi.name} (${matchingTi.id})`;
          } else if (locationObj.assignedTi) {
            const foundTi = staff.find(u =>
              (u.role === "ti" || u.role === "Traffic Inspector") &&
              (u.id === locationObj.assignedTi || u.user_id === locationObj.assignedTi || u.name === locationObj.assignedTi)
            );
            ti = foundTi ? `${foundTi.name} (${foundTi.id})` : locationObj.assignedTi;
          } else {
            ti = "Not Assigned";
          }

          return {
            id: s.station_id || `ST_${1001 + index}`,
            stationId: s.station_id || `ST_${1001 + index}`,
            name: stName,
            stationName: stName,
            code: s.station_code,
            stationCode: s.station_code,
            ti,
            assignedTi,
            smCount,
            pmCount,
            score,
            safety: s.safety_compliance || s.safety || score || 100,
            highRisk,
            pending,
            category: locationObj.category || "A",
            status: locationObj.status || "Active",
            zone: locationObj.zone || "Central Railway",
            division: s.DIVISION?.division_name || "Nagpur",
            section: locationObj.section || "Nagpur - Wardha",
            platforms: Number(locationObj.platforms) || 3,
            runningLines: Number(locationObj.runningLines) || Number(locationObj.tracks) || 5,
            stationType: locationObj.stationType || "Junction",
            state: locationObj.state || "Maharashtra",
            district: locationObj.district || "Nagpur",
            address: locationObj.address || ""
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch SA stations:", err);
    }
    return [];
  },

  async fetchUsers() {
    if (!isSupabaseConfigured) return [];
    try {
      const usersData = await dbService.getAllUsers();
      if (usersData && usersData.length > 0) {
        const dynamicStationTiMap = {};
        usersData.forEach(userObj => {
          const roleName = userObj.ROLE?.role_name || "";
          if (roleName === "Traffic Inspector") {
            const ep = Array.isArray(userObj.EMPLOYEE_PROFILE)
              ? (userObj.EMPLOYEE_PROFILE[0] || {})
              : (userObj.EMPLOYEE_PROFILE || {});
            const jur = ep.jurisdiction || "";
            if (jur && jur !== "—") {
              const stationsList = jur.split(",").map(s => s.trim().toLowerCase());
              stationsList.forEach(stName => {
                if (stName) {
                  dynamicStationTiMap[stName] = userObj.full_name;
                }
              });
            }
          }
        });

        return usersData.map((u) => {
          const roleName = u.ROLE?.role_name || "";
          const ep = Array.isArray(u.EMPLOYEE_PROFILE)
            ? (u.EMPLOYEE_PROFILE[0] || {})
            : (u.EMPLOYEE_PROFILE || {});
          const st = Array.isArray(ep.STATION)
            ? (ep.STATION[0] || {})
            : (ep.STATION || {});

          // Map role to SuperAdminModule expectations: pointsmen, sm, ss, tm, ti
          let superAdminRole = "pointsmen";
          if (roleName === "Station Master") superAdminRole = "sm";
          else if (roleName === "Station Superintendent") superAdminRole = "ss";
          else if (roleName === "Train Manager") superAdminRole = "tm";
          else if (roleName === "Traffic Inspector") superAdminRole = "ti";

          const lastScore = ep.current_score != null ? ep.current_score : 0;
          const safetyScore = ep.safety_score != null ? ep.safety_score : 0;

          const cat = ep.category || (lastScore === 0 ? "Untested" : (lastScore >= 80 ? "A" : lastScore >= 50 ? "B" : lastScore >= 26 ? "C" : "D"));

          let risk = "Low";
          if (cat === "C") risk = "Medium";
          else if (cat === "D") risk = "High";
          else if (cat === "Untested") risk = "Untested";

          const mon = Array.isArray(u.MONITORING) ? (u.MONITORING[0] || {}) : (u.MONITORING || {});
          const monitoringStatus = mon.monitoring_status || ep.monitoring_status || "Active";

          const pmeRecs = u.PME_RECORD || [];
          const sortedPme = [...pmeRecs].sort((a, b) => new Date(b.pme_due_date || 0) - new Date(a.pme_due_date || 0));
          const latestPme = sortedPme[0] || {};

          const refRecs = u.TRAINING_RECORD || [];
          const sortedRef = [...refRecs].sort((a, b) => new Date(b.training_date || 0) - new Date(a.training_date || 0));
          const latestRef = sortedRef[0] || {};
          let parsedMeta = {};
          if (latestRef.course_name) {
            try { parsedMeta = JSON.parse(latestRef.course_name); } catch (_) { }
          }

          return {
            id: u.hrms_id,
            user_id: u.user_id,
            name: u.full_name,
            role: superAdminRole,
            station: st.station_name || "—",
            ti: st.station_name ? (dynamicStationTiMap[st.station_name.toLowerCase()] || "—") : "—",
            cat,
            risk,
            monitoringStatus,
            score: lastScore,
            contact: u.mobile_no || "—",
            lastDate: ep.joining_date || "—",
            status: u.status === "Suspended" ? "Rejected" : u.status === "Retired" ? "Overdue" : "Approved",
            email: u.email || "—",
            pfNumber: u.pf_number || "—",
            division: ep.division || "—",
            zone: st.zone || "—",
            reportingSm: ep.reporting_sm || "—",
            workLocation: ep.work_location || "—",
            shift: ep.shift || "—",
            jurisdiction: ep.jurisdiction || "—",
            linkedStations: superAdminRole === "ti" ? (ep.jurisdiction || "") : "",
            reportingAom: "—",
            pmeStatus: ep.pme_status || latestPme.pme_status || "Fit",
            pmeDueDate: latestPme.pme_due_date || null,
            pmeDoneDate: latestPme.pme_done_date || null,
            refStatus: ep.refresher_status || parsedMeta.refStatus || "Cleared",
            refDueDate: parsedMeta.nextDueDate || latestRef.expiry_date || null,
            refDoneDate: latestRef.training_date || null
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch SA users:", err);
    }
    return [];
  },

  async saveStation(stationData, mode) {
    if (!isSupabaseConfigured) return;
    try {
      const locationObj = {
        category: stationData.category || "A",
        status: stationData.status || "Active",
        zone: stationData.zone || "Central Railway",
        section: stationData.section || "Nagpur - Wardha",
        platforms: Number(stationData.platforms) || 3,
        runningLines: Number(stationData.runningLines) || Number(stationData.tracks) || 5,
        stationType: stationData.stationType || "Junction",
        state: stationData.state || "Maharashtra",
        district: stationData.district || "Nagpur",
        address: stationData.address || stationData.location || ""
      };

      const payload = {
        id: stationData.id || stationData.stationId || stationData.station_id,
        station_name: stationData.name || stationData.stationName,
        station_code: (stationData.code || stationData.stationCode || "").trim().toUpperCase(),
        location: JSON.stringify(locationObj),
        division: stationData.division || "Nagpur",
        zone: stationData.zone || "Central Railway"
      };

      const res = await dbService.saveStation(payload, mode);
      if (res && res.success === false) {
        throw new Error(res.error || "Unknown database error while saving station.");
      }

      if (stationData.assignedTi) {
        await saDataService.syncTiJurisdiction(payload.station_name, stationData.assignedTi);
      }

      return res;
    } catch (err) {
      console.error("Failed to save station to Supabase: " + err.message);
      throw err;
    }
  },

  async addStation(newStation) {
    return saDataService.saveStation(newStation, "add");
  },

  async deleteStation(stationId, stationName) {
    if (!isSupabaseConfigured) return { success: false, error: "Supabase not configured" };
    try {
      const { data: assignedUsers, error: userErr } = await supabase
        .from("EMPLOYEE_PROFILE")
        .select(`
          user_id,
          USERS(full_name, hrms_id)
        `)
        .eq("station_id", stationId);

      if (userErr) throw userErr;

      if (assignedUsers && assignedUsers.length > 0) {
        const userNames = assignedUsers.map(u => `${u.USERS?.full_name} (${u.USERS?.hrms_id})`).join(", ");
        return {
          success: false,
          error: `Cannot delete station. Operational staff are currently assigned to this station: ${userNames}. Please reassign or delete these staff members first.`
        };
      }

      if (stationName) {
        await saDataService.syncTiJurisdiction(stationName, null);
      }

      const res = await dbService.deleteStation(stationId);
      return res;
    } catch (err) {
      console.error("Failed to delete station:", err);
      return { success: false, error: err.message };
    }
  },

  async syncTiJurisdiction(stationName, assignedTiHrmsId) {
    if (!isSupabaseConfigured) return;
    try {
      const { data: usersData, error: uErr } = await supabase
        .from("USERS")
        .select(`
          user_id,
          hrms_id,
          ROLE!inner(role_name),
          EMPLOYEE_PROFILE(jurisdiction)
        `)
        .eq("ROLE.role_name", "Traffic Inspector");

      if (uErr || !usersData) {
        console.error("Failed to fetch Traffic Inspectors for jurisdiction sync:", uErr);
        return;
      }

      for (const user of usersData) {
        const profile = Array.isArray(user.EMPLOYEE_PROFILE) ? user.EMPLOYEE_PROFILE[0] : user.EMPLOYEE_PROFILE;
        if (!profile) continue;

        let jurisdictionList = profile.jurisdiction
          ? profile.jurisdiction.split(",").map(x => x.trim()).filter(Boolean)
          : [];

        const isAssignedTi = (user.hrms_id === assignedTiHrmsId);
        const containsStation = jurisdictionList.map(x => x.toLowerCase()).includes(stationName.toLowerCase());

        let changed = false;
        if (isAssignedTi && !containsStation) {
          jurisdictionList.push(stationName);
          changed = true;
        } else if (!isAssignedTi && containsStation) {
          jurisdictionList = jurisdictionList.filter(x => x.toLowerCase() !== stationName.toLowerCase());
          changed = true;
        }

        if (changed) {
          const newJurisdiction = jurisdictionList.join(", ");
          await supabase
            .from("EMPLOYEE_PROFILE")
            .update({ jurisdiction: newJurisdiction })
            .eq("user_id", user.user_id);
        }
      }
    } catch (err) {
      console.error("Error syncing TI jurisdiction:", err);
    }
  },

  async saveUser(modalData, mode) {
    if (!isSupabaseConfigured) return;
    try {
      let roleName = "Pointsman";
      if (modalData.role === "sm" || modalData.role === "Station Master") roleName = "Station Master";
      else if (modalData.role === "ss" || modalData.role === "Station Superintendent") roleName = "Station Superintendent";
      else if (modalData.role === "tm" || modalData.role === "Train Manager") roleName = "Train Manager";
      else if (modalData.role === "ti" || modalData.role === "Traffic Inspector") roleName = "Traffic Inspector";
      else if (modalData.role === "pointsmen" || modalData.role === "Pointsman") roleName = "Pointsman";

      if (mode === "shift") {
        const res = await dbService.shiftUserRole(modalData.id, roleName);
        if (res && res.success === false) {
          throw new Error(res.error || "Unknown database error shifting user role.");
        }
        return res || { success: true };
      } else {
        const payload = {
          hrmsId: modalData.id,
          name: modalData.name,
          contact: modalData.contact,
          email: modalData.email,
          pfNumber: modalData.pfNumber,
          role: roleName,
          station: modalData.station,
          division: modalData.division,
          lastDate: modalData.joiningDate || modalData.lastDate,
          score: modalData.score,
          safetyScore: modalData.safetyScore,
          password: modalData.password,
          reportingSm: modalData.reportingSm,
          workLocation: modalData.workLocation,
          shift: modalData.shift,
          jurisdiction: roleName === "Traffic Inspector" ? (modalData.linkedStations || modalData.jurisdiction || "") : (modalData.jurisdiction || ""),
          category: modalData.cat || modalData.category,
          pmeStatus: modalData.pmeStatus,
          refStatus: modalData.refStatus
        };

        if (mode === "add") {
          payload.contact = payload.contact || "—";
          payload.email = payload.email || `${modalData.id.toLowerCase()}@rail.in`;
          payload.division = payload.division || "Nagpur";
          payload.lastDate = payload.lastDate || new Date().toISOString().split('T')[0];
          payload.score = payload.score !== undefined ? payload.score : 0;
          payload.safetyScore = payload.safetyScore !== undefined ? payload.safetyScore : 0;
          payload.gender = "Male";
          payload.age = 35;
          payload.basePay = "₹28,500";
          payload.disciplinary = "None";
          payload.incidents = 0;
          payload.monitoringStatus = "Active";
          payload.category = payload.category || "Untested";
          payload.pmeStatus = payload.pmeStatus || "Fit";
          payload.refStatus = payload.refStatus || "Cleared";
        }

        const res = await dbService.saveUser(payload, mode);
        if (res && res.success === false) {
          throw new Error(res.error || "Unknown database error while saving user.");
        }
        return res || { success: true };
      }
    } catch (err) {
      console.error("Failed to save user to Supabase: " + err.message);
      throw err;
    }
  },

  async removeUser(id) {
    if (!isSupabaseConfigured) return { success: false, error: "Supabase not configured" };
    try {
      const res = await dbService.deleteUser(id);
      if (res && res.success === false) {
        throw new Error(res.error || "Unknown database error while deleting user.");
      }
      return res || { success: true };
    } catch (err) {
      console.error("Failed to delete user from Supabase: " + err.message);
      throw err;
    }
  },

  async deleteUser(id) {
    return this.removeUser(id);
  }
};
