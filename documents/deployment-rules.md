# Deployment Rules

## 1. Working directory
The active product workspace is:

```text
C:\Users\RichComputer\Desktop\FunDon
```

## 2. Local run
```powershell
cd C:\Users\RichComputer\Desktop\FunDon
npm.cmd run dev
```

## 3. Required checks before deployment
Always run:

```powershell
npm.cmd run typecheck
```

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue; npm.cmd run build
```

If one of these commands fails, deployment must stop until the problem is fixed.

## 4. Production target
Current production:
- https://fundon.vercel.app

Current project is deployed through Vercel.

## 5. Standard deploy command
```powershell
cd C:\Users\RichComputer\Desktop\FunDon
npx.cmd vercel --prod --yes --scope krusakovrus-9162s-projects
```

## 6. Deploy discipline
- deploy only from a passing local build
- after deploy, confirm both:
  - deployment URL
  - production alias
- after meaningful product changes, update documentation in the same pass

## 7. Environment variables
Client env should stay minimal.

Typical public envs:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Rules:
- never document secret keys
- never put server secrets in the client
- do not let missing backend config break the UI shell

Current server envs now also include:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=
TELEGRAM_WEBHOOK_BASE_URL=
TELEGRAM_ALLOWED_CHAT_IDS=
TELEGRAM_ALLOWED_USER_IDS=
X_API_KEY=
X_API_SECRET=
X_ACCESS_TOKEN=
X_ACCESS_TOKEN_SECRET=
X_USERNAME=
```

Telegram operational commands:

```powershell
npm.cmd run telegram:status
npm.cmd run telegram:webhook
```

## 8. Fallback policy
If backend wiring is incomplete:
- the app must still render
- mock or local fallback should remain available
- core product surfaces must stay testable without a full backend
