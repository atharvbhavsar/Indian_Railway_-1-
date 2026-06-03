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
  // Let's query one record or fetch table structure using a simple select limit 1
  const { data: assess, error: err1 } = await supabase.from("ASSESSMENT").select("*").limit(1);
  console.log("ASSESSMENT structure:", assess);
  if (err1) console.error(err1);

  const { data: attempts, error: err2 } = await supabase.from("TEST_ATTEMPT").select("*").limit(1);
  console.log("TEST_ATTEMPT structure:", attempts);
  if (err2) console.error(err2);
}
check();
