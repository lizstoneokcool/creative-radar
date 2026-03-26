"use client"
import { useState, useCallback, useEffect } from "react"

const PLATFORMS = ["All","TikTok","Instagram","YouTube","Twitter/X","LinkedIn","Substack","RSS","Reddit"]
const TYPES = ["All","Social-first","Campaign","Creator","Series","Documentary","Sketch/Skit","Trad+Social","Design"]
const TASTE_TAGS = ["Humor / tone","Format / editing","Engagement proof","Craft / production","Cultural relevance","Bold brand move","Community response","Lo-fi magic"]

const DEMO_CONTENT = [
  {id:1,title:"Duolingo's unhinged Owl lore continues",platform:"TikTok",type:"Social-first",score:97,date:"2026-03-25",saved:false,author:"Duolingo",thumbnail:"\u{1F989}",isGoldStandard:true,summary:"The owl is now in a situationship with Dua Lipa and the comments section is fully invested. Nobody does character-driven social like Duolingo.",url:"https://www.tiktok.com/@duolingo",engagement:"4.2M views",whyItWorks:"Character-driven storytelling where the audience is part of the plot"},
  {id:2,title:"Jacquemus names grandmother as first brand ambassador",platform:"Instagram",type:"Campaign",score:96,date:"2026-03-25",saved:false,author:"Jacquemus",thumbnail:"\u{1F475}",isGoldStandard:true,summary:"Not a celebrity \u2014 founder's 79-year-old grandmother Liline. The tongue-in-cheek contract went viral.",url:"https://www.jacquemus.com/en_fr/explore/brandambassadeur.html",engagement:"Viral",whyItWorks:"Subverted every expectation of a brand ambassador announcement"},
  {id:3,title:"Dove turns unfiltered Reddit reviews into national ad campaign",platform:"RSS",type:"Trad+Social",score:95,date:"2026-03-25",saved:false,author:"DAVID London via Ads of the World",thumbnail:"\u{1F9F4}",isGoldStandard:false,summary:"Dove asked Reddit to review their hair mask honestly, then put the results \u2014 good AND bad \u2014 on billboards across NYC.",url:"https://www.adsoftheworld.com/campaigns/dove-hair-is-sponsoring-honesty-over-praise",engagement:"Featured",whyItWorks:"Turned user-generated criticism into the campaign itself"},
  {id:4,title:"How Heinz turned a fry box into the year's best packaging story",platform:"RSS",type:"Design",score:96,date:"2026-03-24",saved:false,author:"Famous Campaigns",thumbnail:"\u{1F35F}",isGoldStandard:false,summary:"Rethink redesigned the fry box with a built-in ketchup compartment. The social rollout turned packaging into content.",url:"https://www.famouscampaigns.com/2026/01/heinz-reinvents-the-fry-box-with-ketchup-friendly-design/",engagement:"Trending",whyItWorks:"Product innovation designed to be social content from day one"},
  {id:5,title:"Ryanair's self-deprecation playbook keeps winning",platform:"TikTok",type:"Series",score:93,date:"2026-03-24",saved:false,author:"Ryanair",thumbnail:"\u2708\uFE0F",isGoldStandard:true,summary:"The latest series roasts their own legroom, food, and landing quality. The audience loves it because the brand is in on the joke.",url:"https://www.tiktok.com/@ryanair",engagement:"12M+ views",whyItWorks:"Self-deprecation as brand strategy \u2014 turned weakness into content"},
  {id:6,title:"Eli Lilly's Olympic film is advertising as art",platform:"RSS",type:"Campaign",score:94,date:"2026-03-24",saved:false,author:"The Global Review",thumbnail:"\u{1F3C5}",isGoldStandard:false,summary:"Wieden+Kennedy blends archival athletics with medical research. No product mention. The message: 'we continue.'",url:"https://www.gethegoods.com/articles/the-global-creative-review-february-2026-best-advertising-campaigns",engagement:"Award-worthy",whyItWorks:"A pharmaceutical brand chose restraint over promotion during the Olympics"},
  {id:7,title:"20 of the best campaigns from January 2026",platform:"RSS",type:"Campaign",score:92,date:"2026-03-23",saved:false,author:"Famous Campaigns",thumbnail:"\u{1F3AF}",isGoldStandard:false,summary:"From ketchup-friendly fry boxes to Jacquemus naming his grandmother as ambassador \u2014 a roundup of the work that kicked off 2026.",url:"https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/",engagement:"Roundup",whyItWorks:"Curated overview of what set the creative bar for the year"},
  {id:8,title:"The best marketing campaigns of 2026 so far",platform:"RSS",type:"Campaign",score:91,date:"2026-03-23",saved:false,author:"The Go Network",thumbnail:"\u{1F4E3}",isGoldStandard:false,summary:"Monthly review covering Birkenstock's Ramadan campaign, Tesco's emotional value play, and Moju's morning ritual film.",url:"https://www.thegonetwork.com/articles/the-best-marketing-campaigns-of-2026---monthly-review-2026",engagement:"Featured",whyItWorks:"Shows range \u2014 from cultural sensitivity to everyday brand moments"},
  {id:9,title:"Scrub Daddy's employee reaction series",platform:"Instagram",type:"Series",score:91,date:"2026-03-23",saved:false,author:"Scrub Daddy",thumbnail:"\u{1F9FD}",isGoldStandard:true,summary:"Employees reacting to customer cleaning fails. Low production, high personality. The series format keeps people coming back.",url:"https://www.instagram.com/scrubdaddy/",engagement:"1.5M avg views",whyItWorks:"Employee-driven content that feels real because it is real"},
  {id:10,title:"TikTok's own 2026 trend forecast for marketers",platform:"RSS",type:"Documentary",score:90,date:"2026-03-22",saved:false,author:"TikTok Newsroom",thumbnail:"\u{1F4CA}",isGoldStandard:false,summary:"TikTok Next reveals how brands like Oreo and Audible earned engagement by letting communities lead. Packed with data.",url:"https://newsroom.tiktok.com/introducing-tiktok-next-2026-our-trend-forecast-for-marketers-for-the-year-ahead",engagement:"Official report",whyItWorks:"Platform-level insights on what actually drives engagement in 2026"},
  {id:11,title:"Liquid Death x e.l.f. Beauty \u2014 gothic musical collab",platform:"YouTube",type:"Sketch/Skit",score:93,date:"2026-03-22",saved:false,author:"Famous Campaigns",thumbnail:"\u{1F480}",isGoldStandard:false,summary:"Black metal frontman Glothar returns for round 2. Two brands whose collab makes zero logical sense but absolute creative sense.",url:"https://www.famouscampaigns.com/2026/01/20-of-the-best-campaigns-from-january-2026/",engagement:"2.1M views",whyItWorks:"Unexpected brand collabs that create genuine entertainment"},
  {id:12,title:"Burberry designs runway for the feed, not the front row",platform:"Instagram",type:"Campaign",score:91,date:"2026-03-22",saved:false,author:"Burberry",thumbnail:"\u{1F9E3}",isGoldStandard:true,summary:"Every look staged for vertical video. BTS content dripped for weeks. Audience engagement shaped the conversation more than critics.",url:"https://www.instagram.com/burberry/",engagement:"Culturally dominant",whyItWorks:"Traditional format rebuilt from the ground up for social distribution"},
]

