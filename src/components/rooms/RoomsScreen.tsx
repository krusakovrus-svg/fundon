'use client';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { mockData } from '@/data/mock';

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3.5 13.8 8l4.7 1.7-4.7 1.8L12 16l-1.8-4.5L5.5 9.7 10.2 8 12 3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M16.7 10.7a2.7 2.7 0 1 0 0-5.4" />
      <path d="M3.8 18.6c.7-2.6 2.8-4.1 5.2-4.1s4.5 1.5 5.2 4.1" strokeLinecap="round" />
      <path d="M15 14.9c1.7.3 3 1.4 3.6 3.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getRoomCopy(roomId: string) {
  const corrected = {
    room_1: {
      nameRu: 'Главное событие',
      eventTitleRu: 'Евлоев vs Мерфи'
    },
    room_2: {
      nameRu: 'Ночной просмотр',
      eventTitleRu: 'Евлоев vs Мерфи'
    }
  } as const;

  return corrected[roomId as keyof typeof corrected] ?? null;
}

export function RoomsScreen() {
  const { language, t } = useLanguage();
  const isRussian = language === 'ru';
  const introTitle = isRussian ? 'Комнаты скоро откроются' : 'Rooms are on the way';
  const introBody = isRussian
    ? 'Здесь появятся совместная поддержка, рейтинг участников и энергия события в одном общем пространстве.'
    : 'This is where shared support, member ranking, and event energy will come together in one space.';
  const featurePills = isRussian
    ? ['Совместная поддержка', 'Рейтинг участников', 'Энергия события']
    : ['Shared support', 'Member ranking', 'Event energy'];

  return (
    <MainPageLayout className="space-y-[1.125rem]">
      <PageHeader title={t('roomsTitle')} />

      <SectionCard className="border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.05rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))]">
              <SparkIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('comingSoon')}</p>
              <h2 className="mt-2 text-[1.02rem] font-semibold text-text-primary">{introTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{introBody}</p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full bg-[rgba(247,249,252,0.9)] px-2.5 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
            {t('comingSoon')}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {featurePills.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-1.5 text-[0.78rem] font-medium text-text-secondary dark:border-white/8 dark:bg-white/[0.04]"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('recentRooms')}</p>
            <p className="mt-1 text-sm text-text-secondary">
              {isRussian
                ? 'Предпросмотр комнат, которые уже готовы к следующему этапу.'
                : 'A preview of rooms ready for the next product step.'}
            </p>
          </div>
          <span className="inline-flex min-w-[1.65rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04]">
            {mockData.rooms.length}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {mockData.rooms.map((room) => {
            const correctedCopy = getRoomCopy(room.id);
            const roomName = isRussian ? correctedCopy?.nameRu ?? room.nameRu : room.name;
            const roomEvent = isRussian ? correctedCopy?.eventTitleRu ?? room.eventTitleRu : room.eventTitle;

            return (
              <div
                key={room.id}
                className="rounded-[1.2rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] px-4 py-4 shadow-[0_12px_26px_rgba(15,23,42,0.05)] dark:border-white/8 dark:bg-white/[0.05] dark:shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.05rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))]">
                      <GroupIcon />
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-[1rem] font-semibold text-text-primary">{roomName}</p>
                      <p className="mt-1 text-sm text-text-secondary">{roomEvent}</p>
                      <p className="mt-2 text-[12px] text-text-muted">
                        {room.members} {t('roomMembers')}
                      </p>
                    </div>
                  </div>

                  <span className="mt-0.5 shrink-0 text-text-muted">
                    <ChevronIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
