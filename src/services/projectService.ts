
import { supabase } from '@/config/supabase';

export interface Project {
  id: string;
  title: string;
  type?: string;      // Changed from category to type
  description: string;
  image_url?: string; // Changed from image to image_url
  demo_url?: string;  // Changed from demoUrl to demo_url
  github_url?: string; // Changed from githubUrl to github_url
  tech_stack?: string[];  // Changed from technologies to tech_stack
}

const TABLE_NAME = 'projects';

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  return data || [];
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<string> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(project)
    .select('id')
    .single();
  
  if (error) {
    console.error('Error adding project:', error);
    throw error;
  }
  
  return data.id;
};

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(project)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const initializeProjects = async (projects: Omit<Project, 'id'>[]): Promise<void> => {
  try {
    // Check if projects table is empty first
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('id');
    
    if (error) {
      console.error('Error checking projects:', error);
      throw error;
    }
    
    if (data.length === 0 && projects.length > 0) {
      // Only initialize if table is empty
      const { error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert(projects);
      
      if (insertError) {
        console.error('Error initializing projects:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error in initializeProjects:', error);
    // Fail silently to avoid breaking the app
  }
};
