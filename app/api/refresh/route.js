import { NextResponse } from "next/server"
import { fetchAllFeeds } from "../../../lib/rss.js"
import { scoreArticles } from "../../../lib/ai-score.js"
import { getSupabaseAdmin } from "../../../lib/supabase.js"

export async function POST() {
  try {
    // Step 1: Fetch from all RSS feeds and Reddit
    console.log("Fetching content from all sources...")
    const rawArticles = await fetchAllFeeds()
    console.log(`Found ${rawArticles.length} relevant articles`)

    if (rawArticles.length === 0) {
      return NextResponse.json({ message: "No new articles found", count: 0 })
    }

    // Step 2: Score with AI
    console.log("Scoring articles with AI...")
    const scoredArticles = await scoreArticles(rawArticles)

    // Step 3: Store in Supabase (upsert to avoid duplicates)
    const supabase = getSupabaseAdmin()

    const toInsert = scoredArticles.map((a) => ({
      title: a.title?.substring(0, 500),
      url: a.url,
      summary: a.aiSummary?.substring(0, 1000) || a.summary?.substring(0, 1000),
      why_it_works: a.whyItWorks?.substring(0, 500),
      source: a.source,
      platform: a.platform,
      author: a.author?.substring(0, 200),
      content_type: a.contentType,
      score: a.score,
      is_gold_standard: a.isGoldStandard || false,
      engagement: a.engagement || "",
      published_at: a.date,
      fetched_at: new Date().toISOString(),
    }))

    const { data, error } = await supabase
      .from("content")
      .upsert(toInsert, { onConflict: "url", ignoreDuplicates: true })

    if (error) {
      console.error("Supabase insert error:", error)
      // Still return the scored articles even if DB fails
      return NextResponse.json({
        message: "Scored but DB storage failed",
        articles: scoredArticles.slice(0, 20),
        count: scoredArticles.length,
        dbError: error.message,
      })
    }

    return NextResponse.json({
      message: `Refreshed! ${scoredArticles.length} articles scored and stored.`,
      count: scoredArticles.length,
    })
  } catch (err) {
    console.error("Refresh error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
