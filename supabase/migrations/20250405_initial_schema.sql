
-- Create auth schema if it doesn't exist 
CREATE SCHEMA IF NOT EXISTS auth;

-- Create families table
CREATE TABLE IF NOT EXISTS families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create family_members table
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  assigned_to TEXT NOT NULL,
  priority TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  due_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  progress_text TEXT NOT NULL,
  reward INTEGER NOT NULL DEFAULT 0,
  days_left INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  participants INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  budget FLOAT NOT NULL DEFAULT 0,
  travelers INTEGER NOT NULL DEFAULT 0,
  planning_progress INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create mood_checks table
CREATE TABLE IF NOT EXISTS mood_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  mood_value INTEGER NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create a view for recent moods that joins with family members
CREATE OR REPLACE VIEW recent_moods AS
  SELECT 
    mc.id,
    mc.mood_value,
    mc.date,
    fm.id as member_id,
    fm.name as member_name,
    fm.family_id
  FROM 
    mood_checks mc
  JOIN 
    family_members fm ON mc.member_id = fm.id
  ORDER BY 
    mc.date DESC;

-- Enable row level security on all tables
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
-- Families: authenticated users can select their families
CREATE POLICY IF NOT EXISTS "Users can view their own families" 
  ON families FOR SELECT 
  TO authenticated
  USING (true);

-- Family members: authenticated users can select members of their families
CREATE POLICY IF NOT EXISTS "Users can view members of their families" 
  ON family_members FOR SELECT 
  TO authenticated
  USING (true);

-- Similar policies for other tables with TO authenticated
CREATE POLICY IF NOT EXISTS "Users can view tasks of their families" 
  ON tasks FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can insert tasks to their families" 
  ON tasks FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Users can update tasks of their families" 
  ON tasks FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can delete tasks of their families" 
  ON tasks FOR DELETE 
  TO authenticated
  USING (true);

-- Challenges
CREATE POLICY IF NOT EXISTS "Users can view challenges of their families" 
  ON challenges FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can insert challenges to their families" 
  ON challenges FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Users can update challenges of their families" 
  ON challenges FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can delete challenges of their families" 
  ON challenges FOR DELETE 
  TO authenticated
  USING (true);

-- Trips
CREATE POLICY IF NOT EXISTS "Users can view trips of their families" 
  ON trips FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can insert trips to their families" 
  ON trips FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Users can update trips of their families" 
  ON trips FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can delete trips of their families" 
  ON trips FOR DELETE 
  TO authenticated
  USING (true);

-- Mood checks
CREATE POLICY IF NOT EXISTS "Users can view mood checks of their family members" 
  ON mood_checks FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can insert mood checks for their family members" 
  ON mood_checks FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Sample data for development
INSERT INTO families (name, level, avatar_url) 
VALUES ('The Jackson Family', 1, '/public/lovable-uploads/ba49412f-5401-4238-af2b-fb6bb3b13a54.png')
ON CONFLICT DO NOTHING;

-- Get the family ID and insert sample data
DO $$
DECLARE
  family_id UUID;
BEGIN
  SELECT id INTO family_id FROM families LIMIT 1;
  
  -- Insert family members if family_id exists
  IF family_id IS NOT NULL THEN
    -- Insert family members
    INSERT INTO family_members (family_id, name, role, level, avatar_url)
    VALUES
      (family_id, 'Jordan Jackson', 'Parent', 6, '/public/lovable-uploads/000c3c36-8517-4a1f-a882-1cf196368cb7.png'),
      (family_id, 'Taylor Jackson', 'Parent', 5, '/public/lovable-uploads/7b99b8a2-99f7-429b-aee6-adcaace0744b.png'),
      (family_id, 'Riley Jackson', 'Child', 3, ''),
      (family_id, 'Casey Jackson', 'Child', 2, '')
    ON CONFLICT DO NOTHING;
    
    -- Insert sample tasks
    INSERT INTO tasks (family_id, title, category, assigned_to, priority, completed, due_date)
    VALUES
      (family_id, 'Plan weekly meals', 'Household', 'Jordan', 'High', TRUE, 'Today'),
      (family_id, 'Family game night', 'Family', 'Everyone', 'Medium', FALSE, 'Tomorrow'),
      (family_id, 'Schedule doctor appointment', 'Health', 'Taylor', 'High', FALSE, 'This week'),
      (family_id, 'Review vacation budget', 'Planning', 'Jordan & Taylor', 'Medium', FALSE, 'This week'),
      (family_id, 'Grocery shopping', 'Household', 'Jordan', 'High', FALSE, 'Tomorrow'),
      (family_id, 'Help with homework', 'Education', 'Taylor', 'Medium', FALSE, 'Today'),
      (family_id, 'Fix leaky faucet', 'Home Maintenance', 'Jordan', 'Low', FALSE, 'This week'),
      (family_id, 'Plan weekend outing', 'Family', 'Everyone', 'Medium', FALSE, 'Friday')
    ON CONFLICT DO NOTHING;
    
    -- Insert sample challenges
    INSERT INTO challenges (family_id, title, description, progress, progress_text, reward, days_left, category, participants)
    VALUES
      (family_id, 'Weekly Family Dinner', 'Share a meal together 3 times this week', 66, '2/3 completed', 10, 2, 'Social', 4),
      (family_id, 'Trip Planning', 'Complete your vacation checklist', 45, '9/20 tasks', 25, 10, 'Planning', 4),
      (family_id, 'Digital Detox', 'Spend 2 hours per day without screens', 30, '3/10 days', 15, 7, 'Wellbeing', 3)
    ON CONFLICT DO NOTHING;
    
    -- Insert sample trips
    INSERT INTO trips (family_id, title, location, start_date, end_date, budget, travelers, planning_progress, status)
    VALUES
      (family_id, 'Beach Vacation', 'Miami, Florida', 'July 15, 2025', 'July 22, 2025', 2500, 4, 45, 'upcoming'),
      (family_id, 'Mountain Cabin Getaway', 'Asheville, NC', 'October 5, 2025', 'October 9, 2025', 1200, 4, 15, 'planning')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
