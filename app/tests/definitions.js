const heroes = [
    {
        partyMemberId: '100',
        id: '100000',
        name: 'Hero',
        stats: {
            hp: 1000,
            mp: 1000,
            str_phy: 30,
            str_mag: 30,
            def_phy: 30,
            def_mag: 30,
            speed: 30,
        },
        equip: {
            str_phy: 30, 
            str_mag: 30, 
            str_elem: 'none', 
            def_elem: 'none', 
            def_phy: 30, 
            def_mag: 30
        },
        current: {
            hp: 500,
            mp: 500
        },
    },
 {
        partyMemberId: '101',
        id: '100001',
        name: 'HeroB',
        stats: {
            hp: 1000,
            mp: 1000,
            str_phy: 30,
            str_mag: 30,
            def_phy: 30,
            def_mag: 30,
            speed: 30,
        },
        equip: {
            str_phy: 30, 
            str_mag: 30, 
            str_elem: 'none', 
            def_elem: 'none', 
            def_phy: 30, 
            def_mag: 30
        },
        current: {
            hp: 700,
            mp: 500
        },
    }

]

const enemies = [
    { 
        enemyId: 'bear',
        name: 'BearA',
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        actions: {
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1

                }
            ]
        }

    },

    { 
        enemyId: 'bear',
        name: 'BearB',
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        actions: {
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1

                }
            ]
        }

    }
]

const itemDefs = {
        potion: {
            id: 'potion',
            name: 'Potion',
            action: {
                effect: 'hp:add',
                strength: 100
            }
        }
}

const itemState = {
    potion: 2
}

export default {
    heroes,
    enemies,
    itemDefs,
    itemState
}
