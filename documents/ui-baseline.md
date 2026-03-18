# UI Baseline

## Purpose
This document defines the current shared UI baseline for FunDon.

The goal is:
- one mobile-first visual system
- one shell language
- one event-card standard across sports
- one hierarchy for live, events, profile, and leaderboard

## 1. Shared shell

### Top utility bar
The app uses one top utility bar across the product.

Current structure:
- menu
- search or back
- balance
- favorites
- notifications

Rules:
- same geometry on all screens
- same card language as the rest of the app
- no screen-specific top bars unless there is a strong product reason

### Bottom navigation
Current bottom navigation:
- home
- search
- events
- live
- profile

Rules:
- width must match the content column
- icon geometry must stay consistent
- home points to the last selected sport

### Side drawer
Current side drawer structure:
- user strip
- primary shortcuts
- secondary navigation
- settings block

Rules:
- drawer is a secondary hub, not a second homepage
- counters may appear for favorites and live notifications
- utility settings remain visually separated from navigation

## 2. Shared width and rhythm
- one shared page width
- one shared horizontal padding
- one shared vertical rhythm
- bottom spacing must clear the bottom nav and live dock when needed

The bottom nav width and the main page content width must remain visually aligned.

## 3. Event card standard
This is now one of the most important shared patterns in the app.

All sport event cards should keep the same structure:
- tournament / event title row
- top-right favorite star
- left date / time or live status column
- right participant block
- participant visuals

The visual priority order for participants is:
1. team logo
2. player photo
3. flag fallback

Rules:
- do not invent separate card layouts per sport
- stars always live in the top-right corner
- inactive star must stay visible
- active star must remain clearly highlighted

## 4. Page header pattern
Main screens should still use one shared page header system:
- eyebrow
- title
- short description

Rules:
- header text stays compact
- subtitles must survive RU and EN fit
- do not inflate headers when the real action is lower on the page

## 5. Card language
Core surfaces should stay inside one card system:
- section cards
- compact cards
- highlight cards
- metric cards

Key rule:
- important blocks can feel stronger, but they must still belong to the same design system

## 6. Live-specific baseline
`/live` is the main donation surface.

Current live baseline:
- live event switcher
- compact hero
- primary support battle
- merged momentum panel
- activity feed
- leaderboard preview
- sticky donation dock

Rules:
- support battle is the primary visual block
- donation controls must remain fast and easy to reach
- supporting blocks must reinforce the donation loop

## 7. Profile and leaderboard baseline

### Profile
Profile is a personal state hub:
- identity
- live position
- stats
- support history
- ranking progress

### Leaderboard
Leaderboard is a competition hub:
- summary row
- scope filters
- podium
- ranking list
- personal position

Rule:
- these screens should feel connected to live donation behavior, not like generic dashboards

## 8. Theme rules
The app must stay strong in both themes.

Current behavior:
- light is default
- dark remains a supported core theme

Rules:
- use semantic tokens
- avoid hardcoded one-off colors when a token already exists
- utility surfaces, stars, live badges, and counters must remain visible in both themes

## 9. Localization fit rules
The product is bilingual by default:
- Russian
- English

Rules:
- all visible text from translations
- RU width must be tested, not assumed
- no layout may depend on English-only short wording

## 10. Anti-drift rules
- do not create a separate visual system per page
- do not invent new event card structures without strong need
- do not let navigation surfaces diverge
- update this baseline when shell or card rules change at the system level
