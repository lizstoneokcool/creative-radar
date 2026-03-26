// All your content sources in one place.
// Edit this file to add or remove sources — no other code changes needed.

export const RSS_SOURCES = [
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
  {
    name: "Contagious",
    feedUrl: "https://www.contagious.com/rss",
    siteUrl: "https://www.contagious.com",
    category: "publication"
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
  "campaign", "brand", "creative", "social media", "TikTok", "viral",
  "ad", "advertising", "marketing", "content", "creator", "branding",
  "engagement", "social-first", "brand film", "design", "identity",
  "packaging", "billboard", "OOH", "digital", "video", "series",
  "documentary", "collaboration", "collab", "launch", "rebrand"
]
