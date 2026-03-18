'use client';

import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';
import type { SupportAmount } from '@/types';

interface SupportAmountSelectorProps {
  amounts: SupportAmount[];
  selectedAmount: SupportAmount;
  onSelect: (amount: SupportAmount) => void;
}

export function SupportAmountSelector({ amounts, selectedAmount, onSelect }: SupportAmountSelectorProps) {
  const { t } = useLanguage();

  return (
    <SectionCard className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('supportAmounts')}</p>
      <div className="grid grid-cols-4 gap-2">
        {amounts.map((amount) => {
          const active = amount === selectedAmount;

          return (
            <motion.button
              key={amount}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(amount)}
              className={cn(
                'rounded-2xl border px-3 py-4 text-center text-base font-semibold tracking-tight transition',
                active
                  ? 'border-accent-orange/45 bg-accent-orange/12 text-text-primary shadow-glow'
                  : 'border-border bg-surface-muted text-text-secondary'
              )}
            >
              ${amount}
            </motion.button>
          );
        })}
      </div>
    </SectionCard>
  );
}
