'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getLocalizedMomentLabel } from '@/lib/arena';
import type { LiveMoment } from '@/types';

interface LiveMomentumPanelProps {
  moment: LiveMoment;
  message: string;
  fanPulseValue: number;
  fanHeatLabel: string;
}

export function LiveMomentumPanel({ moment, message, fanPulseValue, fanHeatLabel }: LiveMomentumPanelProps) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-4 border border-white/35 bg-white/55 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('supportMomentum')}</p>
        <p className="text-[1.35rem] font-semibold tracking-tight text-text-primary">{fanPulseValue}%</p>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence mode="wait">
          <motion.p
            key={moment.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-[1.12rem] font-semibold tracking-tight text-text-primary"
          >
            {getLocalizedMomentLabel(moment, language)}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-[0.92rem] leading-relaxed text-text-secondary/90"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/45 bg-white/60 px-3 py-2.5 dark:border-white/8 dark:bg-white/6">
        <span className="text-[0.82rem] uppercase tracking-[0.16em] text-text-secondary/80">{t('crowdHeat')}</span>
        <span className="text-[0.95rem] font-semibold text-text-primary">{fanHeatLabel}</span>
      </div>
    </SectionCard>
  );
}
