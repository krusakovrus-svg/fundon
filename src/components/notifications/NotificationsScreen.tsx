'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { isSportEventLive } from '@/data/sportEvents';

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M7.5 9.5a4.5 4.5 0 0 1 9 0v3.1c0 .7.22 1.39.63 1.95l.9 1.25A1 1 0 0 1 17.22 17H6.78a1 1 0 0 1-.81-1.6l.9-1.25c.4-.56.63-1.25.63-1.95V9.5Z"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3.5 13.8 8l4.7 1.7-4.7 1.8L12 16l-1.8-4.5L5.5 9.7 10.2 8 12 3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function NotificationsScreen() {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
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

  const isRussian = language === 'ru';
  const summaryItems = [
    { label: isRussian ? 'В эфире' : 'Live', value: liveFavorites.length.toString() },
    { label: isRussian ? 'Избранное' : 'Favorites', value: favorites.length.toString() },
    { label: isRussian ? 'Сигналы' : 'Signals', value: liveFavorites.length > 0 ? 'On' : 'Stand by' }
  ];
  const infoPills = isRussian
    ? ['Старт эфира', 'Избранные события', 'Активность поддержки']
    : ['Live starts', 'Favorite events', 'Support activity'];
  const emptyTitle = isRussian ? 'Пока нет активных уведомлений' : 'No active alerts yet';
  const emptyBody = isRussian
    ? 'Добавьте события в избранное, и здесь появятся старт эфира и важные обновления.'
    : 'Add events to favorites and live starts with important updates will appear here.';

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader title={t('notificationsTitle')} description={t('notificationsHint')} />

      <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.86] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.05rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))]">
              <BellIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('notificationsTitle')}</p>
              <h2 className="mt-2 text-[1.04rem] font-semibold text-text-primary">
                {isRussian ? 'Центр сигналов эфира' : 'Live alerts hub'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {isRussian
                  ? 'Следите за стартом эфиров, избранными матчами и заметными всплесками поддержки в одном потоке.'
                  : 'Follow live starts, favorite matches, and support spikes in one stream.'}
              </p>
            </div>
          </div>

          <span className="inline-flex min-w-[1.65rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
            {liveFavorites.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {infoPills.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-1.5 text-[0.78rem] font-medium text-text-secondary dark:border-white/8 dark:bg-white/[0.04]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {summaryItems.map((item) => (
            <div key={item.label} className="rounded-[1.1rem] border border-black/[0.045] bg-[rgba(247,249,252,0.78)] px-3 py-3 dark:border-white/8 dark:bg-white/5">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{item.label}</p>
              <p className="mt-2 text-[1.02rem] font-semibold tracking-tight text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {liveFavorites.length === 0 ? (
        <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-5 text-center shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))]">
            <SparkIcon />
          </div>
          <p className="mt-4 text-[1rem] font-semibold text-text-primary">{emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-[19rem] text-[0.92rem] leading-relaxed text-text-secondary">{emptyBody}</p>
        </SectionCard>
      ) : (
        <section className="space-y-2.5">
          <div className="flex items-center gap-3 px-1">
            <h2 className="shrink-0 text-[0.96rem] font-semibold tracking-tight text-text-primary">{isRussian ? 'Сейчас в эфире' : 'Live now'}</h2>
            <div className="h-px flex-1 bg-black/[0.055] dark:bg-white/8" />
            <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.88)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
              {liveFavorites.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {liveFavorites.map((event) => (
              <SportEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </MainPageLayout>
  );
}
