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
 * Determines the highest speed among all players.
 * param {Player[]} players - Array of player objects.
 * returns {number} The highest speed value.
 */
export function determineHighestSpeed(players) {
    if (players.length === 0) return 0
    return Math.max(...players.map(x => x.speed));
}

/**
 * Initializes the speed state for all players.
 * param {Player[]} players - Array of player objects.
 * param {Input} input - Input object containing potential offset.
 * returns {SpeedState} Speed state for all players.
 */
export function initializeSpeedState(players, input) {
    const speedState = {};

    for (const player of players) {
        let offset = player.offset;

        if (input.potentialOffset && input.potentialOffset.id === player.id) {
            offset += input.potentialOffset.offset;
        }

        speedState[player.id] = {
            id: player.id,
            speed: player.speed,
            points: player.points,
            offset: offset
        };
    }

    return speedState;
}

/**
 * Finds players with the lowest points.
 * param {SpeedState} speedState - Speed state of all players.
 * returns {string[]} Array of player IDs with the lowest points.
 */
export function findLowestPointsPlayers(speedState) {
    let currentLowest = Infinity;
    let whoHasTheLowest = {};

    Object.values(speedState).forEach(item => {
        const points = item.points + item.offset;
        if (points < currentLowest) {
            whoHasTheLowest = { [item.id]: true };
            currentLowest = points;
        } else if (points === currentLowest) {
            whoHasTheLowest[item.id] = true;
        }
    });

    return Object.keys(whoHasTheLowest);
}

/**
 * Selects a player from the list of players with lowest points.
 * param {string[]} lowestIds - Array of player IDs with lowest points.
 * param {SpeedState} speedState - Speed state of all players.
 * param {function(number): number} randomBetween0And - Random number generator function.
 * returns {Player} Selected player object.
 */
export function selectPlayer(lowestIds, speedState, randomBetween0And) {
    if (lowestIds.length > 1) {
        const chosenIndex = randomBetween0And(lowestIds.length);
        return speedState[lowestIds[chosenIndex]];
    }
    return speedState[lowestIds[0]];
}

/**
 * Update Player Points
 * param {Player} player
 * param {number} highestSpeed
 * returns {number}
 */
export function updatePlayerPoints(player, highestSpeed) {
    const pointsToAdd = highestSpeed * 2.5 - player.speed;
    return pointsToAdd + player.points
}

/**
 * Adjust Offsets
 * param {SpeedState} speedState
 * returns {SpeedState}
 */
export function adjustOffsets(speedState) {
    // Convert the speedState object to an array of entries
    const entries = Object.entries(speedState);

    // Process each entry
    const adjustedEntries = entries.map(([key, item]) => {
        let newOffset = item.offset;

        // Adjust the offset based on its current value
        if (newOffset > 2) {
            newOffset = Math.floor(newOffset / 2);
        } else if (newOffset > 0) {
            newOffset = 0;
        }

        // Return a new entry with the adjusted offset
        return [key, { ...item, offset: newOffset }];
    });

    // Convert the adjusted entries back to an object
    return Object.fromEntries(adjustedEntries);
}
