import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function checkTable() {
  console.log("Checking for COUNSELLING_RECORD table...");
  const { data, error } = await supabase.from("COUNSELLING_RECORD").select("*").limit(1);
  if (error) {
    console.error("Error/Status:", error.message, error.code);
  } else {
    console.log("SUCCESS! The COUNSELLING_RECORD table exists.");
    console.log("Current Data:", data);
  }
}
checkTable();
