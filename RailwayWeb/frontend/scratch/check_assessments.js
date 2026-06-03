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
  const { data, error } = await supabase.rpc("get_tables");
  if (error) {
    // If get_tables RPC is not defined, we can fetch from postgres pg_tables via REST
    // Let's run a query that might succeed if we query an endpoint, or we can fetch a known endpoint.
    console.error("RPC error:", error);
    
    // Let's try standard schema queries if possible, but REST API doesn't allow random SQL queries unless there's an RPC.
    // Let's try calling another custom RPC if it exists, or just query known tables.
  } else {
    console.log("Tables:", data);
  }
}
check();
