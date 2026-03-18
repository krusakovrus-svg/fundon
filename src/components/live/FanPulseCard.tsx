'use client';

import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FanPulseCardProps {
  value: number;
  stateLabel: string;
}

export function FanPulseCard({ value, stateLabel }: FanPulseCardProps) {
  const { t } = useLanguage();
  const segments = 14;
  const activeSegments = Math.max(1, Math.round((value / 100) * segments));

  return (
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('fanPulse')}</p>
        <p className="text-3xl font-semibold tracking-tight text-text-primary">{value}%</p>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
        {Array.from({ length: segments }).map((_, index) => {
          const active = index < activeSegments;
          return (
            <motion.span
              key={index}
              animate={{ opacity: active ? 1 : 0.28, scaleY: active ? 1 : 0.92 }}
              transition={{ duration: 0.25 }}
              className="h-6 rounded-full bg-accent-orange"
            />
          );
        })}
      </div>

      <p className="text-sm text-text-secondary">
        {t('crowdHeat')}: <span className="font-semibold text-text-primary">{stateLabel}</span>
      </p>
    </SectionCard>
  );
}
