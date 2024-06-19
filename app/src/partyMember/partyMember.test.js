import {
   createPartyMember 
} from './partyMember.js';
import assert from 'node:assert';
import { test } from 'node:test';
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a,b)
        }
    }
}

const makeHero = () => {
    return createPartyMember({
        stats: {
            hp: 1000,
            mp: 1000,
            str_phy: 30,
            str_mag: 30,
            def_phy: 30,
            def_mag: 30,
            speed: 30,
        },
        equip: {
            str_phy: 30, 
            str_mag: 30, 
            str_elem: 'none', 
            def_elem: 'none', 
            def_phy: 30, 
            def_mag: 30
        },
        current: {
            hp: 500,
            mp: 500
        },
        partyMemberId: '100',
        id: '100000',
        name: 'Hero'
    })
}

test('hero can take damage and have the stat and equip defense impact damage taken', () => {
    const hero = makeHero() 
    const result = hero.applyDamage({targetElement: 'none', sourceElement: 'none', damage: 100})
    expect(result).toBe(40)
    expect(hero.getHp()).toBe(460)
})

test('hero can recieve hp up', () => {
    const hero = makeHero() 
    expect(hero.getHp()).toBe(500)
    hero.applyHpUp(100)
    expect(hero.getHp()).toBe(600)
})

test('hero can recieve mp up', () => {
    const hero = makeHero() 
    expect(hero.getMp()).toBe(500)
    hero.applyMpUp(100)
    expect(hero.getMp()).toBe(600)
})

test('can request action options from hero', () => {
    const hero = makeHero()
    const options = hero.requestActionOptions()
    expect(options[0].name).toBe('Attack')   
    expect(options[0].strength).toBe(60)   
})
