'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getLocalizedActivityLabel } from '@/lib/arena';
import type { LiveActivityItem } from '@/types';

export function LiveActivityFeed({ items }: { items: LiveActivityItem[] }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-3 border border-white/35 bg-white/55 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('momentFeed')}</p>
        <span className="text-xs text-text-muted">{items.length}</span>
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
              className="rounded-[1.15rem] border border-white/45 bg-white/60 px-4 py-3 dark:border-white/8 dark:bg-white/6"
            >
              <p className="text-sm font-medium leading-6 text-text-primary">{getLocalizedActivityLabel(item, language)}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
