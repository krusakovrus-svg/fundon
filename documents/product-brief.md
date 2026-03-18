# Product Brief

## Positioning
FightPulse is a mobile-first second-screen app for live events where users support participants during the event and immediately see how support changes.

The domain remains generic enough for:
- sports
- esports
- music
- creator events
- competitions
- shows

The current MVP is optimized for competitive multi-participant events and team-vs-team or player-vs-player support.

## Core product action
Support participant.

The current product loop is:
1. user selects a sport or opens an event feed
2. user adds interesting events to favorites or opens an active live event
3. user enters the live screen
4. user selects an amount
5. user supports one side
6. user watches the support battle and shared activity move

## Current product surfaces

### Home
Home is no longer a separate static page.
The home entry in bottom navigation opens the last selected sport page and acts as a personalized return point.

### Sports
`/sports` is the sport picker.
Each sport opens its own event feed through `/sports/[sportId]`.
Martial arts keeps its own explicit route at `/sports/martial-arts`.

### Events
`/events` is the cross-sport event hub.
It aggregates all current and upcoming events across sports and supports time and sport filtering.

### Live
`/live` is the main donation surface of the product.
This is the most important page in the app.

### Favorites
Users can star any event card.
Favorites persist until the event ends or until the user removes the star manually.

### Notifications
Notifications are driven by favorites.
Only favorite events that are live right now appear in `/notifications`.

### Profile
Profile is a personal activity hub, not a settings page.
It now shows:
- identity
- current live position
- stats
- favorites / live alerts entry points
- support history
- ranking progress

### Leaderboard
Leaderboard is now a competition hub with:
- overall view
- live view
- today view
- top 3 podium
- personal position block

## Product principles
- mobile-first
- one dominant live action
- extremely clear hierarchy
- fast support interaction
- reusable design system
- bilingual from the start
- theme support from the start

## Languages
- Russian
- English

Current behavior:
- RU is the default language
- all visible strings must come from the translation layer

## Themes
The architecture supports:
- light
- dark
- system

Current product behavior:
- light is the default
- the visible switcher is focused on light and dark
- all screens must remain readable in both themes

## MVP modules that now exist
- app foundation
- localization
- theme system
- navigation shell
- sports picker
- sport-specific event feeds
- favorites
- live notifications
- events hub
- live donation screen
- leaderboard
- profile
- settings
- rooms placeholder

## Architecture-ready but not deeply implemented
- real wallet funding
- payment processing
- event creation
- follow graph
- expanded rooms behavior
- deeper social feed

## Navigation summary

### Top utility bar
- menu
- search or back
- balance
- favorites
- notifications

### Bottom navigation
- home
- search
- events
- live
- profile

### Side drawer
- home
- live
- events
- favorites
- notifications
- profile
- leaderboard
- rooms
- settings section for language and theme
