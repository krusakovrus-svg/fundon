'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatCount } from '@/lib/format';
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
  const momentumLabel = language === 'ru' ? 'Темп поддержки' : 'Support momentum';

  return (
    <SectionCard className="space-y-3.5 border border-white/30 bg-white/48 px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.04] dark:shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{momentumLabel}</p>
          <p className="mt-1 text-[0.85rem] text-text-secondary">{t('crowdHeat')}: <span className="font-medium text-text-primary">{fanHeatLabel}</span></p>
        </div>
        <p className="text-[1.18rem] font-semibold tracking-tight text-text-primary">{fanPulseValue}%</p>
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

      <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/38 bg-white/58 px-3 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.05]">
        <span className="text-[0.78rem] uppercase tracking-[0.14em] text-text-secondary/80">{t('reactionsLabel')}</span>
        <span className="text-[0.9rem] font-semibold text-text-primary">{formatCount(moment.reactionCount, language)}</span>
      </div>
    </SectionCard>
  );
}
