import { createMagicManager } from './magic_manager.js';
import { ACTION_TYPE, ELEMENT, STAT, STATUS_EFFECT } from './actions.js';

const playerMagicDefinitions = {
    'player1': {
        'fireball': {
            name: 'Fireball',
            mpCost: 5,
            action: {
                type: ACTION_TYPE['magic-attack'],
                strength: 10,
                element: ELEMENT.fire
            }
        },
        'heal': {
            name: 'Heal',
            mpCost: 8,
            action: {
                type: ACTION_TYPE['heal-hp'],
                strength: 20
            }
        }
    },
    'player2': {
        'iceBlast': {
            name: 'Ice Blast',
            mpCost: 6,
            action: {
                type: ACTION_TYPE['magic-attack'],
                strength: 12,
                element: ELEMENT.ice
            }
        },
        'strengthen': {
            name: 'Strengthen',
            mpCost: 10,
            action: {
                type: ACTION_TYPE['increase-stat'],
                strength: 5,
                stat: STAT.str_phy,
                duration: 3
            }
        }
    }
};

const magicManager = createMagicManager(playerMagicDefinitions);

// List all spells for player1
console.log(magicManager.listPlayerMagic('player1'));

// Cast a spell
const fireballAction = magicManager.castSpell('player1', 'fireball', 'enemy1');

// Check if player can cast a spell
const canCastHeal = magicManager.canCastSpell('player1', 'heal', 10);


// Get the MP cost of a spell
const healMpCost = magicManager.getMpCost('player1', 'heal');
console.log(`Heal spell MP cost: ${healMpCost}`);

// Add a new spell to a player's spell list
magicManager.addSpell('player1', 'thunderbolt', {
    name: 'Thunderbolt',
    mpCost: 7,
    action: {
        type: ACTION_TYPE['magic-attack'],
        strength: 15,
        element: ELEMENT.lightning
    }
});

// Remove a spell from a player's spell list
magicManager.removeSpell('player2', 'iceBlast');

// Try to cast a spell and handle potential errors
try {
    const strengthenAction = magicManager.castSpell('player2', 'strengthen', 'player1');
    console.log('Strengthen spell cast successfully:', strengthenAction);
} catch (error) {
    console.error('Error casting spell:', error.message);
}