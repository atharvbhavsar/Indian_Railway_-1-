import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function seedRemainingUsers() {
  const usersToInsert = [
    {
      hrms_id: 'SS_2001',
      username: 'SS_2001',
      password_hash: 'password123',
      full_name: 'Superintendent Rajesh',
      role_id: 4, // Station Superintendent
      email: 'ss2001@railways.gov.in',
      mobile_no: '9876543204',
      status: 'Active'
    },
    {
      hrms_id: 'TM_3001',
      username: 'TM_3001',
      password_hash: 'password123',
      full_name: 'Train Manager Vikram',
      role_id: 6, // Train Manager
      email: 'tm3001@railways.gov.in',
      mobile_no: '9876543206',
      status: 'Active'
    }
  ];
  const { data, error } = await supabase.from("USERS").upsert(usersToInsert, { onConflict: 'hrms_id' });
  if (error) {
    console.error("Error inserting remaining users:", error);
  } else {
    console.log("Successfully seeded remaining users.");
  }
}
seedRemainingUsers();
