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
    <SectionCard className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('supportMomentum')}</p>
        <p className="text-[1.45rem] font-semibold tracking-tight text-text-primary">{fanPulseValue}%</p>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={moment.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-[1.08rem] font-semibold tracking-tight text-text-primary"
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
            className="text-[0.92rem] leading-relaxed text-text-secondary"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-border bg-surface-muted px-3 py-2.5">
        <span className="text-[0.85rem] text-text-secondary">{t('crowdHeat')}</span>
        <span className="text-[0.95rem] font-semibold text-text-primary">{fanHeatLabel}</span>
      </div>
    </SectionCard>
  );
}
