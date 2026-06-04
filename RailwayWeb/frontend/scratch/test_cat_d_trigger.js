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

async function run() {
  const empId = "375f223d-0a88-4e4a-9b64-fbce649dad4d"; // ranjana (Pointsman)
  const condId = "20b2f274-abe3-4d07-ac41-5c903bfcabf4"; // shantanu (Station Master)

  // 1. Create a temporary Assessment
  console.log("Creating temporary assessment...");
  const { data: assessData, error: assessErr } = await supabase.from("ASSESSMENT").insert([{
    employee_id: empId,
    conducted_by: condId,
    assessment_type: "Test Assessment",
    status: "Pending"
  }]).select();

  if (assessErr) {
    console.error("Failed to create assessment:", assessErr);
    return;
  }

  const assessmentId = assessData[0].assessment_id;
  console.log("Created Assessment ID:", assessmentId);

  // 2. Try inserting a counselling record to verify column type
  console.log("Testing COUNSELLING_RECORD insert...");
  const { data: counselData, error: counselErr } = await supabase.from("COUNSELLING_RECORD").insert([{
    user_id: empId,
    assessment_id: assessmentId,
    remarks: "Test Counselling Record",
    status: "Pending"
  }]).select();

  if (counselErr) {
    console.error("COUNSELLING_RECORD insert FAILED:", counselErr);
  } else {
    console.log("COUNSELLING_RECORD insert SUCCESS:", counselData);
    // clean up
    await supabase.from("COUNSELLING_RECORD").delete().eq("assessment_id", assessmentId);
  }

  // clean up assessment
  await supabase.from("ASSESSMENT").delete().eq("assessment_id", assessmentId);
}

run();
