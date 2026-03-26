import Parser from "rss-parser"
import { RSS_SOURCES, REDDIT_SOURCES, RELEVANCE_KEYWORDS, GOLD_STANDARD_BRANDS } from "./sources.js"

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "CreativeRadar/1.0" },
})

// Fetch all RSS feeds and return normalized articles
export async function fetchAllFeeds() {
  const articles = []

  // Fetch RSS feeds in parallel
  const feedResults = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.feedUrl)
        return feed.items.slice(0, 8).map((item) => ({
          title: item.title || "",
          url: item.link || "",
          summary: item.contentSnippet || item.content || "",
          date: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source.name,
          platform: "RSS",
          author: item.creator || item.author || source.name,
        }))
      } catch (err) {
        console.error(`Failed to fetch ${source.name}:`, err.message)
        return []
      }
    })
  )

  feedResults.forEach((result) => {
    if (result.status === "fulfilled") articles.push(...result.value)
  })

  // Fetch Reddit top posts
  const redditResults = await Promise.allSettled(
    REDDIT_SOURCES.map(async (source) => {
      try {
        const res = await fetch(source.url, {
          headers: { "User-Agent": "CreativeRadar/1.0" },
        })
        const data = await res.json()
        return (data?.data?.children || []).map((post) => ({
          title: post.data.title || "",
          url: `https://www.reddit.com${post.data.permalink}`,
          summary: post.data.selftext?.substring(0, 300) || "",
          date: new Date(post.data.created_utc * 1000).toISOString(),
          source: source.name,
          platform: "Reddit",
          author: `u/${post.data.author}`,
          engagement: `${post.data.score} upvotes`,
          externalUrl: post.data.url || "",
        }))
      } catch (err) {
        console.error(`Failed to fetch ${source.name}:`, err.message)
        return []
      }
    })
  )

  redditResults.forEach((result) => {
    if (result.status === "fulfilled") articles.push(...result.value)
  })

  // Filter for relevance — does the title/summary mention creative/marketing topics?
  const relevant = articles.filter((a) => {
    const text = `${a.title} ${a.summary}`.toLowerCase()
    return RELEVANCE_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()))
  })

  // Check if any gold standard brands are mentioned
  const enriched = relevant.map((a) => {
    const text = `${a.title} ${a.summary}`.toLowerCase()
    const matchedBrands = GOLD_STANDARD_BRANDS.filter((b) =>
      text.includes(b.toLowerCase())
    )
    return {
      ...a,
      isGoldStandard: matchedBrands.length > 0,
      matchedBrands,
    }
  })

  // Sort by date (newest first) and limit
  enriched.sort((a, b) => new Date(b.date) - new Date(a.date))

  return enriched.slice(0, 50)
}
