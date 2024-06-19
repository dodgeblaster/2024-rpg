import {generateRandomId, calculateDamage} from './utils/utils.js'
import {
    createEventAction,
    determineEventAction,
    selectWeightedAction,
    createWeightedAction,
    determinePhaseActions,
    createPhaseAction
} from './utils/actionUtils.js';

const defaultActions =  {
    eventActions: [
        createEventAction({
            name: "punch2",
            effect: "hp:subtract",
            target: "party:single",
            strength: 150,
            priority: 100,
            event: 'party:heal'
        })
    ],
    phaseActions: [
        createPhaseAction({
            maxHp: 50,
            minHp: 0,
            name: "punch2",
            effect: "hp:subtract",
            target: "party:single",
            strength: 150,
            weight: 1,
        })
    ],
    normal: [
        createWeightedAction({
            name: "punch",
            strength: 100,
            effect: "hp:subtract",
            target: "party:single",
            weight: 1
        })
    ]
}

export function makeEnemy(props) {
    const state = {
        hp: props.hp,
        mp: props.mp,
        speed: props.speed,
        element: props.element,
        enemyId: props.enemyId,
        name: props.name,
        id: generateRandomId(),
        actions: props.actions || defaultActions
    }

    return {
        getId: () => state.id,
        getHp: () => state.hp,
        getMp: () => state.mp,
        applyDamage: ({targetElement, sourceElement, damage}) => {
            const damage = calculateDamage({targetElement, sourceElement, damage})
            this.hp = Math.max(0, this.hp - damage)
        },
        requestAction:  (events = []) => {
            const eventA = determineEventAction(events, this.actions.eventActions)
            if (eventA) {
                return eventA
            }

            const phaseActions = determinePhaseActions(this.actions.phaseActions)
            const normalActions = this.actions.normal
            const allActions = [...phaseActions, ...normalActions]
            return selectWeightedAction(allActions)
        }
    }
}

