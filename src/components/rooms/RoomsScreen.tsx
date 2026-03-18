'use client';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { mockData } from '@/data/mock';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function RoomsScreen() {
  const { language, t } = useLanguage();

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader
        eyebrow={t('placeholderRooms')}
        title={t('roomsTitle')}
        description={t('roomsHint')}
        badge={t('comingSoon')}
      />

      <SectionCard>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{t('roomPreviewTitle')}</p>
        <p className="mt-3 text-sm leading-6 text-text-secondary">{t('roomPreviewBody')}</p>
      </SectionCard>

      <SectionCard>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text-primary">{t('recentRooms')}</h3>
          <span className="text-xs text-text-muted">{mockData.rooms.length}</span>
        </div>
        <div className="space-y-3">
          {mockData.rooms.map((room) => (
            <div key={room.id} className="app-subtle-card">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-text-primary">{language === 'ru' ? room.nameRu : room.name}</p>
                <span className="app-pill">
                  {room.members} {t('roomMembers')}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{language === 'ru' ? room.eventTitleRu : room.eventTitle}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
