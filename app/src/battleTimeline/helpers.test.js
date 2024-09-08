import assert from 'node:assert';
import { test } from 'node:test';
import {
    determineHighestSpeed,
    initializeSpeedState,
    findLowestPointsPlayers,
    selectPlayer,
    updatePlayerPoints,
    adjustOffsets
} from './helpers.js';

const expect = (a) => ({
    toBe: (b) => {
        assert.equal(a, b);
    },
    toEqual: (b) => {
        assert.deepStrictEqual(a, b);
    }
});

/**
 * DetermineHighestSpeed
 */
test('determineHighestSpeed', () => {
    const players = [
        { id: '1', speed: 5 },
        { id: '2', speed: 7 },
        { id: '3', speed: 10 }
    ];
    expect(determineHighestSpeed(players)).toBe(10);
});

test('determineHighestSpeed with negative speeds', () => {
    const players = [
        { id: '1', speed: -5 },
        { id: '2', speed: -7 },
        { id: '3', speed: -3 }
    ];
    expect(determineHighestSpeed(players)).toBe(-3);
});

test('determineHighestSpeed with all zero speeds', () => {
    const players = [
        { id: '1', speed: 0 },
        { id: '2', speed: 0 },
        { id: '3', speed: 0 }
    ];
    expect(determineHighestSpeed(players)).toBe(0);
});

test('determineHighestSpeed with Infinity', () => {
    const players = [
        { id: '1', speed: 5 },
        { id: '2', speed: Infinity },
        { id: '3', speed: 10 }
    ];
    expect(determineHighestSpeed(players)).toBe(Infinity);
});

test('determineHighestSpeed with NaN speed', () => {
    const players = [
        { id: '1', speed: 5 },
        { id: '2', speed: NaN },
        { id: '3', speed: 10 }
    ];
    expect(determineHighestSpeed(players)).toBe(NaN);
});

test('determineHighestSpeed with duplicate highest speeds', () => {
    const players = [
        { id: '1', speed: 5 },
        { id: '2', speed: 10 },
        { id: '3', speed: 10 }
    ];
    expect(determineHighestSpeed(players)).toBe(10);
});

test('determineHighestSpeed with empty array', () => {
    const players = [];
    expect(determineHighestSpeed(players)).toBe(0);
});

/**
 * InitializeSpeedState
 */
test('initializeSpeedState', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0 },
        { id: '2', speed: 7, points: 0, offset: 0 }
    ];
    const input = { potentialOffset: { id: '1', offset: 2 } };
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 2 },
        '2': { id: '2', speed: 7, points: 0, offset: 0 }
    });
});

test('initializeSpeedState with no potential offset', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 1 },
        { id: '2', speed: 7, points: 0, offset: 2 }
    ];
    const input = {};
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 1 },
        '2': { id: '2', speed: 7, points: 0, offset: 2 }
    });
});

test('initializeSpeedState with empty players array', () => {
    const players = [];
    const input = {};
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({});
});

test('initializeSpeedState with potential offset for non-existent player', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0 },
        { id: '2', speed: 7, points: 0, offset: 0 }
    ];
    const input = { potentialOffset: { id: '3', offset: 2 } };
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 0 },
        '2': { id: '2', speed: 7, points: 0, offset: 0 }
    });
});

test('initializeSpeedState with fractional offsets', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0.5 },
        { id: '2', speed: 7, points: 0, offset: 1.5 }
    ];
    const input = { potentialOffset: { id: '1', offset: 0.7 } };
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 1.2 },
        '2': { id: '2', speed: 7, points: 0, offset: 1.5 }
    });
});

test('initializeSpeedState with Infinity offset', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0 },
        { id: '2', speed: 7, points: 0, offset: 0 }
    ];
    const input = { potentialOffset: { id: '1', offset: Infinity } };
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: Infinity },
        '2': { id: '2', speed: 7, points: 0, offset: 0 }
    });
});

test('initializeSpeedState with NaN offset', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0 },
        { id: '2', speed: 7, points: 0, offset: NaN }
    ];
    const input = {};
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 0 },
        '2': { id: '2', speed: 7, points: 0, offset: NaN }
    });
});

test('initializeSpeedState with object mutation check', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: 0 },
        { id: '2', speed: 7, points: 0, offset: 0 }
    ];
    const input = { potentialOffset: { id: '1', offset: 2 } };
    const result = initializeSpeedState(players, input);
    
    // Check that the original players array wasn't mutated
    expect(players[0].offset).toBe(0);
    expect(players[1].offset).toBe(0);
    
    // Check that the result is correct
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: 2 },
        '2': { id: '2', speed: 7, points: 0, offset: 0 }
    });
});

