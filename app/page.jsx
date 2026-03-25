"use client"

import { useState, useCallback } from "react"

const PLATFORMS = ["All", "TikTok", "Instagram", "YouTube", "Twitter/X", "LinkedIn", "Substack", "RSS"]
const TYPES = ["All", "Social-first", "Campaign", "Creator", "Series", "Documentary", "Sketch/Skit", "Trad+Social"]
const TASTE_TAGS = ["Humor / tone", "Format / editing", "Engagement proof", "Craft / production", "Cultural relevance", "Bold brand move", "Community response", "Lo-fi magic"]

const DEFAULT_SOURCES = {
  publications: [
    { id: 1, name: "Creative Review", url: "https://www.creativereview.co.uk" },
    { id: 2, name: "Campaign Live", url: "https://www.campaignlive.co.uk" },
    { id: 3, name: "Ad Age", url: "https://adage.com" },
    { id: 4, name: "Creative Boom", url: "https://www.creativeboom.com" },
    { id: 5, name: "Outlander Magazine", url: "https://outlandermag.com" },
    { id: 6, name: "Ads of the World", url: "https://www.adsoftheworld.com" },
    { id: 7, name: "Famous Campaigns", url: "https://www.famouscampaigns.com" },
    { id: 8, name: "It's Nice That", url: "https://www.itsnicethat.com" },
  ],
  thoughtLeaders: [
    { id: 1, name: "Sam | Culture & Marketing", handle: "@directorofsocial", platform: "TikTok", url: "https://www.tiktok.com/@directorofsocial" },
  ],
  goldStandard: [
    { id: 1, name: "Duolingo" }, { id: 2, name: "Scrub Daddy" }, { id: 3, name: "Ryanair" },
    { id: 4, name: "Nutter Butter" }, { id: 5, name: "Jacquemus" }, { id: 6, name: "Burberry" },
    { id: 7, name: "Loewe" }, { id: 8, name: "Coinbase" }, { id: 9, name: "Manors Golf" },
    { id: 10, name: "Berghaus" }, { id: 11, name: "Poppi" }, { id: 12, name: "Anti-mid" },
  ],
  subreddits: [{ id: 1, name: "r/adporn" }, { id: 2, name: "r/Design" }, { id: 3, name: "r/commercialcuts" }],
  substacks: [{ id: 1, name: "Marketing Examined", url: "https://marketingexamined.com" }],
}

