# Implementation Notes

## Phase 1 completed
Foundation is complete:
- project structure
- language provider
- theme provider
- shared layout system
- design tokens
- typed domain models
- mock data layer

## Current shell state

### Top utility bar
- menu toggle
- search or back depending on route
- balance
- favorites
- notifications

### Bottom navigation
- home opens the last selected sport
- search opens `/sports`
- events opens `/events`
- live opens `/live`
- profile opens `/profile`

### Side drawer
- user strip
- primary shortcuts
- secondary navigation
- settings block with language and theme

## Current route status
- `/live` rebuilt as the main donation-focused live screen
- `/events` rebuilt as the cross-sport event hub
- `/sports` works as the sport picker
- `/sports/[sportId]` works as the standard sport event feed
- `/favorites` works
- `/notifications` works
- `/profile` rebuilt as a personal activity hub
- `/leaderboard` rebuilt as a competition hub
- `/rooms` remains lightweight
- `/settings` remains available

## Current data model status
- mock data still exists for core live/profile state
- sport event catalog now powers most event discovery screens
- participant visuals support:
  - team logos
  - player photos
  - flag fallback

## Current UI rules already implemented
- one standard event card pattern across sports
- star in each event card for favorites
- favorites persist in localStorage
- live notifications are derived from favorites
- bottom nav width matches page content width

## Current product center
The core product center is now:
- `/live` for donation and live interaction
- `/events` for discovery
- `/profile` for personal state
- `/leaderboard` for competition

## Next likely work zones
- deeper event detail routing from event cards into live or event-detail surfaces
- stronger wallet behavior
- more realistic live data binding
- richer notifications
- polishing of individual sport feeds where needed
