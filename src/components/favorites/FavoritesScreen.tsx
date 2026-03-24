'use client';

import Link from 'next/link';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { isSportEventLive } from '@/data/sportEvents';
import { appRoutes } from '@/lib/routing';

export function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const isRussian = language === 'ru';
  const liveFavoritesCount = favorites.filter((event) => isSportEventLive(event)).length;
  const favoritesHint = isRussian
    ? 'События остаются здесь, пока не завершатся или пока вы не уберёте их из избранного.'
    : t('favoritesHint');
  const favoritesCountNote =
    favorites.length > 0 ? (isRussian ? 'Все закреплённые события' : 'Pinned events') : isRussian ? 'Список пока пуст' : 'List is empty';
  const liveCountNote =
    liveFavoritesCount > 0 ? (isRussian ? 'Идут прямо сейчас' : 'Happening now') : isRussian ? 'Live пока нет' : 'No live now';
  const infoFootnote =
    favorites.length > 0
      ? favoritesHint
      : isRussian
        ? 'Добавьте событие через звезду на карточке и возвращайтесь к нему в один тап.'
        : 'Use the star on any card to pin an event here.';

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <PageHeader title={t('favoritesTitle')} description={favoritesHint} />

      <SectionCard className="space-y-3.5 border border-black/[0.045] bg-white/[0.88] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">
              {t('favoritesTitle')}
            </p>
            <p className="mt-1.5 text-[1.2rem] font-semibold tracking-tight text-text-primary dark:text-white">{favorites.length}</p>
            <p className="mt-1.5 text-[0.76rem] leading-tight text-text-secondary dark:text-white/[0.58]">{favoritesCountNote}</p>
          </div>
          <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">
              {isRussian ? 'В эфире' : 'Live now'}
            </p>
            <p className="mt-1.5 text-[1.2rem] font-semibold tracking-tight text-text-primary dark:text-white">{liveFavoritesCount}</p>
            <p className="mt-1.5 text-[0.76rem] leading-tight text-text-secondary dark:text-white/[0.58]">{liveCountNote}</p>
          </div>
        </div>

        <div className="rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(31,39,53,0.94),rgba(21,28,40,0.90))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <p className="text-[0.83rem] leading-relaxed text-text-secondary dark:text-white/[0.62]">{infoFootnote}</p>
        </div>
      </SectionCard>

      <div className="space-y-2.5">
        {favorites.length === 0 ? (
          <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.84] px-4 py-5 text-center shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
            <div>
              <p className="text-[1rem] font-semibold text-text-primary dark:text-white">{t('favoritesEmpty')}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary dark:text-white/[0.62]">{t('favoritesEmptyHint')}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href={appRoutes.sports}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[1.05rem] border border-transparent bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-4 py-3 text-[0.9rem] font-semibold text-white shadow-[0_14px_24px_rgba(255,116,55,0.16)] transition hover:brightness-105"
              >
                {isRussian ? 'К видам спорта' : 'Open sports'}
              </Link>
              <Link
                href={appRoutes.events}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-[1.05rem] border border-black/[0.05] bg-[rgba(247,249,252,0.82)] px-4 py-3 text-[0.9rem] font-semibold text-text-primary transition hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white/[0.92] dark:hover:bg-[linear-gradient(180deg,rgba(39,48,63,0.94),rgba(25,34,47,0.92))]"
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
