import { dbService, isSupabaseConfigured } from "../supabaseClient";

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
          
          return {
            id: s.station_id || `ST_${1001 + index}`,
            name: stName,
            code: s.station_code,
            ti: "TI NGP", // Default fallback if not defined
            smCount,
            pmCount,
            score,
            safety: s.safety_compliance || score || 100, // Using score as baseline if safety not set
            highRisk,
            pending
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
          const risk = lastScore === 0 ? "Untested" : ((safetyScore < 60 || lastScore < 50) ? "High" : (safetyScore < 75 || lastScore < 65) ? "Medium" : "Low");

          return {
            id: u.hrms_id,
            user_id: u.user_id,
            name: u.full_name,
            role: superAdminRole,
            station: st.station_name || "—",
            ti: "—",
            cat,
            risk,
            score: lastScore,
            contact: u.mobile_no || "—",
            lastDate: ep.joining_date || "—",
            status: u.status === "Suspended" ? "Rejected" : u.status === "Retired" ? "Overdue" : "Approved",
            email: u.email || "—",
            division: ep.division || "—",
            zone: st.zone || "—",
            reportingSm: ep.reporting_sm || "—",
            workLocation: ep.work_location || "—",
            shift: ep.shift || "—",
            jurisdiction: ep.jurisdiction || "—",
            reportingAom: "—"
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
      const res = await dbService.saveStation(stationData, mode);
      if (res && res.success === false) {
        throw new Error(res.error || "Unknown database error while saving station.");
      }
      return res;
    } catch (err) {
      console.error("Failed to save station to Supabase: " + err.message);
      throw err;
    }
  },

  async addStation(newStation) {
    if (!isSupabaseConfigured) return;
    try {
      const payload = {
        station_name: newStation.name,
        station_code: newStation.code,
        division: "Nagpur",
        zone: "Central Railway",
        category: "A",
        platforms: 4,
        tracks: 6,
        station_type: "Junction",
        status: "Active"
      };
      const res = await dbService.saveStation(payload, "add");
      if (res && res.success === false) {
        throw new Error(res.error || "Unknown database error while adding station.");
      }
    } catch (err) {
      console.error("Failed to save station to Supabase: " + err.message);
      throw err;
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
      } else {
        const payload = {
          hrmsId: modalData.id,
          name: modalData.name,
          contact: modalData.contact || "—",
          email: modalData.email || `${modalData.id.toLowerCase()}@rail.in`,
          role: roleName,
          station: modalData.station,
          division: modalData.division || "Nagpur",
          gender: "Male",
          age: 35,
          lastDate: modalData.lastDate || new Date().toISOString().split('T')[0],
          basePay: "₹28,500",
          score: mode === "add" ? 0 : (modalData.score !== undefined ? modalData.score : 80),
          safetyScore: mode === "add" ? 0 : 85,
          password: modalData.password, // Added password support
          disciplinary: "None",
          incidents: 0,
          monitoringStatus: "Active",
          reportingSm: modalData.reportingSm || "",
          workLocation: modalData.workLocation || "",
          shift: modalData.shift || "",
          jurisdiction: modalData.jurisdiction || "",
          category: modalData.cat || (mode === "add" ? "Untested" : "A")
        };
        const res = await dbService.saveUser(payload, mode);
        if (res && res.success === false) {
          throw new Error(res.error || "Unknown database error while saving user.");
        }
      }
    } catch (err) {
      console.error("Failed to save user to Supabase: " + err.message);
      throw err;
    }
  },

  async removeUser(id) {
    if (!isSupabaseConfigured) return;
    try {
      const res = await dbService.deleteUser(id);
      if (res && res.success === false) {
        throw new Error(res.error || "Unknown database error while deleting user.");
      }
    } catch (err) {
      console.error("Failed to delete user from Supabase: " + err.message);
      throw err;
    }
  }
};
