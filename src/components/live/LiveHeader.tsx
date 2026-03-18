'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function LiveHeader() {
  const { t } = useLanguage();

  return (
    <PageHeader
      eyebrow={t('liveNow')}
      title={t('liveTitle')}
      description={t('liveHint')}
      badge={t('liveStatus')}
    />
  );
}
