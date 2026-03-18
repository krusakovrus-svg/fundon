'use client';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord } from '@/types';

export function LiveEventHero({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-3 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-accent-orange/10 via-transparent to-accent-blue/10" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {language === 'ru' ? event.categoryLabelRu : event.categoryLabel}
          </p>
          <h1 className="mt-1.5 text-[1.55rem] font-semibold tracking-tight text-text-primary">
            {language === 'ru' ? event.headlineRu : event.headline}
          </h1>
          <p className="mt-1 text-[0.92rem] leading-relaxed text-text-secondary">
            {language === 'ru' ? event.titleRu : event.title}
          </p>
        </div>

        <span className="app-pill shrink-0">{t('liveStatus')}</span>
      </div>

      <div className="relative flex flex-wrap items-center gap-2.5 text-[0.88rem] text-text-secondary">
        {event.stageLabel || event.stageLabelRu ? (
          <span>{language === 'ru' ? event.stageLabelRu : event.stageLabel}</span>
        ) : null}
        <span>{event.timerLabel}</span>
        <span aria-hidden="true">&middot;</span>
        <span className="truncate">{language === 'ru' ? event.venueRu : event.venue}</span>
      </div>
    </SectionCard>
  );
}
