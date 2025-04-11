
import { supabase } from '@/config/supabase';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const TABLE_NAME = 'team_members';

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');
  
  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
  
  return data || [];
};

export const addTeamMember = async (teamMember: Omit<TeamMember, 'id'>): Promise<string> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(teamMember)
    .select('id')
    .single();
  
  if (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
  
  return data.id;
};

export const updateTeamMember = async (id: string, teamMember: Partial<Omit<TeamMember, 'id'>>): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(teamMember)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};

export const initializeTeamMembers = async (teamMembers: Omit<TeamMember, 'id'>[]): Promise<void> => {
  // Check if team members table is empty first
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id');
  
  if (error) {
    console.error('Error checking team members:', error);
    throw error;
  }
  
  if (data.length === 0 && teamMembers.length > 0) {
    // Only initialize if table is empty
    const { error: insertError } = await supabase
      .from(TABLE_NAME)
      .insert(teamMembers);
    
    if (insertError) {
      console.error('Error initializing team members:', insertError);
      throw insertError;
    }
  }
};
