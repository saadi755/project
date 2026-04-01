const TIME_SLOTS = {
  "Early Morning": ["12:00-01:00 AM", "01:00-02:00 AM", "02:00-03:00 AM", "03:00-04:00 AM", "04:00-05:00 AM", "05:00-06:00 AM"],
  Morning:        ["06:00-07:00 AM", "07:00-08:00 AM", "08:00-09:00 AM", "09:00-10:00 AM", "10:00-11:00 AM", "11:00-12:00 PM"],
  Afternoon:      ["12:00-01:00 PM", "01:00-02:00 PM", "02:00-03:00 PM", "03:00-04:00 PM", "04:00-05:00 PM", "05:00-06:00 PM"],
  Evening:        ["06:00-07:00 PM", "07:00-08:00 PM", "08:00-09:00 PM", "09:00-10:00 PM", "10:00-11:00 PM", "11:00-12:00 AM"],
};
const BOOKED = ["09:00-10:00 AM", "06:00-07:00 PM"];

const slotInDeal = (sl, deal) => {
  // If deal specifies exact slots, match those only
  if(deal.slots) return deal.slots.includes(sl);
  // If deal specifies sections only (no exact slots), match whole section
  if(deal.sections) {
    for(const [sec, slots] of Object.entries(TIME_SLOTS)){
      if(deal.sections.includes(sec) && slots.includes(sl)) return true;
    }
  }
  return false;
};

// Get the active deal price for a specific slot at a specific arena
const getDealForSlot = (arenaName, sl, sport) => {
  const deal = DEALS.find(d =>
    d.arena === arenaName &&
    slotInDeal(sl, d) &&
    (!sport || !d.sport || d.sport.toUpperCase() === sport.toUpperCase())
  );
  return deal || null;
};

const DEALS = [
  // Elite Sports Complex: 30% OFF Early Morning (all 12–6 AM slots)
  {
    arena: "Elite Sports Complex",
    sport: "Football",
    discount: "30% OFF",
    time: "Early Morning 12–6 AM",
    price: 18,
    original: 25,
    sections: ["Early Morning"],   // applies to entire Early Morning section
    slots: null,                   // null = use sections instead
  },
  // The Shuttle Hub: 20% OFF only 12–4 PM (NOT all afternoon)
  {
    arena: "The Shuttle Hub",
    sport: "Badminton",
    discount: "20% OFF",
    time: "12:00 PM – 4:00 PM",
    price: 12,
    original: 15,
    sections: null,                // null = use exact slots instead
    slots: ["12:00-01:00 PM","01:00-02:00 PM","02:00-03:00 PM","03:00-04:00 PM"],
  },
  // Padel Point Arena: 15% OFF Weekday Mornings (all Morning section)
  {
    arena: "Padel Point Arena",
    sport: "Padel",
    discount: "15% OFF",
    time: "Weekday Mornings",
    price: 34,
    original: 40,
    sections: ["Morning"],
    slots: null,
  },
];

