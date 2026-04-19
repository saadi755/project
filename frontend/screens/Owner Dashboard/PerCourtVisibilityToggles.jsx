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

            <div>
              <span style={{fontWeight:700,fontSize:13}}>Visible to Players</span>
              <span style={{color:C.textMuted,fontSize:11,marginLeft:6}}>{c.status==="maintenance"?"(hidden)":c.visible?"Bookable":"Hidden"}</span>
            </div>
            <div onClick={()=>c.status!=="booked"&&updateCourts(prev=>prev.map(x=>x.id===c.id?{...x,visible:!x.visible}:x))}
              style={{width:42,height:22,borderRadius:50,background:c.visible&&c.status!=="maintenance"?C.green:"#1a2e1f",cursor:c.status!=="booked"?"pointer":"not-allowed",position:"relative",transition:"background 0.2s",opacity:1}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:c.visible&&c.status!=="maintenance"?23:3,transition:"left 0.2s"}}/>
            </div>
          </div>
