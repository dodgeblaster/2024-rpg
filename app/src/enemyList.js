const enemies = [
    {
      "name": "Fire Elemental",
      "maxHp": 300,
      "maxMp": 100,
      "speed": 15,
      "element": "fire",
      "enemyId": "fire_elemental",
      "actions": {
        "normal": [
          {
            "name": "Flame Burst",
            "effect": "hp:subtract",
            "target": "party:single",
            "strength": 50,
            "element": "fire",
            "weight": 2
          },
          {
            "name": "Searing Touch",
            "effect": "hp:subtract",
            "target": "party:single",
            "strength": 30,
            "element": "fire",
            "weight": 1
          }
        ],
        "phaseActions": [
          {
            "maxHp": 50,
            "minHp": 0,
            "name": "Inferno",
            "effect": "hp:subtract",
            "target": "party:all",
            "strength": 80,
            "element": "fire",
            "weight": 1
          }
        ]
      }
    },
    {
      "name": "Frost Giant",
      "maxHp": 500,
      "maxMp": 50,
      "speed": 8,
      "element": "ice",
      "enemyId": "frost_giant",
      "actions": {
        "normal": [
          {
            "name": "Ice Punch",
            "effect": "hp:subtract",
            "target": "party:single",
            "strength": 70,
            "element": "ice",
            "weight": 2
          },
          {
            "name": "Frost Breath",
            "effect": "hp:subtract",
            "target": "party:all",
            "strength": 40,
            "element": "ice",
            "weight": 1
          }
        ],
        "eventActions": [
          {
            "name": "Blizzard",
            "effect": "hp:subtract",
            "target": "party:all",
            "strength": 100,
            "element": "ice",
            "priority": 100,
            "event": "party:fire_spell"
          }
        ]
      }
    },
    {
      "name": "Thunder Hawk",
      "maxHp": 250,
      "maxMp": 150,
      "speed": 20,
      "element": "lightning",
      "enemyId": "thunder_hawk",
      "actions": {
        "normal": [
          {
            "name": "Lightning Strike",
            "effect": "hp:subtract",
            "target": "party:single",
            "strength": 60,
            "element": "lightning",
            "weight": 2
          },
          {
            "name": "Thunderclap",
            "effect": "status:add",
            "target": "party:all",
            "status": "paralysis",
            "duration": 2,
            "chance": 0.3,
            "weight": 1
          }
        ],
        "phaseActions": [
          {
            "maxHp": 30,
            "minHp": 0,
            "name": "Storm Fury",
            "effect": "hp:subtract",
            "target": "party:all",
            "strength": 90,
            "element": "lightning",
            "weight": 1
          }
        ]
      }
    },
    {
        "name": "Venomous Serpent",
        "maxHp": 200,
        "maxMp": 100,
        "speed": 18,
        "element": "none",
        "enemyId": "venomous_serpent",
        "actions": {
          "normal": [
            {
              "name": "Poison Fang",
              "effect": "hp:subtract",
              "target": "party:single",
              "strength": 40,
              "weight": 2
            },
            {
              "name": "Venom Spit",
              "effect": "status:add",
              "target": "party:single",
              "status": "poison",
              "duration": 3,
              "chance": 0.7,
              "weight": 1
            }
          ],
          "eventActions": [
            {
              "name": "Constrict",
              "effect": "hp:subtract",
              "target": "party:single",
              "strength": 80,
              "priority": 100,
              "event": "party:heal"
            }
          ]
        }
      },
      {
        "name": "Stone Golem",
        "maxHp": 600,
        "maxMp": 0,
        "speed": 5,
        "element": "none",
        "enemyId": "stone_golem",
        "actions": {
          "normal": [
            {
              "name": "Rock Throw",
              "effect": "hp:subtract",
              "target": "party:single",
              "strength": 70,
              "weight": 2
            },
            {
              "name": "Ground Pound",
              "effect": "hp:subtract",
              "target": "party:all",
              "strength": 50,
              "weight": 1
            }
          ],
          "phaseActions": [
            {
              "maxHp": 40,
              "minHp": 0,
              "name": "Avalanche",
              "effect": "hp:subtract",
              "target": "party:all",
              "strength": 100,
              "weight": 1
            }
          ]
        }
      },
      {
        "name": "Shadow Assassin",
        "maxHp": 180,
        "maxMp": 120,
        "speed": 25,
        "element": "none",
        "enemyId": "shadow_assassin",
        "actions": {
          "normal": [
            {
              "name": "Backstab",
              "effect": "hp:subtract",
              "target": "party:single",
              "strength": 80,
              "weight": 2
            },
            {
              "name": "Smoke Bomb",
              "effect": "status:add",
              "target": "party:all",
              "status": "blind",
              "duration": 2,
              "chance": 0.5,
              "weight": 1
            }
          ],
          "eventActions": [
            {
              "name": "Shadow Strike",
              "effect": "hp:subtract",
              "target": "party:single",
              "strength": 120,
              "priority": 100,
              "event": "party:buff"
            }
          ]
        }
      },
      {
        "name": "Mana Wraith",
    "maxHp": 150,
    "maxMp": 300,
    "speed": 12,
    "element": "none",
    "enemyId": "mana_wraith",
    "actions": {
      "normal": [
        {
          "name": "Mana Drain",
          "effect": "mp:subtract",
          "target": "party:single",
          "strength": 50,
          "weight": 2
        },
        {
          "name": "Arcane Blast",
          "effect": "hp:subtract",
          "target": "party:single",
          "strength": 60,
          "weight": 1
        }
      ],
      "phaseActions": [
        {
          "maxHp": 50,
          "minHp": 0,
          "name": "Mana Explosion",
          "effect": "hp:subtract",
          "target": "party:all",
          "strength": 80,
          "weight": 1
        }
      ],
      "eventActions": [
        {
          "name": "Spell Reflection",
          "effect": "status:add",
          "target": "self",
          "status": "reflect",
          "duration": 2,
          "priority": 100,
          "event": "party:cast_spell"
        }
      ]
    }
  },
  {
    "name": "Corrupted Treant",
    "maxHp": 400,
    "maxMp": 100,
    "speed": 7,
    "element": "none",
    "enemyId": "corrupted_treant",
    "actions": {
      "normal": [
        {
          "name": "Root Lash",
          "effect": "hp:subtract",
          "target": "party:single",
          "strength": 55,
          "weight": 2
        },
        {
          "name": "Poison Spores",
          "effect": "status:add",
          "target": "party:all",
          "status": "poison",
          "duration": 3,
          "chance": 0.4,
          "weight": 1
        }
      ],
      "phaseActions": [
        {
          "maxHp": 30,
          "minHp": 0,
          "name": "Nature's Wrath",
          "effect": "hp:subtract",
          "target": "party:all",
          "strength": 90,
          "weight": 1
        }
      ]
    }
  },
  {
    "name": "Chaos Elemental",
    "maxHp": 350,
    "maxMp": 200,
    "speed": 17,
    "element": "none",
    "enemyId": "chaos_elemental",
    "actions": {
      "normal": [
        {
          "name": "Chaotic Strike",
          "effect": "hp:subtract",
          "target": "party:single",
          "strength": 65,
          "weight": 2
        },
        {
          "name": "Element Shift",
          "effect": "status:add",
          "target": "self",
          "status": "element_shift",
          "duration": 3,
          "weight": 1
        }
      ],
      "phaseActions": [
        {
          "maxHp": 40,
          "minHp": 0,
          "name": "Chaos Nova",
          "effect": "hp:subtract",
          "target": "party:all",
          "strength": 100,
          "weight": 1
        }
      ],
"eventActions": [
        {
          "name": "Reality Warp",
          "effect": "status:add",
          "target": "party:all",
          "status": "confuse",
          "duration": 2,
          "chance": 0.5,
          "priority": 100,
          "event": "party:strong_attack"
        }
      ]
    }
  },
  {
    "name": "Necromancer",
    "maxHp": 250,
    "maxMp": 250,
    "speed": 10,
    "element": "none",
    "enemyId": "necromancer",
    "actions": {
      "normal": [
        {
          "name": "Soul Drain",
          "effect": "hp:subtract",
          "target": "party:single",
          "strength": 45,
          "weight": 2
        },
        {
          "name": "Raise Undead",
          "effect": "summon",
          "target": "self",
          "summonType": "skeleton",
          "weight": 1
        }
      ],
      "phaseActions": [
        {
          "maxHp": 30,
          "minHp": 0,
          "name": "Death's Embrace",
          "effect": "hp:subtract",
          "target": "party:all",
          "strength": 85,
          "weight": 1
        }
      ],
      "eventActions": [
        {
          "name": "Life Siphon",
          "effect": "hp:add",
          "target": "self",
          "strength": 100,
          "priority": 100,
          "event": "ally:defeated"
        }
      ]
    }
  }
]