'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SPORT_EVENT_ARCHIVE_WINDOW_MS, getArchivedSportEvents, isSportEventSupportAvailable } from '@/data/sportEvents';
import { getSportById, sportOptions } from '@/data/sports';
import { formatCount, formatCurrency } from '@/lib/format';
import { getParticipantVisual } from '@/lib/participantVisuals';
import { readSupportPreferences } from '@/lib/supportPreferences';
import { cn } from '@/lib/utils';
import type { Language, SportEventParticipant, SportEventRecord, SupportAmount } from '@/types';

type ArchiveFilter = 'recent' | 'today' | 'available';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.08rem] w-[1.08rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 7L17 17" strokeLinecap="round" />
      <path d="M17 7L7 17" strokeLinecap="round" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 8h14" strokeLinecap="round" />
      <path d="M7.2 5h9.6A1.8 1.8 0 0 1 18.6 6.8v10.4A1.8 1.8 0 0 1 16.8 19H7.2a1.8 1.8 0 0 1-1.8-1.8V6.8A1.8 1.8 0 0 1 7.2 5Z" strokeLinejoin="round" />
      <path d="M10 12h4" strokeLinecap="round" />
    </svg>
  );
}

function ParticipantAvatar({ participant }: { participant: SportEventParticipant }) {
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

function hash(input: string) {
  let value = 0;

  for (let index = 0; index < input.length; index += 1) {
    value = (value * 31 + input.charCodeAt(index)) >>> 0;
  }

  return value;
}

function shortDuration(ms: number, language: Language) {
  const minutes = Math.max(1, Math.floor(ms / 60000));
  if (minutes < 60) return language === 'ru' ? `${minutes} мин` : `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0 || rest >= 30) return language === 'ru' ? `${hours} ч` : `${hours} h`;
  return language === 'ru' ? `${hours} ч ${rest} мин` : `${hours} h ${rest} min`;
}

function startOfDay(timestamp: number) {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function isSameDay(left: number, right: number) {
  const a = new Date(left);
  const b = new Date(right);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function eventContext(event: SportEventRecord, language: Language) {
  const title = language === 'ru' ? event.titleRu : event.title;
  const parts = title.split(' · ').slice(1);
  return parts.join(' · ') || title;
}

function searchMatches(event: SportEventRecord, query: string) {
  if (!query) return true;
  const haystack = [event.title, event.titleRu, ...event.participants.flatMap((item) => [item.name, item.nameRu])].join(' ').toLowerCase();
  return haystack.includes(query);
}

function eventSides(event: SportEventRecord) {
  return [
    event.participants[0] ?? { id: `${event.id}-left`, name: 'Left', nameRu: 'Левая сторона' },
    event.participants[1] ?? { id: `${event.id}-right`, name: 'Right', nameRu: 'Правая сторона' }
  ] as const;
}

function endedAgo(event: SportEventRecord, now: number, language: Language) {
  return language === 'ru'
    ? `Завершилось ${shortDuration(now - new Date(event.endsAt).getTime(), language)} назад`
    : `Ended ${shortDuration(now - new Date(event.endsAt).getTime(), language)} ago`;
}

function supportOpenFor(event: SportEventRecord, now: number, language: Language) {
  const expiresAt = new Date(event.endsAt).getTime() + SPORT_EVENT_ARCHIVE_WINDOW_MS;
  return language === 'ru'
    ? `Поддержка открыта ещё ${shortDuration(expiresAt - now, language)}`
    : `Support stays open for ${shortDuration(expiresAt - now, language)}`;
}

export function ArchiveScreen() {
  const { language } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ArchiveFilter>('recent');
  const [sportFilter, setSportFilter] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState<SupportAmount>(10);
  const [quickAmounts, setQuickAmounts] = useState<SupportAmount[]>([10, 50, 100, 500]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [supportDelta, setSupportDelta] = useState<Record<string, { left: number; right: number; leftFans: number; rightFans: number }>>({});
  const [feedback, setFeedback] = useState<{ eventId: string; amount: number; label: string } | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const preferences = readSupportPreferences();
    setSelectedAmount(preferences.defaultAmount);
    setQuickAmounts(preferences.quickAmounts);
  }, []);

  const copy =
    language === 'ru'
      ? {
          eyebrow: '24 часа после эфира',
          title: 'Архив событий',
          description: 'Пропустили эфир? У вас ещё есть сутки после финала, чтобы поддержать любимого спортсмена.',
          infoTitle: 'Поддержка после финиша',
          infoBody: 'Завершившиеся события остаются здесь на 24 часа, чтобы вы могли поддержать победителя или любимую сторону уже после эфира.',
          searchPlaceholder: 'Спортсмен, событие или турнир',
          recent: 'За 24 часа',
          today: 'Сегодня',
          available: 'Поддержка открыта',
          sport: 'Вид спорта',
          supportOpen: 'Поддержка открыта',
          emptyTitle: 'Архив пока пуст',
          emptyHint: 'В последние 24 часа не нашлось завершившихся событий в окне поддержки. Попробуйте позже или смените фильтр.',
          supportButton: 'Поддержать после эфира',
          sheetTitle: 'Поддержка после эфира',
          sheetAmount: 'Сумма поддержки',
          supportAction: 'Поддержать',
          fans: 'фанатов'
        }
      : {
          eyebrow: '24 hours after live',
          title: 'Event Archive',
          description: 'Missed the live event? You still have one day after the finish to support your favorite athlete.',
          infoTitle: 'Post-event support',
          infoBody: 'Finished events stay here for 24 hours so fans can still back the winner or their favorite side after missing the live moment.',
          searchPlaceholder: 'Athlete, event, or tournament',
          recent: 'Last 24h',
          today: 'Today',
          available: 'Support open',
          sport: 'Sport',
          supportOpen: 'Support open',
          emptyTitle: 'Archive is empty',
          emptyHint: 'No finished events are currently inside the 24-hour support window. Try a different filter or check back later.',
          supportButton: 'Support after event',
          sheetTitle: 'Post-event support',
          sheetAmount: 'Support amount',
          supportAction: 'Support',
          fans: 'fans'
        };

  const archiveEvents = useMemo(() => getArchivedSportEvents(now), [now]);
  const todayStart = useMemo(() => startOfDay(now), [now]);
  const supportBase = useMemo(
    () =>
      Object.fromEntries(
        archiveEvents.map((event) => {
          const leftSeed = hash(`${event.id}:left`);
          const rightSeed = hash(`${event.id}:right`);
          return [
            event.id,
            {
              left: 1400 + (leftSeed % 7200),
              right: 1400 + (rightSeed % 7200),
              leftFans: 24 + (leftSeed % 180),
              rightFans: 24 + (rightSeed % 180)
            }
          ];
        })
      ) as Record<string, { left: number; right: number; leftFans: number; rightFans: number }>,
    [archiveEvents]
  );

  const sportOptionsForArchive = useMemo(() => {
    const ids = new Set(archiveEvents.map((event) => event.sportId));
    return [
      { id: 'all', label: language === 'ru' ? 'Все виды' : 'All sports' },
      ...sportOptions
        .filter((sport) => ids.has(sport.id))
        .map((sport) => ({ id: sport.id, label: language === 'ru' ? sport.labelRu : sport.label }))
    ];
  }, [archiveEvents, language]);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return archiveEvents.filter((event) => {
      if (sportFilter !== 'all' && event.sportId !== sportFilter) return false;
      if (!searchMatches(event, normalizedQuery)) return false;
      if (filter === 'today') return isSameDay(new Date(event.endsAt).getTime(), todayStart);
      if (filter === 'available') return isSportEventSupportAvailable(event, now);
      return true;
    });
  }, [archiveEvents, filter, now, query, sportFilter, todayStart]);

  const activeEvent = filteredEvents.find((event) => event.id === activeEventId) ?? archiveEvents.find((event) => event.id === activeEventId) ?? null;
  const activeTotals =
    activeEvent
      ? {
          left: (supportBase[activeEvent.id]?.left ?? 0) + (supportDelta[activeEvent.id]?.left ?? 0),
          right: (supportBase[activeEvent.id]?.right ?? 0) + (supportDelta[activeEvent.id]?.right ?? 0),
          leftFans: (supportBase[activeEvent.id]?.leftFans ?? 0) + (supportDelta[activeEvent.id]?.leftFans ?? 0),
          rightFans: (supportBase[activeEvent.id]?.rightFans ?? 0) + (supportDelta[activeEvent.id]?.rightFans ?? 0)
        }
      : null;

  useEffect(() => {
    if (activeEventId && !activeEvent) {
      setActiveEventId(null);
    }
  }, [activeEvent, activeEventId]);

  const handleSupport = (side: 'left' | 'right') => {
    if (!activeEvent) return;
    const [leftSide, rightSide] = eventSides(activeEvent);
    const target = side === 'left' ? leftSide : rightSide;

    setSupportDelta((current) => {
      const currentValue = current[activeEvent.id] ?? { left: 0, right: 0, leftFans: 0, rightFans: 0 };
      return {
        ...current,
        [activeEvent.id]: {
          left: currentValue.left + (side === 'left' ? selectedAmount : 0),
          right: currentValue.right + (side === 'right' ? selectedAmount : 0),
          leftFans: currentValue.leftFans + (side === 'left' ? 1 : 0),
          rightFans: currentValue.rightFans + (side === 'right' ? 1 : 0)
        }
      };
    });

    setFeedback({
      eventId: activeEvent.id,
      amount: selectedAmount,
      label: language === 'ru' ? target.nameRu : target.name
    });
  };

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} badge={String(archiveEvents.length)} />

      <section className="app-card rounded-[1.36rem] border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.88),rgba(13,18,30,0.84))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-black/[0.04] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:border-white/[0.06] dark:bg-[rgba(var(--accent-orange),0.12)]">
            <ArchiveIcon />
          </span>
          <div className="min-w-0">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.42]">{copy.infoTitle}</p>
            <p className="mt-2 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{copy.infoBody}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-black/[0.04] bg-white/72 px-3 py-1.5 text-[0.74rem] font-semibold text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-white/[0.05] dark:text-white/[0.9] dark:shadow-none">
                {formatCount(archiveEvents.length, language)}
              </span>
              <span className="inline-flex items-center rounded-full border border-[rgba(var(--accent-orange),0.14)] bg-[rgba(var(--accent-orange),0.08)] px-3 py-1.5 text-[0.74rem] font-semibold text-text-primary dark:text-white/[0.9]">
                {copy.supportOpen}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="app-card flex items-center gap-3 rounded-[1.22rem] border border-black/[0.045] bg-white/[0.82] px-4 py-3.25 shadow-[0_16px_34px_rgba(15,23,42,0.07)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.84),rgba(13,18,30,0.80))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
        <span className="text-text-secondary dark:text-white/[0.54]">
          <SearchIcon />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="w-full bg-transparent text-[0.94rem] text-text-primary outline-none placeholder:text-text-secondary dark:text-white/[0.92] dark:placeholder:text-white/[0.42]"
        />
      </div>

      <section className="space-y-3">
        <div className="app-card rounded-[1.28rem] p-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,40,0.90),rgba(14,20,31,0.86))] dark:shadow-[0_14px_28px_rgba(2,6,23,0.18)]">
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'recent' as const, label: copy.recent },
              { value: 'today' as const, label: copy.today },
              { value: 'available' as const, label: copy.available }
            ].map((option) => {
              const active = option.value === filter;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    'rounded-[0.95rem] px-3 py-2.5 text-[0.82rem] font-semibold tracking-tight transition',
                    active
                      ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.9))] text-text-primary shadow-[0_10px_22px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.035] dark:bg-[linear-gradient(180deg,rgba(43,52,67,0.96),rgba(31,39,52,0.92))] dark:text-white/[0.94] dark:shadow-[0_10px_18px_rgba(2,6,23,0.16)] dark:ring-white/[0.06]'
                      : 'text-text-secondary hover:bg-black/[0.02] hover:text-text-primary dark:text-white/[0.52] dark:hover:bg-white/[0.035] dark:hover:text-white/[0.82]'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="px-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.4]">{copy.sport}</p>
          <div className="dark:rounded-[1.2rem] dark:border dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(18,24,36,0.88),rgba(13,19,29,0.84))] dark:px-2 dark:py-2 dark:shadow-[0_14px_24px_rgba(2,6,23,0.16)]">
            <div className="app-horizontal-scroll -mx-1 overflow-x-auto px-1">
              <div className="flex min-w-max gap-2">
                {sportOptionsForArchive.map((sport) => {
                  const active = sportFilter === sport.id;
                  return (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => setSportFilter(sport.id)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-[0.78rem] font-medium transition',
                        active
                          ? 'border-black/[0.045] bg-[rgba(247,249,252,0.9)] text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.04)] dark:border-[rgba(255,124,65,0.16)] dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.12),rgba(255,124,65,0.07))] dark:text-[rgb(var(--accent-orange))] dark:shadow-[0_10px_18px_rgba(255,124,65,0.10)]'
                          : 'border-black/[0.035] bg-[rgba(248,250,252,0.54)] text-text-secondary hover:border-black/[0.05] hover:text-text-primary dark:border-white/[0.055] dark:bg-[linear-gradient(180deg,rgba(24,31,45,0.88),rgba(18,24,37,0.84))] dark:text-white/[0.52] dark:hover:border-white/[0.075] dark:hover:text-white/[0.76]'
                      )}
                    >
                      {sport.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredEvents.length === 0 ? (
        <div className="rounded-[1.35rem] border border-black/5 bg-white/68 px-4 py-6 text-center shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <p className="text-[1rem] font-semibold text-text-primary dark:text-white/[0.94]">{copy.emptyTitle}</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary dark:text-white/[0.58]">{copy.emptyHint}</p>
        </div>
      ) : null}

      <div className="space-y-3">
        {filteredEvents.map((event) => {
          const [leftSide, rightSide] = eventSides(event);
          const sport = getSportById(event.sportId);
          const current = {
            left: (supportBase[event.id]?.left ?? 0) + (supportDelta[event.id]?.left ?? 0),
            right: (supportBase[event.id]?.right ?? 0) + (supportDelta[event.id]?.right ?? 0)
          };

          return (
            <article
              key={event.id}
              className="overflow-hidden rounded-[1.38rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] shadow-[0_14px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,rgba(25,32,46,0.92),rgba(17,23,35,0.88))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/[0.03] bg-[rgba(249,250,252,0.68)] px-3.5 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.025]">
                <div className="min-w-0">
                  <p className="truncate text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-text-muted dark:text-white/[0.42]">
                    {sport ? (language === 'ru' ? sport.labelRu : sport.label) : event.sportId}
                  </p>
                  <p className="mt-1 truncate text-[0.82rem] font-medium text-text-secondary dark:text-white/[0.56]">{eventContext(event, language)}</p>
                </div>
                <span className="shrink-0 rounded-full border border-black/[0.04] bg-[rgba(247,249,252,0.8)] px-2.5 py-1 text-[0.68rem] font-semibold text-text-secondary dark:border-white/[0.06] dark:bg-white/[0.05] dark:text-white/[0.62]">
                  {language === 'ru' ? 'Завершено' : 'Finished'}
                </span>
              </div>

              <div className="space-y-3.5 px-3.5 py-3.5">
                <div className="space-y-2.75">
                  {[leftSide, rightSide].map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2.75">
                      <ParticipantAvatar participant={participant} />
                      <span className="truncate text-[0.95rem] font-medium leading-[1.18] text-slate-900 dark:text-white/[0.94]">
                        {language === 'ru' ? participant.nameRu : participant.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.08rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.90),rgba(23,30,43,0.88))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <p className="text-[0.76rem] font-medium text-text-secondary dark:text-white/[0.58]">{endedAgo(event, now, language)}</p>
                  <p className="mt-1 text-[0.84rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.92]">{supportOpenFor(event, now, language)}</p>
                  <p className="mt-2 text-[0.74rem] text-text-secondary dark:text-white/[0.54]">
                    {language === 'ru' ? 'Пост-эфирная поддержка' : 'Post-live support'} · {formatCurrency(current.left + current.right, language)}
                  </p>
                  {feedback?.eventId === event.id ? (
                    <p className="mt-2 text-[0.76rem] font-medium text-[rgb(var(--accent-orange))]">
                      {language === 'ru'
                        ? `Вы поддержали ${feedback.label} на ${formatCurrency(feedback.amount, language)}`
                        : `You supported ${feedback.label} for ${formatCurrency(feedback.amount, language)}`}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEventId(event.id)}
                  className="inline-flex min-h-[3.15rem] w-full items-center justify-center rounded-[1.12rem] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-4 text-[0.95rem] font-semibold tracking-tight text-white shadow-[0_16px_28px_rgba(255,116,55,0.18)] transition hover:shadow-[0_18px_30px_rgba(255,116,55,0.22)]"
                >
                  {copy.supportButton}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {activeEvent && activeTotals ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 pt-10">
          <button type="button" aria-label={language === 'ru' ? 'Закрыть' : 'Close'} onClick={() => setActiveEventId(null)} className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
          <div className="relative z-10 w-full max-w-[calc(var(--page-max-width)-32px)] rounded-[2rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.96))] px-4 pb-5 pt-3 shadow-[0_26px_50px_rgba(15,23,42,0.20)] dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,rgba(22,29,42,0.96),rgba(15,21,32,0.94))] dark:shadow-[0_26px_50px_rgba(2,6,23,0.42)]">
            <div className="mx-auto h-1 w-12 rounded-full bg-black/[0.08] dark:bg-white/[0.14]" />
            <div className="mt-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.42]">{copy.sheetTitle}</p>
                <h2 className="mt-2 text-[1.12rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.96]">{language === 'ru' ? activeEvent.titleRu : activeEvent.title}</h2>
                <p className="mt-1 text-[0.84rem] leading-6 text-text-secondary dark:text-white/[0.58]">
                  {endedAgo(activeEvent, now, language)} · {supportOpenFor(activeEvent, now, language)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveEventId(null)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.04] bg-white/72 text-text-secondary transition hover:text-text-primary dark:border-white/[0.06] dark:bg-white/[0.05] dark:text-white/[0.62] dark:hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { key: 'left', participant: eventSides(activeEvent)[0], total: activeTotals.left, fans: activeTotals.leftFans },
                { key: 'right', participant: eventSides(activeEvent)[1], total: activeTotals.right, fans: activeTotals.rightFans }
              ].map((item) => (
                <div
                  key={item.key}
                  className="rounded-[1.18rem] border border-black/[0.04] bg-[rgba(255,255,255,0.78)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.92),rgba(22,30,43,0.90))]"
                >
                  <div className="flex items-center gap-2.5">
                    <ParticipantAvatar participant={item.participant} />
                    <div className="min-w-0">
                      <p className="truncate text-[0.92rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">
                        {language === 'ru' ? item.participant.nameRu : item.participant.name}
                      </p>
                      <p className="mt-0.5 text-[0.74rem] text-text-secondary dark:text-white/[0.56]">
                        {formatCount(item.fans, language)} {copy.fans}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[1.15rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.96]">
                    {formatCurrency(item.total, language)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:text-white/[0.42]">{copy.sheetAmount}</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {quickAmounts.map((amount) => {
                  const active = amount === selectedAmount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={cn(
                        'rounded-[1rem] border px-2 py-2.5 text-sm font-semibold tracking-tight transition duration-200',
                        active
                          ? 'border-accent-orange/24 bg-[linear-gradient(180deg,rgba(255,124,65,0.16),rgba(255,124,65,0.10))] text-[rgb(var(--accent-orange))] shadow-[0_10px_22px_rgba(255,124,65,0.12)] dark:border-[rgba(255,124,65,0.24)] dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.18),rgba(255,124,65,0.12))]'
                          : 'border-black/[0.04] bg-white/[0.72] text-text-secondary dark:border-white/[0.07] dark:bg-white/[0.045] dark:text-white/[0.62]'
                      )}
                    >
                      {formatCurrency(amount, language)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSupport('left')}
                className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(74,144,226,1),rgba(60,126,209,1))] px-3 py-3.5 text-center text-white shadow-[0_14px_26px_rgba(74,144,226,0.22)]"
              >
                <span className="block truncate text-[0.95rem] font-semibold tracking-tight">
                  {language === 'ru' ? eventSides(activeEvent)[0].nameRu : eventSides(activeEvent)[0].name}
                </span>
                <span className="mt-1 block text-[0.72rem] font-medium text-white/74">{copy.supportAction}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSupport('right')}
                className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,124,65,1),rgba(243,110,51,1))] px-3 py-3.5 text-center text-white shadow-[0_14px_26px_rgba(255,124,65,0.22)]"
              >
                <span className="block truncate text-[0.95rem] font-semibold tracking-tight">
                  {language === 'ru' ? eventSides(activeEvent)[1].nameRu : eventSides(activeEvent)[1].name}
                </span>
                <span className="mt-1 block text-[0.72rem] font-medium text-white/74">{copy.supportAction}</span>
              </button>
            </div>

            {feedback?.eventId === activeEvent.id ? (
              <div className="mt-4 rounded-[1rem] border border-[rgba(var(--accent-orange),0.14)] bg-[rgba(var(--accent-orange),0.08)] px-3.5 py-3 text-[0.84rem] font-medium text-text-primary dark:text-white/[0.92]">
                {language === 'ru'
                  ? `Вы поддержали ${feedback.label} на ${formatCurrency(feedback.amount, language)}`
                  : `You supported ${feedback.label} for ${formatCurrency(feedback.amount, language)}`}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </MainPageLayout>
  );
}
