'use client';

import { useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { liveEvents } from '@/data/liveEvents';
import { mockData } from '@/data/mock';
import { cn } from '@/lib/utils';
import type { LeaderboardEntry } from '@/types';

type LeaderboardScope = 'global' | 'live' | 'today';

interface UserScopeStats {
  rank: number;
  points: number;
  nextRank: number;
  nextTargetPoints: number;
}

const globalExtraEntries: LeaderboardEntry[] = [
  { id: 'user_4', name: 'Mila', nameRu: 'Мила', points: 680, streak: 5 },
  { id: 'user_5', name: 'Oleg', nameRu: 'Олег', points: 640, streak: 4 },
  { id: 'user_6', name: 'Dan', nameRu: 'Дан', points: 590, streak: 4 },
  { id: 'user_7', name: 'Yana', nameRu: 'Яна', points: 520, streak: 3 },
  { id: 'user_8', name: 'Petr', nameRu: 'Петр', points: 465, streak: 3 },
  { id: 'user_9', name: 'Sasha', nameRu: 'Саша', points: 440, streak: 2 }
];

const todayEntries: LeaderboardEntry[] = [
  { id: 'today_1', name: 'Mila', nameRu: 'Мила', points: 580, streak: 4 },
  { id: 'today_2', name: 'Dan', nameRu: 'Дан', points: 540, streak: 5 },
  { id: 'today_3', name: 'Alex', nameRu: 'Алекс', points: 490, streak: 3 },
  { id: 'today_4', name: 'Nika', nameRu: 'Ника', points: 430, streak: 3 },
  { id: 'today_5', name: 'Oleg', nameRu: 'Олег', points: 395, streak: 2 },
  { id: 'today_6', name: 'Artem', nameRu: 'Артем', points: 360, streak: 2 }
];

const liveExtraEntries: Record<string, LeaderboardEntry[]> = {
  event_live_001: [
    { id: 'fight_live_4', name: 'Nika', nameRu: 'Ника', points: 640, streak: 4 },
    { id: 'fight_live_5', name: 'Tim', nameRu: 'Тим', points: 520, streak: 3 },
    { id: 'fight_live_6', name: 'Rita', nameRu: 'Рита', points: 430, streak: 2 }
  ],
  event_live_volleyball_001: [
    { id: 'volley_live_4', name: 'Maks', nameRu: 'Макс', points: 760, streak: 4 },
    { id: 'volley_live_5', name: 'Ira', nameRu: 'Ира', points: 620, streak: 3 },
    { id: 'volley_live_6', name: 'Vlad', nameRu: 'Влад', points: 510, streak: 2 }
  ],
  event_live_esports_001: [
    { id: 'esports_live_4', name: 'Roma', nameRu: 'Рома', points: 720, streak: 4 },
    { id: 'esports_live_5', name: 'Kirill', nameRu: 'Кирилл', points: 605, streak: 3 },
    { id: 'esports_live_6', name: 'Liza', nameRu: 'Лиза', points: 470, streak: 2 }
  ]
};

const userScopeStats: Record<LeaderboardScope, UserScopeStats> = {
  global: { rank: 18, points: 420, nextRank: 17, nextTargetPoints: 446 },
  today: { rank: 9, points: 175, nextRank: 8, nextTargetPoints: 210 },
  live: { rank: 5, points: 345, nextRank: 4, nextTargetPoints: 390 }
};

const userLiveEventStats: Record<string, UserScopeStats> = {
  event_live_001: { rank: 7, points: 160, nextRank: 6, nextTargetPoints: 205 },
  event_live_volleyball_001: { rank: 6, points: 140, nextRank: 5, nextTargetPoints: 175 },
  event_live_esports_001: { rank: 5, points: 120, nextRank: 4, nextTargetPoints: 165 }
};

function sortEntries(entries: LeaderboardEntry[]) {
  return [...entries].sort((left, right) => right.points - left.points);
}

function getEntryLabel(entry: LeaderboardEntry, language: 'ru' | 'en') {
  return language === 'ru' && entry.nameRu ? entry.nameRu : entry.name;
}

function getInitials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2);
}

