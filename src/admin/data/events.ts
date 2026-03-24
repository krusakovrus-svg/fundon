export type AdminEventStatus = 'live' | 'today' | 'upcoming' | 'finished' | 'archived' | 'draft';
export type AdminEventStatusFilter = 'all' | 'live' | 'today' | 'upcoming' | 'finished' | 'archived' | 'drafts';
export type AdminEventSport = 'Футбол' | 'Хоккей' | 'Теннис' | 'MMA' | 'Баскетбол' | 'Волейбол' | 'Киберспорт';
export type AdminEventSportFilter = 'all' | 'football' | 'hockey' | 'tennis' | 'mma' | 'basketball' | 'volleyball' | 'esports';
export type AdminSupportState = 'live' | 'post-event' | 'disabled';
export type AdminEventDateFilter = 'all' | 'today' | 'week' | 'planned' | 'archive';
export type AdminEventTournamentFilter = 'all' | 'league' | 'playoff' | 'fight' | 'special' | 'esports';
export type AdminEventParticipantFilter = 'all' | 'teams' | 'athletes';
export type AdminEventRoomFilter = 'all' | 'active' | 'scheduled' | 'missing' | 'archive';
export type AdminEventRoomState = 'active' | 'scheduled' | 'missing' | 'archive';
export type AdminEventMobileFieldStatus = 'ready' | 'warning';

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

export interface AdminEventMobileField {
  id: string;
  label: string;
  value: string;
  status: AdminEventMobileFieldStatus;
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
  archiveVisible: boolean;
  postEventSupportEnabled: boolean;
  archiveWindowHours: number;
  archiveSupportRemaining: string;
  archiveVisibilityLabel: string;
  stage: string;
  arena: string;
  liveDataStatus: string;
  supportSides: string;
  mobileFields: AdminEventMobileField[];
}

export const adminEventKpis: AdminEventsKpi[] = [
  { id: 'total', label: 'Всего событий', value: 1282, delta: '+34 за неделю', tone: 'blue' },
  { id: 'live', label: 'В эфире сейчас', value: 16, delta: '+3 за час', tone: 'green' },
  { id: 'today', label: 'Сегодня', value: 24, delta: '8 стартуют до 18:00', tone: 'blue' },
  { id: 'finished', label: 'Завершено', value: 1054, delta: '46 доступны в архиве', tone: 'slate' },
  { id: 'drafts', label: 'Черновики', value: 18, delta: '5 ждут публикации', tone: 'orange' }
];

