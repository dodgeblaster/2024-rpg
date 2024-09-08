import { randomBetween0And as defaultRandomBetween0And } from '../utils/utils.js';
import { determineHighestSpeed,
    initializeSpeedState,
    findLowestPointsPlayers,
    selectPlayer,
    updatePlayerPoints,
    adjustOffsets
} from './helpers.js'

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {number} speed
 * @property {number} points
 * @property {number} offset
 */

/**
 * @typedef {Object} SpeedState
 * @property {Object} [playerId]
 * @property {string} [playerId].id
 * @property {number} [playerId].speed
 * @property {number} [playerId].points
 * @property {number} [playerId].offset
 */

/**
 * @typedef {Object} Input
 * @property {Object} [potentialOffset]
 * @property {string} [potentialOffset.id]
 * @property {number} [potentialOffset.offset]
 */

/**
 * @typedef {Object} CreateBattleTimelineDSInput
 * @property {Array<{id: string, speed: number}>} players
 * @property {function(number): number} [randomBetween0And]
 */

/**
 * @typedef {Object} BattleTimeline
 * @property {Player[]} players
 * @property {string[]} timeline
 * @property {function(TakeTurnInput): string[]} takeTurn
 * @property {function(Input): string[]} getTimeline
 */

/**
 * Calculates the timeline for the next 20 turns.
 * 
 * param {Input} input - Input object.
 * param {Player[]} players - Array of player objects.
 * param {function(number): number} randomBetween0And - Random number generator function.
 * returns {string[]} Array of player IDs representing the turn order.
 */
function calculateTimeline(input, players, randomBetween0And) {
    const highestSpeed = determineHighestSpeed(players);
    let speedState = initializeSpeedState(players, input);
    const timeline = [];

    for (let i = 0; i < 20; i++) {
        const lowestIds = findLowestPointsPlayers(speedState);
        const selected = selectPlayer(lowestIds, speedState, randomBetween0And);

        speedState[selected.id].points = updatePlayerPoints(selected, highestSpeed);
        speedState = adjustOffsets(speedState);
        timeline.push(selected.id);
    }

    return timeline;
}

/**
 * Processes a player's turn and recalculates the timeline.
 * 
 * property {string} id
 * property {number} offset
 * param {Player[]} players - Array of player objects.
 * param {function(number): number} randomBetween0And - Random number generator function.
 * returns {string[]} Updated timeline.
 */
function takeTurn(id, offset, players, randomBetween0And) {
    const highestSpeed = determineHighestSpeed(players);
    const index = players.findIndex(x => x.id === id);
    const pointsToAdd = highestSpeed * 2.5 - players[index].speed;
    players[index].points += pointsToAdd;
    players[index].offset += offset;
    return calculateTimeline({}, players, randomBetween0And);
}



/**
 * Creates a battle timeline data structure.
 * param {CreateBattleTimelineDSInput} input - Input object containing players and optional random function.
 * returns {BattleTimeline} Battle timeline object with methods.
 */
export function createBattleTimeline(input) {
    if (!input.players || input.players.length === 0) {
        throw new Error('Timeline needs at least 1 player');
    }

    const randomBetween0And = input.randomBetween0And || defaultRandomBetween0And;
    const players = input.players.map((x) => ({
        ...x,
        offset: 0,
        points: 0
    }));

    let timeline = calculateTimeline({}, players, randomBetween0And);

    return {
        players,
        timeline,
        takeTurn: ({id, offset}) => takeTurn(id, offset, players, randomBetween0And),
        getTimeline: (input) => calculateTimeline(input, players, randomBetween0And)
    };
}