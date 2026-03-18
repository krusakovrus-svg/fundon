# Architecture Rules

## 1. Current project structure

```text
src/
  app/
    page.tsx
    live/page.tsx
    events/page.tsx
    favorites/page.tsx
    notifications/page.tsx
    leaderboard/page.tsx
    profile/page.tsx
    rooms/page.tsx
    settings/page.tsx
    sports/page.tsx
    sports/martial-arts/page.tsx
    sports/[sportId]/page.tsx
  components/
    events/
    favorites/
    layout/
    leaderboard/
    live/
    notifications/
    profile/
    rooms/
    settings/
    sports/
    ui/
    providers/
  data/
  lib/
  types/
```

Additional top-level folders:

```text
documents/
public/
```

## 2. Route rules
- routes inside `src/app` stay thin
- each route should delegate to one screen-level component
- route files should not hold heavy UI composition or local business logic

Examples:
- `live/page.tsx` -> `LiveScreen`
- `events/page.tsx` -> `EventsScreen`
- `profile/page.tsx` -> `ProfileScreen`

## 3. Component grouping rules

### `components/layout`
Use for:
- `AppShell`
- `TopUtilityBar`
- `MobileNav`
- `SideMenuDrawer`
- page wrappers

### `components/ui`
Use for:
- shared cards
- page headers
- segmented controls
- shared badges
- shared pills
- generic controls

### domain folders
Keep domain-specific blocks inside:
- `live/`
- `events/`
- `sports/`
- `favorites/`
- `notifications/`
- `leaderboard/`
- `profile/`
- `rooms/`
- `settings/`

Rule:
- if a component is used only in one domain, it should stay in that domain folder

## 4. Data rules

### `src/data`
Use for:
- translations
- mock state
- live event datasets
- sport event catalogs
- static dictionaries

Do not place rendering or JSX in data files.

### `src/lib`
Use for:
- localStorage helpers
- derived business helpers
- visual registries
- route and persistence helpers

Examples already in use:
- favorites persistence helpers
- sports home route helpers
- participant visuals registry
- flags registry

## 5. Type rules

### `src/types`
Keep shared domain types centralized.

Current important type zones include:
- live event types
- leaderboard entries
- user profile
- support history
- sport event records
- language and theme types

Avoid redefining the same type inside feature folders unless it is strictly local.

## 6. Mobile-first rule
All screens must be designed for mobile first.

Required:
- safe touch targets
- no horizontal overflow
- consistent vertical rhythm
- clear tap destinations
- readable RU and EN labels

## 7. Shell rule
The app shell is now a system-level part of the product.

Current shell structure:
- top utility bar
- page content
- bottom navigation
- side drawer

Shell rules:
- shell controls must stay consistent across screens
- route-level screens must not rebuild local navigation systems
- top bar and bottom nav behavior must stay centralized

## 8. Sports and event discovery rules
- `/sports` is the picker
- `/sports/[sportId]` is the standard sport feed
- `/events` is the cross-sport event hub

Rule:
- sport event cards must follow one shared structure across sports
- do not create custom card layouts per sport unless there is a very strong need

## 9. Favorites and notifications rules
- favorites are event-based
- notifications are derived from favorite events that are live
- this relationship must stay simple and predictable

Rule:
- do not build a separate notification system disconnected from favorites unless product requirements change

## 10. Live surface rule
`/live` is the core donation surface.

Rule:
- do not let secondary features dominate the live page
- support battle and donation controls remain the center of the screen
- keep live structure multi-sport compatible

## 11. Personal and competition surfaces

### `/profile`
Acts as the personal state hub:
- identity
- current live position
- stats
- support history
- ranking progress

### `/leaderboard`
Acts as the competition hub:
- overall ranking
- live ranking
- daily ranking
- podium
- personal position

Rule:
- these screens should reinforce live donation behavior, not drift into generic dashboard pages

## 12. Simplicity over abstraction
- do not introduce a large state architecture without strong need
- prefer readable composition over clever indirection
- add shared primitives only when repetition justifies them
- evolve the current system rather than inventing parallel systems per screen
