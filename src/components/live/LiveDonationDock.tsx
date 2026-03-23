'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/components/providers/LanguageProvider';
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
  const selectedAmountLabel = language === 'ru' ? 'Выбрано' : 'Selected';
  const supportActionLabel = language === 'ru' ? 'Поддержать' : 'Support';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[5.35rem] z-30 flex justify-center px-4">
      <div
        className="pointer-events-auto w-full rounded-[1.7rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,250,253,0.82))] p-3.5 shadow-[0_18px_38px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[linear-gradient(180deg,rgba(21,28,42,0.9),rgba(16,22,34,0.86))] dark:shadow-[0_22px_42px_rgba(2,6,23,0.30)]"
        style={{ maxWidth: 'calc(var(--page-max-width) - (var(--page-padding-x) * 2))' }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-muted">{t('supportAmounts')}</p>
          <div className="rounded-[0.95rem] border border-black/[0.04] bg-white/66 px-3 py-2 text-right dark:border-white/[0.08] dark:bg-white/[0.05]">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-text-muted">{selectedAmountLabel}</p>
            <span className="mt-1 block text-[0.92rem] font-semibold tracking-tight text-text-primary">{formatCurrency(selectedAmount, language)}</span>
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
                    ? 'border-accent-orange/22 bg-accent-orange/10 text-text-primary shadow-[0_8px_18px_rgba(255,124,65,0.12)]'
                    : 'border-black/[0.04] bg-white/[0.72] text-text-secondary dark:border-white/[0.08] dark:bg-white/[0.045]'
                )}
              >
                {formatCurrency(amount, language)}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
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
      </div>
    </div>
  );
}
