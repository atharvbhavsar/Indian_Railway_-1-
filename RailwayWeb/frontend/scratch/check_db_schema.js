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
  const { data: ti, error: err1 } = await supabase.from("TRAFFIC_INSPECTOR").select("*").limit(1);
  if (ti && ti.length > 0) {
    console.log("TRAFFIC_INSPECTOR columns:", Object.keys(ti[0]));
    console.log("TRAFFIC_INSPECTOR row:", ti[0]);
  }
  if (err1) console.error(err1);

  const { data: ep, error: err2 } = await supabase.from("EMPLOYEE_PROFILE").select("*").limit(1);
  if (ep && ep.length > 0) {
    console.log("EMPLOYEE_PROFILE columns:", Object.keys(ep[0]));
  }
  if (err2) console.error(err2);
}
check();
