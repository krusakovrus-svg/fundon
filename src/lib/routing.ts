export const mvpDomainConfig = {
  primaryHost: 'fansten.com',
  russianHost: 'fansten.ru',
  futureAdminHost: 'admin.fansten.com'
} as const;

export const routeZones = {
  site: '/',
  siteRu: '/ru',
  app: '/app',
  admin: '/admin'
} as const;

export const appRoutes = {
  home: routeZones.app,
  live: `${routeZones.app}/live`,
  events: `${routeZones.app}/events`,
  sports: `${routeZones.app}/sports`,
  favorites: `${routeZones.app}/favorites`,
  notifications: `${routeZones.app}/notifications`,
  leaderboard: `${routeZones.app}/leaderboard`,
  profile: `${routeZones.app}/profile`,
  rooms: `${routeZones.app}/rooms`,
  settings: `${routeZones.app}/settings`,
  archive: `${routeZones.app}/archive`,
  martialArts: `${routeZones.app}/sports/martial-arts`,
  formulaOneJapanRace: `${routeZones.app}/sports/formula1/japan-gp-race`,
  sport: (sportId: string) => `${routeZones.app}/sports/${sportId}`
} as const;

const legacyAppRedirects = new Map<string, string>([
  ['/home', appRoutes.home],
  ['/live', appRoutes.live],
  ['/events', appRoutes.events],
  ['/sports', appRoutes.sports],
  ['/favorites', appRoutes.favorites],
  ['/notifications', appRoutes.notifications],
  ['/leaderboard', appRoutes.leaderboard],
  ['/profile', appRoutes.profile],
  ['/rooms', appRoutes.rooms],
  ['/settings', appRoutes.settings],
  ['/archive', appRoutes.archive],
  ['/app/home', appRoutes.home]
]);

export function isAdminPath(pathname?: string | null) {
  return pathname === routeZones.admin || pathname?.startsWith(`${routeZones.admin}/`) || false;
}

export function isAppPath(pathname?: string | null) {
  return pathname === routeZones.app || pathname?.startsWith(`${routeZones.app}/`) || false;
}

export function getLegacyAppRedirect(pathname?: string | null) {
  if (!pathname) {
    return null;
  }

  const directRedirect = legacyAppRedirects.get(pathname);

  if (directRedirect) {
    return directRedirect;
  }

  if (pathname.startsWith('/sports/')) {
    return `${routeZones.app}${pathname}`;
  }

  return null;
}

export function normalizeAppPath(pathname?: string | null) {
  if (!pathname) {
    return appRoutes.live;
  }

  if (isAppPath(pathname)) {
    return pathname === '/app/home' ? appRoutes.home : pathname;
  }

  return getLegacyAppRedirect(pathname) ?? pathname;
}

export function isAppShellPath(pathname?: string | null) {
  return isAppPath(pathname) || getLegacyAppRedirect(pathname) !== null;
}

export function stripAppBase(pathname?: string | null) {
  const normalizedPath = normalizeAppPath(pathname);

  if (normalizedPath === appRoutes.home) {
    return '/';
  }

  if (normalizedPath.startsWith(`${routeZones.app}/`)) {
    return normalizedPath.slice(routeZones.app.length);
  }

  return normalizedPath;
}

export function getRussianSiteRedirectPath(pathname?: string | null) {
  const currentPath = pathname || '/';
  const normalizedAppPath = getLegacyAppRedirect(currentPath) ?? currentPath;

  if (isAdminPath(normalizedAppPath) || isAppPath(normalizedAppPath)) {
    return normalizedAppPath;
  }

  if (currentPath === routeZones.site || currentPath === '') {
    return routeZones.siteRu;
  }

  if (currentPath === routeZones.siteRu || currentPath.startsWith(`${routeZones.siteRu}/`)) {
    return currentPath;
  }

  return `${routeZones.siteRu}${currentPath}`;
}

export function isPublicSitePath(pathname?: string | null) {
  return !isAdminPath(pathname) && !isAppShellPath(pathname);
}
