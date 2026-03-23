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
      fill={active ? '#e5c46f' : 'none'}
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
    <article className="group relative overflow-hidden rounded-[1.35rem] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] shadow-[0_12px_26px_rgba(15,23,42,0.05)] transition dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,rgba(25,32,46,0.92),rgba(17,23,35,0.88))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
      <Link href={href} aria-label={`${title} ${timeLabel}`} className="absolute inset-0 z-0 rounded-[1.35rem]" />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-black/[0.03] bg-[rgba(249,250,252,0.68)] px-3.25 py-2.25 dark:border-white/[0.06] dark:bg-white/[0.025]">
        <span className="min-w-0 flex-1 truncate text-left text-[0.68rem] font-medium tracking-[0.01em] text-slate-500/88 dark:text-white/[0.56]">
          {title}
        </span>

        <button
          type="button"
          aria-label={active ? t('favoritesRemoveLabel') : t('favoritesAddLabel')}
          aria-pressed={active}
          onPointerDown={(clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
          }}
          onClick={(clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
            toggleFavorite(event.id);
          }}
          className={cn(
            'relative z-20 inline-flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full border transition',
            active
              ? 'border-[#e6cf8b]/45 bg-[#fff8e3] text-[#a4811f] shadow-[0_4px_10px_rgba(229,196,111,0.08)] dark:border-[#d7be75]/22 dark:bg-[rgba(215,190,117,0.10)] dark:text-[#d9be73]'
              : 'border-black/[0.035] bg-[rgba(249,250,252,0.58)] text-slate-300/90 shadow-[0_3px_8px_rgba(15,23,42,0.03)] hover:border-black/[0.05] hover:text-slate-400 hover:bg-white dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white/[0.22] dark:hover:bg-white/[0.045] dark:hover:text-white/[0.34]'
          )}
        >
          <StarIcon active={active} />
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-[4.7rem_minmax(0,1fr)] gap-3.5 px-3.5 py-3.5">
        <div className="rounded-[1rem] border border-black/[0.035] bg-[rgba(247,249,252,0.74)] px-2.5 py-2.75 text-[0.9rem] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.90),rgba(23,30,43,0.88))] dark:text-white/[0.76] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          {isLiveState ? (
            <div className="space-y-1.5">
              <span className="inline-flex rounded-full bg-accent-orange/10 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--accent-orange))] dark:bg-accent-orange/10 dark:text-[rgb(var(--accent-orange))]">
                {t('eventsFilterLive')}
              </span>
              <div className="text-[0.75rem] font-medium leading-tight text-slate-700 dark:text-white/[0.82]">{timeLabel}</div>
            </div>
          ) : (
            <>
              <div className="font-semibold leading-none text-slate-700 dark:text-white/[0.82]">{dateLabel}</div>
              <div className="mt-1.75 text-[0.92rem] font-medium leading-none text-slate-800 dark:text-white/[0.92]">
                {timeLabel}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 space-y-3">
            {event.participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2.75">
                <ParticipantBadge participant={participant} />
                <span className="truncate text-[0.97rem] font-medium leading-tight text-slate-900 dark:text-white/[0.94]">
                  {language === 'ru' ? participant.nameRu : participant.name}
                </span>
              </div>
            ))}
          </div>
          <span className="shrink-0 text-slate-300/70 opacity-45 transition group-hover:opacity-70 group-hover:text-slate-400 dark:text-white/[0.14] dark:group-hover:text-white/[0.22]">
            <ChevronIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
