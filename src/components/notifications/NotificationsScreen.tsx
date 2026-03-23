'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { isSportEventLive } from '@/data/sportEvents';
import { cn } from '@/lib/utils';

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.98rem] w-[0.98rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
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
    <svg viewBox="0 0 24 24" className="h-[0.98rem] w-[0.98rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <path d="M12 3.5 13.8 8l4.7 1.7-4.7 1.8L12 16l-1.8-4.5L5.5 9.7 10.2 8 12 3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

type SummaryItem = {
  label: string;
  value: string;
  note: string;
  kind: 'count' | 'status';
  quiet?: boolean;
};

export function NotificationsScreen() {
  const { favorites } = useFavorites();
  const { language } = useLanguage();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const liveFavorites = useMemo(() => favorites.filter((event) => isSportEventLive(event, now)), [favorites, now]);

  const isRussian = language === 'ru';
  const headerDescription = isRussian
    ? 'Здесь появляются старты избранных событий, важные обновления по матчам и всплески активности поддержки.'
    : 'Starts, important match updates, and support spikes appear here.';
  const introTitle = isRussian ? 'Центр сигналов эфира' : 'Live alerts hub';
  const introBody = isRussian
    ? 'Следите за стартом избранных событий и важными live-обновлениями в одном спокойном потоке.'
    : 'Track favorite starts and important live updates in one calm feed.';
  const infoPills = isRussian
    ? ['Старт эфира', 'Избранные события', 'Активность поддержки']
    : ['Live starts', 'Favorite events', 'Support activity'];
  const emptyTitle = isRussian ? 'Пока нет активных уведомлений' : 'No active alerts yet';
  const emptyBody = isRussian
    ? 'Добавьте события в избранное, и мы покажем здесь их старт и важные live-обновления.'
    : 'Add events to favorites and we will show their starts and important live updates here.';

  const summaryItems: SummaryItem[] = [
    {
      label: isRussian ? 'В эфире' : 'Live',
      value: liveFavorites.length.toString(),
      note: liveFavorites.length > 0 ? (isRussian ? 'Избранные матчи уже начались' : 'Favorite matches have started') : isRussian ? 'Пока без стартов' : 'No starts yet',
      kind: 'count',
      quiet: liveFavorites.length === 0
    },
    {
      label: isRussian ? 'Избранное' : 'Favorites',
      value: favorites.length.toString(),
      note: favorites.length > 0 ? (isRussian ? 'Под наблюдением' : 'Tracked now') : isRussian ? 'Добавьте события' : 'Add events',
      kind: 'count',
      quiet: favorites.length === 0
    },
    {
      label: isRussian ? 'Сигналы' : 'Signals',
      value: liveFavorites.length > 0 ? (isRussian ? 'Активны' : 'Active') : isRussian ? 'Ожидаем' : 'Stand by',
      note: liveFavorites.length > 0 ? (isRussian ? 'Есть live-обновления' : 'Live updates are flowing') : isRussian ? 'Всплесков пока нет' : 'No spikes yet',
      kind: 'status',
      quiet: liveFavorites.length === 0
    }
  ];

  return (
    <MainPageLayout className="space-y-3.5">
      <PageHeader title={isRussian ? 'Уведомления' : 'Notifications'} description={headerDescription} />

      <SectionCard className="space-y-3.5 border border-black/[0.045] bg-white/[0.88] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))] dark:bg-[rgba(var(--accent-blue),0.12)]">
              <BellIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
                {isRussian ? 'Уведомления' : 'Notifications'}
              </p>
              <h2 className="mt-1.5 text-[1.02rem] font-semibold text-text-primary dark:text-white">{introTitle}</h2>
              <p className="mt-1.5 text-[0.92rem] leading-6 text-text-secondary dark:text-white/[0.62]">{introBody}</p>
            </div>
          </div>

          <span className="inline-flex min-w-[1.45rem] items-center justify-center rounded-full bg-black/[0.03] px-2 py-1 text-[0.66rem] font-semibold text-text-muted dark:bg-white/[0.05] dark:text-white/[0.42]">
            {liveFavorites.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {infoPills.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.78)] px-3 py-1.5 text-[0.76rem] font-medium text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:text-white/[0.62] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.08rem] border border-black/[0.045] bg-[rgba(247,249,252,0.8)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{item.label}</p>
              <p
                className={cn(
                  'mt-1.5 font-semibold tracking-tight',
                  item.kind === 'status' ? 'text-[0.94rem]' : 'text-[1.02rem]',
                  item.quiet ? 'text-text-secondary/90 dark:text-white/[0.74]' : 'text-text-primary dark:text-white'
                )}
              >
                {item.value}
              </p>
              <p className="mt-1.5 text-[0.72rem] leading-snug text-text-secondary dark:text-white/[0.56]">{item.note}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {liveFavorites.length === 0 ? (
        <SectionCard className="border border-black/[0.045] bg-white/[0.84] px-4 py-4.5 text-center shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
          <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-[1.05rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:bg-[rgba(var(--accent-orange),0.10)]">
            <SparkIcon />
          </div>
          <p className="mt-3.5 text-[1rem] font-semibold text-text-primary dark:text-white">{emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-[18.5rem] text-[0.9rem] leading-relaxed text-text-secondary dark:text-white/[0.62]">
            {emptyBody}
          </p>
        </SectionCard>
      ) : (
        <section className="space-y-2.5">
          <div className="flex items-center gap-3 px-1">
            <h2 className="shrink-0 text-[0.95rem] font-semibold tracking-tight text-text-primary dark:text-white">
              {isRussian ? 'Сейчас в эфире' : 'Live now'}
            </h2>
            <div className="h-px flex-1 bg-black/[0.055] dark:bg-white/[0.08]" />
            <span className="inline-flex min-w-[1.45rem] items-center justify-center rounded-full bg-black/[0.03] px-2 py-1 text-[0.66rem] font-semibold text-text-muted dark:bg-white/[0.05] dark:text-white/[0.42]">
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
