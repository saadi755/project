const Bookings = ({ bookings, setBookings, registeredEvents, setRegisteredEvents, onReview }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancelledId, setCancelledId] = useState(null);
  const [cancellingEventId, setCancellingEventId] = useState(null);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [ratedIds, setRatedIds] = useState(new Set());
  const sc = {upcoming:C.green, completed:C.textMuted, cancelled:C.red};
  const toCancel = bookings.find(b=>b.id===confirmingId);
  const toEventCancel = bookings.find(b=>b.id===cancellingEventId);

  const doCancel = () => {
    setBookings(prev=>prev.map(b=>b.id===confirmingId?{...b,status:"cancelled"}:b));
    setCancelledId(confirmingId);
    setConfirmingId(null);
  };

  const doCancelEvent = () => {
    setBookings(prev=>prev.filter(b=>b.id!==cancellingEventId));
    setRegisteredEvents(prev=>prev.filter(e=>e!==toEventCancel?.eventTitle));
    setCancellingEventId(null);
  };

  const upcoming  = bookings.filter(b=>b.status==="upcoming");
  const past      = bookings.filter(b=>b.status==="completed"||b.status==="cancelled");

  const shown = activeTab==="upcoming" ? upcoming : past;

  const TabBtn = ({id, label, count}) => (
    <button onClick={()=>setActiveTab(id)}
      style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,
        background:activeTab===id?C.green:"#0f1f13",
        color:activeTab===id?"#000":C.textMuted,
        position:"relative"}}>
      {label}
      {count>0&&(
        <span style={{marginLeft:5,background:activeTab===id?"rgba(0,0,0,0.2)":"#1a2e1f",
          color:activeTab===id?"#000":C.textDim,
          borderRadius:50,padding:"1px 7px",fontSize:11}}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div style={{padding:"18px 16px 0",display:"flex",flexDirection:"column",height:"100%",position:"relative"}}>
      <h2 style={{fontWeight:900,fontSize:21,marginBottom:12}}>My Bookings</h2>

      {/* Tabs */}
      <div style={{display:"flex",gap:8,marginBottom:14,background:"#0a130d",borderRadius:12,padding:4,flexShrink:0}}>
        <TabBtn id="upcoming" label="Upcoming" count={upcoming.length}/>
        <TabBtn id="past"     label="Past"     count={past.length}/>
      </div>

      <div style={{flex:1,overflowY:"auto"}}>
        {shown.length===0&&(
          <div style={{textAlign:"center",padding:"48px 20px",color:C.textMuted}}>
            <div style={{fontSize:36,marginBottom:12}}>{activeTab==="upcoming"?"📅":"🏁"}</div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>
              {activeTab==="upcoming"?"No upcoming bookings":"No past bookings"}
            </div>
            <div style={{fontSize:13}}>
              {activeTab==="upcoming"?"Book an arena to get started!":"Your completed bookings will appear here."}
            </div>
          </div>
        )}
        {shown.map(b=>(
          <div key={b.id} style={{background:C.card,borderRadius:15,padding:"13px",marginBottom:11,
            border:`1px solid ${b.id===cancelledId?"rgba(232,64,64,0.3)":b.isEvent?C.green+"33":C.border}`,transition:"border 0.3s"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div>
                {b.isEvent&&<div style={{fontSize:10,fontWeight:700,color:C.green,marginBottom:2,letterSpacing:0.5}}>🏆 EVENT REGISTRATION</div>}
                <div style={{fontWeight:800,fontSize:14}}>{b.isEvent?b.eventTitle:b.arena}</div>
                <div style={{color:C.textMuted,fontSize:11}}>{b.isEvent?b.arena:b.court}</div>
              </div>
              <span style={{padding:"2px 9px",borderRadius:50,
                background:`${sc[b.status]||C.textMuted}22`,
                color:sc[b.status]||C.textMuted,
                fontSize:10,fontWeight:800,textTransform:"uppercase",height:"fit-content"}}>
                {b.status}
              </span>
            </div>
            <div style={{display:"flex",gap:12,fontSize:11,color:C.textDim}}>
              <span>📅 {b.date}</span>
              <span>🕐 {b.time}</span>
              <span style={{marginLeft:"auto",fontWeight:800,
                color:b.status==="cancelled"?C.textMuted:b.isEvent?C.green:C.green,
                textDecoration:b.status==="cancelled"?"line-through":"none"}}>
                {b.isEvent?"Free":("$"+b.amt)}
              </span>
            </div>
            {b.savings>0&&(
              <div style={{marginTop:5,fontSize:11,color:"rgba(34,228,85,0.7)"}}>🏷️ Saved ${b.savings} with deal</div>
            )}
            <div style={{marginTop:9,paddingTop:9,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:C.textMuted,fontSize:10}}>{b.id}</span>
              {b.status==="completed"&&!b.isEvent&&(
                ratedIds.has(b.id)
                  ? <span style={{color:C.green,fontSize:11,fontWeight:700}}>⭐ Reviewed</span>
                  : <button onClick={()=>setRatingBooking(b)}
                      style={{background:"rgba(34,228,85,0.1)",border:`1px solid ${C.green}44`,
                        color:C.green,fontSize:11,fontWeight:700,cursor:"pointer",padding:"4px 12px",borderRadius:50}}>
                      ⭐ Rate
                    </button>
              )}
              {b.status==="upcoming"&&!b.isEvent&&(
                <button onClick={()=>setConfirmingId(b.id)}
                  style={{background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",
                    color:C.red,fontSize:11,fontWeight:700,cursor:"pointer",padding:"4px 12px",borderRadius:50}}>
                  Cancel
                </button>
              )}
              {b.status==="upcoming"&&b.isEvent&&(
                <button onClick={()=>setCancellingEventId(b.id)}
                  style={{background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",
                    color:C.red,fontSize:11,fontWeight:700,cursor:"pointer",padding:"4px 12px",borderRadius:50}}>
                  Cancel Registration
                </button>
              )}
              {b.id===cancelledId&&b.status==="cancelled"&&!b.isEvent&&(
                <span style={{color:C.textMuted,fontSize:11}}>✓ Refund processing</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rating Modal */}
      {ratingBooking&&(
        <RatingModal
          booking={ratingBooking}
          onClose={()=>setRatingBooking(null)}
          onSubmit={(arenaName,stars,comment)=>{
            onReview(arenaName,stars,comment);
            setRatedIds(prev=>new Set([...prev,ratingBooking.id]));
          }}
        />
      )}
    </div>
  );
};
