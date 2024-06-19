import {generateRandomId, calculateDamage} from './utils/utils.js'
import {
    createEventAction,
    determineEventAction,
    selectWeightedAction,
    createWeightedAction,
    determinePhaseActions,
    createPhaseAction
} from './utils/actionUtils.js';


export function makePartyMember(props) {
    const state = {
        maxHp: props.maxHp,
        hp: props.hp,
        maxMp: props.maxMp,
        mp: props.mp,
        speed: props.speed,
        physicalDefense: props.physicalDefense,
        magicDefense: props.magicDefence,
        partyMemberId: props.partyMemberId,
        name: props.name,
        id: generateRandomId(),
    }

    return {
        getId: () => state.id,
        getHp: () => state.hp,
        getMp: () => state.mp,
        applyDamage: ({sourceElement, damage}) => {
            const damage = calculateDamage({targetElement: state.element || 'none', sourceElement, damage})
            state.hp = Math.max(0, state.hp - damage)
        },
        requestActionOptions: () => {
            return [
                {
                    name: "Attack",
                    strength: 100,
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

