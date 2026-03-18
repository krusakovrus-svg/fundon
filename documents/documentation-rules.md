# Documentation Rules

## 1. Purpose
Documentation must describe the current real product state:
- routes
- shell structure
- product flows
- deployment process
- architectural rules

Documentation must not drift behind the codebase.

## 2. Where docs live
Current project docs live in:

```text
documents/
```

Current active doc set:
- `README.md`
- `product-brief.md`
- `live-screen-spec.md`
- `ui-baseline.md`
- `architecture-rules.md`
- `deployment-rules.md`
- `documentation-rules.md`
- `implementation-notes.md`
- `phase-1-foundation-script.md`

## 3. When docs must be updated
Update docs after changes that affect:
- routes
- navigation
- screen roles
- shell behavior
- product flow
- deployment process
- visual system rules

This now includes changes to:
- top utility bar
- bottom navigation
- side drawer
- sports flow
- favorites / notifications logic
- live donation flow
- profile
- leaderboard

## 4. Writing rules
- keep documents short and operational
- prefer current truth over historical detail
- remove outdated structures instead of keeping them “for reference”
- do not turn docs into a changelog of small UI edits

## 5. Reality rule
Docs must match the actual app.

Do not leave in docs:
- deleted routes
- old page roles
- old navigation orders
- old shell controls
- old architecture from previous project versions

## 6. Language rule
Internal project docs may be written in Russian or English.

The current doc set uses a mixed style:
- high-level product docs may stay in English
- implementation and process docs may stay in Russian or English if they remain clear

## 7. Scope rule
Update only the docs that are actually affected, but keep the whole package consistent.

If one screen changes in a way that affects:
- product role
- navigation
- shell hierarchy

then all related docs must be synchronized in the same pass.
