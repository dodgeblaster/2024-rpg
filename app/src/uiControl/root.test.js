import { makeRoot } from './root.js';
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

test('pressUp should move selection up and return the new option', () => {
    const root = makeRoot();
    root.pressDown(); // Move to 'Magic'
    expect(root.pressUp()).toBe('Attack');
});

test('pressUp should not move beyond the first option', () => {
    const root = makeRoot();
    expect(root.pressUp()).toBe(undefined);
});

test('pressDown should move selection down and return the new option', () => {
    const root = makeRoot();
    expect(root.pressDown()).toBe('Magic');
});

test('pressDown should not move beyond the last option', () => {
    const root = makeRoot();
    root.pressDown(); // Magic
    root.pressDown(); // Skill
    root.pressDown(); // Item
    expect(root.pressDown()).toBe(undefined);
});

test('pressAccept should return the currently selected option', () => {
    const root = makeRoot();
    expect(root.pressAccept()).toBe('Attack');
    root.pressDown();
    expect(root.pressAccept()).toBe('Magic');
});

test('pressCancel should always return false', () => {
    const root = makeRoot();
    expect(root.pressCancel()).toBe(false);
});

test('getRenderInfo should return correct initial state', () => {
    const root = makeRoot();
    const renderInfo = root.getRenderInfo();
    expect(renderInfo.size).toEqual({ heightInLines: 4, widthInColumns: 1 });
    expect(renderInfo.contents[0]).toEqual({ text: 'Attack', position: [0, 0], selected: true });
    expect(renderInfo.contents[1]).toEqual({ text: 'Magic', position: [0, 1], selected: false });
    expect(renderInfo.contents[2]).toEqual({ text: 'Skill', position: [0, 2], selected: false });
    expect(renderInfo.contents[3]).toEqual({ text: 'Items', position: [0, 3], selected: false });
});

test('getRenderInfo should reflect changes in selection', () => {
    const root = makeRoot();
    root.pressDown();
    const renderInfo = root.getRenderInfo();
    expect(renderInfo.contents[0].selected).toBe(false);
    expect(renderInfo.contents[1].selected).toBe(true);
});