
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const googleMapKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const googleMapApiKey = googleMapKey;