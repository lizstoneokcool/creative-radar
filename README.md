# Creative Radar — Daily Curation Dashboard

Your team's daily creative inspiration feed. Surfaces the best ads, campaigns, brand content, and creator work from across the internet.

---

## How to deploy this (step by step, no coding required)

### Step 1: Create a GitHub account
- Go to **github.com** and sign up (free)
- Once signed in, click the **+** button in the top right → **New repository**
- Name it `creative-radar`
- Keep it set to **Public** (or Private if you prefer)
- Click **Create repository**

### Step 2: Upload these files to GitHub
- On your new repository page, click **"uploading an existing file"**
- Drag the entire contents of this folder into the upload area
  - Make sure you include: `package.json`, `next.config.js`, and the `app` folder
- Click **Commit changes**

### Step 3: Deploy on Vercel
- Go to **vercel.com** and sign up using your GitHub account
- Click **"Add New Project"**
- It will show your GitHub repos — select **creative-radar**
- Leave all settings as default
- Click **Deploy**
- Wait about 60 seconds — Vercel will give you a live URL like `creative-radar.vercel.app`

### Step 4: Share with your team
- Send your team the Vercel URL
- That's it — they can open it on any device

---

## How to make changes later

Open a new conversation with Claude and say something like:
- "Here's my Creative Radar dashboard code. Can you add a dark mode toggle?"
- "Can you change the scoring scale from 0-100 to a 5-star system?"
- "Add a new content type called 'UGC' to the filters"

Claude will give you updated code. Replace the file in GitHub, and Vercel will automatically redeploy.

---

## What's next (future phases)

- **Phase 2**: Connect real content feeds (YouTube API, RSS, Reddit API)
- **Phase 3**: Add AI scoring via Anthropic API
- **Phase 4**: Team submission flow with Slack integration