const scoreColor = s => s>=95?{bg:"#EAF3DE",text:"#3B6D11",label:"Exceptional"}:s>=90?{bg:"#E1F5EE",text:"#0F6E56",label:"Outstanding"}:s>=85?{bg:"#E6F1FB",text:"#185FA5",label:"Strong"}:{bg:"#F1EFE8",text:"#5F5E5A",label:"Notable"}
const formatDate = ds => {const d=new Date(ds+"T12:00:00"),t=new Date(),y=new Date(t);y.setDate(y.getDate()-1);return d.toDateString()===t.toDateString()?"Today":d.toDateString()===y.toDateString()?"Yesterday":d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}
const pIcon = s => ({"TikTok":"\u266A","Instagram":"\u25CE","YouTube":"\u25B6","Twitter/X":"\uD835\uDD4F","LinkedIn":"in","Substack":"\u2709","RSS":"\u25C9","Reddit":"\u2B21"})[s]||"\u2022"

export default function CreativeRadar() {
  const [content, setContent] = useState(DEMO_CONTENT)
  const [activePlatform, setActivePlatform] = useState("All")
  const [activeType, setActiveType] = useState("All")
  const [showSaved, setShowSaved] = useState(false)
  const [showGoldOnly, setShowGoldOnly] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitUrl, setSubmitUrl] = useState("")
  const [submitNote, setSubmitNote] = useState("")
  const [submitType, setSubmitType] = useState("Social-first")
  const [submitPlatform, setSubmitPlatform] = useState("TikTok")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState(null)
  const [toast, setToast] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [isLive, setIsLive] = useState(false)

  // On mount, try to fetch from the real API
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/content?days=7&limit=50")
        const data = await res.json()
        if (data.content && data.content.length > 0) {
          setContent(data.content)
          setIsLive(true)
        }
      } catch (e) {
        // API not configured yet — use demo content
        console.log("Using demo content (API not connected yet)")
      }
    }
    loadContent()
  }, [])

  const showToast = m => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const toggleSave = useCallback(id => {
    setContent(p => { const u=p.map(c=>c.id===id?{...c,saved:!c.saved}:c); return u })
  }, [])

  // THE KEY FEATURE: Refresh button that fetches real content
  const handleRefresh = async () => {
    setIsRefreshing(true)
    showToast("Scanning sources for new content...")
    try {
      const res = await fetch("/api/refresh", { method: "POST" })
      const data = await res.json()
      if (data.error) {
        showToast("Refresh failed \u2014 check your API keys in Vercel settings")
        setIsRefreshing(false)
        return
      }
      // Re-fetch the content list
      const contentRes = await fetch("/api/content?days=7&limit=50")
      const contentData = await contentRes.json()
      if (contentData.content && contentData.content.length > 0) {
        setContent(contentData.content)
        setIsLive(true)
        setLastRefresh(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))
        showToast(`Found ${contentData.count} pieces of content!`)
      } else {
        showToast("Refresh complete \u2014 no new content found")
      }
    } catch (e) {
      showToast("API not connected \u2014 see README for setup instructions")
    }
    setIsRefreshing(false)
  }

  const handleSubmit = () => {
    if(!submitUrl.trim())return
    setContent(p=>[{id:Date.now(),title:submitUrl,platform:submitPlatform,type:submitType,score:0,date:new Date().toISOString().split("T")[0],saved:false,author:"Your team",thumbnail:"\u2726",isGoldStandard:false,summary:submitNote||"Manually submitted",url:submitUrl,engagement:"New",whyItWorks:""},...p])
    setSubmitUrl("");setSubmitNote("");setShowSubmit(false);showToast("Link submitted")
  }

  const filtered = content.filter(c => {
    if(showSaved&&!c.saved)return false; if(showGoldOnly&&!c.isGoldStandard)return false
    if(activePlatform!=="All"&&c.platform!==activePlatform)return false
    if(activeType!=="All"&&c.type!==activeType)return false
    if(searchQuery){const q=searchQuery.toLowerCase();return c.title.toLowerCase().includes(q)||(c.summary||"").toLowerCase().includes(q)||(c.author||"").toLowerCase().includes(q)}
    return true
  })
  const grouped = {}; filtered.forEach(c=>{const l=formatDate(c.date);if(!grouped[l])grouped[l]=[];grouped[l].push(c)}); Object.values(grouped).forEach(g=>g.sort((a,b)=>b.score-a.score))
  const todayCount = content.filter(c=>formatDate(c.date)==="Today").length
  const avgScore = filtered.length?Math.round(filtered.reduce((a,c)=>a+c.score,0)/filtered.length):0

  return (
    <div style={{fontFamily:"'Newsreader',Georgia,serif",minHeight:"100vh",padding:"0 0 4rem",background:"#FAFAF8"}}>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1a1a1a",color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",zIndex:999,animation:"fadeIn 0.2s ease"}}>{toast}</div>}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}.card{transition:all .2s ease;cursor:pointer}.card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.08)}.pill{transition:all .15s ease;cursor:pointer;user-select:none}.pill:hover{opacity:.85}.save-btn{transition:all .15s ease}.save-btn:hover{transform:scale(1.1)}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}input:focus,select:focus{outline:none;border-color:#1D9E75!important}.chip{transition:all .15s ease}.chip:hover{background:#f0f0ec!important}.gold-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#EF9F27;margin-right:5px;vertical-align:middle}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>

      {/* Header */}
      <div style={{padding:"2rem 1.5rem 1rem",borderBottom:"1px solid #e8e6df"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{fontSize:32,fontWeight:300,letterSpacing:"-0.02em",color:"#1a1a1a",lineHeight:1.1}}>Creative Radar</h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#888780",marginTop:6}}>
              {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
              <span style={{margin:"0 6px",color:"#d3d1c7"}}>{"\u00B7"}</span>
              {isLive?<span style={{color:"#1D9E75",fontWeight:600}}>Live</span>:<span style={{color:"#BA7517"}}>Demo mode</span>}
              {lastRefresh&&<span style={{marginLeft:8,color:"#B4B2A9"}}>Last refresh: {lastRefresh}</span>}
            </p>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>setShowSaved(!showSaved)} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showSaved?"#1a1a1a":"transparent",color:showSaved?"#fff":"#5F5E5A",border:showSaved?"none":"1px solid #d3d1c7"}}>{"\u2665"} Saved</button>
            <button onClick={()=>setShowGoldOnly(!showGoldOnly)} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:showGoldOnly?"#FDF3E0":"transparent",color:showGoldOnly?"#BA7517":"#5F5E5A",border:showGoldOnly?"1px solid #EF9F27":"1px solid #d3d1c7"}}>{"\u2605"} Gold standard</button>
            <button onClick={()=>setShowSubmit(!showSubmit)} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:20,background:"transparent",color:"#5F5E5A",border:"1px solid #d3d1c7"}}>+ Submit</button>
            <button onClick={handleRefresh} disabled={isRefreshing} className="pill" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,padding:"6px 18px",borderRadius:20,background:isRefreshing?"#f1efe8":"#1D9E75",color:isRefreshing?"#888780":"#fff",border:"none",opacity:isRefreshing?0.7:1}}>
              {isRefreshing?<><span className="spin" style={{display:"inline-block",marginRight:6}}>{"\u21BB"}</span>Scanning...</>:<>{"\u21BB"} Refresh today</>}
            </button>
          </div>
        </div>
        <div style={{display:"flex",gap:24,marginTop:16,paddingTop:16,borderTop:"1px solid #f1efe8",flexWrap:"wrap"}}>
          {[{l:"Today's picks",v:todayCount},{l:"Avg. score",v:avgScore},{l:"Total in feed",v:content.length},{l:"Showing",v:filtered.length}].map(s=><div key={s.l} style={{fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:20,fontWeight:600,color:"#1a1a1a"}}>{s.v}</div><div style={{fontSize:11,color:"#888780",textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div></div>)}
        </div>
      </div>

      {/* Submit panel */}
      {showSubmit&&<div style={{padding:"1.25rem 1.5rem",background:"#f5f4f0",borderBottom:"1px solid #e8e6df",animation:"slideUp 0.25s ease"}}><div style={{fontFamily:"'DM Sans',sans-serif",maxWidth:560}}>
        <p style={{fontSize:13,fontWeight:600,color:"#1a1a1a",marginBottom:12}}>Drop a link from any platform</p>
        <input type="url" placeholder="Paste URL here..." value={submitUrl} onChange={e=>setSubmitUrl(e.target.value)} style={{width:"100%",padding:"10px 14px",fontSize:14,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif",marginBottom:8}}/>
        <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
          <select value={submitPlatform} onChange={e=>setSubmitPlatform(e.target.value)} style={{padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif"}}>{PLATFORMS.filter(t=>t!=="All").map(t=><option key={t} value={t}>{t}</option>)}</select>
          <select value={submitType} onChange={e=>setSubmitType(e.target.value)} style={{padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif"}}>{TYPES.filter(t=>t!=="All").map(t=><option key={t} value={t}>{t}</option>)}</select>
          <input type="text" placeholder="Quick note (optional)" value={submitNote} onChange={e=>setSubmitNote(e.target.value)} style={{flex:1,minWidth:160,padding:"8px 12px",fontSize:13,border:"1px solid #d3d1c7",borderRadius:8,background:"#fff",fontFamily:"'DM Sans',sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:8}}><button onClick={handleSubmit} style={{padding:"8px 20px",fontSize:13,fontWeight:500,background:"#1D9E75",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Submit</button><button onClick={()=>setShowSubmit(false)} style={{padding:"8px 16px",fontSize:13,background:"transparent",border:"1px solid #d3d1c7",borderRadius:8,cursor:"pointer",color:"#5F5E5A",fontFamily:"'DM Sans',sans-serif"}}>Cancel</button></div>
      </div></div>}

      {/* Filters */}
      <div style={{padding:"1rem 1.5rem",borderBottom:"1px solid #f1efe8"}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>{PLATFORMS.map(s=><button key={s} onClick={()=>setActivePlatform(s)} className="chip" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"5px 12px",borderRadius:16,border:"none",cursor:"pointer",background:activePlatform===s?"#1a1a1a":"#f1efe8",color:activePlatform===s?"#fff":"#5F5E5A",fontWeight:activePlatform===s?600:400}}>{s!=="All"&&<span style={{marginRight:4}}>{pIcon(s)}</span>}{s}</button>)}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>{TYPES.map(t=><button key={t} onClick={()=>setActiveType(t)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,padding:"4px 10px",borderRadius:12,cursor:"pointer",background:activeType===t?"#E1F5EE":"transparent",color:activeType===t?"#0F6E56":"#888780",border:activeType===t?"1px solid #5DCAA5":"1px solid transparent",fontWeight:activeType===t?600:400}}>{t}</button>)}<div style={{flex:1}}/><input type="text" placeholder="Search..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,padding:"5px 12px",border:"1px solid #e8e6df",borderRadius:16,background:"#fff",width:160,color:"#1a1a1a"}}/></div>
      </div>

      {/* Feed */}
      <div style={{padding:"0.5rem 1.5rem"}}>
        {Object.entries(grouped).length===0&&<div style={{textAlign:"center",padding:"3rem 1rem",fontFamily:"'DM Sans',sans-serif",color:"#888780"}}><div style={{fontSize:32,marginBottom:8}}>{"\u2205"}</div><div style={{fontSize:14}}>No content matches your filters</div></div>}
        {Object.entries(grouped).map(([dl,items])=><div key={dl}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:"#B4B2A9",padding:"1.25rem 0 0.5rem",borderBottom:"1px solid #f1efe8",marginBottom:4}}>{dl} <span style={{fontWeight:400,textTransform:"none",letterSpacing:"normal"}}>({items.length} piece{items.length!==1?"s":""})</span></div>
          {items.map(item=>{const sc=scoreColor(item.score);const ex=expandedId===item.id;return(
            <div key={item.id} className="card" onClick={()=>setExpandedId(ex?null:item.id)} style={{padding:"1rem 0",borderBottom:"1px solid #f7f6f3",display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:56,height:56,borderRadius:10,background:"#f1efe8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,position:"relative"}}>{item.thumbnail||"\u{1F4CC}"}{item.isGoldStandard&&<div style={{position:"absolute",top:-3,right:-3,width:14,height:14,borderRadius:"50%",background:"#EF9F27",border:"2px solid #FAFAF8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff"}}>{"\u2605"}</div>}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:4}}><h3 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:16,fontWeight:400,color:"#1a1a1a",lineHeight:1.3,flex:1}}>{item.isGoldStandard&&<span className="gold-dot"/>}{item.title}</h3><button className="save-btn" onClick={e=>{e.stopPropagation();toggleSave(item.id)}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:item.saved?"#E24B4A":"#d3d1c7",flexShrink:0,padding:"0 2px"}}>{item.saved?"\u2665":"\u2661"}</button></div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#888780"}}>
                  <span style={{background:"#f1efe8",padding:"2px 8px",borderRadius:10,fontSize:11,color:"#5F5E5A"}}>{pIcon(item.platform)} {item.platform}</span>
                  <span style={{background:sc.bg,padding:"2px 8px",borderRadius:10,fontSize:11,color:sc.text,fontWeight:600}}>{item.score>0?`${item.score} \u2014 ${sc.label}`:"Pending"}</span>
                  <span>{item.author||item.source}</span>
                  {item.engagement&&<><span style={{color:"#d3d1c7"}}>{"\u00B7"}</span><span>{item.engagement}</span></>}
                </div>
                {ex&&<div style={{marginTop:10}}>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:"#5F5E5A",lineHeight:1.6,marginBottom:8}}>{item.summary}</p>
                  {item.whyItWorks&&<div style={{padding:"8px 12px",borderRadius:8,background:"#F8F7FD",border:"1px solid #EEEDFE",marginBottom:10}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",color:"#534AB7",fontWeight:600,marginBottom:3}}>Why it works</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#534AB7",lineHeight:1.5}}>{item.whyItWorks}</p></div>}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#1D9E75",textDecoration:"none",fontWeight:500}}>Read the full piece {"\u2197"}</a>
                </div>}
              </div>
            </div>)})}
        </div>)}
      </div>

      {/* Footer */}
      <div style={{padding:"2rem 1.5rem 1rem",textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#B4B2A9"}}>
        <div style={{marginBottom:4}}>Creative Radar {"\u2014"} Internet culture & social-first creative</div>
        <div>{isLive?"Pulling live from your configured sources":"Demo mode \u2014 connect Supabase + Anthropic API to go live"}</div>
      </div>
    </div>
  )
}
