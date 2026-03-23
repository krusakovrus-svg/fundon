'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { getAllSportEvents, isSportEventActive, isSportEventLive } from '@/data/sportEvents';
import { sportOptions } from '@/data/sports';
import { cn } from '@/lib/utils';
import type { SportEventRecord } from '@/types';

type TimeFilter = 'all' | 'live' | 'today' | 'tomorrow';

interface EventGroup {
  key: string;
  title: string;
  events: SportEventRecord[];
}

interface FilterOption {
  value: TimeFilter;
  label: string;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function EventsScreen() {
  const { language, t } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const todayStart = useMemo(() => startOfDay(new Date(now)), [now]);
  const tomorrowStart = useMemo(() => new Date(todayStart.getTime() + 24 * 60 * 60 * 1000), [todayStart]);
  const dayAfterTomorrowStart = useMemo(
    () => new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000),
    [tomorrowStart]
  );

  const activeEvents = useMemo(
    () =>
      getAllSportEvents()
        .filter((event) => isSportEventActive(event, now))
        .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime()),
    [now]
  );

  const summary = useMemo(() => {
    const live = activeEvents.filter((event) => isSportEventLive(event, now)).length;
    const today = activeEvents.filter((event) => isSameDay(new Date(event.startsAt), todayStart)).length;
    const tomorrow = activeEvents.filter((event) => isSameDay(new Date(event.startsAt), tomorrowStart)).length;

    return { live, today, tomorrow };
  }, [activeEvents, now, todayStart, tomorrowStart]);

  const filteredEvents = useMemo(() => {
    return activeEvents.filter((event) => {
      if (sportFilter !== 'all' && event.sportId !== sportFilter) {
        return false;
      }

      const startsAt = new Date(event.startsAt);
      const live = isSportEventLive(event, now);

      if (timeFilter === 'live') return live;
      if (timeFilter === 'today') return isSameDay(startsAt, todayStart);
      if (timeFilter === 'tomorrow') return isSameDay(startsAt, tomorrowStart);

      return true;
    });
  }, [activeEvents, now, sportFilter, timeFilter, todayStart, tomorrowStart]);

  const groups = useMemo<EventGroup[]>(() => {
    if (timeFilter === 'live') {
      return [{ key: 'live', title: t('eventsLiveNow'), events: filteredEvents }];
    }

    if (timeFilter === 'today') {
      return [{ key: 'today', title: t('eventsToday'), events: filteredEvents }];
    }

    if (timeFilter === 'tomorrow') {
      return [{ key: 'tomorrow', title: t('eventsTomorrow'), events: filteredEvents }];
    }

    const live = filteredEvents.filter((event) => isSportEventLive(event, now));
    const today = filteredEvents.filter((event) => {
      const startsAt = new Date(event.startsAt);
      return !isSportEventLive(event, now) && isSameDay(startsAt, todayStart);
    });
    const tomorrow = filteredEvents.filter((event) => isSameDay(new Date(event.startsAt), tomorrowStart));
    const later = filteredEvents.filter((event) => new Date(event.startsAt).getTime() >= dayAfterTomorrowStart.getTime());

    return [
      { key: 'live', title: t('eventsLiveNow'), events: live },
      { key: 'today', title: t('eventsToday'), events: today },
      { key: 'tomorrow', title: t('eventsTomorrow'), events: tomorrow },
      { key: 'later', title: t('eventsLater'), events: later }
    ].filter((group) => group.events.length > 0);
  }, [dayAfterTomorrowStart, filteredEvents, now, t, timeFilter, todayStart, tomorrowStart]);

  const timeFilterOptions = [
    { value: 'all' as const, label: t('eventsFilterAll') },
    { value: 'live' as const, label: t('eventsFilterLive') },
    { value: 'today' as const, label: t('eventsFilterToday') },
    { value: 'tomorrow' as const, label: t('eventsFilterTomorrow') }
  ] satisfies FilterOption[];

  const sportFilters = [
    { id: 'all', label: t('eventsAllSports') },
    ...sportOptions.map((sport) => ({
      id: sport.id,
      label: language === 'ru' ? sport.labelRu : sport.label
    }))
  ];

  return (
    <MainPageLayout className="space-y-[1.125rem]">
      <PageHeader title={t('eventsTitle')} />

      <section className="app-card rounded-[1.45rem] px-2.5 py-2.5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t('eventsLiveNow'), value: summary.live, tone: 'text-accent-blue' },
            { label: t('eventsToday'), value: summary.today, tone: 'text-text-primary' },
            { label: t('eventsTomorrow'), value: summary.tomorrow, tone: 'text-text-primary' }
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'rounded-[1rem] border border-black/[0.045] bg-[rgba(247,249,252,0.86)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none',
                item.value === 0 && 'bg-[rgba(247,249,252,0.62)]'
              )}
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-text-muted">{item.label}</p>
              <div
                className={cn(
                  'mt-1.5 text-[1.12rem] font-semibold leading-none tracking-tight',
                  item.tone,
                  item.value === 0 && 'text-text-muted'
                )}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="app-card rounded-[1.35rem] p-1.5">
          <div className="grid grid-cols-4 gap-1">
            {timeFilterOptions.map((option) => {
              const active = option.value === timeFilter;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTimeFilter(option.value)}
                  className={cn(
                    'rounded-[1rem] px-3 py-2.5 text-[0.84rem] font-semibold tracking-tight transition',
                    active
                      ? 'bg-white text-text-primary shadow-[0_10px_20px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.03] dark:bg-white/[0.1] dark:shadow-none dark:ring-0'
                      : 'text-text-secondary hover:bg-black/[0.025] hover:text-text-primary dark:hover:bg-white/[0.04]'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{t('eventsAllSports')}</p>

          <div className="-mx-1 overflow-x-auto px-1">
            <div className="flex min-w-max gap-2">
              {sportFilters.map((sport) => {
                const active = sportFilter === sport.id;

                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => setSportFilter(sport.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-[0.82rem] font-medium transition',
                      active
                        ? 'border-black/[0.04] bg-white text-text-primary shadow-[0_8px_20px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.08] dark:shadow-none'
                        : 'border-black/[0.045] bg-[rgba(247,249,252,0.76)] text-text-secondary hover:border-black/[0.06] hover:text-text-primary dark:border-white/8 dark:bg-white/[0.03]'
                    )}
                  >
                    {sport.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {groups.length === 0 ? (
          <div className="rounded-[1.35rem] border border-black/5 bg-white/68 px-4 py-6 text-center shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
            <p className="text-[1rem] font-semibold text-text-primary">{t('eventsNoResults')}</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">{t('eventsNoResultsHint')}</p>
          </div>
        ) : null}

        {groups.map((group) => (
          <section key={group.key} className="space-y-2.5">
            <div className="flex items-center gap-3 px-1">
              <h2 className="shrink-0 text-[0.96rem] font-semibold tracking-tight text-text-primary">{group.title}</h2>
              <div className="h-px flex-1 bg-black/[0.055] dark:bg-white/8" />
              <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.88)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:border-white/8 dark:bg-white/[0.04]">
                {group.events.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {group.events.map((event) => (
                <SportEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </MainPageLayout>
  );
}
