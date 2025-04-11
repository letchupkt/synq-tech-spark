
import { createClient } from '@supabase/supabase-js';

// Get environment variables for Supabase
// If environment variables aren't available, use these defaults for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log a warning instead of an error to avoid blocking the app
if (import.meta.env.DEV && (supabaseUrl === 'https://your-project.supabase.co' || supabaseAnonKey === 'your-anon-key')) {
  console.warn('⚠️ Using default Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for proper functionality.');
}
