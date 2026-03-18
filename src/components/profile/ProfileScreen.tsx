'use client';

import Link from 'next/link';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { liveEvents } from '@/data/liveEvents';
import { mockData } from '@/data/mock';
import { isSportEventLive } from '@/data/sportEvents';

function formatHistoryTimestamp(iso: string, language: 'ru' | 'en') {
  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(new Date(iso));
}

export function ProfileScreen() {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const profile = mockData.profile;
  const supportHistory = mockData.profileSupportHistory;
  const displayName = language === 'ru' ? profile.displayNameRu : profile.displayName;
  const currentLiveEvent = liveEvents.find((event) => event.id === profile.currentLiveEventId) ?? liveEvents[0];
  const selectedParticipant =
    currentLiveEvent?.participants.find((participant) => participant.id === profile.selectedParticipantId) ?? null;
  const selectedSide = selectedParticipant
    ? language === 'ru'
      ? selectedParticipant.teamLabelRu
      : selectedParticipant.teamLabel
    : language === 'ru'
      ? profile.selectedParticipantRu
      : profile.selectedParticipant;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const topThreeEntry = mockData.leaderboard[mockData.leaderboard.length - 1];
  const topThreeThreshold = topThreeEntry ? topThreeEntry.points : profile.points;
  const heroBadgeText = `${profile.points} ${t('points')}`;
  const heroStreakText = `${profile.streak} ${t('streak')}`;
  const avatarLetter = displayName.slice(0, 1).toUpperCase();

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader eyebrow={t('appName')} title={t('profileTitle')} description={t('profileHint')} />

      <SectionCard className="overflow-hidden border border-white/35 bg-white/60 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white/75 text-[1.3rem] font-semibold text-text-primary shadow-[0_8px_20px_rgba(15,23,42,0.08)] dark:bg-white/10 dark:text-white dark:shadow-none">
            {avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('you')}</p>
                <h2 className="mt-1.5 truncate text-[1.7rem] font-semibold tracking-tight text-text-primary">
                  {displayName}
                </h2>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full border border-white/45 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary dark:border-white/8 dark:bg-white/8">#{profile.currentRank}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
              <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 font-medium dark:bg-white/8">{heroBadgeText}</span>
              <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 font-medium dark:bg-white/8">{heroStreakText}</span>
            </div>
          </div>
        </div>
      </SectionCard>

      {currentLiveEvent ? (
        <SectionCard className="border border-white/35 bg-white/60 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('liveEvent')}</p>
              <h3 className="mt-2 text-[1.1rem] font-semibold text-text-primary">
                {language === 'ru' ? currentLiveEvent.headlineRu : currentLiveEvent.headline}
              </h3>
              <p className="mt-2 text-sm text-text-secondary/90">
                {language === 'ru' ? currentLiveEvent.categoryLabelRu : currentLiveEvent.categoryLabel}
                {' · '}
                {language === 'ru' ? currentLiveEvent.stageLabelRu : currentLiveEvent.stageLabel}
                {currentLiveEvent.timerLabel ? ` · ${currentLiveEvent.timerLabel}` : ''}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-accent-orange/20 bg-accent-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">{t('liveStatus')}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[1.1rem] border border-white/45 bg-white/60 px-3 py-3 dark:border-white/8 dark:bg-white/6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('selectedTeam')}</p>
              <p className="mt-2 text-sm font-medium text-text-primary">{selectedSide}</p>
            </div>
            <div className="rounded-[1.1rem] border border-white/45 bg-white/60 px-3 py-3 dark:border-white/8 dark:bg-white/6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('supportSummary')}</p>
              <p className="mt-2 text-sm font-medium text-text-primary">${profile.lastSupportAmount}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-text-secondary/90">
            <span>{language === 'ru' ? currentLiveEvent.venueRu : currentLiveEvent.venue}</span>
            <Link href="/live" className="app-pill">
              {t('openLiveEvent')}
            </Link>
          </div>
        </SectionCard>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <SectionCard className="border border-white/35 bg-white/55 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('balanceLabel')}</p>
          <p className="mt-3 text-[1.5rem] font-semibold tracking-tight text-text-primary">${profile.walletBalance}</p>
        </SectionCard>
        <SectionCard className="border border-white/35 bg-white/55 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('totalSupport')}</p>
          <p className="mt-3 text-[1.5rem] font-semibold tracking-tight text-text-primary">${profile.totalSupport}</p>
        </SectionCard>
        <SectionCard className="border border-white/35 bg-white/55 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('xp')}</p>
          <p className="mt-3 text-[1.5rem] font-semibold tracking-tight text-text-primary">{profile.xp}</p>
        </SectionCard>
        <SectionCard className="border border-white/35 bg-white/55 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('streak')}</p>
          <p className="mt-3 text-[1.5rem] font-semibold tracking-tight text-text-primary">{profile.streak}</p>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/favorites" className="block">
          <SectionCard className="h-full px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('favoritesTitle')}</p>
            <p className="mt-3 text-[1.6rem] font-semibold tracking-tight text-text-primary">{favorites.length}</p>
            <p className="mt-1 text-sm text-text-secondary">{t('allEvents')}</p>
          </SectionCard>
        </Link>
        <Link href="/notifications" className="block">
          <SectionCard className="h-full px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('notificationsTitle')}</p>
            <p className="mt-3 text-[1.6rem] font-semibold tracking-tight text-text-primary">{liveFavoriteCount}</p>
            <p className="mt-1 text-sm text-text-secondary">{t('liveNow')}</p>
          </SectionCard>
        </Link>
      </div>

      <SectionCard className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('recentActivity')}</p>
            <h3 className="mt-2 text-lg font-semibold text-text-primary">{t('supportSummary')}</h3>
          </div>
          <span className="app-pill">{supportHistory.length}</span>
        </div>

        <div className="mt-4 space-y-3">
          {supportHistory.length ? (
            supportHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-[18px] border border-border-subtle bg-surface-subtle px-3 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
                      {language === 'ru' ? item.participantRu : item.participant}
                    </p>
                    <p className="mt-1 truncate text-sm text-text-secondary">
                      {language === 'ru' ? item.eventTitleRu : item.eventTitle}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-accent">${item.amount}</p>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  {formatHistoryTimestamp(item.createdAt, language)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">{t('comingSoon')}</p>
          )}
        </div>
      </SectionCard>

      <SectionCard className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardTitle')}</p>
            <h3 className="mt-2 text-lg font-semibold text-text-primary">
              #{profile.currentRank} · {profile.points} {t('points')}
            </h3>
          </div>
          <Link href="/leaderboard" className="app-pill">
            {t('openLeaderboard')}
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-border-subtle bg-surface-subtle px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('currentRank')}</p>
            <p className="mt-2 text-base font-semibold text-text-primary">#{profile.currentRank}</p>
          </div>
          <div className="rounded-[18px] border border-border-subtle bg-surface-subtle px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('topThree')}</p>
            <p className="mt-2 text-base font-semibold text-text-primary">{topThreeThreshold} {t('points')}</p>
          </div>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
