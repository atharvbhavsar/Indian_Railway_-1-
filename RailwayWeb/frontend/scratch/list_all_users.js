import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function listUsers() {
  const { data, error } = await supabase.from("USERS").select("hrms_id, password_hash, full_name, role_id");
  console.log(data);
}
listUsers();
