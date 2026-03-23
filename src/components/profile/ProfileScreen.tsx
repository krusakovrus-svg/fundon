'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { mockData } from '@/data/mock';
import { isSportEventLive } from '@/data/sportEvents';
import { getStoredProfileAvatar, setStoredProfileAvatar } from '@/lib/profileAvatar';

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 17h5l-1.4-1.6a2.2 2.2 0 0 1-.6-1.5V11a6 6 0 1 0-12 0v2.9c0 .6-.2 1.1-.6 1.5L4 17h5" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 6.5 9.4 5h5.2L16 6.5h1.9A2.1 2.1 0 0 1 20 8.6v7.8a2.1 2.1 0 0 1-2.1 2.1H6.1A2.1 2.1 0 0 1 4 16.4V8.6a2.1 2.1 0 0 1 2.1-2.1H8Z" />
      <circle cx="12" cy="12.5" r="3.3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m7 4 6 6-6 6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="currentColor">
      <path d="m12 2.8 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.8 1-6.1L3.2 9.2l6.1-.9L12 2.8Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="currentColor">
      <path d="M12 20.4 4.9 13.8A4.8 4.8 0 0 1 12 7.4a4.8 4.8 0 0 1 7.1 6.4L12 20.4Z" />
    </svg>
  );
}

