
import React from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import { Loader2 } from 'lucide-react';

const AdminPanelContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary/20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <AdminLayout /> : <AdminLogin />;
};

const AdminPanel = () => {
  return (
    <AdminAuthProvider>
      <AdminPanelContent />
    </AdminAuthProvider>
  );
};

export default AdminPanel;