test('initializeSpeedState with negative offsets', () => {
    const players = [
        { id: '1', speed: 5, points: 0, offset: -2 },
        { id: '2', speed: 7, points: 0, offset: -1 }
    ];
    const input = { potentialOffset: { id: '1', offset: -3 } };
    const result = initializeSpeedState(players, input);
    expect(result).toEqual({
        '1': { id: '1', speed: 5, points: 0, offset: -5 },
        '2': { id: '2', speed: 7, points: 0, offset: -1 }
    });
});

/**
 * FindLowestPointsPlayers
 */
test('findLowestPointsPlayers', () => {
    const speedState = {
        '1': { id: '1', points: 10, offset: 0 },
        '2': { id: '2', points: 5, offset: 0 },
        '3': { id: '3', points: 5, offset: 0 },
        '4': { id: '4', points: 15, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['2', '3']);
});

test('findLowestPointsPlayers with empty speed state', () => {
    const speedState = {};
    expect(findLowestPointsPlayers(speedState)).toEqual([]);
});

test('findLowestPointsPlayers with all players having the same points', () => {
    const speedState = {
        '1': { id: '1', points: 10, offset: 0 },
        '2': { id: '2', points: 10, offset: 0 },
        '3': { id: '3', points: 10, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['1', '2', '3']);
});

test('findLowestPointsPlayers with fractional points and offsets', () => {
    const speedState = {
        '1': { id: '1', points: 10.5, offset: 0.3 },
        '2': { id: '2', points: 10.2, offset: 0.5 },
        '3': { id: '3', points: 10.3, offset: 0.4 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['2']);
});

test('findLowestPointsPlayers with Infinity and -Infinity', () => {
    const speedState = {
        '1': { id: '1', points: Infinity, offset: 0 },
        '2': { id: '2', points: 10, offset: 0 },
        '3': { id: '3', points: -Infinity, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['3']);
});

test('findLowestPointsPlayers with NaN points', () => {
    const speedState = {
        '1': { id: '1', points: 10, offset: 0 },
        '2': { id: '2', points: NaN, offset: 0 },
        '3': { id: '3', points: 5, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['3']);
});

test('findLowestPointsPlayers with very large numbers', () => {
    const speedState = {
        '1': { id: '1', points: Number.MAX_SAFE_INTEGER, offset: 0 },
        '2': { id: '2', points: Number.MAX_SAFE_INTEGER - 1, offset: 0 },
        '3': { id: '3', points: Number.MAX_SAFE_INTEGER + 1, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['2']);
});

test('findLowestPointsPlayers with equal total (points + offset)', () => {
    const speedState = {
        '1': { id: '1', points: 10, offset: 0 },
        '2': { id: '2', points: 8, offset: 2 },
        '3': { id: '3', points: 9, offset: 1 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['1', '2', '3']);
});

test('findLowestPointsPlayers with negative points and offsets', () => {
    const speedState = {
        '1': { id: '1', points: -9, offset: 5 },
        '2': { id: '2', points: 5, offset: -10 },
        '3': { id: '3', points: 1, offset: -5 },
        '4': { id: '4', points: -4, offset: 0 }
    };
    expect(findLowestPointsPlayers(speedState)).toEqual(['2']);
});

/**
 * SelectPlayer
 */
test('selectPlayer', () => {
    const lowestIds = ['1', '2', '3'];
    const speedState = {
        '1': { id: '1' },
        '2': { id: '2' },
        '3': { id: '3' }
    };
    const randomBetween0And = () => 1;
    expect(selectPlayer(lowestIds, speedState, randomBetween0And)).toEqual({ id: '2' });
});

test('selectPlayer with single player', () => {
    const lowestIds = ['1'];
    const speedState = { '1': { id: '1' } };
    const randomBetween0And = () => 0;
    expect(selectPlayer(lowestIds, speedState, randomBetween0And)).toEqual({ id: '1' });
});

test('selectPlayer with multiple players and last index', () => {
    const lowestIds = ['1', '2', '3'];
    const speedState = {
        '1': { id: '1' },
        '2': { id: '2' },
        '3': { id: '3' }
    };
    const randomBetween0And = () => 2;
    expect(selectPlayer(lowestIds, speedState, randomBetween0And)).toEqual({ id: '3' });
});

test('selectPlayer with single player and non-zero random', () => {
    const lowestIds = ['1'];
    const speedState = { '1': { id: '1' } };
    const randomBetween0And = () => 1;  // This should not affect the result
    expect(selectPlayer(lowestIds, speedState, randomBetween0And)).toEqual({ id: '1' });
});

test('selectPlayer with custom random function', () => {
    const lowestIds = ['1', '2', '3', '4'];
    const speedState = {
        '1': { id: '1' },
        '2': { id: '2' },
        '3': { id: '3' },
        '4': { id: '4' }
    };
    const customRandom = (max) => max - 1;  // Always selects the last element
    expect(selectPlayer(lowestIds, speedState, customRandom)).toEqual({ id: '4' });
});

/**
 * updatePlayerPoints
 */

test('updatePlayerPoints with zero highest speed', () => {
    const player = { speed: 5, points: 10 };
    const highestSpeed = 0;
    expect(updatePlayerPoints(player, highestSpeed)).toBe(5);
});

test('updatePlayerPoints with 10 highest speed', () => {
    const player = { speed: 5, points: 10 };
    const highestSpeed = 10;
    expect(updatePlayerPoints(player, highestSpeed)).toBe(30);
});

test('updatePlayerPoints with Infinity speed', () => {
    const player = { speed: Infinity, points: 10 };
    const highestSpeed = 20;
    expect(updatePlayerPoints(player, highestSpeed)).toBe(-Infinity);
});

test('updatePlayerPoints with NaN speed', () => {
    const player = { speed: NaN, points: 10 };
    const highestSpeed = 20;
    expect(updatePlayerPoints(player, highestSpeed)).toBe(NaN);
});

test('updatePlayerPoints with very large numbers', () => {
    const player = { speed: Number.MAX_SAFE_INTEGER, points: Number.MAX_SAFE_INTEGER };
    const highestSpeed = Number.MAX_SAFE_INTEGER;
    expect(updatePlayerPoints(player, highestSpeed)).toBe(Number.MAX_SAFE_INTEGER * 2.5);
});


/**
 * adjustOffsets
 */
test('adjustOffsets with empty speed state', () => {
    const speedState = {};
    const result = adjustOffsets(speedState);
    expect(result).toEqual({});
});

test('adjustOffsets with speed state', () => {
    const speedState = {
        '1': { id: '1', offset: 10 },
        '2': { id: '2', offset: 3 }
    };
    const result = adjustOffsets(speedState);
    expect(result).toEqual({
        '1': { id: '1', offset: 5 },
        '2': { id: '2', offset: 1 }
    });
});

test('adjustOffsets with fractional offsets', () => {
    const speedState = {
        '1': { id: '1', offset: 5.5 },
        '2': { id: '2', offset: 2.7 },
        '3': { id: '3', offset: 1.2 },
        '4': { id: '4', offset: 0.5 }
    };
    const result = adjustOffsets(speedState);
    expect(result).toEqual({
        '1': { id: '1', offset: 2 },
        '2': { id: '2', offset: 1 },
        '3': { id: '3', offset: 0 },
        '4': { id: '4', offset: 0 }
    });
});

test('adjustOffsets', () => {
    const speedState = {
        '1': { id: '1', offset: 5 },
        '2': { id: '2', offset: 2 },
        '3': { id: '3', offset: 1 },
        '4': { id: '4', offset: 0 }
    };
    const result = adjustOffsets(speedState);
    expect(result).toEqual({
        '1': { id: '1', offset: 2 },
        '2': { id: '2', offset: 0 },
        '3': { id: '3', offset: 0 },
        '4': { id: '4', offset: 0 }
    });
})

test('adjustOffsets with various offset values', () => {
    const speedState = {
        '1': { id: '1', offset: 10 },
        '2': { id: '2', offset: 3 },
        '3': { id: '3', offset: 2 },
        '4': { id: '4', offset: 1 },
        '5': { id: '5', offset: 0 },
        '6': { id: '6', offset: -1 }
    };
    const result = adjustOffsets(speedState);
    expect(result).toEqual({
        '1': { id: '1', offset: 5 },
        '2': { id: '2', offset: 1 },
        '3': { id: '3', offset: 0 },
        '4': { id: '4', offset: 0 },
        '5': { id: '5', offset: 0 },
        '6': { id: '6', offset: -1 }
    });
});

test('adjustOffsets with large negative offsets', () => {
    const speedState = {
        '1': { id: '1', offset: -10 },
        '2': { id: '2', offset: -3 }
    };
    const result = adjustOffsets(speedState);
    expect(result).toEqual({
        '1': { id: '1', offset: -10 },
        '2': { id: '2', offset: -3 }
    });
});