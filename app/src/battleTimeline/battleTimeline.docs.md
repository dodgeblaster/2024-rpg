# Battle Timeline

The Battle Timeline module provides a flexible system for managing turn order in RPG-style games. It creates a timeline based on character speeds and allows for dynamic updates during gameplay.

## Installation

```javascript
import { createBattleTimeline } from './path/to/battleTimeline.js';
```

## Usage

### Creating a Battle Timeline

To create a new battle timeline, use the `createBattleTimeline` function:

```javascript
const battleTimeline = createBattleTimeline({
  players: [
    { id: 'player1', speed: 10 },
    { id: 'player2', speed: 8 },
    { id: 'player3', speed: 6 }
  ]
});
```

#### Parameters

- `players`: An array of player objects, each containing:
  - `id`: A unique identifier for the player (string)
  - `speed`: The player's speed value (number)

- `randomBetween0And` (optional): A custom function for generating random numbers. If not provided, a default function will be used.

### Accessing the Timeline

To get the current timeline:

```javascript
const currentTimeline = battleTimeline.timeline;
```

This returns an array of player IDs representing the turn order for the next 20 turns.

### Taking a Turn

When a player takes their turn, update the timeline using the `takeTurn` method:

```javascript
const newTimeline = battleTimeline.takeTurn({ id: 'player1', offset: 0 });
```

#### Parameters

- `id`: The ID of the player taking the turn (string)
- `offset`: Any additional offset to apply to the player's points (number)

This method returns the updated timeline.

### Recalculating the Timeline

To recalculate the timeline with potential offsets:

```javascript
const newTimeline = battleTimeline.getTimeline({
  potentialOffset: { id: 'player2', offset: 5 }
});
```

#### Parameters

- `potentialOffset` (optional): An object containing:
  - `id`: The ID of the player to apply the offset to (string)
  - `offset`: The offset to apply (number)

This method returns the recalculated timeline.

## How It Works

The battle timeline system works as follows:

1. Players are initialized with their speed, points (starting at 0), and offset (starting at 0).
2. The system determines the highest speed among all players.
3. For each turn:
   - The player(s) with the lowest points is selected (randomly if there's a tie).
   - The selected player gains points based on the formula: `(highest_speed * 2.5) - player_speed`.
   - Offsets are applied to adjust effective points without changing actual points.
4. This process repeats until a timeline of 20 turns is generated.

The system favors faster characters (higher speed) while still giving slower characters opportunities to act.

## Example

```javascript
const battleTimeline = createBattleTimeline({
  players: [
    { id: 'warrior', speed: 10 },
    { id: 'mage', speed: 8 },
    { id: 'healer', speed: 6 }
  ]
});

console.log(battleTimeline.timeline);
// Example output: ['warrior', 'mage', 'healer', 'warrior', ...]

const newTimeline = battleTimeline.takeTurn({ id: 'mage', offset: 2 });
console.log(newTimeline);
// Updated timeline after mage's turn
```

This system provides a balanced and dynamic turn order for RPG-style games, allowing for strategic gameplay based on character speeds and potential in-game effects (represented by offsets).

## What is the point of the offset?

The offset serves as a flexible mechanism to temporarily adjust a player's turn order without permanently changing their base speed or accumulated points. This feature is particularly useful for implementing various in-game effects or strategic elements. Here are some key purposes and use cases for the offset:

1. Temporary Status Effects:
   - Haste or Slow spells: You can use a positive offset to simulate a haste effect (making a character act sooner) or a negative offset for a slow effect (delaying their next turn).
   - Stun or Paralysis: A large negative offset could represent a character being stunned, effectively pushing their next turn further into the future.

2. Equipment or Ability Bonuses:
   - Speed-boosting items: If a character equips an item that temporarily increases their speed, you can use a positive offset to represent this boost without changing their base speed.
   - Special abilities: Some characters might have abilities that let them act sooner in certain situations, which can be modeled with a positive offset.

3. Strategic Gameplay Elements:
   - Delaying actions: In some games, players might choose to delay their turn. This could be represented by applying a negative offset to their next turn.
   - Priority actions: Conversely, certain high-priority actions might need to happen sooner, which can be achieved with a positive offset.

4. Balancing Mechanics:
   - Catch-up feature: You could implement a catch-up mechanism for characters who haven't acted in a while by giving them a positive offset.
   - Boss fight mechanics: Special boss abilities or phase changes could be triggered by manipulating the turn order through offsets.

5. Dynamic Difficulty Adjustment:
   - If the game needs to adjust difficulty on the fly, it could give players positive or negative offsets to subtly control the pace of battle.

6. Conditional Effects:
   - Some abilities or status effects might change a character's turn frequency based on certain conditions. Offsets provide a way to implement these without altering the core speed calculations.

The key advantage of using offsets is that they provide a layer of flexibility on top of the base speed system. They allow for temporary adjustments that don't permanently alter a character's stats or disrupt the long-term balance of the turn order system. This makes it easier to implement a wide range of gameplay mechanics and effects while maintaining the integrity of the underlying speed-based turn order.