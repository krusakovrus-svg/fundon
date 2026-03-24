'use client';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord, EventStatus } from '@/types';

function getEventStatusLabel(status: EventStatus, language: 'ru' | 'en') {
  if (status === 'upcoming') {
    return language === 'ru' ? 'Скоро' : 'Upcoming';
  }

  if (status === 'ended') {
    return language === 'ru' ? 'Завершено' : 'Finished';
  }

  return language === 'ru' ? 'В эфире' : 'LIVE';
}

function getLocalizedHeadline(event: EventRecord, language: 'ru' | 'en') {
  const direct = language === 'ru' ? event.headlineRu : event.headline;

  if (direct?.trim()) {
    return direct;
  }

  const participantNames = event.participants
    .map((participant) => (language === 'ru' ? participant.shortNameRu || participant.nameRu : participant.shortName || participant.name))
    .filter(Boolean);

  return participantNames.join(' vs ') || '—';
}

function getLocalizedTitle(event: EventRecord, language: 'ru' | 'en') {
  const direct = language === 'ru' ? event.titleRu : event.title;
  return direct?.trim() || getLocalizedHeadline(event, language);
}

function getLocalizedCategory(event: EventRecord, language: 'ru' | 'en') {
  const direct = language === 'ru' ? event.categoryLabelRu : event.categoryLabel;
  return direct?.trim() || event.category;
}

function getLocalizedStage(event: EventRecord, language: 'ru' | 'en') {
  const direct = language === 'ru' ? event.stageLabelRu : event.stageLabel;
  return direct?.trim() || '—';
}

function getLocalizedVenue(event: EventRecord, language: 'ru' | 'en') {
  const direct = language === 'ru' ? event.venueRu : event.venue;
  return direct?.trim() || '—';
}

export function LiveEventHero({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();
  const timerLabel = language === 'ru' ? '\u0422\u0430\u0439\u043c\u0435\u0440' : 'Timer';
  const statusLabel = getEventStatusLabel(event.status, language);
  const headline = getLocalizedHeadline(event, language);
  const title = getLocalizedTitle(event, language);
  const category = getLocalizedCategory(event, language);
  const stage = getLocalizedStage(event, language);
  const timer = event.timerLabel?.trim() || '—';
  const venue = getLocalizedVenue(event, language);

  return (
    <SectionCard className="space-y-4 overflow-hidden border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,253,0.84))] px-4 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(23,30,43,0.92),rgba(16,22,34,0.88))] dark:shadow-[0_16px_30px_rgba(2,6,23,0.20)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(255,124,65,0.12),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(74,144,226,0.08),transparent_40%)]" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/16 bg-[rgba(var(--accent-orange),0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-orange))] dark:bg-[rgba(var(--accent-orange),0.10)]">
              {statusLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.04] bg-white/[0.7] px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:border-white/[0.06] dark:bg-white/[0.06] dark:text-white/[0.46]">
              {category}
            </span>
          </div>

          <h1 className="mt-3 text-[1.5rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.96]">
            {headline}
          </h1>
          <p className="mt-1.5 max-w-[28rem] text-[0.86rem] leading-relaxed text-text-secondary dark:text-white/[0.58]">
            {title}
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2.5">
        <div className="rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{t('stageLabel')}</p>
          <p className="mt-1 text-[0.83rem] font-semibold text-text-primary dark:text-white/[0.9]">{stage}</p>
        </div>
        <div className="rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{timerLabel}</p>
          <p className="mt-1 text-[0.83rem] font-semibold text-text-primary dark:text-white/[0.9]">{timer}</p>
        </div>
        <div className="rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{t('venueLabel')}</p>
          <p className="mt-1 truncate text-[0.83rem] font-medium text-text-secondary dark:text-white/[0.58]">{venue}</p>
        </div>
      </div>
    </SectionCard>
  );
}
