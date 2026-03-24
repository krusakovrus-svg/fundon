import { appRoutes } from '@/lib/routing';

const STORAGE_KEY = 'fightpulse-home-sport';
export const DEFAULT_SPORT_PATH = appRoutes.martialArts;

export function normalizeSportPath(path: string | null | undefined) {
  if (!path) return DEFAULT_SPORT_PATH;
  if (path.startsWith('/app/sports/')) return path;
  if (path.startsWith('/sports/')) return `/app${path}`;
  return DEFAULT_SPORT_PATH;
}

export function getStoredSportPath() {
  if (typeof window === 'undefined') return DEFAULT_SPORT_PATH;
  return normalizeSportPath(window.localStorage.getItem(STORAGE_KEY));
}

export function setStoredSportPath(path: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, normalizeSportPath(path));
}
