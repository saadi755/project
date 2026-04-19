  const BookingsTab = () => {
    const [confirmCancel, setConfirmCancel] = useState(null);
    const toCancel = arena.bookings.find(b=>b.id===confirmCancel);
    return (
      <div style={{flex:1,overflowY:"auto",padding:"0 16px 10px",position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 style={{fontWeight:900,fontSize:20,margin:0}}>All Bookings</h2>
          <span style={{color:C.textMuted,fontSize:12}}>{filteredBookings.length} bookings</span>
        </div>
        <div style={{display:"flex",gap:7,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {["all","confirmed","completed","cancelled"].map(f=>(
            <button key={f} onClick={()=>setBookingFilter(f)}
              style={{padding:"6px 14px",borderRadius:50,border:`1px solid ${bookingFilter===f?C.green:C.border}`,
                background:bookingFilter===f?"rgba(34,228,85,0.1)":"#0f1f13",
                color:bookingFilter===f?C.green:C.textDim,fontWeight:700,fontSize:11,cursor:"pointer",flexShrink:0,textTransform:"capitalize"}}>
              {f==="all"?"All":f}
            </button>
          ))}
        </div>
        {filteredBookings.map(b=>(
          <div key={b.id} style={{background:C.card,borderRadius:14,padding:"12px",marginBottom:10,border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div>
                <div style={{fontWeight:800,fontSize:14}}>{b.court} — {b.sport}</div>
                <div style={{color:C.textMuted,fontSize:11}}>📅 {b.date} · 🕐 {b.time}</div>
              </div>
              <span style={{padding:"2px 9px",borderRadius:50,background:`${statusColor[b.status]}22`,color:statusColor[b.status],fontSize:10,fontWeight:800,textTransform:"uppercase",height:"fit-content"}}>{b.status}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:8,borderTop:`1px solid ${C.border}`}}>
              <div>
                <div style={{fontSize:12,fontWeight:600}}>{b.by}</div>
                {b.phone&&<div style={{fontSize:11,color:C.textMuted}}>{b.phone}</div>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontWeight:800,color:b.status==="cancelled"?C.textMuted:C.green,textDecoration:b.status==="cancelled"?"line-through":"none",fontSize:14}}>${b.amt}</span>
                {b.status==="confirmed"&&(
                  <button onClick={()=>setConfirmCancel(b.id)}
                    style={{padding:"4px 10px",borderRadius:50,background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",color:C.red,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
            <div style={{marginTop:5}}><span style={{color:C.textMuted,fontSize:10}}>{b.id}</span></div>
          </div>
        ))}
        {confirmCancel&&toCancel&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setConfirmCancel(null)}>
            <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:430,margin:"0 auto",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
              <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>
              <h3 style={{textAlign:"center",fontWeight:900,fontSize:18,marginBottom:6}}>Cancel this booking?</h3>
              <p style={{textAlign:"center",color:C.textDim,fontSize:13,marginBottom:16}}><span style={{color:C.text,fontWeight:700}}>{toCancel.by}</span> — {toCancel.court} on {toCancel.date}</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setConfirmCancel(null)} style={{flex:1,padding:"13px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>Keep</button>
                <button onClick={()=>{updateBookings(prev=>prev.map(b=>b.id===confirmCancel?{...b,status:"cancelled"}:b));setConfirmCancel(null);}}
                  style={{flex:1,padding:"13px",borderRadius:50,background:"rgba(232,64,64,0.15)",border:"1px solid rgba(232,64,64,0.4)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
