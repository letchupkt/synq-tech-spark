
import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import { migrateLocalDataToSupabase } from "./utils/dataMigration";
import { supabase } from './config/supabase';

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isCheckingDB, setIsCheckingDB] = useState(true);

  useEffect(() => {
    // Check if Supabase connection is working
    const checkSupabaseConnection = async () => {
      try {
        setIsCheckingDB(true);
        // Simple query to check if Supabase connection works
        const { error } = await supabase.from('projects').select('id').limit(1);
        
        if (error) {
          console.warn('Supabase connection issue:', error.message);
          toast.error('Database connection issue. Some features may not work properly.', {
            description: 'Please check your Supabase configuration.',
            duration: 5000,
          });
        } else {
          // Run data migration after confirming connection
          await migrateLocalDataToSupabase();
        }
      } catch (err) {
        console.error('Failed to check Supabase connection:', err);
      } finally {
        setIsCheckingDB(false);
      }
    };

    checkSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