export const adminStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'live', label: 'В эфире' },
  { id: 'today', label: 'Сегодня' },
  { id: 'upcoming', label: 'Скоро' },
  { id: 'finished', label: 'Завершено' },
  { id: 'archived', label: 'В архиве' },
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
  { id: 'live', label: 'Live-поддержка' },
  { id: 'post-event', label: 'Post-event' },
  { id: 'disabled', label: 'Отключена' }
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
    support: 'live',
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
    ],
    archiveVisible: false,
    postEventSupportEnabled: true,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Будет доступно 24 часа после финального свистка',
    archiveVisibilityLabel: 'Появится в Архиве событий после завершения',
    stage: '2-й тайм · 74 мин',
    arena: 'Deutsche Bank Park · Франкфурт',
    liveDataStatus: '5/5 полей готовы для mobile live',
    supportSides: 'Команда 1 / Команда 2',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Две стороны синхронизированы', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'В эфире', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: '2-й тайм · 74 мин', status: 'ready' },
      { id: 'arena', label: 'Арена / локация', value: 'Deutsche Bank Park · Франкфурт', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Айнтрахт / Бавария', status: 'ready' }
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
    support: 'live',
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
    ],
    archiveVisible: false,
    postEventSupportEnabled: true,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'После финала останется 24 часа на поддержку',
    archiveVisibilityLabel: 'Автоматически попадёт в Архив событий',
    stage: 'Ожидает старт',
    arena: 'Арена-2000 · Ярославль',
    liveDataStatus: '4/5 полей готовы, таймер подтянется после старта',
    supportSides: 'Команда 1 / Команда 2',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Локомотив / Спартак', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Сегодня в 19:30', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Пре-матч, таймер ждёт старт', status: 'warning' },
      { id: 'arena', label: 'Арена / локация', value: 'Арена-2000 · Ярославль', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Локомотив / Спартак', status: 'ready' }
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
    support: 'live',
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
    ],
    archiveVisible: false,
    postEventSupportEnabled: true,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Post-event окно откроется после финиша',
    archiveVisibilityLabel: 'Покажем в Архиве событий при завершении',
    stage: 'Main card',
    arena: 'UFC Apex · Лас-Вегас',
    liveDataStatus: '5/5 полей готовы',
    supportSides: 'Красный угол / Синий угол',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Адесанья / Пфайфер', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Скоро', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Main card', status: 'ready' },
      { id: 'arena', label: 'Арена / локация', value: 'UFC Apex · Лас-Вегас', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Красный угол / Синий угол', status: 'ready' }
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
    donationsFeed: [],
    archiveVisible: false,
    postEventSupportEnabled: false,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Появится после публикации и завершения',
    archiveVisibilityLabel: 'Пока скрыто от Архива событий',
    stage: 'Draft setup',
    arena: 'Локация не задана',
    liveDataStatus: '2/5 полей заполнены',
    supportSides: 'Не настроены',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Маккаби / Партизан', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Черновик', status: 'warning' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Не задано', status: 'warning' },
      { id: 'arena', label: 'Арена / локация', value: 'Не задано', status: 'warning' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Не назначены', status: 'warning' }
    ]
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
    support: 'post-event',
    room: 'Center Court',
    roomState: 'archive',
    activity: 'Post-event поддержка активна',
    donationCount: 1240,
    donationsAmount: 94600,
    audienceCount: 412,
    audienceNote: 'Итоговая статистика сохранена',
    notifications: 'Итоговые уведомления и архивный push отправлены',
    moderator: 'Елена Козлова',
    donationsFeed: [
      { id: 'miami-1', user: 'Екатерина', amount: 500, side: 'Хаддад Майя', at: '2 ч назад' },
      { id: 'miami-2', user: 'Роман', amount: 350, side: 'Сёнмез', at: '3 ч назад' }
    ],
    archiveVisible: true,
    postEventSupportEnabled: true,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Открыто ещё 18 часов',
    archiveVisibilityLabel: 'Показывается в Архиве событий',
    stage: 'Матч завершён · 2:1',
    arena: 'Hard Rock Stadium · Майами',
    liveDataStatus: '5/5 полей сохранены',
    supportSides: 'Игрок 1 / Игрок 2',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Сёнмез / Хаддад Майя', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Завершено', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Финальный сет · 2:1', status: 'ready' },
      { id: 'arena', label: 'Арена / локация', value: 'Hard Rock Stadium · Майами', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Сёнмез / Хаддад Майя', status: 'ready' }
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
    startsAt: '22 мар 2026, 02:00',
    status: 'archived',
    support: 'disabled',
    room: 'NBA Night',
    roomState: 'archive',
    activity: 'Окно поддержки закрыто',
    donationCount: 1980,
    donationsAmount: 176400,
    audienceCount: 690,
    audienceNote: 'Архив закрыт для новых донатов',
    notifications: 'Архивный показ отключён',
    moderator: 'Павел Орлов',
    donationsFeed: [
      { id: 'nba-1', user: 'Игорь', amount: 600, side: 'Лос-Анджелес Лейкерс', at: '25 ч назад' },
      { id: 'nba-2', user: 'Юлия', amount: 450, side: 'Детройт Пистонс', at: '26 ч назад' }
    ],
    archiveVisible: false,
    postEventSupportEnabled: false,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Окно поддержки закрыто 1 час назад',
    archiveVisibilityLabel: 'Скрыто из Архива событий',
    stage: 'Матч завершён · 98:109',
    arena: 'Little Caesars Arena · Детройт',
    liveDataStatus: '5/5 полей сохранены',
    supportSides: 'Команда 1 / Команда 2',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Пистонс / Лейкерс', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Архивировано', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Финальный счёт 98:109', status: 'ready' },
      { id: 'arena', label: 'Арена / локация', value: 'Little Caesars Arena · Детройт', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Пистонс / Лейкерс', status: 'ready' }
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
    donationsFeed: [],
    archiveVisible: false,
    postEventSupportEnabled: false,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Пост-эфирное окно не запланировано',
    archiveVisibilityLabel: 'Не попадёт в Архив событий',
    stage: 'Pre-show',
    arena: 'Shanghai Studio',
    liveDataStatus: '3/5 полей готовы',
    supportSides: 'Команда 1 / Команда 2',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Dragon Ranger / Any Questions', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'Скоро', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: 'Нужно добавить формат bo5', status: 'warning' },
      { id: 'arena', label: 'Арена / локация', value: 'Shanghai Studio', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Команды не промаркированы цветами', status: 'warning' }
    ]
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
    support: 'live',
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
    ],
    archiveVisible: false,
    postEventSupportEnabled: true,
    archiveWindowHours: 24,
    archiveSupportRemaining: 'Откроется после финального розыгрыша',
    archiveVisibilityLabel: 'Покажется в Архиве событий',
    stage: '3-й сет · 18:17',
    arena: 'Arena Pulse · Брюссель',
    liveDataStatus: '5/5 полей готовы для mobile live',
    supportSides: 'Франция / Бельгия',
    mobileFields: [
      { id: 'participants', label: 'Участники', value: 'Франция / Бельгия', status: 'ready' },
      { id: 'live-status', label: 'Live-статус', value: 'В эфире', status: 'ready' },
      { id: 'stage', label: 'Стадия / раунд', value: '3-й сет · 18:17', status: 'ready' },
      { id: 'arena', label: 'Арена / локация', value: 'Arena Pulse · Брюссель', status: 'ready' },
      { id: 'support-sides', label: 'Стороны поддержки', value: 'Франция / Бельгия', status: 'ready' }
    ]
  }
];
