// All your content sources in one place.
// Edit this file to add or remove sources — no other code changes needed.

export const RSS_SOURCES = [
  // ── PUBLICATIONS (trade press & creative industry) ──
  {
    name: "Creative Review",
    feedUrl: "https://www.creativereview.co.uk/feed/",
    siteUrl: "https://www.creativereview.co.uk",
    category: "publication"
  },
  {
    name: "Ad Age Creativity",
    feedUrl: "https://adage.com/rss/creativity-news.xml",
    siteUrl: "https://adage.com",
    category: "publication"
  },
  {
    name: "Creative Boom",
    feedUrl: "https://www.creativeboom.com/feed/",
    siteUrl: "https://www.creativeboom.com",
    category: "publication"
  },
  {
    name: "It's Nice That",
    feedUrl: "https://www.itsnicethat.com/rss/all",
    siteUrl: "https://www.itsnicethat.com",
    category: "publication"
  },
  {
    name: "Campaign Live",
    feedUrl: "https://www.campaignlive.co.uk/feeds/rss",
    siteUrl: "https://www.campaignlive.co.uk",
    category: "publication"
  },
  {
    name: "Ads of the World",
    feedUrl: "https://www.adsoftheworld.com/rss.xml",
    siteUrl: "https://www.adsoftheworld.com",
    category: "publication"
  },
  {
    name: "Famous Campaigns",
    feedUrl: "https://www.famouscampaigns.com/feed/",
    siteUrl: "https://www.famouscampaigns.com",
    category: "publication"
  },
  {
    name: "The Drum",
    feedUrl: "https://www.thedrum.com/feeds/all.rss",
    siteUrl: "https://www.thedrum.com",
    category: "publication"
  },

  // ── TIER 1: SOCIAL-FIRST NEWSLETTERS (break down individual posts & social strategy) ──
  {
    name: "Link in Bio — Rachel Karten",
    feedUrl: "https://www.milkkarten.net/feed",
    siteUrl: "https://www.milkkarten.net",
    category: "newsletter-tier1"
  },
  {
    name: "ICYMI — Lia Haberman",
    feedUrl: "https://liahaberman.substack.com/feed",
    siteUrl: "https://liahaberman.substack.com",
    category: "newsletter-tier1"
  },
  {
    name: "Because of Marketing",
    feedUrl: "https://www.becauseofmarketing.com/feed",
    siteUrl: "https://www.becauseofmarketing.com",
    category: "newsletter-tier1"
  },
  {
    name: "The Brand Waves",
    feedUrl: "https://thebrandwaves.substack.com/feed",
    siteUrl: "https://thebrandwaves.substack.com",
    category: "newsletter-tier1"
  },
  {
    name: "Contagious",
    feedUrl: "https://www.contagious.com/rss",
    siteUrl: "https://www.contagious.com",
    category: "newsletter-tier1"
  },

  // ── TIER 2: CULTURE & TREND (internet culture, youth trends, what brands tap into) ──
  {
    name: "Embedded — Kate Lindsay",
    feedUrl: "https://embedded.substack.com/feed",
    siteUrl: "https://embedded.substack.com",
    category: "newsletter-tier2"
  },
  {
    name: "Garbage Day — Ryan Broderick",
    feedUrl: "https://www.garbageday.email/feed",
    siteUrl: "https://www.garbageday.email",
    category: "newsletter-tier2"
  },
  {
    name: "After School — Casey Lewis",
    feedUrl: "https://afterschool.substack.com/feed",
    siteUrl: "https://afterschool.substack.com",
    category: "newsletter-tier2"
  },
  {
    name: "The Marketing Millennials — Daniel Murray",
    feedUrl: "https://themarketingmillennials.substack.com/feed",
    siteUrl: "https://themarketingmillennials.com",
    category: "newsletter-tier2"
  },
  {
    name: "Marketing Ideas — Tom Orbach",
    feedUrl: "https://marketingideas.substack.com/feed",
    siteUrl: "https://marketingideas.substack.com",
    category: "newsletter-tier2"
  },

  // ── TIER 3: TRADE BLOGS THAT LEAN SOCIAL-FIRST ──
  {
    name: "Social Media Today",
    feedUrl: "https://www.socialmediatoday.com/rss.xml",
    siteUrl: "https://www.socialmediatoday.com",
    category: "blog-tier3"
  },
  {
    name: "Sprout Social Insights",
    feedUrl: "https://sproutsocial.com/insights/feed/",
    siteUrl: "https://sproutsocial.com/insights",
    category: "blog-tier3"
  },
  {
    name: "Later Blog",
    feedUrl: "https://later.com/blog/feed/",
    siteUrl: "https://later.com/blog",
    category: "blog-tier3"
  },
  {
    name: "Muse by Clios",
    feedUrl: "https://musebyclios.com/feed",
    siteUrl: "https://musebyclios.com",
    category: "blog-tier3"
  },
]

