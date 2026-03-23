'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getLocalizedActivityLabel } from '@/lib/arena';
import type { LiveActivityItem } from '@/types';

export function LiveActivityFeed({ items }: { items: LiveActivityItem[] }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-3 border border-white/30 bg-white/46 px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.04] dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('momentFeed')}</p>
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[0.68rem] font-semibold text-text-muted dark:bg-white/[0.05]">{items.length}</span>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="rounded-[1.1rem] border border-white/40 bg-white/58 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.05]"
            >
              <p className="text-[0.93rem] font-medium leading-6 text-text-primary">{getLocalizedActivityLabel(item, language)}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
