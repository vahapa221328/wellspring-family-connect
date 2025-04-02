
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

// Function to initialize the database schema if needed
export const initializeSchema = async () => {
  console.log('Checking and initializing database schema...');
  
  // Check if profiles table exists by attempting a simple query
  const { error: checkError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);
  
  if (checkError) {
    console.log('Profiles table may not exist or has incorrect schema. Creating it...');
    
    // Using SQL to create the profiles table with the correct schema
    const { error: createError } = await supabase.rpc('create_profiles_table', {});
    
    if (createError) {
      console.error('Failed to create profiles table:', createError);
      
      // If the RPC function doesn't exist, we'll need to create the table manually
      // This requires a stored procedure to be created in the Supabase SQL editor
      console.log('Please run the following SQL in the Supabase SQL editor to create the profiles table:');
      console.log(`
        CREATE TABLE IF NOT EXISTS public.profiles (
          id UUID REFERENCES auth.users(id) PRIMARY KEY,
          full_name TEXT,
          email TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          age INTEGER,
          bio TEXT,
          goals JSONB,
          preferences JSONB
        );

        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own profile"
          ON public.profiles
          FOR SELECT
          USING (auth.uid() = id);
          
        CREATE POLICY "Users can update their own profile"
          ON public.profiles
          FOR UPDATE
          USING (auth.uid() = id);
          
        CREATE POLICY "Users can insert their own profile"
          ON public.profiles
          FOR INSERT
          WITH CHECK (auth.uid() = id);
      `);
    } else {
      console.log('Profiles table created successfully!');
    }
  } else {
    console.log('Profiles table already exists.');
  }
};

// Call this function when the app initializes
// Temporarily comment this out as we can't create tables directly from the client
// This is just to generate the SQL that needs to be run in the Supabase SQL editor
// initializeSchema();
