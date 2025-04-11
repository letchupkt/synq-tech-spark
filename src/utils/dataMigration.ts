
import { initializeTeamMembers } from '@/services/teamService';
import { initializeProjects } from '@/services/projectService';
import { initializeComments } from '@/services/commentService';

export const migrateLocalDataToSupabase = async () => {
  try {
    console.log('Starting data migration to Supabase...');
    
    // Migrate team members
    try {
      const storedTeam = localStorage.getItem('teamMembers');
      if (storedTeam) {
        const teamMembers = JSON.parse(storedTeam);
        await initializeTeamMembers(teamMembers.map((member: any) => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          image_url: member.photo || member.image_url || '/placeholder.svg',
          social_links: member.social || member.social_links || {
            linkedin: '',
            github: '',
            instagram: ''
          }
        })));
        console.log('Team members migration completed');
      } else {
        // Import from default data if not in localStorage
        const teamData = await import('@/data/team.json');
        await initializeTeamMembers(teamData.default.map((member: any) => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          image_url: member.photo || member.image_url || '/placeholder.svg',
          social_links: member.social || member.social_links || {
            linkedin: '',
            github: '',
            instagram: ''
          }
        })));
        console.log('Default team members imported');
      }
    } catch (teamError) {
      console.error('Error migrating team members:', teamError);
    }

    // Migrate projects
    try {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        await initializeProjects(projects.map((project: any) => ({
          title: project.title,
          type: project.category || project.type || '',
          description: project.description,
          image_url: project.image || project.image_url || '/placeholder.svg',
          demo_url: project.demoUrl || project.demo_url || '',
          github_url: project.githubUrl || project.github_url || '',
          tech_stack: project.technologies || project.tech_stack || []
        })));
        console.log('Projects migration completed');
      } else {
        // Import from default data if not in localStorage
        const projectData = await import('@/data/projects.json');
        await initializeProjects(projectData.default.map((project: any) => ({
          title: project.title,
          type: project.category || project.type || '',
          description: project.description,
          image_url: project.image || project.image_url || '/placeholder.svg',
          demo_url: project.demoUrl || project.demo_url || '',
          github_url: project.githubUrl || project.github_url || '',
          tech_stack: project.technologies || project.tech_stack || []
        })));
        console.log('Default projects imported');
      }
    } catch (projectError) {
      console.error('Error migrating projects:', projectError);
    }

    // Migrate comments
    try {
      const storedComments = localStorage.getItem('synqComments');
      if (storedComments) {
        const comments = JSON.parse(storedComments);
        await initializeComments(comments.map((comment: any) => ({
          name: comment.name,
          email: comment.email,
          comment: comment.comment,
          created_at: comment.date || comment.created_at || new Date().toISOString(),
          likes: comment.likes || 0,
          is_approved: comment.status === 'approved' || comment.is_approved || false
        })));
        console.log('Comments migration completed');
      }
    } catch (commentsError) {
      console.error('Error migrating comments:', commentsError);
    }

    console.log('Data migration to Supabase completed successfully');
  } catch (error) {
    console.error('Error during data migration:', error);
  }
};
