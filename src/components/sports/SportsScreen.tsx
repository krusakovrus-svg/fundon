'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SportGlyph } from '@/components/sports/SportGlyph';
import { getSportEvents } from '@/data/sportEvents';
import { getSportHref, prioritySportIds, sportOptions, type SportOption } from '@/data/sports';
import { setStoredSportPath } from '@/lib/sportsHome';
import { cn } from '@/lib/utils';

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.92rem] w-[0.92rem]" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getRuEventLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return '\u0441\u043e\u0431\u044b\u0442\u0438\u0435';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return '\u0441\u043e\u0431\u044b\u0442\u0438\u044f';
  }

  return '\u0441\u043e\u0431\u044b\u0442\u0438\u0439';
}

type SportListItem = SportOption & {
  href: string;
  eventCount: number;
};

function SportCard({
  sport,
  featured,
  language
}: {
  sport: SportListItem;
  featured?: boolean;
  language: 'ru' | 'en';
}) {
  const localizedLabel = language === 'ru' ? sport.labelRu : sport.label;
  const meta =
    sport.eventCount > 0
      ? language === 'ru'
        ? `${sport.eventCount} ${getRuEventLabel(sport.eventCount)}`
        : `${sport.eventCount} event${sport.eventCount === 1 ? '' : 's'}`
      : featured
        ? language === 'ru'
          ? '\u0421\u043a\u043e\u0440\u043e \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f'
          : 'Coming soon'
        : null;

  return (
    <Link
      href={sport.href}
      onClick={() => setStoredSportPath(sport.href)}
      className={cn(
        'group flex w-full items-center justify-between gap-3 rounded-[1.35rem] border px-4 text-left transition-all duration-200',
        featured
          ? 'border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] py-3.25 shadow-[0_14px_28px_rgba(15,23,42,0.06)] hover:border-black/[0.055] hover:bg-white'
          : 'border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.88))] py-3 shadow-[0_10px_22px_rgba(15,23,42,0.05)] hover:border-black/[0.05] hover:bg-white/[0.98]',
        'dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(25,32,46,0.92),rgba(17,23,35,0.88))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.16)] dark:hover:border-white/[0.08] dark:hover:bg-[linear-gradient(180deg,rgba(29,37,51,0.94),rgba(20,27,41,0.90))]'
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,241,233,0.92))] text-text-secondary shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(39,48,63,0.96),rgba(27,35,49,0.92))] dark:text-white/[0.82] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <SportGlyph kind={sport.icon} className="h-[1.12rem] w-[1.12rem]" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[0.98rem] font-medium tracking-tight text-text-primary dark:text-white/[0.94]">{localizedLabel}</p>
          {meta ? <p className="mt-0.75 text-[0.76rem] font-medium text-text-secondary dark:text-white/[0.54]">{meta}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-2">
        {sport.eventCount > 0 ? (
          <span className="inline-flex min-w-[1.9rem] items-center justify-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.8)] px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.02em] text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white/[0.68] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            {sport.eventCount}
          </span>
        ) : null}
        <span className="text-slate-300/78 transition group-hover:text-slate-400 dark:text-white/[0.18] dark:group-hover:text-white/[0.28]">
          <ChevronGlyph />
        </span>
      </div>
    </Link>
  );
}

