  const SettingsTab = () => {
    const [ownerName,setOwnerName]=useState("Alex Johnson");
    const [editingProfile,setEditingProfile]=useState(false);
    const [tempName,setTempName]=useState(ownerName);
    const [tempArenaName,setTempArenaName]=useState(arena.name);
    const [savedProfile,setSavedProfile]=useState(false);

    const saveProfile=()=>{
      setOwnerName(tempName);
      updateArena({name:tempArenaName});
      setSavedProfile(true);setEditingProfile(false);
      setTimeout(()=>setSavedProfile(false),1500);
    };

    return (
      <div style={{flex:1,overflowY:"auto",padding:"0 16px 10px"}}>
        <h2 style={{fontWeight:900,fontSize:20,marginBottom:14}}>Settings</h2>
        <div style={{color:C.textMuted,fontSize:12,marginBottom:14}}>Managing: <span style={{color:C.text,fontWeight:700}}>{arena.name}</span></div>
        {savedProfile&&<div style={{textAlign:"center",color:C.green,fontWeight:700,fontSize:13,marginBottom:10}}>✓ Saved!</div>}

        <div style={{background:C.card,borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontWeight:800,fontSize:15}}>Owner Profile</span>
            <button onClick={()=>{setEditingProfile(!editingProfile);setTempName(ownerName);setTempArenaName(arena.name);}}
              style={{background:"none",border:`1px solid ${C.border}`,color:C.textMuted,fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:50,cursor:"pointer"}}>
              {editingProfile?"Cancel":"Edit"}
            </button>
          </div>
          {editingProfile?(<>
            {[["Owner Name",tempName,setTempName],["Arena Name",tempArenaName,setTempArenaName]].map(([l,v,set])=>(
              <div key={l} style={{marginBottom:10}}>
                <div style={{fontSize:12,color:C.textMuted,marginBottom:4}}>{l}</div>
                <input value={v} onChange={e=>set(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:50,background:"#0a130d",border:`1px solid ${C.border}`,color:C.text,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
              </div>
            ))}
            <button onClick={saveProfile} style={{width:"100%",padding:"12px",borderRadius:50,background:C.green,border:"none",color:"#000",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>Save Profile</button>
          </>):(
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon n="user" color="#000" size={22}/></div>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{ownerName}</div>
                <div style={{color:C.textMuted,fontSize:12}}>{arena.name}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{background:C.card,borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>Notifications</div>
          {[{k:"newBooking",label:"New Booking",desc:"Alert when a booking is made"},{k:"cancellation",label:"Cancellations",desc:"Alert when a booking is cancelled"},{k:"payment",label:"Payment Received",desc:"Alert on successful payment"},{k:"reminder",label:"Daily Summary",desc:"Morning summary of today's schedule"}].map(({k,label,desc})=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:10,marginBottom:10,borderBottom:`1px solid ${C.border}`}}>
              <div><div style={{fontWeight:600,fontSize:13}}>{label}</div><div style={{color:C.textMuted,fontSize:11}}>{desc}</div></div>
              <div onClick={()=>setNotifSettings(p=>({...p,[k]:!p[k]}))} style={{width:42,height:24,borderRadius:50,background:notifSettings[k]?C.green:"#1a2e1f",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:notifSettings[k]?21:3,transition:"left 0.2s"}}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:"rgba(232,64,64,0.05)",borderRadius:16,padding:"16px",border:"1px solid rgba(232,64,64,0.2)"}}>
          <div style={{fontWeight:800,fontSize:15,color:C.red,marginBottom:4}}>Account</div>
          <div style={{color:C.textMuted,fontSize:12,marginBottom:14}}>Sign out of the owner dashboard</div>
          <button onClick={onLogout} style={{width:"100%",padding:"13px",borderRadius:50,background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer"}}>Sign Out</button>
        </div>
      </div>
    );
  };
