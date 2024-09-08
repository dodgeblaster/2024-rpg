I'll explain how the state changes per selection to create the timeline using ASCII art visualization. Let's go through a simplified example with three players.

Assume we have three players with the following initial stats:

```
Player A: speed 10
Player B: speed 8
Player C: speed 6
```
The highest speed is 10, so we'll use that for calculations. Let's visualize the state changes for the first few turns:


Initial State:

```
Player | Speed | Points | Offset
-------|-------|--------|-------
   A   |  10   |   0    |   0
   B   |   8   |   0    |   0
   C   |   6   |   0    |   0
```

Turn 1:

Find lowest points (all have 0, so randomize): Choose C
Add points: (10 * 2.5) - 6 = 19 points
Adjust offsets (no change in this case)

```
Player | Speed | Points | Offset
-------|-------|--------|-------
   A   |  10   |   0    |   0
   B   |   8   |   0    |   0
   C   |   6   |  19    |   0

Timeline: [C]
```

Turn 2:

Find lowest points: Choose A or B (randomize): Choose A
Add points: (10 * 2.5) - 10 = 15 points

```
Player | Speed | Points | Offset
-------|-------|--------|-------
   A   |  10   |  15    |   0
   B   |   8   |   0    |   0
   C   |   6   |  19    |   0
   
Timeline: [C, A]
```

Turn 3:

Find lowest points: Choose B
Add points: (10 * 2.5) - 8 = 17 points

```
Player | Speed | Points | Offset
-------|-------|--------|-------
   A   |  10   |  15    |   0
   B   |   8   |  17    |   0
   C   |   6   |  19    |   0
   
Timeline: [C, A, B]
```

Turn 4:

Find lowest points: Choose A
Add points: (10 * 2.5) - 10 = 15 points

```
Player | Speed | Points | Offset
-------|-------|--------|-------
   A   |  10   |  30    |   0
   B   |   8   |  17    |   0
   C   |   6   |  19    |   0
   
Timeline: [C, A, B, A]
```

This process continues until the timeline has 20 turns. The key points to understand are:

The player with the lowest points always goes next.
When a player takes a turn, they gain points based on the formula: (highest_speed * 2.5) - player_speed.
Faster characters (higher speed) gain fewer points, so they'll take turns more frequently.
The offset can be used to adjust a player's effective points without changing their actual points.
This system creates a balanced turn order that favors faster characters while still giving slower characters a chance to act.