import { 
    createPhysicalAttackAction, 
    createMagicAttackAction, 
    createHealHpAction, 
    createHealMpAction, 
    createIncreaseStatAction, 
    createDecreaseStatAction, 
    createApplyStatusAction,
    ACTION_TYPE
} from './actions.js';

export function createMagicManager(playerMagicDefinitions) {
    const state = {
        playerMagic: { ...playerMagicDefinitions }
    };

    return {
        listPlayerMagic: (playerId) => {
            if (!state.playerMagic[playerId]) {
                throw new Error(`Player with id ${playerId} not found`);
            }
            return Object.entries(state.playerMagic[playerId]).map(([spellId, spell]) => ({
                id: spellId,
                name: spell.name,
                mpCost: spell.mpCost,
                type: spell.action.type
            }));
        },

        castSpell: (playerId, spellId, targetId) => {
            if (!state.playerMagic[playerId]) {
                throw new Error(`Player with id ${playerId} not found`);
            }

            const spell = state.playerMagic[playerId][spellId];
            if (!spell) {
                throw new Error(`Spell with id ${spellId} not found for player ${playerId}`);
            }

            const action = spell.action;

            switch (action.type) {
                case ACTION_TYPE['physical-attack']:
                    return createPhysicalAttackAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name,
                        element: action.element
                    });

                case ACTION_TYPE['magic-attack']:
                    return createMagicAttackAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name,
                        element: action.element
                    });

                case ACTION_TYPE['heal-hp']:
                    return createHealHpAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name
                    });

                case ACTION_TYPE['heal-mp']:
                    return createHealMpAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name
                    });

                case ACTION_TYPE['increase-stat']:
                    return createIncreaseStatAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name,
                        stat: action.stat,
                        duration: action.duration
                    });

                case ACTION_TYPE['decrease-stat']:
                    return createDecreaseStatAction({
                        source: playerId,
                        target: targetId,
                        strength: action.strength,
                        name: spell.name,
                        stat: action.stat,
                        duration: action.duration
                    });

                case ACTION_TYPE['apply-status']:
                    return createApplyStatusAction({
                        source: playerId,
                        target: targetId,
                        name: spell.name,
                        status: action.status,
                        duration: action.duration
                    });

                default:
                    throw new Error(`Unknown action type: ${action.type}`);
            }
        },
        getMpCost: (playerId, spellId) => {
            if (!state.playerMagic[playerId] || !state.playerMagic[playerId][spellId]) {
                throw new Error(`Spell with id ${spellId} not found for player ${playerId}`);
            }
            return state.playerMagic[playerId][spellId].mpCost;
        },

        canCastSpell: (playerId, spellId, currentMp) => {
            if (!state.playerMagic[playerId] || !state.playerMagic[playerId][spellId]) {
                throw new Error(`Spell with id ${spellId} not found for player ${playerId}`);
            }
            return currentMp >= state.playerMagic[playerId][spellId].mpCost;
        },

        addSpell: (playerId, spellId, spellDefinition) => {
            if (!state.playerMagic[playerId]) {
                state.playerMagic[playerId] = {};
            }
            state.playerMagic[playerId][spellId] = spellDefinition;
        },

        removeSpell: (playerId, spellId) => {
            if (state.playerMagic[playerId] && state.playerMagic[playerId][spellId]) {
                delete state.playerMagic[playerId][spellId];
            }
        }
    };
}