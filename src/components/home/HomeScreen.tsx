'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { liveEvents } from '@/data/liveEvents';
import { formatSportEventDate, formatSportEventTime, getAllSportEvents } from '@/data/sportEvents';
import { getSportById } from '@/data/sports';
import { getParticipantVisual } from '@/lib/participantVisuals';
import { getStoredSportPath } from '@/lib/sportsHome';
import type { SportEventParticipant, SportEventRecord } from '@/types';

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

function SparkGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3.8 13.9 8l4.3 1.7-4.3 1.7-1.9 4.2-1.9-4.2-4.3-1.7L10.1 8 12 3.8Z" strokeLinejoin="round" />
    </svg>
  );
}

function ParticipantBadge({ participant }: { participant: SportEventParticipant }) {
  const visual = getParticipantVisual(participant);

  if (!visual) {
    return <span className="inline-flex h-8 w-8 shrink-0 rounded-full bg-[rgba(var(--surface-muted),0.95)]" aria-hidden="true" />;
  }

  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/6 shadow-[0_3px_8px_rgba(15,23,42,0.10)] dark:bg-white/12 dark:ring-white/12">
      {visual.type === 'asset' ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="32px"
          className={visual.fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
      ) : (
        <span className="text-[1rem] leading-none">{visual.value}</span>
      )}
    </span>
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
  if (labels.some((label) => label.includes('today'))) {
    return true;
  }

  const startsAt = new Date(event.startsAt);
  const today = new Date('2026-03-23T00:00:00+03:00');
  const tomorrow = new Date('2026-03-24T00:00:00+03:00');
  return startsAt >= today && startsAt < tomorrow;
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
      <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-black/[0.035] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.06]">
        {count}
      </span>
    </div>
  );
}

function EmptyFeedCard({
  title,
  description,
  eyebrow
}: {
  title: string;
  description: string;
  eyebrow: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.3rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,249,252,0.74))] px-4 py-4 shadow-[0_12px_26px_rgba(15,23,42,0.05)] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.028))] dark:shadow-[0_14px_28px_rgba(2,6,23,0.16)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:bg-[rgba(var(--accent-orange),0.14)]">
          <SparkGlyph />
        </span>

        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{eyebrow}</p>
          <p className="mt-2 text-[0.98rem] font-semibold text-text-primary">{title}</p>
          <p className="mt-1.5 text-[0.84rem] leading-6 text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
}

