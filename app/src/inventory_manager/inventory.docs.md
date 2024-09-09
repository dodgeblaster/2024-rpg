# Inventory Module

This module provides functionality to create and manage an inventory system for items in a game.

## Functions

### createInventory(itemDefinitions, items = {})

Creates a new inventory with the given item definitions and initial items.

#### Parameters

- `itemDefinitions` (Object): An object containing definitions for all possible items. Each item definition should have the following structure:
  - `id` (String): Unique identifier for the item
  - `name` (String): Display name of the item
  - `action` (Object): Effect of using the item
    - `effect` (String): Type of effect (e.g., 'hp:add')
    - `strength` (Number): Magnitude of the effect

- `items` (Object, optional): Initial inventory state. A record of item IDs and their quantities. Defaults to an empty object.

#### Returns

An object with the following methods:

- `listAllItems()`: Returns an array of all items in the inventory with their quantities
- `takeItem(id)`: Attempts to use an item from the inventory

## Usage

```javascript
import { createInventory } from './inventory.js';

const itemDefinitions = {
  potion: {
    id: 'potion',
    name: 'Potion',
    action: {
      effect: 'hp:add',
      strength: 100
    }
  }
};

const inventory = createInventory(itemDefinitions, { potion: 2 });

// List all items in the inventory
console.log(inventory.listAllItems());
// [{id: 'potion', name: 'Potion', amount: 2}]

// Use an item
const action = inventory.takeItem('potion');
console.log(action);
// { effect: 'hp:add', strength: 100 }

// Check updated inventory
console.log(inventory.listAllItems());
// [{id: 'potion', name: 'Potion', amount: 1}]
```

## Methods

### listAllItems()

Returns an array of all items in the inventory.

#### Returns

An array of objects, each containing:
- `id` (String): Item's unique identifier
- `name` (String): Item's display name
- `amount` (Number): Quantity of the item in the inventory

### takeItem(id)

Attempts to use an item from the inventory.

#### Parameters

- `id` (String): The unique identifier of the item to use

#### Returns

- If the item is available, returns the `action` object associated with the item and decrements the item count
- If the item is not available (quantity is 0), returns `false`

## Testing

The accompanying test file includes tests for:

- Listing all items in the inventory
- Using an item and verifying the returned action
- Checking that the item count decrements after use

Run the tests to ensure the module is functioning as expected.