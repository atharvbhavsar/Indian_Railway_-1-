const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const urls = env.match(/VITE_SUPABASE_URL=(.*)/);
const keys = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
const VITE_SUPABASE_URL = urls ? urls[1].trim() : '';
const VITE_SUPABASE_ANON_KEY = keys ? keys[1].trim() : '';

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

async function listAssessments() {
  const { data, error } = await supabase
    .from("ASSESSMENT")
    .select(`
      assessment_id, 
      employee_id, 
      assessment_type, 
      status, 
      assessment_date,
      USERS!employee_id (hrms_id, full_name)
    `);
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}
listAssessments();
