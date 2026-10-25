
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
