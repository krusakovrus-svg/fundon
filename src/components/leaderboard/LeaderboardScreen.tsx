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
  const { language } = useLanguage();
  const [scope, setScope] = useState<LeaderboardScope>('global');
  const [activeLiveEventId, setActiveLiveEventId] = useState<string>('all');

  const isRussian = language === 'ru';
  const leaderboardTitle = isRussian ? 'Рейтинги' : 'Leaderboard';
  const overallEntries = useMemo(() => sortEntries([...mockData.leaderboard, ...globalExtraEntries]), []);
  const dailyEntries = useMemo(() => sortEntries(todayEntries), []);
  const allLiveEntries = useMemo(
    () => sortEntries(liveEvents.flatMap((event) => [...event.leaderboard, ...(liveExtraEntries[event.id] ?? [])])),
    []
  );
  const selectedLiveEvent = liveEvents.find((event) => event.id === activeLiveEventId) ?? null;
  const selectedLiveEntries = selectedLiveEvent
    ? sortEntries([...selectedLiveEvent.leaderboard, ...(liveExtraEntries[selectedLiveEvent.id] ?? [])])
    : allLiveEntries;

  const activeEntries = scope === 'global' ? overallEntries : scope === 'today' ? dailyEntries : selectedLiveEntries;
  const activeUserStats =
    scope === 'live' && activeLiveEventId !== 'all'
      ? userLiveEventStats[activeLiveEventId] ?? userScopeStats.live
      : userScopeStats[scope];

  const podium = activeEntries.slice(0, 3);
  const listEntries = activeEntries.slice(3);
  const topThreeThreshold = podium[2]?.points ?? podium[podium.length - 1]?.points ?? activeUserStats.points;
  const pointsToTopThree = Math.max(topThreeThreshold - activeUserStats.points, 0);
  const pointsToNextPlace = Math.max(activeUserStats.nextTargetPoints - activeUserStats.points, 0);
  const currentUserLabel = isRussian ? 'Вы' : 'You';
  const pointsLabel = isRussian ? 'Очки' : 'Points';
  const streakLabel = isRussian ? 'Серия поддержки' : 'Support streak';
  const currentRankLabel = isRussian ? 'Текущее место' : 'Current rank';
  const topThreeLabel = isRussian ? 'До топ-3' : 'To top 3';
  const nextPlaceLabel = isRussian ? 'До следующего места' : 'To next place';
  const myPositionLabel = isRussian ? 'Моя позиция' : 'My position';
  const fastestRiseLabel = isRussian ? 'Самый быстрый рост' : 'Fastest rise';

  const leaderboardContextLabel =
    scope === 'live' && selectedLiveEvent
      ? isRussian
        ? selectedLiveEvent.headlineRu
        : selectedLiveEvent.headline
      : scope === 'today'
        ? isRussian
          ? 'Только за сегодня'
          : 'Today only'
        : isRussian
          ? 'Все участники'
          : 'All supporters';

  const summaryItems = [
    {
      label: currentRankLabel,
      value: `#${activeUserStats.rank}`,
      note:
        scope === 'live'
          ? isRussian
            ? 'в live-таблице'
            : 'in live ranking'
          : scope === 'today'
            ? isRussian
              ? 'за сегодня'
              : 'for today'
            : isRussian
              ? 'в общем списке'
              : 'overall'
    },
    {
      label: pointsLabel,
      value: activeUserStats.points.toString(),
      note:
        scope === 'today'
          ? isRussian
            ? 'набрано за день'
            : 'gained today'
          : scope === 'live'
            ? isRussian
              ? 'в текущем эфире'
              : 'in current live'
            : isRussian
              ? 'всего очков'
              : 'total points'
    },
    {
      label: topThreeLabel,
      value: pointsToTopThree.toString(),
      note:
        pointsToTopThree === 0
          ? isRussian
            ? 'вы уже внутри'
            : 'already there'
          : isRussian
            ? 'до прорыва'
            : 'to breakthrough'
    }
  ];

  const scopeOptions = [
    { value: 'global' as const, label: isRussian ? 'Общий' : 'Overall' },
    { value: 'live' as const, label: isRussian ? 'Сейчас в эфире' : 'Live now' },
    { value: 'today' as const, label: isRussian ? 'За сегодня' : 'Today' }
  ];

  const fastestRiseEntry =
    scope === 'global' ? overallEntries[3] : scope === 'today' ? dailyEntries[0] : activeEntries[0];
  const fastestRiseName = fastestRiseEntry ? getEntryLabel(fastestRiseEntry, language) : currentUserLabel;
  const fastestRiseStreak = fastestRiseEntry?.streak ?? activeUserStats.rank;
  const insightCopy =
    scope === 'live'
      ? isRussian
        ? 'Live-таблица быстрее всего реагирует на всплески поддержки вокруг текущих эфиров.'
        : 'The live table reacts fastest to support spikes around current events.'
      : scope === 'today'
        ? isRussian
          ? 'Сегодня в таблице лучше всего видно, кто быстрее остальных набирает очки поддержки.'
          : 'Today shows who is gaining support points the fastest.'
        : isRussian
          ? 'Общий рейтинг собирает самых стабильных фанатов по всей системе поддержки.'
          : 'The overall table highlights the most consistent supporters across the app.';

  const topCardClass =
    'app-card rounded-[1.42rem] px-2.5 py-2.5 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(18,24,37,0.86),rgba(11,16,27,0.82))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]';
  const cardClass =
    'border border-black/[0.045] bg-white/[0.86] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]';
  const tileClass =
    'rounded-[1.08rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]';
  const badgeClass =
    'inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-black/[0.03] px-2 py-1 text-[0.66rem] font-semibold text-text-muted dark:bg-white/[0.05] dark:text-white/[0.42]';
  const avatarClass =
    'inline-flex items-center justify-center rounded-full border border-black/[0.045] bg-white text-[0.78rem] font-semibold text-text-primary shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(39,48,63,0.96),rgba(27,35,49,0.92))] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]';

  return (
    <MainPageLayout className="space-y-3.5">
      <PageHeader title={leaderboardTitle} />

      <section className={topCardClass}>
        <div className="grid grid-cols-3 gap-2">
          {summaryItems.map((item) => (
            <div key={item.label} className={tileClass}>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[1.08rem] font-semibold leading-none tracking-tight text-text-primary dark:text-white">
                {item.value}
              </p>
              <p className="mt-1.5 text-[0.7rem] leading-snug text-text-secondary dark:text-white/[0.56]">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="app-card rounded-[1.3rem] p-1.5 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(18,24,37,0.84),rgba(11,16,27,0.80))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
          <div className="grid grid-cols-3 gap-1">
            {scopeOptions.map((option) => {
              const active = option.value === scope;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setScope(option.value)}
                  className={cn(
                    'rounded-[0.98rem] px-3 py-2.5 text-[0.82rem] font-semibold tracking-tight transition-all',
                    active
                      ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,250,252,0.92))] text-text-primary shadow-[0_10px_20px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.03] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,124,65,0.06))] dark:text-white dark:ring-white/[0.05] dark:shadow-[0_8px_18px_rgba(255,124,65,0.05)]'
                      : 'text-text-secondary hover:bg-black/[0.025] hover:text-text-primary dark:text-white/[0.58] dark:hover:bg-white/[0.04] dark:hover:text-white/[0.92]'
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
            <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">
              {isRussian ? 'Эфиры' : 'Live events'}
            </p>

            <div className="-mx-1 overflow-x-auto px-1">
              <div className="flex min-w-max gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLiveEventId('all')}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[0.8rem] font-medium transition',
                    activeLiveEventId === 'all'
                      ? 'border-black/[0.04] bg-white text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,124,65,0.05))] dark:text-white dark:shadow-[0_8px_16px_rgba(255,124,65,0.04)]'
                      : 'border-black/[0.045] bg-[rgba(247,249,252,0.76)] text-text-secondary hover:border-black/[0.06] hover:text-text-primary dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:text-white/[0.62]'
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
                      'rounded-full border px-3 py-1.5 text-[0.8rem] font-medium transition',
                      activeLiveEventId === event.id
                        ? 'border-black/[0.04] bg-white text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,124,65,0.05))] dark:text-white dark:shadow-[0_8px_16px_rgba(255,124,65,0.04)]'
                        : 'border-black/[0.045] bg-[rgba(247,249,252,0.76)] text-text-secondary hover:border-black/[0.06] hover:text-text-primary dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:text-white/[0.62]'
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

      <SectionCard className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
              {isRussian ? 'Топ 3' : 'Top 3'}
            </p>
            <p className="mt-1 text-sm text-text-secondary dark:text-white/[0.58]">{leaderboardContextLabel}</p>
          </div>
          <span className={badgeClass}>{activeEntries.length}</span>
        </div>

        <div className="mt-4 space-y-3">
          {podium[0] ? (
            <div className="rounded-[1.35rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] px-4 py-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(29,37,51,0.96),rgba(20,27,41,0.92))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.16)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-[rgba(var(--accent-orange),0.10)] px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--accent-orange))] dark:bg-[rgba(var(--accent-orange),0.12)]">
                    #1
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <div className={cn(avatarClass, 'h-12 w-12 text-sm')}>{getInitials(getEntryLabel(podium[0], language))}</div>
                    <div className="min-w-0">
                      <p className="truncate text-[1.1rem] font-semibold text-text-primary dark:text-white">
                        {getEntryLabel(podium[0], language)}
                      </p>
                      <p className="mt-1 text-[0.84rem] text-text-secondary dark:text-white/[0.56]">
                        {streakLabel} {podium[0].streak}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[1.74rem] font-semibold tracking-tight text-text-primary dark:text-white">{podium[0].points}</p>
                  <p className="mt-1 text-[11px] font-medium text-text-muted dark:text-white/[0.42]">{pointsLabel}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            {podium.slice(1).map((entry, index) => (
              <div key={entry.id} className={tileClass}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-muted dark:text-white/[0.42]">
                      #{index + 2}
                    </span>
                    <div className="mt-2 flex items-center gap-2.5">
                      <div className={cn(avatarClass, 'h-10 w-10')}>{getInitials(getEntryLabel(entry, language))}</div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.98rem] font-semibold text-text-primary dark:text-white/[0.94]">
                          {getEntryLabel(entry, language)}
                        </p>
                        <p className="mt-0.5 text-[12px] text-text-secondary dark:text-white/[0.54]">
                          {streakLabel} {entry.streak}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="shrink-0 text-[1.02rem] font-semibold tracking-tight text-text-primary dark:text-white">{entry.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
              {leaderboardTitle}
            </p>
            <p className="mt-1 text-sm text-text-secondary dark:text-white/[0.58]">{leaderboardContextLabel}</p>
          </div>
          <span className={badgeClass}>{activeEntries.length}</span>
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-black/[0.045] bg-[rgba(247,249,252,0.72)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(24,31,45,0.92),rgba(18,24,36,0.88))]">
          {listEntries.length ? (
            listEntries.map((entry, index) => {
              const rank = index + 4;

              return (
                <div
                  key={entry.id}
                  className={cn(
                    'flex items-center justify-between gap-3 px-3.5 py-3.25',
                    index !== listEntries.length - 1 && 'border-b border-black/[0.035] dark:border-white/[0.05]'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white/84 text-[0.72rem] font-semibold text-text-secondary shadow-[inset_0_0_0_1px_rgba(15,23,42,0.05)] dark:bg-white/[0.05] dark:text-white/[0.58] dark:shadow-none">
                      #{rank}
                    </div>
                    <div className={cn(avatarClass, 'h-10 w-10')}>{getInitials(getEntryLabel(entry, language))}</div>
                    <div className="min-w-0">
                      <p className="truncate text-[0.95rem] font-semibold text-text-primary dark:text-white/[0.94]">
                        {getEntryLabel(entry, language)}
                      </p>
                      <p className="mt-0.5 text-[12px] text-text-secondary dark:text-white/[0.52]">
                        {streakLabel} {entry.streak}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[1.01rem] font-semibold tracking-tight text-text-primary dark:text-white">{entry.points}</p>
                    <p className="mt-0.5 text-[11px] text-text-muted dark:text-white/[0.42]">{pointsLabel}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-4 text-sm text-text-secondary dark:text-white/[0.56]">
              {isRussian ? 'Пока нет дополнительных позиций в этой таблице.' : 'No additional ranking rows yet.'}
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard className={cardClass}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
              {myPositionLabel}
            </p>
            <h3 className="mt-1.5 text-[1.02rem] font-semibold text-text-primary dark:text-white">{currentUserLabel}</h3>
          </div>
          <span className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.88)] px-3 py-1.5 text-[0.75rem] font-semibold text-text-primary dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white">
            #{activeUserStats.rank}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={tileClass}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.42]">{pointsLabel}</p>
            <p className="mt-2 text-[1.34rem] font-semibold tracking-tight text-text-primary dark:text-white">{activeUserStats.points}</p>
          </div>
          <div className={tileClass}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.42]">{nextPlaceLabel}</p>
            <p className="mt-2 text-[1.34rem] font-semibold tracking-tight text-text-primary dark:text-white">{pointsToNextPlace}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.08rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3.5 py-3 dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(31,39,53,0.94),rgba(21,28,40,0.90))]">
          <p className="text-[0.94rem] font-medium text-text-primary dark:text-white/[0.9]">
            {isRussian
              ? `До #${activeUserStats.nextRank} осталось ${pointsToNextPlace} очков`
              : `${pointsToNextPlace} points left to reach #${activeUserStats.nextRank}`}
          </p>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-text-secondary dark:text-white/[0.58]">
            {isRussian
              ? 'Ещё один сильный рывок по поддержке поднимет вас выше в таблице.'
              : 'One more strong support push can move you up the table.'}
          </p>
        </div>
      </SectionCard>

      <SectionCard className={cardClass}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
              {fastestRiseLabel}
            </p>
            <p className="mt-1.5 text-[1.02rem] font-semibold text-text-primary dark:text-white">{fastestRiseName}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-white/[0.58]">{insightCopy}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="app-pill">
              {scope === 'live' ? (isRussian ? 'В эфире' : 'Live') : scope === 'today' ? (isRussian ? 'Сегодня' : 'Today') : leaderboardTitle}
            </span>
            <p className="mt-2 text-[0.78rem] text-text-secondary dark:text-white/[0.56]">
              {streakLabel} {fastestRiseStreak}
            </p>
          </div>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
