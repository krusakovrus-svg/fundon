'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { liveEvents } from '@/data/liveEvents';
import { mockData } from '@/data/mock';
import { readSupportPreferences } from '@/lib/supportPreferences';
import type { LeaderboardEntry, SupportAmount, UserProfile } from '@/types';
import { LeaderboardPreview } from './LeaderboardPreview';
import { LiveEventHero } from './LiveEventHero';
import { LiveEventSwitcher } from './LiveEventSwitcher';
import { SupportBattleCard } from './SupportBattleCard';

function createInitialSupportMap() {
  return Object.fromEntries(
    liveEvents.map((event) => [
      event.id,
      {
        left: event.participants[0].supportTotal,
        right: event.participants[1].supportTotal,
        leftSupporters: event.participants[0].supporters,
        rightSupporters: event.participants[1].supporters
      }
    ])
  );
}

function createInitialLeaderboardMap() {
  return Object.fromEntries(liveEvents.map((event) => [event.id, [...event.leaderboard]]));
}

export function LiveScreen() {
  const { language, t } = useLanguage();
  const initialSupportPreferences = readSupportPreferences();

  const [selectedAmount, setSelectedAmount] = useState<SupportAmount>(initialSupportPreferences.defaultAmount);
  const [quickSupportAmounts, setQuickSupportAmounts] = useState<SupportAmount[]>(initialSupportPreferences.quickAmounts);
  const [selectedEventId, setSelectedEventId] = useState(liveEvents[0].id);
  const [leaderboardMap, setLeaderboardMap] = useState<Record<string, LeaderboardEntry[]>>(createInitialLeaderboardMap);
  const [supportMap, setSupportMap] = useState<Record<string, { left: number; right: number; leftSupporters: number; rightSupporters: number }>>(
    createInitialSupportMap
  );
  const [profile, setProfile] = useState<UserProfile>({
    ...mockData.profile,
    lastSupportAmount: initialSupportPreferences.defaultAmount
  });

  useEffect(() => {
    const preferences = readSupportPreferences();
    setSelectedAmount(preferences.defaultAmount);
    setQuickSupportAmounts(preferences.quickAmounts);
    setProfile((current) => ({
      ...current,
      lastSupportAmount: preferences.defaultAmount
    }));
  }, []);

  const selectedEvent = useMemo(
    () => liveEvents.find((event) => event.id === selectedEventId) ?? liveEvents[0],
    [selectedEventId]
  );

  const currentLeaderboard = leaderboardMap[selectedEvent.id] ?? selectedEvent.leaderboard;
  const currentSupport = supportMap[selectedEvent.id] ?? createInitialSupportMap()[selectedEvent.id];
  const leftParticipant = selectedEvent.participants[0];
  const rightParticipant = selectedEvent.participants[1];

  const handleSelectAmount = (amount: SupportAmount) => {
    setSelectedAmount(amount);
    setProfile((current) => ({
      ...current,
      lastSupportAmount: amount
    }));
  };

  const handleSupport = (side: 'left' | 'right') => {
    const amount = selectedAmount;
    const target = side === 'left' ? leftParticipant : rightParticipant;
    const nextTotals = {
      left: side === 'left' ? currentSupport.left + amount : currentSupport.left,
      right: side === 'right' ? currentSupport.right + amount : currentSupport.right,
      leftSupporters: side === 'left' ? currentSupport.leftSupporters + 1 : currentSupport.leftSupporters,
      rightSupporters: side === 'right' ? currentSupport.rightSupporters + 1 : currentSupport.rightSupporters
    };

    setSupportMap((current) => ({
      ...current,
      [selectedEvent.id]: nextTotals
    }));

    setProfile((current) => ({
      ...current,
      points: current.points + amount,
      totalSupport: current.totalSupport + amount,
      lastSupportAmount: amount,
      selectedParticipant: target.teamLabel,
      selectedParticipantRu: target.teamLabelRu
    }));

    setLeaderboardMap((current) => {
      const existing = current[selectedEvent.id] ?? [];
      const currentProfileEntry = existing.find((entry) => entry.id === profile.id);
      const nextPoints = (currentProfileEntry?.points ?? profile.points) + amount;
      const merged = [
        ...existing.filter((entry) => entry.id !== profile.id),
        {
          id: profile.id,
          name: mockData.profile.displayName,
          nameRu: mockData.profile.displayNameRu,
          points: nextPoints,
          streak: profile.streak
        }
      ].sort((a, b) => b.points - a.points);

      return {
        ...current,
        [selectedEvent.id]: merged.slice(0, 6)
      };
    });
  };

  return (
    <MainPageLayout className="space-y-4">
      <section className="space-y-2 px-1">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{t('liveNow')}</p>
        <h1 className="text-[1.52rem] font-semibold tracking-tight text-text-primary">{t('liveTitle')}</h1>
        <p className="max-w-[24rem] text-[0.92rem] leading-relaxed text-text-secondary">{t('liveHint')}</p>
      </section>

      <LiveEventSwitcher
        items={liveEvents.map((event) => ({
          id: event.id,
          sportLabel: language === 'ru' ? event.categoryLabelRu : event.categoryLabel,
          headline: language === 'ru' ? event.headlineRu : event.headline,
          stageLabel: language === 'ru' ? event.stageLabelRu : event.stageLabel
        }))}
        activeId={selectedEvent.id}
        onSelect={setSelectedEventId}
        label={t('liveNow')}
      />

      <LiveEventHero event={selectedEvent} />

      <SupportBattleCard
        left={{
          id: leftParticipant.id,
          shortName: language === 'ru' ? leftParticipant.shortNameRu : leftParticipant.shortName,
          total: currentSupport.left,
          supporters: currentSupport.leftSupporters
        }}
        right={{
          id: rightParticipant.id,
          shortName: language === 'ru' ? rightParticipant.shortNameRu : rightParticipant.shortName,
          total: currentSupport.right,
          supporters: currentSupport.rightSupporters
        }}
        amounts={quickSupportAmounts}
        selectedAmount={selectedAmount}
        onSelectAmount={handleSelectAmount}
        onSupportLeft={() => handleSupport('left')}
        onSupportRight={() => handleSupport('right')}
      />

      <LeaderboardPreview entries={currentLeaderboard} profile={profile} />
    </MainPageLayout>
  );
}
