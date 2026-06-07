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
  const { data: c } = await supabase.from("COUNSELLING_RECORD").select("*").limit(1);
  if (c && c.length > 0) {
    console.log("COUNSELLING_RECORD columns:", Object.keys(c[0]));
  }
  const { data: r } = await supabase.from("RETEST_SCHEDULING").select("*").limit(1);
  if (r && r.length > 0) {
    console.log("RETEST_SCHEDULING columns:", Object.keys(r[0]));
  }
  const { data: m } = await supabase.from("MONITORING").select("*").limit(1);
  if (m && m.length > 0) {
    console.log("MONITORING columns:", Object.keys(m[0]));
  }
}
check();
