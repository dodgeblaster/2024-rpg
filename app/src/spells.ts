const fireSpells: DamageAction[] = [
    {
      name: "Ember",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 20,
      element: "fire"
    },
    {
      name: "Fire Bolt",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 40,
      element: "fire"
    },
    {
      name: "Flame Burst",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 60,
      element: "fire"
    },
    {
      name: "Fireball",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 80,
      element: "fire"
    },
    {
      name: "Flamethrower",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 70,
      element: "fire"
    },
    {
      name: "Inferno",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 100,
      element: "fire"
    },
    {
      name: "Hellfire",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 150,
      element: "fire"
    },
    {
      name: "Phoenix Blaze",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 180,
      element: "fire"
    },
    {
      name: "Solar Flare",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 220,
      element: "fire"
    },
    {
      name: "Supernova",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 300,
      element: "fire"
    }
  ];

  const iceSpells: DamageAction[] = [
    {
      name: "Frost",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 20,
      element: "ice"
    },
    {
      name: "Ice Shard",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 40,
      element: "ice"
    },
    {
      name: "Freeze Ray",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 60,
      element: "ice"
    },
    {
      name: "Icicle Spear",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 80,
      element: "ice"
    },
    {
      name: "Blizzard",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 70,
      element: "ice"
    },
    {
      name: "Glacial Blast",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 100,
      element: "ice"
    },
    {
      name: "Arctic Wind",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 150,
      element: "ice"
    },
    {
      name: "Frozen Tempest",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 180,
      element: "ice"
    },
    {
      name: "Absolute Zero",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 220,
      element: "ice"
    },
    {
      name: "Ice Age",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 300,
      element: "ice"
    }
  ];
  
  const waterSpells: DamageAction[] = [
    {
      name: "Water Gun",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 20,
      element: "water"
    },
    {
      name: "Bubble Beam",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 40,
      element: "water"
    },
    {
      name: "Aqua Jet",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 60,
      element: "water"
    },
    {
      name: "Hydro Pump",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 80,
      element: "water"
    },
    {
      name: "Tidal Wave",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 70,
      element: "water"
    },
    {
      name: "Whirlpool",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 100,
      element: "water"
    },
    {
      name: "Tsunami",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 150,
      element: "water"
    },
    {
      name: "Abyssal Torrent",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 180,
      element: "water"
    },
    {
      name: "Maelstrom",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 220,
      element: "water"
    },
    {
      name: "Poseidon's Wrath",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 300,
      element: "water"
    }
  ];
  
  const lightningSpells: DamageAction[] = [
    {
      name: "Spark",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 20,
      element: "lightning"
    },
    {
      name: "Shock",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 40,
      element: "lightning"
    },
    {
      name: "Thunderbolt",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 60,
      element: "lightning"
    },
    {
      name: "Lightning Strike",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 80,
      element: "lightning"
    },
    {
      name: "Chain Lightning",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 70,
      element: "lightning"
    },
    {
      name: "Thunderstorm",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 100,
      element: "lightning"
    },
    {
      name: "Plasma Burst",
      target: "enemy:single",
      effect: "hp:subtract",
      strength: 150,
      element: "lightning"
    },
    {
      name: "Electric Tempest",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 180,
      element: "lightning"
    },
    {
      name: "Thor's Hammer",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 220,
      element: "lightning"
    },
    {
      name: "Divine Thunderbolt",
      target: "enemy:all",
      effect: "hp:subtract",
      strength: 300,
      element: "lightning"
    }
  ];