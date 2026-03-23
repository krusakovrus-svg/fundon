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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.2rem] w-[1.2rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getRuEventLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return 'событие';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'события';
  return 'событий';
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
  const meta =
    sport.eventCount > 0
      ? language === 'ru'
        ? `${sport.eventCount} ${getRuEventLabel(sport.eventCount)}`
        : `${sport.eventCount} event${sport.eventCount === 1 ? '' : 's'}`
      : featured
        ? language === 'ru'
          ? 'Скоро появится'
          : 'Coming soon'
        : null;

  return (
    <Link
      href={sport.href}
      onClick={() => setStoredSportPath(sport.href)}
      className={cn(
        'group flex w-full items-center justify-between gap-3 rounded-[1.5rem] border px-4 text-left transition-all duration-200',
        featured
          ? 'border-white/80 bg-white/78 py-3.5 shadow-[0_18px_36px_rgba(15,23,42,0.08)] hover:border-accent-orange/18 hover:bg-white/86'
          : 'border-white/65 bg-white/58 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.06)] hover:border-accent-orange/14 hover:bg-white/70',
        'dark:border-white/10 dark:bg-white/6 dark:hover:border-white/14 dark:hover:bg-white/8 dark:shadow-none'
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,241,233,0.92))] text-text-secondary shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/8 dark:shadow-none">
          <SportGlyph kind={sport.icon} className="h-[1.16rem] w-[1.16rem]" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[0.98rem] font-medium tracking-tight text-text-primary">{sport.labelRu}</p>
          {meta ? <p className="mt-0.5 text-[0.78rem] font-medium text-text-secondary">{meta}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-2">
        {sport.eventCount > 0 ? (
          <span className="inline-flex min-w-[2rem] items-center justify-center rounded-full border border-accent-orange/10 bg-accent-orange/8 px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-accent">
            {sport.eventCount}
          </span>
        ) : null}
        <span className="text-text-muted transition group-hover:text-text-secondary">
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

    return sports.filter((sport) =>
      [sport.labelRu, sport.label, sport.id]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [query, sports]);

  const prioritySet = useMemo(() => new Set<string>(prioritySportIds), []);
  const hasQuery = query.trim().length > 0;

  const prioritySports = filteredSports.filter((sport) => prioritySet.has(sport.id));
  const remainingSports = filteredSports.filter((sport) => !prioritySet.has(sport.id));

  const copy =
    language === 'ru'
      ? {
          placeholder: 'Поиск по видам спорта',
          popular: 'Популярные',
          popularHint: 'Главные виды спорта с доступными событиями',
          allSports: 'Все виды спорта',
          allSportsHint: 'Полный список категорий для выбора',
          results: 'Результаты',
          resultsHint: 'Подберите нужный вид спорта по названию',
          empty: 'Ничего не найдено',
          emptyHint: 'Попробуйте изменить запрос или выберите спорт из списка ниже.'
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
    <MainPageLayout className="space-y-4 pt-2">
      <div className="app-card flex items-center gap-3 rounded-[1.3rem] border border-white/75 bg-white/78 px-4 py-3.5 shadow-[0_16px_34px_rgba(15,23,42,0.07)]">
        <span className="text-text-secondary">
          <SearchGlyph />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          className="w-full bg-transparent text-[0.95rem] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>

      {filteredSports.length === 0 ? (
        <div className="app-card rounded-[1.45rem] border border-white/70 bg-white/72 px-5 py-6 text-center shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <p className="text-[1rem] font-semibold tracking-tight text-text-primary">{copy.empty}</p>
          <p className="mt-2 text-[0.84rem] leading-6 text-text-secondary">{copy.emptyHint}</p>
        </div>
      ) : null}

      <div className="space-y-4">
        {sections.map((section) => (
          <section key={section.id} className="space-y-3">
            <div className="px-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[0.95rem] font-semibold tracking-tight text-text-primary">{section.title}</h2>
                  <p className="mt-1 text-[0.78rem] leading-5 text-text-secondary">{section.hint}</p>
                </div>
                <span className="inline-flex items-center justify-center rounded-full border border-white/75 bg-white/72 px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-text-secondary shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                  {section.items.length}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
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
