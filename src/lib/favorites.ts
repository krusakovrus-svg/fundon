import { getSportEventById, isSportEventActive } from '@/data/sportEvents';

const STORAGE_KEY = 'fightpulse-favorite-events';

export function sanitizeFavoriteIds(ids: string[]) {
  const uniqueIds = Array.from(new Set(ids));

  return uniqueIds.filter((id) => {
    const event = getSportEventById(id);
    return event ? isSportEventActive(event) : false;
  });
}

export function readStoredFavoriteIds() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sanitizeFavoriteIds(parsed.filter((value): value is string => typeof value === 'string'));
  } catch {
    return [];
  }
}

export function writeStoredFavoriteIds(ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeFavoriteIds(ids)));
}
