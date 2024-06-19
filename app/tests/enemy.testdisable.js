import { Enemy } from '../src/enemy.js';
import assert from 'node:assert';
import { test } from 'node:test';

test('method1 returns "Hello"', () => {
    const instance = new Enemy({
        hp: 300,
        mp: 300,
        element: 'fire'
    });
    assert.strictEqual(instance.getHp(), 300);
});


test('can take damage', () => {
    const instance = new Enemy({
        hp: 300,
        mp: 300,
        element: 'fire'
    });
    instance.applyDamage({
        targetElement: 'none',
        sourceElement: 'other',
        damage: 50
    })
    assert.strictEqual(instance.getHp(), 250);
});

test('can request an action', () => {
    const instance = new Enemy({
        hp: 300,
        mp: 300,
        element: 'fire'
    });
    const action = instance.requestAction([])

    const expected = {
        name: "punch",
        strength: 100,
        target: "party:single",
        weight: 1,
        effect: 'hp:subtract',
    }

    assert.deepStrictEqual(action,expected) 
});


