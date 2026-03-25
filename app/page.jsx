"use client"

import { useState, useCallback } from "react"

const SOURCES = ["All", "YouTube", "Twitter/X", "RSS", "Reddit", "Manual"]
const TYPES = ["All", "Ad", "Brand", "Creator", "Design", "Campaign", "Motion"]

const INITIAL_CONTENT = [
  {
    id: 1, title: "Heinz 'The Dipper' — Fry Box Redesign", source: "RSS",
    type: "Design", score: 97, date: "2026-03-24", saved: false,
    author: "Rethink", thumbnail: "🍟",
    summary: "After 75+ years of unchanged design, Heinz and Rethink redesigned the humble fry box with a built-in ketchup compartment. Patent-pending, rolling out across 11 countries. Packaging as brand storytelling at its finest.",
    url: "https://www.thedrum.com/news/ad-of-the-day-heinz-redesigns-a-fry-box-for-on-the-go-dipping", engagement: "Trending"
  },
  {
    id: 2, title: "Jacquemus Names Grandmother as First Ambassador", source: "Twitter/X",
    type: "Brand", score: 96, date: "2026-03-24", saved: false,
    author: "Jacquemus", thumbnail: "👵",
    summary: "In true Jacquemus fashion, the brand's first-ever ambassador isn't a celebrity — it's founder Simon Porte Jacquemus' 79-year-old grandmother, Liline. The tongue-in-cheek contract is pure brand poetry.",
    url: "https://www.jacquemus.com/en_fr/explore/brandambassadeur.html", engagement: "Viral"
  },
  {
    id: 3, title: "Dove 'r/eal Reviews' — Unfiltered Reddit Campaign", source: "Reddit",
    type: "Campaign", score: 95, date: "2026-03-24", saved: false,
    author: "DAVID London", thumbnail: "🧴",
    summary: "Dove handed its most awarded hair product to Reddit and promised to publish whatever came back — good and bad. Verbatim reviews became billboards across NYC. Radical transparency as creative strategy.",
    url: "https://www.adsoftheworld.com/campaigns/dove-hair-is-sponsoring-honesty-over-praise", engagement: "Featured"
  },
  {
    id: 4, title: "Eli Lilly 'Never Over' — Olympic Film", source: "RSS",
    type: "Ad", score: 94, date: "2026-03-24", saved: false,
    author: "Wieden+Kennedy Portland", thumbnail: "🏅",
    summary: "As a Milano Cortina 2026 sponsor, Eli Lilly released a film blending archival athletics with medical research imagery. No product mention. The message isn't 'we cure' — it's 'we continue.' Stunning restraint.",
    url: "https://www.gethegoods.com/articles/the-global-creative-review-february-2026-best-advertising-campaigns", engagement: "Award-worthy"
  },
  {
    id: 5, title: "Liquid Death × e.l.f. Beauty — Round 2", source: "YouTube",
    type: "Campaign", score: 93, date: "2026-03-23", saved: false,
    author: "Liquid Death / e.l.f.", thumbnail: "💀",
    summary: "The chaotic duo reunited for a second collab. Black metal frontman Glothar returns for a gothic musical spot with an unexpectedly wholesome twist. Two brands that understand creative chemistry.",
    url: "https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/", engagement: "2.1M views"
  },
  {
    id: 6, title: "British Heart Foundation 'In Living Memory'", source: "RSS",
    type: "Ad", score: 92, date: "2026-03-23", saved: false,
    author: "Saatchi & Saatchi", thumbnail: "❤️",
    summary: "Instead of memorializing those lost, BHF celebrates survivors. Red benches installed across the UK honor people saved by the charity's work. A twist on the traditional memorial that reframes the entire category.",
    url: "https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/", engagement: "Trending UK"
  },
  {
    id: 7, title: "OMODA JAECOO × Uncommon — BFI IMAX Takeover", source: "Manual",
    type: "Brand", score: 90, date: "2026-03-23", saved: false,
    author: "Uncommon Creative Studio", thumbnail: "🚙",
    summary: "Automotive disruptor OMODA JAECOO became the first brand ever to take over the rooftop of London's iconic BFI IMAX. A media-first move that made the building itself the ad.",
    url: "https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/", engagement: "Media first"
  },
  {
    id: 8, title: "Seletti × BIC — Cristal Pen Lamp", source: "RSS",
    type: "Design", score: 91, date: "2026-03-22", saved: false,
    author: "Seletti & Mario Paroli", thumbnail: "🖊",
    summary: "Design agency Seletti debuted the BIC Lamp at Maison & Objet Paris — a tribute to the iconic Cristal pen. When product design becomes cultural object. The kind of collab that makes you rethink everyday objects.",
    url: "https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/", engagement: "Featured"
  },
  {
    id: 9, title: "Imperial Beer — Rolled 'R' Label Redesign", source: "RSS",
    type: "Design", score: 89, date: "2026-03-22", saved: false,
    author: "Garnier BBDO / RINO FILMS", thumbnail: "🍺",
    summary: "Costa Rica's Imperial Beer redesigned its label to emphasize the rolled 'R' of local pronunciation. Packaging becomes cultural statement. Stereotype reframed as pride. Specificity as competitive moat.",
    url: "https://www.gethegoods.com/articles/the-global-creative-review-february-2026-best-advertising-campaigns", engagement: "Cultural hit"
  },
  {
    id: 10, title: "State Farm 'Batman vs. Bateman' — Agile Pivot", source: "YouTube",
    type: "Ad", score: 93, date: "2026-03-22", saved: false,
    author: "State Farm", thumbnail: "🦇",
    summary: "When CA wildfires forced State Farm to pull its Super Bowl ad, they pivoted to a college basketball campaign featuring Jason Bateman trying to substitute for Batman. 16M social engagements. Agility as creative superpower.",
    url: "https://storychief.io/blog/recent-innovative-marketing-campaigns", engagement: "16M engagements"
  },
  {
    id: 11, title: "Birkenstock — 'A Journey Through Tradition' Ramadan", source: "RSS",
    type: "Campaign", score: 88, date: "2026-03-21", saved: false,
    author: "Havas Creative", thumbnail: "🩴",
    summary: "Birkenstock approached Ramadan through documentary-style cultural storytelling rather than seasonal advertising. Centered on a regional photographer, not celebrities. Comfort and craft aligned with reflection and connection.",
    url: "https://www.thegonetwork.com/articles/the-best-marketing-campaigns-of-2026---monthly-review-2026", engagement: "Featured"
  },
  {
    id: 12, title: "DVLA 'Clampy' — Public Sector Comedy", source: "RSS",
    type: "Ad", score: 87, date: "2026-03-21", saved: false,
    author: "AMV BBDO", thumbnail: "🔒",
    summary: "The UK's DVLA introduced 'Clampy,' a character inspired by wheel-clamping enforcement. Forget to tax your vehicle and Clampy attaches himself. Public-sector campaigns rarely lean on humor this well.",
    url: "https://www.gethegoods.com/articles/the-global-creative-review-february-2026-best-advertising-campaigns", engagement: "UK Viral"
  }
]

