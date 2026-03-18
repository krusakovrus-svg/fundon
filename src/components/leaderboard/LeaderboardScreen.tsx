'use client';

import { useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { liveEvents } from '@/data/liveEvents';
import { mockData } from '@/data/mock';
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
  return language === 'ru' && entry.nameRu && !entry.nameRu.includes('Р ') ? entry.nameRu : entry.name;
}

export function LeaderboardScreen() {
  const { language, t } = useLanguage();
  const [scope, setScope] = useState<LeaderboardScope>('global');
  const [activeLiveEventId, setActiveLiveEventId] = useState<string>('all');

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

  const scopeDescription =
    scope === 'global'
      ? language === 'ru'
        ? 'Следите за лидерами поддержки и своим прогрессом во всей системе.'
        : 'Track support leaders and your current climb across the whole app.'
      : scope === 'today'
        ? language === 'ru'
          ? 'Сегодняшняя таблица показывает, кто быстрее всех набирает очки за live-поддержку.'
          : 'Today shows who is climbing fastest through live support.'
        : language === 'ru'
          ? 'Live-таблица показывает лидеров поддержки прямо в текущих эфирах.'
          : 'The live table shows support leaders across the current live events.';

  const scopeOptions = [
    { value: 'global' as const, label: language === 'ru' ? 'Общий' : 'Overall' },
    { value: 'live' as const, label: t('liveNow') },
    { value: 'today' as const, label: language === 'ru' ? 'За сегодня' : 'Today' }
  ];

  const currentUserLabel = t('you');
  const fastestRiseLabel =
    scope === 'global'
      ? getEntryLabel(globalEntries[3], language)
      : scope === 'today'
        ? getEntryLabel(todayEntries[0], language)
        : getEntryLabel(activeEntries[0], language);

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader eyebrow={t('leaderboardPreview')} title={t('leaderboardTitle')} description={scopeDescription} />

      <div className="grid grid-cols-3 gap-3">
        <SectionCard className="px-3 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{t('currentRank')}</p>
          <p className="mt-3 text-[1.45rem] font-semibold tracking-tight text-text-primary">#{activeUserStats.rank}</p>
        </SectionCard>
        <SectionCard className="px-3 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{t('points')}</p>
          <p className="mt-3 text-[1.45rem] font-semibold tracking-tight text-text-primary">{activeUserStats.points}</p>
        </SectionCard>
        <SectionCard className="px-3 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
            {language === 'ru' ? 'До топ-3' : 'To top 3'}
          </p>
          <p className="mt-3 text-[1.45rem] font-semibold tracking-tight text-text-primary">{pointsToTopThree}</p>
        </SectionCard>
      </div>

      <SectionCard className="px-4 py-4">
        <div className="flex flex-col gap-3">
          <SegmentedControl value={scope} options={scopeOptions} onChange={setScope} className="w-full" />

          {scope === 'live' ? (
            <div className="overflow-x-auto">
              <div className="flex min-w-max gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLiveEventId('all')}
                  className={`app-pill ${activeLiveEventId === 'all' ? 'border-accent text-text-primary' : ''}`}
                >
                  {language === 'ru' ? 'Все live' : 'All live'}
                </button>
                {liveEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setActiveLiveEventId(event.id)}
                    className={`app-pill ${activeLiveEventId === event.id ? 'border-accent text-text-primary' : ''}`}
                  >
                    {language === 'ru' ? event.headlineRu : event.headline}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard className="px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text-primary">{t('topThree')}</h3>
          <span className="text-xs text-text-muted">{activeEntries.length}</span>
        </div>

        <div className="mt-4 space-y-3">
          {podium[0] ? (
            <div className="rounded-[22px] border border-accent/30 bg-accent/10 px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">#1</p>
                  <p className="mt-2 truncate text-xl font-semibold text-text-primary">
                    {getEntryLabel(podium[0], language)}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {t('streak')}: {podium[0].streak}
                  </p>
                </div>
                <p className="shrink-0 text-[1.8rem] font-semibold tracking-tight text-text-primary">
                  {podium[0].points}
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            {podium.slice(1).map((entry, index) => (
              <div key={entry.id} className="rounded-[20px] border border-border-subtle bg-surface-subtle px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">#{index + 2}</p>
                    <p className="mt-2 truncate text-base font-semibold text-text-primary">
                      {getEntryLabel(entry, language)}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      {t('streak')}: {entry.streak}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-semibold tracking-tight text-text-primary">{entry.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard className="px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text-primary">{t('leaderboardTitle')}</h3>
          <span className="text-xs text-text-muted">
            {scope === 'live' && selectedLiveEvent ? (language === 'ru' ? selectedLiveEvent.categoryLabelRu : selectedLiveEvent.categoryLabel) : t('allEvents')}
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {listEntries.map((entry, index) => (
            <div key={entry.id} className="app-subtle-card flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary">
                  #{index + 4} {getEntryLabel(entry, language)}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {t('streak')}: {entry.streak}
                </p>
              </div>
              <p className="text-xl font-semibold tracking-tight text-text-primary">{entry.points}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
              {language === 'ru' ? 'Моя позиция' : 'My position'}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-text-primary">{currentUserLabel}</h3>
          </div>
          <span className="app-pill">#{activeUserStats.rank}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-border-subtle bg-surface-subtle px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{t('points')}</p>
            <p className="mt-2 text-base font-semibold text-text-primary">{activeUserStats.points}</p>
          </div>
          <div className="rounded-[18px] border border-border-subtle bg-surface-subtle px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              {language === 'ru' ? 'До следующего места' : 'To next place'}
            </p>
            <p className="mt-2 text-base font-semibold text-text-primary">{pointsToNextPlace}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-text-secondary">
          {language === 'ru'
            ? `До #${activeUserStats.nextRank} осталось ${pointsToNextPlace} очков.`
            : `${pointsToNextPlace} points left to reach #${activeUserStats.nextRank}.`}
        </p>
      </SectionCard>

      <SectionCard className="px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
          {language === 'ru' ? 'Самый быстрый рост' : 'Fastest rise'}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-text-primary">{fastestRiseLabel}</p>
            <p className="mt-1 text-sm text-text-secondary">
              {scope === 'live'
                ? language === 'ru'
                  ? 'Live-таблицы сейчас двигаются быстрее всего вокруг текущих эфиров.'
                  : 'The live tables are moving fastest around current events.'
                : language === 'ru'
                  ? 'Эта поддержка быстрее всех набирает очки в текущем окне.'
                  : 'This support run is climbing fastest in the current window.'}
            </p>
          </div>
          <span className="app-pill">
            {scope === 'live' ? t('liveNow') : scope === 'today' ? (language === 'ru' ? 'Сегодня' : 'Today') : t('leaderboardTitle')}
          </span>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
