
import { initializeTeamMembers } from '@/services/teamService';
import { initializeProjects } from '@/services/projectService';
import { initializeComments } from '@/services/commentService';

export const migrateLocalDataToSupabase = async () => {
  try {
    // Migrate team members
    const storedTeam = localStorage.getItem('teamMembers');
    if (storedTeam) {
      const teamMembers = JSON.parse(storedTeam);
      await initializeTeamMembers(teamMembers.map((member: any) => ({
        name: member.name,
        role: member.role,
        bio: member.bio,
        photo: member.photo,
        social: member.social || {}
      })));
    } else {
      // Import from default data if not in localStorage
      const teamData = await import('@/data/team.json');
      await initializeTeamMembers(teamData.default.map((member: any) => ({
        name: member.name,
        role: member.role,
        bio: member.bio,
        photo: member.photo || '/placeholder.svg',
        social: member.social || {}
      })));
    }

    // Migrate projects
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      await initializeProjects(projects.map((project: any) => ({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image || '/placeholder.svg',
        demoUrl: project.demoUrl || '#',
        githubUrl: project.githubUrl || '#',
        technologies: project.technologies || []
      })));
    } else {
      // Import from default data if not in localStorage
      const projectData = await import('@/data/projects.json');
      await initializeProjects(projectData.default.map((project: any) => ({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image || '/placeholder.svg',
        demoUrl: project.demoUrl || '#',
        githubUrl: project.githubUrl || '#',
        technologies: project.technologies || []
      })));
    }

    // Migrate comments
    const storedComments = localStorage.getItem('synqComments');
    if (storedComments) {
      const comments = JSON.parse(storedComments);
      await initializeComments(comments.map((comment: any) => ({
        name: comment.name,
        email: comment.email,
        comment: comment.comment,
        date: comment.date,
        likes: comment.likes || 0,
        status: comment.status || 'approved'
      })));
    }

    console.log('Data migration to Supabase completed successfully');
  } catch (error) {
    console.error('Error during data migration:', error);
  }
};
