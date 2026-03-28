const EVENTS = [
  {title:"5-a-Side Football Tournament", date:"Sat, Mar 15", arena:"Elite Sports Complex", spots:4,  total:16, sport:"⚽"},
  {title:"Padel Doubles Open",           date:"Sun, Mar 16", arena:"Padel Point Arena",    spots:2,  total:8,  sport:"🎾"},
  {title:"Badminton League — Round 3",   date:"Fri, Mar 21", arena:"The Shuttle Hub",      spots:6,  total:12, sport:"🏸"},
];

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
