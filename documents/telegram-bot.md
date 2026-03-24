# Telegram Blogger

## Purpose
Fansten now includes a server-side Telegram bot integration layer for the Blogger bot.

Current responsibilities:
- receive Telegram webhooks
- teach the operator how to use the bot
- preview post text
- report Telegram/X readiness
- publish to X when X credentials are configured

## Current routes
- `/api/telegram/webhook`
- `/api/telegram/status`

## Required server env
```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=
TELEGRAM_WEBHOOK_BASE_URL=https://fundon.vercel.app
TELEGRAM_ALLOWED_CHAT_IDS=
TELEGRAM_ALLOWED_USER_IDS=
X_API_KEY=
X_API_SECRET=
X_ACCESS_TOKEN=
X_ACCESS_TOKEN_SECRET=
X_USERNAME=
X_REDIRECT_URI=
```

## Bot commands
- `/help`
- `/status`
- `/whoami`
- `/preview <text>`
- `/post <text>`

## Security model
- webhook requests are protected by `x-telegram-bot-api-secret-token`
- publishing is blocked until `TELEGRAM_ALLOWED_CHAT_IDS` or `TELEGRAM_ALLOWED_USER_IDS` is configured
- if X credentials are missing, the bot explains what is missing instead of pretending to publish

## Operational flow
1. Put the bot token and webhook secret in `.env.local`
2. Sync the same envs to Vercel
3. Deploy production
4. Run `npm.cmd run telegram:webhook`
5. Open the bot in Telegram and use `/help`
6. Use `/whoami` to collect chat/user IDs for the allow-list
7. Add X credentials later to enable `/post`
