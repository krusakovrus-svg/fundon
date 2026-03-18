'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportEventCard } from '@/components/sports/SportEventCard';
import { getSportEvents } from '@/data/sportEvents';
import { getSportHref } from '@/data/sports';
import { setStoredSportPath } from '@/lib/sportsHome';

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

export function SportEventsScreen({ sportId }: { sportId: string }) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const events = useMemo(() => getSportEvents(sportId), [sportId]);

  useEffect(() => {
    setStoredSportPath(getSportHref(sportId));
  }, [sportId]);

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return events;

    return events.filter((event) => {
      const haystack = [
        event.title,
        event.titleRu,
        ...event.participants.flatMap((participant) => [participant.name, participant.nameRu])
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [events, query]);

  return (
    <MainPageLayout className="space-y-3 pt-2">
      <div className="app-card flex items-center gap-3 rounded-[1.25rem] px-4 py-3">
        <span className="text-text-secondary">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('sportEventsSearchPlaceholder')}
          className="w-full bg-transparent text-[0.95rem] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>

      <div className="space-y-2.5">
        {filteredEvents.length === 0 ? (
          <div className="app-card rounded-[1.3rem] px-4 py-6 text-center text-[0.95rem] text-text-secondary">
            {language === 'ru' ? 'Ничего не найдено' : 'Nothing found'}
          </div>
        ) : null}

        {filteredEvents.map((event) => (
          <SportEventCard key={event.id} event={event} />
        ))}
      </div>
    </MainPageLayout>
  );
}
