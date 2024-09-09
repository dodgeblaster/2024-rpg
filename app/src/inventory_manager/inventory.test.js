import {
  createInventory 
} from './inventory.js';
import assert from 'node:assert';
import { test } from 'node:test';
const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a,b)
        }
    }
}

const makeItems = () => {
    const itemDefinitions = {
        potion: {
            id: 'potion',
            name: 'Potion',
            action: {
                effect: 'hp:add',
                strength: 100
            }
        }
    }

    return createInventory(itemDefinitions, {
        potion: 2 
    })
}

test('inventory can show all items', () => {
    const inventory = makeItems()
    const itemsToShow = inventory.listAllItems()
    expect(itemsToShow[0].id).toBe('potion')
    expect(itemsToShow[0].name).toBe('Potion')
    expect(itemsToShow[0].amount).toBe(2)
})


test('inventory.useItem returns an action and decrements the amount of that item', () => {
    const inventory = makeItems()
    const action = inventory.takeItem('potion')
   expect(action.effect).toBe('hp:add') 
   expect(action.strength).toBe(100) 


   const itemsToShow = inventory.listAllItems()
    expect(itemsToShow[0].id).toBe('potion')
    expect(itemsToShow[0].name).toBe('Potion')
    expect(itemsToShow[0].amount).toBe(1)
})
