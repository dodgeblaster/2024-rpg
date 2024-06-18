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
