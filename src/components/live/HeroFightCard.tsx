'use client';

import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { EventRecord } from '@/types';

export function HeroFightCard({ event }: { event: EventRecord }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard>
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-accent-orange/12 via-transparent to-accent-blue/8" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">
            {language === 'ru' ? event.categoryLabelRu : event.categoryLabel}
          </p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight text-text-primary">
            {language === 'ru' ? event.headlineRu : event.headline}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">{language === 'ru' ? event.titleRu : event.title}</p>
        </div>
        <span className="app-pill shrink-0">{t('liveStatus')}</span>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <motion.div layout className="app-subtle-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{t('stageLabel')}</p>
          <p className="mt-2 text-sm text-text-secondary">{language === 'ru' ? event.stageLabelRu : event.stageLabel}</p>
          <p className="mt-3 text-[1.75rem] font-semibold tracking-tight text-text-primary">{event.timerLabel}</p>
        </motion.div>
        <motion.div layout className="app-subtle-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{t('venueLabel')}</p>
          <p className="mt-3 text-base font-semibold text-text-primary">{language === 'ru' ? event.venueRu : event.venue}</p>
        </motion.div>
      </div>
    </SectionCard>
  );
}
