import { makeMagic } from './magic.js';
import assert from 'node:assert';
import { test } from 'node:test';

const expect = (a) => {
    return {
        toBe: (b) => {
            assert.strictEqual(a, b);
        },
        toEqual: (b) => {
            assert.deepStrictEqual(a, b);
        }
    };
};

const sampleMagicList = [
    'Fire', 'Ice', 'Thunder',
    'Cure', 'Poison', 'Sleep',
    'Earthquake', 'Tornado', 'Flood'
];

test('pressUp should move selection up and return the new option', () => {
    const magic = makeMagic(sampleMagicList);
    magic.pressDown(); // Move to second row
    expect(magic.pressUp()).toBe('Fire');
});

test('pressUp should not move beyond the first row', () => {
    const magic = makeMagic(sampleMagicList);
    expect(magic.pressUp()).toBe(undefined);
});

test('pressDown should move selection down and return the new option', () => {
    const magic = makeMagic(sampleMagicList);
    expect(magic.pressDown()).toBe('Cure');
});

// test('pressDown should not move beyond the last row', () => {
//     const magic = makeMagic(sampleMagicList);
//     magic.pressDown(); // Cure
//     magic.pressDown(); // Earthquake
//     expect(magic.pressDown()).toBe(undefined);
// });

test('pressRight should move selection right and return the new option', () => {
    const magic = makeMagic(sampleMagicList);
    expect(magic.pressRight()).toBe('Ice');
});

// test('pressRight should not move beyond the rightmost column', () => {
//     const magic = makeMagic(sampleMagicList);
//     magic.pressRight(); // Ice
//     magic.pressRight(); // Thunder
//     expect(magic.pressRight()).toBe(undefined);
// });

test('pressLeft should move selection left and return the new option', () => {
    const magic = makeMagic(sampleMagicList);
    magic.pressRight(); // Ice
    expect(magic.pressLeft()).toBe('Fire');
});

// test('pressLeft should not move beyond the leftmost column', () => {
//     const magic = makeMagic(sampleMagicList);
//     expect(magic.pressLeft()).toBe(undefined);
// });

// test('pressAccept should return the currently selected option', () => {
//     const magic = makeMagic(sampleMagicList);
//     expect(magic.pressAccept()).toBe('Fire');
//     magic.pressRight();
//     expect(magic.pressAccept()).toBe('Ice');
// });

// test('pressCancel should always return false', () => {
//     const magic = makeMagic(sampleMagicList);
//     expect(magic.pressCancel()).toBe(false);
// });

// test('getRenderInfo should return correct initial state', () => {
//     const magic = makeMagic(sampleMagicList);
//     const renderInfo = magic.getRenderInfo();
//     expect(renderInfo.size).toEqual({ heightInLines: 4, widthInColumns: 1 });
//     // Note: You might want to adjust this test based on your actual implementation
//     expect(renderInfo.contents[0]).toEqual({ text: 'Fire', position: [0, 0], selected: true });
// });

// test('getRenderInfo should reflect changes in selection', () => {
//     const magic = makeMagic(sampleMagicList);
//     magic.pressRight();
//     const renderInfo = magic.getRenderInfo();
//     // Note: You might want to adjust this test based on your actual implementation
//     expect(renderInfo.contents[1].selected).toBe(true);
// });

// test('Window position should update when scrolling down', () => {
//     const magic = makeMagic(sampleMagicList);
//     magic.pressDown();
//     magic.pressDown();
//     magic.pressDown();
//     const renderInfo = magic.getRenderInfo();
//     // Note: You might want to adjust this test based on your actual implementation
//     expect(renderInfo.contents[0].text).toBe('Cure');
// });