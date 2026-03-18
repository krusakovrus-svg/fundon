'use client';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord } from '@/types';

export function LiveEventHero({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-4 overflow-hidden border border-white/35 bg-white/60 px-4 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-accent-orange/10 via-transparent to-accent-blue/10" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-text-muted/90">
            {language === 'ru' ? event.categoryLabelRu : event.categoryLabel}
          </p>
          <h1 className="mt-2 text-[1.72rem] font-semibold tracking-tight text-text-primary">
            {language === 'ru' ? event.headlineRu : event.headline}
          </h1>
          <p className="mt-1.5 max-w-[28rem] text-[0.92rem] leading-relaxed text-text-secondary/90">
            {language === 'ru' ? event.titleRu : event.title}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/20 bg-accent-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-orange">
          {t('liveStatus')}
        </span>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 text-[0.82rem] text-text-secondary/85">
        {(event.stageLabel || event.stageLabelRu) ? (
          <span className="inline-flex items-center rounded-full bg-white/65 px-2.5 py-1 dark:bg-white/8">
            {language === 'ru' ? event.stageLabelRu : event.stageLabel}
          </span>
        ) : null}
        <span className="inline-flex items-center rounded-full bg-white/65 px-2.5 py-1 dark:bg-white/8">{event.timerLabel}</span>
        <span className="truncate">{language === 'ru' ? event.venueRu : event.venue}</span>
      </div>
    </SectionCard>
  );
}
