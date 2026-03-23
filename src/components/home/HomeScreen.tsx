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
import { cn } from '@/lib/utils';
import type { SportEventParticipant, SportEventRecord } from '@/types';

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.08rem] w-[1.08rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.96rem] w-[0.96rem]" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.98rem] w-[0.98rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
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
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/[0.05] shadow-[0_3px_8px_rgba(15,23,42,0.10)] dark:bg-[linear-gradient(180deg,rgba(39,48,63,0.96),rgba(27,35,49,0.92))] dark:ring-white/[0.06]">
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
      <h2 className="shrink-0 text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{title}</h2>
      <div className="h-px flex-1 bg-black/[0.05] dark:bg-white/[0.06]" />
      <span
        className={cn(
          'inline-flex min-w-[1.55rem] items-center justify-center rounded-full border px-2 py-1 text-[0.66rem] font-semibold',
          count > 0
            ? 'border-black/[0.04] bg-white/[0.72] text-text-secondary shadow-[0_6px_14px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-white/[0.05] dark:text-white/[0.62] dark:shadow-none'
            : 'border-black/[0.03] bg-[rgba(249,250,252,0.72)] text-text-muted dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white/[0.4]'
        )}
      >
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
    <div className="overflow-hidden rounded-[1.28rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,249,252,0.80))] px-4 py-4 shadow-[0_12px_26px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(21,28,41,0.90),rgba(14,20,31,0.86))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-black/[0.04] bg-[rgba(var(--accent-orange),0.06)] text-[rgb(var(--accent-orange))] dark:border-white/[0.05] dark:bg-[rgba(var(--accent-orange),0.10)]">
          <SparkGlyph />
        </span>

        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.42]">{eyebrow}</p>
          <p className="mt-1.5 text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{title}</p>
          <p className="mt-1.5 text-[0.84rem] leading-6 text-text-secondary dark:text-white/[0.6]">{description}</p>
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
    language === 'ru' && rawDateLabel.trim().toLowerCase() === '\u0437\u0430\u0432\u0442\u0440\u0430 \u0432'
      ? '\u0417\u0430\u0432\u0442\u0440\u0430'
      : rawDateLabel;
  const timeLabel =
    language === 'ru'
      ? event.displayTimeRu ?? formatSportEventTime(event.startsAt, language)
      : event.displayTimeEn ?? formatSportEventTime(event.startsAt, language);
  const href = isLive ? '/live' : `/sports/${event.sportId}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[1.34rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,249,252,0.86))] px-4 py-3.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(22,29,42,0.90),rgba(15,21,32,0.86))] dark:hover:bg-[linear-gradient(180deg,rgba(25,33,47,0.92),rgba(17,24,36,0.88))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[0.76rem] font-medium text-text-secondary dark:text-white/[0.56]">{title}</p>
          <div className="mt-3 space-y-2.5">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2.5">
                <ParticipantBadge participant={participant} />
                <span className="truncate text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">
                  {language === 'ru' ? participant.nameRu : participant.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3 pl-2">
          {isLive ? (
            <span className="inline-flex items-center rounded-full border border-accent-orange/16 bg-[rgba(var(--accent-orange),0.08)] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-orange))] dark:border-[rgba(255,124,65,0.18)] dark:bg-[rgba(255,124,65,0.10)]">
              {language === 'ru' ? '\u0412 \u044d\u0444\u0438\u0440\u0435' : 'Live'}
            </span>
          ) : (
            <div className="text-right">
              <p className="text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.92]">{timeLabel}</p>
              <p className="mt-0.5 text-[0.72rem] text-text-secondary dark:text-white/[0.52]">{dateLabel}</p>
            </div>
          )}

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.04] bg-[rgba(247,249,252,0.82)] text-text-secondary transition group-hover:text-text-primary dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white/[0.42] dark:group-hover:text-white/[0.7]">
            <ChevronIcon />
          </span>
        </div>
      </div>

      {isLive ? (
        <div className="mt-3 flex items-center gap-2 text-[0.76rem] text-text-secondary dark:text-white/[0.52]">
          <span className="truncate">{timeLabel}</span>
          <span className="h-1 w-1 rounded-full bg-text-muted dark:bg-white/[0.28]" />
          <span>{language === 'ru' ? '\u041f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441' : 'On now'}</span>
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
  const featuredEvent = liveEvents[0];

  const labels = {
    support: isRussian ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0432 \u044d\u0444\u0438\u0440\u0435' : 'Support live',
    liveSection: isRussian ? '\u0412 \u044d\u0444\u0438\u0440\u0435' : 'Live',
    todaySection: isRussian ? '\u0421\u0435\u0433\u043e\u0434\u043d\u044f' : 'Today',
    openAllEvents: isRussian ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432\u0441\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u044f' : 'Open all events',
    openAllEventsHint: isRussian
      ? '\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u044d\u0444\u0438\u0440\u044b \u0438 \u043f\u043e\u043b\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0434\u043d\u044f'
      : 'Upcoming live events and the full daily schedule',
    searchPlaceholder: isRussian
      ? '\u0421\u043e\u0431\u044b\u0442\u0438\u0435, \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0438\u043b\u0438 \u0442\u0443\u0440\u043d\u0438\u0440'
      : 'Event, team, or tournament',
    noLive: isRussian
      ? '\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u044d\u0442\u043e\u0439 \u043b\u0435\u043d\u0442\u0435 \u043d\u0435\u0442 \u043f\u0440\u044f\u043c\u044b\u0445 \u044d\u0444\u0438\u0440\u043e\u0432.'
      : 'There are no live events in this feed right now.',
    noToday: isRussian
      ? '\u041d\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f \u0432 \u044d\u0442\u043e\u0439 \u043b\u0435\u043d\u0442\u0435 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0445 \u0441\u0442\u0430\u0440\u0442\u043e\u0432.'
      : 'There are no nearby events in this feed for today yet.',
    featuredTitle: isRussian ? '\u0412\u0435\u0447\u0435\u0440 \u0431\u043e\u0451\u0432 \u0432 \u041b\u043e\u043d\u0434\u043e\u043d\u0435' : featuredEvent.title,
    featuredHeadline: isRussian ? '\u0415\u0432\u043b\u043e\u0435\u0432 vs \u041c\u0435\u0440\u0444\u0438' : featuredEvent.headline,
    featuredCategory: isRussian ? '\u0415\u0434\u0438\u043d\u043e\u0431\u043e\u0440\u0441\u0442\u0432\u0430' : featuredEvent.categoryLabel,
    featuredStage: isRussian ? '\u0420\u0430\u0443\u043d\u0434 3/5' : featuredEvent.stageLabel ?? '',
    featuredVenue: isRussian ? 'O2 Arena, \u041b\u043e\u043d\u0434\u043e\u043d' : featuredEvent.venue,
    featuredStatus: isRussian ? '\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u044d\u0444\u0438\u0440 \u0434\u043d\u044f' : 'Featured live event',
    featuredSupportTitle: isRussian ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 \u0438 live-\u0445\u043e\u0434' : 'Support and live flow',
    featuredCtaHint: isRussian
      ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430, live-\u0434\u0438\u043d\u0430\u043c\u0438\u043a\u0430 \u0438 \u0445\u043e\u0434 \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u043d\u0430 \u043e\u0434\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435'
      : 'Support, live momentum, and match flow in one screen',
    emptyEyebrow: isRussian ? '\u041b\u0435\u043d\u0442\u0430 \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u0430' : 'Feed is clear',
    mySportLabel: isRussian ? '\u041c\u043e\u0439 \u0441\u043f\u043e\u0440\u0442' : 'My sport',
    allSports: isRussian ? '\u0412\u0441\u0435' : 'All',
    liveNote: isRussian ? '\u0432 \u043b\u0435\u043d\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441' : 'in feed now',
    todayNote: isRussian ? '\u0441\u0442\u0430\u0440\u0442\u043e\u0432 \u043d\u0430 \u0434\u0435\u043d\u044c' : 'starts today',
    mySportNote: isRussian ? '\u043b\u0435\u043d\u0442\u0430 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e' : 'default feed'
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
      note: labels.liveNote
    },
    {
      label: labels.todaySection,
      value: feed.today.length.toString(),
      note: labels.todayNote
    },
    {
      label: labels.mySportLabel,
      value: preferredSport ? (isRussian ? preferredSport.labelRu : preferredSport.label) : labels.allSports,
      note: labels.mySportNote
    }
  ];

  return (
    <MainPageLayout className="space-y-3.5 pt-2">
      <section className="app-card app-section-card relative overflow-hidden border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(250,244,240,0.88))] px-4 py-4.5 shadow-[0_20px_40px_rgba(15,23,42,0.08)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(24,31,44,0.94),rgba(15,21,33,0.90))] dark:shadow-[0_18px_34px_rgba(2,6,23,0.24)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,124,65,0.15),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(74,144,226,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,124,65,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(74,144,226,0.08),transparent_38%)]" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent-orange dark:border-[rgba(255,124,65,0.18)] dark:bg-[rgba(255,124,65,0.10)]">
              {isRussian ? '\u0412 \u044d\u0444\u0438\u0440\u0435' : 'Live'}
            </span>
            <span className="truncate text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-muted dark:text-white/[0.42]">
              {labels.featuredStatus}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[0.9rem] font-medium text-text-secondary dark:text-white/[0.58]">{labels.featuredTitle}</p>
              <h1 className="mt-1.5 text-[1.7rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.96]">
                {labels.featuredHeadline}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-text-secondary dark:text-white/[0.58]">
              {[labels.featuredCategory, labels.featuredStage, featuredEvent.timerLabel].filter(Boolean).map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-black/[0.04] bg-white/[0.72] px-2.5 py-1 font-medium shadow-[0_6px_14px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-white/[0.06] dark:shadow-none"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-[0.82rem] text-text-muted dark:text-white/[0.44]">{labels.featuredVenue}</p>
          </div>

          <div className="rounded-[1.2rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(250,246,243,0.56))] px-3.5 py-3.5 shadow-[0_12px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.72),rgba(21,28,40,0.62))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.18)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.42]">
              {labels.featuredSupportTitle}
            </p>
            <p className="mt-1.5 text-[0.82rem] leading-5 text-text-secondary dark:text-white/[0.62]">{labels.featuredCtaHint}</p>

            <Link
              href="/live"
              className="mt-3.5 inline-flex min-h-[3rem] w-full items-center justify-between rounded-[1.02rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,244,238,0.90))] px-4 py-3 text-[0.94rem] font-semibold text-text-primary shadow-[0_10px_22px_rgba(15,23,42,0.08)] transition hover:brightness-[1.01] dark:border-white/[0.06] dark:bg-[linear-gradient(135deg,rgba(255,124,65,0.14),rgba(41,50,65,0.96))] dark:text-white dark:shadow-[0_10px_20px_rgba(2,6,23,0.16)] dark:hover:bg-[linear-gradient(135deg,rgba(255,124,65,0.16),rgba(46,56,72,0.98))]"
            >
              <span>{labels.support}</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:bg-white/[0.08] dark:text-[rgb(var(--accent-orange))]">
                <ChevronIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="app-card flex items-center gap-3 rounded-[1.2rem] border border-black/[0.04] bg-white/[0.84] px-4 py-3.25 shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.84),rgba(13,18,30,0.80))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.18)]">
        <span className="text-text-secondary dark:text-white/[0.52]">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full bg-transparent text-[0.94rem] text-text-primary outline-none placeholder:text-text-secondary dark:text-white/[0.92] dark:placeholder:text-white/[0.42]"
        />
      </section>

      <section className="grid grid-cols-3 gap-2.25">
        {quickStats.map((item) => (
          <div
            key={item.label}
            className="app-card rounded-[1.15rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,249,252,0.76))] px-3 py-3.25 shadow-[0_10px_22px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(21,28,41,0.88),rgba(14,20,31,0.84))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.16)]"
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{item.label}</p>
            <p className="mt-2 text-[1.04rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{item.value}</p>
            <p className="mt-1 text-[0.7rem] leading-5 text-text-secondary dark:text-white/[0.56]">{item.note}</p>
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
          className="group flex items-center justify-between rounded-[1.28rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,249,252,0.78))] px-4 py-3.5 text-[0.95rem] text-text-primary shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(21,28,41,0.88),rgba(14,20,31,0.84))] dark:hover:bg-[linear-gradient(180deg,rgba(24,31,44,0.90),rgba(16,22,34,0.86))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.16)]"
        >
          <div className="min-w-0">
            <p className="font-semibold dark:text-white/[0.92]">{labels.openAllEvents}</p>
            <p className="mt-1 text-[0.78rem] font-medium text-text-secondary dark:text-white/[0.56]">{labels.openAllEventsHint}</p>
          </div>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.04] bg-[rgba(247,249,252,0.82)] text-text-secondary transition group-hover:text-text-primary dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white/[0.42] dark:group-hover:text-white/[0.68]">
            <ChevronIcon />
          </span>
        </Link>
      </div>
    </MainPageLayout>
  );
}
