  const toCancel = bookings.find(b=>b.id===confirmingId);
  const toEventCancel = bookings.find(b=>b.id===cancellingEventId);

  const doCancel = () => {
    setBookings(prev=>prev.map(b=>b.id===confirmingId?{...b,status:"cancelled"}:b));
    setCancelledId(confirmingId);
    setConfirmingId(null);

      {/* Cancel Confirmation Modal */}
      {confirmingId&&toCancel&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",zIndex:100}}
          onClick={()=>setConfirmingId(null)}>
          <div onClick={e=>e.stopPropagation()}
            style={{width:"100%",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(232,64,64,0.12)",border:"2px solid rgba(232,64,64,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <span style={{fontSize:24}}>⚠️</span>
            </div>
            <h3 style={{textAlign:"center",fontWeight:900,fontSize:20,marginBottom:6}}>Cancel Booking?</h3>
            <p style={{textAlign:"center",color:C.textDim,fontSize:13,lineHeight:1.5,marginBottom:20}}>
              Are you sure you want to cancel your booking at<br/>
              <span style={{color:C.text,fontWeight:700}}>{toCancel.arena}</span>?
            </p>
            <div style={{background:"#0a130d",borderRadius:12,padding:"12px 14px",marginBottom:20,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:C.textMuted,fontSize:12}}>Date & Time</span>
                <span style={{fontSize:12,fontWeight:600}}>{toCancel.date} · {toCancel.time}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:C.textMuted,fontSize:12}}>Booking ID</span>
                <span style={{fontSize:12,fontWeight:600}}>{toCancel.id}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${C.border}`}}>
                <span style={{color:C.textMuted,fontSize:12}}>Refund Amount</span>
                <span style={{fontSize:13,fontWeight:800,color:C.green}}>${toCancel.amt}.00</span>
              </div>
            </div>
            <p style={{textAlign:"center",fontSize:11,color:C.textMuted,marginBottom:18}}>
              ⓘ Refund will be processed within 3–5 business days
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmingId(null)}
                style={{flex:1,padding:"14px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Keep Booking
              </button>
              <button onClick={doCancel}
                style={{flex:1,padding:"14px",borderRadius:50,background:"rgba(232,64,64,0.15)",border:"1px solid rgba(232,64,64,0.4)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
