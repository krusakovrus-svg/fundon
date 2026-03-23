# FunDon / FightPulse v2

This workspace contains the active mobile-first second-screen product build for FightPulse v2.

Current production:
- https://fundon.vercel.app

## What is live in the app now
- RU is the default interface language
- light theme is the default theme
- top utility bar: menu, search/back, balance, favorites, notifications
- bottom navigation: home, search, events, live, profile
- side drawer: home, live, events, favorites, notifications, profile, leaderboard, rooms, settings
- sports picker and sport-specific event feeds
- unified event cards with favorites support
- favorites and live notifications
- live donation screen
- profile activity hub
- leaderboard competition hub

## Core routes
- `/live`
- `/events`
- `/sports`
- `/sports/[sportId]`
- `/sports/martial-arts`
- `/favorites`
- `/notifications`
- `/leaderboard`
- `/profile`
- `/rooms`
- `/settings`

## Local run
```powershell
cd C:\Users\RichComputer\Desktop\FunDon
npm.cmd run dev
```

## Required checks
```powershell
npm.cmd run typecheck
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm.cmd run build
```

## Browser review for assistants
Install Chromium for Playwright once:
```powershell
cd C:\Users\RichComputer\Desktop\FunDon
npm.cmd run browser:install
```

Run a full browser review of the admin panel:
```powershell
npm.cmd run admin:review
```

Check another environment:
```powershell
$env:BASE_URL='http://127.0.0.1:3000'
npm.cmd run admin:review
```

Outputs:
- smoke test results in terminal
- screenshots in `artifacts/admin-screenshots`
- HTML report in `playwright-report`

## Documentation
See [documents/README.md](./documents/README.md) for the current product, architecture, deployment, UI, and documentation rules.
