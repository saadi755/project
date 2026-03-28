const Discover = ({ onArena, onDeal, onRegister, registeredEvents, arenas }) => {
  const [sportFilter, setSportFilter] = useState(null);
  const [dealFilter, setDealFilter] = useState("All");
  const [availNow, setAvailNow] = useState(false);

  const allArenas = arenas || ARENAS;
  const filtered = allArenas.filter(a => {
    if(sportFilter && !a.sports.some(s=>s.toLowerCase().includes(sportFilter.toLowerCase()))) return false;
    return true;
  });
  // Available Now = open arenas, also filtered by selected sport
  const availableNow = allArenas.filter(a => {
    if(sportFilter && !a.sports.some(s=>s.toLowerCase().includes(sportFilter.toLowerCase()))) return false;
    if(!a.courts) return true;
    return a.courts.some(c => c.status === "available");
  });

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>

      {/* Header */}
      <div style={{padding:"14px 18px 10px",flexShrink:0}}>
        <h2 style={{fontWeight:900,fontSize:22,margin:0}}>Discover</h2>
        <p style={{color:C.textMuted,fontSize:13,margin:"2px 0 0"}}>Find arenas, deals & events near you</p>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"0 18px 16px"}}>

        {/* Quick filters row */}
        <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
          <button onClick={()=>setAvailNow(!availNow)}
            style={{padding:"7px 14px",borderRadius:50,border:`1px solid ${availNow?C.green:C.border}`,background:availNow?"rgba(34,228,85,0.1)":"#0f1f13",color:availNow?C.green:C.textDim,fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:availNow?C.green:C.textMuted,display:"inline-block"}}/>
            Available Now
          </button>
          <button onClick={()=>setSportFilter(null)}
            style={{padding:"7px 14px",borderRadius:50,border:`1px solid ${!sportFilter?C.green:C.border}`,background:!sportFilter?"rgba(34,228,85,0.1)":"#0f1f13",color:!sportFilter?C.green:C.textDim,fontWeight:700,fontSize:12,cursor:"pointer"}}>
            All Sports
          </button>
        </div>

        {/* Browse by Sport */}
        <div style={{marginBottom:22}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>🎯 Browse by Sport</div>
          <div style={{display:"flex",gap:18,overflowX:"auto",paddingBottom:6}}>
            {SPORT_CATEGORIES.map(({label,emoji,color,border})=>{
              const active = sportFilter===label;
              return (
                <div key={label} onClick={()=>setSportFilter(active?null:label)}
                  style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
                  <div style={{
                    width:64,height:64,borderRadius:"50%",
                    background:active?border:`#1a2e1f`,
                    border:`2px solid ${active?border:C.border}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:28,
                    boxShadow:active?`0 0 14px ${border}66`:"none",
                    transition:"all 0.18s"}}>
                    {emoji}
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:active?C.text:C.textDim,whiteSpace:"nowrap"}}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Right Now */}
        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:16}}>⚡ Available Right Now</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:C.green,display:"inline-block",boxShadow:`0 0 6px ${C.green}`}}/>
              <span style={{color:C.green,fontSize:12,fontWeight:600}}>Live</span>
            </div>
          </div>
          <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4}}>
            {availableNow.length === 0 && (
              <div style={{color:C.textMuted,fontSize:13,padding:"16px 0"}}>
                No {sportFilter||""} arenas available right now
              </div>
            )}
            {availableNow.map(a=>(
              <div key={a.id} onClick={()=>onArena(a)}
                style={{flexShrink:0,width:160,background:C.card,borderRadius:16,overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`}}>
                <div style={{position:"relative",height:90,overflow:"hidden"}}>
                  <img src={a.img} alt={a.name} style={{width:"100%",height:"100%",objectFit:"cover"}}
                    onError={e=>{e.target.style.display="none";}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent,rgba(10,19,13,0.7))"}}/>
                  <div style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,0.6)",borderRadius:50,padding:"2px 7px",display:"flex",alignItems:"center",gap:3}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:C.green,display:"inline-block"}}/>
                    <span style={{fontSize:9,fontWeight:700,color:C.green}}>OPEN</span>
                  </div>
                </div>
                <div style={{padding:"8px 10px"}}>
                  <div style={{fontWeight:700,fontSize:12,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{a.name}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{color:C.green,fontWeight:800,fontSize:13}}>${a.price}<span style={{color:C.textMuted,fontWeight:400,fontSize:10}}>/hr</span></div>
                    {a.courts&&<span style={{fontSize:9,color:C.textMuted,fontWeight:600}}>{a.courts.filter(c=>c.status==="available").length} courts</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deals & Offers */}
        <div style={{marginBottom:22}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:12}}>💰 Deals & Offers</div>
          {/* Filter pills */}
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
            {["All",...SPORT_CATEGORIES.map(s=>s.label)].map(f=>(
              <button key={f} onClick={()=>setDealFilter(f)}
                style={{padding:"6px 14px",borderRadius:50,border:`1px solid ${dealFilter===f?C.green:C.border}`,
                  background:dealFilter===f?"rgba(34,228,85,0.1)":"#0f1f13",
                  color:dealFilter===f?C.green:C.textDim,
                  fontWeight:700,fontSize:11,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                {f}
              </button>
            ))}
          </div>
          {DEALS.filter(d=>dealFilter==="All"||d.sport===dealFilter).length===0&&(
            <div style={{textAlign:"center",padding:"24px 0",color:C.textMuted}}>
              <div style={{fontSize:28,marginBottom:6}}>🏷️</div>
              <div style={{fontWeight:700,fontSize:13}}>No {dealFilter} deals right now</div>
              <div style={{fontSize:11,marginTop:3}}>Check back soon for new offers</div>
            </div>
          )}
          {DEALS.filter(d=>dealFilter==="All"||d.sport===dealFilter).map((d,i)=>{
            const arenaObj = ARENAS.find(a=>a.name===d.arena)||ARENAS[0];
            return (
            <div key={i} onClick={()=>onDeal(d, arenaObj)}
              style={{background:C.card,borderRadius:16,padding:"14px",marginBottom:10,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
              <div style={{width:46,height:46,borderRadius:12,background:"rgba(34,228,85,0.1)",border:`1px solid ${C.green}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:20}}>{SPORT_CATEGORIES.find(s=>s.label===d.sport)?.emoji||"🏟️"}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13}}>{d.arena}</div>
                <div style={{color:C.textMuted,fontSize:11,marginTop:1}}>{d.time}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                  <span style={{color:C.green,fontWeight:800,fontSize:14}}>${d.price}/hr</span>
                  <span style={{color:C.textMuted,fontSize:11,textDecoration:"line-through"}}>${d.original}</span>
                </div>
              </div>
              <div style={{background:C.green,borderRadius:8,padding:"5px 10px",flexShrink:0}}>
                <span style={{fontWeight:900,fontSize:12,color:"#000"}}>{d.discount}</span>
              </div>
            </div>
            );
          })}
        </div>

        {/* Events & Tournaments */}
        <div style={{marginBottom:8}}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:12}}>🏆 Events & Tournaments</div>
          {EVENTS.map((ev,i)=>{
            const isReg = registeredEvents.includes(ev.title);
            const spotsLeft = isReg ? ev.spots - 1 : ev.spots;
            const filled = ev.total - spotsLeft;
            return (
            <div key={i} style={{background:C.card,borderRadius:16,padding:"14px",marginBottom:10,
              border:`1px solid ${isReg?C.green+"55":C.border}`,
              transition:"border 0.2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontSize:16}}>{ev.sport}</span>
                    <span style={{fontWeight:800,fontSize:13}}>{ev.title}</span>
                  </div>
                  <div style={{color:C.textMuted,fontSize:12}}>{ev.arena}</div>
                </div>
                <div style={{background:"rgba(34,228,85,0.08)",border:`1px solid ${C.green}33`,borderRadius:8,padding:"4px 9px",flexShrink:0,marginLeft:8}}>
                  <span style={{color:C.green,fontWeight:700,fontSize:11}}>{ev.date}</span>
                </div>
              </div>
              {isReg&&(
                <div style={{background:"rgba(34,228,85,0.07)",border:`1px solid ${C.green}33`,borderRadius:8,padding:"6px 10px",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                  <span style={{color:C.green,fontSize:12}}>✓</span>
                  <span style={{color:C.green,fontWeight:700,fontSize:12}}>You're registered!</span>
                  <span style={{color:C.textMuted,fontSize:11,marginLeft:"auto"}}>Check My Bookings</span>
                </div>
              )}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{flex:1,marginRight:10}}>
                  <div style={{height:5,borderRadius:50,background:"#1a2e1f",overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:50,background:isReg?C.green:"#4caf50",width:`${(filled/ev.total)*100}%`,transition:"width 0.4s"}}/>
                  </div>
                  <div style={{color:C.textMuted,fontSize:11,marginTop:4}}>
                    {spotsLeft>0
                      ? <><span style={{color:C.orange,fontWeight:700}}>{spotsLeft} spot{spotsLeft!==1?"s":""} left</span> of {ev.total}</>
                      : <span style={{color:C.red,fontWeight:700}}>Full</span>
                    }
                  </div>
                </div>
                <button
                  onClick={()=>{ if(!isReg && spotsLeft>0) onRegister(ev.title); }}
                  style={{padding:"7px 16px",borderRadius:50,border:"none",fontWeight:700,fontSize:12,
                    flexShrink:0,cursor:isReg||spotsLeft===0?"default":"pointer",
                    background:isReg?"#1a2e1f":spotsLeft===0?"#1a1a1a":C.green,
                    color:isReg?C.green:spotsLeft===0?C.textMuted:"#000",
                    border:isReg?`1px solid ${C.green}44`:"none"}}>
                  {isReg?"Registered ✓":spotsLeft===0?"Full":"Register"}
                </button>
              </div>
            </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
