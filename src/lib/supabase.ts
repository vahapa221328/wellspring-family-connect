
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogknvclhpzhibhbgqgue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na252Y2xocHpoaWJoYmdxZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIyNTIsImV4cCI6MjA1OTE1ODI1Mn0.vwocTVlBV9JMdwjJACQXNzCJQbzw2ZE-oRSaN6eU-90';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Auth listener helper
export const setupAuthListener = (callback: (event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED', session: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event as 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED', session);
  });
};

// Helper to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};
