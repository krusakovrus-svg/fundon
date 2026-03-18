import type { AppMockData } from '@/types';

export const mockData: AppMockData = {
  featuredEvent: {
    id: 'event_live_001',
    slug: 'evloev-vs-murphy',
    title: 'Fight Night London',
    titleRu: 'Вечер боя в Лондоне',
    headline: 'Evloev vs Murphy',
    headlineRu: 'Евлоев vs Мерфи',
    category: 'sports',
    categoryLabel: 'Live event',
    categoryLabelRu: 'Прямой эфир',
    venue: 'O2 Arena, London',
    venueRu: 'O2 Arena, Лондон',
    startsAt: '2026-03-21T20:00:00Z',
    status: 'live',
    stageLabel: 'Round 3/5',
    stageLabelRu: 'Раунд 3/5',
    timerLabel: '1:21',
    participants: [
      {
        id: 'participant_evloev',
        name: 'Movsar Evloev',
        nameRu: 'Мовсар Евлоев',
        shortName: 'Evloev',
        shortNameRu: 'Евлоев',
        teamLabel: 'Team Evloev',
        teamLabelRu: 'Команда Евлоева',
        supportTotal: 12340,
        supporters: 842
      },
      {
        id: 'participant_murphy',
        name: 'Lerone Murphy',
        nameRu: 'Лерон Мерфи',
        shortName: 'Murphy',
        shortNameRu: 'Мерфи',
        teamLabel: 'Team Murphy',
        teamLabelRu: 'Команда Мерфи',
        supportTotal: 10890,
        supporters: 791
      }
    ]
  },
  events: [
    {
      id: 'event_live_001',
      slug: 'evloev-vs-murphy',
      title: 'Fight Night London',
      titleRu: 'Вечер боя в Лондоне',
      headline: 'Evloev vs Murphy',
      headlineRu: 'Евлоев vs Мерфи',
      category: 'sports',
      categoryLabel: 'Sports',
      categoryLabelRu: 'Спорт',
      venue: 'O2 Arena, London',
      venueRu: 'O2 Arena, Лондон',
      startsAt: '2026-03-21T20:00:00Z',
      status: 'live',
      stageLabel: 'Round 3/5',
      stageLabelRu: 'Раунд 3/5',
      timerLabel: '1:21',
      participants: []
    },
    {
      id: 'event_upcoming_002',
      slug: 'nova-vs-vibe',
      title: 'Creator Clash',
      titleRu: 'Битва креаторов',
      headline: 'Nova vs Vibe',
      headlineRu: 'Нова vs Вайб',
      category: 'creator',
      categoryLabel: 'Creator event',
      categoryLabelRu: 'Событие креатора',
      venue: 'Online stream',
      venueRu: 'Онлайн-стрим',
      startsAt: '2026-03-22T18:30:00Z',
      status: 'upcoming',
      participants: []
    },
    {
      id: 'event_upcoming_003',
      slug: 'atlas-vs-luna',
      title: 'Live Show Final',
      titleRu: 'Финал live-шоу',
      headline: 'Atlas vs Luna',
      headlineRu: 'Атлас vs Луна',
      category: 'show',
      categoryLabel: 'Show',
      categoryLabelRu: 'Шоу',
      venue: 'Sky Hall',
      venueRu: 'Sky Hall',
      startsAt: '2026-03-23T19:00:00Z',
      status: 'upcoming',
      participants: []
    }
  ],
  moments: [
    {
      id: 'moment_001',
      type: 'heavy_strike',
      participant: 'Murphy',
      participantRu: 'Мерфи',
      label: 'Murphy landed a heavy strike',
      labelRu: 'Мерфи попал тяжелым ударом',
      intensity: 'medium',
      reactionCount: 320,
      createdAt: '2026-03-21T20:12:00Z'
    },
    {
      id: 'moment_002',
      type: 'takedown',
      participant: 'Evloev',
      participantRu: 'Евлоев',
      label: 'Evloev takes control on the mat',
      labelRu: 'Евлоев берет контроль в партере',
      intensity: 'medium',
      reactionCount: 210,
      createdAt: '2026-03-21T20:13:00Z'
    },
    {
      id: 'moment_003',
      type: 'submission_attempt',
      participant: 'Evloev',
      participantRu: 'Евлоев',
      label: 'Submission attempt',
      labelRu: 'Попытка сабмишена',
      intensity: 'medium',
      reactionCount: 640,
      createdAt: '2026-03-21T20:14:00Z'
    },
    {
      id: 'moment_004',
      type: 'knockdown',
      participant: 'Murphy',
      participantRu: 'Мерфи',
      label: 'Knockdown',
      labelRu: 'Нокдаун',
      intensity: 'high',
      reactionCount: 3254,
      createdAt: '2026-03-21T20:15:00Z'
    }
  ],
  liveActivity: [
    {
      id: 'activity_001',
      type: 'support',
      label: 'Alex supported Evloev for $10',
      labelRu: 'Алекс поддержал Евлоева на $10',
      amount: 10,
      createdAt: '2026-03-21T20:15:30Z'
    },
    {
      id: 'activity_002',
      type: 'big_support',
      label: 'Big support: $1000 for Murphy',
      labelRu: 'Крупная поддержка: $1000 для Мерфи',
      amount: 1000,
      createdAt: '2026-03-21T20:15:45Z'
    },
    {
      id: 'activity_003',
      type: 'leader_change',
      label: 'Murphy takes the lead',
      labelRu: 'Мерфи выходит вперед',
      createdAt: '2026-03-21T20:16:00Z'
    }
  ],
  leaderboard: [
    { id: 'user_1', name: 'Alex', nameRu: 'Алекс', points: 1280, streak: 7 },
    { id: 'user_2', name: 'Lena', nameRu: 'Лена', points: 940, streak: 6 },
    { id: 'user_3', name: 'Ivan', nameRu: 'Иван', points: 730, streak: 5 }
  ],
  rooms: [
    {
      id: 'room_1',
      name: 'Main Event Squad',
      nameRu: 'Главное событие',
      members: 18,
      eventTitle: 'Evloev vs Murphy',
      eventTitleRu: 'Евлоев vs Мерфи'
    },
    {
      id: 'room_2',
      name: 'Late Night Watch',
      nameRu: 'Ночной просмотр',
      members: 9,
      eventTitle: 'Evloev vs Murphy',
      eventTitleRu: 'Евлоев vs Мерфи'
    }
  ],
  profile: {
    id: 'user_current',
    displayName: 'You',
    displayNameRu: 'Вы',
    xp: 245,
    points: 420,
    streak: 7,
    selectedParticipantId: 'participant_murphy',
    selectedParticipant: 'Team Murphy',
    selectedParticipantRu: 'Команда Мерфи',
    totalSupport: 111,
    currentRank: 18,
    walletBalance: 0,
    currentLiveEventId: 'event_live_001',
    lastSupportAmount: 10
  },
  profileSupportHistory: [
    {
      id: 'profile_support_001',
      eventTitle: 'Fight Night London',
      eventTitleRu: 'Вечер боя в Лондоне',
      participant: 'Murphy',
      participantRu: 'Мерфи',
      amount: 10,
      createdAt: '2026-03-17T18:41:00+03:00'
    },
    {
      id: 'profile_support_002',
      eventTitle: 'UPVL Nations League',
      eventTitleRu: 'UPVL. Лига Наций',
      participant: 'Belgium (Pro)',
      participantRu: 'Бельгия (Pro)',
      amount: 100,
      createdAt: '2026-03-17T17:26:00+03:00'
    },
    {
      id: 'profile_support_003',
      eventTitle: 'European Pro League. Season 35 2026',
      eventTitleRu: 'European Pro League. Season 35 2026',
      participant: 'NAVI Junior',
      participantRu: 'NAVI Junior',
      amount: 10,
      createdAt: '2026-03-17T16:12:00+03:00'
    },
    {
      id: 'profile_support_004',
      eventTitle: 'Fight Night London',
      eventTitleRu: 'Вечер боя в Лондоне',
      participant: 'Murphy',
      participantRu: 'Мерфи',
      amount: 1,
      createdAt: '2026-03-17T15:08:00+03:00'
    },
    {
      id: 'profile_support_005',
      eventTitle: 'UPVL Nations League',
      eventTitleRu: 'UPVL. Лига Наций',
      participant: 'France (Pro)',
      participantRu: 'Франция (Pro)',
      amount: 10,
      createdAt: '2026-03-16T22:14:00+03:00'
    }
  ],
  supportAmounts: [1, 10, 100, 1000]
};
