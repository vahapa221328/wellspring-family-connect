
import { createClient } from '@supabase/supabase-js';

// Environment variables would be better in a production setting
const supabaseUrl = 'https://ogknvclhpzhibhbgqgue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na252Y2xocHpoaWJoYmdxZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIyNTIsImV4cCI6MjA1OTE1ODI1Mn0.vwocTVlBV9JMdwjJACQXNzCJQbzw2ZE-oRSaN6eU-90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
