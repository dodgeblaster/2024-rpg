import {generateRandomId, calculateDamage} from './utils/utils.js'



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
        eventActions: {
            'party:heal': {
                name: "punch2",
                effect: "hp:subtract",
                target: "party:single",
                strength: 150,
                priority: 100
            }
        },
        stateActions: [
            {
                state: "hp:50%",
                name: "punch2",
                effect: "hp:subtract",
                target: "party:single",
                strength: 150
            },
        ],
        normal: [
            {
                name: "punch",
                strength: 100,
                effect: "hp:subtract",
                target: "party:single",
                weight: 1
            },
        ]
    }

    requestAction = (events = []) => {
        let eventAction = false
        events.forEach(event => {
            const possibleAction = this.actions.eventActions[event.name]
            if (possibleAction) {
                if (!eventAction) {
                    eventAction = possibleAction
                } else {
                    if (possibleAction.priority > eventAction.priority) {
                        eventAction = possibleAction
                    }
                }
            }   
        });

        function randomWeightedSelection(array) {
            let totalWeight = 0;
            let weightedItems = [];

            // Calculate total weight and create a weighted items array
            for (let i = 0; i < array.length; i++) {
                const itemWeight = array[i].weight;
                totalWeight += itemWeight;
                weightedItems.push({item: array[i], weight: itemWeight});
            }

            // Generate random weight between 0 and totalWeight
            let randomWeight = Math.random() * totalWeight;
            let accumulatedWeight = 0;
            for (let i = 0; i < weightedItems.length; i++) {
                accumulatedWeight += weightedItems[i].weight;

                if (accumulatedWeight > randomWeight) {
                    return weightedItems[i].item; // Return the selected item
                }
            }
        }

        const selection = randomWeightedSelection(this.actions.normal);         
        return selection
    }
}