function HomeEventCard({ event, language }: { event: SportEventRecord; language: 'ru' | 'en' }) {
  const isLive = isStaticLiveEvent(event);
  const title = language === 'ru' ? event.titleRu : event.title;
  const participants = event.participants.slice(0, 2);
  const rawDateLabel =
    language === 'ru'
      ? event.displayDateRu ?? formatSportEventDate(event.startsAt, language)
      : event.displayDateEn ?? formatSportEventDate(event.startsAt, language);
  const dateLabel =
    language === 'ru' && rawDateLabel.trim().toLowerCase() === 'завтра в' ? 'Завтра' : rawDateLabel;
  const timeLabel =
    language === 'ru'
      ? event.displayTimeRu ?? formatSportEventTime(event.startsAt, language)
      : event.displayTimeEn ?? formatSportEventTime(event.startsAt, language);
  const href = isLive ? '/live' : `/sports/${event.sportId}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[1.4rem] border border-black/5 bg-white/92 px-4 py-3.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition hover:bg-white dark:border-white/10 dark:bg-[rgba(var(--surface),0.92)] dark:hover:bg-[rgba(var(--surface),0.96)] dark:shadow-[0_14px_32px_rgba(2,6,23,0.28)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[0.78rem] font-medium text-text-secondary">{title}</p>
          <div className="mt-3 space-y-2.5">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2.5">
                <ParticipantBadge participant={participant} />
                <span className="truncate text-[0.98rem] font-semibold tracking-tight text-text-primary">
                  {language === 'ru' ? participant.nameRu : participant.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3 pl-2">
          {isLive ? (
            <span className="inline-flex items-center rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-orange">
              {language === 'ru' ? 'В эфире' : 'Live'}
            </span>
          ) : (
            <div className="text-right">
              <p className="text-[0.98rem] font-semibold tracking-tight text-text-primary">{timeLabel}</p>
              <p className="mt-0.5 text-[0.72rem] text-text-secondary">{dateLabel}</p>
            </div>
          )}

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(var(--surface-muted),0.72)] text-text-secondary transition group-hover:text-text-primary dark:bg-white/[0.06]">
            <ChevronIcon />
          </span>
        </div>
      </div>

      {isLive ? (
        <div className="mt-3 flex items-center gap-2 text-[0.76rem] text-text-secondary">
          <span className="truncate">{timeLabel}</span>
          <span className="h-1 w-1 rounded-full bg-text-muted" />
          <span>{language === 'ru' ? 'Прямо сейчас' : 'On now'}</span>
        </div>
      ) : null}
    </Link>
  );
}

export function HomeScreen() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [preferredSportId, setPreferredSportId] = useState<string | null>(null);
  const isRussian = language === 'ru';
  const preferredSport = preferredSportId ? getSportById(preferredSportId) : null;

  const labels = {
    support: isRussian ? 'Открыть эфир' : 'Open live',
    liveSection: isRussian ? 'В эфире' : 'Live',
    todaySection: isRussian ? 'Сегодня' : 'Today',
    openAllEvents: isRussian ? 'Смотреть всё расписание' : 'See full schedule',
    openAllEventsHint: isRussian ? 'Все ближайшие эфиры и расписание дня' : 'All upcoming live events and the day schedule',
    searchPlaceholder: isRussian ? 'Событие, команда или турнир' : 'Event, team, or tournament',
    noLive: isRussian ? 'Сейчас в этой ленте нет прямых эфиров.' : 'There are no live events in this feed right now.',
    noToday: isRussian ? 'Сегодня в этой ленте пока нет ближайших событий.' : 'There are no nearby events in this feed for today yet.',
    featuredTitle: isRussian ? 'Вечер боя в Лондоне' : liveEvents[0].title,
    featuredHeadline: isRussian ? 'Евлоев vs Мерфи' : liveEvents[0].headline,
    featuredCategory: isRussian ? 'Единоборства' : liveEvents[0].categoryLabel,
    featuredStage: isRussian ? 'Раунд 3/5' : liveEvents[0].stageLabel ?? '',
    featuredVenue: isRussian ? 'O2 Arena, Лондон' : liveEvents[0].venue,
    featuredStatus: isRussian ? 'Главный эфир дня' : 'Featured live event',
    featuredCtaHint: isRussian ? 'Поддержка, live-динамика и ход события в одном экране' : 'Support, live momentum, and match flow in one screen',
    emptyEyebrow: isRussian ? 'Лента пуста' : 'Feed is clear'
  };

  useEffect(() => {
    setPreferredSportId(getSportIdFromPath(getStoredSportPath()));
  }, []);

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

  const quickStats = [
    {
      label: labels.liveSection,
      value: feed.live.length.toString(),
      note: isRussian ? 'активных эфира' : 'live streams'
    },
    {
      label: labels.todaySection,
      value: feed.today.length.toString(),
      note: isRussian ? 'событий в ленте' : 'events in feed'
    },
    {
      label: isRussian ? 'Мой спорт' : 'My sport',
      value: preferredSport ? (isRussian ? preferredSport.labelRu : preferredSport.label) : isRussian ? 'Все' : 'All',
      note: isRussian ? 'лента по умолчанию' : 'default feed'
    }
  ];

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <section className="app-card app-section-card overflow-hidden px-4 py-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,124,65,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(74,144,226,0.10),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))]" />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent-orange">
                  {isRussian ? 'В эфире' : 'Live'}
                </span>
                <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-muted">
                  {labels.featuredStatus}
                </span>
              </div>

              <p className="mt-4 text-[0.92rem] font-medium text-text-secondary">{labels.featuredTitle}</p>
              <h1 className="mt-1.5 text-[1.7rem] font-semibold tracking-tight text-text-primary">{labels.featuredHeadline}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.78rem] text-text-secondary">
                <span className="inline-flex items-center rounded-full bg-white/72 px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.05)] dark:bg-white/8 dark:shadow-none">
                  {labels.featuredCategory}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/72 px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.05)] dark:bg-white/8 dark:shadow-none">
                  {labels.featuredStage}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/72 px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.05)] dark:bg-white/8 dark:shadow-none">
                  {liveEvents[0].timerLabel}
                </span>
              </div>
              <p className="mt-3 text-[0.82rem] text-text-muted">{labels.featuredVenue}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.28rem] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,255,255,0.26))] p-2.5 shadow-[0_12px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
            <div className="flex items-center justify-between gap-3 px-2 py-1">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{labels.featuredStatus}</p>
                <p className="mt-1 text-[0.82rem] leading-5 text-text-secondary">{labels.featuredCtaHint}</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/70 bg-white/72 px-2.5 py-1 text-[0.76rem] font-semibold text-text-primary shadow-[0_6px_14px_rgba(255,255,255,0.30)] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none">
                {liveEvents[0].timerLabel}
              </span>
            </div>

            <Link
              href="/live"
              className="mt-2 inline-flex min-h-[3.15rem] w-full items-center justify-between rounded-[1.05rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,245,240,0.96))] px-4 py-3 text-[0.95rem] font-semibold text-text-primary shadow-[0_12px_24px_rgba(15,23,42,0.08)] transition hover:brightness-[1.01] dark:border-white/8 dark:bg-[linear-gradient(135deg,rgba(255,124,65,0.16),rgba(255,255,255,0.05))] dark:text-white dark:shadow-none dark:hover:bg-[linear-gradient(135deg,rgba(255,124,65,0.18),rgba(255,255,255,0.06))]"
            >
              <span>{labels.support}</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:bg-white/12 dark:text-[rgb(var(--accent-orange))]">
                <ChevronIcon />
              </span>
            </Link>
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
          placeholder={labels.searchPlaceholder}
          className="w-full bg-transparent text-[0.95rem] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </section>

      <section className="grid grid-cols-3 gap-2.5">
        {quickStats.map((item) => (
          <div key={item.label} className="app-card rounded-[1.2rem] px-3 py-3.5">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{item.label}</p>
            <p className="mt-2 text-[1.08rem] font-semibold tracking-tight text-text-primary">{item.value}</p>
            <p className="mt-1 text-[0.72rem] leading-5 text-text-secondary">{item.note}</p>
          </div>
        ))}
      </section>

      <div className="space-y-4">
        <section className="space-y-2.5">
          <SectionHeader title={labels.liveSection} count={feed.live.length} />
          {feed.live.length > 0 ? (
            <div className="space-y-2.5">
              {feed.live.map((event) => (
                <HomeEventCard key={event.id} event={event} language={language} />
              ))}
            </div>
          ) : (
            <EmptyFeedCard title={labels.liveSection} description={labels.noLive} eyebrow={labels.emptyEyebrow} />
          )}
        </section>

        <section className="space-y-2.5">
          <SectionHeader title={labels.todaySection} count={feed.today.length} />
          {feed.today.length > 0 ? (
            <div className="space-y-2.5">
              {feed.today.map((event) => (
                <HomeEventCard key={event.id} event={event} language={language} />
              ))}
            </div>
          ) : (
            <EmptyFeedCard title={labels.todaySection} description={labels.noToday} eyebrow={labels.emptyEyebrow} />
          )}
        </section>

        <Link
          href="/events"
          className="group flex items-center justify-between rounded-[1.3rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,249,252,0.72))] px-4 py-3.5 text-[0.95rem] text-text-primary shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition hover:bg-white dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] dark:hover:bg-white/[0.06] dark:shadow-[0_14px_26px_rgba(2,6,23,0.14)]"
        >
          <div className="min-w-0">
            <p className="font-semibold">{labels.openAllEvents}</p>
            <p className="mt-1 text-[0.78rem] font-medium text-text-secondary">{labels.openAllEventsHint}</p>
          </div>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--surface-muted),0.68)] text-text-secondary transition group-hover:text-text-primary dark:bg-white/[0.06]">
            <ChevronIcon />
          </span>
        </Link>
      </div>
    </MainPageLayout>
  );
}
