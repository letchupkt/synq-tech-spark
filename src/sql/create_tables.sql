
-- Create the comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  likes INTEGER NOT NULL DEFAULT 0,
  is_approved BOOLEAN NOT NULL DEFAULT false
);

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT,
  description TEXT NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[]
);

-- Create the team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  social_links JSONB DEFAULT '{"linkedin": "", "github": "", "instagram": ""}'::JSONB
);

-- Add comment on JSONB and array columns for clarity
COMMENT ON COLUMN team_members.social_links IS 'JSON object containing social media links (linkedin, github, instagram)';
COMMENT ON COLUMN projects.tech_stack IS 'Array of technology names used in the project';
