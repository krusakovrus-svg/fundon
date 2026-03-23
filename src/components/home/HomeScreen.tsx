'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { liveEvents } from '@/data/liveEvents';
import { getAllSportEvents } from '@/data/sportEvents';
import { getStoredSportPath } from '@/lib/sportsHome';
import { cn } from '@/lib/utils';
import type { SportEventRecord } from '@/types';

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function matchesQuery(event: SportEventRecord, normalizedQuery: string) {
  if (!normalizedQuery) return true;

  const haystack = [
    event.title,
    event.titleRu,
    ...event.participants.flatMap((participant) => [participant.name, participant.nameRu])
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

function isStaticLiveEvent(event: SportEventRecord) {
  const labels = [event.displayDateEn, event.displayDateRu]
    .filter(Boolean)
    .map((label) => label!.trim().toLowerCase());

  return labels.includes('live');
}

function isStaticTodayEvent(event: SportEventRecord) {
  const labels = [event.displayDateEn?.toLowerCase(), event.displayDateRu?.toLowerCase()].filter(Boolean) as string[];
  return labels.some((label) => label.includes('today') || label.includes('сегодня'));
}

function getSportIdFromPath(path: string | null | undefined) {
  if (!path?.startsWith('/sports/')) return null;
  return path.replace('/sports/', '') || null;
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <h2 className="shrink-0 text-[1rem] font-semibold tracking-tight text-text-primary">{title}</h2>
      <div className="h-px flex-1 bg-black/6 dark:bg-white/8" />
      <span className="inline-flex min-w-[1.7rem] items-center justify-center rounded-full border border-black/5 bg-white/65 px-2 py-1 text-[0.72rem] font-semibold text-text-secondary dark:border-white/8 dark:bg-white/[0.04]">
        {count}
      </span>
    </div>
  );
}

export function HomeScreen() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [preferredSportId, setPreferredSportId] = useState<string | null>(null);

  useEffect(() => {
    setPreferredSportId(getSportIdFromPath(getStoredSportPath()));
  }, []);

  const featuredEvent = liveEvents[0];
  const normalizedQuery = query.trim().toLowerCase();

  const feed = useMemo(() => {
    const allEvents = getAllSportEvents();
    const sortByPreference = (events: SportEventRecord[]) =>
      [...events].sort((left, right) => {
        const leftScore = left.sportId === preferredSportId ? 1 : 0;
        const rightScore = right.sportId === preferredSportId ? 1 : 0;
        return rightScore - leftScore;
      });

    const live = sortByPreference(allEvents.filter((event) => isStaticLiveEvent(event) && matchesQuery(event, normalizedQuery))).slice(0, 3);
    const today = sortByPreference(
      allEvents.filter((event) => !isStaticLiveEvent(event) && isStaticTodayEvent(event) && matchesQuery(event, normalizedQuery))
    ).slice(0, 4);

    return { live, today };
  }, [normalizedQuery, preferredSportId]);

  const featuredTitle = language === 'ru' ? featuredEvent.titleRu : featuredEvent.title;
  const featuredHeadline = language === 'ru' ? featuredEvent.headlineRu : featuredEvent.headline;
  const featuredCategory = language === 'ru' ? featuredEvent.categoryLabelRu : featuredEvent.categoryLabel;
  const featuredVenue = language === 'ru' ? featuredEvent.venueRu : featuredEvent.venue;
  const featuredStage = language === 'ru' ? featuredEvent.stageLabelRu : featuredEvent.stageLabel;

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <section className="app-card app-section-card overflow-hidden px-4 py-4">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-accent-orange/10 via-white/50 to-accent-blue/10 dark:from-accent-orange/12 dark:via-transparent dark:to-accent-blue/12" />

        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent-orange">
                  LIVE
                </span>
                <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {featuredCategory}
                </span>
              </div>

              <div>
                <p className="text-[0.92rem] font-medium text-text-secondary">{featuredTitle}</p>
                <h1 className="mt-1.5 text-[1.72rem] font-semibold tracking-tight text-text-primary">{featuredHeadline}</h1>
              </div>
            </div>

            <Link
              href="/live"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-orange/18 bg-accent-orange/10 px-3 py-2 text-[0.82rem] font-semibold text-text-primary shadow-[0_10px_24px_rgba(255,124,65,0.08)] transition hover:bg-accent-orange/14 dark:shadow-none"
            >
              <span>{language === 'ru' ? 'Поддержать' : 'Support'}</span>
              <ChevronIcon />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-text-secondary">
            {featuredStage ? (
              <span className="inline-flex items-center rounded-full bg-white/72 px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.05)] dark:bg-white/8 dark:shadow-none">
                {featuredStage}
              </span>
            ) : null}
            {featuredEvent.timerLabel ? (
              <span className="inline-flex items-center rounded-full bg-white/72 px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.05)] dark:bg-white/8 dark:shadow-none">
                {featuredEvent.timerLabel}
              </span>
            ) : null}
            <span className="truncate text-[0.82rem] text-text-muted">{featuredVenue}</span>
          </div>
        </div>
      </section>

      <section className="app-card flex items-center gap-3 rounded-[1.25rem] px-4 py-3">
        <span className="text-text-secondary">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={language === 'ru' ? 'Поиск по событиям, командам и турнирам' : 'Search events, teams, and tournaments'}
          className="w-full bg-transparent text-[0.95rem] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </section>

      <div className="space-y-4">
        <section className="space-y-2.5">
          <SectionHeader title={language === 'ru' ? 'Live' : 'Live'} count={feed.live.length} />
          {feed.live.length > 0 ? (
            <div className="space-y-2.5">
              {feed.live.map((event) => (
                <SportEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.3rem] border border-black/5 bg-white/68 px-4 py-5 text-[0.92rem] text-text-secondary shadow-[0_14px_32px_rgba(15,23,42,0.05)] dark:border-white/8 dark:bg-white/6 dark:shadow-none">
              {language === 'ru' ? 'Сейчас нет live-событий по этому фильтру.' : 'There are no live events for this filter right now.'}
            </div>
          )}
        </section>

        <section className="space-y-2.5">
          <SectionHeader title={language === 'ru' ? 'Сегодня' : 'Today'} count={feed.today.length} />
          {feed.today.length > 0 ? (
            <div className="space-y-2.5">
              {feed.today.map((event) => (
                <SportEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.3rem] border border-black/5 bg-white/68 px-4 py-5 text-[0.92rem] text-text-secondary shadow-[0_14px_32px_rgba(15,23,42,0.05)] dark:border-white/8 dark:bg-white/6 dark:shadow-none">
              {language === 'ru'
                ? 'Сегодня в ленте пока ничего не найдено. Попробуйте другой запрос или откройте События.'
                : 'Nothing is queued for today in this feed yet. Try another query or open Events.'}
            </div>
          )}
        </section>

        <Link
          href="/events"
          className="flex items-center justify-between rounded-[1.3rem] border border-black/5 bg-white/72 px-4 py-3.5 text-[0.95rem] font-medium text-text-primary shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition hover:bg-white dark:border-white/8 dark:bg-white/[0.04] dark:hover:bg-white/[0.06] dark:shadow-none"
        >
          <span>{language === 'ru' ? 'Открыть все события' : 'Open all events'}</span>
          <span className="text-text-secondary">
            <ChevronIcon />
          </span>
        </Link>
      </div>
    </MainPageLayout>
  );
}
