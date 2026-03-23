export type AdminRoomStatus = 'active' | 'limited' | 'closed' | 'archived';
export type AdminRoomActivity = 'high' | 'medium' | 'low';
export type AdminRoomType = 'watch' | 'fan' | 'vip' | 'support';
export type AdminRoomEventState = 'live' | 'today' | 'planned' | 'archive';

export interface AdminRoomsKpi {
  id: string;
  label: string;
  value: number;
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminRoomModerationNote {
  id: string;
  text: string;
  at: string;
}

export interface AdminManagedRoom {
  id: string;
  name: string;
  type: AdminRoomType;
  event: string;
  eventState: AdminRoomEventState;
  eventMeta: string;
  participants: number;
  participantNote: string;
  activity: AdminRoomActivity;
  activitySummary: string;
  status: AdminRoomStatus;
  complaints: number;
  complaintSummary: string;
  createdAt: string;
  summary: string;
  moderator: string;
  moderatorRole: string;
  notes: AdminRoomModerationNote[];
}

export const adminRoomsKpis: AdminRoomsKpi[] = [
  { id: 'total', label: 'Всего комнат', value: 328, hint: '12 новых за сутки', tone: 'blue' },
  { id: 'active', label: 'Активные сейчас', value: 42, hint: '18 связаны с эфиром', tone: 'green' },
  { id: 'new', label: 'Новые за 7 дней', value: 16, hint: '7 ждут запуска', tone: 'orange' },
  { id: 'archived', label: 'Закрытые / архивные', value: 87, hint: '14 переведены за неделю', tone: 'slate' }
];

export const adminRoomStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'active', label: 'Активна' },
  { id: 'limited', label: 'Ограничена' },
  { id: 'closed', label: 'Закрыта' },
  { id: 'archived', label: 'Архивная' }
] as const;

export const adminRoomEventFilters = [
  { id: 'all', label: 'Все события' },
  { id: 'live', label: 'Эфирные события' },
  { id: 'today', label: 'Сегодня' },
  { id: 'planned', label: 'Скоро' },
  { id: 'archive', label: 'Архив' }
] as const;

export const adminRoomTypeFilters = [
  { id: 'all', label: 'Все типы' },
  { id: 'watch', label: 'Комната просмотра' },
  { id: 'fan', label: 'Фан-комната' },
  { id: 'vip', label: 'VIP-комната' },
  { id: 'support', label: 'Комната поддержки' }
] as const;

export const adminRoomParticipantFilters = [
  { id: 'all', label: 'Все размеры' },
  { id: 'small', label: 'До 100 участников' },
  { id: 'medium', label: '100–250 участников' },
  { id: 'large', label: 'Более 250 участников' }
] as const;

export const adminRoomActivityFilters = [
  { id: 'all', label: 'Любая активность' },
  { id: 'high', label: 'Высокая' },
  { id: 'medium', label: 'Средняя' },
  { id: 'low', label: 'Низкая' }
] as const;

export const adminRoomModerationFilters = [
  { id: 'all', label: 'Все жалобы' },
  { id: 'clean', label: 'Без жалоб' },
  { id: 'review', label: 'Есть сигналы' },
  { id: 'critical', label: 'Высокий риск' }
] as const;

