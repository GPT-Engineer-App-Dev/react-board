// src/integrations/supabase/types.ts

export interface Reaction {
  id: number; // Primary Key
  post_id: number; // Foreign Key to posts.id
  user_id: string;
  emoji: string;
}

export interface Post {
  id: number; // Primary Key
  title: string;
  body: string;
  created_at: string; // Timestamp with time zone
  author_id: string;
}