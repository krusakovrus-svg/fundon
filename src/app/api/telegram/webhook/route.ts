import { NextResponse } from 'next/server';

import { handleTelegramUpdate, isTelegramWebhookAuthorized } from '@/lib/telegram';
import type { TelegramUpdate } from '@/types/telegram';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Telegram webhook is ready.'
  });
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-telegram-bot-api-secret-token');

  if (!isTelegramWebhookAuthorized(secret)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized webhook request.' }, { status: 401 });
  }

  try {
    const update = (await request.json()) as TelegramUpdate;
    await handleTelegramUpdate(update);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook failed', error);

    return NextResponse.json({ ok: false, error: 'Webhook processing failed.' }, { status: 500 });
  }
}
