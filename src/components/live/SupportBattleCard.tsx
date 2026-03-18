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
    <SectionCard className="space-y-4 border border-white/35 bg-white/55 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('supportBattle')}</p>
          <p className="mt-2 text-sm text-text-secondary/90">
            {t('eventLeader')}: <span className="font-medium text-text-primary">{leader}</span>
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/20 bg-accent-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
          +{formatCurrency(selectedAmount)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportLeft}
          className="w-full rounded-[1.25rem] border border-white/50 bg-white/60 px-4 py-4 text-left transition hover:border-accent-blue/25 hover:bg-white/75 dark:border-white/8 dark:bg-white/6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">{left.shortName}</p>
          <p className="mt-2 text-[1.7rem] font-semibold tracking-tight text-text-primary">{formatCurrency(left.total)}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary/85">
            <span>{leftPercent}%</span>
            <span>{left.supporters}</span>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportRight}
          className="w-full rounded-[1.25rem] border border-white/50 bg-white/60 px-4 py-4 text-left transition hover:border-accent-orange/25 hover:bg-white/75 dark:border-white/8 dark:bg-white/6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">{right.shortName}</p>
          <p className="mt-2 text-[1.7rem] font-semibold tracking-tight text-text-primary">{formatCurrency(right.total)}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary/85">
            <span>{rightPercent}%</span>
            <span>{right.supporters}</span>
          </div>
        </motion.button>
      </div>

      <div className="space-y-2.5">
        <div className="h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-white/8">
          <div className="flex h-full">
            <motion.div animate={{ width: `${leftPercent}%` }} className="bg-accent-blue" />
            <motion.div animate={{ width: `${rightPercent}%` }} className="bg-accent-orange" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-text-secondary/90">
          <span>{left.shortName} {leftPercent}%</span>
          <span>{rightPercent}% {right.shortName}</span>
        </div>
      </div>
    </SectionCard>
  );
}
