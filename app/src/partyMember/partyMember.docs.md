# Party Member Module

This module provides functionality to create and manage party members in an RPG-style game.

## Functions

### createPartyMember(props)

Creates a new party member with the given properties.

#### Parameters

- `props` (Object): An object containing the party member's properties:
  - `stats` (Object): Base statistics of the party member
    - `hp` (Number): Maximum hit points
    - `mp` (Number): Maximum magic points
    - `str_phy` (Number): Physical strength
    - `str_mag` (Number): Magical strength
    - `def_phy` (Number): Physical defense
    - `def_mag` (Number): Magical defense
    - `speed` (Number): Speed
  - `equip` (Object): Equipment bonuses
    - `str_phy` (Number): Physical strength bonus
    - `str_mag` (Number): Magical strength bonus
    - `str_elem` (String): Elemental strength type
    - `def_elem` (String): Elemental defense type
    - `def_phy` (Number): Physical defense bonus
    - `def_mag` (Number): Magical defense bonus
  - `current` (Object): Current status
    - `hp` (Number): Current hit points
    - `mp` (Number): Current magic points
  - `partyMemberId` (String): Unique identifier for the party member type
  - `name` (String): Party member's name

#### Returns

An object with the following methods:

- `getId()`: Returns the party member's unique ID
- `getHp()`: Returns the party member's current HP
- `getMp()`: Returns the party member's current MP
- `applyDamage({sourceElement, damage})`: Applies damage to the party member
- `applyHpUp(amount)`: Increases the party member's HP
- `applyMpUp(amount)`: Increases the party member's MP
- `getStatusData()`: Returns basic status information
- `requestActionOptions()`: Returns available actions for the party member

## Usage

```javascript
import { createPartyMember } from './partyMember.js';

const hero = createPartyMember({
  stats: {
    hp: 1000,
    mp: 1000,
    str_phy: 30,
    str_mag: 30,
    def_phy: 30,
    def_mag: 30,
    speed: 30,
  },
  equip: {
    str_phy: 30, 
    str_mag: 30, 
    str_elem: 'none', 
    def_elem: 'none', 
    def_phy: 30, 
    def_mag: 30
  },
  current: {
    hp: 500,
    mp: 500
  },
  partyMemberId: '100',
  name: 'Hero'
});

// Apply damage
const damageTaken = hero.applyDamage({ sourceElement: 'fire', damage: 100 });
console.log(hero.getHp()); // New HP after damage

// Heal
hero.applyHpUp(50);
console.log(hero.getHp()); // New HP after healing

// Get action options
const actions = hero.requestActionOptions();
console.log(actions); // Available actions
```

## Methods

### applyDamage({sourceElement, damage})

Applies damage to the party member, considering defenses and elemental effects.

### applyHpUp(amount)

Increases the party member's HP, not exceeding maximum HP.

### applyMpUp(amount)

Increases the party member's MP, not exceeding maximum MP.

### getStatusData()

Returns an object with basic status information: name, current HP, and max HP.

### requestActionOptions()

Returns an array of available actions for the party member.

## Testing

The accompanying test file includes tests for:

- Applying damage and verifying defense calculations
- Increasing HP and MP
- Requesting action options

Run the tests to ensure the module is functioning as expected.