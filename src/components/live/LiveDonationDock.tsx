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
        className="pointer-events-auto w-full rounded-[1.55rem] border border-white/60 bg-[rgba(var(--surface),0.94)] p-3 shadow-[0_20px_44px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(var(--surface),0.88)] dark:shadow-[0_26px_56px_rgba(2,6,23,0.46)]"
        style={{ maxWidth: 'calc(var(--page-max-width) - (var(--page-padding-x) * 2))' }}
      >
        <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{t('supportAmounts')}</p>

        <div className="grid grid-cols-4 gap-2">
          {amounts.map((amount) => {
            const active = amount === selectedAmount;

            return (
              <button
                key={amount}
                type="button"
                onClick={() => onSelectAmount(amount)}
                className={cn(
                  'rounded-[1rem] border px-2 py-2.5 text-sm font-semibold tracking-tight transition',
                  active
                    ? 'border-accent-orange/40 bg-accent-orange/12 text-text-primary shadow-[0_10px_22px_rgba(255,124,65,0.16)]'
                    : 'border-border bg-surface-muted text-text-secondary'
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
            whileTap={{ scale: 0.98 }}
            onClick={onSupportLeft}
            className="rounded-[1.1rem] bg-accent-blue px-3 py-3.5 text-center text-[0.96rem] font-semibold tracking-tight text-white shadow-[0_14px_30px_rgba(74,144,226,0.28)]"
          >
            {leftLabel}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={onSupportRight}
            className="rounded-[1.1rem] bg-accent-orange px-3 py-3.5 text-center text-[0.96rem] font-semibold tracking-tight text-white shadow-[0_14px_30px_rgba(255,124,65,0.28)]"
          >
            {rightLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
