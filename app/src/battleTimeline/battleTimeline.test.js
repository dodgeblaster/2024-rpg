import BattleTimelineDS from './battleTimeline.js'
import assert from 'node:assert';
import { test } from 'node:test';


const randomBetween0And = () => 0
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.equal(a,b)
        },
        toEqual: (b) => {
            assert.strictEqual(a,b)
        }
    }
}



test('battleTimelineDS will throw error if players is an empty array', () => {
    try {
        new BattleTimelineDS({
            randomBetween0And,
            players: []
        })
    } catch (e) {
        expect(e.message).toBe('Timeline needs at least 1 player')
    }
})

test('battleTimelineDS will calculate timeline', () => {
    const timeline = new BattleTimelineDS({
        randomBetween0And,
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    const result = JSON.stringify(timeline.getTimeline({}))
    const expected = JSON.stringify([
        '1',
        '2',
        '3',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '3',
        '1',
        '2',
        '3',
        '1',
        '3'
    ])
    expect(result).toBe(expected)
})

test('battleTimelineDS will calculate timeline with offset', () => {
    const timeline = new BattleTimelineDS({
        randomBetween0And,
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    const result = JSON.stringify(

        timeline.getTimeline({
            potentialOffset: {
                id: '2',
                offset: 10
            }
        })
    )

    const expected = JSON.stringify([
        '1',
        '3',
        '2',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '3',
        '1',
        '2',
        '3',
        '1',
        '3'
    ])
    expect(result).toBe(expected)
})

test('battleTimelineDS with no additional offsets, will go thru timeline correctly when turns are taken', () => {
    const timeline = new BattleTimelineDS({
        randomBetween0And,
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    const takeTurn = (x) => timeline.takeTurn({ id: x, offset: 0 })
    const expectNextTurnToBe = (x) =>
        expect(timeline.getTimeline({})[0]).toBe(x)

    const myTimeline = timeline.getTimeline({})
    myTimeline.forEach((id) => {
        expectNextTurnToBe(id)
        takeTurn(id)
    })
})
