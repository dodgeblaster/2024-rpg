import {generateRandomId, calculateDamage} from '../utils/utils.js'
import {
    createEventAction,
    determineEventAction,
    selectWeightedAction,
    createWeightedAction,
    determinePhaseActions,
    createPhaseAction
} from '../utils/actionUtils.js';

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

export function createEnemy(props) {
    const state = {
        maxHp: props.maxHp,
        hp: props.hp,
        maxMp: props.maxMp,
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
        getName: () => state.name,
        getHp: () => state.hp,
        getMp: () => state.mp,
        applyDamage: ({sourceElement, damage}) => {
            const result = calculateDamage({targetElement: state.element, sourceElement, damage})
            state.hp = Math.max(0, state.hp - result)
        },
        requestAction:  (events = []) => {
            const eventA = determineEventAction(events, state.actions.eventActions)
            if (eventA) {
                return eventA
            }

            const phaseActions = determinePhaseActions(state.actions.phaseActions || [], state.maxHp, state.hp)
            const normalActions = state.actions.normal || []
            const allActions = [...phaseActions, ...normalActions]
            return selectWeightedAction(allActions)
        }
    }
}

