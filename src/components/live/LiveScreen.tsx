'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { liveEvents } from '@/data/liveEvents';
import { mockData } from '@/data/mock';
import { getHeatState } from '@/lib/arena';
import { formatCurrency } from '@/lib/format';
import { readSupportPreferences } from '@/lib/supportPreferences';
import type { LeaderboardEntry, LiveActivityItem, LiveMoment, SupportAmount, UserProfile } from '@/types';
import { LeaderboardPreview } from './LeaderboardPreview';
import { LiveActivityFeed } from './LiveActivityFeed';
import { LiveDonationDock } from './LiveDonationDock';
import { LiveEventHero } from './LiveEventHero';
import { LiveEventSwitcher } from './LiveEventSwitcher';
import { LiveMomentumPanel } from './LiveMomentumPanel';
import { SupportBattleCard } from './SupportBattleCard';

function createSupportActivity(params: {
  userLabel: string;
  userLabelRu: string;
  participant: string;
  participantRu: string;
  amount: number;
}): LiveActivityItem {
  const { userLabel, userLabelRu, participant, participantRu, amount } = params;

  return {
    id: `activity_support_${Date.now()}`,
    type: amount >= 100 ? 'big_support' : 'support',
    label: `${userLabel} supported ${participant} for ${formatCurrency(amount, 'en')}`,
    labelRu: `${userLabelRu} поддержал ${participantRu} на ${formatCurrency(amount, 'ru')}`,
    amount,
    createdAt: new Date().toISOString()
  };
}

function createLeaderChangeActivity(participant: string, participantRu: string): LiveActivityItem {
  return {
    id: `activity_lead_${Date.now()}`,
    type: 'leader_change',
    label: `${participant} takes the lead`,
    labelRu: `${participantRu} выходит вперед`,
    createdAt: new Date().toISOString()
  };
}

function createMomentActivity(moment: LiveMoment): LiveActivityItem {
  return {
    id: `activity_moment_${moment.id}_${Date.now()}`,
    type: 'moment',
    label: moment.label,
    labelRu: moment.labelRu,
    createdAt: new Date().toISOString()
  };
}

function createInitialMomentIndexMap() {
  return Object.fromEntries(liveEvents.map((event) => [event.id, Math.max(0, event.moments.length - 1)]));
}

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

function createInitialActivityMap() {
  return Object.fromEntries(liveEvents.map((event) => [event.id, [...event.liveActivity]]));
}

function createInitialLeaderboardMap() {
  return Object.fromEntries(liveEvents.map((event) => [event.id, [...event.leaderboard]]));
}

function createInitialMomentumMap(language: 'ru' | 'en') {
  return Object.fromEntries(
    liveEvents.map((event) => {
      const leader = event.participants[0].supportTotal >= event.participants[1].supportTotal ? event.participants[0] : event.participants[1];
      return [
        event.id,
        language === 'ru' ? `${leader.shortNameRu} удерживает преимущество` : `${leader.shortName} holds the edge`
      ];
    })
  );
}

