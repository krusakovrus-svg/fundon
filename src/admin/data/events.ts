export type AdminEventStatus = 'live' | 'today' | 'upcoming' | 'finished' | 'draft';
export type AdminEventSport = 'Футбол' | 'Хоккей' | 'Теннис' | 'MMA' | 'Баскетбол' | 'Волейбол' | 'Киберспорт';
export type AdminEventSportFilter = 'all' | 'football' | 'hockey' | 'tennis' | 'mma' | 'basketball' | 'volleyball' | 'esports';
export type AdminSupportState = 'enabled' | 'disabled';

export interface AdminEventsKpi {
  id: string;
  label: string;
  value: string;
  delta?: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminEventDonation {
  id: string;
  user: string;
  amount: string;
  side: string;
  at: string;
}

export interface AdminManagedEvent {
  id: string;
  title: string;
  sport: AdminEventSport;
  tournament: string;
  participants: string[];
  startsAt: string;
  status: AdminEventStatus;
  support: AdminSupportState;
  room: string;
  activity: string;
  donations: string;
  audience: string;
  notifications: string;
  moderator: string;
  donationsFeed: AdminEventDonation[];
}

export const adminEventKpis: AdminEventsKpi[] = [
  { id: 'total', label: 'Всего событий', value: '1,282', delta: '+34 за неделю', tone: 'blue' },
  { id: 'live', label: 'Live сейчас', value: '16', delta: '+3 за час', tone: 'green' },
  { id: 'today', label: 'Сегодня', value: '24', delta: '8 стартуют до 18:00', tone: 'blue' },
  { id: 'finished', label: 'Завершено', value: '1,054', delta: '94% без инцидентов', tone: 'slate' },
  { id: 'drafts', label: 'Черновики', value: '18', delta: '5 ждут публикации', tone: 'orange' }
];

export const adminStatusFilters = [
  { id: 'all', label: 'Все' },
  { id: 'live', label: 'В эфире' },
  { id: 'today', label: 'Сегодня' },
  { id: 'upcoming', label: 'Скоро' },
  { id: 'finished', label: 'Завершено' },
  { id: 'drafts', label: 'Черновики' }
] as const;

export const adminSportFilters: Array<{ id: AdminEventSportFilter; label: string }> = [
  { id: 'all', label: 'Все виды спорта' },
  { id: 'football', label: 'Футбол' },
  { id: 'hockey', label: 'Хоккей' },
  { id: 'tennis', label: 'Теннис' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' },
  { id: 'volleyball', label: 'Волейбол' },
  { id: 'esports', label: 'Киберспорт' }
];

export const adminManagedEvents: AdminManagedEvent[] = [
  {
    id: 'event-frankfurt-bayern',
    title: 'FC Frankfurt vs Bayern Munich',
    sport: 'Футбол',
    tournament: 'Bundesliga · Matchday 18',
    participants: ['FC Frankfurt', 'Bayern Munich'],
    startsAt: '18 июл 2024, 20:00',
    status: 'live',
    support: 'enabled',
    room: 'Матч дня',
    activity: '4,560 донатов',
    donations: '₽482,300',
    audience: '1,280 зрителей',
    notifications: 'Push и room-оповещения включены',
    moderator: 'Анна Смирнова',
    donationsFeed: [
      { id: 'fd-1', user: 'Алексей', amount: '₽630', side: 'FC Frankfurt', at: '2 мин назад' },
      { id: 'fd-2', user: 'Ольга', amount: '₽625', side: 'Bayern Munich', at: '4 мин назад' },
      { id: 'fd-3', user: 'Max', amount: '₽610', side: 'FC Frankfurt', at: '7 мин назад' }
    ]
  },
  {
    id: 'event-khl-final',
    title: 'Lokomotiv vs Spartak',
    sport: 'Хоккей',
    tournament: 'КХЛ · Кубок Гагарина',
    participants: ['Lokomotiv', 'Spartak'],
    startsAt: '18 июл 2024, 19:30',
    status: 'today',
    support: 'enabled',
    room: 'Плей-офф LIVE',
    activity: '2,180 донатов',
    donations: '₽188,900',
    audience: '840 зрителей',
    notifications: 'Пуш за 30 минут до старта',
    moderator: 'Егор Лебедев',
    donationsFeed: [
      { id: 'khl-1', user: 'Ирина', amount: '₽420', side: 'Lokomotiv', at: '12 мин назад' },
      { id: 'khl-2', user: 'Сергей', amount: '₽380', side: 'Spartak', at: '16 мин назад' },
      { id: 'khl-3', user: 'Pavel', amount: '₽300', side: 'Lokomotiv', at: '21 мин назад' }
    ]
  },
  {
    id: 'event-ufc-271',
    title: 'UFC Fight Night 271: Adesanya vs Pfeifer',
    sport: 'MMA',
    tournament: 'UFC Fight Night 271',
    participants: ['Adesanya', 'Pfeifer'],
    startsAt: '29 мар 2026, 04:30',
    status: 'upcoming',
    support: 'enabled',
    room: 'Октагон',
    activity: 'Запланировано',
    donations: '—',
    audience: 'Подписчики ждут старт',
    notifications: 'Push, email и комната готовы',
    moderator: 'Марина Воронова',
    donationsFeed: [
      { id: 'ufc-1', user: 'Dima', amount: '₽250', side: 'Adesanya', at: 'вчера' },
      { id: 'ufc-2', user: 'Никита', amount: '₽250', side: 'Pfeifer', at: 'вчера' }
    ]
  },
  {
    id: 'event-euroleague-draft',
    title: 'Euroleague Draft Showcase',
    sport: 'Баскетбол',
    tournament: 'Euroleague · Special Event',
    participants: ['Maccabi Tel Aviv', 'Partizan'],
    startsAt: '29 мар 2026, 08:00',
    status: 'draft',
    support: 'disabled',
    room: '—',
    activity: 'Черновик',
    donations: '—',
    audience: 'Не опубликовано',
    notifications: 'Не настроены',
    moderator: 'Илья Морозов',
    donationsFeed: []
  },
  {
    id: 'event-miami-open',
    title: 'Miami Open: Sonmez vs Haddad Maia',
    sport: 'Теннис',
    tournament: 'WTA1000 · Miami',
    participants: ['Sonmez', 'Haddad Maia'],
    startsAt: '27 мар 2026, 02:00',
    status: 'finished',
    support: 'enabled',
    room: 'Center Court',
    activity: '1,240 донатов',
    donations: '₽94,600',
    audience: '412 зрителей',
    notifications: 'Отправлены',
    moderator: 'Елена Козлова',
    donationsFeed: [
      { id: 'miami-1', user: 'Kate', amount: '₽500', side: 'Haddad Maia', at: '2 ч назад' },
      { id: 'miami-2', user: 'Roma', amount: '₽350', side: 'Sonmez', at: '3 ч назад' }
    ]
  },
  {
    id: 'event-lakers-pistons',
    title: 'Detroit Pistons vs Los Angeles Lakers',
    sport: 'Баскетбол',
    tournament: 'NBA',
    participants: ['Detroit Pistons', 'Los Angeles Lakers'],
    startsAt: '24 мар 2026, 02:00',
    status: 'today',
    support: 'enabled',
    room: 'NBA Night',
    activity: '1,980 донатов',
    donations: '₽176,400',
    audience: '690 зрителей',
    notifications: 'Push за 10 минут до старта',
    moderator: 'Павел Орлов',
    donationsFeed: [
      { id: 'nba-1', user: 'Игорь', amount: '₽600', side: 'Los Angeles Lakers', at: '9 мин назад' },
      { id: 'nba-2', user: 'Юлия', amount: '₽450', side: 'Detroit Pistons', at: '14 мин назад' }
    ]
  },
  {
    id: 'event-valorant-cup',
    title: 'Dragon Ranger Gaming vs Any Questions Gaming',
    sport: 'Киберспорт',
    tournament: 'Valorant · China Evolution Series',
    participants: ['Dragon Ranger Gaming', 'Any Questions Gaming'],
    startsAt: '24 мар 2026, 12:00',
    status: 'upcoming',
    support: 'disabled',
    room: 'Valorant Preview',
    activity: 'Ожидает публикации',
    donations: '—',
    audience: 'Часть аудитории импортирована',
    notifications: 'Запуск по расписанию',
    moderator: 'Олег Смирнов',
    donationsFeed: []
  },
  {
    id: 'event-vnl',
    title: 'France Pro vs Belgium Pro',
    sport: 'Волейбол',
    tournament: 'UPVL · Лига Наций',
    participants: ['France Pro', 'Belgium Pro'],
    startsAt: '18 июл 2024, 17:30',
    status: 'live',
    support: 'enabled',
    room: 'Arena Pulse',
    activity: '3,140 донатов',
    donations: '₽264,180',
    audience: '930 зрителей',
    notifications: 'Live-оповещения активны',
    moderator: 'Наталья Фролова',
    donationsFeed: [
      { id: 'vnl-1', user: 'Mila', amount: '₽410', side: 'France Pro', at: '1 мин назад' },
      { id: 'vnl-2', user: 'Dan', amount: '₽390', side: 'Belgium Pro', at: '3 мин назад' }
    ]
  }
];
