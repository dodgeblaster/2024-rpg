import {generateRandomId, calculateDamage} from './utils/utils.js'
import {
    createEventAction,
    determineEventAction,
    selectWeightedAction,
    createWeightedAction,
    determinePhaseActions,
    createPhaseAction
} from './utils/actionUtils.js';



export class Enemy {
    constructor(props){
        this.hp = props.hp 
        this.mp = props.mp 
        this.speed = props.speed
        this.element = props.element
        this.enemyId = props.enemyId
        this.name = props.name
        this.id = generateRandomId(6)
    }

    getId = () => this.id
    getHp = () => this.hp
    getMp = () => this.mp

    applyDamage = (props) => {
        const damage = calculateDamage(props)
        this.hp = Math.max(0, this.hp - damage)
    }

    actions = {
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
                strength: 150
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

    requestAction = (events = []) => {
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
