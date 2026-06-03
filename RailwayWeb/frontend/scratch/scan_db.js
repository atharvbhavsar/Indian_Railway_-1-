import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const expectedTables = [
  "ROLE", "DIVISION", "STATION", "USERS", "SUPER_ADMIN", "AOM", "TRAFFIC_INSPECTOR",
  "STATION_SUPERINTENDENT", "STATION_MASTER", "TRAIN_MANAGER", "POINTSMAN",
  "EMPLOYEE_PROFILE", "PME_RECORD", "TRAINING_RECORD", "MONITORING", "QUESTION_BANK",
  "ASSESSMENT", "TEST_ATTEMPT", "ANSWER_HISTORY", "APPROVAL", "REVIEW", "SAFETY_RECORD",
  "REPORT", "NOTIFICATION", "AUDIT_LOG", "COUNSELLING_RECORD"
];

async function scanDatabase() {
  console.log("Scanning Supabase Database...");
  let missingTables = [];
  
  for (const table of expectedTables) {
    const { error } = await supabase.from(table).select("*").limit(1);
    if (error && error.code === 'PGRST205') {
      missingTables.push(table);
    }
  }

  console.log("\n--- RESULTS ---");
  if (missingTables.length > 0) {
    console.log("Missing Tables:", missingTables.join(", "));
  } else {
    console.log("All tables exist.");
  }
}
scanDatabase();
