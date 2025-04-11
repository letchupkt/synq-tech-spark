
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Get environment variables for Supabase
// If environment variables aren't available, use these defaults for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zewwhcmoidkckfgehrim.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpld3doY21vaWRrY2tmZ2VocmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNTM0MDMsImV4cCI6MjA1OTgyOTQwM30.08A0rzRipveqknaWW7br9qEs6Oi6KxlxVfeLqtyOtvs';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    // Add better error handling and retries to all requests
    fetch: async (url, options = {}) => {
      try {
        return await fetch(url, {
          ...options,
          headers: options.headers || {},
        });
      } catch (error) {
        console.error('Supabase fetch error:', error);
        throw error;
      }
    },
  },
});

// Log a warning instead of an error to avoid blocking the app
if (import.meta.env.DEV && (supabaseUrl === 'https://zewwhcmoidkckfgehrim.supabase.co' || supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpld3doY21vaWRrY2tmZ2VocmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNTM0MDMsImV4cCI6MjA1OTgyOTQwM30.08A0rzRipveqknaWW7br9qEs6Oi6KxlxVfeLqtyOtvs')) {
  console.warn('⚠️ Using default Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for proper functionality.');

  // Show a toast to inform the user
  if (typeof window !== 'undefined') {
    // Wait for the app to fully load before showing the toast
    setTimeout(() => {
      toast.warning('Using default Supabase configuration', {
        description: 'This is for development purposes only. Please provide your own Supabase credentials.',
        duration: 8000,
      });
    }, 2000);
  }
}
