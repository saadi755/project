const SPORTS = ["All", "Cricket", "Football", "Padel", "Badminton", "Futsal", "Basketball"];

  const [sport,setSport]=useState("All");
  const [q,setQ]=useState("");
  const filtered=(arenas||ARENAS).filter(a=>{
    if(q!==""&&!a.name.toLowerCase().includes(q.toLowerCase())) return false;
    if(sport!=="All"&&!a.sports.some(s=>s.toLowerCase().includes(sport.toLowerCase()))) return false;
    if(a.id===4&&courts){
      const open=courts.filter(c=>c.visible&&c.status!=="maintenance");
      if(open.length===0) return false;
    }
    return true;
  });

      <div style={{padding:"0 18px 8px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#0f1f13",borderRadius:50,padding:"10px 16px",border:`1px solid ${C.border}`}}>
          <Icon n="search" color={C.textMuted} size={15}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search arenas or sports"
            style={{flex:1,background:"none",border:"none",color:C.text,fontSize:13,outline:"none"}}/>
        </div>
      </div>

        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontWeight:700,fontSize:15}}>Explore Sports</span>
          <span style={{color:C.green,fontSize:13,cursor:"pointer"}}>See all</span>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          {SPORTS.map(s=>(
            <button key={s} onClick={()=>setSport(s)}
              style={{padding:"6px 14px",borderRadius:50,border:"none",background:sport===s?C.green:"#1a2e1f",color:sport===s?"#000":C.text,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontSize:13}}>{s}</button>
          ))}
        </div>

        {filtered.length===0&&<div style={{textAlign:"center",color:C.textMuted,padding:"40px 0"}}>No arenas found.</div>}
        {filtered.map(a=>(
