'use client';

import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { calculateSupportSplit, formatCurrency } from '@/lib/arena';

interface SupportSide {
  id: string;
  shortName: string;
  total: number;
  supporters: number;
}

interface SupportBattleCardProps {
  left: SupportSide;
  right: SupportSide;
  selectedAmount: number;
  onSupportLeft: () => void;
  onSupportRight: () => void;
}

export function SupportBattleCard({
  left,
  right,
  selectedAmount,
  onSupportLeft,
  onSupportRight
}: SupportBattleCardProps) {
  const { t } = useLanguage();
  const { leftPercent, rightPercent } = calculateSupportSplit(left.total, right.total);
  const leader = left.total >= right.total ? left.shortName : right.shortName;

  return (
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('supportBattle')}</p>
          <p className="mt-2 text-sm text-text-secondary">
            {t('eventLeader')}: <span className="font-medium text-text-primary">{leader}</span>
          </p>
        </div>
        <span className="app-pill shrink-0">+{formatCurrency(selectedAmount)}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onSupportLeft}
          className="app-subtle-card w-full text-left transition hover:border-accent-blue/40"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{left.shortName}</p>
          <p className="mt-2 text-[1.75rem] font-semibold tracking-tight text-text-primary">{formatCurrency(left.total)}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
            <span>{leftPercent}%</span>
            <span>{left.supporters}</span>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onSupportRight}
          className="app-subtle-card w-full text-left transition hover:border-accent-orange/40"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{right.shortName}</p>
          <p className="mt-2 text-[1.75rem] font-semibold tracking-tight text-text-primary">{formatCurrency(right.total)}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
            <span>{rightPercent}%</span>
            <span>{right.supporters}</span>
          </div>
        </motion.button>
      </div>

      <div className="space-y-3">
        <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
          <div className="flex h-full">
            <motion.div animate={{ width: `${leftPercent}%` }} className="bg-accent-blue" />
            <motion.div animate={{ width: `${rightPercent}%` }} className="bg-accent-orange" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            {left.shortName} {leftPercent}%
          </span>
          <span>
            {rightPercent}% {right.shortName}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
