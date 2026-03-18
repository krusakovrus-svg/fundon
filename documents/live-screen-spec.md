# Live Event Screen Specification

This document reflects the current target structure of `/live`.

## Role of the screen
`/live` is the main donation surface of the product.
It is not a dashboard and not a sport feed.

The screen must make these things obvious almost instantly:
1. what is live right now
2. who can be supported
3. who leads the support battle
4. how to support in one tap

## Current live flow
1. user enters `/live`
2. user can switch between active live events
3. user sees the compact live context
4. user sees the main support battle
5. user chooses an amount in the sticky dock
6. user supports one side
7. user watches support activity, momentum, and leaderboard movement

## Current vertical structure

### 1. Top utility bar
This sits above page content and remains part of the app shell.
Contains:
- menu
- search or back
- balance
- favorites
- notifications

### 2. Live event switcher
Shown when several live events are available.
Purpose:
- switch quickly between live surfaces without leaving `/live`

### 3. Compact live hero
Contains:
- league / event label
- matchup
- stage / timer
- venue

This block must stay compact.
It gives context but does not dominate the screen.

### 4. Support battle block
This is the center of the page.
Contains:
- participant A
- participant B
- support totals
- support percentages
- leading side
- battle bar

### 5. Live momentum panel
Current moment, momentum, and fan pulse should feel like one connected layer.
The current implementation already moved in this direction.

### 6. Live activity feed
Compact recent activity:
- support actions
- big support highlights
- leader changes
- event moments

### 7. Leaderboard preview
Compact top supporters preview.
This is secondary to the donation action.

### 8. Sticky donation dock
This is a critical product block.
It must stay available near the bottom of the screen and provide:
- support amount selection
- left-side support action
- right-side support action

## Live design priorities
- the support battle must be visually dominant
- the chosen amount must remain clear
- donation controls must stay fast and obvious
- all supporting blocks must reinforce the donation loop

## What the screen should not become
- a stats-heavy analytics page
- a giant hero screen with weak support controls
- a fight-specific screen that cannot support other sports
- a wallet top-up page

## Multi-sport rule
The live surface must stay generic enough for:
- martial arts
- volleyball
- esports
- team sports

The hero and live context blocks should adapt to:
- round
- set
- period
- map
- match

without changing the whole page structure.

## Current implementation direction
The current codebase already uses:
- live event switcher
- compact live hero
- support battle
- merged momentum panel
- sticky donation dock

Future work should strengthen realism and live data fidelity, not reinvent the page structure again.
