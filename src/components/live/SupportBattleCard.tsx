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
  const amountLabel = language === 'ru' ? '\u0412 \u043e\u0434\u0438\u043d \u0442\u0430\u043f' : 'One-tap';
  const supportActionLabel = language === 'ru' ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c' : 'Support';
  const supportersLabel = language === 'ru' ? '\u0444\u0430\u043d\u0430\u0442\u043e\u0432' : 'supporters';
  const leaderLabel = language === 'ru' ? '\u041b\u0438\u0434\u0435\u0440 \u0441\u0435\u0439\u0447\u0430\u0441' : 'Current leader';

  return (
    <SectionCard className="space-y-4 border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,251,253,0.84))] px-4 py-4 shadow-[0_20px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(22,29,42,0.92),rgba(15,21,32,0.88))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.22)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{t('supportBattle')}</p>
          <p className="mt-1.5 text-[0.82rem] text-text-secondary dark:text-white/[0.58]">
            {leaderLabel}: <span className="font-semibold text-text-primary dark:text-white/[0.92]">{leader}</span>
          </p>
        </div>

        <div className="shrink-0 rounded-[1rem] border border-black/[0.04] bg-[rgba(247,249,252,0.78)] px-3 py-2 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">{amountLabel}</p>
          <p className="mt-1 text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{formatCurrency(selectedAmount, language)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportLeft}
          className="w-full rounded-[1.18rem] border border-black/[0.04] bg-[rgba(255,255,255,0.82)] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition hover:border-accent-blue/16 hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.92),rgba(22,30,43,0.90))] dark:hover:border-[rgba(74,144,226,0.18)] dark:hover:bg-[linear-gradient(180deg,rgba(37,46,61,0.94),rgba(25,34,47,0.92))]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted dark:text-white/[0.42]">{left.shortName}</p>
          <p className="mt-2 text-[1.62rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{formatCurrency(left.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
            <span>{leftPercent}%</span>
            <span>
              {left.supporters} {supportersLabel}
            </span>
          </div>
          <div className="mt-4 inline-flex items-center rounded-full border border-accent-blue/14 bg-accent-blue/8 px-3 py-1.5 text-[0.73rem] font-semibold text-accent-blue dark:bg-[rgba(74,144,226,0.10)]">
            {supportActionLabel} {formatCurrency(selectedAmount, language)}
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportRight}
          className="w-full rounded-[1.18rem] border border-black/[0.04] bg-[rgba(255,255,255,0.82)] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition hover:border-accent-orange/16 hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(33,41,56,0.92),rgba(22,30,43,0.90))] dark:hover:border-[rgba(255,124,65,0.18)] dark:hover:bg-[linear-gradient(180deg,rgba(37,46,61,0.94),rgba(25,34,47,0.92))]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted dark:text-white/[0.42]">{right.shortName}</p>
          <p className="mt-2 text-[1.62rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{formatCurrency(right.total, language)}</p>
          <div className="mt-3 flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
            <span>{rightPercent}%</span>
            <span>
              {right.supporters} {supportersLabel}
            </span>
          </div>
          <div className="mt-4 inline-flex items-center rounded-full border border-accent-orange/14 bg-accent-orange/8 px-3 py-1.5 text-[0.73rem] font-semibold text-accent-orange dark:bg-[rgba(255,124,65,0.10)]">
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
        <div className="flex items-center justify-between text-[0.8rem] text-text-secondary dark:text-white/[0.54]">
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
