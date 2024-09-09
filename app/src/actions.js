function uuid(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}


export const ACTION_TYPE = Object.freeze({
    'physical-attack': 'physical-attack',
    'magic-attack': 'magic-attack',
    'heal-hp': 'heal-hp',
    'heal-mp': 'heal-mp',
    'increase-stat': 'increase-stat',
    'decrease-stat': 'decrease-stat',
    'apply-status': 'apply-status',
    'assign-element': 'assign-element', // New action type
});

export const ACTION_RESULT_TYPE = Object.freeze({
    'physical-attack-result': 'physical-attack-result',
    'magic-attack-result': 'magic-attack-result',
    'heal-hp-result': 'heal-hp-result',
    'heal-mp-result': 'heal-mp-result',
    'increase-stat-result': 'increase-stat-result',
    'decrease-stat-result': 'decrease-stat-result',
    'apply-status-result': 'apply-status-result',
    'assign-element-result': 'assign-element-result', // New result type
});

export const ELEMENT = Object.freeze({
    fire: 'fire',
    ice: 'ice',
    water: 'water',
    lightning: 'lightning',
    none: 'none'
});

export const STAT = Object.freeze({
    hp: 'hp',
    mp: 'mp',
    str_phy: 'str_phy',
    str_mag: 'str_mag',
    def_phy: 'def_phy',
    def_mag: 'def_mag',
    speed: 'speed'
})

export const STATUS_EFFECT = Object.freeze({
    poison: 'poison',
    sleep: 'sleep',
    paralysis: 'paralysis',
    blind: 'blind',
    silence: 'silence',
    confuse: 'confuse'
});


export function createPhysicalAttackAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        type: ACTION_TYPE['physical-attack'],
        element: ELEMENT[x.element]
    }
}

export function createPhysicalAttackResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE['physical-attack-result'],
        target: x.target,
        amount: x.amount,
    }
}

export function createMagicAttackAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        type: ACTION_TYPE['magic-attack'],
        element: ELEMENT[x.element]
    }
}

export function createMagicAttackResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE['magic-attack-result'],
        target: x.target,
        amount: x.amount,
    }
}

export function createHealHpAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        type: ACTION_TYPE["heal-hp"]
    }
}

export function createHealHpResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["heal-hp-result"],
        target: x.target,
        amount: x.amount,
    }
}

export function createHealMpAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        type:ACTION_TYPE["heal-mp"]
    }
}

export function createHealMpResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["heal-mp-result"],
        target: x.target,
        amount: x.amount,
    }
}

export function createIncreaseStatAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        stat: STAT[x.stat], // str, def, speed
        duration: x.duration, // number of target turns
        type: ACTION_TYPE["increase-stat"]
    }
}

export function createIncreaseStatResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["increase-stat-result"],
        target: x.target,
        amount: x.amount,
        duration: x.duration,
        stat: STAT[x.stat]
    }
}

export function createDecreaseStatAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        strength: x.strength,
        stat: STAT[x.stat], 
        duration: x.duration, 
        type:ACTION_TYPE["decrease-stat"]
    }
}

export function createDecreaseStatResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["decrease-stat-result"],
        target: x.target,
        amount: x.amount,
        duration: x.duration,
        stat: STAT[x.stat]
    }
}


export function createApplyStatusAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        status: STATUS_EFFECT[x.status], // special string that corresponds to behavior defined in Status Manager. Ex: sleep, poison, death, ect.
        duration: x.duration, // number of target turns
        type: ACTION_TYPE["apply-status"]
    }
}

export function createApplyStatusResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["apply-status-result"],
        target: x.target,
        duration: x.duration,
        status: STATUS_EFFECT[x.stat]
    }
}

export function createAssignElementAction(x) {
    return {
        id: uuid(),
        target: x.target,
        source: x.source,
        name: x.name,
        element: ELEMENT[x.element],
        duration: x.duration, // number of target turns, or Infinity for permanent
        type: ACTION_TYPE["assign-element"]
    }
}

export function createAssignElementResult(x) {
    return {
        id: uuid(),
        type: ACTION_RESULT_TYPE["assign-element-result"],
        target: x.target,
        element: x.element,
        duration: x.duration
    }
}

