'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function MomentumCard({ message }: { message: string }) {
  const { t } = useLanguage();

  return (
    <SectionCard className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('supportMomentum')}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-base font-semibold text-text-primary"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </SectionCard>
  );
}
