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
        hp: props.hp,
        mp: props.mp,
        speed: props.speed,
        physicalDefense: props.physicalDefense,
        partyMemberId: props.partyMemberId,
        name: props.name,
        id: generateRandomId(),
    }

    return {
        getId: () => state.id,
        getHp: () => state.hp,
        getMp: () => state.mp,
        applyDamage: ({targetElement, sourceElement, damage}) => {
            const damage = calculateDamage({targetElement, sourceElement, damage})
            this.hp = Math.max(0, this.hp - damage)
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

