'use client';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord } from '@/types';

export function LiveEventHero({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-3.5 overflow-hidden border border-white/35 bg-white/56 px-4 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.05] dark:shadow-none">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-accent-orange/8 via-transparent to-accent-blue/8" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-muted/90">
            {language === 'ru' ? event.categoryLabelRu : event.categoryLabel}
          </p>
          <h1 className="mt-2 text-[1.52rem] font-semibold tracking-tight text-text-primary">
            {language === 'ru' ? event.headlineRu : event.headline}
          </h1>
          <p className="mt-1.5 max-w-[28rem] text-[0.88rem] leading-relaxed text-text-secondary/90">
            {language === 'ru' ? event.titleRu : event.title}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
          {t('liveStatus')}
        </span>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 text-[0.8rem] text-text-secondary/85">
        {(event.stageLabel || event.stageLabelRu) ? (
          <span className="inline-flex items-center rounded-full border border-black/[0.03] bg-white/68 px-2.5 py-1 dark:border-white/[0.06] dark:bg-white/[0.06]">
            {language === 'ru' ? event.stageLabelRu : event.stageLabel}
          </span>
        ) : null}
        <span className="inline-flex items-center rounded-full border border-black/[0.03] bg-white/68 px-2.5 py-1 dark:border-white/[0.06] dark:bg-white/[0.06]">
          {event.timerLabel}
        </span>
        <span className="truncate">{language === 'ru' ? event.venueRu : event.venue}</span>
      </div>
    </SectionCard>
  );
}
