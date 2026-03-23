export type AdminRoomStatus = 'active' | 'limited' | 'closed' | 'archived';
export type AdminRoomActivity = 'high' | 'medium' | 'low';
export type AdminRoomType = 'watch' | 'fan' | 'vip' | 'support';

export interface AdminRoomsKpi {
  id: string;
  label: string;
  value: string;
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
  participants: number;
  activity: AdminRoomActivity;
  status: AdminRoomStatus;
  complaints: number;
  createdAt: string;
  summary: string;
  moderator: string;
  linkedEventStatus: string;
  notes: AdminRoomModerationNote[];
}

export const adminRoomsKpis: AdminRoomsKpi[] = [
  { id: 'total', label: 'Всего комнат', value: '328', hint: '12 новых за сутки', tone: 'blue' },
  { id: 'active', label: 'Активные сейчас', value: '42', hint: '18 связаны с live', tone: 'green' },
  { id: 'new', label: 'Новые за 7 дней', value: '16', hint: '7 ждут публикации', tone: 'orange' },
  { id: 'archived', label: 'Закрытые / архивные', value: '87', hint: '14 в архиве недели', tone: 'slate' }
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
  { id: 'live', label: 'Live-события' },
  { id: 'football', label: 'Футбол' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' }
] as const;

export const adminRoomTypeFilters = [
  { id: 'all', label: 'Все типы' },
  { id: 'watch', label: 'Watch room' },
  { id: 'fan', label: 'Фан-комната' },
  { id: 'vip', label: 'VIP-комната' },
  { id: 'support', label: 'Support room' }
] as const;

export const adminRoomParticipantFilters = [
  { id: 'all', label: 'Все размеры' },
  { id: 'small', label: 'До 100 участников' },
  { id: 'medium', label: '100–250 участников' },
  { id: 'large', label: '250+ участников' }
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
  { id: 'review', label: 'Требуют проверки' },
  { id: 'critical', label: 'Высокий риск' }
] as const;

export const adminManagedRooms: AdminManagedRoom[] = [
  {
    id: 'room-matchday',
    name: 'Матч дня',
    type: 'watch',
    event: 'Спартак vs Зенит',
    participants: 254,
    activity: 'high',
    status: 'active',
    complaints: 2,
    createdAt: 'Сегодня',
    summary: 'Главная комната футбольного прайма с быстрым ростом поддержки и высокой конверсией в донат.',
    moderator: 'Мария Лапина',
    linkedEventStatus: 'Live · футбол',
    notes: [
      { id: 'matchday-1', text: 'Проверить всплеск жалоб после начала второго тайма', at: '20 мин назад' },
      { id: 'matchday-2', text: 'Усилить закреп с правилами для новых участников', at: 'Сегодня' }
    ]
  },
  {
    id: 'room-ringwatch',
    name: 'Ring Watch',
    type: 'support',
    event: 'UFC Fight Night 271',
    participants: 189,
    activity: 'medium',
    status: 'limited',
    complaints: 3,
    createdAt: '24.03.2026',
    summary: 'Комната поддержки для боёв, временно ограничена из-за повторяющихся конфликтов в обсуждении.',
    moderator: 'Егор Левин',
    linkedEventStatus: 'Upcoming · MMA',
    notes: [
      { id: 'ring-1', text: 'Ограничить новые сообщения до ручной проверки', at: '1 час назад' },
      { id: 'ring-2', text: 'Повторная жалоба на токсичное сообщение', at: 'Сегодня' }
    ]
  },
  {
    id: 'room-center-court',
    name: 'Center Court',
    type: 'vip',
    event: 'Miami Open',
    participants: 92,
    activity: 'medium',
    status: 'active',
    complaints: 0,
    createdAt: '22.03.2026',
    summary: 'Премиальная теннисная комната с высокой долей повторных донатов и стабильной модерацией.',
    moderator: 'Анна Светлова',
    linkedEventStatus: 'Сегодня · теннис',
    notes: [
      { id: 'court-1', text: 'Добавить напоминание о старте центрального матча', at: 'Вчера' }
    ]
  },
  {
    id: 'room-nba-night',
    name: 'NBA Night',
    type: 'fan',
    event: 'Detroit Pistons vs Los Angeles Lakers',
    participants: 231,
    activity: 'high',
    status: 'active',
    complaints: 1,
    createdAt: '21.03.2026',
    summary: 'Большая фан-комната для ночного баскетбольного слота, активность растёт ближе к старту матчей.',
    moderator: 'Роман Поляков',
    linkedEventStatus: 'Today · NBA',
    notes: [
      { id: 'nba-1', text: 'Оставить room pinned в блоке Home', at: 'Сегодня' },
      { id: 'nba-2', text: 'Одна жалоба на оффтоп без риска для комнаты', at: 'Вчера' }
    ]
  },
  {
    id: 'room-cage-archive',
    name: 'Cage Classics',
    type: 'fan',
    event: 'Архив UFC 270',
    participants: 76,
    activity: 'low',
    status: 'archived',
    complaints: 0,
    createdAt: '18.02.2026',
    summary: 'Архивная комната по прошлому турниру, сохранена для истории и повторного использования шаблонов.',
    moderator: 'Система',
    linkedEventStatus: 'Архив · MMA',
    notes: [
      { id: 'cage-1', text: 'Комната закрыта после окончания промо-цикла', at: '2 недели назад' }
    ]
  },
  {
    id: 'room-f1-garage',
    name: 'F1 Garage',
    type: 'support',
    event: 'Гран-при Японии 2026',
    participants: 144,
    activity: 'low',
    status: 'closed',
    complaints: 1,
    createdAt: '20.03.2026',
    summary: 'Комната выбора победителя Формулы 1, временно закрыта до открытия предгоночной поддержки.',
    moderator: 'Дарья Волкова',
    linkedEventStatus: 'Upcoming · Formula 1',
    notes: [
      { id: 'garage-1', text: 'Открыть заново ближе к старту квалификации', at: 'Сегодня' }
    ]
  }
];
