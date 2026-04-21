  const CourtsTab = () => (
    <div style={{flex:1,overflowY:"auto",padding:"0 16px 10px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h2 style={{fontWeight:900,fontSize:20,margin:0}}>Courts</h2>
        <span style={{color:C.textMuted,fontSize:12}}>{arena.name}</span>
      </div>
      {savedMsg&&<div style={{textAlign:"center",color:C.green,fontWeight:700,fontSize:13,marginBottom:10}}>✓ {savedMsg}</div>}
      {arena.courts.map(c=>(
        <div key={c.id} style={{background:C.card,borderRadius:16,padding:"14px",marginBottom:12,border:`1px solid ${statusColor[c.status]}44`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div>
              <div style={{fontWeight:800,fontSize:16}}>{c.name}</div>
              <div style={{color:C.textMuted,fontSize:12}}>{c.sport}</div>
            </div>
            <span style={{padding:"3px 10px",borderRadius:50,background:`${statusColor[c.status]}22`,color:statusColor[c.status],fontSize:10,fontWeight:800,textTransform:"uppercase"}}>{c.status}</span>
          </div>
          <div style={{display:"flex",gap:12,fontSize:12,color:C.textDim,marginBottom:10}}>
            <span>👥 {c.capacity}</span><span>💰 ${c.price}/hr</span>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {c.amenities.map(am=>(<span key={am} style={{padding:"3px 9px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.textDim,fontSize:10,fontWeight:600}}>{am}</span>))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:8,borderTop:`1px solid ${C.border}`,marginBottom:10}}>
            <div>
              <span style={{fontWeight:700,fontSize:13}}>Visible to Players</span>
              <span style={{color:C.textMuted,fontSize:11,marginLeft:6}}>{c.status==="maintenance"?"(hidden)":c.visible?"Bookable":"Hidden"}</span>
            </div>
            <div onClick={()=>c.status!=="booked"&&updateCourts(prev=>prev.map(x=>x.id===c.id?{...x,visible:!x.visible}:x))}
              style={{width:42,height:22,borderRadius:50,background:c.visible&&c.status!=="maintenance"?C.green:"#1a2e1f",cursor:c.status!=="booked"?"pointer":"not-allowed",position:"relative",transition:"background 0.2s",opacity:1}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:c.visible&&c.status!=="maintenance"?23:3,transition:"left 0.2s"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setEditingCourt(c.id);setEditTemp({name:c.name,sport:c.sport,price:c.price,capacity:c.capacity});}}
              style={{flex:1,padding:"9px",borderRadius:10,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:12,cursor:"pointer"}}>✏️ Edit</button>
            {c.status!=="booked"&&(
              <button onClick={()=>updateCourts(prev=>prev.map(x=>x.id===c.id?{...x,status:x.status==="available"?"maintenance":"available"}:x))}
                style={{flex:1,padding:"9px",borderRadius:10,background:c.status==="available"?"rgba(245,158,11,0.1)":"rgba(34,228,85,0.1)",border:`1px solid ${c.status==="available"?C.orange:C.green}44`,color:c.status==="available"?C.orange:C.green,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                {c.status==="available"?"🔧 Maintenance":"✅ Available"}
              </button>
            )}
            {false&&(
              <div/>
            )}
          </div>
        </div>
      ))}
      {editingCourt&&editTemp&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>{setEditingCourt(null);setEditTemp(null);}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:430,margin:"0 auto",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 16px"}}/>
            <h3 style={{fontWeight:900,fontSize:18,marginBottom:16}}>Edit Court</h3>
            {[["Court Name","name","text"],["Sport(s)","sport","text"],["Price/hr ($)","price","number"],["Capacity","capacity","number"]].map(([label,key,type])=>(
              <div key={key} style={{marginBottom:12}}>
                <div style={{fontSize:12,color:C.textMuted,marginBottom:4,fontWeight:600}}>{label}</div>
                <input type={type} value={editTemp[key]} onChange={e=>setEditTemp(p=>({...p,[key]:type==="number"?Number(e.target.value):e.target.value}))}
                  style={{width:"100%",padding:"11px 14px",borderRadius:50,background:"#0a130d",border:`1px solid ${C.border}`,color:C.text,fontSize:14,boxSizing:"border-box",outline:"none"}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:4}}>
              <button onClick={()=>{setEditingCourt(null);setEditTemp(null);}} style={{flex:1,padding:"13px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
              <button onClick={saveCourtEdit} style={{flex:1,padding:"13px",borderRadius:50,background:C.green,border:"none",color:"#000",fontWeight:700,fontSize:14,cursor:"pointer"}}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
