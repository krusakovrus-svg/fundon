'use client';

import Link from 'next/link';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { liveEvents } from '@/data/liveEvents';
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
    <svg viewBox="0 0 20 20" className="h-[0.92rem] w-[0.92rem]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getRoomCopy(roomId: string) {
  const corrected = {
    room_1: {
      nameRu: 'Главное событие',
      eventTitleRu: 'Евлоев vs Мерфи',
      statusRu: 'Готова к запуску',
      statusEn: 'Ready to launch'
    },
    room_2: {
      nameRu: 'Ночной просмотр',
      eventTitleRu: 'Евлоев vs Мерфи',
      statusRu: 'Скоро откроется',
      statusEn: 'Coming soon'
    }
  } as const;

  return corrected[roomId as keyof typeof corrected] ?? null;
}

export function RoomsScreen() {
  const { language } = useLanguage();
  const isRussian = language === 'ru';

  const headerDescription = isRussian
    ? 'Комнаты позже добавят совместную поддержку и энергию эфира.'
    : 'Rooms will later add shared support and live-room energy.';
  const introTitle = isRussian ? 'Комнаты в следующей волне' : 'Rooms in the next wave';
  const introBody = isRussian
    ? 'Комнаты объединят совместную поддержку, приватные сценарии просмотра и быстрый доступ к live-событиям.'
    : 'Rooms will combine shared support, private watch flows, and quick access to live events.';
  const featurePills = isRussian
    ? ['Совместная поддержка', 'Приватные сценарии', 'Рейтинг участников']
    : ['Shared support', 'Private watch flow', 'Member ranking'];
  const summaryItems = [
    {
      label: isRussian ? 'Подготовлено' : 'Prepared',
      value: mockData.rooms.length.toString(),
      note: isRussian ? 'к релизу' : 'for release'
    },
    {
      label: isRussian ? 'Эфиров сейчас' : 'Live now',
      value: liveEvents.length.toString(),
      note: isRussian ? 'в ленте' : 'in feed'
    },
    {
      label: isRussian ? 'Следующий этап' : 'Next stage',
      value: isRussian ? 'Комнаты' : 'Rooms',
      note: isRussian ? 'после live' : 'after live'
    }
  ];
  const activeRoomsDescription = isRussian
    ? 'Комнаты, которые уже готовы к следующему mobile-релизу.'
    : 'Rooms already prepared for the next mobile release.';
  const openLiveLabel = isRussian ? 'Перейти к активному эфиру' : 'Open active live event';

  return (
    <MainPageLayout className="space-y-3.5">
      <PageHeader title={isRussian ? 'Комнаты' : 'Rooms'} description={headerDescription} />

      <SectionCard className="space-y-3.5 border border-black/[0.045] bg-white/[0.88] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))] dark:bg-[rgba(var(--accent-orange),0.12)]">
              <SparkIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
                {isRussian ? 'Скоро' : 'Coming soon'}
              </p>
              <h2 className="mt-1.5 text-[1.04rem] font-semibold text-text-primary dark:text-white">{introTitle}</h2>
              <p className="mt-1.5 text-[0.92rem] leading-6 text-text-secondary dark:text-white/[0.62]">{introBody}</p>
            </div>
          </div>

          <span className="rounded-full border border-[rgba(var(--accent-orange),0.14)] bg-[rgba(var(--accent-orange),0.06)] px-3 py-1.5 text-[0.7rem] font-semibold text-text-secondary dark:border-[rgba(var(--accent-orange),0.12)] dark:bg-[rgba(var(--accent-orange),0.08)] dark:text-white/[0.68]">
            {isRussian ? 'Скоро' : 'Soon'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {featurePills.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.78)] px-3 py-1.5 text-[0.76rem] font-medium text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.92),rgba(22,30,43,0.90))] dark:text-white/[0.62] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.08rem] border border-black/[0.045] bg-[rgba(247,249,252,0.8)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-text-muted dark:text-white/[0.42]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[1.02rem] font-semibold tracking-tight text-text-primary dark:text-white">{item.value}</p>
              <p className="mt-1.5 text-[0.7rem] leading-snug text-text-secondary dark:text-white/[0.56]">{item.note}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="space-y-3.5 border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">
              {isRussian ? 'Активные комнаты' : 'Active rooms'}
            </p>
            <p className="mt-1 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{activeRoomsDescription}</p>
          </div>
          <span className="inline-flex min-w-[1.45rem] items-center justify-center rounded-full bg-black/[0.03] px-2 py-1 text-[0.66rem] font-semibold text-text-muted dark:bg-white/[0.05] dark:text-white/[0.42]">
            {mockData.rooms.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {mockData.rooms.map((room) => {
            const correctedCopy = getRoomCopy(room.id);
            const roomName = isRussian ? correctedCopy?.nameRu ?? room.nameRu : room.name;
            const roomEvent = isRussian ? correctedCopy?.eventTitleRu ?? room.eventTitleRu : room.eventTitle;
            const roomStatus = isRussian ? correctedCopy?.statusRu ?? 'Скоро' : correctedCopy?.statusEn ?? 'Soon';

            return (
              <div
                key={room.id}
                className="rounded-[1.18rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] px-4 py-3.75 shadow-[0_12px_26px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(27,35,49,0.94),rgba(18,25,38,0.90))] dark:shadow-[0_14px_24px_rgba(2,6,23,0.14)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))] dark:bg-[rgba(var(--accent-blue),0.12)]">
                      <GroupIcon />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-[0.99rem] font-semibold text-text-primary dark:text-white/[0.94]">{roomName}</p>
                        <span className="rounded-full border border-black/[0.04] bg-[rgba(247,249,252,0.84)] px-2.5 py-1 text-[0.67rem] font-semibold text-text-secondary dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white/[0.62]">
                          {roomStatus}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.88rem] text-text-secondary dark:text-white/[0.56]">{roomEvent}</p>
                      <p className="mt-2 text-[12px] text-text-muted dark:text-white/[0.44]">
                        {room.members} {isRussian ? 'участников' : 'members'}
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 shrink-0 text-slate-300/75 dark:text-white/[0.18]">
                    <ChevronIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/live"
          className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-[1.08rem] border border-black/[0.05] bg-white px-4 py-3 text-[0.92rem] font-semibold text-text-primary shadow-[0_12px_22px_rgba(15,23,42,0.07)] transition hover:bg-white/96 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:text-white dark:shadow-[0_10px_18px_rgba(2,6,23,0.12)] dark:hover:bg-[linear-gradient(180deg,rgba(39,48,63,0.94),rgba(25,34,47,0.92))]"
        >
          {openLiveLabel}
        </Link>
      </SectionCard>
    </MainPageLayout>
  );
}
