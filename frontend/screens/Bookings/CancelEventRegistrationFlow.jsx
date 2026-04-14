  const [cancellingEventId, setCancellingEventId] = useState(null);

  const toEventCancel = bookings.find(b=>b.id===cancellingEventId);

  const doCancelEvent = () => {
    setBookings(prev=>prev.filter(b=>b.id!==cancellingEventId));
    setRegisteredEvents(prev=>prev.filter(e=>e!==toEventCancel?.eventTitle));
    setCancellingEventId(null);
  };

      {/* Event Cancel Confirmation Modal */}
      {cancellingEventId&&toEventCancel&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",zIndex:100}}
          onClick={()=>setCancellingEventId(null)}>
          <div onClick={e=>e.stopPropagation()}
            style={{width:"100%",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(232,64,64,0.12)",border:"2px solid rgba(232,64,64,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <span style={{fontSize:24}}>🏆</span>
            </div>
            <h3 style={{textAlign:"center",fontWeight:900,fontSize:20,marginBottom:6}}>Cancel Registration?</h3>
            <p style={{textAlign:"center",color:C.textDim,fontSize:13,lineHeight:1.5,marginBottom:20}}>
              Are you sure you want to withdraw from<br/>
              <span style={{color:C.text,fontWeight:700}}>{toEventCancel.eventTitle}</span>?
            </p>
            <div style={{background:"#0a130d",borderRadius:12,padding:"12px 14px",marginBottom:20,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:C.textMuted,fontSize:12}}>Event</span>
                <span style={{fontSize:12,fontWeight:600}}>{toEventCancel.eventTitle}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:C.textMuted,fontSize:12}}>Arena</span>
                <span style={{fontSize:12,fontWeight:600}}>{toEventCancel.arena}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:C.textMuted,fontSize:12}}>Date</span>
                <span style={{fontSize:12,fontWeight:600}}>{toEventCancel.date}</span>
              </div>
            </div>
            <p style={{textAlign:"center",fontSize:11,color:C.textMuted,marginBottom:18}}>
              ⓘ Your spot will be released and available to others
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setCancellingEventId(null)}
                style={{flex:1,padding:"14px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Keep Spot
              </button>
              <button onClick={doCancelEvent}
                style={{flex:1,padding:"14px",borderRadius:50,background:"rgba(232,64,64,0.15)",border:"1px solid rgba(232,64,64,0.4)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Yes, Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

