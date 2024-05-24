import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = new QueryClient();

export const SupabaseProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const fetchPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const fetchReactions = async () => {
  const { data, error } = await supabase.from('reactions').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const addPost = async (newPost) => {
  const { data, error } = await supabase.from('posts').insert(newPost);
  if (error) throw new Error(error.message);
  return data;
};

const addReaction = async (newReaction) => {
  const { data, error } = await supabase.from('reactions').insert(newReaction);
  if (error) throw new Error(error.message);
  return data;
};

export const usePosts = () => useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
export const useReactions = () => useQuery({ queryKey: ['reactions'], queryFn: fetchReactions });
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};
export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation(addReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('reactions');
    },
  });
};