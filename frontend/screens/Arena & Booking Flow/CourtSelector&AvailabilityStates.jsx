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

            if(!selectedSlots.length||allCourtsUnavailable) return;
            const sportPart = selectedSport&&arenasSports.length>1 ? `${sportLabel(selectedSport)} · ` : "";
            const courtName = activeCourt ? `${sportPart}${activeCourt.name}` : selectedSport ? sportLabel(selectedSport) : null;
            onConfirm(a,slotLabel,hours,total,representativeDeal,savings,courtName);
          }}
          style={{opacity:selectedSlots.length>0&&!allCourtsUnavailable?1:0.45,
            cursor:selectedSlots.length>0&&!allCourtsUnavailable?"pointer":"not-allowed"}}>
