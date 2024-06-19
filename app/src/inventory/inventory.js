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


export function makeInventory(items = {}) {
    const state = {
        items: items // Record<id, number>
    }

    return {
        listAllItems: () => {
            return Object.keys(state.items).map(k => {
                return {
                    id: k,
                    name: itemDefinitions[k].name,
                    amount: state.items[k]
                }
            })
        },
        takeItem: (id) => {
            if (state.items[id] > 0) {
                const action = itemDefinitions[id].action
                state.items[id]-- 
                return action
            } else {
                return false
            }
        }
    }

}
