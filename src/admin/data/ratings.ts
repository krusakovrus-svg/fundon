export type AdminRatingStatus = 'active' | 'in-event' | 'paused';

export interface AdminRatingsKpi {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminRatingRow {
  id: string;
  position: number;
  user: string;
  handle: string;
  type: 'global' | 'event' | 'season';
  sport: 'Футбол' | 'Теннис' | 'MMA' | 'Баскетбол';
  points: string;
  change: string;
  changeTone: 'positive' | 'negative' | 'neutral';
  event: string;
  period: string;
  status: AdminRatingStatus;
  avatarTone: string;
}

export interface AdminRatingRule {
  id: string;
  label: string;
  points: string;
}

export interface AdminRatingAdjustment {
  id: string;
  user: string;
  reason: string;
  amount: string;
  at: string;
  tone: 'positive' | 'negative' | 'neutral';
  avatarTone: string;
}

export interface AdminRatingSystemState {
  id: string;
  label: string;
  value: string;
  tone: 'good' | 'warning' | 'info';
}

export const adminRatingsKpis: AdminRatingsKpi[] = [
  { id: 'active-ratings', label: 'Активных рейтингов', value: '3', hint: 'Все в норме', tone: 'green' },
  { id: 'users-in-rating', label: 'Пользователей в рейтинге', value: '24,560', hint: '+1,250 за неделю', tone: 'blue' },
  { id: 'updated-today', label: 'Обновлено сегодня', value: '320', hint: 'Автообновление', tone: 'blue' },
  { id: 'manual-adjustments', label: 'Корректировок вручную', value: '12', hint: 'Последняя: 2 часа назад', tone: 'orange' }
];

export const adminRatingTypeFilters = [
  { id: 'global', label: 'Общий рейтинг' },
  { id: 'event', label: 'Рейтинг события' },
  { id: 'season', label: 'Сезонный' }
] as const;

export const adminRatingPeriodFilters = [
  { id: 'current-month', label: 'Текущий месяц' },
  { id: 'current-week', label: 'Текущая неделя' },
  { id: 'quarter', label: 'Квартал' }
] as const;

export const adminRatingEventFilters = [
  { id: 'all', label: 'Все события' },
  { id: 'marathon', label: 'Соревнование «Марафон»' },
  { id: 'tennis', label: 'Турнир по теннису' },
  { id: 'mma125', label: 'MMA Championship 125' }
] as const;

export const adminRatingSportFilters = [
  { id: 'all', label: 'Все виды спорта' },
  { id: 'football', label: 'Футбол' },
  { id: 'tennis', label: 'Теннис' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' }
] as const;

export const adminRatingStatusFilters = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активен' },
  { id: 'in-event', label: 'В событии' },
  { id: 'paused', label: 'Пауза' }
] as const;

export const adminRatingsRows: AdminRatingRow[] = [
  {
    id: 'r-1',
    position: 1,
    user: 'Алексей Волков',
    handle: '@volkov_alex',
    type: 'global',
    sport: 'Футбол',
    points: '12,580',
    change: '+2',
    changeTone: 'positive',
    event: 'Соревнование «Марафон»',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f2c8b4_0%,#d7906d_100%)]'
  },
  {
    id: 'r-2',
    position: 2,
    user: 'Мария Соколова',
    handle: '@msokolova',
    type: 'event',
    sport: 'Теннис',
    points: '11,420',
    change: '-1',
    changeTone: 'negative',
    event: 'Турнир по теннису',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f6d5cc_0%,#cb9c88_100%)]'
  },
  {
    id: 'r-3',
    position: 3,
    user: 'Дмитрий Козлов',
    handle: '@kozdima',
    type: 'event',
    sport: 'MMA',
    points: '9,850',
    change: '+5',
    changeTone: 'positive',
    event: 'MMA Championship 125',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f0cfbc_0%,#cb8d6d_100%)]'
  },
  {
    id: 'r-4',
    position: 4,
    user: 'Сергей Миронов',
    handle: '@mironov_s',
    type: 'season',
    sport: 'Баскетбол',
    points: '8,420',
    change: '—',
    changeTone: 'neutral',
    event: 'Финал Баскетбол Лиги',
    period: 'Октябрь 2024',
    status: 'in-event',
    avatarTone: 'bg-[linear-gradient(135deg,#f4d0c0_0%,#cf9a81_100%)]'
  },
  {
    id: 'r-5',
    position: 5,
    user: 'Екатерина Лебедева',
    handle: '@katya_leo',
    type: 'global',
    sport: 'Футбол',
    points: '7,200',
    change: '+2',
    changeTone: 'positive',
    event: 'Соревнование «Марафон»',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f7d2c8_0%,#d89a8a_100%)]'
  },
  {
    id: 'r-6',
    position: 6,
    user: 'Артем Никитин',
    handle: '@nikitin_art',
    type: 'event',
    sport: 'MMA',
    points: '6,980',
    change: '+1',
    changeTone: 'positive',
    event: 'MMA Championship 125',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f3d7c8_0%,#d9946e_100%)]'
  },
  {
    id: 'r-7',
    position: 7,
    user: 'Иван Петров',
    handle: '@petrov_ivan',
    type: 'event',
    sport: 'Теннис',
    points: '6,450',
    change: '+3',
    changeTone: 'positive',
    event: 'Турнир по теннису',
    period: 'Ноябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f5d6c7_0%,#d39c81_100%)]'
  },
  {
    id: 'r-8',
    position: 8,
    user: 'Ольга Федорова',
    handle: '@fedorova_ol',
    type: 'season',
    sport: 'Баскетбол',
    points: '5,920',
    change: '-1',
    changeTone: 'negative',
    event: 'Финал Баскетбол Лиги',
    period: 'Октябрь 2024',
    status: 'active',
    avatarTone: 'bg-[linear-gradient(135deg,#f1d1be_0%,#cf9278_100%)]'
  },
  {
    id: 'r-9',
    position: 9,
    user: 'Максим Громов',
    handle: '@gromov_max',
    type: 'global',
    sport: 'Футбол',
    points: '5,780',
    change: '—',
    changeTone: 'neutral',
    event: 'Соревнование «Марафон»',
    period: 'Ноябрь 2024',
    status: 'paused',
    avatarTone: 'bg-[linear-gradient(135deg,#eaded7_0%,#c2b3aa_100%)]'
  }
];

export const adminRatingRules: AdminRatingRule[] = [
  { id: 'rule-1', label: 'Донат во время live-события', points: '+10 очков' },
  { id: 'rule-2', label: 'Создание комнаты', points: '+25 очков' },
  { id: 'rule-3', label: 'Приглашение друга', points: '+15 очков' },
  { id: 'rule-4', label: 'Активность в чате комнаты', points: '+1 очко/мин' },
  { id: 'rule-5', label: 'Победа спортсмена', points: '+50 очков' }
];

export const adminRatingAdjustments: AdminRatingAdjustment[] = [
  {
    id: 'adj-1',
    user: 'Алексей Волков',
    reason: 'Бонус за активность',
    amount: '+350 очков',
    at: '2 часа назад',
    tone: 'positive',
    avatarTone: 'bg-[linear-gradient(135deg,#f2c8b4_0%,#d7906d_100%)]'
  },
  {
    id: 'adj-2',
    user: 'Мария Соколова',
    reason: 'Нарушение правил',
    amount: '-200 очков',
    at: 'Вчера, 18:24',
    tone: 'negative',
    avatarTone: 'bg-[linear-gradient(135deg,#f6d5cc_0%,#cb9c88_100%)]'
  },
  {
    id: 'adj-3',
    user: 'Дмитрий Козлов',
    reason: 'Ручная корректировка',
    amount: '+500 очков',
    at: '22.04.2024',
    tone: 'positive',
    avatarTone: 'bg-[linear-gradient(135deg,#f0cfbc_0%,#cb8d6d_100%)]'
  }
];

export const adminRatingSystemState: AdminRatingSystemState[] = [
  { id: 'state-1', label: 'Автообновление', value: 'Система в норме', tone: 'good' },
  { id: 'state-2', label: 'Аномалии', value: '3 требуют проверки', tone: 'warning' },
  { id: 'state-3', label: 'Последний пересчёт', value: 'Сегодня, 03:15', tone: 'info' }
];