const scoreColor = (score) => {
  if (score >= 95) return { bg: "#EAF3DE", text: "#3B6D11", label: "Exceptional" }
  if (score >= 90) return { bg: "#E1F5EE", text: "#0F6E56", label: "Outstanding" }
  if (score >= 85) return { bg: "#E6F1FB", text: "#185FA5", label: "Strong" }
  return { bg: "#F1EFE8", text: "#5F5E5A", label: "Notable" }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T12:00:00")
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return "Today"
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const sourceIcon = (s) => {
  const map = { "YouTube": "▶", "Twitter/X": "𝕏", "RSS": "◉", "Reddit": "⬡", "Manual": "✦" }
  return map[s] || "•"
}

export default function CreativeRadar() {
  const [content, setContent] = useState(INITIAL_CONTENT)
  const [activeSource, setActiveSource] = useState("All")
  const [activeType, setActiveType] = useState("All")
  const [showSaved, setShowSaved] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitUrl, setSubmitUrl] = useState("")
  const [submitNote, setSubmitNote] = useState("")
  const [submitType, setSubmitType] = useState("Ad")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const toggleSave = useCallback((id) => {
    setContent(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, saved: !c.saved } : c)
      const item = updated.find(c => c.id === id)
      showToast(item.saved ? "Saved to collection" : "Removed from collection")
      return updated
    })
  }, [])

  const handleSubmit = () => {
    if (!submitUrl.trim()) return
    const newItem = {
      id: Date.now(), title: submitUrl, source: "Manual", type: submitType,
      score: 0, date: new Date().toISOString().split("T")[0], saved: false,
      author: "Your team", thumbnail: "✦",
      summary: submitNote || "Manually submitted — pending AI review",
      url: submitUrl, engagement: "New"
    }
    setContent(prev => [newItem, ...prev])
    setSubmitUrl("")
    setSubmitNote("")
    setShowSubmit(false)
    showToast("Link submitted — queued for AI review")
  }

  const filtered = content.filter(c => {
    if (showSaved && !c.saved) return false
    if (activeSource !== "All" && c.source !== activeSource) return false
    if (activeType !== "All" && c.type !== activeType) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.author.toLowerCase().includes(q)
    }
    return true
  })

  const grouped = {}
  filtered.forEach(c => {
    const label = formatDate(c.date)
    if (!grouped[label]) grouped[label] = []
    grouped[label].push(c)
  })
  Object.values(grouped).forEach(g => g.sort((a, b) => b.score - a.score))

  const todayCount = content.filter(c => formatDate(c.date) === "Today").length
  const avgScore = filtered.length ? Math.round(filtered.reduce((a, c) => a + c.score, 0) / filtered.length) : 0

  return (
    <div style={{ fontFamily: "'Newsreader', Georgia, serif", minHeight: "100vh", padding: "0 0 4rem", background: "#FAFAF8" }}>

      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#1a1a1a", color: "#fff", padding: "10px 20px", borderRadius: 8,
          fontSize: 13, fontFamily: "'DM Sans', sans-serif", zIndex: 999,
          animation: "fadeIn 0.2s ease"
        }}>{toast}</div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .card { transition: all 0.2s ease; cursor: pointer; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .pill { transition: all 0.15s ease; cursor: pointer; user-select: none; }
        .pill:hover { opacity: 0.85; }
        .save-btn { transition: all 0.15s ease; }
        .save-btn:hover { transform: scale(1.1); }
        .submit-overlay { animation: slideUp 0.25s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, textarea:focus { outline: none; border-color: #1D9E75 !important; }
        .source-chip { transition: all 0.15s ease; }
        .source-chip:hover { background: #f0f0ec !important; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "2rem 1.5rem 1rem", borderBottom: "1px solid #e8e6df" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a1a", lineHeight: 1.1 }}>
              Creative Radar
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888780", marginTop: 6 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="pill"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                padding: "6px 14px", borderRadius: 20,
                background: showSaved ? "#1a1a1a" : "transparent",
                color: showSaved ? "#fff" : "#5F5E5A",
                border: showSaved ? "none" : "1px solid #d3d1c7"
              }}
            >
              ♥ Saved{showSaved ? ` (${content.filter(c => c.saved).length})` : ""}
            </button>
            <button
              onClick={() => setShowSubmit(!showSubmit)}
              className="pill"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                padding: "6px 14px", borderRadius: 20,
                background: "#1D9E75", color: "#fff", border: "none"
              }}
            >
              + Submit link
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 24, marginTop: 16, paddingTop: 16,
          borderTop: "1px solid #f1efe8", flexWrap: "wrap"
        }}>
          {[
            { label: "Today's picks", value: todayCount },
            { label: "Avg. score", value: avgScore },
            { label: "Sources active", value: 5 },
            { label: "In collection", value: content.filter(c => c.saved).length }
          ].map(s => (
            <div key={s.label} style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#1a1a1a" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#888780", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit panel */}
      {showSubmit && (
        <div className="submit-overlay" style={{
          padding: "1.25rem 1.5rem", background: "#f5f4f0",
          borderBottom: "1px solid #e8e6df"
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 560 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 12 }}>
              Drop a link from Instagram, TikTok, LinkedIn, or anywhere
            </p>
            <input
              type="url" placeholder="Paste URL here..."
              value={submitUrl} onChange={e => setSubmitUrl(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", fontSize: 14,
                border: "1px solid #d3d1c7", borderRadius: 8,
                background: "#fff", fontFamily: "'DM Sans', sans-serif",
                marginBottom: 8
              }}
            />
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <select
                value={submitType} onChange={e => setSubmitType(e.target.value)}
                style={{
                  padding: "8px 12px", fontSize: 13, border: "1px solid #d3d1c7",
                  borderRadius: 8, background: "#fff", fontFamily: "'DM Sans', sans-serif",
                  color: "#1a1a1a"
                }}
              >
                {TYPES.filter(t => t !== "All").map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                type="text" placeholder="Quick note (optional)"
                value={submitNote} onChange={e => setSubmitNote(e.target.value)}
                style={{
                  flex: 1, minWidth: 180, padding: "8px 12px", fontSize: 13,
                  border: "1px solid #d3d1c7", borderRadius: 8,
                  background: "#fff", fontFamily: "'DM Sans', sans-serif"
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleSubmit} style={{
                padding: "8px 20px", fontSize: 13, fontWeight: 500,
                background: "#1D9E75", color: "#fff", border: "none",
                borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
              }}>Submit</button>
              <button onClick={() => setShowSubmit(false)} style={{
                padding: "8px 16px", fontSize: 13, background: "transparent",
                border: "1px solid #d3d1c7", borderRadius: 8, cursor: "pointer",
                color: "#5F5E5A", fontFamily: "'DM Sans', sans-serif"
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #f1efe8" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {SOURCES.map(s => (
            <button key={s} onClick={() => setActiveSource(s)} className="source-chip" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "5px 12px",
              borderRadius: 16, border: "none", cursor: "pointer",
              background: activeSource === s ? "#1a1a1a" : "#f1efe8",
              color: activeSource === s ? "#fff" : "#5F5E5A",
              fontWeight: activeSource === s ? 600 : 400
            }}>
              {s !== "All" && <span style={{ marginRight: 4 }}>{sourceIcon(s)}</span>}{s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {TYPES.map(t => (
            <button key={t} onClick={() => setActiveType(t)} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "4px 10px",
              borderRadius: 12, cursor: "pointer",
              background: activeType === t ? "#E1F5EE" : "transparent",
              color: activeType === t ? "#0F6E56" : "#888780",
              border: activeType === t ? "1px solid #5DCAA5" : "1px solid transparent",
              fontWeight: activeType === t ? 600 : 400
            }}>{t}</button>
          ))}
          <div style={{ flex: 1 }} />
          <input
            type="text" placeholder="Search..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              padding: "5px 12px", border: "1px solid #e8e6df", borderRadius: 16,
              background: "#fff", width: 160, color: "#1a1a1a"
            }}
          />
        </div>
      </div>

      {/* Content feed */}
      <div style={{ padding: "0.5rem 1.5rem" }}>
        {Object.entries(grouped).length === 0 && (
          <div style={{
            textAlign: "center", padding: "3rem 1rem",
            fontFamily: "'DM Sans', sans-serif", color: "#888780"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>∅</div>
            <div style={{ fontSize: 14 }}>No content matches your filters</div>
          </div>
        )}

        {Object.entries(grouped).map(([dateLabel, items]) => (
          <div key={dateLabel}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#B4B2A9", padding: "1.25rem 0 0.5rem",
              borderBottom: "1px solid #f1efe8", marginBottom: 4
            }}>{dateLabel}</div>

            {items.map(item => {
              const sc = scoreColor(item.score)
              const isExpanded = expandedId === item.id
              return (
                <div key={item.id} className="card" onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  style={{
                    padding: "1rem 0", borderBottom: "1px solid #f7f6f3",
                    display: "flex", gap: 14, alignItems: "flex-start"
                  }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 10, background: "#f1efe8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0
                  }}>{item.thumbnail}</div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                      <h3 style={{
                        fontFamily: "'Newsreader', Georgia, serif", fontSize: 16,
                        fontWeight: 400, color: "#1a1a1a", lineHeight: 1.3, flex: 1
                      }}>{item.title}</h3>
                      <button className="save-btn" onClick={e => { e.stopPropagation(); toggleSave(item.id) }}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontSize: 16, color: item.saved ? "#E24B4A" : "#d3d1c7",
                          flexShrink: 0, padding: "0 2px"
                        }}
                      >{item.saved ? "♥" : "♡"}</button>
                    </div>

                    <div style={{
                      display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#888780"
                    }}>
                      <span style={{
                        background: "#f1efe8", padding: "2px 8px", borderRadius: 10,
                        fontSize: 11, color: "#5F5E5A"
                      }}>{sourceIcon(item.source)} {item.source}</span>
                      <span style={{
                        background: sc.bg, padding: "2px 8px", borderRadius: 10,
                        fontSize: 11, color: sc.text, fontWeight: 600
                      }}>{item.score > 0 ? `${item.score} — ${sc.label}` : "Pending"}</span>
                      <span>{item.author}</span>
                      <span style={{ color: "#d3d1c7" }}>·</span>
                      <span>{item.engagement}</span>
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: 10, animation: "fadeIn 0.2s ease" }}>
                        <p style={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
                          color: "#5F5E5A", lineHeight: 1.6, marginBottom: 10
                        }}>{item.summary}</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                              color: "#1D9E75", textDecoration: "none", fontWeight: 500
                            }}>View original ↗</a>
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                            padding: "2px 8px", background: "#f1efe8", borderRadius: 8,
                            color: "#5F5E5A"
                          }}>{item.type}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "2rem 1.5rem 1rem", textAlign: "center",
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#B4B2A9"
      }}>
        <div style={{ marginBottom: 4 }}>Creative Radar — Daily curation for your team</div>
        <div>Automated feeds: YouTube · Twitter/X · RSS · Reddit — Manual: Instagram · TikTok · LinkedIn</div>
      </div>
    </div>
  )
}
