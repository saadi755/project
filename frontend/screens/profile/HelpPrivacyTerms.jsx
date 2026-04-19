const FAQ_ITEMS = [
  {q:"How do I cancel a booking?",       a:"Go to My Bookings, tap 'Cancel Booking' on any confirmed booking, then confirm. Refunds are processed in 3–5 business days."},
  {q:"Can I reschedule my booking?",     a:"Currently rescheduling is not supported. Please cancel and re-book your preferred slot."},
  {q:"How does multi-hour booking work?",a:"On the time slot screen, tap consecutive slots to extend your session. The total price updates automatically."},
  {q:"What is the refund policy?",       a:"Full refunds are issued for cancellations made at least 2 hours before your slot. Late cancellations are non-refundable."},
  {q:"How do I contact an arena?",       a:"Open the arena detail page and use the phone/contact button to reach the venue directly."},
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{background:C.card,borderRadius:14,marginBottom:10,border:`1px solid ${C.border}`,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
        <span style={{fontWeight:700,fontSize:13,flex:1,paddingRight:8}}>{q}</span>
        <span style={{color:C.green,fontSize:18,fontWeight:300,flexShrink:0}}>{open?"−":"+"}</span>
      </div>
      {open&&<div style={{padding:"0 16px 14px",color:C.textDim,fontSize:13,lineHeight:1.6,borderTop:`1px solid ${C.border}`}}>{a}</div>}
    </div>
  );
};

const HelpScreen = ({ onBack }) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><Icon n="back" color={C.text} size={22}/></button>
      <span style={{fontWeight:800,fontSize:17}}>Help & Support</span>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
      {FAQ_ITEMS.map((item,i)=><FaqItem key={i} {...item}/>)}
      <div style={{marginTop:16,background:C.card,borderRadius:14,padding:"16px",border:`1px solid ${C.border}`,textAlign:"center"}}>
        <div style={{fontSize:24,marginBottom:8}}>📬</div>
        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>Still need help?</div>
        <div style={{color:C.textMuted,fontSize:12,marginBottom:12}}>Our support team is available 24/7</div>
        <button style={{padding:"10px 24px",borderRadius:50,background:C.green,border:"none",fontWeight:700,fontSize:13,cursor:"pointer",color:"#000"}}>Contact Support</button>
      </div>
    </div>
  </div>
);

  if(subScreen==="help") return <HelpScreen onBack={()=>setSubScreen(null)}/>;

  if(subScreen==="privacy"||subScreen==="terms") return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setSubScreen(null)} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><Icon n="back" color={C.text} size={22}/></button>
        <span style={{fontWeight:800,fontSize:17}}>{subScreen==="privacy"?"Privacy Policy":"Terms of Service"}</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>
        {subScreen==="privacy"?(<>
          <p style={{color:C.textDim,fontSize:13,lineHeight:1.7,marginBottom:16}}>BookMyCourt ("we", "our", "us") is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
          {[["Data We Collect","We collect your name, email, phone number, location, and booking history to provide our services."],
            ["How We Use It","Your data is used to process bookings, send notifications, and improve the app experience. We never sell your data."],
            ["Data Security","All data is encrypted in transit and at rest. We use industry-standard security protocols."],
            ["Your Rights","You may request deletion of your account and all associated data at any time by contacting support."],
          ].map(([h,b])=>(
            <div key={h} style={{marginBottom:16}}>
              <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>{h}</div>
              <p style={{color:C.textDim,fontSize:13,lineHeight:1.7,margin:0}}>{b}</p>
            </div>
          ))}
        </>):(<>
          <p style={{color:C.textDim,fontSize:13,lineHeight:1.7,marginBottom:16}}>By using BookMyCourt, you agree to the following terms and conditions.</p>
          {[["Bookings","All bookings are subject to arena availability. Confirmed bookings are binding and subject to our cancellation policy."],
            ["Payments","Payments are processed securely. By booking, you authorize BookMyCourt to charge your selected payment method."],
            ["Cancellations","Cancellations made at least 2 hours before the slot receive a full refund. Late cancellations are non-refundable."],
            ["User Conduct","Users must treat arena staff and facilities with respect. Misuse may result in account suspension."],
          ].map(([h,b])=>(
            <div key={h} style={{marginBottom:16}}>
              <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>{h}</div>
              <p style={{color:C.textDim,fontSize:13,lineHeight:1.7,margin:0}}>{b}</p>
            </div>
          ))}
        </>)}
        <p style={{color:C.textMuted,fontSize:11,marginTop:8}}>Last updated: March 2026</p>
      </div>
    </div>
  );

