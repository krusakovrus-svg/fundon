'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getSportEventById, isSportEventActive } from '@/data/sportEvents';
import { readStoredFavoriteIds, sanitizeFavoriteIds, writeStoredFavoriteIds } from '@/lib/favorites';
import type { SportEventRecord } from '@/types';

interface FavoritesContextValue {
  favoriteIds: string[];
  favorites: SportEventRecord[];
  isFavorite: (eventId: string) => boolean;
  toggleFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(readStoredFavoriteIds());
  }, []);

  useEffect(() => {
    writeStoredFavoriteIds(favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFavoriteIds((current) => sanitizeFavoriteIds(current));
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const favorites = useMemo(
    () =>
      favoriteIds
        .map((eventId) => getSportEventById(eventId))
        .filter((event): event is SportEventRecord => Boolean(event))
        .filter((event) => isSportEventActive(event))
        .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime()),
    [favoriteIds]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      favorites,
      isFavorite: (eventId) => favoriteIds.includes(eventId),
      toggleFavorite: (eventId) => {
        setFavoriteIds((current) =>
          current.includes(eventId)
            ? current.filter((id) => id !== eventId)
            : sanitizeFavoriteIds([...current, eventId])
        );
      },
      removeFavorite: (eventId) => {
        setFavoriteIds((current) => current.filter((id) => id !== eventId));
      }
    }),
    [favoriteIds, favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
}
