'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportGlyph } from '@/components/sports/SportGlyph';
import { getSportHref, sportOptions } from '@/data/sports';
import { setStoredSportPath } from '@/lib/sportsHome';

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.2rem] w-[1.2rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function InfoGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LiveGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M7.2 8.3a6 6 0 000 7.4" strokeLinecap="round" />
      <path d="M16.8 8.3a6 6 0 010 7.4" strokeLinecap="round" />
      <path d="M4.5 5.6a9.5 9.5 0 000 12.8" strokeLinecap="round" />
      <path d="M19.5 5.6a9.5 9.5 0 010 12.8" strokeLinecap="round" />
    </svg>
  );
}

export function SportsScreen() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  const filteredSports = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sportOptions;

    return sportOptions.filter((sport) => {
      const label = language === 'ru' ? sport.labelRu : sport.label;
      return label.toLowerCase().includes(normalized);
    });
  }, [language, query]);

  return (
    <MainPageLayout className="space-y-3 pt-2">
      <div className="app-card flex items-center gap-3 rounded-[1.25rem] px-4 py-3">
        <span className="text-text-secondary">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('sportsSearchPlaceholder')}
          className="w-full bg-transparent text-[0.95rem] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>

      <div className="space-y-3">
        {filteredSports.map((sport) => {
          const href = getSportHref(sport.id);

          return (
            <Link
              key={sport.id}
              href={href}
              onClick={() => setStoredSportPath(href)}
              className="app-card flex w-full items-center justify-between gap-3 rounded-[1.35rem] px-4 py-4 text-left transition hover:border-accent-orange/20"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-text-secondary">
                  <SportGlyph kind={sport.icon} />
                </span>
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-[1rem] font-medium text-text-primary">
                    {language === 'ru' ? sport.labelRu : sport.label}
                  </span>
                  {sport.info ? (
                    <span className="shrink-0 text-text-muted">
                      <InfoGlyph />
                    </span>
                  ) : null}
                </div>
              </div>

              {sport.live ? (
                <span className="shrink-0 text-accent-blue">
                  <LiveGlyph />
                </span>
              ) : (
                <span className="w-4 shrink-0" />
              )}
            </Link>
          );
        })}
      </div>
    </MainPageLayout>
  );
}
