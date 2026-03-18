'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { isSportEventLive } from '@/data/sportEvents';

export function NotificationsScreen() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const liveFavorites = useMemo(
    () => favorites.filter((event) => isSportEventLive(event, now)),
    [favorites, now]
  );

  return (
    <MainPageLayout className="space-y-3 pt-2">
      <section className="app-card app-section-card space-y-2">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {t('notificationsTitle')}
        </p>
        <h1 className="text-[1.9rem] font-semibold tracking-tight text-text-primary">{t('notificationsTitle')}</h1>
        <p className="max-w-[26rem] text-[0.96rem] leading-relaxed text-text-secondary">
          {t('notificationsHint')}
        </p>
      </section>

      <div className="space-y-2.5">
        {liveFavorites.length === 0 ? (
          <div className="app-card rounded-[1.3rem] px-4 py-6 text-center">
            <p className="text-[1rem] font-semibold text-text-primary">{t('notificationsEmpty')}</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">
              {t('notificationsEmptyHint')}
            </p>
          </div>
        ) : null}

        {liveFavorites.map((event) => (
          <SportEventCard key={event.id} event={event} />
        ))}
      </div>
    </MainPageLayout>
  );
}
