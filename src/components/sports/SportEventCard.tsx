'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatSportEventDate, formatSportEventTime } from '@/data/sportEvents';
import { getParticipantVisual } from '@/lib/participantVisuals';
import { cn } from '@/lib/utils';
import type { SportEventParticipant, SportEventRecord } from '@/types';

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1rem] w-[1rem]"
      fill={active ? '#f3cc62' : 'none'}
      stroke="currentColor"
      strokeWidth="1.65"
    >
      <path
        d="M12 4.6l2.3 4.66 5.15.75-3.72 3.62.88 5.12L12 16.34l-4.61 2.41.88-5.12-3.72-3.62 5.15-.75z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ParticipantBadge({ participant }: { participant: SportEventParticipant }) {
  const visual = getParticipantVisual(participant);

  if (!visual) {
    return <span className="inline-flex h-6 w-6 shrink-0" aria-hidden="true" />;
  }

  return (
    <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/6 shadow-[0_2px_6px_rgba(15,23,42,0.12)] dark:bg-white/12 dark:ring-white/12">
      {visual.type === 'asset' ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="24px"
          className={visual.fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
      ) : (
        <span className="text-[0.9rem] leading-none">{visual.value}</span>
      )}
    </span>
  );
}

export function SportEventCard({ event }: { event: SportEventRecord }) {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(event.id);
  const title = language === 'ru' ? event.titleRu : event.title;
  const dateLabel =
    language === 'ru'
      ? event.displayDateRu ?? formatSportEventDate(event.startsAt, language)
      : event.displayDateEn ?? formatSportEventDate(event.startsAt, language);
  const timeLabel =
    language === 'ru'
      ? event.displayTimeRu ?? formatSportEventTime(event.startsAt, language)
      : event.displayTimeEn ?? formatSportEventTime(event.startsAt, language);
  const isLiveState = dateLabel.trim().toLowerCase() === 'live';
  const href = isLiveState ? '/live' : event.detailPath ?? `/sports/${event.sportId}`;

  return (
    <article className="group relative overflow-hidden rounded-[1.35rem] border border-black/[0.045] bg-white/95 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition dark:border-white/10 dark:bg-[rgba(var(--surface),0.92)] dark:shadow-[0_14px_32px_rgba(2,6,23,0.3)]">
      <Link href={href} aria-label={`${title} ${timeLabel}`} className="absolute inset-0 z-0 rounded-[1.35rem]" />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-black/[0.035] bg-[rgba(249,250,252,0.92)] px-3.5 py-2.5 dark:border-white/8 dark:bg-white/[0.03]">
        <span className="min-w-0 flex-1 truncate text-left text-[0.72rem] font-medium text-slate-600 dark:text-text-secondary">
          {title}
        </span>

        <button
          type="button"
          aria-label={active ? t('favoritesRemoveLabel') : t('favoritesAddLabel')}
          aria-pressed={active}
          onClick={() => toggleFavorite(event.id)}
          className={cn(
            'relative z-20 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition',
            active
              ? 'border-[#ecd37c] bg-[#fff7da] text-[#8f6f10] shadow-[0_4px_12px_rgba(244,197,66,0.14)]'
              : 'border-black/[0.05] bg-white/96 text-slate-400 shadow-[0_4px_10px_rgba(15,23,42,0.05)] hover:border-black/[0.08] hover:text-slate-600 hover:bg-white',
            'dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12]'
          )}
        >
          <StarIcon active={active} />
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-[4.55rem_minmax(0,1fr)] gap-3 px-3.5 py-3.5">
        <div className="rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.88)] px-2.5 py-2.5 text-[0.9rem] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/8 dark:bg-white/[0.04] dark:text-text-secondary dark:shadow-none">
          {isLiveState ? (
            <div className="space-y-1.5">
              <span className="inline-flex rounded-full border border-accent-orange/14 bg-accent-orange/10 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-orange))]">
                {t('eventsFilterLive')}
              </span>
              <div className="text-[0.8rem] font-medium leading-tight text-slate-700 dark:text-text-primary">{timeLabel}</div>
            </div>
          ) : (
            <>
              <div className="font-semibold leading-none text-slate-700 dark:text-text-primary">{dateLabel}</div>
              <div className="mt-1.5 text-[0.95rem] font-medium leading-none text-slate-800 dark:text-text-primary">
                {timeLabel}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 space-y-2.5">
          {event.participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-2.5">
              <ParticipantBadge participant={participant} />
              <span className="truncate text-[0.99rem] font-medium leading-none text-slate-900 dark:text-text-primary">
                {language === 'ru' ? participant.nameRu : participant.name}
              </span>
            </div>
          ))}
          </div>
          <span className="shrink-0 text-slate-300 transition group-hover:text-slate-400 dark:text-white/[0.16] dark:group-hover:text-white/[0.24]">
            <ChevronIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
