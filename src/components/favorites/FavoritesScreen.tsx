'use client';

import Link from 'next/link';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { isSportEventLive } from '@/data/sportEvents';

export function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const isRussian = language === 'ru';
  const liveFavoritesCount = favorites.filter((event) => isSportEventLive(event)).length;

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <PageHeader title={t('favoritesTitle')} description={t('favoritesHint')} />

      <SectionCard className="grid grid-cols-2 gap-2.5 border border-black/[0.045] bg-white/[0.86] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:border-white/8 dark:bg-white/5">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{t('favoritesTitle')}</p>
          <p className="mt-2 text-[1.18rem] font-semibold tracking-tight text-text-primary">{favorites.length}</p>
        </div>
        <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:border-white/8 dark:bg-white/5">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{isRussian ? 'В эфире' : 'Live now'}</p>
          <p className="mt-2 text-[1.18rem] font-semibold tracking-tight text-text-primary">{liveFavoritesCount}</p>
        </div>
      </SectionCard>

      <div className="space-y-2.5">
        {favorites.length === 0 ? (
          <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.82] px-4 py-6 text-center shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
            <div>
              <p className="text-[1rem] font-semibold text-text-primary">{t('favoritesEmpty')}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">{t('favoritesEmptyHint')}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/sports"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[1.05rem] border border-black/[0.05] bg-white px-4 py-3 text-[0.9rem] font-semibold text-text-primary shadow-[0_12px_22px_rgba(15,23,42,0.06)] transition hover:bg-white/96 dark:border-white/8 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
              >
                {isRussian ? 'К видам спорта' : 'Open sports'}
              </Link>
              <Link
                href="/events"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[1.05rem] border border-black/[0.05] bg-[rgba(247,249,252,0.82)] px-4 py-3 text-[0.9rem] font-semibold text-text-primary transition hover:bg-white dark:border-white/8 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                {isRussian ? 'К событиям' : 'Open events'}
              </Link>
            </div>
          </SectionCard>
        ) : null}

        {favorites.map((event) => (
          <SportEventCard key={event.id} event={event} />
        ))}
      </div>
    </MainPageLayout>
  );
}
