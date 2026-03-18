'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getLocalizedActivityLabel } from '@/lib/arena';
import type { LiveActivityItem } from '@/types';

export function LiveActivityFeed({ items }: { items: LiveActivityItem[] }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('momentFeed')}</p>
        <span className="text-xs text-text-muted">{items.length}</span>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl border border-border bg-surface-muted px-4 py-3"
            >
              <p className="text-sm font-medium leading-6 text-text-primary">{getLocalizedActivityLabel(item, language)}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
