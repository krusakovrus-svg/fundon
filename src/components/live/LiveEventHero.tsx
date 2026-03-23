'use client';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord } from '@/types';

export function LiveEventHero({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();
  const timerLabel = language === 'ru' ? 'Таймер' : 'Timer';

  return (
    <SectionCard className="space-y-4 overflow-hidden border border-white/38 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(248,250,253,0.56))] px-4 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))] dark:shadow-[0_16px_34px_rgba(2,6,23,0.22)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(255,124,65,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(74,144,226,0.10),transparent_40%)]" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/18 bg-accent-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
              {t('liveStatus')}
            </span>
            <span className="inline-flex items-center rounded-full border border-black/[0.04] bg-white/68 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-text-muted dark:border-white/[0.06] dark:bg-white/[0.06]">
              {language === 'ru' ? event.categoryLabelRu : event.categoryLabel}
            </span>
          </div>

          <h1 className="mt-3 text-[1.52rem] font-semibold tracking-tight text-text-primary">
            {language === 'ru' ? event.headlineRu : event.headline}
          </h1>
          <p className="mt-1.5 max-w-[28rem] text-[0.86rem] leading-relaxed text-text-secondary/90">
            {language === 'ru' ? event.titleRu : event.title}
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2.5">
        {(event.stageLabel || event.stageLabelRu) ? (
          <div className="rounded-[1rem] border border-black/[0.035] bg-white/64 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.06]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{t('stageLabel')}</p>
            <p className="mt-1 text-[0.83rem] font-semibold text-text-primary">{language === 'ru' ? event.stageLabelRu : event.stageLabel}</p>
          </div>
        ) : null}
        <div className="rounded-[1rem] border border-black/[0.035] bg-white/64 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.06]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{timerLabel}</p>
          <p className="mt-1 text-[0.83rem] font-semibold text-text-primary">{event.timerLabel}</p>
        </div>
        <div className="rounded-[1rem] border border-black/[0.035] bg-white/64 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.06]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{t('venueLabel')}</p>
          <p className="mt-1 truncate text-[0.83rem] font-medium text-text-secondary">{language === 'ru' ? event.venueRu : event.venue}</p>
        </div>
      </div>
    </SectionCard>
  );
}
