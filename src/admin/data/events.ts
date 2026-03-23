export type AdminEventStatus = 'live' | 'today' | 'upcoming' | 'finished' | 'draft';
export type AdminEventStatusFilter = 'all' | 'live' | 'today' | 'upcoming' | 'finished' | 'drafts';
export type AdminEventSport = 'Футбол' | 'Хоккей' | 'Теннис' | 'MMA' | 'Баскетбол' | 'Волейбол' | 'Киберспорт';
export type AdminEventSportFilter = 'all' | 'football' | 'hockey' | 'tennis' | 'mma' | 'basketball' | 'volleyball' | 'esports';
export type AdminSupportState = 'enabled' | 'disabled';
export type AdminEventDateFilter = 'all' | 'today' | 'week' | 'planned' | 'archive';
export type AdminEventTournamentFilter = 'all' | 'league' | 'playoff' | 'fight' | 'special' | 'esports';
export type AdminEventParticipantFilter = 'all' | 'teams' | 'athletes';
export type AdminEventRoomFilter = 'all' | 'active' | 'scheduled' | 'missing' | 'archive';
export type AdminEventRoomState = 'active' | 'scheduled' | 'missing' | 'archive';

export interface AdminEventsKpi {
  id: string;
  label: string;
  value: number;
  delta?: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminEventDonation {
  id: string;
  user: string;
  amount: number;
  side: string;
  at: string;
}

export interface AdminManagedEvent {
  id: string;
  title: string;
  sport: AdminEventSport;
  tournament: string;
  tournamentFilter: AdminEventTournamentFilter;
  participantFilter: AdminEventParticipantFilter;
  participants: string[];
  startsAt: string;
  status: AdminEventStatus;
  support: AdminSupportState;
  room: string;
  roomState: AdminEventRoomState;
  activity: string;
  donationCount: number;
  donationsAmount: number | null;
  audienceCount: number | null;
  audienceNote: string;
  notifications: string;
  moderator: string;
  donationsFeed: AdminEventDonation[];
}

export const adminEventKpis: AdminEventsKpi[] = [
  { id: 'total', label: 'Всего событий', value: 1282, delta: '+34 за неделю', tone: 'blue' },
  { id: 'live', label: 'В эфире сейчас', value: 16, delta: '+3 за час', tone: 'green' },
  { id: 'today', label: 'Сегодня', value: 24, delta: '8 стартуют до 18:00', tone: 'blue' },
  { id: 'finished', label: 'Завершено', value: 1054, delta: '95% без инцидентов', tone: 'slate' },
  { id: 'drafts', label: 'Черновики', value: 18, delta: '5 ждут публикации', tone: 'orange' }
];

export const adminStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'live', label: 'В эфире' },
  { id: 'today', label: 'Сегодня' },
  { id: 'upcoming', label: 'Скоро' },
  { id: 'finished', label: 'Завершено' },
  { id: 'drafts', label: 'Черновики' }
] as const satisfies ReadonlyArray<{ id: AdminEventStatusFilter; label: string }>;

