const Slots = ({ arena:a, activeDeal, courts, onBack, onConfirm }) => {
  // ── Date state ────────────────────────────────────────────────
  const TODAY = new Date(2026, 2, 12);
  const TOTAL_DAYS = 30;
  const allDates = Array.from({length:TOTAL_DAYS},(_,i)=>{ const d=new Date(TODAY); d.setDate(TODAY.getDate()+i); return d; });
  const DAY_LABELS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const windowStart = weekOffset * 5;
  const windowDates = allDates.slice(windowStart, windowStart + 5);
  const canGoBack    = weekOffset > 0;
  const canGoForward = windowStart + 5 < TOTAL_DAYS;
  const selectedDate = allDates[selectedDayIdx];
  const monthLabel   = MONTH_NAMES[selectedDate.getMonth()] + " " + selectedDate.getFullYear();

  const goBack = () => {
    const o = weekOffset-1; setWeekOffset(o);
    const ws = o*5;
    if(selectedDayIdx<ws||selectedDayIdx>=ws+5) setSelectedDayIdx(ws);
    setSelectedSlots([]);
  };
  const goForward = () => {
    const o = weekOffset+1; setWeekOffset(o);
    const ws = o*5;
    if(selectedDayIdx<ws||selectedDayIdx>=ws+5) setSelectedDayIdx(ws);
    setSelectedSlots([]);
  };

  const [selectedSlots, setSelectedSlots] = useState([]);

  // ── Sport & court selection (unified for ALL arenas) ──────────
  const sportEmoji = (sp) => ({FOOTBALL:"⚽",CRICKET:"🏏",PADEL:"🎾",BADMINTON:"🏸",BASKETBALL:"🏀",FUTSAL:"🥅",VOLLEYBALL:"🏐"}[sp]||"🏟️");
  const sportLabel = (sp) => sp.charAt(0)+sp.slice(1).toLowerCase();

  // For Vanguard use owner-managed courts; for others use arena.courts
  const isVanguard = a.id === 4;
  const allArenaCourts = isVanguard
    ? (courts || []).filter(c => c.visible && c.status !== "maintenance")
    : (a.courts || []).filter(c => c.status !== "maintenance");

  const arenasSports = a.sports ? a.sports.filter(s=>s!=="LOUNGE") : [];
  // Pre-select sport from activeDeal if coming from Discover, else default to first
  const initialSport = activeDeal?.sport
    ? arenasSports.find(s => s.toUpperCase() === activeDeal.sport.toUpperCase()) || arenasSports[0]
    : arenasSports[0];
  const [selectedSport, setSelectedSport] = useState(initialSport||null);

  // Courts filtered to selected sport
  const sportCourts = allArenaCourts.filter(c => {
    if(!selectedSport) return true;
    // match sport tag (uppercase) against court.sport (may be "BASKETBALL" or "Basketball")
    const cs = (c.sport||"").toUpperCase();
    return cs === selectedSport || cs.includes(selectedSport);
  });

  const [selectedCourt, setSelectedCourt] = useState(null);
  // Auto-pick first available court for selected sport
  const activeCourt = selectedCourt && sportCourts.find(c=>c.id===selectedCourt.id)
    ? selectedCourt
    : sportCourts[0] || null;

  // Booked slots for the active court on the selected date
  // (today = use real bookedSlots data; future dates = empty for demo)
  const courtBookedSlots = selectedDayIdx === 0 && activeCourt
    ? (activeCourt.bookedSlots || [])
    : [];

  const allCourtsUnavailable = sportCourts.length === 0;

  // ── Slot helpers ──────────────────────────────────────────────
  const icons = {"Early Morning":"moon", Morning:"sun", Afternoon:"sun", Evening:"moon"};
  const allSlots = Object.values(TIME_SLOTS).flat();

  const toggleSlot = (sl) => {
    if(courtBookedSlots.includes(sl)) return;
    setSelectedSlots(prev => {
      if(prev.includes(sl)){
        const next = prev.filter(s=>s!==sl);
        if(next.length===0) return [];
        const indices = next.map(s=>allSlots.indexOf(s)).sort((a,b)=>a-b);
        const cont = [indices[0]];
        for(let i=1;i<indices.length;i++){
          if(indices[i]===cont[cont.length-1]+1) cont.push(indices[i]); else break;
        }
        return cont.map(i=>allSlots[i]);
      } else {
        if(prev.length===0) return [sl];
        const ni = allSlots.indexOf(sl);
        const ei = prev.map(s=>allSlots.indexOf(s)).sort((a,b)=>a-b);
        const mn=ei[0], mx=ei[ei.length-1];
        if(ni===mn-1||ni===mx+1) return [...prev,sl].sort((a,b)=>allSlots.indexOf(a)-allSlots.indexOf(b));
        return [sl];
      }
    });
  };

  const priceOf = (sl) => { const d=getDealForSlot(a.name,sl,selectedSport); return d?d.price:a.price; };
  const hours         = selectedSlots.length;
  const total         = selectedSlots.reduce((s,sl)=>s+priceOf(sl),0);
  const originalTotal = hours*a.price;
  const savings       = originalTotal-total;
  const activeDealSlots = selectedSlots.filter(sl=>getDealForSlot(a.name,sl,selectedSport));
  const representativeDeal = activeDealSlots.length>0?getDealForSlot(a.name,activeDealSlots[0],selectedSport):null;
  const slotLabel = selectedSlots.length>0
    ? `${selectedSlots[0].split('-')[0]} – ${selectedSlots[selectedSlots.length-1].split('-')[1]}`
    : null;

  const sectionDeal = (sec,slots) => { const ds=slots.find(sl=>getDealForSlot(a.name,sl,selectedSport)); return ds?getDealForSlot(a.name,ds,selectedSport):null; };
  const arenaDeals = DEALS.filter(d =>
    d.arena === a.name &&
    (!selectedSport || !d.sport || d.sport.toUpperCase() === selectedSport.toUpperCase())
  );

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Header */}
      <div style={{padding:"16px 16px 10px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
          <Icon n="back" color={C.text} size={22}/>
        </button>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:17}}>Select Time Slots</div>
          <div style={{color:C.textMuted,fontSize:12}}>{a.name} · Tap multiple for longer sessions</div>
        </div>
      </div>

      {/* Deal banners */}
      {arenaDeals.map((d,i)=>(
        <div key={i} style={{margin:"0 16px 5px",padding:"8px 14px",borderRadius:11,background:"rgba(34,228,85,0.07)",border:`1px solid ${C.green}33`,flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:C.green,fontWeight:700,fontSize:12}}>🏷️ {d.discount} — {d.time}</span>
            <span style={{color:C.green,fontWeight:800,fontSize:12}}>${d.price}/hr</span>
          </div>
        </div>
      ))}

      {/* Sport selector — only shown when arena has multiple sports */}
      {arenasSports.length > 1 && (
        <div style={{margin:"4px 16px 0",flexShrink:0}}>
          <div style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:6}}>Select Sport</div>
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
            {arenasSports.map(sp=>(
              <button key={sp} onClick={()=>{setSelectedSport(sp);setSelectedCourt(null);setSelectedSlots([]);}}
                style={{padding:"7px 16px",borderRadius:50,
                  border:`1px solid ${selectedSport===sp?C.green:C.border}`,
                  background:selectedSport===sp?"rgba(34,228,85,0.1)":"#0f1f13",
                  color:selectedSport===sp?C.green:C.textDim,
                  fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,
                  display:"flex",alignItems:"center",gap:6}}>
                <span>{sportEmoji(sp)}</span><span>{sportLabel(sp)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Court selector */}
      <div style={{margin:"8px 16px 4px",flexShrink:0}}>
        {allCourtsUnavailable ? (
          <div style={{padding:"12px 14px",borderRadius:12,background:"rgba(232,64,64,0.08)",border:"1px solid rgba(232,64,64,0.25)",textAlign:"center"}}>
            <div style={{fontWeight:700,fontSize:13,color:C.red}}>
              🚫 {isVanguard ? "No courts available" : `All ${sportLabel(selectedSport)} courts under maintenance`}
            </div>
            <div style={{color:C.textMuted,fontSize:12,marginTop:3}}>Please check back later</div>
          </div>
        ) : (
          <>
            <div style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:6}}>
              Select Court
              <span style={{marginLeft:6,fontSize:10,color:C.textMuted}}>({sportCourts.length} available)</span>
            </div>
            <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:2}}>
              {sportCourts.map(c=>{
                const isActive = activeCourt?.id === c.id;
                return (
                  <button key={c.id} onClick={()=>{setSelectedCourt(c);setSelectedSlots([]);}}
                    style={{padding:"7px 14px",borderRadius:50,
                      border:`1px solid ${isActive?C.green:C.border}`,
                      background:isActive?"rgba(34,228,85,0.1)":"#0f1f13",
                      color:isActive?C.green:C.textDim,
                      fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}}>
                    {c.name}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Selected summary pill */}
      {selectedSlots.length > 0 && (
        <div style={{margin:"4px 16px 6px",padding:"10px 14px",borderRadius:12,background:"rgba(34,228,85,0.08)",border:`1px solid ${C.green}44`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <span style={{color:C.green,fontWeight:800,fontSize:13}}>{hours} hr{hours>1?"s":""} selected</span>
            <span style={{color:C.textDim,fontSize:12,marginLeft:8}}>{slotLabel}</span>
          </div>
          <button onClick={()=>setSelectedSlots([])} style={{background:"none",border:"none",cursor:"pointer",color:C.textMuted,fontSize:12,fontWeight:600}}>Clear</button>
        </div>
      )}

      {/* Slot grid */}
      <div style={{flex:1,overflowY:"auto",padding:"0 16px",opacity:allCourtsUnavailable?0.3:1,pointerEvents:allCourtsUnavailable?"none":"auto"}}>
        {/* Month + nav */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontWeight:800,fontSize:17}}>{monthLabel}</span>
          <div style={{display:"flex",gap:6}}>
            {[{fn:canGoBack?goBack:null,ic:"back",can:canGoBack},{fn:canGoForward?goForward:null,ic:"arr",can:canGoForward}].map(({fn,ic,can})=>(
              <div key={ic} onClick={fn||undefined}
                style={{width:30,height:30,borderRadius:"50%",background:can?"#1a2e1f":"#111",display:"flex",alignItems:"center",justifyContent:"center",cursor:can?"pointer":"not-allowed",opacity:can?1:0.3}}>
                <Icon n={ic} color={C.text} size={14}/>
              </div>
            ))}
          </div>
        </div>

        {/* 5-day strip */}
        <div style={{display:"flex",gap:7,marginBottom:20}}>
          {windowDates.map((date,i)=>{
            const gi = windowStart+i;
            const isSel = gi===selectedDayIdx;
            const isToday = gi===0;
            return (
              <button key={gi} onClick={()=>{setSelectedDayIdx(gi);setSelectedSlots([]);}}
                style={{flex:1,padding:"8px 0",borderRadius:11,border:"none",cursor:"pointer",
                  background:isSel?C.green:"#1a2e1f",color:isSel?"#000":C.text,textAlign:"center"}}>
                <div style={{fontSize:10,fontWeight:600}}>{DAY_LABELS[date.getDay()]}</div>
                <div style={{fontWeight:800,fontSize:16}}>{date.getDate()}</div>
                {isToday&&<div style={{fontSize:8,fontWeight:800,color:isSel?"#005010":C.green,marginTop:1}}>TODAY</div>}
                {!isToday&&isSel&&<div style={{width:4,height:4,borderRadius:"50%",background:"#000",margin:"2px auto 0"}}/>}
              </button>
            );
          })}
        </div>

        {/* Time sections */}
        {Object.entries(TIME_SLOTS).map(([sec,slots])=>{
          const secDeal = sectionDeal(sec,slots);
          const dealSlotCount = slots.filter(sl=>getDealForSlot(a.name,sl,selectedSport)).length;
          const isPartial = secDeal && dealSlotCount<slots.length;
          return (
            <div key={sec} style={{marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Icon n={icons[sec]} color={C.green} size={15}/>
                  <span style={{fontWeight:800,fontSize:15}}>{sec}</span>
                </div>
                {secDeal&&(
                  <span style={{background:"rgba(34,228,85,0.12)",border:`1px solid ${C.green}44`,color:C.green,fontSize:10,fontWeight:800,padding:"2px 9px",borderRadius:50}}>
                    {isPartial?"Partial deal":"All slots"} {secDeal.discount}
                  </span>
                )}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {slots.map(sl=>{
                  const bk  = courtBookedSlots.includes(sl);
                  const sel = selectedSlots.includes(sl);
                  const slDeal = getDealForSlot(a.name,sl,selectedSport);
                  const ei  = selectedSlots.map(s=>allSlots.indexOf(s)).sort((a,b)=>a-b);
                  const mn=ei[0], mx=ei[ei.length-1];
                  const idx = allSlots.indexOf(sl);
                  const isAdj = selectedSlots.length===0||sel||idx===mn-1||idx===mx+1;
                  const dimmed = !bk&&!sel&&!isAdj&&selectedSlots.length>0;
                  return (
                    <button key={sl} disabled={bk} onClick={()=>toggleSlot(sl)}
                      style={{padding:"12px",borderRadius:12,
                        border:sel?`2px solid ${C.green}`:slDeal&&!bk?`1px solid ${C.green}55`:`1px solid ${bk?"#1a2e1f":C.border}`,
                        background:sel?"rgba(34,228,85,0.1)":slDeal&&!bk?"rgba(34,228,85,0.05)":bk?"#0c1610":"#0f1f13",
                        cursor:bk?"not-allowed":"pointer",textAlign:"center",
                        opacity:dimmed?0.35:1,transition:"opacity 0.15s"}}>
                      <div style={{fontWeight:700,fontSize:12,color:bk?"#2a3e2f":C.text,textDecoration:bk?"line-through":"none"}}>{sl}</div>
                      <div style={{fontSize:11,fontWeight:600,marginTop:2,
                        color:sel?C.green:bk?"#2a3e2f":slDeal?"rgba(34,228,85,0.75)":C.textMuted}}>
                        {bk?"Booked":slDeal?`$${slDeal.price}/hr`:"Available"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{padding:"12px 16px 20px",background:C.bg,borderTop:`1px solid ${C.border}`,flexShrink:0}}>
        {/* Booking summary badge */}
        {(selectedSport||activeCourt) && (
          <div style={{marginBottom:8,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:C.textMuted}}>Booking:</span>
            {selectedSport&&arenasSports.length>1&&(
              <span style={{fontSize:11,fontWeight:700,color:C.green,background:"rgba(34,228,85,0.1)",padding:"2px 10px",borderRadius:50}}>
                {sportEmoji(selectedSport)} {sportLabel(selectedSport)}
              </span>
            )}
            {activeCourt&&(
              <span style={{fontSize:11,fontWeight:700,color:C.text,background:"#1a2e1f",padding:"2px 10px",borderRadius:50}}>
                {activeCourt.name}
              </span>
            )}
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div>
            <div style={{fontSize:11,color:C.textMuted}}>{hours>0?`${hours} hr${hours>1?"s":""}${savings>0?" · deal applied":""}`:""}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontWeight:900,fontSize:22,color:hours>0?C.text:C.textMuted}}>{hours>0?`$${total}.00`:"$0.00"}</div>
              {savings>0&&<div style={{fontSize:12,color:C.textMuted,textDecoration:"line-through"}}>${originalTotal}.00</div>}
            </div>
          </div>
          {savings>0&&(
            <div style={{background:"rgba(34,228,85,0.1)",border:`1px solid ${C.green}44`,borderRadius:10,padding:"6px 12px",textAlign:"center"}}>
              <div style={{color:C.green,fontWeight:900,fontSize:13}}>Save ${savings}</div>
              <div style={{color:"rgba(34,228,85,0.6)",fontSize:10}}>deal applied</div>
            </div>
          )}
        </div>
        <Btn
          onClick={()=>{
            if(!selectedSlots.length||allCourtsUnavailable) return;
            const sportPart = selectedSport&&arenasSports.length>1 ? `${sportLabel(selectedSport)} · ` : "";
            const courtName = activeCourt ? `${sportPart}${activeCourt.name}` : selectedSport ? sportLabel(selectedSport) : null;
            onConfirm(a,slotLabel,hours,total,representativeDeal,savings,courtName);
          }}
          style={{opacity:selectedSlots.length>0&&!allCourtsUnavailable?1:0.45,
            cursor:selectedSlots.length>0&&!allCourtsUnavailable?"pointer":"not-allowed"}}>
          {selectedSlots.length>0?`Book ${hours} hr${hours>1?"s":""} →`:"Select a time slot"}
        </Btn>
      </div>
    </div>
  );
};


