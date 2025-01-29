// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// Get these values from your Supabase Project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Your Supabase anon key

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
