'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/providers/LanguageProvider';
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
  const { t } = useLanguage();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[5.35rem] z-30 flex justify-center px-4">
      <div
        className="pointer-events-auto w-full rounded-[1.7rem] border border-white/55 bg-[rgba(255,255,255,0.82)] p-3.5 shadow-[0_22px_48px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(var(--surface),0.9)] dark:shadow-[0_28px_56px_rgba(2,6,23,0.42)]"
        style={{ maxWidth: 'calc(var(--page-max-width) - (var(--page-padding-x) * 2))' }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-muted">{t('supportAmounts')}</p>
          <span className="text-[0.82rem] font-semibold tracking-tight text-text-primary">${selectedAmount}</span>
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
                    ? 'border-accent-orange/30 bg-accent-orange/10 text-text-primary shadow-[0_10px_20px_rgba(255,124,65,0.14)]'
                    : 'border-white/50 bg-white/55 text-text-secondary dark:border-white/8 dark:bg-white/6'
                )}
              >
                ${amount}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={onSupportLeft}
            className="rounded-[1.2rem] bg-accent-blue px-3 py-3.5 text-center text-[0.96rem] font-semibold tracking-tight text-white shadow-[0_14px_30px_rgba(74,144,226,0.24)]"
          >
            {leftLabel}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={onSupportRight}
            className="rounded-[1.2rem] bg-accent-orange px-3 py-3.5 text-center text-[0.96rem] font-semibold tracking-tight text-white shadow-[0_14px_30px_rgba(255,124,65,0.24)]"
          >
            {rightLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
