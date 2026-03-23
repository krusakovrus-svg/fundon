'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { SectionCard } from '@/components/ui/SectionCard';
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
  const { language, t } = useLanguage();
  const { leftPercent, rightPercent } = calculateSupportSplit(left.total, right.total);
  const leader = left.total >= right.total ? left.shortName : right.shortName;
  const amountLabel = language === 'ru' ? 'В один тап' : 'One-tap';
  const supportActionLabel = language === 'ru' ? 'Поддержать' : 'Support';
  const supportersLabel = language === 'ru' ? 'фанатов' : 'supporters';
  const leaderLabel = language === 'ru' ? 'Лидер сейчас' : 'Current leader';

  return (
    <SectionCard className="space-y-4 border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,251,253,0.82)_100%)] px-4 py-4 shadow-[0_22px_46px_rgba(15,23,42,0.11)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.055)_100%)] dark:shadow-[0_18px_34px_rgba(2,6,23,0.24)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('supportBattle')}</p>
          <p className="mt-1.5 text-[0.84rem] text-text-secondary/82">
            {leaderLabel}: <span className="font-semibold text-text-primary">{leader}</span>
          </p>
        </div>

        <div className="shrink-0 rounded-[1rem] border border-black/[0.04] bg-white/62 px-3 py-2 text-right dark:border-white/[0.07] dark:bg-white/[0.05]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{amountLabel}</p>
          <p className="mt-1 text-[1rem] font-semibold tracking-tight text-text-primary">{formatCurrency(selectedAmount, language)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportLeft}
          className="w-full rounded-[1.25rem] border border-black/[0.04] bg-white/[0.8] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition hover:border-accent-blue/18 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.055]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">{left.shortName}</p>
          <p className="mt-2 text-[1.72rem] font-semibold tracking-tight text-text-primary">{formatCurrency(left.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.82rem] text-text-secondary/78">
            <span>{leftPercent}%</span>
            <span>{left.supporters} {supportersLabel}</span>
          </div>
          <div className="mt-4 inline-flex items-center rounded-full border border-accent-blue/14 bg-accent-blue/8 px-3 py-1.5 text-[0.74rem] font-semibold text-accent-blue">
            {supportActionLabel} {formatCurrency(selectedAmount, language)}
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportRight}
          className="w-full rounded-[1.25rem] border border-black/[0.04] bg-white/[0.8] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition hover:border-accent-orange/18 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.055]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">{right.shortName}</p>
          <p className="mt-2 text-[1.72rem] font-semibold tracking-tight text-text-primary">{formatCurrency(right.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.82rem] text-text-secondary/78">
            <span>{rightPercent}%</span>
            <span>{right.supporters} {supportersLabel}</span>
          </div>
          <div className="mt-4 inline-flex items-center rounded-full border border-accent-orange/14 bg-accent-orange/8 px-3 py-1.5 text-[0.74rem] font-semibold text-accent-orange">
            {supportActionLabel} {formatCurrency(selectedAmount, language)}
          </div>
        </motion.button>
      </div>

      <div className="space-y-2.5">
        <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.04] dark:bg-white/[0.08]">
          <div className="flex h-full">
            <motion.div animate={{ width: `${leftPercent}%` }} className="bg-accent-blue" />
            <motion.div animate={{ width: `${rightPercent}%` }} className="bg-accent-orange" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[0.82rem] text-text-secondary/82">
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
