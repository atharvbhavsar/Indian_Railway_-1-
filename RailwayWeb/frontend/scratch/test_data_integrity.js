import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Load environment variables
const envContent = fs.readFileSync(".env", "utf8");
const vars = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    vars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = vars.VITE_SUPABASE_URL;
const supabaseAnonKey = vars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dbService = {
  async getAllUsers() {
    const { data, error } = await supabase
      .from("USERS")
      .select(`
        *,
        ROLE!role_id (role_name),
        EMPLOYEE_PROFILE!user_id (
          *,
          STATION!station_id (*)
        )
      `);
    if (error) throw error;
    return data;
  }
};

const saDataService = {
  async fetchUsers() {
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
          linkedStations: superAdminRole === "ti" ? (ep.jurisdiction || "") : "",
          reportingAom: "—"
        };
      });
    }
    return [];
  }
};

async function runTest() {
  console.log("Fetching users from saDataService...");
  const users = await saDataService.fetchUsers();

  console.log("\n1. TRAFFIC INSPECTORS JURISDICTIONS:");
  const tis = users.filter(u => u.role === "ti");
  tis.forEach(ti => {
    console.log(`TI Name: ${ti.name} | HRMS ID: ${ti.id} | Jurisdiction: ${ti.jurisdiction} | linkedStations: "${ti.linkedStations}"`);
  });

  console.log("\n2. STATION MASTER TI ASSIGNMENTS:");
  const sms = users.filter(u => u.role === "sm");
  sms.forEach(sm => {
    const userStation = sm.station || "";
    
    // TI Assignment check logic
    const assignedTi = tis.find(x => {
      const rawStations = x.linkedStations || x.jurisdiction || "";
      if (userStation && rawStations && rawStations !== "—") {
        const tiStList = rawStations.split(",").map(s => s.trim().toLowerCase());
        return tiStList.includes(userStation.toLowerCase().trim());
      }
      return false;
    });

    console.log(`SM Name: ${sm.name} | Station: ${sm.station} | Assigned TI: ${assignedTi ? assignedTi.name : "No TI Assigned"}`);
  });

  console.log("\n3. TRAFFIC INSPECTOR DATA SEGREGATION FILTERING:");
  tis.forEach(ti => {
    const rawStations = ti.linkedStations || ti.jurisdiction || "";
    const tiStations = rawStations && rawStations !== "—" ? rawStations.split(",").map(s => s.trim().toLowerCase()) : [];
    
    const filteredSms = sms.filter(x => x.station && tiStations.includes(x.station.toLowerCase().trim()));
    const smNames = filteredSms.map(x => x.name).join(", ") || "None";
    console.log(`TI: ${ti.name} | Supervised Stations: ${tiStations.join(", ")} | Visible SMs: [${smNames}]`);
  });
}

runTest().catch(console.error);
