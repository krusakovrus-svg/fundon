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
import { getStoredProfileName, setStoredProfileName } from '@/lib/profileName';

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

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9rem] w-[0.9rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m4 20 4.2-1 9.1-9.1a1.8 1.8 0 0 0 0-2.6l-.6-.6a1.8 1.8 0 0 0-2.6 0L5 15.8 4 20Z" />
      <path d="m12.8 7.9 3.3 3.3" />
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

const LEGACY_BROKEN_VIEWER_NAME = '\u0420\u2019\u0421\u2039';

function getRussianProfileName(value: string) {
  return value === LEGACY_BROKEN_VIEWER_NAME ? 'Вы' : value;
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
  const [storedProfileName, setStoredProfileNameState] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const isRussian = language === 'ru';
  const defaultDisplayName = isRussian ? getRussianProfileName(profile.displayNameRu) : profile.displayName;
  const displayName = storedProfileName?.trim() || defaultDisplayName;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const thirdPlacePoints = mockData.leaderboard[mockData.leaderboard.length - 1]?.points ?? profile.points;
  const pointsToTopThree = Math.max(thirdPlacePoints - profile.points, 0);
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const favoriteCount = favorites.length;

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

  const editNameLabel = isRussian ? 'Изменить имя' : 'Edit name';
  const namePlaceholder = isRussian ? 'Введите имя пользователя' : 'Enter your display name';
  const saveNameLabel = isRussian ? 'Сохранить' : 'Save';
  const cancelNameLabel = isRussian ? 'Отмена' : 'Cancel';

  const leaderboardCtaLabel = isRussian ? 'Рейтинг' : 'Leaderboard';
  const favoritesSubtitle =
    favoriteCount > 0 ? labels.savedEvents : isRussian ? 'Пока нет сохранённых событий' : 'No saved events yet';
  const notificationsSubtitle =
    liveFavoriteCount > 0 ? labels.liveNow : isRussian ? 'Пока нет live-уведомлений' : 'No live alerts yet';

  useEffect(() => {
    const storedAvatar = getStoredProfileAvatar();
    if (storedAvatar) {
      setAvatarImage(storedAvatar);
    }

    const storedName = getStoredProfileName();
    if (storedName) {
      setStoredProfileNameState(storedName);
      setNameDraft(storedName);
      return;
    }

    setNameDraft(defaultDisplayName);
  }, [defaultDisplayName]);

  useEffect(() => {
    if (!isEditingName) {
      setNameDraft(displayName);
    }
  }, [displayName, isEditingName]);

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

  const handleStartNameEdit = () => {
    setNameDraft(displayName);
    setIsEditingName(true);
  };

  const handleCancelNameEdit = () => {
    setNameDraft(displayName);
    setIsEditingName(false);
  };

  const handleSaveName = () => {
    const normalizedName = nameDraft.trim();
    if (!normalizedName) {
      return;
    }

    setStoredProfileName(normalizedName);
    setStoredProfileNameState(normalizedName);
    setIsEditingName(false);
  };

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader
        title={t('profileTitle')}
        actions={
          <Link
            href="/notifications"
            aria-label={labels.goToNotifications}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.05rem] border border-black/[0.045] bg-white/78 text-text-primary shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:bg-white dark:bg-white/8 dark:text-white dark:hover:bg-white/12 dark:shadow-none"
          >
            <BellIcon />
          </Link>
        }
      />

      <SectionCard className="border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <input ref={avatarInputRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-[1.55rem] border border-black/[0.05] bg-white text-[1.95rem] font-semibold text-text-primary shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-none">
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
              className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/90 bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] text-white shadow-[0_12px_24px_rgba(255,116,55,0.18)] transition hover:brightness-105"
            >
              <CameraIcon />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('you')}</p>
                <h2 className="mt-1.5 truncate text-[1.7rem] font-semibold tracking-tight text-text-primary">{displayName}</h2>
                <button
                  type="button"
                  onClick={handleStartNameEdit}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition hover:bg-white hover:text-text-primary dark:bg-white/8 dark:text-text-secondary dark:hover:bg-white/12 dark:hover:text-white"
                >
                  <PencilIcon />
                  {editNameLabel}
                </button>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(var(--accent-orange),0.12)] bg-[rgba(var(--accent-orange),0.08)] px-3 py-1.5 text-[11px] font-semibold text-text-secondary">
                <StarIcon />
                {labels.activeSupporter}
              </span>
            </div>

            {isEditingName ? (
              <div className="mt-3 rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.78)] p-3 dark:bg-white/6">
                <input
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  placeholder={namePlaceholder}
                  maxLength={32}
                  className="w-full rounded-[0.95rem] border border-border-subtle bg-white/84 px-3.5 py-2.5 text-[0.95rem] text-text-primary outline-none transition placeholder:text-text-secondary focus:border-[rgba(var(--accent-orange),0.35)] dark:bg-white/8 dark:text-white"
                />
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="inline-flex min-h-[2.6rem] flex-1 items-center justify-center rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-3 py-2 text-[0.9rem] font-semibold text-white shadow-[0_14px_24px_rgba(255,116,55,0.18)] transition hover:brightness-105"
                  >
                    {saveNameLabel}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelNameEdit}
                    className="inline-flex min-h-[2.6rem] flex-1 items-center justify-center rounded-[0.95rem] border border-border-subtle bg-white/72 px-3 py-2 text-[0.9rem] font-semibold text-text-primary transition hover:bg-white dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                  >
                    {cancelNameLabel}
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.88)] px-3 py-3 text-center dark:bg-white/6">
                <p className="text-[11px] font-medium text-text-muted">{labels.rank}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">#{profile.currentRank}</p>
              </div>
              <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.88)] px-3 py-3 text-center dark:bg-white/6">
                <p className="text-[11px] font-medium text-text-muted">{labels.points}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">{profile.points}</p>
              </div>
              <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.88)] px-3 py-3 text-center dark:bg-white/6">
                <p className="text-[11px] font-medium text-text-muted">{labels.streak}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary">{profile.streak}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.88] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="rounded-[1.2rem] border border-black/[0.04] bg-[rgba(247,249,252,0.74)] px-4 py-4 dark:bg-white/6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('balanceLabel')}</p>
            <h3 className="mt-3 text-center text-[2.35rem] font-semibold tracking-tight text-text-primary">{formatMoney(profile.walletBalance)}</h3>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_16px_26px_rgba(255,116,55,0.18)] transition hover:brightness-105"
            >
              {labels.topUp}
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-[1.05rem] border border-black/[0.05] bg-white/72 px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white dark:bg-white/7 dark:text-white dark:hover:bg-white/10"
            >
              {labels.withdraw}
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-2 py-2 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3 py-3 text-center dark:bg-white/6">
            <p className="text-[11px] font-medium text-text-muted">{labels.support}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary">{formatMoney(profile.totalSupport)}</p>
          </div>
          <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3 py-3 text-center dark:bg-white/6">
            <p className="text-[11px] font-medium text-text-muted">{labels.xp}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary">{profile.xp}</p>
          </div>
          <div className="rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] px-3 py-3 text-center dark:bg-white/6">
            <p className="text-[11px] font-medium text-text-muted">{labels.streak}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary">{profile.streak}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('recentActivity')}</p>
          </div>
          <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary">
            {supportHistory.length}
          </span>
        </div>

        <div className="mt-4 divide-y divide-black/[0.045] overflow-hidden rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.74)] dark:bg-white/5">
          {supportHistory.length ? (
            supportHistory.map((item) => {
              const correctedRussianCopy = getRussianHistoryCopy(item.id, item.eventTitleRu, item.participantRu);
              const participant = isRussian ? correctedRussianCopy.participantRu : item.participant;
              const eventTitle = isRussian ? correctedRussianCopy.eventTitleRu : item.eventTitle;

              return (
                <div key={item.id} className="flex items-start justify-between gap-3 px-3.5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-text-muted">{eventTitle}</p>
                    <p className="mt-1.5 truncate text-[0.95rem] font-semibold text-text-primary">
                      {labels.activityAction}: {participant}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[0.95rem] font-semibold text-text-primary">{formatMoney(item.amount)}</p>
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

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardTitle')}</p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.86)] px-3 py-1.5 text-[0.74rem] font-semibold text-text-secondary transition hover:bg-white hover:text-text-primary"
          >
            {leaderboardCtaLabel}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:bg-white/5">
            <p className="text-[11px] font-medium text-text-muted">{t('currentRank')}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary">#{profile.currentRank}</p>
          </div>
          <div className="rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3.5 py-3.5 dark:bg-white/5">
            <p className="text-[11px] font-medium text-text-muted">{labels.toTopThree}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary">{pointsToTopThree}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border border-black/[0.045] bg-white/[0.82] px-4 py-2 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <Link href="/favorites" className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))]">
              <HeartIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.favorites}</p>
              <p className="text-[12px] text-text-muted">{favoritesSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            {favoriteCount > 0 ? (
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(247,249,252,0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/8 dark:text-white">
                {favoriteCount}
              </span>
            ) : null}
            <ChevronIcon />
          </div>
        </Link>

        <div className="border-t border-black/[0.045]" />

        <Link href="/notifications" className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))]">
              <BellIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.notifications}</p>
              <p className="text-[12px] text-text-muted">{notificationsSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            {liveFavoriteCount > 0 ? (
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(247,249,252,0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/8 dark:text-white">
                {liveFavoriteCount}
              </span>
            ) : null}
            <ChevronIcon />
          </div>
        </Link>
      </SectionCard>
    </MainPageLayout>
  );
}
