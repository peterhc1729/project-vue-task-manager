import { createClient } from "@supabase/supabase-js";

// get the Supabase project URL from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// get the Supabase anon key from the .env file
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// creating and exporting the Supabase client to be used throughout the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