function formatMoney(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

function formatTimestamp(iso: string, language: 'ru' | 'en') {
  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(new Date(iso));
}

function getRussianProfileName(value: string) {
  return value === 'Р’С‹' ? 'Вы' : value;
}

function getRussianHistoryCopy(itemId: string, eventTitleRu: string, participantRu: string) {
  const corrected: Record<string, { eventTitleRu: string; participantRu: string }> = {
    profile_support_001: {
      eventTitleRu: 'Вечер боя в Лондоне',
      participantRu: 'Мерфи'
    },
    profile_support_002: {
      eventTitleRu: 'UPVL. Лига Наций',
      participantRu: 'Бельгия (Pro)'
    },
    profile_support_004: {
      eventTitleRu: 'Вечер боя в Лондоне',
      participantRu: 'Мерфи'
    },
    profile_support_005: {
      eventTitleRu: 'UPVL. Лига Наций',
      participantRu: 'Франция (Pro)'
    }
  };

  return corrected[itemId] ?? { eventTitleRu, participantRu };
}

export function ProfileScreen() {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const profile = mockData.profile;
  const supportHistory = mockData.profileSupportHistory;
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const isRussian = language === 'ru';
  const displayName = isRussian ? getRussianProfileName(profile.displayNameRu) : profile.displayName;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const thirdPlacePoints = mockData.leaderboard[mockData.leaderboard.length - 1]?.points ?? profile.points;
  const pointsToTopThree = Math.max(thirdPlacePoints - profile.points, 0);
  const avatarLetter = displayName.slice(0, 1).toUpperCase();

  const labels = {
    activeSupporter: isRussian ? 'Активный фанат' : 'Active fan',
    rank: isRussian ? 'Место' : 'Rank',
    points: isRussian ? 'Очков' : 'Points',
    streak: isRussian ? 'Серия' : 'Streak',
    support: isRussian ? 'Поддержка' : 'Support',
    xp: isRussian ? 'Очки опыта' : 'XP',
    topUp: isRussian ? 'Пополнить' : 'Top up',
    withdraw: isRussian ? 'Вывести' : 'Withdraw',
    activityAction: isRussian ? 'Поддержка' : 'Supported',
    toTopThree: isRussian ? 'До топ-3' : 'To top 3',
    favorites: isRussian ? 'Избранное' : 'Favorites',
    notifications: isRussian ? 'Уведомления' : 'Notifications',
    savedEvents: isRussian ? 'Сохранённые события' : 'Saved events',
    liveNow: isRussian ? 'Сейчас в эфире' : 'Live now',
    avatarPicker: isRussian ? 'Выбрать аватар' : 'Choose avatar',
    goToNotifications: isRussian ? 'Открыть уведомления' : 'Open notifications'
  };

  useEffect(() => {
    const storedAvatar = getStoredProfileAvatar();
    if (storedAvatar) {
      setAvatarImage(storedAvatar);
    }
  }, []);

  const handleAvatarButtonClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarImage(reader.result);
        setStoredProfileAvatar(reader.result);
      }
    };
    reader.readAsDataURL(selectedFile);
    event.target.value = '';
  };

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader
        title={t('profileTitle')}
        actions={
          <Link
            href="/notifications"
            aria-label={labels.goToNotifications}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.05rem] border border-border-subtle bg-white/70 text-text-primary transition hover:bg-white/90 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
          >
            <BellIcon />
          </Link>
        }
      />

      <SectionCard className="border border-white/35 bg-white/65 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <input ref={avatarInputRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/75 bg-white text-[1.95rem] font-semibold text-text-primary shadow-[0_14px_34px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-none">
              {avatarImage ? (
                <img src={avatarImage} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                avatarLetter
              )}
            </div>
            <button
              type="button"
              onClick={handleAvatarButtonClick}
              aria-label={labels.avatarPicker}
              title={labels.avatarPicker}
              className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/90 bg-[rgb(var(--accent-orange))] text-white shadow-[0_12px_24px_rgba(255,116,55,0.24)] transition hover:brightness-105"
            >
              <CameraIcon />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('you')}</p>
                <h2 className="mt-1.5 truncate text-[1.7rem] font-semibold tracking-tight text-text-primary">{displayName}</h2>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(var(--accent-orange),0.18)] bg-[rgba(var(--accent-orange),0.10)] px-3 py-1.5 text-[11px] font-semibold text-text-primary">
                <StarIcon />
                {labels.activeSupporter}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-0 overflow-hidden rounded-[1.15rem] border border-border-subtle bg-[rgba(var(--surface-muted),0.78)] dark:bg-white/6">
              <div className="px-3 py-3 text-center">
                <p className="text-[11px] font-medium text-text-muted">{labels.rank}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">#{profile.currentRank}</p>
              </div>
              <div className="border-x border-border-subtle px-3 py-3 text-center">
                <p className="text-[11px] font-medium text-text-muted">{labels.points}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">{profile.points}</p>
              </div>
              <div className="px-3 py-3 text-center">
                <p className="text-[11px] font-medium text-text-muted">{labels.streak}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">{profile.streak}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-white/35 bg-white/68 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('balanceLabel')}</p>
            <h3 className="mt-2 text-[2rem] font-semibold tracking-tight text-text-primary">{formatMoney(profile.walletBalance)}</h3>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_28px_rgba(255,116,55,0.22)] transition hover:brightness-105"
          >
            {labels.topUp}
          </button>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-[1.05rem] border border-border-subtle bg-[rgba(var(--surface-muted),0.82)] px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-[rgba(var(--surface-muted),0.95)] dark:bg-white/7 dark:text-white dark:hover:bg-white/10"
          >
            {labels.withdraw}
          </button>
        </div>
      </SectionCard>

      <SectionCard className="border border-white/35 bg-white/62 px-2 py-2 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="grid grid-cols-3 overflow-hidden rounded-[1.1rem]">
          <div className="px-3 py-3 text-center">
            <p className="text-[11px] font-medium text-text-muted">{labels.support}</p>
            <p className="mt-2 text-[1.3rem] font-semibold tracking-tight text-text-primary">{formatMoney(profile.totalSupport)}</p>
          </div>
          <div className="border-x border-border-subtle px-3 py-3 text-center">
            <p className="text-[11px] font-medium text-text-muted">{labels.xp}</p>
            <p className="mt-2 text-[1.3rem] font-semibold tracking-tight text-text-primary">{profile.xp}</p>
          </div>
          <div className="px-3 py-3 text-center">
            <p className="text-[11px] font-medium text-text-muted">{labels.streak}</p>
            <p className="mt-2 text-[1.3rem] font-semibold tracking-tight text-text-primary">{profile.streak}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-white/35 bg-white/62 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('recentActivity')}</p>
          </div>
          <span className="app-pill">{supportHistory.length}</span>
        </div>

        <div className="mt-4 divide-y divide-border-subtle overflow-hidden rounded-[1.15rem] border border-border-subtle bg-[rgba(var(--surface-muted),0.82)] dark:bg-white/5">
          {supportHistory.length ? (
            supportHistory.map((item) => {
              const correctedRussianCopy = getRussianHistoryCopy(item.id, item.eventTitleRu, item.participantRu);
              const participant = isRussian ? correctedRussianCopy.participantRu : item.participant;
              const eventTitle = isRussian ? correctedRussianCopy.eventTitleRu : item.eventTitle;

              return (
                <div key={item.id} className="flex items-start justify-between gap-3 px-3.5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-text-muted">{eventTitle}</p>
                    <p className="mt-1.5 truncate text-sm font-semibold text-text-primary">
                      {labels.activityAction}: {participant}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-text-primary">{formatMoney(item.amount)}</p>
                    <p className="mt-1 text-[12px] text-text-muted">{formatTimestamp(item.createdAt, language)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-3.5 py-4 text-sm text-text-secondary">{t('comingSoon')}</div>
          )}
        </div>
      </SectionCard>

      <SectionCard className="border border-white/35 bg-white/62 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardTitle')}</p>
          </div>
          <Link href="/leaderboard" className="app-pill">
            {t('openLeaderboard')}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.15rem] border border-border-subtle bg-[rgba(var(--surface-muted),0.82)] px-3.5 py-3.5 dark:bg-white/5">
            <p className="text-[11px] font-medium text-text-muted">{t('currentRank')}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary">#{profile.currentRank}</p>
          </div>
          <div className="rounded-[1.15rem] border border-border-subtle bg-[rgba(var(--surface-muted),0.82)] px-3.5 py-3.5 dark:bg-white/5">
            <p className="text-[11px] font-medium text-text-muted">{labels.toTopThree}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary">{pointsToTopThree}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-white/35 bg-white/62 px-4 py-2 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <Link href="/favorites" className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-orange),0.10)] text-[rgb(var(--accent-orange))]">
              <HeartIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.favorites}</p>
              <p className="text-[12px] text-text-muted">{labels.savedEvents}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(var(--surface-muted),0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/8 dark:text-white">
              {favorites.length}
            </span>
            <ChevronIcon />
          </div>
        </Link>

        <div className="border-t border-border-subtle" />

        <Link href="/notifications" className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-blue),0.10)] text-[rgb(var(--accent-blue))]">
              <BellIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.notifications}</p>
              <p className="text-[12px] text-text-muted">{labels.liveNow}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(var(--surface-muted),0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/8 dark:text-white">
              {liveFavoriteCount}
            </span>
            <ChevronIcon />
          </div>
        </Link>
      </SectionCard>
    </MainPageLayout>
  );
}
