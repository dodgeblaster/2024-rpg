# Magic Select Module

This module provides functionality for handling a magic selection interface in a battle system, allowing for a grid-based selection of magic spells.

## Functions

### groupItems(items)

A helper function that groups an array of items into subarrays of three items each.

#### Parameters
- `items` (Array): The array of items to group

#### Returns
- `Array`: An array of subarrays, each containing up to three items

### makeMagic(magicList)

Creates a new magic selection interface.

#### Parameters
- `magicList` (Array): An array of magic spell names

#### Returns

An object with the following methods:

- `pressUp()`: Moves the selection up
- `pressDown()`: Moves the selection down
- `pressLeft()`: Moves the selection left
- `pressRight()`: Moves the selection right
- `pressAccept()`: Accepts the current selection
- `pressCancel()`: Cancels the selection
- `getRenderInfo()`: Gets information for rendering the menu

## Usage

```javascript
import { makeMagic } from './magicSelect.js';

const magicList = ['Fire', 'Ice', 'Thunder', 'Cure', 'Poison', 'Sleep'];
const magicMenu = makeMagic(magicList);

// Navigate the menu
magicMenu.pressRight(); // Selects 'Ice'
magicMenu.pressDown();  // Selects 'Poison'

// Accept the current selection
const selectedSpell = magicMenu.pressAccept();
console.log(selectedSpell); // 'Poison'

// Get render information
const renderInfo = magicMenu.getRenderInfo();
console.log(renderInfo);
```

## Methods

### pressUp()

Moves the selection up by one position.

#### Returns
- `String|undefined`: The newly selected spell, or `undefined` if already at the top

### pressDown()

Moves the selection down by one position.

#### Returns
- `String|undefined`: The newly selected spell, or `undefined` if already at the bottom

### pressLeft()

Moves the selection left by one position.

#### Returns
- `String|undefined`: The newly selected spell, or `undefined` if already at the leftmost column

### pressRight()

Moves the selection right by one position.

#### Returns
- `String|undefined`: The newly selected spell, or `undefined` if already at the rightmost column

### pressAccept()

Accepts the currently selected spell.

#### Returns
- `String`: The currently selected spell

### pressCancel()

Cancels the selection.

#### Returns
- `false`: Always returns false

### getRenderInfo()

Provides information for rendering the magic selection menu.

#### Returns
An object with:
- `size`: Object containing `heightInLines` and `widthInColumns`
- `contents`: Array of menu items, each with `text`, `position`, and `selected` properties

## Testing

The accompanying test file (`magicSelect.test.js`) includes tests for:

- Moving the selection up, down, left, and right
- Boundary checks for selection movement in all directions
- Accepting the current selection
- Cancelling the selection
- Verifying render information structure and updates
- Checking window position updates for scrolling

Key test cases:
- Ensure selection doesn't move beyond menu boundaries in any direction
- Verify correct spell is returned when accepting
- Check that render information accurately reflects the current state
- Test scrolling behavior for lists longer than the display window

Run the tests to ensure the module is functioning as expected.