
import { supabase } from '@/config/supabase';

export interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
  likes: number;
  is_approved: boolean;
}

const TABLE_NAME = 'comments';

export const getComments = async (): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');
  
  if (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
  
  return data || [];
};

export const getApprovedComments = async (): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('is_approved', true);
  
  if (error) {
    console.error('Error fetching approved comments:', error);
    throw error;
  }
  
  return data || [];
};

export const addComment = async (comment: Omit<Comment, 'id'>): Promise<string> => {
  // Log the comment to help with debugging
  console.log('Submitting comment:', comment);
  
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(comment)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
    
    console.log('Comment submitted successfully:', data);
    return data.id;
  } catch (error) {
    console.error('Caught error when adding comment:', error);
    throw error;
  }
};

export const updateComment = async (id: string, comment: Partial<Omit<Comment, 'id'>>): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(comment)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const updateCommentStatus = async (id: string, is_approved: boolean): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ is_approved })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating comment status:', error);
    throw error;
  }
};

export const incrementLikes = async (id: string): Promise<void> => {
  // First get current likes value
  const { data, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('likes')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching comment likes:', fetchError);
    throw fetchError;
  }
  
  const currentLikes = data?.likes || 0;
  
  // Then update with incremented value
  const { error: updateError } = await supabase
    .from(TABLE_NAME)
    .update({ likes: currentLikes + 1 })
    .eq('id', id);
  
  if (updateError) {
    console.error('Error incrementing likes:', updateError);
    throw updateError;
  }
};

export const deleteComment = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const initializeComments = async (comments: Omit<Comment, 'id'>[]): Promise<void> => {
  try {
    // Check if comments table is empty first
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('id');
    
    if (error) {
      console.error('Error checking comments:', error);
      throw error;
    }
    
    if (data.length === 0 && comments.length > 0) {
      // Only initialize if table is empty
      const { error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert(comments);
      
      if (insertError) {
        console.error('Error initializing comments:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error in initializeComments:', error);
    // Fail silently to avoid breaking the app
  }
};
