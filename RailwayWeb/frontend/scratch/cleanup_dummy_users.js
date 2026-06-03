import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function cleanupDummyData() {
  console.log("Starting cleanup of dummy operational staff and their associated records...");

  // 1. Wipe all test & operational records to avoid Foreign Key RESTRICT constraints
  console.log("Wiping TEST_ATTEMPT, ASSESSMENT, APPROVAL, COUNSELLING_RECORD, INCIDENT, NOTIFICATION...");
  await supabase.from("COUNSELLING_RECORD").delete().neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all
  await supabase.from("TEST_ATTEMPT_QUESTION").delete().neq("attempt_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("TEST_ATTEMPT").delete().neq("attempt_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("APPROVAL_REVIEW").delete().neq("review_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("APPROVAL").delete().neq("approval_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("ASSESSMENT").delete().neq("assessment_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("INCIDENT").delete().neq("incident_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("NOTIFICATION").delete().neq("notification_id", "00000000-0000-0000-0000-000000000000");

  // 2. Get role IDs for PM, SM, SS, TM, TI
  const { data: roles } = await supabase.from("ROLE").select("role_id, role_name");
  const targetRoles = ["Pointsman", "Station Master", "Station Superintendent", "Train Manager", "Traffic Inspector"];
  const targetRoleIds = roles.filter(r => targetRoles.includes(r.role_name)).map(r => r.role_id);

  console.log("Found Role IDs to delete:", targetRoleIds);

  if (targetRoleIds.length > 0) {
    // 3. Delete from USERS. Because of CASCADE, this will wipe EMPLOYEE_PROFILE and SUBTYPE tables.
    console.log("Deleting users...");
    const { data, error } = await supabase
      .from("USERS")
      .delete()
      .in("role_id", targetRoleIds);
      
    if (error) {
      console.error("Error deleting users:", error.message);
    } else {
      console.log("Successfully deleted all dummy operational users! The database is now clean for fresh entries.");
    }
  }
}

cleanupDummyData();