export function LeaderboardScreen() {
  const { language, t } = useLanguage();
  const [scope, setScope] = useState<LeaderboardScope>('global');
  const [activeLiveEventId, setActiveLiveEventId] = useState<string>('all');

  const isRussian = language === 'ru';
  const globalEntries = sortEntries([...mockData.leaderboard, ...globalExtraEntries]);
  const allLiveEntries = sortEntries(
    liveEvents.flatMap((event) => [...event.leaderboard, ...(liveExtraEntries[event.id] ?? [])])
  );
  const selectedLiveEvent = liveEvents.find((event) => event.id === activeLiveEventId) ?? null;
  const selectedLiveEntries = selectedLiveEvent
    ? sortEntries([...selectedLiveEvent.leaderboard, ...(liveExtraEntries[selectedLiveEvent.id] ?? [])])
    : allLiveEntries;

  const activeEntries =
    scope === 'global' ? globalEntries : scope === 'today' ? sortEntries(todayEntries) : selectedLiveEntries;

  const activeUserStats =
    scope === 'live' && activeLiveEventId !== 'all'
      ? userLiveEventStats[activeLiveEventId] ?? userScopeStats.live
      : userScopeStats[scope];

  const podium = activeEntries.slice(0, 3);
  const listEntries = activeEntries.slice(3);
  const topThreeThreshold = podium[2]?.points ?? podium[podium.length - 1]?.points ?? activeUserStats.points;
  const pointsToTopThree = Math.max(topThreeThreshold - activeUserStats.points, 0);
  const pointsToNextPlace = Math.max(activeUserStats.nextTargetPoints - activeUserStats.points, 0);
  const currentUserLabel = t('you');
  const leaderboardContextLabel =
    scope === 'live' && selectedLiveEvent
      ? isRussian
        ? selectedLiveEvent.headlineRu
        : selectedLiveEvent.headline
      : scope === 'today'
        ? (isRussian ? 'Только за сегодня' : 'Today only')
        : (isRussian ? 'Все участники' : 'All supporters');

  const summaryItems = [
    { label: t('currentRank'), value: `#${activeUserStats.rank}`, emphasis: 'text-text-primary' },
    { label: t('points'), value: activeUserStats.points.toString(), emphasis: 'text-text-primary' },
    {
      label: isRussian ? 'До топ-3' : 'To top 3',
      value: pointsToTopThree.toString(),
      emphasis: pointsToTopThree === 0 ? 'text-[rgb(var(--accent-green))]' : 'text-text-primary'
    }
  ];

  const scopeOptions = [
    { value: 'global' as const, label: isRussian ? 'Общий' : 'Overall' },
    { value: 'live' as const, label: isRussian ? 'Сейчас в эфире' : 'Live now' },
    { value: 'today' as const, label: isRussian ? 'За сегодня' : 'Today' }
  ];

  const fastestRiseEntry =
    scope === 'global' ? globalEntries[3] : scope === 'today' ? sortEntries(todayEntries)[0] : activeEntries[0];
  const fastestRiseLabel = fastestRiseEntry ? getEntryLabel(fastestRiseEntry, language) : currentUserLabel;

  const insightCopy =
    scope === 'live'
      ? isRussian
        ? 'Live-таблица двигается быстрее всего вокруг текущих эфиров и резких всплесков поддержки.'
        : 'The live table moves fastest around the current events and support surges.'
      : scope === 'today'
        ? isRussian
          ? 'Сегодняшний рейтинг показывает, кто быстрее всех набирает очки поддержки за текущий день.'
          : 'Today shows who is gaining support points fastest right now.'
        : isRussian
          ? 'Общий рейтинг собирает самых стабильных фанатов по всей системе поддержки.'
          : 'The overall table highlights the most consistent supporters across the app.';

  return (
    <MainPageLayout className="space-y-[1.125rem]">
      <PageHeader title={t('leaderboardTitle')} />

      <section className="app-card rounded-[1.45rem] px-2.5 py-2.5">
        <div className="grid grid-cols-3 gap-2">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                'rounded-[1rem] border border-black/[0.045] bg-[rgba(247,249,252,0.84)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none',
                item.value === '0' && 'bg-[rgba(247,249,252,0.68)]'
              )}
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{item.label}</p>
              <p className={cn('mt-1.5 text-[1.08rem] font-semibold leading-none tracking-tight', item.emphasis)}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="app-card rounded-[1.35rem] p-1.5">
          <div className="grid grid-cols-3 gap-1">
            {scopeOptions.map((option) => {
              const active = option.value === scope;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setScope(option.value)}
                  className={cn(
                    'rounded-[1rem] px-3 py-2.5 text-[0.84rem] font-semibold tracking-tight transition',
                    active
                      ? 'bg-white text-text-primary shadow-[0_10px_20px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.03] dark:bg-white/[0.1] dark:ring-0 dark:shadow-none'
                      : 'text-text-secondary hover:bg-black/[0.025] hover:text-text-primary dark:hover:bg-white/[0.04]'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {scope === 'live' ? (
          <div className="space-y-2">
            <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
              {isRussian ? 'Эфиры' : 'Live events'}
            </p>

            <div className="-mx-1 overflow-x-auto px-1">
              <div className="flex min-w-max gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLiveEventId('all')}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[0.82rem] font-medium transition',
                    activeLiveEventId === 'all'
                      ? 'border-black/[0.04] bg-white text-text-primary shadow-[0_8px_20px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.08] dark:shadow-none'
                      : 'border-black/[0.045] bg-[rgba(247,249,252,0.76)] text-text-secondary hover:border-black/[0.06] hover:text-text-primary dark:border-white/8 dark:bg-white/[0.03]'
                  )}
                >
                  {isRussian ? 'Все live' : 'All live'}
                </button>
                {liveEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setActiveLiveEventId(event.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-[0.82rem] font-medium transition',
                      activeLiveEventId === event.id
                        ? 'border-black/[0.04] bg-white text-text-primary shadow-[0_8px_20px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.08] dark:shadow-none'
                        : 'border-black/[0.045] bg-[rgba(247,249,252,0.76)] text-text-secondary hover:border-black/[0.06] hover:text-text-primary dark:border-white/8 dark:bg-white/[0.03]'
                    )}
                  >
                    {isRussian ? event.headlineRu : event.headline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <SectionCard className="border border-black/[0.045] bg-white/[0.86] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('topThree')}</p>
            <p className="mt-1 text-sm text-text-secondary">{leaderboardContextLabel}</p>
          </div>
          <span className="inline-flex min-w-[1.65rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
            {activeEntries.length}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {podium[0] ? (
            <div className="rounded-[1.35rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,248,252,0.92))] px-4 py-4 dark:border-white/8 dark:bg-white/[0.07]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-[rgba(var(--accent-orange),0.10)] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-primary">
                    #1
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.045] bg-white text-sm font-semibold text-text-primary dark:border-white/10 dark:bg-white/10 dark:text-white">
                      {getInitials(getEntryLabel(podium[0], language))}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[1.12rem] font-semibold text-text-primary">
                        {getEntryLabel(podium[0], language)}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {t('streak')}: {podium[0].streak}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[1.8rem] font-semibold tracking-tight text-text-primary">{podium[0].points}</p>
                  <p className="mt-1 text-[11px] font-medium text-text-muted">{t('points')}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            {podium.slice(1).map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-[1.2rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:border-white/8 dark:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
                      #{index + 2}
                    </span>
                    <div className="mt-2 flex items-center gap-2.5">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.045] bg-white text-[0.78rem] font-semibold text-text-primary dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {getInitials(getEntryLabel(entry, language))}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.98rem] font-semibold text-text-primary">
                          {getEntryLabel(entry, language)}
                        </p>
                        <p className="mt-0.5 text-[12px] text-text-secondary">
                          {t('streak')}: {entry.streak}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="shrink-0 text-[1.05rem] font-semibold tracking-tight text-text-primary">{entry.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardTitle')}</p>
            <p className="mt-1 text-sm text-text-secondary">{leaderboardContextLabel}</p>
          </div>
          <span className="inline-flex min-w-[1.65rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
            {activeEntries.length}
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-black/[0.045] bg-[rgba(247,249,252,0.72)] dark:border-white/8 dark:bg-white/[0.04]">
          {listEntries.length ? (
            listEntries.map((entry, index) => {
              const rank = index + 4;

              return (
                <div
                  key={entry.id}
                  className={cn(
                    'flex items-center justify-between gap-3 px-3.5 py-3.5',
                    index !== listEntries.length - 1 && 'border-b border-black/[0.045] dark:border-white/8'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white text-[0.72rem] font-semibold text-text-secondary shadow-[inset_0_0_0_1px_rgba(15,23,42,0.05)] dark:bg-white/[0.08] dark:text-text-secondary dark:shadow-none">
                      #{rank}
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.045] bg-white text-[0.78rem] font-semibold text-text-primary dark:border-white/10 dark:bg-white/10 dark:text-white">
                      {getInitials(getEntryLabel(entry, language))}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[0.96rem] font-semibold text-text-primary">
                        {getEntryLabel(entry, language)}
                      </p>
                      <p className="mt-0.5 text-[12px] text-text-secondary">
                        {t('streak')}: {entry.streak}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[1.02rem] font-semibold tracking-tight text-text-primary">{entry.points}</p>
                    <p className="mt-0.5 text-[11px] text-text-muted">{t('points')}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-4 text-sm text-text-secondary">
              {isRussian ? 'Пока нет дополнительных позиций в этой таблице.' : 'No additional ranking rows yet.'}
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
              {isRussian ? 'Моя позиция' : 'My position'}
            </p>
            <h3 className="mt-2 text-[1.02rem] font-semibold text-text-primary">{currentUserLabel}</h3>
          </div>
          <span className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.86)] px-3 py-1.5 text-[0.75rem] font-semibold text-text-primary dark:border-white/8 dark:bg-white/[0.05] dark:text-white">
            #{activeUserStats.rank}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:border-white/8 dark:bg-white/[0.04]">
            <p className="text-[11px] font-medium text-text-muted">{t('points')}</p>
            <p className="mt-2 text-[1.3rem] font-semibold tracking-tight text-text-primary">{activeUserStats.points}</p>
          </div>
          <div className="rounded-[1.1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:border-white/8 dark:bg-white/[0.04]">
            <p className="text-[11px] font-medium text-text-muted">{isRussian ? 'До следующего места' : 'To next place'}</p>
            <p className="mt-2 text-[1.3rem] font-semibold tracking-tight text-text-primary">{pointsToNextPlace}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-text-secondary">
          {isRussian
            ? `До #${activeUserStats.nextRank} осталось ${pointsToNextPlace} очков.`
            : `${pointsToNextPlace} points left to reach #${activeUserStats.nextRank}.`}
        </p>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.78] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
              {isRussian ? 'Самый быстрый рост' : 'Fastest rise'}
            </p>
            <p className="mt-2 text-[1.02rem] font-semibold text-text-primary">{fastestRiseLabel}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{insightCopy}</p>
          </div>
          <span className="app-pill">
            {scope === 'live'
              ? t('liveNow')
              : scope === 'today'
                ? (isRussian ? 'Сегодня' : 'Today')
                : t('leaderboardTitle')}
          </span>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