const INITIAL_CONTENT = [
  { id: 1, title: "Duolingo's unhinged Owl lore continues", platform: "TikTok", type: "Social-first", score: 97, date: "2026-03-25", saved: false, author: "Duolingo", thumbnail: "\u{1F989}", isGoldStandard: true, summary: "The owl is now in a situationship with Dua Lipa and the comments section is fully invested. 4M+ views on the latest installment. Nobody does character-driven social like Duolingo.", url: "https://www.tiktok.com/@duolingo", engagement: "4.2M views", whyItWorks: "Character-driven storytelling where the audience is part of the plot" },
  { id: 2, title: "Jacquemus \u2014 Liline named first brand ambassador", platform: "Instagram", type: "Campaign", score: 96, date: "2026-03-25", saved: false, author: "Jacquemus", thumbnail: "\u{1F475}", isGoldStandard: true, summary: "Instead of a celebrity, Jacquemus named the founder's 79-year-old grandmother as first-ever ambassador. The tongue-in-cheek contract went viral. Anti-formula brand storytelling.", url: "https://www.jacquemus.com/en_fr/explore/brandambassadeur.html", engagement: "Viral", whyItWorks: "Subverted every expectation of what a brand ambassador announcement looks like" },
  { id: 3, title: "Dove 'r/eal Reviews' \u2014 unfiltered Reddit feedback as ads", platform: "Twitter/X", type: "Trad+Social", score: 95, date: "2026-03-25", saved: false, author: "DAVID London", thumbnail: "\u{1F9F4}", isGoldStandard: false, summary: "Dove asked Reddit to review their hair mask honestly, then plastered the results on billboards across NYC. Radical transparency as creative strategy.", url: "https://www.adsoftheworld.com/campaigns/dove-hair-is-sponsoring-honesty-over-praise", engagement: "Featured", whyItWorks: "Turned user-generated criticism into the campaign itself" },
  { id: 4, title: "Nutter Butter continues its descent into madness", platform: "TikTok", type: "Social-first", score: 94, date: "2026-03-25", saved: false, author: "Nutter Butter", thumbnail: "\u{1F95C}", isGoldStandard: true, summary: "The most unhinged brand account on TikTok dropped another cursed video that makes zero logical sense but has 8M views. The comment section is a support group.", url: "https://www.tiktok.com/@naborutterbutter", engagement: "8M+ views", whyItWorks: "Proof that being genuinely weird beats being polished every time" },
  { id: 5, title: "Heinz 'The Dipper' \u2014 redesigning the fry box", platform: "YouTube", type: "Campaign", score: 96, date: "2026-03-24", saved: false, author: "Rethink", thumbnail: "\u{1F35F}", isGoldStandard: false, summary: "After 75 years, Heinz redesigned the fry box with a built-in ketchup compartment. The social rollout turned packaging into content.", url: "https://www.thedrum.com/news/ad-of-the-day-heinz-redesigns-a-fry-box-for-on-the-go-dipping", engagement: "Trending", whyItWorks: "Product innovation designed to be social content from day one" },
  { id: 6, title: "Ryanair \u2014 'not a luxury airline and we don't care'", platform: "TikTok", type: "Series", score: 93, date: "2026-03-24", saved: false, author: "Ryanair", thumbnail: "\u2708\uFE0F", isGoldStandard: true, summary: "Ryanair's social team keeps leaning into self-deprecation and it keeps working. The latest series roasts their own legroom, food, and landing quality.", url: "https://www.tiktok.com/@ryanair", engagement: "12M+ views", whyItWorks: "Self-deprecation as brand strategy \u2014 turned weakness into content" },
  { id: 7, title: "Poppi \u2014 from TikTok brand to Super Bowl advertiser", platform: "Substack", type: "Documentary", score: 92, date: "2026-03-24", saved: false, author: "Marketing Examined", thumbnail: "\u{1F964}", isGoldStandard: true, summary: "A deep breakdown of how Poppi went from DTC social-first brand to Super Bowl commercial \u2014 and whether that transition actually worked.", url: "https://marketingexamined.com", engagement: "Top newsletter", whyItWorks: "Case study in how social-native brands scale beyond the feed" },
  { id: 8, title: "Scrub Daddy \u2014 'Daddy reacts' employee content", platform: "Instagram", type: "Series", score: 91, date: "2026-03-23", saved: false, author: "Scrub Daddy", thumbnail: "\u{1F9FD}", isGoldStandard: true, summary: "Scrub Daddy films employees reacting to customer cleaning fails. Low production, high personality. The series format keeps people coming back weekly.", url: "https://www.instagram.com/scrubdaddy/", engagement: "1.5M avg views", whyItWorks: "Employee-driven content that feels real because it is real" },
  { id: 9, title: "Loewe \u2014 craft prize documentation film", platform: "YouTube", type: "Documentary", score: 90, date: "2026-03-23", saved: false, author: "Loewe Foundation", thumbnail: "\u{1F3FA}", isGoldStandard: true, summary: "Loewe's Foundation continues to produce some of the best brand-adjacent content in luxury. This mini-doc follows the craft prize winner's process.", url: "https://www.youtube.com/@loewe", engagement: "Featured", whyItWorks: "Luxury brand building through genuine cultural patronage, not ads" },
  { id: 10, title: "Liquid Death \u00D7 e.l.f. Beauty \u2014 gothic musical", platform: "YouTube", type: "Sketch/Skit", score: 93, date: "2026-03-23", saved: false, author: "Liquid Death / e.l.f.", thumbnail: "\u{1F480}", isGoldStandard: false, summary: "The chaotic duo returned for round 2. Black metal frontman Glothar stars in a gothic musical spot with a wholesome twist.", url: "https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/", engagement: "2.1M views", whyItWorks: "Unexpected brand collabs that create genuine entertainment" },
  { id: 11, title: "Coinbase \u2014 radical simplicity on LinkedIn", platform: "LinkedIn", type: "Trad+Social", score: 89, date: "2026-03-22", saved: false, author: "Coinbase", thumbnail: "\u{1FA99}", isGoldStandard: true, summary: "Coinbase applies its 'radically simple' design philosophy to social. LinkedIn carousels that break down crypto in single images. Proof B2B social doesn't have to be boring.", url: "https://www.linkedin.com/company/coinbase/", engagement: "High engagement", whyItWorks: "Made a complex category feel approachable through design restraint" },
  { id: 12, title: "Burberry \u2014 runway as social-first moment", platform: "Instagram", type: "Campaign", score: 91, date: "2026-03-22", saved: false, author: "Burberry", thumbnail: "\u{1F9E3}", isGoldStandard: true, summary: "Burberry's latest show was designed for the feed first, runway second. Every look staged for vertical video, BTS content dripped across platforms for weeks.", url: "https://www.instagram.com/burberry/", engagement: "Culturally dominant", whyItWorks: "Traditional fashion format rebuilt from the ground up for social distribution" }
]

