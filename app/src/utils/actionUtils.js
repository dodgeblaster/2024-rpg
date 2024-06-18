const availableTargets = {
    'party:single': 'party:single',
    'party:all': 'party:all',
    'enemy:single': 'enemy:single',
    'enemy:all': 'enemy:all'
}

const availableStatuss = {
    hp: 'hp',
    mp: 'mp'
}

const availableActions = {
    add: 'add',
    subtract: 'subtract'
}

export function createEventAction(props) {

    if (!availableTargets[props.target]) {
        throw new Error(props.target, ' is not a valid target')
    }

    if (!availableStatuss[props.effect.split(':')[0]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    if (!availableActions[props.effect.split(':')[1]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    return {
        name: props.name,
        effect: props.effect,
        target: props.target,
        strength: props.strength,
        priority: props.priority,
        event: props.event
    }
}

export function createWeightedAction(props) {
    if (!availableTargets[props.target]) {
        throw new Error(props.target, ' is not a valid target')
    }

    if (!availableStatuss[props.effect.split(':')[0]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    if (!availableActions[props.effect.split(':')[1]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    return {
        name: props.name,
        strength: props.strength,
        effect: props.effect,
        target: props.target,
        weight: props.weight
    }
}

export function createPhaseAction(props) {
    if (!availableTargets[props.target]) {
        throw new Error(props.target, ' is not a valid target')
    }

    if (!availableStatuss[props.effect.split(':')[0]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    if (!availableActions[props.effect.split(':')[1]]) {
        throw new Error(props.effect, ' is not a valid effect')
    }

    return {
        name: props.name,
        strength: props.strength,
        effect: props.effect,
        target: props.target,
        weight: props.weight,
        maxHp: props.maxHp,
        minHp: props.minHp
    }
}


export function determineEventAction(events, eventActions) {
    let eventAction = false
    events.forEach(event => {
        const possibleAction = eventActions.find(x => x.event === event.name)
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
    return eventAction
}

export function selectWeightedAction(actions) {
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

        const selection = randomWeightedSelection(actions);         
        return selection
 
}

export function determinePhaseActions(actions, maxHp, currentHp) {
    const hpPercent = Math.floor((currentHp / maxHp) * 100)
    return actions.filter(a => a.maxHp > hpPercent && a.minHp < hpPercent)
}
