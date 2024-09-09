// type StatusEffect = 'poison' | 'sleep' | 'paralysis' | 'blind' | 'silence' | 'confuse';

import {
    ACTION_TYPE,
    STAT,
    ELEMENT,
    createPhysicalAttackResult,
    createMagicAttackResult,
    createHealHpResult,
    createHealMpResult,
    createIncreaseStatResult,
    createDecreaseStatResult,
    createApplyStatusResult
} from '../actions.js';

/**
 * @typedef {Object} applyStatusInput
 * @property {string} targetId
 * @property {number} turnsActive
 * @property {string} name
 * @property {number} strength
 * @property {string} statTarget
 */


/**
 * @typedef {Object} attackAction
 * @property {string} targetId
 * @property {string} sourceId
 * @property {string} name
 * @property {number} strength
 * @property {string} element
 */

export function createStatusManager() {

    const statusState = {}

    return  {
        setElement: (applyElementInput) => {
            const compositeKey = `${applyElementInput.target}#element#${applyElementInput.element}`
            statusState[compositeKey] = applyElementInput
        },

        setStat: (applyStatInput) => {
            const compositeKey = `${applyStatInput.target}#${applyStatInput.stat}#${applyStatInput.name}`
            statusState[compositeKey] = applyStatInput
        },

        setStatus: (applyStatusInput) => {
            const compositeKey = `${applyStatusInput.targetId}#${applyStatusInput.status}#${applyStatusInput.name}`
            statusState[compositeKey] = applyStatusInput

        },

        removeStatus: () => {
            // this will be for healing, or reviving (death may need to be a status)
            // death will work here, becayse if someone heals a person with status of death, 
            // it will adjust the event to have 0 effect
        },

        // emits events
        registerTurn: (targetId) => {
            Object.keys(statusState).forEach(k => {
                const x = statusState[k]
                if (x.turnsActive === Infinity) return

                if (x.turnsActive - 1 <= 0) {
                    delete statusState[k]
                }

                x.turnsActive = x.turnsActive - 1
            })
        },

        calculateActionResult: (action) => {
            const target = action.target;

            const calculateElementalMultiplier = (attackElement, targetElement) => {
                if (!attackElement || !targetElement || attackElement === ELEMENT.none) return 1;
                if (
                    (attackElement === ELEMENT.fire && targetElement === ELEMENT.ice) ||
                    (attackElement === ELEMENT.ice && targetElement === ELEMENT.fire) ||
                    (attackElement === ELEMENT.water && targetElement === ELEMENT.lightning) ||
                    (attackElement === ELEMENT.lightning && targetElement === ELEMENT.water)
                ) {
                    return 2; // Double damage for opposing elements
                }
                if (attackElement === targetElement) {
                    return 0.5; // Half damage for same element
                }
                return 1; // Normal damage otherwise
            };
        
            const getTargetElement = (target) => {
                // Assuming the target's element is stored in statusState with a key like 'targetId#element'
                const elementStatus = Object.keys(statusState).find(k => k.startsWith(`${target}#element#`));
                return elementStatus ? statusState[elementStatus].element : ELEMENT.none;
            };
        
            if (action.type === ACTION_TYPE['physical-attack']) {
                const relevantDefStatuses = Object.keys(statusState).filter(k => k.startsWith(`${target}#${STAT.def_phy}#`));
                const def = relevantDefStatuses.reduce((acc, k) => acc + statusState[k].strength, 0);
                
                const targetElement = getTargetElement(target);
                const elementalMultiplier = calculateElementalMultiplier(action.element, targetElement);
                
                const baseAmount = Math.max(0, action.strength - def) * 10;
                const amount = Math.round(baseAmount * elementalMultiplier);
                
                return createPhysicalAttackResult({ target, amount });
            }
            
            if (action.type === ACTION_TYPE['magic-attack']) {
                const relevantDefStatuses = Object.keys(statusState).filter(k => k.startsWith(`${target}#${STAT.def_mag}#`));
                const def = relevantDefStatuses.reduce((acc, k) => acc + statusState[k].strength, 0);
                
                const targetElement = getTargetElement(target);
                const elementalMultiplier = calculateElementalMultiplier(action.element, targetElement);
                
                const baseAmount = Math.max(0, action.strength - def) * 10;
                const amount = Math.round(baseAmount * elementalMultiplier);
                
                return createMagicAttackResult({ target, amount });
            }
        
            if (action.type === ACTION_TYPE["heal-hp"]) {
                return createHealHpResult({ target, amount: action.strength });
            }
        
            if (action.type === ACTION_TYPE["heal-mp"]) {
                return createHealMpResult({ target, amount: action.strength });
            }
        
            if (action.type === ACTION_TYPE["increase-stat"]) {
                return createIncreaseStatResult({
                    target: action.target,
                    amount: action.strength,
                    duration: action.duration,
                    stat: action.stat
                });
            }
            
            if (action.type === ACTION_TYPE["decrease-stat"]) {
                return createDecreaseStatResult({
                    target: action.target,
                    amount: action.strength,
                    duration: action.duration,
                    stat: action.stat
                });
            }
        
            if (action.type === ACTION_TYPE["apply-status"]) {
                const existingStatus = statusState[`${target}#${action.status}#${action.name}`];
                const duration = existingStatus ? Math.max(existingStatus.duration, action.duration) : action.duration;
                return createApplyStatusResult({ target, duration, status: action.status });
            }
        
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}