import { createClient } from "@supabase/supabase-js";
import { logger } from "../logger";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabase;

if (!isSupabaseConfigured) {
  logger.warn(
    "Supabase credentials missing. The system is currently running on High-Fidelity Local Mock Mode."
  );
}