export function SportsScreen() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  const sports = useMemo<SportListItem[]>(
    () =>
      sportOptions.map((sport) => ({
        ...sport,
        href: getSportHref(sport.id),
        eventCount: getSportEvents(sport.id).length
      })),
    []
  );

  const filteredSports = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sports;

    return sports.filter((sport) => [sport.labelRu, sport.label, sport.id].join(' ').toLowerCase().includes(normalized));
  }, [query, sports]);

  const prioritySet = useMemo(() => new Set<string>(prioritySportIds), []);
  const hasQuery = query.trim().length > 0;

  const prioritySports = filteredSports.filter((sport) => prioritySet.has(sport.id));
  const remainingSports = filteredSports.filter((sport) => !prioritySet.has(sport.id));

  const copy =
    language === 'ru'
      ? {
          placeholder: '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0432\u0438\u0434\u0430\u043c \u0441\u043f\u043e\u0440\u0442\u0430',
          popular: '\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435',
          popularHint:
            '\u0413\u043b\u0430\u0432\u043d\u044b\u0435 \u0432\u0438\u0434\u044b \u0441\u043f\u043e\u0440\u0442\u0430 \u0441 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u043c\u0438 \u0441\u043e\u0431\u044b\u0442\u0438\u044f\u043c\u0438',
          allSports: '\u0412\u0441\u0435 \u0432\u0438\u0434\u044b \u0441\u043f\u043e\u0440\u0442\u0430',
          allSportsHint:
            '\u041f\u043e\u043b\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439 \u0434\u043b\u044f \u0432\u044b\u0431\u043e\u0440\u0430',
          results: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b',
          resultsHint:
            '\u041f\u043e\u0434\u0431\u0435\u0440\u0438\u0442\u0435 \u043d\u0443\u0436\u043d\u044b\u0439 \u0432\u0438\u0434 \u0441\u043f\u043e\u0440\u0442\u0430 \u043f\u043e \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044e',
          empty: '\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e',
          emptyHint:
            '\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 \u0438\u043b\u0438 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0438\u0434 \u0441\u043f\u043e\u0440\u0442\u0430 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u043d\u0438\u0436\u0435.'
        }
      : {
          placeholder: 'Search sports',
          popular: 'Top sports',
          popularHint: 'Main sports with available events',
          allSports: 'All sports',
          allSportsHint: 'Full list of categories',
          results: 'Results',
          resultsHint: 'Pick the sport you need',
          empty: 'Nothing found',
          emptyHint: 'Try another query or pick a sport from the list.'
        };

  const sections = hasQuery
    ? [{ id: 'results', title: copy.results, hint: copy.resultsHint, items: filteredSports, featured: true }]
    : [
        { id: 'popular', title: copy.popular, hint: copy.popularHint, items: prioritySports, featured: true },
        { id: 'all', title: copy.allSports, hint: copy.allSportsHint, items: remainingSports, featured: false }
      ].filter((section) => section.items.length > 0);

  return (
    <MainPageLayout className="space-y-3.5 pt-2">
      <div className="app-card flex items-center gap-3 rounded-[1.22rem] border border-black/[0.045] bg-white/[0.82] px-4 py-3.25 shadow-[0_16px_34px_rgba(15,23,42,0.07)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.84),rgba(13,18,30,0.80))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
        <span className="text-text-secondary dark:text-white/[0.54]">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          className="w-full bg-transparent text-[0.94rem] text-text-primary outline-none placeholder:text-text-secondary dark:text-white/[0.92] dark:placeholder:text-white/[0.42]"
        />
      </div>

      {filteredSports.length === 0 ? (
        <div className="app-card rounded-[1.36rem] border border-black/[0.045] bg-white/[0.82] px-5 py-5 text-center shadow-[0_16px_34px_rgba(15,23,42,0.06)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.88),rgba(13,18,30,0.84))] dark:shadow-[0_16px_28px_rgba(2,6,23,0.18)]">
          <p className="text-[1rem] font-semibold tracking-tight text-text-primary dark:text-white">{copy.empty}</p>
          <p className="mt-2 text-[0.84rem] leading-6 text-text-secondary dark:text-white/[0.58]">{copy.emptyHint}</p>
        </div>
      ) : null}

      <div className="space-y-4">
        {sections.map((section) => (
          <section key={section.id} className="space-y-2.5">
            <div className="px-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[0.95rem] font-semibold tracking-tight text-text-primary dark:text-white">{section.title}</h2>
                  <p className="mt-0.75 text-[0.76rem] leading-5 text-text-secondary dark:text-white/[0.54]">{section.hint}</p>
                </div>
                <span className="inline-flex items-center justify-center rounded-full border border-black/[0.045] bg-white/[0.74] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.02em] text-text-secondary shadow-[0_8px_18px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:text-white/[0.6] dark:shadow-[0_8px_16px_rgba(2,6,23,0.10)]">
                  {section.items.length}
                </span>
              </div>
            </div>

            <div className="space-y-2.25">
              {section.items.map((sport) => (
                <SportCard key={sport.id} sport={sport} featured={section.featured} language={language} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </MainPageLayout>
  );
}
