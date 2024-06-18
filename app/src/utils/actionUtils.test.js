import {
    createEventAction,
    determineEventAction,
    selectWeightedAction,
    createWeightedAction
} from './actionUtils.js';
import {createEvent} from './eventUtils.js'
import assert from 'node:assert';
import { test } from 'node:test';
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a,b)
        }
    }
}

test('selectWeightedAction will return an action from an array of actions', () => {
 
    const actions = [
        createWeightedAction({
            name: 'A',
            target: 'enemy:single',
            effect: 'hp:subtract',
            strength: 20,
            weight: 100
        })
    ] 
    
    const result = selectWeightedAction(actions)
    expect(result.name).toBe('A')
})


test('determineEventAction returns false if all events do not match an event action', () => {
    const events = [
        createEvent('eventA')
    ]

    const actions = [
        createEventAction({
            name: 'A',
            target: 'enemy:single',
            effect: 'hp:subtract',
            strength: 20,
            event: 'eventB',
            priority: 100
        })
    ] 
    
    const result = determineEventAction(events, actions)
    expect(result).toBe(false)
})


test('determineEventAction returns an action if an actions event property matches an event that has happened', () => {
    const events = [
        createEvent({name: 'eventB'})
    ]

    const actions = [
        createEventAction({
            name: 'actionA',
            target: 'enemy:single',
            effect: 'hp:subtract',
            strength: 20,
            event: 'eventB',
            priority: 100
        })
    ] 
    
    const result = determineEventAction(events, actions)
    expect(result.name).toBe('actionA')
})


test('determineEventAction returns an action with the highest priority when multiple actions match the events', () => {
    const events = [
        createEvent({name: 'eventA'}),
        createEvent({name: 'eventB'})
    ]

    const actions = [
        createEventAction({
            name: 'actionB',
            target: 'enemy:single',
            effect: 'hp:subtract',
            strength: 20,
            event: 'eventB',
            priority: 100
        }),
        createEventAction({
            name: 'actionA',
            target: 'enemy:single',
            effect: 'hp:subtract',
            strength: 20,
            event: 'eventA',
            priority: 200
        })
 
    ] 
    
    const result = determineEventAction(events, actions)
    expect(result.name).toBe('actionA')
})


