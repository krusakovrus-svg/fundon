'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { SectionCard } from '@/components/ui/SectionCard';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { SupportAmount } from '@/types';

interface LiveDonationDockProps {
  leftLabel: string;
  rightLabel: string;
  amounts: SupportAmount[];
  selectedAmount: SupportAmount;
  onSelectAmount: (amount: SupportAmount) => void;
  onSupportLeft: () => void;
  onSupportRight: () => void;
}

export function LiveDonationDock({
  leftLabel,
  rightLabel,
  amounts,
  selectedAmount,
  onSelectAmount,
  onSupportLeft,
  onSupportRight
}: LiveDonationDockProps) {
  const { language, t } = useLanguage();
  const supportActionLabel = language === 'ru' ? 'Поддержать' : 'Support';
  const supportHint =
    language === 'ru' ? 'Выберите сумму и поддержите сторону' : 'Choose an amount and support a side';

  return (
    <SectionCard className="space-y-3.5 border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.93),rgba(249,250,253,0.84))] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(21,28,41,0.92),rgba(15,21,33,0.88))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.22)]">
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-muted dark:text-white/[0.42]">
          {t('supportAmounts')}
        </p>
        <p className="mt-1.5 max-w-[16rem] text-[0.82rem] leading-5 text-text-secondary dark:text-white/[0.58]">
          {supportHint}
        </p>
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
                  ? 'border-accent-orange/24 bg-[linear-gradient(180deg,rgba(255,124,65,0.17),rgba(255,124,65,0.11))] text-[rgb(var(--accent-orange))] shadow-[0_10px_22px_rgba(255,124,65,0.14)] dark:border-[rgba(255,124,65,0.24)] dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.22),rgba(255,124,65,0.14))]'
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
          <span className="block text-[0.95rem] font-semibold tracking-tight">{leftLabel}</span>
          <span className="mt-1 block text-[0.72rem] font-medium text-white/74">
            {supportActionLabel} {formatCurrency(selectedAmount, language)}
          </span>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onSupportRight}
          className="rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,124,65,1),rgba(243,110,51,1))] px-3 py-3.5 text-center text-white shadow-[0_14px_26px_rgba(255,124,65,0.22)]"
        >
          <span className="block text-[0.95rem] font-semibold tracking-tight">{rightLabel}</span>
          <span className="mt-1 block text-[0.72rem] font-medium text-white/74">
            {supportActionLabel} {formatCurrency(selectedAmount, language)}
          </span>
        </motion.button>
      </div>
    </SectionCard>
  );
}
