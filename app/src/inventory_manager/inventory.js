import { createHealHpAction, createHealMpAction, createApplyStatusAction, ACTION_TYPE} from "../actions"

export function createInventory(itemDefinitions, items = {}) {
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
        takeItem: (id, targetId, sourceId) => {
            if (state.items[id] > 0) {
                const action = itemDefinitions[id].action
                state.items[id]--
                if (action.type === ACTION_TYPE["heal-hp"]) {
                    return createHealHpAction({
                        source: sourceId,
                        target: targetId,
                        strength: action.strength,
                        name: itemDefinitions[id].name
                    })
                }

                if (action.type === ACTION_TYPE["heal-mp"]) {
                    return createHealMpAction({
                        source: sourceId,
                        target: targetId,
                        strength: action.strength,
                        name: itemDefinitions[id].name
                    })
                }

                if (action.type === ACTION_TYPE['apply-status']) {
                    return createApplyStatusAction({
                        source: sourceId,
                        target: targetId,
                        status: action.status,
                        duration: action.duration,
                        name: itemDefinitions[id].name
                    })
                }

                throw new Error(`Unknown action type: ${action.type}`);
               
            } else {
                return false
            }
        }
    }

}
