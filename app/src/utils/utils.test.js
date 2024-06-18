import {
    min0max,
    min0max9999,
    min9999max9999,
    randomBetween0And,
    generateRandomId,
    calculateDamage
} from './utils.js';
import assert from 'node:assert';
import { test } from 'node:test';
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a,b)
        }
    }
}

test('min0max will keep number in bounds', () => {
    expect(min0max(40)(20)).toBe(20)
    expect(min0max(40)(50)).toBe(40)
    expect(min0max(0)(-12)).toBe(0)
})

test('min0max will return 0 if max number is negative', () => {
    expect(min0max(-12)(-10)).toBe(0)
})

test('min0max9999 will keep number in bounds', () => {
    expect(min0max9999(20)).toBe(20)
    expect(min0max9999(123123)).toBe(9999)
    expect(min0max9999(-12)).toBe(0)
})

test('min9999max9999 will keep number in bounds', () => {
    expect(min9999max9999(-340)).toBe(-340)
    expect(min9999max9999(123123)).toBe(9999)
    expect(min9999max9999(-123123)).toBe(-9999)
})

test('randomBetween0And will give number between 0 and max number', () => {
    const result = randomBetween0And(300)
    expect(typeof result).toBe('number')
    expect(result > -1).toBe(true)
    expect(result < 301).toBe(true)
})

test('generate id will create an id that is 6 characters long if no length is specified', () => {
    const id = generateRandomId()
    expect(id.length).toBe(6)
})

test('calculate damage returns the same damage if no element scenario is in play', () => {
    const result = calculateDamage({
        targetElement: 'fire',
        sourceElement: 'none',
        damage: 20
    })
    expect(result).toBe(20)
})

test('calculate damage returns half if elements match', () => {
    const result = calculateDamage({
        targetElement: 'fire',
        sourceElement: 'fire',
        damage: 20
    })
    expect(result).toBe(10)
})

test('calculate damage returns double if elements are opposit', () => {
    const result = calculateDamage({
        targetElement: 'fire',
        sourceElement: 'ice',
        damage: 20
    })
    expect(result).toBe(40)
})