export const adminManagedRooms: AdminManagedRoom[] = [
  {
    id: 'room-matchday',
    name: 'Матч дня',
    type: 'watch',
    event: 'Спартак vs Зенит',
    eventState: 'live',
    eventMeta: 'В эфире · футбол',
    participants: 254,
    participantNote: 'Быстрый рост во втором тайме',
    activity: 'high',
    activitySummary: 'Высокая активность',
    status: 'active',
    complaints: 2,
    complaintSummary: 'Нужен контроль входящего потока',
    createdAt: '23 мар 2026',
    summary: 'Главная комната футбольного прайма с быстрым ростом поддержки и высокой конверсией в донат.',
    moderator: 'Мария Лапина',
    moderatorRole: 'Старший модератор',
    notes: [
      { id: 'matchday-1', text: 'Проверить всплеск жалоб после начала второго тайма.', at: '20 мин назад' },
      { id: 'matchday-2', text: 'Усилить закреп с правилами для новых участников.', at: 'Сегодня' }
    ]
  },
  {
    id: 'room-ringwatch',
    name: 'Ring Watch',
    type: 'support',
    event: 'UFC Fight Night 271',
    eventState: 'planned',
    eventMeta: 'Скоро · MMA',
    participants: 189,
    participantNote: 'Ожидает старт эфира',
    activity: 'medium',
    activitySummary: 'Средняя активность',
    status: 'limited',
    complaints: 3,
    complaintSummary: 'Есть повторяющиеся сигналы',
    createdAt: '24 мар 2026',
    summary: 'Комната поддержки для боёв, временно ограничена из-за повторяющихся конфликтов в обсуждении.',
    moderator: 'Егор Левин',
    moderatorRole: 'Модератор трансляций',
    notes: [
      { id: 'ring-1', text: 'Ограничить новые сообщения до ручной проверки.', at: '1 час назад' },
      { id: 'ring-2', text: 'Повторная жалоба на токсичное сообщение.', at: 'Сегодня' }
    ]
  },
  {
    id: 'room-center-court',
    name: 'Center Court',
    type: 'vip',
    event: 'Miami Open',
    eventState: 'today',
    eventMeta: 'Сегодня · теннис',
    participants: 92,
    participantNote: 'Премиальный сегмент',
    activity: 'medium',
    activitySummary: 'Стабильная активность',
    status: 'active',
    complaints: 0,
    complaintSummary: 'Жалоб нет',
    createdAt: '22 мар 2026',
    summary: 'Премиальная теннисная комната с высокой долей повторных донатов и стабильной модерацией.',
    moderator: 'Анна Светлова',
    moderatorRole: 'VIP-модератор',
    notes: [{ id: 'court-1', text: 'Добавить напоминание о старте центрального матча.', at: 'Вчера' }]
  },
  {
    id: 'room-nba-night',
    name: 'NBA Night',
    type: 'fan',
    event: 'Детройт Пистонс vs Лос-Анджелес Лейкерс',
    eventState: 'today',
    eventMeta: 'Сегодня · баскетбол',
    participants: 231,
    participantNote: 'Пик ожидается к старту матча',
    activity: 'high',
    activitySummary: 'Высокая активность',
    status: 'active',
    complaints: 1,
    complaintSummary: 'Единичные сигналы без эскалации',
    createdAt: '21 мар 2026',
    summary: 'Большая фан-комната для ночного баскетбольного слота, активность растёт ближе к старту матчей.',
    moderator: 'Роман Поляков',
    moderatorRole: 'Комьюнити-менеджер',
    notes: [
      { id: 'nba-1', text: 'Оставить комнату закреплённой на главном экране.', at: 'Сегодня' },
      { id: 'nba-2', text: 'Одна жалоба на оффтоп без риска для комнаты.', at: 'Вчера' }
    ]
  },
  {
    id: 'room-cage-archive',
    name: 'Cage Classics',
    type: 'fan',
    event: 'Архив UFC 270',
    eventState: 'archive',
    eventMeta: 'Архив · MMA',
    participants: 76,
    participantNote: 'Комната хранится для истории',
    activity: 'low',
    activitySummary: 'Низкая активность',
    status: 'archived',
    complaints: 0,
    complaintSummary: 'Жалоб нет',
    createdAt: '18 фев 2026',
    summary: 'Архивная комната по прошлому турниру, сохранена для истории и повторного использования шаблонов.',
    moderator: 'Система',
    moderatorRole: 'Автоперевод в архив',
    notes: [{ id: 'cage-1', text: 'Комната закрыта после окончания промо-цикла.', at: '2 недели назад' }]
  },
  {
    id: 'room-f1-garage',
    name: 'F1 Garage',
    type: 'support',
    event: 'Гран-при Японии 2026',
    eventState: 'planned',
    eventMeta: 'Скоро · Формула 1',
    participants: 144,
    participantNote: 'Поддержка откроется к квалификации',
    activity: 'low',
    activitySummary: 'Низкая активность',
    status: 'closed',
    complaints: 1,
    complaintSummary: 'Есть единичная жалоба',
    createdAt: '20 мар 2026',
    summary: 'Комната выбора победителя Формулы 1, временно закрыта до открытия предгоночной поддержки.',
    moderator: 'Дарья Волкова',
    moderatorRole: 'Операционный менеджер',
    notes: [{ id: 'garage-1', text: 'Открыть заново ближе к старту квалификации.', at: 'Сегодня' }]
  }
];
