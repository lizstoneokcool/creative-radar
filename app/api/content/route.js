import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "../../../lib/supabase.js"

export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)

    const days = parseInt(searchParams.get("days") || "3")
    const limit = parseInt(searchParams.get("limit") || "50")
    const platform = searchParams.get("platform") || null
    const type = searchParams.get("type") || null
    const goldOnly = searchParams.get("gold") === "true"
    const minScore = parseInt(searchParams.get("minScore") || "0")

    // Calculate date range
    const since = new Date()
    since.setDate(since.getDate() - days)

    let query = supabase
      .from("content")
      .select("*")
      .gte("published_at", since.toISOString())
      .gte("score", minScore)
      .order("score", { ascending: false })
      .order("published_at", { ascending: false })
      .limit(limit)

    if (platform && platform !== "All") {
      query = query.eq("platform", platform)
    }
    if (type && type !== "All") {
      query = query.eq("content_type", type)
    }
    if (goldOnly) {
      query = query.eq("is_gold_standard", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform to match frontend expectations
    const content = (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      url: row.url,
      summary: row.summary,
      whyItWorks: row.why_it_works,
      source: row.source,
      platform: row.platform,
      author: row.author,
      type: row.content_type,
      score: row.score,
      isGoldStandard: row.is_gold_standard,
      engagement: row.engagement,
      date: row.published_at?.split("T")[0],
      saved: false,
      thumbnail: getEmoji(row.content_type, row.source),
    }))

    return NextResponse.json({ content, count: content.length })
  } catch (err) {
    console.error("Content fetch error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function getEmoji(type, source) {
  const typeEmojis = {
    "Social-first": "\u{1F4F1}",
    "Campaign": "\u{1F3AF}",
    "Creator": "\u{1F3A8}",
    "Series": "\u{1F4FA}",
    "Documentary": "\u{1F3AC}",
    "Sketch/Skit": "\u{1F3AD}",
    "Trad+Social": "\u{1F4E3}",
    "Design": "\u{2728}",
  }
  return typeEmojis[type] || "\u{1F4CC}"
}
