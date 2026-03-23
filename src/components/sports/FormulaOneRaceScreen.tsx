'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { formatSportEventDate, formatSportEventTime, getSportEventById } from '@/data/sportEvents';
import { cn } from '@/lib/utils';

const FORMULA_ONE_EVENT_ID = 'formula1-japan-gp-winning-team-driver';
const FORMULA_ONE_SELECTION_KEY = 'fundon-formula1-japan-gp-winner';

const formulaOneTeams = [
  { id: 'mercedes-amg-f1', name: 'Mercedes AMG F1', nameRu: 'Mercedes AMG F1' },
  { id: 'ferrari', name: 'Ferrari', nameRu: 'Ferrari' },
  { id: 'red-bull', name: 'Red Bull', nameRu: 'Red Bull' },
  { id: 'mclaren', name: 'McLaren', nameRu: 'McLaren' },
  { id: 'racing-bulls', name: 'Racing Bulls', nameRu: 'Racing Bulls' },
  { id: 'audi', name: 'Audi', nameRu: 'Audi' },
  { id: 'haas', name: 'Haas', nameRu: 'Haas' },
  { id: 'alpine', name: 'Alpine', nameRu: 'Alpine' },
  { id: 'williams', name: 'Williams', nameRu: 'Williams' },
  { id: 'aston-martin', name: 'Aston Martin', nameRu: 'Aston Martin' },
  { id: 'cadillac', name: 'Cadillac', nameRu: 'Cadillac' }
] as const;

export function FormulaOneRaceScreen() {
  const { language } = useLanguage();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const event = useMemo(() => getSportEventById(FORMULA_ONE_EVENT_ID), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTeamId = window.localStorage.getItem(FORMULA_ONE_SELECTION_KEY);
    if (storedTeamId) {
      setSelectedTeamId(storedTeamId);
    }
  }, []);

  const selectedTeam = formulaOneTeams.find((team) => team.id === selectedTeamId) ?? null;
  const dateLabel = event ? formatSportEventDate(event.startsAt, language) : '';
  const timeLabel = event ? formatSportEventTime(event.startsAt, language) : '';

  const labels =
    language === 'ru'
      ? {
          eyebrow: 'Формула 1',
          title: 'Выбор победителя гонки',
          description: 'Откройте команду, которую хотите поддержать как победителя Гран-при Японии.',
          raceSummary: 'Гран-при Японии 2026 · Гонка',
          winner: 'Победитель',
          yes: 'Да',
          selected: 'Выбрано',
          selectedHint: 'Ваш текущий выбор',
          dateTitle: 'Старт гонки'
        }
      : {
          eyebrow: 'Formula 1',
          title: 'Race winner selection',
          description: 'Choose the team you want to back as the winner of the Japanese Grand Prix.',
          raceSummary: 'Japanese Grand Prix 2026 · Race',
          winner: 'Winner',
          yes: 'Yes',
          selected: 'Selected',
          selectedHint: 'Your current pick',
          dateTitle: 'Race start'
        };

  const handleChooseWinner = (teamId: string) => {
    setSelectedTeamId(teamId);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(FORMULA_ONE_SELECTION_KEY, teamId);
    }
  };

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <PageHeader eyebrow={labels.eyebrow} title={labels.title} description={labels.description} />

      <section className="app-card rounded-[1.35rem] border border-black/[0.045] bg-white/[0.9] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="rounded-[1.15rem] border border-black/[0.04] bg-[rgba(247,249,252,0.78)] px-4 py-3.5 dark:bg-white/6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.75rem] font-medium text-text-secondary">{labels.raceSummary}</p>
              <p className="mt-1 text-[0.97rem] font-semibold text-text-primary">
                {selectedTeam ? `${labels.selectedHint}: ${language === 'ru' ? selectedTeam.nameRu : selectedTeam.name}` : labels.winner}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[0.72rem] font-medium text-text-muted">{labels.dateTitle}</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">
                {dateLabel} {timeLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {formulaOneTeams.map((team) => {
          const isSelected = selectedTeamId === team.id;

          return (
            <article
              key={team.id}
              className={cn(
                'app-card rounded-[1.35rem] border px-4 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)] transition dark:shadow-none',
                isSelected
                  ? 'border-[rgba(var(--accent-orange),0.28)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,248,243,0.96))]'
                  : 'border-black/[0.045] bg-white/[0.92] dark:border-white/8 dark:bg-white/6'
              )}
            >
              <div className="space-y-3">
                <div>
                  <p className="text-[0.76rem] font-medium text-text-secondary">{labels.winner}</p>
                  <h2 className="mt-1 text-[1.32rem] font-semibold tracking-tight text-text-primary">
                    {language === 'ru' ? team.nameRu : team.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => handleChooseWinner(team.id)}
                  className={cn(
                    'inline-flex min-h-[3.05rem] w-full items-center justify-start rounded-[0.95rem] px-4 text-[1rem] font-medium transition',
                    isSelected
                      ? 'bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] text-white shadow-[0_14px_24px_rgba(255,116,55,0.18)]'
                      : 'bg-[rgba(244,246,249,0.98)] text-text-primary hover:bg-[rgba(239,242,247,1)] dark:bg-white/8 dark:text-white dark:hover:bg-white/12'
                  )}
                >
                  {isSelected ? labels.selected : labels.yes}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </MainPageLayout>
  );
}
