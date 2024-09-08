# Main Menu Select Module

This module provides functionality for handling a simple main menu selection interface in a battle system.

## Functions

### makeRoot()

Creates a new main menu selection interface.

#### Returns

An object with the following methods:

- `pressUp()`: Moves the selection up
- `pressDown()`: Moves the selection down
- `pressAccept()`: Accepts the current selection
- `pressCancel()`: Cancels the selection
- `getRenderInfo()`: Gets information for rendering the menu

## Usage

```javascript
import { makeRoot } from './mainMenuSelect.js';

const mainMenu = makeRoot();

// Navigate the menu
mainMenu.pressDown(); // Selects 'Magic'
mainMenu.pressUp();   // Selects 'Attack' again

// Accept the current selection
const selectedOption = mainMenu.pressAccept();
console.log(selectedOption); // 'Attack'

// Get render information
const renderInfo = mainMenu.getRenderInfo();
console.log(renderInfo);
```

## Menu Structure

The main menu consists of four options:
1. Attack
2. Magic
3. Skill
4. Item

## Methods

### pressUp()

Moves the selection up by one position.

#### Returns
- `String|undefined`: The newly selected option, or `undefined` if already at the top

### pressDown()

Moves the selection down by one position.

#### Returns
- `String|undefined`: The newly selected option, or `undefined` if already at the bottom

### pressAccept()

Accepts the currently selected option.

#### Returns
- `String`: The currently selected option

### pressCancel()

Cancels the selection.

#### Returns
- `false`: Always returns false

### getRenderInfo()

Provides information for rendering the menu.

#### Returns
An object with:
- `size`: Object containing `heightInLines` and `widthInColumns`
- `contents`: Array of menu items, each with `text`, `position`, and `selected` properties

## Testing

The accompanying test file (`mainMenuSelect.test.js`) includes tests for:

- Moving the selection up and down
- Boundary checks for selection movement
- Accepting the current selection
- Cancelling the selection
- Verifying render information structure and updates

Key test cases:
- Ensure selection doesn't move beyond menu boundaries
- Verify correct option is returned when accepting
- Check that render information accurately reflects the current state

Run the tests to ensure the module is functioning as expected.