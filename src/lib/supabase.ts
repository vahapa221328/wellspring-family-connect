
import { createClient } from '@supabase/supabase-js';

// Environment variables would be better in a production setting
const supabaseUrl = 'https://ogknvclhpzhibhbgqgue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na252Y2xocHpoaWJoYmdxZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIyNTIsImV4cCI6MjA1OTE1ODI1Mn0.vwocTVlBV9JMdwjJACQXNzCJQbzw2ZE-oRSaN6eU-90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database
export type Family = {
  id: string;
  name: string;
  level: number;
  created_at: string;
  avatar_url?: string;
};

export type FamilyMember = {
  id: string;
  family_id: string;
  name: string;
  role: string;
  level: number;
  avatar_url?: string;
  created_at: string;
};

export type Task = {
  id: string;
  title: string;
  category: string;
  assigned_to: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  due_date: string;
  family_id: string;
  created_at: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  progress: number;
  progress_text: string;
  reward: number;
  days_left: number;
  category: string;
  participants: number;
  family_id: string;
  created_at: string;
};

export type Trip = {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: number;
  travelers: number;
  planning_progress: number;
  status: "upcoming" | "planning" | "past";
  family_id: string;
  created_at: string;
};

export type MoodCheck = {
  id: string;
  member_id: string;
  mood_value: number;
  date: string;
  note?: string;
  created_at: string;
};

// This represents the data we get from the recent_moods view
export type RecentMood = MoodCheck & {
  member_name: string;
  member_avatar_url?: string;
  family_id: string;
};

// Activity types
export type Activity = {
  id: string;
  family_id: string;
  title: string;
  description: string;
  category: string;
  xp_reward: number;
  created_at: string;
};

// Goal types
export type Goal = {
  id: string;
  family_id: string;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
  created_at: string;
};

// Auth Helper functions
export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