export function LiveScreen() {
  const { language, t } = useLanguage();
  const mountedRef = useRef(false);
  const initialSupportPreferences = readSupportPreferences();

  const [selectedAmount, setSelectedAmount] = useState<SupportAmount>(initialSupportPreferences.defaultAmount);
  const [quickSupportAmounts, setQuickSupportAmounts] = useState<SupportAmount[]>(initialSupportPreferences.quickAmounts);
  const [selectedEventId, setSelectedEventId] = useState(liveEvents[0].id);
  const [momentIndexByEvent, setMomentIndexByEvent] = useState<Record<string, number>>(createInitialMomentIndexMap);
  const [activityMap, setActivityMap] = useState<Record<string, LiveActivityItem[]>>(createInitialActivityMap);
  const [leaderboardMap, setLeaderboardMap] = useState<Record<string, LeaderboardEntry[]>>(createInitialLeaderboardMap);
  const [supportMap, setSupportMap] = useState<Record<string, { left: number; right: number; leftSupporters: number; rightSupporters: number }>>(
    createInitialSupportMap
  );
  const [momentumByEvent, setMomentumByEvent] = useState<Record<string, string>>(() => createInitialMomentumMap(language));
  const [profile, setProfile] = useState<UserProfile>({ ...mockData.profile });

  useEffect(() => {
    const preferences = readSupportPreferences();
    setSelectedAmount(preferences.defaultAmount);
    setQuickSupportAmounts(preferences.quickAmounts);
    setProfile((current) => ({
      ...current,
      lastSupportAmount: preferences.defaultAmount
    }));
  }, []);

  useEffect(() => {
    setMomentumByEvent((current) => {
      const next = { ...current };
      for (const event of liveEvents) {
        if (!next[event.id]) {
          const leader = event.participants[0].supportTotal >= event.participants[1].supportTotal ? event.participants[0] : event.participants[1];
          next[event.id] =
            language === 'ru' ? `${leader.shortNameRu} удерживает преимущество` : `${leader.shortName} holds the edge`;
        }
      }
      return next;
    });
  }, [language]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMomentIndexByEvent((current) => {
        const next = { ...current };

        for (const event of liveEvents) {
          next[event.id] = (current[event.id] + 1) % event.moments.length;
        }

        return next;
      });
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const selectedEvent = useMemo(
    () => liveEvents.find((event) => event.id === selectedEventId) ?? liveEvents[0],
    [selectedEventId]
  );

  const currentMomentIndex = momentIndexByEvent[selectedEvent.id] ?? 0;
  const currentMoment = selectedEvent.moments[currentMomentIndex];
  const currentActivity = activityMap[selectedEvent.id] ?? selectedEvent.liveActivity;
  const currentLeaderboard = leaderboardMap[selectedEvent.id] ?? selectedEvent.leaderboard;
  const currentSupport = supportMap[selectedEvent.id] ?? createInitialSupportMap()[selectedEvent.id];
  const momentumMessage = momentumByEvent[selectedEvent.id] ?? '';

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    setActivityMap((current) => {
      const next = { ...current };
      next[selectedEvent.id] = [createMomentActivity(currentMoment), ...(current[selectedEvent.id] ?? [])].slice(0, 6);
      return next;
    });
  }, [currentMoment, selectedEvent.id]);

  const leftParticipant = selectedEvent.participants[0];
  const rightParticipant = selectedEvent.participants[1];
  const fanPulseValue = Math.min(
    99,
    46 +
      Math.round((currentSupport.left + currentSupport.right) / 1400) +
      currentActivity.length * 3 +
      (currentMoment.intensity === 'high' ? 12 : currentMoment.intensity === 'medium' ? 6 : 2)
  );
  const fanHeatKey = getHeatState(fanPulseValue);

  const handleSelectAmount = (amount: SupportAmount) => {
    setSelectedAmount(amount);
    setProfile((current) => ({
      ...current,
      lastSupportAmount: amount
    }));
  };

  const handleSupport = (side: 'left' | 'right') => {
    const amount = selectedAmount;
    const previousLeader = currentSupport.left >= currentSupport.right ? 'left' : 'right';
    const target = side === 'left' ? leftParticipant : rightParticipant;
    const nextTotals = {
      left: side === 'left' ? currentSupport.left + amount : currentSupport.left,
      right: side === 'right' ? currentSupport.right + amount : currentSupport.right,
      leftSupporters: side === 'left' ? currentSupport.leftSupporters + 1 : currentSupport.leftSupporters,
      rightSupporters: side === 'right' ? currentSupport.rightSupporters + 1 : currentSupport.rightSupporters
    };
    const nextLeader = nextTotals.left >= nextTotals.right ? 'left' : 'right';

    setSupportMap((current) => ({
      ...current,
      [selectedEvent.id]: nextTotals
    }));

    setActivityMap((current) => {
      const next = [
        createSupportActivity({
          userLabel: mockData.profile.displayName,
          userLabelRu: mockData.profile.displayNameRu,
          participant: target.shortName,
          participantRu: target.shortNameRu,
          amount
        }),
        ...(current[selectedEvent.id] ?? [])
      ];

      if (nextLeader !== previousLeader) {
        next.unshift(
          createLeaderChangeActivity(
            nextLeader === 'left' ? leftParticipant.shortName : rightParticipant.shortName,
            nextLeader === 'left' ? leftParticipant.shortNameRu : rightParticipant.shortNameRu
          )
        );
      }

      return {
        ...current,
        [selectedEvent.id]: next.slice(0, 6)
      };
    });

    setMomentumByEvent((current) => {
      let message: string;

      if (nextLeader !== previousLeader) {
        message = t('leaderTakesLead', {
          participant: side === 'left' ? leftParticipant.shortName : rightParticipant.shortName
        });
      } else if (amount >= 100) {
        message = t('supportSurge', {
          participant: side === 'left' ? leftParticipant.shortName : rightParticipant.shortName
        });
      } else {
        message = t('crowdBacks', {
          participant: side === 'left' ? leftParticipant.shortName : rightParticipant.shortName
        });
      }

      return {
        ...current,
        [selectedEvent.id]: message
      };
    });

    const nextPoints = profile.points + amount;

    setProfile((current) => ({
      ...current,
      points: nextPoints,
      totalSupport: current.totalSupport + amount,
      lastSupportAmount: amount,
      selectedParticipant: target.teamLabel,
      selectedParticipantRu: target.teamLabelRu
    }));

    setLeaderboardMap((current) => {
      const existing = current[selectedEvent.id] ?? [];
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
          selectedAmount={selectedAmount}
          onSupportLeft={() => handleSupport('left')}
          onSupportRight={() => handleSupport('right')}
        />

        <LiveDonationDock
          leftLabel={language === 'ru' ? leftParticipant.shortNameRu : leftParticipant.shortName}
          rightLabel={language === 'ru' ? rightParticipant.shortNameRu : rightParticipant.shortName}
          amounts={quickSupportAmounts}
          selectedAmount={selectedAmount}
          onSelectAmount={handleSelectAmount}
          onSupportLeft={() => handleSupport('left')}
          onSupportRight={() => handleSupport('right')}
        />

        <LeaderboardPreview entries={currentLeaderboard} profile={profile} />

        <LiveMomentumPanel
          moment={currentMoment}
          message={momentumMessage}
          fanPulseValue={fanPulseValue}
          fanHeatLabel={t(fanHeatKey)}
        />

        <LiveActivityFeed items={currentActivity} />
      </MainPageLayout>
  );
}
