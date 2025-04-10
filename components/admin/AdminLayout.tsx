
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Users, FolderKanban, MessageSquare } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import TeamManagement from './TeamManagement';
import ProjectManagement from './ProjectManagement';
import CommentManagement from './CommentManagement';

const AdminLayout = () => {
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Admin Header */}
      <header className="bg-background shadow-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">SYNQ Admin Panel</h1>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Admin Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-3xl mx-auto">
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team Members</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Comments</span>
              <span className="sm:hidden">Comments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-6">
            <TeamManagement />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <CommentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminLayout;
