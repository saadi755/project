const Confirmed = ({ arena:a, slot, onHome, onBookings, onAddBooking }) => {
  const deal = slot?.deal;
  const savings = slot?.savings || 0;
  // Add this booking to global list once when screen mounts
  const [added, setAdded] = useState(false);
  if(!added && a && slot) {
    setAdded(true);
    const newId = "#BMC-" + Math.floor(10000 + Math.random()*90000);
    onAddBooking({
      id: newId,
      arena: a.name,
      court: slot.courtName || "Court " + (Math.floor(Math.random()*4)+1),
      date: "Thu, Oct 24, 2023",
      time: slot.label || "—",
      status: "upcoming",
      amt: slot.total || a.price,
      savings: savings,
    });
  }
  return (
  <div style={{display:"flex",flexDirection:"column",height:"100%",overflowY:"auto"}}>
    <div style={{padding:"16px 16px 0",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <button onClick={onHome} style={{width:34,height:34,borderRadius:"50%",background:"#1a2e1f",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Icon n="x" color={C.text} size={16}/>
      </button>
      <span style={{fontWeight:800,fontSize:15}}>Booking Confirmed</span>
      <div style={{width:34}}/>
    </div>
    <div style={{flex:1,padding:"24px 20px 0",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:76,height:76,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:`0 0 36px ${C.green}55`}}>
        <Icon n="check" color="#000" size={34}/>
      </div>
      <h2 style={{fontSize:24,fontWeight:900,marginBottom:6,textAlign:"center"}}>Reservation Successful!</h2>
      <p style={{color:C.textDim,textAlign:"center",lineHeight:1.5,marginBottom:20,maxWidth:260,fontSize:13}}>
        Your court at <span style={{color:C.green,fontWeight:700}}>BookMyCourt</span> has been reserved. Check your email for the receipt.
      </p>
      <div style={{width:"100%",background:"#0f1f13",borderRadius:16,padding:"16px",border:`1px solid ${C.border}`,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
          <div><div style={{color:C.textMuted,fontSize:10,fontWeight:600,letterSpacing:0.5}}>BOOKING ID</div><div style={{fontWeight:900,fontSize:18}}>#BMC-88291</div></div>
          <div style={{width:34,height:34,borderRadius:9,background:"#1a2e1f",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon n="ticket" color={C.green} size={16}/></div>
        </div>
        {[["pin","Arena & Court",`${a.name} — ${slot?.courtName||"Court 4"}`],["cal","Date","Thursday, Oct 24, 2023"],["sun","Time Slot",slot?.label||slot||"06:00 PM - 07:00 PM"],["ticket","Duration",`${slot?.hours||1} hr${(slot?.hours||1)>1?"s":""} · $${slot?.total||a.price}.00`],...(savings>0?[["star","Deal Savings",`You saved $${savings}.00! 🎉`]]:[])].map(([ic,lb,vl])=>(
          <div key={lb} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:"#1a2e1f",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon n={ic} color={C.green} size={14}/></div>
            <div><div style={{color:C.textMuted,fontSize:10}}>{lb}</div><div style={{fontWeight:700,fontSize:13}}>{vl}</div></div>
          </div>
        ))}
      </div>
    </div>
    <div style={{padding:"0 20px 24px",flexShrink:0}}>
      <Btn onClick={onBookings} style={{marginBottom:10}}>View My Bookings</Btn>
      <Btn onClick={onHome} style={{background:"#0f1f13",border:`1px solid ${C.border}`,color:C.text}}>Go to Home</Btn>
      <p style={{textAlign:"center",fontSize:11,color:C.textMuted,marginTop:10}}>ⓘ CANCEL AT LEAST 2 HOURS BEFORE THE SLOT FOR FULL REFUND</p>
    </div>
  </div>
);
};
const RatingModal = ({ booking, onClose, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if(stars === 0) return;
    onSubmit(booking.arena, stars, comment);
    setSubmitted(true);
    setTimeout(onClose, 1400);
  };

  const labels = ["","Terrible","Poor","Decent","Great","Excellent"];

  return (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",zIndex:100}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{width:"100%",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
        <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>

        {submitted ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>⭐</div>
            <div style={{fontWeight:900,fontSize:20,marginBottom:6}}>Thanks for your review!</div>
            <div style={{color:C.textMuted,fontSize:13}}>Your rating helps other players find great arenas.</div>
          </div>
        ) : (
          <>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontWeight:900,fontSize:19,marginBottom:4}}>Rate your experience</div>
              <div style={{color:C.textMuted,fontSize:13}}>{booking.arena}</div>
              <div style={{color:C.textDim,fontSize:12,marginTop:2}}>📅 {booking.date} · {booking.time}</div>
            </div>

            {/* Star picker */}
            <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:8}}>
              {[1,2,3,4,5].map(n=>(
                <div key={n}
                  onMouseEnter={()=>setHovered(n)}
                  onMouseLeave={()=>setHovered(0)}
                  onClick={()=>setStars(n)}
                  style={{fontSize:36,cursor:"pointer",transition:"transform 0.1s",
                    transform:(hovered||stars)>=n?"scale(1.15)":"scale(1)",
                    filter:(hovered||stars)>=n?"none":"grayscale(1) opacity(0.4)"}}>
                  ⭐
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",fontWeight:700,fontSize:14,color:C.green,marginBottom:16,minHeight:20}}>
              {labels[hovered||stars]||"Tap to rate"}
            </div>

            {/* Comment box */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:6}}>
                Review <span style={{fontWeight:400}}>(optional)</span>
              </div>
              <textarea
                value={comment}
                onChange={e=>setComment(e.target.value)}
                placeholder="What did you like or dislike? Any tips for other players..."
                rows={3}
                style={{width:"100%",padding:"12px 14px",borderRadius:14,background:"#0a130d",
                  border:`1px solid ${C.border}`,color:C.text,fontSize:13,resize:"none",
                  boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.5}}
              />
            </div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={onClose}
                style={{flex:1,padding:"13px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Skip
              </button>
              <button onClick={handleSubmit}
                style={{flex:2,padding:"13px",borderRadius:50,
                  background:stars>0?C.green:"#1a2e1f",
                  border:`1px solid ${stars>0?C.green:C.border}`,
                  color:stars>0?"#000":C.textMuted,
                  fontWeight:700,fontSize:14,cursor:stars>0?"pointer":"not-allowed",
                  transition:"all 0.2s"}}>
                Submit Review {stars>0?`(${stars}★)`:""}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

