'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { SectionCard } from '@/components/ui/SectionCard';
import { calculateSupportSplit, formatCurrency } from '@/lib/arena';
import { cn } from '@/lib/utils';
import type { SupportAmount } from '@/types';

interface SupportSide {
  id: string;
  shortName: string;
  total: number;
  supporters: number;
}

interface SupportBattleCardProps {
  left: SupportSide;
  right: SupportSide;
  amounts: SupportAmount[];
  selectedAmount: SupportAmount;
  onSelectAmount: (amount: SupportAmount) => void;
  onSupportLeft: () => void;
  onSupportRight: () => void;
}

export function SupportBattleCard({
  left,
  right,
  amounts,
  selectedAmount,
  onSelectAmount,
  onSupportLeft,
  onSupportRight
}: SupportBattleCardProps) {
  const { language, t } = useLanguage();
  const { leftPercent, rightPercent } = calculateSupportSplit(left.total, right.total);
  const leader = left.total >= right.total ? left.shortName : right.shortName;
  const supportActionLabel = language === 'ru' ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c' : 'Support';
  const supportersLabel = language === 'ru' ? '\u0444\u0430\u043d\u0430\u0442\u043e\u0432' : 'supporters';
  const leaderLabel = language === 'ru' ? '\u041b\u0438\u0434\u0435\u0440 \u0441\u0435\u0439\u0447\u0430\u0441' : 'Current leader';

  return (
    <SectionCard className="space-y-4 border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,251,253,0.84))] px-4 py-4 shadow-[0_20px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(22,29,42,0.92),rgba(15,21,32,0.88))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{t('supportBattle')}</p>
          <p className="mt-1.5 text-[0.82rem] text-text-secondary dark:text-white/[0.58]">
            {leaderLabel}: <span className="font-semibold text-text-primary dark:text-white/[0.92]">{leader}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="w-full rounded-[1.18rem] border border-black/[0.04] bg-[rgba(255,255,255,0.82)] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.92),rgba(22,30,43,0.90))]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted dark:text-white/[0.42]">{left.shortName}</p>
          <p className="mt-2 text-[1.62rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{formatCurrency(left.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
            <span>{leftPercent}%</span>
            <span>
              {left.supporters} {supportersLabel}
            </span>
          </div>
        </div>

        <div className="w-full rounded-[1.18rem] border border-black/[0.04] bg-[rgba(255,255,255,0.82)] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.92),rgba(22,30,43,0.90))]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted dark:text-white/[0.42]">{right.shortName}</p>
          <p className="mt-2 text-[1.62rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{formatCurrency(right.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
            <span>{rightPercent}%</span>
            <span>
              {right.supporters} {supportersLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.04] dark:bg-white/[0.08]">
          <div className="flex h-full">
            <motion.div animate={{ width: `${leftPercent}%` }} className="bg-accent-blue" />
            <motion.div animate={{ width: `${rightPercent}%` }} className="bg-accent-orange" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
          <span>
            {left.shortName} {leftPercent}%
          </span>
          <span>
            {rightPercent}% {right.shortName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {amounts.map((amount) => {
          const active = amount === selectedAmount;

          return (
            <button
              key={amount}
              type="button"
              onClick={() => onSelectAmount(amount)}
              className={cn(
                'rounded-[1rem] border px-2 py-2.5 text-sm font-semibold tracking-tight transition duration-200',
                active
                  ? 'border-accent-orange/24 bg-[linear-gradient(180deg,rgba(255,124,65,0.16),rgba(255,124,65,0.10))] text-[rgb(var(--accent-orange))] shadow-[0_10px_22px_rgba(255,124,65,0.12)] dark:border-[rgba(255,124,65,0.24)] dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.18),rgba(255,124,65,0.12))]'
                  : 'border-black/[0.04] bg-white/[0.72] text-text-secondary dark:border-white/[0.07] dark:bg-white/[0.045] dark:text-white/[0.62]'
              )}
            >
              {formatCurrency(amount, language)}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportLeft}
          className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(74,144,226,1),rgba(60,126,209,1))] px-3 py-3.5 text-center text-white shadow-[0_14px_26px_rgba(74,144,226,0.22)]"
        >
          <span className="block text-[0.95rem] font-semibold tracking-tight">{left.shortName}</span>
          <span className="mt-1 block text-[0.72rem] font-medium text-white/74">{supportActionLabel}</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportRight}
          className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,124,65,1),rgba(243,110,51,1))] px-3 py-3.5 text-center text-white shadow-[0_14px_26px_rgba(255,124,65,0.22)]"
        >
          <span className="block text-[0.95rem] font-semibold tracking-tight">{right.shortName}</span>
          <span className="mt-1 block text-[0.72rem] font-medium text-white/74">{supportActionLabel}</span>
        </motion.button>
      </div>
    </SectionCard>
  );
}
