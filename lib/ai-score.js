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
            content: `You are a creative director curating the best social-first branded content and campaigns for a team that cares about internet culture. 

Score each article below on a 0-100 scale based on:
- Creative originality and boldness
- Social-first thinking (was this designed for the feed?)
- Audience engagement proof
- Cultural relevance
- Craft and production quality

For each article, return ONLY valid JSON — no markdown, no backticks, no explanation. Return an array of objects:
[{"index": 0, "score": 92, "type": "Campaign", "summary": "One-sentence editorial take on why this matters", "whyItWorks": "One sentence on the creative principle at play"}]

The "type" must be one of: Social-first, Campaign, Creator, Series, Documentary, Sketch/Skit, Trad+Social, Design

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