// Reddit communities to monitor
export const REDDIT_SOURCES = [
  { name: "r/adporn", url: "https://www.reddit.com/r/adporn/top/.json?t=day&limit=5" },
  { name: "r/Design", url: "https://www.reddit.com/r/Design/top/.json?t=day&limit=5" },
  { name: "r/commercialcuts", url: "https://www.reddit.com/r/commercialcuts/top/.json?t=day&limit=5" },
]

// Gold standard brands — content from or about these gets priority scoring
export const GOLD_STANDARD_BRANDS = [
  "Duolingo", "Scrub Daddy", "Ryanair", "Nutter Butter", "Jacquemus",
  "Burberry", "Loewe", "Coinbase", "Manors Golf", "Berghaus", "Poppi", "Anti-mid"
]

// Creator watchlist — these can't be auto-pulled, but are tracked for manual submission
// Your team should check these daily and submit standout posts via the Submit button
export const CREATOR_WATCHLIST = [
  {
    name: "Sam | Culture & Marketing",
    handle: "@directorofsocial",
    platform: "TikTok",
    url: "https://www.tiktok.com/@directorofsocial",
    bio: "Culture and marketing commentary"
  },
  {
    name: "Ashley | Stuff About Advertising",
    handle: "@stuffaboutadvertising",
    platform: "TikTok",
    url: "https://www.tiktok.com/@stuffaboutadvertising",
    bio: "CD/Copywriter — ads, agency life, career & copy tips"
  },
  {
    name: "Joel Marlinarson",
    handle: "@coldestjoel",
    platform: "TikTok",
    url: "https://www.tiktok.com/@coldestjoel",
    bio: "Founder of Coldest Creative — strategy behind brands, social + content"
  },
]

// Keywords that signal the content is about social-first creative work
export const RELEVANCE_KEYWORDS = [
  // Social-first signals
  "social media", "TikTok", "Instagram", "Reels", "viral", "social-first",
  "creator", "content creator", "influencer", "collab", "collaboration",
  "brand account", "social strategy", "social content", "brand content",
  "engagement", "comments", "shares", "views", "followers",
  // Content format signals
  "series", "content series", "brand film", "short-form", "video",
  "behind the scenes", "BTS", "unboxing", "reaction", "challenge",
  "trending", "trend", "sound", "audio", "format",
  // Creative quality signals
  "campaign", "creative", "brand", "branded", "clever", "genius",
  "brilliant", "bold", "unhinged", "chaotic", "masterclass",
  "best ads", "best campaigns", "best content", "award",
  // Culture signals
  "culture", "cultural", "internet culture", "meme", "community",
  "Gen Z", "audience", "fandom", "subculture",
  // Brand action signals
  "launch", "rebrand", "partnership", "ambassador", "drop",
  "limited edition", "stunt", "activation", "experiential"
]
