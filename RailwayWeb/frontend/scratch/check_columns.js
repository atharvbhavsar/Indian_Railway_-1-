import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkColumns() {
  const { data, error } = await supabase.from("EMPLOYEE_PROFILE").select("current_score, safety_score, monitoring_status, station_id, division, reporting_sm, work_location, shift, jurisdiction, pme_status, refresher_status, category").limit(1);
  if (error) {
    console.error("Missing columns in EMPLOYEE_PROFILE:", error.message);
  } else {
    console.log("All patch columns exist in EMPLOYEE_PROFILE.");
  }
}
checkColumns();
