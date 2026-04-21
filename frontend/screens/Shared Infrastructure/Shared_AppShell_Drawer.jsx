const Owner = ({ onLogout, courts, setCourts, ownerArenas, setOwnerArenas, selectedArenaId, setSelectedArenaId }) => {
  const [tab, setTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifSettings, setNotifSettings] = useState({newBooking:true,cancellation:true,payment:true,reminder:false});
  const [savedMsg, setSavedMsg] = useState("");
  const [editingCourt, setEditingCourt] = useState(null);
  const [editTemp, setEditTemp] = useState(null);
  const [bookingFilter, setBookingFilter] = useState("all");

  // Current arena derived from selectedArenaId
  const arena = ownerArenas.find(a=>a.id===selectedArenaId)||ownerArenas[0];

  // Helpers to update the selected arena's data immutably
  const updateArena = (changes) => setOwnerArenas(prev=>prev.map(a=>a.id===arena.id?{...a,...changes}:a));
  const updateCourts = (fn) => {
    const updated = fn(arena.courts);
    updateArena({courts:updated});
    if(arena.id===ownerArenas[0].id) setCourts(updated); // keep player side in sync for Vanguard
  };
  const updateBookings = (fn) => updateArena({bookings:fn(arena.bookings)});

  // Switch arena — reset tab to home
  const switchArena = (id) => {
    setSelectedArenaId(id);
    setTab("home");
    setDrawerOpen(false);
    setBookingFilter("all");
    // Sync player-side courts if switching to Vanguard
    const a = ownerArenas.find(x=>x.id===id);
    if(a && id===ownerArenas[0].id) setCourts(a.courts);
  };

  const statusColor = {confirmed:C.green,completed:C.textMuted,cancelled:C.red,available:C.green,maintenance:C.orange,booked:"#3ab8cf"};

  const todayBookings = arena.bookings.filter(b=>b.date==="Wed, Mar 11");
  const confirmedToday = todayBookings.filter(b=>b.status==="confirmed").length;
  const totalRevenue = arena.bookings.filter(b=>b.status==="completed").reduce((s,b)=>s+b.amt,0);
  const pendingCount = arena.bookings.filter(b=>b.status==="confirmed").length;
  const filteredBookings = bookingFilter==="all" ? arena.bookings : arena.bookings.filter(b=>b.status===bookingFilter);
  const openCourtsCount = arena.courts.filter(c=>c.visible&&c.status==="available").length;

  const saveCourtEdit = () => {
    updateCourts(prev=>prev.map(c=>c.id===editingCourt?{...c,...editTemp}:c));
    setSavedMsg("Court updated!");
    setTimeout(()=>{setSavedMsg("");setEditingCourt(null);setEditTemp(null);},1000);
  };

  const ownerTabs = [
    {k:"home",    i:"home",   l:"HOME"},
    {k:"bookings",i:"cal",    l:"BOOKINGS"},
    {k:"courts",  i:"grid",   l:"COURTS"},
    {k:"settings",i:"cog",    l:"SETTINGS"},
  ];

  // ── SIDE DRAWER ──────────────────────────────────────────────
  const Drawer = () => (
    <div style={{position:"absolute",inset:0,zIndex:200,display:"flex"}}>
      {/* Overlay */}
      <div onClick={()=>setDrawerOpen(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)"}}/>
      {/* Panel */}
      <div style={{position:"relative",width:"78%",maxWidth:300,background:"#0a1a0e",height:"100%",display:"flex",flexDirection:"column",borderRight:`1px solid ${C.border}`,zIndex:1}}>
        {/* Owner profile */}
        <div style={{padding:"20px 18px 14px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon n="user" color="#000" size={20}/>
            </div>
            <div>
              <div style={{fontWeight:800,fontSize:15}}>Alex Johnson</div>
              <div style={{color:C.textMuted,fontSize:12}}>Arena Owner</div>
            </div>
          </div>
          <div style={{marginTop:10,padding:"6px 10px",borderRadius:8,background:"rgba(34,228,85,0.08)",border:`1px solid ${C.green}33`,display:"inline-flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:10,fontWeight:700,color:C.green}}>⚡ {ownerArenas.length} ARENAS MANAGED</span>
          </div>
        </div>

        {/* Arena list */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 0"}}>
          <div style={{padding:"6px 18px 8px",fontSize:11,fontWeight:700,color:C.textMuted,letterSpacing:1}}>MY ARENAS</div>
          {ownerArenas.map(a=>{
            const isSelected = a.id===selectedArenaId;
            const aOpenCount = a.courts.filter(c=>c.visible&&c.status==="available").length;
            return (
              <div key={a.id} onClick={()=>switchArena(a.id)}
                style={{padding:"12px 18px",cursor:"pointer",
                  background:isSelected?"rgba(34,228,85,0.08)":"transparent",
                  borderLeft:`3px solid ${isSelected?C.green:"transparent"}`,
                  transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:isSelected?800:600,fontSize:14,color:isSelected?C.text:C.textDim}}>{a.name}</div>
                    <div style={{color:C.textMuted,fontSize:11,marginTop:2}}>{a.location}</div>
                    <div style={{color:C.textMuted,fontSize:11,marginTop:1}}>{a.sport}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0,marginLeft:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:a.open&&aOpenCount>0?C.green:C.red}}/>
                      <span style={{fontSize:10,fontWeight:700,color:a.open&&aOpenCount>0?C.green:C.red}}>{a.open&&aOpenCount>0?"OPEN":"CLOSED"}</span>
                    </div>
                    <span style={{fontSize:10,color:C.textMuted}}>{a.courts.length} courts</span>
                  </div>
                </div>
                {isSelected&&(
                  <div style={{marginTop:8,display:"flex",gap:6}}>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:50,background:`${C.green}22`,color:C.green,fontWeight:700}}>{aOpenCount} available</span>
                    <span style={{fontSize:10,padding:"2px 8px",borderRadius:50,background:`${C.orange}22`,color:C.orange,fontWeight:700}}>{a.bookings.filter(b=>b.status==="confirmed").length} pending</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sign out */}
        <div style={{padding:"12px 18px 24px",borderTop:`1px solid ${C.border}`,flexShrink:0}}>
          <button onClick={onLogout}
            style={{width:"100%",padding:"11px",borderRadius:50,background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",color:C.red,fontWeight:700,fontSize:13,cursor:"pointer"}}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  // ── HOME TAB ─────────────────────────────────────────────────

  const renderTab = () => {
    if(tab==="home")     return <HomeTab/>;
    if(tab==="bookings") return <BookingsTab/>;
    if(tab==="courts")   return <CourtsTab/>;
    if(tab==="settings") return <SettingsTab/>;
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",position:"relative"}}>
      {drawerOpen && <Drawer/>}

      {/* Header */}
      <div style={{padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div onClick={()=>setDrawerOpen(true)} style={{cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:8,background:"#1a2e1f"}}>
            <Icon n="menu" color={C.text} size={18}/>
          </div>
          <div>
            <div style={{fontWeight:800,fontSize:14}}>{arena.name}</div>
            <div style={{color:C.green,fontSize:9,fontWeight:700,letterSpacing:1}}>OWNER DASHBOARD</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:openCourtsCount>0?C.green:C.red,boxShadow:openCourtsCount>0?`0 0 6px ${C.green}`:undefined}}/>
          <span style={{fontSize:11,color:openCourtsCount>0?C.green:C.red,fontWeight:700}}>{openCourtsCount>0?`${openCourtsCount} OPEN`:"CLOSED"}</span>
        </div>
      </div>

      {renderTab()}

      <Nav active={tab} onNav={setTab} tabs={ownerTabs}/>
    </div>
  );
};




export default function App() {
  const [user,setUser]=useState(null);
  const [screen,setScreen]=useState("home");
  const [tab,setTab]=useState("home");
  const [arena,setArena]=useState(null);
  const [slot,setSlot]=useState(null);
  const [activeDeal,setActiveDeal]=useState(null);

  // Global bookings state — shared between Confirmed and Bookings
  const [bookings,setBookings]=useState([
    {id:"#BMC-88291",arena:"Elite Sports Arena",court:"Court 4",date:"Thu, Oct 24, 2023",time:"06:00-07:00 PM",status:"upcoming",amt:45},
    {id:"#BMC-88185",arena:"Padel Point Arena",court:"Court 1",date:"Sat, Oct 21, 2023",time:"08:00-09:00 AM",status:"completed",amt:40},
    {id:"#BMC-88012",arena:"The Shuttle Hub",court:"Court 2",date:"Mon, Oct 16, 2023",time:"07:00-08:00 PM",status:"cancelled",amt:15},
  ]);

  // Global event registrations state
  const [registeredEvents,setRegisteredEvents]=useState([]);

  // Owner arenas state — for multi-arena dashboard
  const [ownerArenas, setOwnerArenas] = useState(OWNER_ARENAS);
  const [selectedArenaId, setSelectedArenaId] = useState(OWNER_ARENAS[0].id);
  const [courts, setCourts] = useState(OWNER_ARENAS[0].courts);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {id:"n1", type:"deal",     read:false, time:"2h ago",  msg:"30% OFF Early Morning slots at Elite Sports Complex today!"},
    {id:"n2", type:"reminder", read:false, time:"3h ago",  msg:"Your booking at Padel Point Arena starts in 1 hour."},
    {id:"n3", type:"event",    read:true,  time:"1d ago",  msg:"5-a-Side Football Tournament starts tomorrow. You're registered!"},
    {id:"n4", type:"review",   read:true,  time:"2d ago",  msg:"How was your session at The Shuttle Hub? Leave a review."},
  ]);
  const addNotification = (type, msg) => setNotifications(prev=>[{id:"n"+Date.now(),type,read:false,time:"Just now",msg},...prev]);
  const markAllRead = () => setNotifications(prev=>prev.map(n=>({...n,read:true})));
  const markRead = (id) => setNotifications(prev=>prev.map(n=>n.id===id?{...n,read:true}:n));
  const deleteNotif = (id) => setNotifications(prev=>prev.filter(n=>n.id!==id));
  const unreadCount = notifications.filter(n=>!n.read).length;

  // Arenas state — lifted so ratings can be updated from reviews
  const [arenas, setArenas] = useState(ARENAS);

  const submitReview = (arenaName, stars, comment) => {
    setArenas(prev => prev.map(a => {
      if(a.name !== arenaName) return a;
      const newCount = (a.reviewCount || 50) + 1;
      const newRating = Math.round(((a.rating * (newCount - 1)) + stars) / newCount * 10) / 10;
      return { ...a, rating: newRating, reviewCount: newCount };
    }));
  };

  const addBooking = (newBooking) => {
    setBookings(prev=>[newBooking,...prev]);
    addNotification("booking", `✅ Booking confirmed at ${newBooking.arena} · ${newBooking.time}`);
  };
  const registerEvent = (eventTitle) => {
    if(registeredEvents.includes(eventTitle)) return;
    setRegisteredEvents(prev=>[...prev, eventTitle]);
    const ev = EVENTS.find(e=>e.title===eventTitle);
    if(!ev) return;
    const newId = "#EVT-" + Math.floor(10000+Math.random()*90000);
    setBookings(prev=>[{
      id: newId,
      arena: ev.arena,
      court: "Event",
      date: ev.date,
      time: "TBD",
      status: "upcoming",
      amt: 0,
      isEvent: true,
      eventTitle: ev.title,
      sport: ev.sport,
    }, ...prev]);
    addNotification("event", `🏆 You're registered for ${ev.title} on ${ev.date}!`);
  };

  const logout=()=>{setUser(null);setScreen("home");setTab("home");setActiveDeal(null);};
  if(!user) return <div style={{background:C.bg,color:C.text,height:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}><Login onLogin={(userData)=>setUser(userData)}/></div>;
  if(user?.role==="owner") return <div style={{background:C.bg,color:C.text,height:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}><Owner onLogout={logout} courts={courts} setCourts={setCourts} ownerArenas={ownerArenas} setOwnerArenas={setOwnerArenas} selectedArenaId={selectedArenaId} setSelectedArenaId={setSelectedArenaId}/></div>;
  const showNav=!["detail","slots","confirmed"].includes(screen);
  const renderScreen=()=>{
    if(screen==="detail"&&arena) return <Detail arena={arena} activeDeal={activeDeal} courts={courts} arenas={arenas} onBack={()=>{setScreen("home");setActiveDeal(null);}} onBook={a=>{setArena(a);setScreen("slots");}}/>;
    if(screen==="slots"&&arena) return <Slots arena={arena} activeDeal={activeDeal} courts={courts} onBack={()=>setScreen("detail")} onConfirm={(a,sl,hrs,tot,deal,sav,courtName)=>{setSlot({label:sl,hours:hrs,total:tot,deal,savings:sav||0,courtName});setScreen("confirmed");}}/>;
    if(screen==="confirmed") return <Confirmed arena={arena} slot={slot} onHome={()=>{setScreen("home");setTab("home");}} onBookings={()=>{setScreen("home");setTab("bookings");}} onAddBooking={addBooking}/>;
    if(tab==="bookings") return <Bookings bookings={bookings} setBookings={setBookings} registeredEvents={registeredEvents} setRegisteredEvents={setRegisteredEvents} onReview={submitReview}/>;
    if(tab==="discover") return <Discover onArena={a=>{setActiveDeal(null);setArena(a);setScreen("detail");}} onDeal={(deal,a)=>{setActiveDeal(deal);setArena(a);setScreen("detail");}} onRegister={registerEvent} registeredEvents={registeredEvents} arenas={arenas}/>;
    if(tab==="profile") return <Profile onLogout={logout} user={user}/>;
    return <Home onArena={a=>{setArena(a);setScreen("detail");}} courts={courts} arenas={arenas} notifications={notifications} unreadCount={unreadCount} onMarkAllRead={markAllRead} onMarkRead={markRead} onDeleteNotif={deleteNotif}/>;
  };
  return (
    <div style={{background:C.bg,color:C.text,height:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>{renderScreen()}</div>
      {showNav&&<Nav active={tab} onNav={t=>{setTab(t);setScreen("home");}} tabs={[{k:"home",i:"home",l:"HOME"},{k:"bookings",i:"cal",l:"BOOKINGS"},{k:"discover",i:"compass",l:"DISCOVER"},{k:"profile",i:"user",l:"PROFILE"}]}/>}
    </div>
  );
}
