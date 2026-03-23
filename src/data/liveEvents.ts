import { mockData } from '@/data/mock';
import type { EventRecord, LeaderboardEntry, LiveActivityItem, LiveMoment } from '@/types';

export interface LiveHubEvent extends EventRecord {
  moments: LiveMoment[];
  liveActivity: LiveActivityItem[];
  leaderboard: LeaderboardEntry[];
}

const supportedLiveEventIds = new Set(['event_live_001']);

const rawLiveEvents: LiveHubEvent[] = [
  {
    ...mockData.featuredEvent,
    categoryLabel: 'Martial arts',
    categoryLabelRu: 'Единоборства',
    moments: mockData.moments,
    liveActivity: mockData.liveActivity,
    leaderboard: mockData.leaderboard
  },
  {
    id: 'event_live_volleyball_001',
    slug: 'france-vs-belgium-pro',
    title: 'UPVL Nations League',
    titleRu: 'UPVL. Лига Наций',
    headline: 'France (Pro) vs Belgium (Pro)',
    headlineRu: 'Франция (Pro) vs Бельгия (Pro)',
    category: 'sports',
    categoryLabel: 'Volleyball',
    categoryLabelRu: 'Волейбол',
    venue: 'Paris Arena, Paris',
    venueRu: 'Paris Arena, Париж',
    startsAt: '2026-03-17T18:30:00+03:00',
    status: 'live',
    stageLabel: 'Set 3/5',
    stageLabelRu: 'Сет 3/5',
    timerLabel: '22-19',
    participants: [
      {
        id: 'participant_france_pro',
        name: 'France (Pro)',
        nameRu: 'Франция (Pro)',
        shortName: 'France',
        shortNameRu: 'Франция',
        teamLabel: 'Team France',
        teamLabelRu: 'Команда Франции',
        supportTotal: 8420,
        supporters: 361
      },
      {
        id: 'participant_belgium_pro',
        name: 'Belgium (Pro)',
        nameRu: 'Бельгия (Pro)',
        shortName: 'Belgium',
        shortNameRu: 'Бельгия',
        teamLabel: 'Team Belgium',
        teamLabelRu: 'Команда Бельгии',
        supportTotal: 9170,
        supporters: 388
      }
    ],
    moments: [
      {
        id: 'volleyball_moment_001',
        type: 'support_surge',
        participant: 'Belgium',
        participantRu: 'Бельгия',
        label: 'Belgium takes control in set three',
        labelRu: 'Бельгия забирает инициативу в третьем сете',
        intensity: 'medium',
        reactionCount: 418,
        createdAt: '2026-03-17T19:04:00+03:00'
      },
      {
        id: 'volleyball_moment_002',
        type: 'round_end',
        participant: 'France',
        participantRu: 'Франция',
        label: 'France cuts the gap to two points',
        labelRu: 'Франция сокращает отставание до двух очков',
        intensity: 'medium',
        reactionCount: 362,
        createdAt: '2026-03-17T19:06:00+03:00'
      },
      {
        id: 'volleyball_moment_003',
        type: 'support_surge',
        participant: 'Belgium',
        participantRu: 'Бельгия',
        label: 'Crowd backs Belgium after a long rally',
        labelRu: 'Толпа поддерживает Бельгию после длинного розыгрыша',
        intensity: 'high',
        reactionCount: 1044,
        createdAt: '2026-03-17T19:08:00+03:00'
      }
    ],
    liveActivity: [
      {
        id: 'volleyball_activity_001',
        type: 'support',
        label: 'Mila supported Belgium for $10',
        labelRu: 'Мила поддержала Бельгию на $10',
        amount: 10,
        createdAt: '2026-03-17T19:07:00+03:00'
      },
      {
        id: 'volleyball_activity_002',
        type: 'big_support',
        label: 'Big support: $100 for France',
        labelRu: 'Крупная поддержка: $100 для Франции',
        amount: 100,
        createdAt: '2026-03-17T19:08:00+03:00'
      },
      {
        id: 'volleyball_activity_003',
        type: 'leader_change',
        label: 'Belgium retakes the lead',
        labelRu: 'Бельгия снова выходит вперед',
        createdAt: '2026-03-17T19:08:30+03:00'
      }
    ],
    leaderboard: [
      { id: 'user_11', name: 'Mila', nameRu: 'Мила', points: 1180, streak: 6 },
      { id: 'user_12', name: 'Oleg', nameRu: 'Олег', points: 920, streak: 5 },
      { id: 'user_13', name: 'Artem', nameRu: 'Артем', points: 810, streak: 4 }
    ]
  },
  {
    id: 'event_live_esports_001',
    slug: 'navi-junior-vs-astini-plus5',
    title: 'European Pro League. Season 35 2026',
    titleRu: 'European Pro League. Season 35 2026',
    headline: 'NAVI Junior vs Astini+5',
    headlineRu: 'NAVI Junior vs Astini+5',
    category: 'esports',
    categoryLabel: 'Cybersport',
    categoryLabelRu: 'Киберспорт',
    venue: 'Online lobby',
    venueRu: 'Онлайн-лобби',
    startsAt: '2026-03-17T16:00:00+03:00',
    status: 'live',
    stageLabel: 'Map 2/3',
    stageLabelRu: 'Карта 2/3',
    timerLabel: '11:42',
    participants: [
      {
        id: 'participant_navi_junior',
        name: 'NAVI Junior',
        nameRu: 'NAVI Junior',
        shortName: 'NAVI Jr',
        shortNameRu: 'NAVI Jr',
        teamLabel: 'Team NAVI Junior',
        teamLabelRu: 'Команда NAVI Junior',
        supportTotal: 10310,
        supporters: 529
      },
      {
        id: 'participant_astini5',
        name: 'Astini+5',
        nameRu: 'Astini+5',
        shortName: 'Astini+5',
        shortNameRu: 'Astini+5',
        teamLabel: 'Team Astini+5',
        teamLabelRu: 'Команда Astini+5',
        supportTotal: 7550,
        supporters: 402
      }
    ],
    moments: [
      {
        id: 'esports_moment_001',
        type: 'support_surge',
        participant: 'NAVI Jr',
        participantRu: 'NAVI Jr',
        label: 'NAVI Junior closes the round with a clean retake',
        labelRu: 'NAVI Junior закрывает раунд чистым ретейком',
        intensity: 'high',
        reactionCount: 892,
        createdAt: '2026-03-17T16:07:00+03:00'
      },
      {
        id: 'esports_moment_002',
        type: 'support_surge',
        participant: 'Astini+5',
        participantRu: 'Astini+5',
        label: 'Astini+5 answers with an eco upset',
        labelRu: 'Astini+5 отвечает неожиданной эко-победой',
        intensity: 'medium',
        reactionCount: 516,
        createdAt: '2026-03-17T16:08:00+03:00'
      },
      {
        id: 'esports_moment_003',
        type: 'round_end',
        participant: 'NAVI Jr',
        participantRu: 'NAVI Jr',
        label: 'NAVI Junior reaches map point',
        labelRu: 'NAVI Junior выходит на матч-поинт карты',
        intensity: 'high',
        reactionCount: 1187,
        createdAt: '2026-03-17T16:09:00+03:00'
      }
    ],
    liveActivity: [
      {
        id: 'esports_activity_001',
        type: 'support',
        label: 'Ilya supported NAVI Junior for $10',
        labelRu: 'Илья поддержал NAVI Junior на $10',
        amount: 10,
        createdAt: '2026-03-17T16:06:30+03:00'
      },
      {
        id: 'esports_activity_002',
        type: 'big_support',
        label: 'Big support: $100 for Astini+5',
        labelRu: 'Крупная поддержка: $100 для Astini+5',
        amount: 100,
        createdAt: '2026-03-17T16:08:10+03:00'
      },
      {
        id: 'esports_activity_003',
        type: 'leader_change',
        label: 'NAVI Junior extends the lead',
        labelRu: 'NAVI Junior увеличивает преимущество',
        createdAt: '2026-03-17T16:09:15+03:00'
      }
    ],
    leaderboard: [
      { id: 'user_21', name: 'Dan', nameRu: 'Дан', points: 1360, streak: 9 },
      { id: 'user_22', name: 'Maks', nameRu: 'Макс', points: 1015, streak: 6 },
      { id: 'user_23', name: 'Sasha', nameRu: 'Саша', points: 860, streak: 5 }
    ]
  }
];

export const liveEvents: LiveHubEvent[] = rawLiveEvents.filter((event) => supportedLiveEventIds.has(event.id));
