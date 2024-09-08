
# Enemy Module

This module provides functionality to create and manage enemy entities in an RPG game.

## Functions

### createEnemy(props)

Creates a new enemy with the given properties.

#### Parameters

- `props` (Object): An object containing the enemy's properties:
  - `maxHp` (Number): Maximum hit points
  - `hp` (Number): Current hit points
  - `maxMp` (Number): Maximum magic points
  - `mp` (Number): Current magic points
  - `speed` (Number): Enemy's speed
  - `element` (String): Enemy's elemental type
  - `enemyId` (String): Unique identifier for the enemy type
  - `name` (String): Enemy's name
  - `actions` (Object, optional): Custom actions for the enemy. If not provided, default actions will be used.

#### Returns

An object with the following methods:

- `getId()`: Returns the enemy's unique ID
- `getName()`: Returns the enemy's name
- `getHp()`: Returns the enemy's current HP
- `getMp()`: Returns the enemy's current MP
- `applyDamage({sourceElement, damage})`: Applies damage to the enemy, considering elemental effects
- `requestAction(events = [])`: Requests an action from the enemy based on current state and events

## Usage

```javascript
import { createEnemy } from './enemy.js';

const enemy = createEnemy({
  maxHp: 200,
  hp: 200,
  maxMp: 50,
  mp: 50,
  speed: 10,
  element: 'fire',
  enemyId: 'dragon',
  name: 'Fire Dragon'
});

// Get enemy's current HP
console.log(enemy.getHp()); // 200

// Apply damage to the enemy
enemy.applyDamage({ sourceElement: 'water', damage: 50 });

// Request an action from the enemy
const action = enemy.requestAction();
console.log(action.name); // e.g., "punch"
```

## Action Types

The enemy can have three types of actions:

1. **Normal Actions**: Basic actions available at all times
2. **Phase Actions**: Actions that become available based on the enemy's current HP
3. **Event Actions**: Actions triggered by specific game events

## Testing

The accompanying test file (`enemy.test.js`) includes tests for:

- Applying damage to the enemy
- Elemental damage effects
- Requesting normal actions
- Requesting phase actions
- Requesting event actions

Run the tests to ensure the module is functioning as expected.