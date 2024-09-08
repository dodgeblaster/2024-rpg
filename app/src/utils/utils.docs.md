# Utility Functions Module

This module provides various utility functions for number manipulation, random generation, and damage calculation.

## Functions

### min0max9999(n)

Constrains a number between 0 and 9999.

#### Parameters
- `n` (Number): The input number

#### Returns
- `Number`: The constrained number

### min9999max9999(n)

Constrains a number between -9999 and 9999.

#### Parameters
- `n` (Number): The input number

#### Returns
- `Number`: The constrained number

### min0max(max)

Creates a function that constrains a number between 0 and a specified maximum.

#### Parameters
- `max` (Number): The maximum allowed value

#### Returns
- `Function`: A function that takes a number and constrains it

### randomBetween0And(max)

Generates a random integer between 0 (inclusive) and the specified maximum (exclusive).

#### Parameters
- `max` (Number): The upper bound (exclusive) for the random number

#### Returns
- `Number`: A random integer

### generateRandomId(length = 6)

Generates a random alphanumeric ID.

#### Parameters
- `length` (Number, optional): The length of the ID (default: 6)

#### Returns
- `String`: A random alphanumeric ID

### calculateDamage({targetElement, sourceElement, damage})

Calculates damage based on elemental interactions.

#### Parameters
- `targetElement` (String): The elemental type of the target
- `sourceElement` (String): The elemental type of the attack
- `damage` (Number): The base damage amount

#### Returns
- `Number`: The calculated damage after applying elemental effects

## Usage

```javascript
import {
    min0max9999,
    min9999max9999,
    min0max,
    randomBetween0And,
    generateRandomId,
    calculateDamage
} from './utils.js';

// Constrain numbers
console.log(min0max9999(10000)); // 9999
console.log(min9999max9999(-10000)); // -9999

// Create a custom constraint function
const constrain0to100 = min0max(100);
console.log(constrain0to100(150)); // 100

// Generate random numbers and IDs
console.log(randomBetween0And(10)); // Random number between 0 and 9
console.log(generateRandomId()); // Random 6-character ID

// Calculate elemental damage
console.log(calculateDamage({
    targetElement: 'fire',
    sourceElement: 'ice',
    damage: 100
})); // 200 (double damage)
```

## Testing

The accompanying test file includes tests for:

- Number constraint functions
- Random number generation
- Random ID generation
- Elemental damage calculation

Key test cases:
- Constraining numbers within specified bounds
- Generating random numbers within a range
- Generating random IDs of specified length
- Calculating damage with various elemental interactions

Run the tests to ensure the module is functioning as expected.