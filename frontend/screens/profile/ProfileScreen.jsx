const Profile = ({ onLogout, user }) => {
  const [subScreen, setSubScreen] = useState(null);
  const [notifs, setNotifs] = useState({bookingReminders:true, promotions:false, cancellations:true, newArenas:false});
  const [editData, setEditData] = useState({name: user?.name||"Player", email: user?.email||"", phone:"+92 300 1234567", city:"Lahore"});
  const [editTemp, setEditTemp] = useState({...editData});
  const [savedMsg, setSavedMsg] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {id:"visa", label:"Visa", last4:"4242", expiry:"08/27", type:"💳"},
    {id:"mc",   label:"Mastercard", last4:"8810", expiry:"12/26", type:"💳"},
  ];

  const saveEdit = () => {
    setEditData({...editTemp});
    setSavedMsg(true);
    setTimeout(()=>{setSavedMsg(false); setSubScreen(null);}, 1200);
  };

  const Input = ({label, val, onChange}) => (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:12,color:C.textMuted,marginBottom:5,fontWeight:600}}>{label}</div>
      <input value={val} onChange={e=>onChange(e.target.value)}
        style={{width:"100%",padding:"13px 16px",borderRadius:50,background:"#0a130d",border:`1px solid ${C.border}`,color:C.text,fontSize:14,boxSizing:"border-box",outline:"none"}}/>
    </div>
  );

  // ── Sub-screens ──────────────────────────────────────────────
  if(subScreen==="edit") return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setSubScreen(null)} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><Icon n="back" color={C.text} size={22}/></button>
        <span style={{fontWeight:800,fontSize:17}}>Edit Profile</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <div style={{position:"relative"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Icon n="user" color="#000" size={36}/>
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:C.green,border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <span style={{fontSize:12}}>✏️</span>
            </div>
          </div>
        </div>
        <Input label="Full Name" val={editTemp.name} onChange={v=>setEditTemp(p=>({...p,name:v}))}/>
        <Input label="Email Address" val={editTemp.email} onChange={v=>setEditTemp(p=>({...p,email:v}))}/>
        <Input label="Phone Number" val={editTemp.phone} onChange={v=>setEditTemp(p=>({...p,phone:v}))}/>
        <Input label="City" val={editTemp.city} onChange={v=>setEditTemp(p=>({...p,city:v}))}/>
      </div>
      <div style={{padding:"12px 16px 24px",flexShrink:0}}>
        {savedMsg && <div style={{textAlign:"center",color:C.green,fontSize:13,fontWeight:700,marginBottom:8}}>✓ Profile saved!</div>}
        <Btn onClick={saveEdit}>Save Changes</Btn>
      </div>
    </div>
  );

  const menuItems = [
    {label:"Edit Profile",          icon:"user",   sub:"edit"},
    {label:"Notification Settings", icon:"bell",   sub:"notifs"},
    {label:"Payment Methods",       icon:"ticket", sub:"payment"},
    {label:"Help & Support",        icon:"phone",  sub:"help"},
    {label:"Privacy Policy",        icon:"eye",    sub:"privacy"},
    {label:"Terms of Service",      icon:"menu",   sub:"terms"},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",position:"relative"}}>
      <div style={{overflowY:"auto",flex:1,padding:"18px 16px 8px"}}>
        {/* Header card */}
        <div style={{background:C.card,borderRadius:18,padding:"20px 16px",marginBottom:20,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:14}}>
          <div style={{position:"relative"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon n="user" color="#000" size={28}/>
            </div>
            <div style={{position:"absolute",bottom:0,right:0,width:20,height:20,borderRadius:"50%",background:"#1a2e1f",border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}
              onClick={()=>setSubScreen("edit")}>
              <span style={{fontSize:10}}>✏️</span>
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:900,fontSize:18}}>{editData.name}</div>
            <div style={{color:C.textMuted,fontSize:12,marginTop:2}}>{editData.email}</div>
            <div style={{color:C.textMuted,fontSize:12}}>{editData.phone}</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[["3","Bookings"],["2","Arenas"],["4.9","Rating"]].map(([v,l])=>(
            <div key={l} style={{background:C.card,borderRadius:14,padding:"12px",textAlign:"center",border:`1px solid ${C.border}`}}>
              <div style={{fontWeight:900,fontSize:20,color:C.green}}>{v}</div>
              <div style={{color:C.textMuted,fontSize:11,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div style={{marginBottom:16}}>
          {menuItems.map(({label,icon,sub})=>(
            <div key={sub} onClick={()=>setSubScreen(sub)}
              style={{background:C.card,borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid ${C.border}`,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:"#1a2e1f",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Icon n={icon} color={C.green} size={16}/>
                </div>
                <span style={{fontWeight:600,fontSize:14}}>{label}</span>
              </div>
              <Icon n="arr" color={C.textMuted} size={16}/>
            </div>
          ))}
        </div>

        <button onClick={()=>setShowLogoutModal(true)}
          style={{width:"100%",padding:"14px",borderRadius:50,background:"rgba(232,64,64,0.1)",border:"1px solid rgba(232,64,64,0.3)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:8}}>
          Sign Out
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",zIndex:100}}
          onClick={()=>setShowLogoutModal(false)}>
          <div onClick={e=>e.stopPropagation()}
            style={{width:"100%",background:"#0f1f13",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",border:`1px solid ${C.border}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>
            <h3 style={{textAlign:"center",fontWeight:900,fontSize:20,marginBottom:6}}>Sign Out?</h3>
            <p style={{textAlign:"center",color:C.textDim,fontSize:13,marginBottom:24}}>You'll need to sign in again to access your bookings.</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowLogoutModal(false)}
                style={{flex:1,padding:"14px",borderRadius:50,background:"#1a2e1f",border:`1px solid ${C.border}`,color:C.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={onLogout}
                style={{flex:1,padding:"14px",borderRadius:50,background:"rgba(232,64,64,0.15)",border:"1px solid rgba(232,64,64,0.4)",color:C.red,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
