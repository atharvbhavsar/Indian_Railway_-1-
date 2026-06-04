import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync("d:/RailwayWeb/RailwayWeb/frontend/.env", "utf8");
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

const tables = [
  "ROLE", "DIVISION", "STATION", "USERS", "SUPER_ADMIN", "AOM", "TRAFFIC_INSPECTOR",
  "STATION_SUPERINTENDENT", "STATION_MASTER", "TRAIN_MANAGER", "POINTSMAN",
  "EMPLOYEE_PROFILE", "PME_RECORD", "TRAINING_RECORD", "MONITORING",
  "QUESTION_BANK", "ASSESSMENT", "TEST_ATTEMPT", "ANSWER_HISTORY",
  "APPROVAL", "REVIEW", "SAFETY_RECORD", "REPORT", "NOTIFICATION",
  "AUDIT_LOG", "COUNSELLING_RECORD", "RETEST_SCHEDULING"
];

async function check() {
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select("*").limit(1);
    if (error) {
      console.log(`Table ${t}: FAILED (${error.message}, code: ${error.code})`);
    } else {
      console.log(`Table ${t}: SUCCESS`);
    }
  }
}
check();
