'use client';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function SettingsScreen() {
  const { t } = useLanguage();

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader eyebrow={t('settings')} title={t('settingsTitle')} description={t('settingsHint')} />
      <SectionCard className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">{t('settingsLanguageLabel')}</p>
          <p className="mt-1 text-sm text-text-secondary">{t('language')}</p>
        </div>
        <LanguageSwitcher />
      </SectionCard>
      <SectionCard className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">{t('settingsThemeLabel')}</p>
          <p className="mt-1 text-sm text-text-secondary">{t('themeSystemCaption')}</p>
        </div>
        <ThemeSwitcher />
      </SectionCard>
    </MainPageLayout>
  );
}
