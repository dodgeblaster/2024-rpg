# Action Utilities Module

This module provides utility functions for creating and managing different types of actions in a game system.

## Constants

- `availableTargets`: Object defining valid target types for actions.
- `availableStatuss`: Object defining valid status effects.
- `availableActions`: Object defining valid action types.

## Functions

### createEventAction(props)

Creates an event-triggered action.

#### Parameters

- `props` (Object):
  - `name` (String): Name of the action
  - `effect` (String): Effect of the action (format: 'status:action')
  - `target` (String): Target of the action
  - `strength` (Number): Strength or magnitude of the action
  - `priority` (Number): Priority of the action
  - `event` (String): Triggering event name

#### Returns

- `Object`: The created event action

#### Throws

- `Error`: If invalid target, effect, or action is provided

### createWeightedAction(props)

Creates a weighted action for random selection.

#### Parameters

- `props` (Object):
  - `name` (String): Name of the action
  - `strength` (Number): Strength or magnitude of the action
  - `effect` (String): Effect of the action (format: 'status:action')
  - `target` (String): Target of the action
  - `weight` (Number): Weight for random selection

#### Returns

- `Object`: The created weighted action

#### Throws

- `Error`: If invalid target, effect, or action is provided

### createPhaseAction(props)

Creates a phase-dependent action.

#### Parameters

- `props` (Object):
  - `name` (String): Name of the action
  - `strength` (Number): Strength or magnitude of the action
  - `effect` (String): Effect of the action (format: 'status:action')
  - `target` (String): Target of the action
  - `weight` (Number): Weight for random selection
  - `maxHp` (Number): Maximum HP threshold for the action
  - `minHp` (Number): Minimum HP threshold for the action

#### Returns

- `Object`: The created phase action

#### Throws

- `Error`: If invalid target, effect, or action is provided

### determineEventAction(events, eventActions)

Determines the highest priority event action based on occurred events.

#### Parameters

- `events` (Array): List of occurred events
- `eventActions` (Array): List of possible event actions

#### Returns

- `Object|false`: The highest priority matching event action, or false if no match

### selectWeightedAction(actions)

Selects a random action based on weights.

#### Parameters

- `actions` (Array): List of weighted actions

#### Returns

- `Object`: The selected action

### determinePhaseActions(actions, maxHp, currentHp)

Filters actions based on current HP percentage.

#### Parameters

- `actions` (Array): List of phase actions
- `maxHp` (Number): Maximum HP
- `currentHp` (Number): Current HP

#### Returns

- `Array`: List of applicable actions for the current HP phase

## Usage

```javascript
import { createEventAction, determineEventAction, selectWeightedAction } from './actionUtils.js';

// Create an event action
const healAction = createEventAction({
  name: 'Emergency Heal',
  effect: 'hp:add',
  target: 'party:single',
  strength: 100,
  priority: 200,
  event: 'lowHealth'
});

// Determine event action
const events = [{ name: 'lowHealth' }];
const eventActions = [healAction];
const selectedAction = determineEventAction(events, eventActions);

// Select weighted action
const weightedActions = [
  createWeightedAction({ name: 'Attack', weight: 2, ... }),
  createWeightedAction({ name: 'Defend', weight: 1, ... })
];
const randomAction = selectWeightedAction(weightedActions);
```

## Testing

The accompanying test file includes tests for:

- Selecting weighted actions
- Determining event actions based on occurred events
- Handling multiple matching event actions with different priorities

Run the tests to ensure the module is functioning as expected.