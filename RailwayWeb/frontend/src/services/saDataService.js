import { dbService, isSupabaseConfigured } from "../supabaseClient";

export const saDataService = {
  async fetchStations() {
    if (!isSupabaseConfigured) return [];
    try {
      const stationsData = await dbService.getAllStations();
      if (stationsData && stationsData.length > 0) {
        return stationsData.map((s, index) => ({
          id: s.station_id || `ST_${1001 + index}`,
          name: s.station_name,
          code: s.station_code,
          ti: "TI NGP", // Default fallback
          smCount: 3, // Mock / calculated
          pmCount: 20,
          score: s.avg_score || 85,
          safety: s.safety_compliance || 90,
          highRisk: 1,
          pending: 2
        }));
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
          const ep = u.EMPLOYEE_PROFILE?.[0] || {};
          const st = ep.STATION || {};

          // Map role to SuperAdminModule expectations: pointsmen, sm, ss, tm, ti
          let superAdminRole = "pointsmen";
          if (roleName === "Station Master") superAdminRole = "sm";
          else if (roleName === "Station Superintendent") superAdminRole = "ss";
          else if (roleName === "Train Manager") superAdminRole = "tm";
          else if (roleName === "Traffic Inspector") superAdminRole = "ti";

          const lastScore = ep.current_score || 80;
          const safetyScore = ep.safety_score || 85;

          const cat = lastScore >= 80 ? "A" : lastScore >= 50 ? "B" : lastScore >= 26 ? "C" : "D";
          const risk = (safetyScore < 60 || lastScore < 50) ? "High" : (safetyScore < 75 || lastScore < 65) ? "Medium" : "Low";

          return {
            id: u.hrms_id,
            name: u.full_name,
            role: superAdminRole,
            station: st.station_name || "Nagpur Junction",
            ti: "TI NGP", // Default
            cat,
            risk,
            score: lastScore,
            contact: u.mobile_no || "",
            lastDate: ep.date_of_joining || "2026-04-10",
            status: "Approved",
            email: u.email || "",
            division: ep.division || "Nagpur",
            zone: st.zone || "Central Railway",
            reportingSm: ep.reporting_sm || "",
            workLocation: ep.work_location || "",
            shift: ep.shift || "",
            jurisdiction: ep.jurisdiction || "Nagpur Division",
            reportingAom: "P. K. Verma (Sr. DOM)"
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch SA users:", err);
    }
    return [];
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
      await dbService.saveStation(payload, "add");
    } catch (err) {
      console.error("Failed to save station to Supabase: " + err.message);
      throw err;
    }
  },

  async saveUser(modalData, mode) {
    if (!isSupabaseConfigured) return;
    try {
      let roleName = "Pointsman";
      if (modalData.role === "sm") roleName = "Station Master";
      else if (modalData.role === "ss") roleName = "Station Superintendent";
      else if (modalData.role === "tm") roleName = "Train Manager";
      else if (modalData.role === "ti") roleName = "Traffic Inspector";

      if (mode === "shift") {
        await dbService.shiftUserRole(modalData.id, roleName);
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
          score: modalData.score || 80,
          safetyScore: 85,
          disciplinary: "None",
          incidents: 0,
          monitoringStatus: "Active",
          reportingSm: modalData.reportingSm || "",
          workLocation: modalData.workLocation || "",
          shift: modalData.shift || "",
          jurisdiction: modalData.jurisdiction || "",
          category: modalData.cat || "A"
        };
        await dbService.saveUser(payload, mode);
      }
    } catch (err) {
      console.error("Failed to save user to Supabase: " + err.message);
      throw err;
    }
  },

  async removeUser(id) {
    if (!isSupabaseConfigured) return;
    try {
      await dbService.deleteUser(id);
    } catch (err) {
      console.error("Failed to delete user from Supabase: " + err.message);
      throw err;
    }
  }
};
