import assert from 'node:assert';
import { test } from 'node:test';
import { createStatusManager } from './statusManager.js';
import {
    createIncreaseStatAction,
    createPhysicalAttackAction,
    createMagicAttackAction,
    createPhysicalAttackResult,
    createMagicAttackResult,
    createAssignElementAction,
    STAT,
    ELEMENT
} from '../actions.js';

const expect = (a) => ({
    toBe: (b) => {
        assert.equal(a, b);
    },
    toEqual: (b) => {
        assert.deepStrictEqual(a, b);
    }
});

test('adding def stat to target will impact how an attack result is calculated', () => {
    const statusManager = createStatusManager()

    const stat = createIncreaseStatAction({
        target: 't-1',
        source: 'init',
        duration: Infinity,
        name: 'equipment-armor-defense',
        strength: 5,
        stat: STAT.def_phy
    })

    const action = createPhysicalAttackAction({
        target: 't-1',
        source: 's-1',
        name: 'punch',
        strength: 10,
        element: ELEMENT.none
    })

    statusManager.setStat(stat)

    const actionResult = statusManager.calculateActionResult(action)

    const expected = createPhysicalAttackResult({
        target: 't-1',
        amount: (10 - 5) * 10
    })
        
    expect(expected.amount).toBe(actionResult.amount);
});


test('physical attack with elemental advantage', () => {
    const statusManager = createStatusManager();

    const elementAssignment = createAssignElementAction({
        target: 't-1',
        source: 'init',
        name: 'ice-affinity',
        element: ELEMENT.ice,
        duration: Infinity
    });

    const action = createPhysicalAttackAction({
        target: 't-1',
        source: 's-1',
        name: 'fire-punch',
        strength: 10,
        element: ELEMENT.fire
    });

    statusManager.setElement(elementAssignment);

    const actionResult = statusManager.calculateActionResult(action);

    const expected = createPhysicalAttackResult({
        target: 't-1',
        amount: 10 * 10 * 2 // Base damage * elemental advantage
    });

    expect(expected.amount).toBe(actionResult.amount);
});

test('magic attack with elemental disadvantage', () => {
    const statusManager = createStatusManager();

    const elementAssignment = createAssignElementAction({
        target: 't-1',
        source: 'init',
        name: 'fire-affinity',
        element: ELEMENT.fire,
        duration: Infinity
    });

    const defenseIncrease = createIncreaseStatAction({
        target: 't-1',
        source: 'init',
        duration: Infinity,
        name: 'magic-barrier',
        strength: 2,
        stat: STAT.def_mag
    });

    const action = createMagicAttackAction({
        target: 't-1',
        source: 's-1',
        name: 'fire-bolt',
        strength: 10,
        element: ELEMENT.fire
    });

    statusManager.setElement(elementAssignment);
    statusManager.setStat(defenseIncrease);

    const actionResult = statusManager.calculateActionResult(action);

    const expected = createMagicAttackResult({
        target: 't-1',
        amount: Math.round((10 - 2) * 10 * 0.5) // (Base damage - defense) * 10 * elemental disadvantage
    });

    expect(expected.amount).toBe(actionResult.amount);
});

test('magic attack with no elemental interaction', () => {
    const statusManager = createStatusManager();

    const action = createMagicAttackAction({
        target: 't-1',
        source: 's-1',
        name: 'energy-blast',
        strength: 15,
        element: ELEMENT.none
    });

    const actionResult = statusManager.calculateActionResult(action);

    const expected = createMagicAttackResult({
        target: 't-1',
        amount: 15 * 10 // Base damage * 10
    });

    expect(expected.amount).toBe(actionResult.amount);
});