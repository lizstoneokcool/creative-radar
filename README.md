# Creative Radar — Phase 2: Live Content Pipeline

Your team's daily internet culture feed, powered by real-time RSS pulls and AI scoring.

**How it works:** Hit "Refresh today" and the tool scans Creative Review, Ad Age, Campaign Live, Famous Campaigns, Ads of the World, Reddit, and more. Every article gets scored by AI for creative originality, social-first thinking, and cultural relevance. The best stuff rises to the top.

---

## Setup Guide (one-time, ~15 minutes)

### Step 1: Create a Supabase database (free)

1. Go to **supabase.com** and sign up
2. Click **New Project** → name it `creative-radar` → set a password → click **Create**
3. Wait for it to finish setting up (~30 seconds)
4. Go to **SQL Editor** in the left sidebar
5. Copy the ENTIRE contents of the `supabase-schema.sql` file in this project
6. Paste it into the SQL Editor and click **Run**
7. You should see "Success" — your database is ready

**Get your keys:**
- Go to **Settings** → **API** in the left sidebar
- Copy the **Project URL** (looks like `https://xxxx.supabase.co`)
- Copy the **service_role key** (the long secret one, NOT the anon key)

### Step 2: Get an Anthropic API key

1. Go to **console.anthropic.com** and sign up
2. Go to **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`)
4. Add some credits ($5 is plenty to start — each refresh costs about $0.01)

### Step 3: Upload to GitHub

1. Go to your existing `creative-radar` repo on GitHub
2. Delete all old files (select all → delete → commit)
3. Upload all files from this folder → commit

### Step 4: Add environment variables in Vercel

This is the crucial step that connects everything:

1. Go to **vercel.com** → your `creative-radar` project
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |

4. Click **Save** for each one
5. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

### Step 5: Hit Refresh!

1. Open your Creative Radar URL
2. You should see "Demo mode" in the header
3. Click **↻ Refresh today**
4. Wait 15-30 seconds while it scans all your sources
5. The status will switch to **Live** and real content will appear!

---

## Daily Usage

- **Refresh today**: Click anytime to scan all sources for new content
- **Filters**: Filter by platform (TikTok, Instagram, YouTube, etc.) or content type
- **Gold standard**: Highlights content from/about your tracked brands
- **Submit link**: Drop links your team finds manually
- **Search**: Search across titles, summaries, and authors

## Adding or Removing Sources

Edit the file `lib/sources.js` — it's the single config file that controls:
- **RSS_SOURCES**: Publications and blogs to pull from
- **REDDIT_SOURCES**: Subreddits to monitor
- **GOLD_STANDARD_BRANDS**: Brands that get priority highlighting
- **RELEVANCE_KEYWORDS**: Terms that signal creative/marketing content

To change sources, edit this file on GitHub and Vercel auto-redeploys.

---

## What's Next (Phase 3+)

- **Automatic daily refresh**: Set up a Vercel Cron Job to refresh every morning at 8am
- **Slack digest**: Send the top 5 picks to your team's Slack channel daily
- **Taste training**: AI learns your preferences from saved items
- **Email digest**: Weekly roundup email to your team
