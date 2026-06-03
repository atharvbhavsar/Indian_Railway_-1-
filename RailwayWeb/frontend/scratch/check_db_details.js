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

async function check() {
  const { data: users, error } = await supabase
    .from("USERS")
    .select(`
      user_id,
      hrms_id,
      full_name,
      email,
      ROLE (role_name),
      EMPLOYEE_PROFILE (
        station_id,
        current_score,
        safety_score,
        STATION (station_name)
      )
    `);
  if (error) console.error(error);
  else console.log("USERS:", JSON.stringify(users, null, 2));
}
check();
