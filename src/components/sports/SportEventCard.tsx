'use client';

import Image from 'next/image';

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
      className="h-[1.15rem] w-[1.15rem]"
      fill={active ? '#f4c542' : '#ffffff'}
      stroke="#111111"
      strokeWidth="1.9"
    >
      <path d="M12 4.6l2.3 4.66 5.15.75-3.72 3.62.88 5.12L12 16.34l-4.61 2.41.88-5.12-3.72-3.62 5.15-.75z" strokeLinejoin="round" />
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
  const isLiveState = event.displayDateEn === 'Live';

  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-black/5 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[rgba(var(--surface),0.92)] dark:shadow-[0_14px_32px_rgba(2,6,23,0.3)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/5 bg-slate-100/95 px-3 py-2 dark:border-white/8 dark:bg-white/[0.04]">
        <span className="min-w-0 flex-1 truncate text-left text-[0.72rem] font-medium text-slate-600 dark:text-text-secondary">
          {title}
        </span>

        <button
          type="button"
          aria-label={active ? t('favoritesRemoveLabel') : t('favoritesAddLabel')}
          aria-pressed={active}
          onClick={() => toggleFavorite(event.id)}
          className={cn(
            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition',
            active
              ? 'border-[#d7aa2d] bg-[#fff4ca] shadow-[0_5px_12px_rgba(244,197,66,0.24)]'
              : 'border-black/14 bg-white shadow-[0_3px_10px_rgba(15,23,42,0.12)] hover:bg-slate-50',
            'dark:border-black/25 dark:bg-white dark:hover:bg-slate-100'
          )}
        >
          <StarIcon active={active} />
        </button>
      </div>

      <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-3 px-3.5 py-3">
        <div className="border-r border-black/6 pr-3 text-[0.92rem] text-slate-700 dark:border-white/10 dark:text-text-secondary">
          <div
            className={cn(
              'font-semibold leading-none dark:text-text-primary',
              isLiveState ? 'text-accent-blue' : 'text-slate-700'
            )}
          >
            {dateLabel}
          </div>
          <div className="mt-1.5 text-[0.98rem] font-medium leading-none text-slate-800 dark:text-text-primary">{timeLabel}</div>
        </div>

        <div className="space-y-2">
          {event.participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-2.5">
              <span className="shrink-0 text-[0.82rem] font-medium leading-none text-text-secondary/85">{eventDateShort}</span>
              <ParticipantBadge participant={participant} />
              <span className="truncate text-[1rem] font-medium leading-none text-slate-900 dark:text-text-primary">
                {language === 'ru' ? participant.nameRu : participant.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
 </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
