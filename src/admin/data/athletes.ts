export type AdminAthleteStatus = 'active' | 'live' | 'archived';
export type AdminAthleteType = 'athlete' | 'team';
export type AdminAthleteSport = 'Футбол' | 'Хоккей' | 'Теннис' | 'MMA' | 'Баскетбол' | 'Лёгкая атлетика' | 'Киберспорт' | 'Бокс';

export type AdminAthleteSportFilter = 'all' | 'football' | 'hockey' | 'tennis' | 'mma' | 'basketball' | 'athletics' | 'esports' | 'boxing';

export interface AdminAthletesKpi {
  id: string;
  label: string;
  value: number;
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminAthleteActivityItem {
  id: string;
  title: string;
  at: string;
}

export interface AdminManagedAthlete {
  id: string;
  name: string;
  slug: string;
  sport: AdminAthleteSport;
  type: AdminAthleteType;
  teamOrCountry: string;
  status: AdminAthleteStatus;
  eventsLabel: string;
  eventsCount: number;
  supportLabel: string;
  supportCount: number;
  shortBio: string;
  liveEvent: string;
  supportStats: {
    totalSupport: number;
    audience: number;
    activeEvents: number;
  };
  activitySummary: AdminAthleteActivityItem[];
  avatarTone: string;
}

export const adminAthletesKpis: AdminAthletesKpi[] = [
  { id: 'total', label: 'Всего спортсменов', value: 248, hint: '14 новых за месяц', tone: 'blue' },
  { id: 'active', label: 'Активные сейчас', value: 62, hint: '18 в поддержке live', tone: 'green' },
  { id: 'new', label: 'Новые', value: 14, hint: '5 ожидают запуска', tone: 'orange' },
  { id: 'archived', label: 'Архив', value: 37, hint: 'Скрыты из витрины', tone: 'slate' }
];

export const adminAthleteSportFilters = [
  { id: 'all', label: 'Все виды спорта' },
  { id: 'football', label: 'Футбол' },
  { id: 'hockey', label: 'Хоккей' },
  { id: 'tennis', label: 'Теннис' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' },
  { id: 'athletics', label: 'Лёгкая атлетика' },
  { id: 'esports', label: 'Киберспорт' },
  { id: 'boxing', label: 'Бокс' }
] as const;

export const adminAthleteStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'active', label: 'Активен' },
  { id: 'live', label: 'В эфире' },
  { id: 'archived', label: 'Архив' }
] as const;

export const adminAthleteTypeFilters = [
  { id: 'all', label: 'Все типы' },
  { id: 'athlete', label: 'Спортсмен' },
  { id: 'team', label: 'Команда' }
] as const;

export const adminAthleteActivityFilters = [
  { id: 'all', label: 'Любая активность' },
  { id: 'active', label: 'С активными событиями' },
  { id: 'idle', label: 'Без событий' }
] as const;

export const adminAthleteLiveFilters = [
  { id: 'all', label: 'Любой эфир' },
  { id: 'live', label: 'Только live' },
  { id: 'offline', label: 'Без live' }
] as const;