const scoreColor = (s) => s >= 95 ? { bg: "#EAF3DE", text: "#3B6D11", label: "Exceptional" } : s >= 90 ? { bg: "#E1F5EE", text: "#0F6E56", label: "Outstanding" } : s >= 85 ? { bg: "#E6F1FB", text: "#185FA5", label: "Strong" } : { bg: "#F1EFE8", text: "#5F5E5A", label: "Notable" }
const formatDate = (ds) => { const d = new Date(ds+"T12:00:00"), t = new Date(), y = new Date(t); y.setDate(y.getDate()-1); return d.toDateString()===t.toDateString()?"Today":d.toDateString()===y.toDateString()?"Yesterday":d.toLocaleDateString("en-US",{month:"short",day:"numeric"}) }
const pIcon = (s) => ({"TikTok":"\u266A","Instagram":"\u25CE","YouTube":"\u25B6","Twitter/X":"\uD835\uDD4F","LinkedIn":"in","Substack":"\u2709","RSS":"\u25C9"})[s]||"\u2022"

function SourcesManager({ sources, setSources, onClose }) {
  const [tab, setTab] = useState("publications")
  const [np, setNp] = useState({name:"",url:""}); const [nl, setNl] = useState({name:"",handle:"",platform:"TikTok",url:""})
  const [nb, setNb] = useState(""); const [ns, setNs] = useState({name:"",url:""}); const [nr, setNr] = useState("")
  const rm = (cat,id) => setSources(p=>({...p,[cat]:p[cat].filter(i=>i.id!==id)}))
  const is = {padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",color:"#1a1a1a"}
  const ab = {padding:"8px 16px",fontSize:13,fontWeight:500,background:"#1D9E75",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",flexShrink:0}
  const rb = {background:"none",border:"none",cursor:"pointer",color:"#d3d1c7",fontSize:14,padding:"2px 6px",borderRadius:4}
  const tabs = [{key:"publications",label:"Publications",n:sources.publications.length},{key:"thoughtLeaders",label:"Thought leaders",n:sources.thoughtLeaders.length},{key:"goldStandard",label:"Brands",n:sources.goldStandard.length},{key:"substacks",label:"Substacks",n:sources.substacks.length},{key:"subreddits",label:"Subreddits",n:sources.subreddits.length}]
  return (
    <div style={{background:"#fff",border:"1px solid #e8e6df",borderRadius:12,margin:"0 1.5rem",marginTop:12,overflow:"hidden",animation:"slideUp 0.25s ease",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{padding:"16px 20px",borderBottom:"1px solid #f1efe8",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><h2 style={{fontSize:16,fontWeight:600,color:"#1a1a1a",margin:0}}>Manage your sources</h2><p style={{fontSize:12,color:"#888780",marginTop:2}}>Add or remove publications, thought leaders, brands, and communities</p></div>
        <button onClick={onClose} style={{background:"#f1efe8",border:"none",borderRadius:8,padding:"6px 14px",fontSize:13,cursor:"pointer",color:"#5F5E5A",fontFamily:"'DM Sans',sans-serif"}}>Done</button>
      </div>
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #f1efe8",overflowX:"auto"}}>
        {tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"10px 16px",fontSize:12,fontWeight:tab===t.key?600:400,color:tab===t.key?"#1D9E75":"#888780",background:"none",border:"none",cursor:"pointer",borderBottom:tab===t.key?"2px solid #1D9E75":"2px solid transparent",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{t.label} <span style={{color:"#B4B2A9",fontWeight:400}}>({t.n})</span></button>)}
      </div>
      <div style={{padding:"16px 20px",maxHeight:400,overflowY:"auto"}}>
        {tab==="publications"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><input placeholder="Publication name" value={np.name} onChange={e=>setNp(p=>({...p,name:e.target.value}))} style={{...is,flex:1,minWidth:140}}/><input placeholder="Website URL (optional)" value={np.url} onChange={e=>setNp(p=>({...p,url:e.target.value}))} style={{...is,flex:1,minWidth:180}}/><button onClick={()=>{if(!np.name.trim())return;setSources(p=>({...p,publications:[...p.publications,{id:Date.now(),name:np.name,url:np.url}]}));setNp({name:"",url:""})}} style={ab}>Add</button></div>
          {sources.publications.map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f7f6f3"}}><div><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>{p.name}</span>{p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#1D9E75",marginLeft:8,textDecoration:"none"}}>{p.url.replace(/^https?:\/\/(www\.)?/,"").substring(0,30)}</a>}</div><button onClick={()=>rm("publications",p.id)} style={rb} onMouseOver={e=>e.target.style.color="#E24B4A"} onMouseOut={e=>e.target.style.color="#d3d1c7"}>{"\u2715"}</button></div>)}
        </div>}
        {tab==="thoughtLeaders"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}><input placeholder="Name" value={nl.name} onChange={e=>setNl(p=>({...p,name:e.target.value}))} style={{...is,flex:1,minWidth:120}}/><input placeholder="@handle" value={nl.handle} onChange={e=>setNl(p=>({...p,handle:e.target.value}))} style={{...is,width:120}}/><select value={nl.platform} onChange={e=>setNl(p=>({...p,platform:e.target.value}))} style={{...is,width:110}}>{["TikTok","Instagram","YouTube","Twitter/X","LinkedIn","Substack"].map(p=><option key={p} value={p}>{p}</option>)}</select></div>
          <div style={{display:"flex",gap:8,marginBottom:16}}><input placeholder="Profile URL (optional)" value={nl.url} onChange={e=>setNl(p=>({...p,url:e.target.value}))} style={{...is,flex:1}}/><button onClick={()=>{if(!nl.name.trim())return;setSources(p=>({...p,thoughtLeaders:[...p.thoughtLeaders,{id:Date.now(),...nl}]}));setNl({name:"",handle:"",platform:"TikTok",url:""})}} style={ab}>Add</button></div>
          {sources.thoughtLeaders.map(l=><div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f7f6f3"}}><div><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>{l.name}</span><span style={{fontSize:12,color:"#888780",marginLeft:8}}>{l.handle}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:10,marginLeft:8,background:"#f1efe8",color:"#5F5E5A"}}>{pIcon(l.platform)} {l.platform}</span>{l.url&&<a href={l.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:11,color:"#1D9E75",marginLeft:8,textDecoration:"none"}}>{"\u2197"}</a>}</div><button onClick={()=>rm("thoughtLeaders",l.id)} style={rb} onMouseOver={e=>e.target.style.color="#E24B4A"} onMouseOut={e=>e.target.style.color="#d3d1c7"}>{"\u2715"}</button></div>)}
          {sources.thoughtLeaders.length===0&&<p style={{fontSize:13,color:"#B4B2A9",padding:"12px 0"}}>No thought leaders added yet. Add TikTokers, YouTubers, LinkedIn voices, or Substack writers.</p>}
        </div>}
        {tab==="goldStandard"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16}}><input placeholder="Brand name" value={nb} onChange={e=>setNb(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&nb.trim()){setSources(p=>({...p,goldStandard:[...p.goldStandard,{id:Date.now(),name:nb}]}));setNb("")}}} style={{...is,flex:1}}/><button onClick={()=>{if(!nb.trim())return;setSources(p=>({...p,goldStandard:[...p.goldStandard,{id:Date.now(),name:nb}]}));setNb("")}} style={ab}>Add</button></div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{sources.goldStandard.map(b=><span key={b.id} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:16,background:"#FDF3E0",color:"#854F0B",fontSize:13,fontWeight:500}}>{"\u2605"} {b.name}<button onClick={()=>rm("goldStandard",b.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#BA7517",fontSize:12,padding:0,lineHeight:1}}>{"\u2715"}</button></span>)}</div>
        </div>}
        {tab==="substacks"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><input placeholder="Newsletter name" value={ns.name} onChange={e=>setNs(p=>({...p,name:e.target.value}))} style={{...is,flex:1,minWidth:140}}/><input placeholder="URL (optional)" value={ns.url} onChange={e=>setNs(p=>({...p,url:e.target.value}))} style={{...is,flex:1,minWidth:180}}/><button onClick={()=>{if(!ns.name.trim())return;setSources(p=>({...p,substacks:[...p.substacks,{id:Date.now(),name:ns.name,url:ns.url}]}));setNs({name:"",url:""})}} style={ab}>Add</button></div>
          {sources.substacks.map(s=><div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f7f6f3"}}><div><span style={{fontSize:14,fontWeight:500,color:"#1a1a1a"}}>{"\u2709"} {s.name}</span>{s.url&&<a href={s.url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#1D9E75",marginLeft:8,textDecoration:"none"}}>{s.url.replace(/^https?:\/\/(www\.)?/,"")}</a>}</div><button onClick={()=>rm("substacks",s.id)} style={rb} onMouseOver={e=>e.target.style.color="#E24B4A"} onMouseOut={e=>e.target.style.color="#d3d1c7"}>{"\u2715"}</button></div>)}
        </div>}
        {tab==="subreddits"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:16}}><input placeholder="Subreddit name (e.g. adporn)" value={nr} onChange={e=>setNr(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&nr.trim()){const n=nr.startsWith("r/")?nr:`r/${nr}`;setSources(p=>({...p,subreddits:[...p.subreddits,{id:Date.now(),name:n}]}));setNr("")}}} style={{...is,flex:1}}/><button onClick={()=>{if(!nr.trim())return;const n=nr.startsWith("r/")?nr:`r/${nr}`;setSources(p=>({...p,subreddits:[...p.subreddits,{id:Date.now(),name:n}]}));setNr("")}} style={ab}>Add</button></div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{sources.subreddits.map(s=><span key={s.id} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:16,background:"#f1efe8",color:"#5F5E5A",fontSize:13}}>{"\u2B21"} {s.name}<button onClick={()=>rm("subreddits",s.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#B4B2A9",fontSize:12,padding:0,lineHeight:1}}>{"\u2715"}</button></span>)}</div>
        </div>}
      </div>
    </div>
  )
}

export default function CreativeRadar() {
  const [content, setContent] = useState(INITIAL_CONTENT)
  const [sources, setSources] = useState(DEFAULT_SOURCES)
  const [activePlatform, setActivePlatform] = useState("All")
  const [activeType, setActiveType] = useState("All")
  const [showSaved, setShowSaved] = useState(false)
  const [showGoldOnly, setShowGoldOnly] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [showTaste, setShowTaste] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [submitUrl, setSubmitUrl] = useState("")
  const [submitNote, setSubmitNote] = useState("")
  const [submitType, setSubmitType] = useState("Social-first")
  const [submitPlatform, setSubmitPlatform] = useState("TikTok")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState(null)
  const [toast, setToast] = useState(null)
  const [tasteUrl, setTasteUrl] = useState("")
  const [tasteNote, setTasteNote] = useState("")
  const [tasteTags, setTasteTags] = useState([])
  const [tasteHistory, setTasteHistory] = useState([])

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(null),2200) }
  const toggleSave = useCallback((id) => { setContent(p => { const u=p.map(c=>c.id===id?{...c,saved:!c.saved}:c); showToast(u.find(c=>c.id===id).saved?"Saved":"Removed"); return u }) }, [])
  const closeAll = (x) => { if(x!=="submit")setShowSubmit(false); if(x!=="taste")setShowTaste(false); if(x!=="sources")setShowSources(false) }

  const handleSubmit = () => {
    if(!submitUrl.trim())return
    setContent(p=>[{id:Date.now(),title:submitUrl,platform:submitPlatform,type:submitType,score:0,date:new Date().toISOString().split("T")[0],saved:false,author:"Your team",thumbnail:"\u2726",isGoldStandard:false,summary:submitNote||"Manually submitted \u2014 pending AI review",url:submitUrl,engagement:"New",whyItWorks:""},...p])
    setSubmitUrl("");setSubmitNote("");setShowSubmit(false);showToast("Link submitted")
  }

  const handleTaste = () => {
    if(!tasteUrl.trim())return
    setTasteHistory(p=>[{id:Date.now(),url:tasteUrl,note:tasteNote,tags:tasteTags,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})},...p])
    setTasteUrl("");setTasteNote("");setTasteTags([]);showToast("Added to taste profile")
  }

  const filtered = content.filter(c => {
    if(showSaved&&!c.saved)return false; if(showGoldOnly&&!c.isGoldStandard)return false
    if(activePlatform!=="All"&&c.platform!==activePlatform)return false; if(activeType!=="All"&&c.type!==activeType)return false
    if(searchQuery){const q=searchQuery.toLowerCase();return c.title.toLowerCase().includes(q)||c.summary.toLowerCase().includes(q)||c.author.toLowerCase().includes(q)}
    return true
  })
  const grouped = {}; filtered.forEach(c=>{const l=formatDate(c.date);if(!grouped[l])grouped[l]=[];grouped[l].push(c)}); Object.values(grouped).forEach(g=>g.sort((a,b)=>b.score-a.score))
  const todayCount = content.filter(c=>formatDate(c.date)==="Today").length
  const avgScore = filtered.length?Math.round(filtered.reduce((a,c)=>a+c.score,0)/filtered.length):0
  const totalSources = sources.publications.length+sources.thoughtLeaders.length+sources.substacks.length+sources.subreddits.length

  return (
    <div style={{fontFamily:"'Newsreader',Georgia,serif",minHeight:"100vh",padding:"0 0 4rem",background:"#FAFAF8"}}>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1a1a1a",color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",zIndex:999,animation:"fadeIn 0.2s ease"}}>{toast}</div>}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}.card{transition:all .2s ease;cursor:pointer}.card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.08)}.pill{transition:all .15s ease;cursor:pointer;user-select:none}.pill:hover{opacity:.85}.save-btn{transition:all .15s ease}.save-btn:hover{transform:scale(1.1)}.submit-overlay{animation:slideUp .25s ease}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}input:focus,select:focus{outline:none;border-color:#1D9E75!important}.chip{transition:all .15s ease}.chip:hover{background:#f0f0ec!important}.taste-tag{transition:all .12s ease;cursor:pointer;user-select:none}.gold-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#EF9F27;margin-right:5px;vertical-align:middle}`}</style>

      {/* Header */}
      <div style={{padding:"2rem 1.5rem 1rem",borderBottom:"1px solid #e8e6df"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:32,fontWeight:300,letterSpacing:"-0.02em",color:"#1a1a1a",lineHeight:1.1}}>Creative Radar</h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#888780",marginTop:6}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}<span style={{margin:"0 6px",color:"#d3d1c7"}}>{"\u00B7"}</span>Internet culture & social-first creative</p>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>setShowSaved(!showSaved)} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showSaved?"#1a1a1a":"transparent",color:showSaved?"#fff":"#5F5E5A",border:showSaved?"none":"1px solid #d3d1c7"}}>{"\u2665"} Saved</button>
            <button onClick={()=>setShowGoldOnly(!showGoldOnly)} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showGoldOnly?"#FDF3E0":"transparent",color:showGoldOnly?"#BA7517":"#5F5E5A",border:showGoldOnly?"1px solid #EF9F27":"1px solid #d3d1c7"}}>{"\u2605"} Gold standard</button>
            <button onClick={()=>{closeAll("taste");setShowTaste(!showTaste)}} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showTaste?"#EEEDFE":"transparent",color:showTaste?"#534AB7":"#5F5E5A",border:showTaste?"1px solid #AFA9EC":"1px solid #d3d1c7"}}>{"\u25C9"} Train taste</button>
            <button onClick={()=>{closeAll("sources");setShowSources(!showSources)}} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showSources?"#E6F1FB":"transparent",color:showSources?"#185FA5":"#5F5E5A",border:showSources?"1px solid #85B7EB":"1px solid #d3d1c7"}}>{"\u2699"} Sources</button>
            <button onClick={()=>{closeAll("submit");setShowSubmit(!showSubmit)}} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:"#1D9E75",color:"#fff",border:"none"}}>+ Submit link</button>
          </div>
        </div>
        <div style={{display:"flex",gap:24,marginTop:16,paddingTop:16,borderTop:"1px solid #f1efe8",flexWrap:"wrap"}}>
          {[{l:"Today's picks",v:todayCount},{l:"Avg. score",v:avgScore},{l:"Sources",v:totalSources},{l:"Brands tracked",v:sources.goldStandard.length},{l:"Taste signals",v:tasteHistory.length}].map(s=><div key={s.l} style={{fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:20,fontWeight:600,color:"#1a1a1a"}}>{s.v}</div><div style={{fontSize:11,color:"#888780",textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div></div>)}
        </div>
      </div>

      {showSources&&<SourcesManager sources={sources} setSources={setSources} onClose={()=>setShowSources(false)}/>}

      {showTaste&&<div className="submit-overlay" style={{padding:"1.25rem 1.5rem",background:"#F8F7FD",borderBottom:"1px solid #e8e6df"}}><div style={{fontFamily:"'DM Sans',sans-serif",maxWidth:600}}>
        <p style={{fontSize:14,fontWeight:600,color:"#1a1a1a",marginBottom:2}}>Train your taste</p>
        <p style={{fontSize:12,color:"#888780",marginBottom:12}}>Drop links you think are great. Tag what you liked. The AI learns your preferences over time.</p>
        <input type="url" placeholder="Paste a link to something you loved..." value={tasteUrl} onChange={e=>setTasteUrl(e.target.value)} style={{width:"100%",padding:"10px 14px",fontSize:14,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}/>
        <input type="text" placeholder="What made this great? (optional)" value={tasteNote} onChange={e=>setTasteNote(e.target.value)} style={{width:"100%",padding:"8px 14px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}/>
        <div style={{marginBottom:10}}><p style={{fontSize:11,color:"#888780",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>What stood out?</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{TASTE_TAGS.map(tag=><button key={tag} onClick={()=>setTasteTags(p=>p.includes(tag)?p.filter(t=>t!==tag):[...p,tag])} className="taste-tag" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"4px 12px",borderRadius:16,border:"none",background:tasteTags.includes(tag)?"#534AB7":"#EEEDFE",color:tasteTags.includes(tag)?"#fff":"#534AB7",fontWeight:tasteTags.includes(tag)?600:400}}>{tag}</button>)}</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={handleTaste} style={{padding:"8px 20px",fontSize:13,fontWeight:500,background:"#534AB7",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Add to taste profile</button>
          <button onClick={()=>setShowTaste(false)} style={{padding:"8px 16px",fontSize:13,background:"transparent",border:"1px solid #d3d1c7",borderRadius:8,cursor:"pointer",color:"#5F5E5A",fontFamily:"'DM Sans',sans-serif"}}>Close</button>
          {tasteHistory.length>0&&<span style={{fontSize:12,color:"#888780",marginLeft:8}}>{tasteHistory.length} signal{tasteHistory.length!==1?"s":""}</span>}
        </div>
        {tasteHistory.length>0&&<div style={{marginTop:14,paddingTop:12,borderTop:"1px solid #e8e6df"}}><p style={{fontSize:11,color:"#888780",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Recent signals</p>
          {tasteHistory.slice(0,5).map(e=><div key={e.id} style={{padding:"8px 0",borderBottom:"1px solid #f1efe8",display:"flex",gap:8}}><span style={{fontSize:11,color:"#B4B2A9",minWidth:45,flexShrink:0}}>{e.date}</span><div style={{flex:1,minWidth:0}}><a href={e.url} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"#534AB7",textDecoration:"none",wordBreak:"break-all"}}>{e.url.replace(/^https?:\/\/(www\.)?/,"").substring(0,60)}</a>{e.note&&<p style={{fontSize:12,color:"#5F5E5A",marginTop:2}}>{e.note}</p>}<div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>{e.tags.map(t=><span key={t} style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"#EEEDFE",color:"#534AB7"}}>{t}</span>)}</div></div></div>)}
        </div>}
      </div></div>}

      {showSubmit&&<div className="submit-overlay" style={{padding:"1.25rem 1.5rem",background:"#f5f4f0",borderBottom:"1px solid #e8e6df"}}><div style={{fontFamily:"'DM Sans',sans-serif",maxWidth:560}}>
        <p style={{fontSize:13,fontWeight:600,color:"#1a1a1a",marginBottom:12}}>Drop a link from any platform</p>
        <input type="url" placeholder="Paste URL here..." value={submitUrl} onChange={e=>setSubmitUrl(e.target.value)} style={{width:"100%",padding:"10px 14px",fontSize:14,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}/>
        <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
          <select value={submitPlatform} onChange={e=>setSubmitPlatform(e.target.value)} style={{padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",color:"#1a1a1a"}}>{PLATFORMS.filter(t=>t!=="All").map(t=><option key={t} value={t}>{t}</option>)}</select>
          <select value={submitType} onChange={e=>setSubmitType(e.target.value)} style={{padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",color:"#1a1a1a"}}>{TYPES.filter(t=>t!=="All").map(t=><option key={t} value={t}>{t}</option>)}</select>
          <input type="text" placeholder="Quick note (optional)" value={submitNote} onChange={e=>setSubmitNote(e.target.value)} style={{flex:1,minWidth:160,padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:8}}><button onClick={handleSubmit} style={{padding:"8px 20px",fontSize:13,fontWeight:500,background:"#1D9E75",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Submit</button><button onClick={()=>setShowSubmit(false)} style={{padding:"8px 16px",fontSize:13,background:"transparent",border:"1px solid #d3d1c7",borderRadius:8,cursor:"pointer",color:"#5F5E5A",fontFamily:"'DM Sans',sans-serif"}}>Cancel</button></div>
      </div></div>}

      {/* Tracking ticker */}
      <div style={{padding:"10px 1.5rem",borderBottom:"1px solid #f1efe8",fontFamily:"'DM Sans',sans-serif",fontSize:12,overflowX:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",color:"#BA7517",fontWeight:600,flexShrink:0}}>Tracking:</span><div style={{display:"flex",gap:4,flexWrap:"nowrap",overflowX:"auto"}}>{sources.goldStandard.map(b=><span key={b.id} style={{padding:"2px 10px",borderRadius:12,background:"#FDF3E0",color:"#854F0B",fontSize:11,whiteSpace:"nowrap",fontWeight:500}}>{"\u2605"} {b.name}</span>)}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",color:"#888780",fontWeight:600,flexShrink:0}}>Sources:</span><div style={{display:"flex",gap:4,flexWrap:"nowrap",overflowX:"auto",color:"#B4B2A9",fontSize:11}}>{sources.publications.map((p,i)=><span key={p.id}>{i>0&&<span style={{color:"#d3d1c7"}}> {"\u00B7"} </span>}{p.name}</span>)}{sources.thoughtLeaders.length>0&&<span><span style={{color:"#d3d1c7"}}> {"\u00B7"} </span><span style={{color:"#534AB7"}}>{sources.thoughtLeaders.length} thought leader{sources.thoughtLeaders.length!==1?"s":""}</span></span>}{sources.substacks.length>0&&<span><span style={{color:"#d3d1c7"}}> {"\u00B7"} </span>{sources.substacks.length} Substack{sources.substacks.length!==1?"s":""}</span>}{sources.subreddits.length>0&&<span><span style={{color:"#d3d1c7"}}> {"\u00B7"} </span>{sources.subreddits.map(s=>s.name).join(", ")}</span>}</div></div>
      </div>

      {/* Filters */}
      <div style={{padding:"1rem 1.5rem",borderBottom:"1px solid #f1efe8"}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>{PLATFORMS.map(s=><button key={s} onClick={()=>setActivePlatform(s)} className="chip" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"5px 12px",borderRadius:16,border:"none",cursor:"pointer",background:activePlatform===s?"#1a1a1a":"#f1efe8",color:activePlatform===s?"#fff":"#5F5E5A",fontWeight:activePlatform===s?600:400}}>{s!=="All"&&<span style={{marginRight:4}}>{pIcon(s)}</span>}{s}</button>)}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>{TYPES.map(t=><button key={t} onClick={()=>setActiveType(t)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,padding:"4px 10px",borderRadius:12,cursor:"pointer",background:activeType===t?"#E1F5EE":"transparent",color:activeType===t?"#0F6E56":"#888780",border:activeType===t?"1px solid #5DCAA5":"1px solid transparent",fontWeight:activeType===t?600:400}}>{t}</button>)}<div style={{flex:1}}/><input type="text" placeholder="Search..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"5px 12px",border:"1px solid #e8e6df",borderRadius:16,background:"#fff",width:160,color:"#1a1a1a"}}/></div>
      </div>

      {/* Feed */}
      <div style={{padding:"0.5rem 1.5rem"}}>
        {Object.entries(grouped).length===0&&<div style={{textAlign:"center",padding:"3rem 1rem",fontFamily:"'DM Sans',sans-serif",color:"#888780"}}><div style={{fontSize:32,marginBottom:8}}>{"\u2205"}</div><div style={{fontSize:14}}>No content matches your filters</div></div>}
        {Object.entries(grouped).map(([dl,items])=><div key={dl}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:"#B4B2A9",padding:"1.25rem 0 0.5rem",borderBottom:"1px solid #f1efe8",marginBottom:4}}>{dl}</div>
          {items.map(item=>{const sc=scoreColor(item.score);const ex=expandedId===item.id;return(
            <div key={item.id} className="card" onClick={()=>setExpandedId(ex?null:item.id)} style={{padding:"1rem 0",borderBottom:"1px solid #f7f6f3",display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:56,height:56,borderRadius:10,background:"#f1efe8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,position:"relative"}}>{item.thumbnail}{item.isGoldStandard&&<div style={{position:"absolute",top:-3,right:-3,width:14,height:14,borderRadius:"50%",background:"#EF9F27",border:"2px solid #FAFAF8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff"}}>{"\u2605"}</div>}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:4}}><h3 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:16,fontWeight:400,color:"#1a1a1a",lineHeight:1.3,flex:1}}>{item.isGoldStandard&&<span className="gold-dot"/>}{item.title}</h3><button className="save-btn" onClick={e=>{e.stopPropagation();toggleSave(item.id)}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:item.saved?"#E24B4A":"#d3d1c7",flexShrink:0,padding:"0 2px"}}>{item.saved?"\u2665":"\u2661"}</button></div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#888780"}}><span style={{background:"#f1efe8",padding:"2px 8px",borderRadius:10,fontSize:11,color:"#5F5E5A"}}>{pIcon(item.platform)} {item.platform}</span><span style={{background:sc.bg,padding:"2px 8px",borderRadius:10,fontSize:11,color:sc.text,fontWeight:600}}>{item.score>0?`${item.score} \u2014 ${sc.label}`:"Pending"}</span><span>{item.author}</span><span style={{color:"#d3d1c7"}}>{"\u00B7"}</span><span>{item.engagement}</span></div>
                {ex&&<div style={{marginTop:10,animation:"fadeIn 0.2s ease"}}>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:"#5F5E5A",lineHeight:1.6,marginBottom:8}}>{item.summary}</p>
                  {item.whyItWorks&&<div style={{padding:"8px 12px",borderRadius:8,background:"#F8F7FD",border:"1px solid #EEEDFE",marginBottom:10}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",color:"#534AB7",fontWeight:600,marginBottom:3}}>Why it works</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#534AB7",lineHeight:1.5}}>{item.whyItWorks}</p></div>}
                  <div style={{display:"flex",gap:8,alignItems:"center"}}><a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1D9E75",textDecoration:"none",fontWeight:500}}>View original {"\u2197"}</a><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"2px 8px",background:"#f1efe8",borderRadius:8,color:"#5F5E5A"}}>{item.type}</span></div>
                </div>}
              </div>
            </div>)})}
        </div>)}
      </div>

      <div style={{padding:"2rem 1.5rem 1rem",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#B4B2A9"}}><div style={{marginBottom:4}}>Creative Radar {"\u2014"} Internet culture & social-first creative, curated daily</div><div>TikTok {"\u00B7"} Instagram {"\u00B7"} YouTube {"\u00B7"} Twitter/X {"\u00B7"} LinkedIn {"\u00B7"} Substack {"\u00B7"} RSS</div></div>
    </div>
  )
}
