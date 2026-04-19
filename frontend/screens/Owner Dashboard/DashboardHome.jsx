  const HomeTab = () => (
    <div style={{flex:1,overflowY:"auto",padding:"0 16px 10px"}}>
      <div style={{marginBottom:16}}>
        <h1 style={{fontWeight:900,fontSize:22,margin:"0 0 2px"}}>Welcome back, Alex 👋</h1>
        <p style={{color:C.textMuted,fontSize:12,margin:0}}>{arena.name}</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        {[
          ["Today's Bookings",confirmedToday,"+2 vs yesterday",C.green,"cal"],
          ["Pending",          pendingCount,  "Needs attention",C.orange,"ticket"],
        ].map(([l,v,sub,cc,ic])=>(
          <div key={l} style={{background:C.card,borderRadius:14,padding:"13px",border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <Icon n={ic} color={C.textMuted} size={17}/>
              <span style={{color:cc,fontSize:10,fontWeight:700}}>{sub}</span>
            </div>
            <div style={{color:C.textMuted,fontSize:12}}>{l}</div>
            <div style={{fontWeight:900,fontSize:26}}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{background:C.green,borderRadius:16,padding:"14px 16px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:12,color:"#005010",fontWeight:600}}>Total Revenue (All Time)</div>
          <div style={{fontWeight:900,fontSize:28,color:"#000"}}>${totalRevenue.toLocaleString()}.00</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:10,color:"#005010",fontWeight:600}}>COURTS</div>
          <div style={{fontWeight:800,fontSize:18,color:"#000"}}>{arena.courts.length}</div>
        </div>
      </div>

      {/* Per-court visibility */}
      <div style={{background:C.card,borderRadius:14,padding:"12px 14px",marginBottom:18,border:`1px solid ${C.border}`}}>
        <div style={{fontWeight:800,fontSize:14,marginBottom:6}}>Court Visibility</div>
        <div style={{color:C.textMuted,fontSize:11,marginBottom:10}}>Toggle which courts players can book</div>
        {arena.courts.map(c=>{
          const canToggle = c.status!=="maintenance";
          const isVisible = c.visible && c.status!=="maintenance";
          return (
            <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:7,marginBottom:7,borderBottom:`1px solid ${C.border}`}}>
              <div>
                <span style={{fontWeight:700,fontSize:13}}>{c.name}</span>
                <span style={{color:C.textMuted,fontSize:11,marginLeft:6}}>{c.sport}</span>
                {c.status==="maintenance"&&<span style={{color:C.orange,fontSize:10,fontWeight:700,marginLeft:6}}>· MAINTENANCE</span>}
                
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {!canToggle&&<span style={{color:C.textMuted,fontSize:10}}>locked</span>}
                <div onClick={()=>canToggle&&updateCourts(prev=>prev.map(x=>x.id===c.id?{...x,visible:!x.visible}:x))}
                  style={{width:42,height:22,borderRadius:50,background:isVisible?C.green:"#1a2e1f",cursor:canToggle?"pointer":"not-allowed",position:"relative",transition:"background 0.2s",opacity:canToggle?1:0.5}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:isVisible?23:3,transition:"left 0.2s"}}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Court status grid */}
      <div style={{fontWeight:800,fontSize:15,marginBottom:10}}>Court Status</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18}}>
        {arena.courts.map(c=>(
          <div key={c.id} style={{background:C.card,borderRadius:12,padding:"10px 12px",border:`1px solid ${statusColor[c.status]}44`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <span style={{fontWeight:700,fontSize:13}}>{c.name}</span>
              <span style={{width:8,height:8,borderRadius:"50%",background:statusColor[c.status],display:"inline-block"}}/>
            </div>
            <div style={{color:C.textMuted,fontSize:11}}>{c.sport}</div>
            <div style={{color:statusColor[c.status],fontSize:10,fontWeight:700,marginTop:3,textTransform:"uppercase"}}>{c.status}</div>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontWeight:800,fontSize:15}}>Today's Schedule</span>
        <span onClick={()=>setTab("bookings")} style={{color:C.green,fontSize:12,cursor:"pointer"}}>View All →</span>
      </div>
      {todayBookings.length===0
        ? <div style={{textAlign:"center",padding:"24px",color:C.textMuted,fontSize:13}}>No bookings today</div>
        : todayBookings.map((s,i)=>(
          <div key={i} style={{background:C.card,borderRadius:14,padding:"12px",marginBottom:9,border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontWeight:800,fontSize:13}}>{s.court} — {s.sport}</span>
              <span style={{color:statusColor[s.status],fontWeight:700,fontSize:12}}>{s.time}</span>
            </div>
            <div style={{color:C.textMuted,fontSize:11,marginBottom:6}}>Booked by <span style={{color:C.text,fontWeight:600}}>{s.by}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {s.phone ? <div style={{display:"flex",alignItems:"center",gap:4}}><Icon n="phone" color={C.textMuted} size={11}/><span style={{color:C.textMuted,fontSize:11}}>{s.phone}</span></div> : <span/>}
              <span style={{padding:"2px 8px",borderRadius:50,background:`${statusColor[s.status]}22`,color:statusColor[s.status],fontSize:10,fontWeight:800,textTransform:"uppercase"}}>{s.status}</span>
            </div>
          </div>
        ))
      }
    </div>
  );