export const adminManagedAthletes: AdminManagedAthlete[] = [
  {
    id: 'ath-elena-smirnova',
    name: 'Елена Смирнова',
    slug: '@smirnova.run',
    sport: 'Лёгкая атлетика',
    type: 'athlete',
    teamOrCountry: 'Россия',
    status: 'live',
    eventsLabel: 'Городской забег · 2 эфира',
    eventsCount: 2,
    supportLabel: 'Поддержка в эфире',
    supportCount: 7500,
    shortBio: 'Профессиональная бегунья и двукратная чемпионка России по марафону. Одна из самых вовлечённых live-карточек в блоке выносливости.',
    liveEvent: 'Марафон «Городской забег»',
    supportStats: {
      totalSupport: 7500,
      audience: 32100,
      activeEvents: 5
    },
    activitySummary: [
      { id: 'elena-1', title: 'Прямой эфир запущен 20 минут назад', at: 'Сейчас' },
      { id: 'elena-2', title: 'Опубликован новый пост для комнаты марафона', at: 'Вчера' },
      { id: 'elena-3', title: 'Поддержка включена для городского забега', at: '2 дня назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#f4d7ca_0%,#d79d8b_100%)]'
  },
  {
    id: 'team-spartak',
    name: 'Спартак Москва',
    slug: '@spartak.moscow',
    sport: 'Футбол',
    type: 'team',
    teamOrCountry: 'Россия',
    status: 'live',
    eventsLabel: 'Спартак vs Зенит',
    eventsCount: 3,
    supportLabel: 'Командная поддержка',
    supportCount: 12400,
    shortBio: 'Одна из ключевых команд футбольного блока Fansten с самым высоким уровнем вовлечённости в live-поддержке.',
    liveEvent: 'Спартак vs Зенит',
    supportStats: {
      totalSupport: 12400,
      audience: 48600,
      activeEvents: 8
    },
    activitySummary: [
      { id: 'spartak-1', title: 'Открыта support-комната «Матч дня»', at: '12 мин назад' },
      { id: 'spartak-2', title: 'Live-поддержка переведена в усиленный режим', at: 'Сегодня' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#ffd6d2_0%,#df6b5f_100%)]'
  },
  {
    id: 'ath-alexey-ivanov',
    name: 'Алексей Иванов',
    slug: '@ivanov.ice',
    sport: 'Хоккей',
    type: 'athlete',
    teamOrCountry: 'Team Falcons',
    status: 'active',
    eventsLabel: 'Финал конференции',
    eventsCount: 1,
    supportLabel: 'Стабильная поддержка',
    supportCount: 4200,
    shortBio: 'Нападающий первого звена и одна из самых устойчивых карточек поддержки в хоккейном блоке.',
    liveEvent: 'Нет активного эфира',
    supportStats: {
      totalSupport: 4200,
      audience: 18400,
      activeEvents: 3
    },
    activitySummary: [
      { id: 'alexey-1', title: 'Открыт сбор на финал конференции', at: 'Сегодня' },
      { id: 'alexey-2', title: 'Карточка обновлена после смены состава', at: '3 дня назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#dce6f8_0%,#98b6ea_100%)]'
  },
  {
    id: 'ath-max-chen',
    name: 'Макс Чен',
    slug: '@max.chen',
    sport: 'Киберспорт',
    type: 'athlete',
    teamOrCountry: 'Team Nexus',
    status: 'active',
    eventsLabel: 'Nexus Arena Cup',
    eventsCount: 2,
    supportLabel: 'Высокая вовлечённость',
    supportCount: 5800,
    shortBio: 'Капитан состава по киберспорту, активно растёт в рейтинге поддержки и возврата аудитории.',
    liveEvent: 'Нет активного эфира',
    supportStats: {
      totalSupport: 5800,
      audience: 25900,
      activeEvents: 4
    },
    activitySummary: [
      { id: 'max-1', title: 'Добавлен в новый турнир CCT South America', at: 'Сегодня' },
      { id: 'max-2', title: 'Включено напоминание о старте матча', at: 'Вчера' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#d9e3ff_0%,#8da3eb_100%)]'
  },
  {
    id: 'ath-irina-koval',
    name: 'Ирина Коваль',
    slug: '@koval.ace',
    sport: 'Теннис',
    type: 'athlete',
    teamOrCountry: 'Ace Club',
    status: 'archived',
    eventsLabel: 'Нет активных событий',
    eventsCount: 0,
    supportLabel: 'Скрыта',
    supportCount: 2100,
    shortBio: 'Карточка переведена в архив после окончания сезона и обновления турнирного календаря.',
    liveEvent: 'Сейчас вне эфира',
    supportStats: {
      totalSupport: 2100,
      audience: 9400,
      activeEvents: 0
    },
    activitySummary: [
      { id: 'irina-1', title: 'Карточка отправлена в архив', at: '5 дней назад' },
      { id: 'irina-2', title: 'Поддержка отключена после завершения серии', at: '6 дней назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#ebe2d5_0%,#c7b095_100%)]'
  },
  {
    id: 'ath-sergey-orlov',
    name: 'Сергей Орлов',
    slug: '@orlov.box',
    sport: 'Бокс',
    type: 'athlete',
    teamOrCountry: 'Германия',
    status: 'active',
    eventsLabel: 'Матч в разработке',
    eventsCount: 1,
    supportLabel: 'Готова к запуску',
    supportCount: 2900,
    shortBio: 'Участник боксёрского блока, для которого сейчас готовится отдельный live-сценарий поддержки.',
    liveEvent: 'Ожидает публикации события',
    supportStats: {
      totalSupport: 2900,
      audience: 12700,
      activeEvents: 2
    },
    activitySummary: [
      { id: 'sergey-1', title: 'Добавлен новый соперник в карточку боя', at: 'Вчера' },
      { id: 'sergey-2', title: 'Панель поддержки переведена в статус готовности', at: '4 дня назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#e8d5c8_0%,#c58866_100%)]'
  },
  {
    id: 'team-lyon-w',
    name: 'Лион (ж)',
    slug: '@lyon.women',
    sport: 'Футбол',
    type: 'team',
    teamOrCountry: 'Франция',
    status: 'active',
    eventsLabel: 'Лига чемпионов УЕФА',
    eventsCount: 2,
    supportLabel: 'Командная поддержка',
    supportCount: 6100,
    shortBio: 'Одна из самых стабильных женских команд в международном блоке с высокой вовлечённостью аудитории.',
    liveEvent: 'Ожидает старта матча',
    supportStats: {
      totalSupport: 6100,
      audience: 21800,
      activeEvents: 3
    },
    activitySummary: [
      { id: 'lyon-1', title: 'Команда добавлена в сетку Лиги чемпионов', at: 'Сегодня' },
      { id: 'lyon-2', title: 'Создано новое room-превью для болельщиков', at: '2 дня назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#dfe9ff_0%,#9cb4f2_100%)]'
  }
];
