const Detail = ({ arena:a, activeDeal, courts, onBack, onBook, arenas }) => {
  const isVanguard = a.id === 4;
  const openCourts = isVanguard && courts ? courts.filter(c=>c.visible&&c.status==="available") : null;
  const allClosed = isVanguard && openCourts && openCourts.length === 0;
  const topRatedId = (arenas||ARENAS).reduce((best,x)=>x.rating>best.rating?x:best,(arenas||ARENAS)[0])?.id;
  return (
  <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{position:"relative"}}>
        <ArenaImg src={a.img} alt={a.name} height={240} sport={a.sports[0]}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 30%,rgba(10,19,13,0.97) 100%)"}}/>
        <button onClick={onBack} style={{position:"absolute",top:16,left:14,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.55)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon n="back" color={C.text} size={18}/>
        </button>
        <button style={{position:"absolute",top:16,right:14,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.55)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon n="share" color={C.text} size={16}/>
        </button>
        {a.id===topRatedId&&(
          <div style={{position:"absolute",bottom:62,left:14,
            background:"linear-gradient(90deg,rgba(10,19,13,0.92),rgba(10,19,13,0.7))",
            backdropFilter:"blur(8px)",
            border:`1px solid ${C.green}66`,
            borderRadius:50,padding:"5px 13px",display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:15}}>⭐</span>
            <div>
              <div style={{fontSize:11,fontWeight:900,color:C.green,letterSpacing:0.5,lineHeight:1.2}}>TOP RATED</div>
              <div style={{fontSize:9,color:C.textMuted,fontWeight:600}}>Highest rated arena</div>
            </div>
          </div>
        )}
        <div style={{position:"absolute",bottom:10,left:14}}>
          <h1 style={{fontSize:24,fontWeight:900,margin:0}}>{a.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}>
            <Icon n="star" color={C.green} size={12}/><span style={{color:C.green,fontWeight:700,fontSize:12}}>{a.rating} (120+ reviews)</span>
          </div>
        </div>
      </div>
      <div style={{padding:"16px 16px 80px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}>
              <Icon n="pin" color={C.green} size={12}/><span style={{color:C.green,fontSize:12,fontWeight:600}}>{a.location}</span>
            </div>
            <span style={{color:C.textDim,fontSize:12}}>Open {a.hours}</span>
          </div>
          <div style={{background:C.green,borderRadius:11,padding:"8px 13px",textAlign:"center"}}>
            <div style={{fontWeight:900,fontSize:19,color:"#000",lineHeight:1}}>${a.price}</div>
            <div style={{fontSize:9,fontWeight:700,color:"#005010"}}>PER HOUR</div>
          </div>
        </div>
        <div style={{borderRadius:12,background:"#1a2e1f",height:80,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,border:`1px solid ${C.border}`}}>
          <div style={{textAlign:"center",color:C.textMuted}}><Icon n="pin" size={20} color={C.textMuted}/><div style={{fontSize:11,marginTop:3}}>View on Maps</div></div>
        </div>
        <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>About the Court</div>
        <p style={{color:C.textDim,lineHeight:1.6,fontSize:13,marginBottom:16}}>{a.description}</p>
        <div style={{fontWeight:800,fontSize:15,marginBottom:10}}>Amenities</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {a.amenities.map(am=><Amenity key={am} type={am}/>)}
        </div>
      </div>
    </div>
    <div style={{padding:"12px 16px 20px",background:C.bg,borderTop:`1px solid ${C.border}`,flexShrink:0}}>
      {isVanguard&&openCourts&&(
        <div style={{marginBottom:8,fontSize:12,color:allClosed?C.red:"rgba(34,228,85,0.8)",fontWeight:600}}>
          {allClosed?"🚫 All courts currently unavailable":`✅ ${openCourts.length} court${openCourts.length!==1?"s":""} available`}
        </div>
      )}
      {activeDeal&&activeDeal.arena===a.name&&(
        <div style={{background:"rgba(34,228,85,0.08)",border:`1px solid ${C.green}44`,borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <span style={{color:C.green,fontWeight:800,fontSize:13}}>🏷️ {activeDeal.discount} Deal Applied</span>
            <div style={{color:C.textMuted,fontSize:11,marginTop:1}}>{activeDeal.time}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:900,fontSize:16,color:C.green}}>${activeDeal.price}<span style={{fontSize:10,fontWeight:400}}>/hr</span></div>
            <div style={{color:C.textMuted,fontSize:10,textDecoration:"line-through"}}>${activeDeal.original}/hr</div>
          </div>
        </div>
      )}
      <Btn onClick={()=>!allClosed&&onBook(a)} style={{opacity:allClosed?0.45:1,cursor:allClosed?"not-allowed":"pointer"}}>{allClosed?"No Courts Available":"Check Availability 📅"}</Btn>
    </div>
  </div>
);
};

