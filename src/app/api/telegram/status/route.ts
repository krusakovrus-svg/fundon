import { NextResponse } from 'next/server';

import { getTelegramPublicStatus } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    status: getTelegramPublicStatus()
  });
}
