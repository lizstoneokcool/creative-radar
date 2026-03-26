import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Score and summarize a batch of articles using Claude
export async function scoreArticles(articles) {
  if (!articles.length) return []
  if (!process.env.ANTHROPIC_API_KEY) {
    // If no API key, return articles with default scores
    return articles.map((a) => ({
      ...a,
      score: Math.floor(Math.random() * 15) + 80,
      aiSummary: a.summary?.substring(0, 200) || "Pending AI review",
      whyItWorks: "",
      contentType: "Campaign",
    }))
  }

  // Process in batches of 10 to stay within token limits
  const batches = []
  for (let i = 0; i < articles.length; i += 10) {
    batches.push(articles.slice(i, i + 10))
  }

  const allScored = []

  for (const batch of batches) {
    const articleList = batch
      .map(
        (a, i) =>
          `[${i}] Title: ${a.title}\nSource: ${a.source}\nSummary: ${a.summary?.substring(0, 300)}\nURL: ${a.url}`
      )
      .join("\n\n")

    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `You are a chronically online, culturally tapped-in creative intern. You spend all day on TikTok, Instagram, and YouTube watching what brands are doing on social. You don't care about traditional advertising, TV spots, or above-the-line campaigns. You care about:

- Social-first content: Was this MADE for the feed? Would it stop someone mid-scroll?
- Clever, crafted branded content that doesn't feel like an ad
- Brands tapping into culture in a way that feels genuine, not performative
- Individual posts or pieces of content that went viral or earned genuine audience love
- Creator collabs, brand partnerships, and content series that actually entertain
- Bold, unexpected brand moves (like Jacquemus naming his grandmother as ambassador)
- Lo-fi content that works BECAUSE it's not overproduced

You DO NOT care about:
- Traditional campaign announcements or press releases dressed up as articles
- "Brand X launched a new campaign" articles that are basically PR
- Above-the-line work (TV, print, OOH) unless it was designed to be social content first
- Generic industry news, platform updates, or marketing tips articles
- Anything that reads like a trade publication writing for other marketers rather than showing actual creative work

SCORING RULES:
- Score 90-100: Genuine social-first brilliance. You'd screenshot this and send it to the group chat. The kind of thing that makes you say "whoever runs this account deserves a raise."
- Score 75-89: Good social thinking but not groundbreaking. Smart brand move, decent execution.
- Score 50-74: It's fine but it's traditional advertising being written about, not social-native work.
- Score 0-49: This is a press release, industry news, marketing tips article, or generic trade content. Not what we're looking for.

Score each article below. Be HARSH. Most trade press articles should score below 50. Only genuinely social-first creative work should score above 80.

For each article, return ONLY valid JSON — no markdown, no backticks, no explanation. Return an array of objects:
[{"index": 0, "score": 92, "type": "Campaign", "summary": "One-sentence take written like you're texting a friend about it — casual, opinionated, specific about what makes it great", "whyItWorks": "One sentence on the creative principle — what can other brands learn from this?"}]

The "type" must be one of: Social-first, Campaign, Creator, Series, Documentary, Sketch/Skit, Trad+Social, Design, Culture

Articles:
${articleList}`,
          },
        ],
      })

      const text = response.content[0]?.text || "[]"
      const cleaned = text.replace(/```json|```/g, "").trim()
      const scores = JSON.parse(cleaned)

      batch.forEach((article, i) => {
        const s = scores.find((sc) => sc.index === i) || {}
        allScored.push({
          ...article,
          score: s.score || 75,
          aiSummary: s.summary || article.summary?.substring(0, 200),
          whyItWorks: s.whyItWorks || "",
          contentType: s.type || "Campaign",
        })
      })
    } catch (err) {
      console.error("AI scoring error:", err.message)
      // Fall back to unscored
      batch.forEach((a) =>
        allScored.push({
          ...a,
          score: 75,
          aiSummary: a.summary?.substring(0, 200),
          whyItWorks: "",
          contentType: "Campaign",
        })
      )
    }
  }

  return allScored
}
