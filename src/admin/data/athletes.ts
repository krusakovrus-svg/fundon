export type AdminAthleteStatus = 'active' | 'live' | 'archived';
export type AdminAthleteType = 'athlete' | 'team';
export type AdminAthleteSport =
  | 'Футбол'
  | 'Хоккей'
  | 'Теннис'
  | 'MMA'
  | 'Баскетбол'
  | 'Лёгкая атлетика'
  | 'Киберспорт'
  | 'Бокс';

export type AdminAthleteSportFilter =
  | 'all'
  | 'football'
  | 'hockey'
  | 'tennis'
  | 'mma'
  | 'basketball'
  | 'athletics'
  | 'esports'
  | 'boxing';

export interface AdminAthletesKpi {
  id: string;
  label: string;
  value: string;
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
  supportLabel: string;
  supportValue: string;
  shortBio: string;
  liveEvent: string;
  supportStats: {
    donations: string;
    audience: string;
    activeEvents: string;
  };
  activitySummary: AdminAthleteActivityItem[];
  avatarTone: string;
}

export const adminAthletesKpis: AdminAthletesKpi[] = [
  { id: 'total', label: 'Всего спортсменов', value: '248', hint: '14 новых за месяц', tone: 'blue' },
  { id: 'active', label: 'Активные сейчас', value: '62', hint: '18 в поддержке live', tone: 'green' },
  { id: 'new', label: 'Новые', value: '14', hint: '5 ожидают запуска', tone: 'orange' },
  { id: 'archived', label: 'Архивные', value: '37', hint: 'скрыты из витрины', tone: 'slate' }
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
  { id: 'all', label: 'Все' },
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
    eventsLabel: 'Марафон «Городской забег»',
    supportLabel: 'Высокая',
    supportValue: '7.5K донатов',
    shortBio: 'Профессиональная бегунья, двукратная чемпионка России по марафону.',
    liveEvent: 'Марафон «Городской забег»',
    supportStats: {
      donations: '7.5K донатов',
      audience: '32.1K подписчиков',
      activeEvents: '5 активных событий'
    },
    activitySummary: [
      { id: 'elena-1', title: 'Прямой эфир запущен 20 мин назад', at: 'Сейчас' },
      { id: 'elena-2', title: 'Новый пост опубликован для комнаты марафона', at: 'Вчера' },
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
    supportLabel: 'Командная',
    supportValue: '12.4K донатов',
    shortBio: 'Ключевая команда футбольного блока FUNDON с самой высокой вовлечённостью в лайв-поддержке.',
    liveEvent: 'Спартак vs Зенит',
    supportStats: {
      donations: '12.4K донатов',
      audience: '48.6K подписчиков',
      activeEvents: '8 активных событий'
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
    supportLabel: 'Стабильная',
    supportValue: '4.2K донатов',
    shortBio: 'Нападающий первого звена, одна из самых устойчивых карточек поддержки в хоккейном блоке.',
    liveEvent: 'Нет активного эфира',
    supportStats: {
      donations: '4.2K донатов',
      audience: '18.4K подписчиков',
      activeEvents: '3 активных события'
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
    supportLabel: 'Высокая',
    supportValue: '5.8K донатов',
    shortBio: 'Капитан состава по киберспорту, активно растёт в рейтинге поддержки.',
    liveEvent: 'Нет активного эфира',
    supportStats: {
      donations: '5.8K донатов',
      audience: '25.9K подписчиков',
      activeEvents: '4 активных события'
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
    supportLabel: 'Скрыта',
    supportValue: 'Архив',
    shortBio: 'Карточка переведена в архив после окончания текущего сезона и обновления состава турниров.',
    liveEvent: 'Сейчас вне эфира',
    supportStats: {
      donations: '2.1K донатов',
      audience: '9.4K подписчиков',
      activeEvents: '0 активных событий'
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
    supportLabel: 'Включена',
    supportValue: '2.9K донатов',
    shortBio: 'Участник боксерского блока, для которого сейчас готовится отдельный live-сценарий поддержки.',
    liveEvent: 'Ожидает публикации события',
    supportStats: {
      donations: '2.9K донатов',
      audience: '12.7K подписчиков',
      activeEvents: '2 активных события'
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
    supportLabel: 'Командная',
    supportValue: '6.1K донатов',
    shortBio: 'Одна из самых стабильных женских команд в международном блоке, с высокой вовлечённостью аудитории.',
    liveEvent: 'Ожидает старта матча',
    supportStats: {
      donations: '6.1K донатов',
      audience: '21.8K подписчиков',
      activeEvents: '3 активных события'
    },
    activitySummary: [
      { id: 'lyon-1', title: 'Команда добавлена в сетку Лиги чемпионов', at: 'Сегодня' },
      { id: 'lyon-2', title: 'Создано новое room-превью для болельщиков', at: '2 дня назад' }
    ],
    avatarTone: 'bg-[linear-gradient(135deg,#dfe9ff_0%,#9cb4f2_100%)]'
  }
];
