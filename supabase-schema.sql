-- Run this in your Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- This creates the table that stores all your curated content

CREATE TABLE IF NOT EXISTS content (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  summary TEXT,
  why_it_works TEXT,
  source TEXT,
  platform TEXT,
  author TEXT,
  content_type TEXT DEFAULT 'Campaign',
  score INTEGER DEFAULT 0,
  is_gold_standard BOOLEAN DEFAULT FALSE,
  engagement TEXT,
  published_at TIMESTAMPTZ,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  saved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_content_score ON content (score DESC);
CREATE INDEX IF NOT EXISTS idx_content_date ON content (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_url ON content (url);

-- Enable Row Level Security (keeps data safe)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Allow public reads (your dashboard can fetch content)
CREATE POLICY "Allow public read" ON content FOR SELECT USING (true);

-- Allow service key to insert/update (your API routes)
CREATE POLICY "Allow service insert" ON content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service update" ON content FOR UPDATE USING (true);
