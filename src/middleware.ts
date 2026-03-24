import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getLegacyAppRedirect, getRussianSiteRedirectPath, mvpDomainConfig } from '@/lib/routing';

function normalizeHost(host: string | null) {
  return host?.split(':')[0].toLowerCase() ?? '';
}

function isRussianDomainHost(host: string) {
  return host === mvpDomainConfig.russianHost || host === `www.${mvpDomainConfig.russianHost}`;
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(request.headers.get('host'));
  const pathname = request.nextUrl.pathname;

  if (isRussianDomainHost(host)) {
    const redirectPath = getRussianSiteRedirectPath(pathname);
    const redirectUrl = new URL(`https://${mvpDomainConfig.primaryHost}${redirectPath}`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const legacyAppPath = getLegacyAppRedirect(pathname);

  if (legacyAppPath) {
    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname = legacyAppPath;
    return NextResponse.redirect(nextUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
};
