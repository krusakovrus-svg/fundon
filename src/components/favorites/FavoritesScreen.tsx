'use client';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';

export function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <MainPageLayout className="space-y-3 pt-2">
      <section className="app-card app-section-card space-y-2">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{t('favoritesTitle')}</p>
        <h1 className="text-[1.9rem] font-semibold tracking-tight text-text-primary">{t('favoritesTitle')}</h1>
        <p className="max-w-[26rem] text-[0.96rem] leading-relaxed text-text-secondary">{t('favoritesHint')}</p>
      </section>

      <div className="space-y-2.5">
        {favorites.length === 0 ? (
          <div className="app-card rounded-[1.3rem] px-4 py-6 text-center">
            <p className="text-[1rem] font-semibold text-text-primary">{t('favoritesEmpty')}</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">{t('favoritesEmptyHint')}</p>
          </div>
        ) : null}

        {favorites.map((event) => (
          <SportEventCard key={event.id} event={event} />
        ))}
      </div>
    </MainPageLayout>
  );
}
