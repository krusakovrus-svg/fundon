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
import { formatCurrency } from '@/lib/format';
import { getStoredProfileAvatar, setStoredProfileAvatar } from '@/lib/profileAvatar';
import { getStoredProfileName, setStoredProfileName } from '@/lib/profileName';
import { cn } from '@/lib/utils';

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

  const balanceHint = isRussian ? 'Доступно для поддержки и вывода' : 'Available for support and withdrawals';
  const sectionCardClass =
    'border border-black/[0.045] bg-white/[0.86] shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(22,29,43,0.94),rgba(14,20,31,0.88))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]';
  const innerPanelClass =
    'rounded-[1.15rem] border border-black/[0.04] bg-[rgba(247,249,252,0.82)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(35,43,57,0.95),rgba(24,31,44,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]';
  const statTileClass =
    'rounded-[1.05rem] border border-black/[0.04] bg-[rgba(247,249,252,0.88)] px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.045] dark:bg-[linear-gradient(180deg,rgba(33,41,55,0.96),rgba(21,29,41,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]';

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
    <MainPageLayout className="space-y-[0.95rem]">
      <PageHeader
        title={t('profileTitle')}
        description={t('profileHint')}
        actions={
          <Link
            href="/notifications"
            aria-label={labels.goToNotifications}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-black/[0.045] bg-[rgba(247,249,252,0.72)] text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition hover:bg-white dark:border-white/[0.07] dark:bg-white/[0.045] dark:text-white/[0.9] dark:hover:bg-white/[0.07] dark:shadow-none"
          >
            <BellIcon />
          </Link>
        }
      />

      <SectionCard className={cn(sectionCardClass, 'px-4 py-4')}>
        <input ref={avatarInputRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-[1.55rem] border border-black/[0.05] bg-white text-[1.95rem] font-semibold text-text-primary shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-white/[0.07] dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,124,65,0.08),rgba(74,144,226,0.07))] dark:text-white dark:shadow-[0_14px_26px_rgba(2,6,23,0.18)]">
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
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-1.5 text-[12px] font-medium text-text-secondary transition hover:bg-white hover:text-text-primary dark:border-white/[0.07] dark:bg-white/[0.045] dark:text-white/[0.7] dark:hover:bg-white/[0.07] dark:hover:text-white"
                >
                  <PencilIcon />
                  {editNameLabel}
                </button>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.035] bg-[rgba(247,249,252,0.62)] px-2.5 py-1 text-[10px] font-medium tracking-[0.01em] text-text-secondary/88 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white/[0.54]">
                <StarIcon />
                {labels.activeSupporter}
              </span>
            </div>

            {isEditingName ? (
              <div className="mt-3 rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.78)] p-3 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))]">
                <input
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  placeholder={namePlaceholder}
                  maxLength={32}
                  className="w-full rounded-[0.95rem] border border-border-subtle bg-white/84 px-3.5 py-2.5 text-[0.95rem] text-text-primary outline-none transition placeholder:text-text-secondary focus:border-[rgba(var(--accent-orange),0.35)] dark:border-white/[0.06] dark:bg-white/[0.055] dark:text-white"
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
                    className="inline-flex min-h-[2.6rem] flex-1 items-center justify-center rounded-[0.95rem] border border-border-subtle bg-white/72 px-3 py-2 text-[0.9rem] font-semibold text-text-primary transition hover:bg-white dark:border-white/[0.06] dark:bg-white/[0.055] dark:text-white dark:hover:bg-white/[0.08]"
                  >
                    {cancelNameLabel}
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className={statTileClass}>
                <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.rank}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary dark:text-white">#{profile.currentRank}</p>
              </div>
              <div className={statTileClass}>
                <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.points}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary dark:text-white">{profile.points}</p>
              </div>
              <div className={statTileClass}>
                <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.streak}</p>
                <p className="mt-1.5 text-base font-semibold text-text-primary dark:text-white">{profile.streak}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'bg-white/[0.88] px-4 py-4')}>
        <div className={cn(innerPanelClass, 'rounded-[1.2rem] px-4 py-4 dark:border-[rgba(255,124,65,0.07)] dark:bg-[linear-gradient(180deg,rgba(37,45,59,0.96),rgba(24,32,45,0.92))]')}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{t('balanceLabel')}</p>
            <h3 className="mt-3 text-center text-[2.35rem] font-semibold tracking-tight text-text-primary dark:text-white">{formatCurrency(profile.walletBalance, language)}</h3>
            <p className="mt-1.5 text-center text-[0.82rem] text-text-secondary/82 dark:text-white/[0.58]">{balanceHint}</p>
          </div>

          <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-2.5">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_16px_26px_rgba(255,116,55,0.18)] transition hover:brightness-105"
            >
              {labels.topUp}
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-[1.05rem] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,249,252,0.74))] px-4 py-3 text-[0.92rem] font-semibold text-text-primary shadow-[0_10px_18px_rgba(15,23,42,0.05)] transition hover:bg-white dark:border-white/[0.055] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.032))] dark:text-white/[0.9] dark:shadow-none dark:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))]"
            >
              {labels.withdraw}
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'bg-white/[0.82] px-2 py-2')}>
        <div className="grid grid-cols-3 gap-2">
          <div className={statTileClass}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.support}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary dark:text-white">{formatCurrency(profile.totalSupport, language)}</p>
          </div>
          <div className={statTileClass}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.xp}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary dark:text-white">{profile.xp}</p>
          </div>
          <div className={statTileClass}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.streak}</p>
            <p className="mt-2 text-[1.22rem] font-semibold tracking-tight text-text-primary dark:text-white">{profile.streak}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        className={cn(
          sectionCardClass,
          'bg-white/[0.82] px-4 py-4 dark:border-white/[0.045] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.95),rgba(13,18,29,0.90))]'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{t('recentActivity')}</p>
          </div>
          <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full bg-[rgba(247,249,252,0.9)] px-2 py-1 text-[0.68rem] font-semibold text-text-secondary dark:bg-white/[0.04] dark:text-white/[0.62]">
            {supportHistory.length}
          </span>
        </div>

        <div className="mt-4 divide-y divide-black/[0.045] overflow-hidden rounded-[1.15rem] border border-black/[0.045] bg-[rgba(247,249,252,0.74)] dark:border-white/[0.05] dark:divide-white/[0.045] dark:bg-[linear-gradient(180deg,rgba(30,38,52,0.96),rgba(21,28,40,0.94))]">
          {supportHistory.length ? (
            supportHistory.map((item) => {
              const correctedRussianCopy = getRussianHistoryCopy(item.id, item.eventTitleRu, item.participantRu);
              const participant = isRussian ? correctedRussianCopy.participantRu : item.participant;
              const eventTitle = isRussian ? correctedRussianCopy.eventTitleRu : item.eventTitle;

              return (
                <div key={item.id} className="flex items-start justify-between gap-3 px-3.5 py-3.25">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-text-muted dark:text-white/[0.58]">{eventTitle}</p>
                    <p className="mt-1.5 truncate text-[0.95rem] font-semibold text-text-primary dark:text-white/[0.94]">
                      {labels.activityAction}: {participant}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[0.95rem] font-semibold text-text-primary dark:text-white/[0.94]">{formatCurrency(item.amount, language)}</p>
                    <p className="mt-1 text-[12px] text-text-muted dark:text-white/[0.54]">{formatTimestamp(item.createdAt, language)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-3.5 py-4 text-sm text-text-secondary">{t('comingSoon')}</div>
          )}
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'bg-white/[0.82] px-4 py-4')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardTitle')}</p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.01em] text-text-secondary transition hover:bg-white hover:text-text-primary dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-white/[0.66] dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            {leaderboardCtaLabel}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={cn(innerPanelClass, 'rounded-[1.15rem] px-3.5 py-3.5')}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{t('currentRank')}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary dark:text-white">#{profile.currentRank}</p>
            <p className="mt-1 text-[0.72rem] leading-5 text-text-secondary dark:text-white/[0.56]">{isRussian ? '\u0432 \u0442\u0430\u0431\u043b\u0438\u0446\u0435 \u0441\u0435\u0439\u0447\u0430\u0441' : 'in the table now'}</p>
          </div>
          <div className={cn(innerPanelClass, 'rounded-[1.15rem] px-3.5 py-3.5')}>
            <p className="text-[11px] font-medium text-text-muted dark:text-white/[0.5]">{labels.toTopThree}</p>
            <p className="mt-2 text-[1.45rem] font-semibold tracking-tight text-text-primary dark:text-white">{pointsToTopThree}</p>
            <p className="mt-1 text-[0.72rem] leading-5 text-text-secondary dark:text-white/[0.56]">{isRussian ? '\u043e\u0447\u043a\u043e\u0432 \u0434\u043e \u0440\u044b\u0432\u043a\u0430' : 'points to the next push'}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'bg-white/[0.82] px-4 py-2.5')}>
        <Link
          href="/favorites"
          className="flex items-center justify-between gap-3 rounded-[1rem] py-3.5 transition hover:bg-black/[0.018] dark:hover:bg-white/[0.028]"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-orange),0.08)] text-[rgb(var(--accent-orange))]">
              <HeartIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.favorites}</p>
              <p className="text-[12px] text-text-muted dark:text-white/[0.52]">{favoritesSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted dark:text-white/[0.34]">
            {favoriteCount > 0 ? (
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(247,249,252,0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/[0.08] dark:text-white">
                {favoriteCount}
              </span>
            ) : null}
            <ChevronIcon />
          </div>
        </Link>

        <div className="mx-0.5 border-t border-black/[0.045] dark:border-white/[0.055]" />

        <Link
          href="/notifications"
          className="flex items-center justify-between gap-3 rounded-[1rem] py-3.5 transition hover:bg-black/[0.018] dark:hover:bg-white/[0.028]"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(var(--accent-blue),0.08)] text-[rgb(var(--accent-blue))]">
              <BellIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{labels.notifications}</p>
              <p className="text-[12px] text-text-muted dark:text-white/[0.52]">{notificationsSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-muted dark:text-white/[0.34]">
            {liveFavoriteCount > 0 ? (
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[rgba(247,249,252,0.92)] px-2.5 text-[12px] font-semibold leading-none text-text-primary dark:bg-white/[0.08] dark:text-white">
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
