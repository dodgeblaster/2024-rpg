import {generateRandomId, calculateDamage} from '../utils/utils.js'

export function createPartyMember(props) {
    const state = {
        stats: {
            hp: props.stats.hp,
            mp: props.stats.mp,
            str_phy: props.stats.str_phy,
            str_mag: props.stats.str_mag,
            def_phy: props.stats.def_phy,
            def_mag: props.stats.def_mag,
            speed: props.stats.speed,
        },
        equip: {
            str_phy: props.equip.str_phy,
            str_mag: props.equip.str_mag,
            str_elem: props.equip.str_elem,
            def_elem: props.equip.def_elem,
            def_phy: props.equip.def_phy,
            def_mag: props.equip.def_mag
        },
        speed: props.stats.speed,
        current: {
            hp: props.current.hp,
            mp: props.current.mp,
        },

   
        partyMemberId: props.partyMemberId,
        name: props.name,
        id: generateRandomId(),
    }

    return {
        getId: () => state.id,
        getHp: () => state.current.hp,
        getMp: () => state.current.mp,
        applyDamage: ({sourceElement, damage}) => {
            // Enemy Damage = (Enemy Strength * (1 - (Hero's Physical Defense / 100)))
            const totalPhyDef = state.stats.def_phy + state.equip.def_phy
            const d = damage * (1 - (totalPhyDef / 100))

            const result = calculateDamage({targetElement: state.equip.def_elem || 'none', sourceElement, damage: d})
            state.current.hp = Math.max(0, state.current.hp - result)
            return result
        },
        applyHpUp: (amount) => {
            state.current.hp = Math.min(state.stats.hp, state.current.hp + amount)
        },
        applyMpUp: (amount) => {
            state.current.mp = Math.min(state.stats.mp, state.current.mp + amount)
        },

        getStatusData: () => {
            return {
                name: state.name,
                currentHp: state.current.hp,
                maxHp: state.stats.hp
            }
        },



        requestActionOptions: () => {
            return [
                {
                    name: "Attack",
                    strength: state.stats.str_phy + state.equip.str_phy,
                    effect: "hp:subtract",
                    target: "enemy:single",
                    weight: 1
                },
                {
                    name: "Heal",
                    strength: 100,
                    effect: "hp:add",
                    target: "party:single",
                    weight: 1
                },
            ]
        }
    }
}

