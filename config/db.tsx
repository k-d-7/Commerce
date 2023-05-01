import { createClient} from "@supabase/supabase-js";
import { config } from 'dotenv';

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(
    supabaseURL,
    supabaseAnonKey,
    // 'https://ijagxfnyyfihcdjmdmuh.supabase.co',
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYWd4Zm55eWZpaGNkam1kbXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2NjczNDIsImV4cCI6MTk5ODI0MzM0Mn0.MlfZoENdrPylE4jyWi6eQeqVTVO1DQjisZ0e72znGFE'
) 

export default supabase;
