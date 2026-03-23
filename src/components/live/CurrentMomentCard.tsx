'use client';

import { motion } from 'framer-motion';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatReactionCount, getLocalizedMomentLabel } from '@/lib/arena';
import type { LiveMoment } from '@/types';

export function CurrentMomentCard({ moment }: { moment: LiveMoment }) {
  const { language, t } = useLanguage();

  return (
    <SectionCard className="overflow-hidden">
      <motion.div
        key={moment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('currentMoment')}</p>
          <span className="app-pill">{t('liveStatus')}</span>
        </div>

        <div>
          <p className="text-3xl font-semibold tracking-tight text-text-primary">{getLocalizedMomentLabel(moment, language)}</p>
          {moment.participant ? (
            <p className="mt-2 text-sm text-text-secondary">{language === 'ru' ? moment.participantRu : moment.participant}</p>
          ) : null}
        </div>

        <p className="text-sm text-text-secondary">
          +{formatReactionCount(moment.reactionCount, language)} {t('reactionsLabel')}
        </p>
      </motion.div>
    </SectionCard>
  );
}