export const adminSportFilters = [
  { id: 'all', label: 'Все виды спорта' },
  { id: 'football', label: 'Футбол' },
  { id: 'hockey', label: 'Хоккей' },
  { id: 'tennis', label: 'Теннис' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' },
  { id: 'volleyball', label: 'Волейбол' },
  { id: 'esports', label: 'Киберспорт' }
] as const satisfies ReadonlyArray<{ id: AdminEventSportFilter; label: string }>;

export const adminDateFilters = [
  { id: 'all', label: 'Все даты' },
  { id: 'today', label: 'Сегодня и эфир' },
  { id: 'week', label: 'Ближайшие 7 дней' },
  { id: 'planned', label: 'План и публикация' },
  { id: 'archive', label: 'Архив событий' }
] as const satisfies ReadonlyArray<{ id: AdminEventDateFilter; label: string }>;

export const adminTournamentFilters = [
  { id: 'all', label: 'Все турниры' },
  { id: 'league', label: 'Лиги и чемпионаты' },
  { id: 'playoff', label: 'Плей-офф и финалы' },
  { id: 'fight', label: 'Бои и шоу' },
  { id: 'special', label: 'Спецсобытия' },
  { id: 'esports', label: 'Киберспорт' }
] as const satisfies ReadonlyArray<{ id: AdminEventTournamentFilter; label: string }>;

export const adminParticipantFilters = [
  { id: 'all', label: 'Все участники' },
  { id: 'teams', label: 'Команды' },
  { id: 'athletes', label: 'Индивидуальные участники' }
] as const satisfies ReadonlyArray<{ id: AdminEventParticipantFilter; label: string }>;

export const adminRoomFilters = [
  { id: 'all', label: 'Все комнаты' },
  { id: 'active', label: 'Активная комната' },
  { id: 'scheduled', label: 'Подготовлена' },
  { id: 'missing', label: 'Без комнаты' },
  { id: 'archive', label: 'Архив' }
] as const satisfies ReadonlyArray<{ id: AdminEventRoomFilter; label: string }>;

export const adminSupportFilters = [
  { id: 'all', label: 'Любая поддержка' },
  { id: 'enabled', label: 'Поддержка включена' },
  { id: 'disabled', label: 'Поддержка отключена' }
] as const satisfies ReadonlyArray<{ id: 'all' | AdminSupportState; label: string }>;

export const adminManagedEvents: AdminManagedEvent[] = [
  {
    id: 'event-frankfurt-bayern',
    title: 'Айнтрахт Франкфурт vs Бавария',
    sport: 'Футбол',
    tournament: 'Бундеслига · Тур 18',
    tournamentFilter: 'league',
    participantFilter: 'teams',
    participants: ['Айнтрахт Франкфурт', 'Бавария'],
    startsAt: '23 мар 2026, 20:00',
    status: 'live',
    support: 'enabled',
    room: 'Матч дня',
    roomState: 'active',
    activity: 'Эфир идёт',
    donationCount: 4560,
    donationsAmount: 482300,
    audienceCount: 1280,
    audienceNote: 'Высокая активность комнаты',
    notifications: 'Push и оповещения комнаты включены',
    moderator: 'Анна Смирнова',
    donationsFeed: [
      { id: 'fd-1', user: 'Алексей', amount: 630, side: 'Айнтрахт Франкфурт', at: '2 мин назад' },
      { id: 'fd-2', user: 'Ольга', amount: 625, side: 'Бавария', at: '4 мин назад' },
      { id: 'fd-3', user: 'Максим', amount: 610, side: 'Айнтрахт Франкфурт', at: '7 мин назад' }
    ]
  },
  {
    id: 'event-khl-final',
    title: 'Локомотив vs Спартак',
    sport: 'Хоккей',
    tournament: 'КХЛ · Кубок Гагарина',
    tournamentFilter: 'playoff',
    participantFilter: 'teams',
    participants: ['Локомотив', 'Спартак'],
    startsAt: '23 мар 2026, 19:30',
    status: 'today',
    support: 'enabled',
    room: 'Плей-офф',
    roomState: 'scheduled',
    activity: 'Старт сегодня',
    donationCount: 2180,
    donationsAmount: 188900,
    audienceCount: 840,
    audienceNote: 'Комната готова к старту',
    notifications: 'Push за 30 минут до старта',
    moderator: 'Егор Лебедев',
    donationsFeed: [
      { id: 'khl-1', user: 'Ирина', amount: 420, side: 'Локомотив', at: '12 мин назад' },
      { id: 'khl-2', user: 'Сергей', amount: 380, side: 'Спартак', at: '16 мин назад' },
      { id: 'khl-3', user: 'Павел', amount: 300, side: 'Локомотив', at: '21 мин назад' }
    ]
  },
  {
    id: 'event-ufc-271',
    title: 'UFC Fight Night 271: Адесанья vs Пфайфер',
    sport: 'MMA',
    tournament: 'UFC Fight Night 271',
    tournamentFilter: 'fight',
    participantFilter: 'athletes',
    participants: ['Адесанья', 'Пфайфер'],
    startsAt: '29 мар 2026, 04:30',
    status: 'upcoming',
    support: 'enabled',
    room: 'Октагон',
    roomState: 'scheduled',
    activity: 'Подготовка эфира',
    donationCount: 2,
    donationsAmount: 500,
    audienceCount: null,
    audienceNote: 'Подписчики ждут старт',
    notifications: 'Push, email и оповещения комнаты готовы',
    moderator: 'Марина Воронова',
    donationsFeed: [
      { id: 'ufc-1', user: 'Дмитрий', amount: 250, side: 'Адесанья', at: 'вчера' },
      { id: 'ufc-2', user: 'Никита', amount: 250, side: 'Пфайфер', at: 'вчера' }
    ]
  },
  {
    id: 'event-euroleague-draft',
    title: 'Шоукейс драфта Евролиги',
    sport: 'Баскетбол',
    tournament: 'Евролига · Спецсобытие',
    tournamentFilter: 'special',
    participantFilter: 'teams',
    participants: ['Маккаби Тель-Авив', 'Партизан'],
    startsAt: '25 мар 2026, 08:00',
    status: 'draft',
    support: 'disabled',
    room: 'Не назначена',
    roomState: 'missing',
    activity: 'Черновик',
    donationCount: 0,
    donationsAmount: null,
    audienceCount: null,
    audienceNote: 'Не опубликовано',
    notifications: 'Не настроены',
    moderator: 'Илья Морозов',
    donationsFeed: []
  },
  {
    id: 'event-miami-open',
    title: 'Miami Open: Сёнмез vs Хаддад Майя',
    sport: 'Теннис',
    tournament: 'WTA 1000 · Майами',
    tournamentFilter: 'league',
    participantFilter: 'athletes',
    participants: ['Сёнмез', 'Хаддад Майя'],
    startsAt: '22 мар 2026, 02:00',
    status: 'finished',
    support: 'enabled',
    room: 'Center Court',
    roomState: 'archive',
    activity: 'Матч завершён',
    donationCount: 1240,
    donationsAmount: 94600,
    audienceCount: 412,
    audienceNote: 'Статистика сохранена',
    notifications: 'Итоговые уведомления отправлены',
    moderator: 'Елена Козлова',
    donationsFeed: [
      { id: 'miami-1', user: 'Екатерина', amount: 500, side: 'Хаддад Майя', at: '2 ч назад' },
      { id: 'miami-2', user: 'Роман', amount: 350, side: 'Сёнмез', at: '3 ч назад' }
    ]
  },
  {
    id: 'event-lakers-pistons',
    title: 'Детройт Пистонс vs Лос-Анджелес Лейкерс',
    sport: 'Баскетбол',
    tournament: 'NBA · Регулярный сезон',
    tournamentFilter: 'league',
    participantFilter: 'teams',
    participants: ['Детройт Пистонс', 'Лос-Анджелес Лейкерс'],
    startsAt: '24 мар 2026, 02:00',
    status: 'today',
    support: 'enabled',
    room: 'NBA Night',
    roomState: 'scheduled',
    activity: 'Старт сегодня',
    donationCount: 1980,
    donationsAmount: 176400,
    audienceCount: 690,
    audienceNote: 'Комната прогрета уведомлениями',
    notifications: 'Push за 10 минут до старта',
    moderator: 'Павел Орлов',
    donationsFeed: [
      { id: 'nba-1', user: 'Игорь', amount: 600, side: 'Лос-Анджелес Лейкерс', at: '9 мин назад' },
      { id: 'nba-2', user: 'Юлия', amount: 450, side: 'Детройт Пистонс', at: '14 мин назад' }
    ]
  },
  {
    id: 'event-valorant-cup',
    title: 'Dragon Ranger Gaming vs Any Questions Gaming',
    sport: 'Киберспорт',
    tournament: 'Valorant · China Evolution Series',
    tournamentFilter: 'esports',
    participantFilter: 'teams',
    participants: ['Dragon Ranger Gaming', 'Any Questions Gaming'],
    startsAt: '24 мар 2026, 12:00',
    status: 'upcoming',
    support: 'disabled',
    room: 'Valorant Preview',
    roomState: 'scheduled',
    activity: 'Ждёт публикации',
    donationCount: 0,
    donationsAmount: null,
    audienceCount: null,
    audienceNote: 'Часть аудитории импортирована',
    notifications: 'Запуск по расписанию',
    moderator: 'Олег Смирнов',
    donationsFeed: []
  },
  {
    id: 'event-vnl',
    title: 'Франция Pro vs Бельгия Pro',
    sport: 'Волейбол',
    tournament: 'Лига наций · Волейбол',
    tournamentFilter: 'league',
    participantFilter: 'teams',
    participants: ['Франция Pro', 'Бельгия Pro'],
    startsAt: '23 мар 2026, 17:30',
    status: 'live',
    support: 'enabled',
    room: 'Arena Pulse',
    roomState: 'active',
    activity: 'Эфир идёт',
    donationCount: 3140,
    donationsAmount: 264180,
    audienceCount: 930,
    audienceNote: 'Поддержка растёт по ходу матча',
    notifications: 'Оповещения эфира активны',
    moderator: 'Наталья Фролова',
    donationsFeed: [
      { id: 'vnl-1', user: 'Мила', amount: 410, side: 'Франция Pro', at: '1 мин назад' },
      { id: 'vnl-2', user: 'Даниил', amount: 390, side: 'Бельгия Pro', at: '3 мин назад' }
    ]
  }
];
