
import React from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminPanelContent = () => {
  const { isAuthenticated } = useAdminAuth();

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
