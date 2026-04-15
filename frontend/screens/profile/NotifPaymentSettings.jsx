  if(subScreen==="notifs") return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setSubScreen(null)} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><Icon n="back" color={C.text} size={22}/></button>
        <span style={{fontWeight:800,fontSize:17}}>Notification Settings</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <p style={{color:C.textMuted,fontSize:13,marginBottom:18}}>Choose what notifications you receive.</p>
        {[
          {k:"bookingReminders", label:"Booking Reminders", desc:"Get reminded 1 hour before your slot"},
          {k:"cancellations",    label:"Cancellation Alerts", desc:"Notify me when a booking is cancelled"},
          {k:"promotions",       label:"Promotions & Offers", desc:"Deals, discounts and special events"},
          {k:"newArenas",        label:"New Arenas Nearby", desc:"When a new arena opens in your city"},
        ].map(({k,label,desc})=>(
          <div key={k} style={{background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1,paddingRight:12}}>
              <div style={{fontWeight:700,fontSize:14}}>{label}</div>
              <div style={{color:C.textMuted,fontSize:12,marginTop:2}}>{desc}</div>
            </div>
            <div onClick={()=>setNotifs(p=>({...p,[k]:!p[k]}))}
              style={{width:46,height:26,borderRadius:50,background:notifs[k]?C.green:"#1a2e1f",cursor:"pointer",position:"relative",flexShrink:0,transition:"background 0.2s"}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:notifs[k]?23:3,transition:"left 0.2s"}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if(subScreen==="payment") return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setSubScreen(null)} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><Icon n="back" color={C.text} size={22}/></button>
        <span style={{fontWeight:800,fontSize:17}}>Payment Methods</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <p style={{color:C.textMuted,fontSize:13,marginBottom:16}}>Manage your saved payment methods.</p>
        {cards.map(card=>(
          <div key={card.id} onClick={()=>setActiveCard(activeCard===card.id?null:card.id)}
            style={{background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:10,border:`1px solid ${activeCard===card.id?C.green:C.border}`,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{card.type}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{card.label} •••• {card.last4}</div>
                  <div style={{color:C.textMuted,fontSize:12}}>Expires {card.expiry}</div>
                </div>
              </div>
              {activeCard===card.id
                ? <span style={{color:C.green,fontSize:12,fontWeight:700}}>✓ Default</span>
                : <Icon n="arr" color={C.textMuted} size={16}/>}
            </div>
          </div>
        ))}
        <button style={{width:"100%",padding:"14px",borderRadius:14,background:"#0f1f13",border:`2px dashed ${C.border}`,color:C.textMuted,fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>
          + Add New Card
        </button>
        <div style={{marginTop:20,padding:"14px",borderRadius:14,background:"rgba(34,228,85,0.05)",border:`1px solid ${C.green}33`}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>💡 Secure Payments</div>
          <div style={{color:C.textMuted,fontSize:12,lineHeight:1.5}}>All transactions are encrypted and secured. Your card details are never stored on our servers.</div>
        </div>
      </div>
    </div>
  );

