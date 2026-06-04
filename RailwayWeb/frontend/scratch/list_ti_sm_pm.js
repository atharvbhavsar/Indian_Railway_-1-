import { createClient } from "@supabase/supabase-js";
import fs from "fs";

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

async function listUsers() {
  const { data: users, error } = await supabase
    .from("USERS")
    .select(`
      hrms_id,
      full_name,
      password_hash,
      ROLE (role_name),
      EMPLOYEE_PROFILE (
        jurisdiction,
        STATION (station_name)
      )
    `);

  if (error) {
    console.error(error);
    return;
  }

  let out = "";
  users.forEach(u => {
    const role = u.ROLE?.role_name || "Unknown";
    if (role === "Traffic Inspector" || role === "Station Master") {
      const ep = Array.isArray(u.EMPLOYEE_PROFILE) ? u.EMPLOYEE_PROFILE[0] : u.EMPLOYEE_PROFILE;
      const station = ep?.STATION?.station_name || "—";
      const jur = ep?.jurisdiction || "—";
      out += `HRMS: ${u.hrms_id} | Name: ${u.full_name} | Password: ${u.password_hash} | Role: ${role} | Station: ${station} | Jurisdiction: ${jur}\n`;
    }
  });
  fs.writeFileSync("ti_sm_list.txt", out);
  console.log("Done");
}

listUsers();
