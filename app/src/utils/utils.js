export const min0max9999 = (n) => {
    if (n < 0) return 0
    if (n > 9999) return 9999
    return n
}

export const min9999max9999 = (n) => {
    if (n < -9999) return -9999
    if (n > 9999) return 9999
    return n
}

export const min0max = (max) => (n) => {
    if (n < 0) return 0
    if (n > max) return max
    return n
}

export const randomBetween0And = (max) => {
    return Math.floor(Math.random() * max)
}

export function generateRandomId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

export function calculateDamage({targetElement, sourceElement, damage}) {
    const elements = {
        fire: 'ice',
        ice: 'fire',
        water: 'lightning',
        lightning: 'water',
    }  

    if (!elements[targetElement]) {
        return damage
    }
    
    if (!elements[sourceElement]) {
        return damage
    }

    if (elements[targetElement] === sourceElement) {
        return damage * 2
    }

    if (targetElement === sourceElement) {
        return damage / 2
    }

    return damage
}
