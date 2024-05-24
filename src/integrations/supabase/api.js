import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to fetch data
const fetchData = async (table) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Helper function to insert data
const insertData = async (table, payload) => {
  const { data, error } = await supabase.from(table).insert(payload);
  if (error) throw new Error(error.message);
  return data;
};

// Custom hook to fetch posts
export const usePosts = () => {
  return useQuery(['posts'], () => fetchData('posts'));
};

// Custom hook to add a post
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation((newPost) => insertData('posts', newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};

// Custom hook to fetch reactions
export const useReactions = () => {
  return useQuery(['reactions'], () => fetchData('reactions'));
};

// Custom hook to add a reaction
export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation((newReaction) => insertData('reactions', newReaction), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reactions']);
    },
  });
};