const Home = ({ onArena, courts, arenas, notifications, unreadCount, onMarkAllRead, onMarkRead, onDeleteNotif }) => {
  const [sport,setSport]=useState("All");
  const [q,setQ]=useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const topRatedId = (arenas||ARENAS).reduce((best,a)=>a.rating>best.rating?a:best,(arenas||ARENAS)[0])?.id;
  const filtered=(arenas||ARENAS).filter(a=>{
    if(q!==""&&!a.name.toLowerCase().includes(q.toLowerCase())) return false;
    if(sport!=="All"&&!a.sports.some(s=>s.toLowerCase().includes(sport.toLowerCase()))) return false;
    // Hide Vanguard if all its courts are hidden/maintenance
    if(a.id===4&&courts){
      const open=courts.filter(c=>c.visible&&c.status!=="maintenance");
      if(open.length===0) return false;
    }
    return true;
  });
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",position:"relative"}}>

      {/* Notification Panel */}
      {showNotifs&&(
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:50,display:"flex",flexDirection:"column"}}>
          <div onClick={()=>setShowNotifs(false)} style={{flex:1,background:"rgba(0,0,0,0.5)"}}/>
          <div style={{background:"#0f1f13",borderRadius:"20px 20px 0 0",border:`1px solid ${C.border}`,maxHeight:"75%",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"16px 18px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <div>
                <span style={{fontWeight:900,fontSize:18}}>Notifications</span>
                {unreadCount>0&&<span style={{marginLeft:8,background:C.green,color:"#000",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:50}}>{unreadCount} new</span>}
              </div>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                {(notifications||[]).length>0&&<span onClick={()=>onMarkAllRead()} style={{color:C.green,fontSize:12,fontWeight:600,cursor:"pointer"}}>Mark all read</span>}
                <span onClick={()=>setShowNotifs(false)} style={{color:C.textMuted,fontSize:20,cursor:"pointer",lineHeight:1}}>×</span>
              </div>
            </div>
            <div style={{overflowY:"auto",padding:"0 16px 20px"}}>
              {(!notifications||notifications.length===0)&&(
                <div style={{textAlign:"center",padding:"32px 0",color:C.textMuted}}>
                  <div style={{fontSize:32,marginBottom:8}}>🔔</div>
                  <div style={{fontWeight:700,fontSize:14}}>No notifications yet</div>
                </div>
              )}
              {(notifications||[]).map(n=>(
                <div key={n.id}
                  style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",
                    borderBottom:`1px solid ${C.border}`,
                    background:n.read?"transparent":"rgba(34,228,85,0.03)"}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:n.read?"#1a2e1f":"rgba(34,228,85,0.12)",
                    border:`1px solid ${n.read?C.border:C.green+"44"}`,
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>
                    {NOTIF_ICONS[n.type]||NOTIF_ICONS.default}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:n.read?400:600,color:n.read?C.textDim:C.text,lineHeight:1.4}}>{n.msg}</div>
                    <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{n.time}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                    {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:C.green}}/>}
                    <span onClick={()=>onDeleteNotif(n.id)} style={{color:C.textMuted,fontSize:16,cursor:"pointer",lineHeight:1,padding:"2px 4px"}}>×</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"14px 18px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <img src={LOGO_IMG} alt="logo" style={{width:28,height:28,borderRadius:"50%"}}/>
          <span style={{fontWeight:800,fontSize:18}}>BookMyCourt</span>
        </div>
        <div onClick={()=>{setShowNotifs(!showNotifs); if(!showNotifs) onMarkAllRead();}}
          style={{width:36,height:36,borderRadius:"50%",background:"#1a2e1f",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:"pointer"}}>
          <Icon n="bell" color={C.text} size={18}/>
          {unreadCount>0&&(
            <div style={{position:"absolute",top:4,right:4,minWidth:16,height:16,borderRadius:50,background:C.green,border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:9,fontWeight:900,color:"#000",lineHeight:1,padding:"0 3px"}}>{unreadCount}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{padding:"0 18px 8px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#0f1f13",borderRadius:50,padding:"10px 16px",border:`1px solid ${C.border}`}}>
          <Icon n="search" color={C.textMuted} size={15}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search arenas or sports"
            style={{flex:1,background:"none",border:"none",color:C.text,fontSize:13,outline:"none"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 18px 8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontWeight:700,fontSize:15}}>Explore Sports</span>
          <span style={{color:C.green,fontSize:13,cursor:"pointer"}}>See all</span>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          {SPORTS.map(s=>(
            <button key={s} onClick={()=>setSport(s)}
              style={{padding:"6px 14px",borderRadius:50,border:"none",background:sport===s?C.green:"#1a2e1f",color:sport===s?"#000":C.text,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontSize:13}}>{s}</button>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontWeight:700,fontSize:15}}>Featured Arenas</span>
          <span style={{color:C.green,fontSize:13}}>Filter</span>
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",color:C.textMuted,padding:"40px 0"}}>No arenas found.</div>}
        {filtered.map(a=>(
          <div key={a.id} onClick={()=>onArena(a)} style={{background:C.card,borderRadius:18,overflow:"hidden",marginBottom:14,cursor:"pointer",border:`1px solid ${C.border}`}}>
            <div style={{position:"relative"}}>
              <ArenaImg src={a.img} alt={a.name} height={160} sport={a.sports[0]}/>
              <div style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.75)",borderRadius:50,padding:"3px 8px",display:"flex",alignItems:"center",gap:3}}>
                <Icon n="star" color={C.orange} size={11}/><span style={{fontSize:11,fontWeight:700}}>{a.rating}</span>
              </div>
            </div>
            <div style={{padding:"11px 13px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <span style={{fontWeight:800,fontSize:15}}>{a.name}</span>
                <span style={{color:C.green,fontWeight:800,fontSize:14}}>${a.price}/hr</span>
              </div>
              {a.id===topRatedId&&(
                <div style={{display:"inline-flex",alignItems:"center",gap:4,
                  background:"linear-gradient(90deg,rgba(34,228,85,0.15),rgba(34,228,85,0.05))",
                  border:`1px solid ${C.green}55`,borderRadius:50,padding:"3px 10px",margin:"4px 0 2px"}}>
                  <span style={{fontSize:13}}>⭐</span>
                  <span style={{fontSize:10,fontWeight:800,color:C.green,letterSpacing:0.5}}>TOP RATED</span>
                </div>
              )}
              <div style={{display:"flex",alignItems:"center",gap:4,margin:"3px 0 7px"}}>
                <Icon n="pin" color={C.textMuted} size={11}/><span style={{color:C.textMuted,fontSize:11}}>{a.location}</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {a.sports.map(s=><span key={s} style={{padding:"2px 9px",borderRadius:50,background:"#1a2e1f",color:C.textDim,fontSize:11,fontWeight:600}}>{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

