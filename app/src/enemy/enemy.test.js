import {
   createEnemy 
} from './enemy.js';
import assert from 'node:assert';
import { test } from 'node:test';
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a,b)
        }
    }
}

test('enemy can take damage down to 0', () => {
    const enemy = createEnemy({
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        enemyId: 'one',
        name: 'one',
        actions: {
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1

                }
            ]
        }
    })

    enemy.applyDamage({targetElement: 'none', sourceElement: 'none', damage: 100})
    expect(enemy.getHp()).toBe(100)
    enemy.applyDamage({targetElement: 'none', sourceElement: 'none', damage: 110})
    expect(enemy.getHp()).toBe(0)
})


test('enemy damage is impacted by element', () => {
    const enemy = createEnemy({
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        enemyId: 'one',
        name: 'one',
        actions: {
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1

                }
            ]
        }
    })

    enemy.applyDamage({ sourceElement: 'ice', damage: 80})
    expect(enemy.getHp()).toBe(40)
    enemy.applyDamage({ sourceElement: 'ice', damage: 110})
    expect(enemy.getHp()).toBe(0)
})


test('can return an action', () => {
    const enemy = createEnemy({
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        enemyId: 'one',
        name: 'one',
        actions: {
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1
                }
            ]
        }
    })
    const action = enemy.requestAction()
    expect(action.name).toBe('punch')
})

test('can return a phase action', () => {
    const enemy = createEnemy({
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        enemyId: 'one',
        name: 'one',
        actions: {
            phaseActions: [
                {
                    maxHp: 50,
                    minHp: 0,
                    name: "phasePunch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1
                }
            ]
        }
    })

    const action1 = enemy.requestAction()
    expect(action1).toBe(undefined)

    enemy.applyDamage({targetElement: 'none', sourceElement: 'none', damage: 105})
    const action = enemy.requestAction()
    expect(action.name).toBe('phasePunch')
})


test('can return an event action', () => {
    const enemy = createEnemy({
        maxHp: 200,
        hp: 200,
        maxMp: 0,
        mp: 0,
        speed: 10,
        element: 'fire',
        enemyId: 'one',
        name: 'one',
        actions: {
            eventActions: [
                {
                    name: "punch2",
                    effect: "hp:subtract",
                    target: "party:single",
                    strength: 150,
                    priority: 100,
                    event: 'party:heal'
                }
            ],
            normal: [
                {
                    name: "punch",
                    strength: 100,
                    effect: "hp:subtract",
                    target: "party:single",
                    weight: 1
                }
            ]
        }
    })

    const action = enemy.requestAction([{id: '123', name: 'party:heal'}])
    expect(action.name).toBe('punch2')
})


