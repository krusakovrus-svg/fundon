export type AdminNotificationStatus = 'sent' | 'scheduled' | 'error' | 'draft';
export type AdminNotificationType = 'push' | 'email' | 'room' | 'live';
export type AdminNotificationAudience = 'all' | 'favorites' | 'vip' | 'room' | 'event';

export interface AdminNotificationsKpi {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminNotificationLogItem {
  id: string;
  title: string;
  at: string;
}

export interface AdminManagedNotification {
  id: string;
  name: string;
  type: AdminNotificationType;
  audience: AdminNotificationAudience;
  audienceLabel: string;
  event: string;
  status: AdminNotificationStatus;
  scheduledAt: string;
  delivered: string;
  openRate: string;
  summary: string;
  message: string;
  template: string;
  errorDetails: string;
  logs: AdminNotificationLogItem[];
}

export const adminNotificationsKpis: AdminNotificationsKpi[] = [
  { id: 'sent', label: 'Отправлено сегодня', value: '186', hint: '+12% к вчера', tone: 'blue' },
  { id: 'scheduled', label: 'Ожидают отправки', value: '24', hint: '8 стартуют в live', tone: 'green' },
  { id: 'errors', label: 'Ошибки доставки', value: '7', hint: '2 требуют проверки', tone: 'orange' },
  { id: 'templates', label: 'Активные шаблоны', value: '19', hint: '4 обновлены сегодня', tone: 'slate' }
];

export const adminNotificationTypeFilters = [
  { id: 'all', label: 'Все типы' },
  { id: 'push', label: 'Push' },
  { id: 'email', label: 'Email' },
  { id: 'room', label: 'Комната' },
  { id: 'live', label: 'Live' }
] as const;

export const adminNotificationStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'sent', label: 'Отправлено' },
  { id: 'scheduled', label: 'Запланировано' },
  { id: 'error', label: 'Ошибка' },
  { id: 'draft', label: 'Черновик' }
] as const;

export const adminNotificationEventFilters = [
  { id: 'all', label: 'Все события' },
  { id: 'football', label: 'Футбол' },
  { id: 'mma', label: 'MMA' },
  { id: 'basketball', label: 'Баскетбол' },
  { id: 'formula1', label: 'Formula 1' }
] as const;

export const adminNotificationAudienceFilters = [
  { id: 'all', label: 'Все сегменты' },
  { id: 'favorites', label: 'Избранное' },
  { id: 'vip', label: 'VIP' },
  { id: 'room', label: 'Комнаты' },
  { id: 'event', label: 'Участники события' }
] as const;

export const adminNotificationDateFilters = [
  { id: 'all', label: 'Любая дата' },
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: '7 дней' },
  { id: 'month', label: '30 дней' }
] as const;

export const adminManagedNotifications: AdminManagedNotification[] = [
  {
    id: 'notif-live-football',
    name: 'Старт матча дня',
    type: 'live',
    audience: 'favorites',
    audienceLabel: 'Пользователи с событием в избранном',
    event: 'Спартак vs Зенит',
    status: 'sent',
    scheduledAt: 'Сегодня, 19:55',
    delivered: '94.8%',
    openRate: '38.2%',
    summary: 'Push о старте live-события с переходом в экран поддержки.',
    message: 'Матч дня уже в эфире. Откройте Fansten и поддержите свою сторону в один тап.',
    template: 'Live start / Favorites',
    errorDetails: 'Ошибок доставки не зафиксировано.',
    logs: [
      { id: 'notif-1', title: 'Отправка завершена', at: 'Сегодня, 19:56' },
      { id: 'notif-2', title: 'Сегмент избранного обновлён', at: 'Сегодня, 19:50' }
    ]
  },
  {
    id: 'notif-mma-room',
    name: 'Открыта комната UFC',
    type: 'room',
    audience: 'room',
    audienceLabel: 'Участники MMA-комнат',
    event: 'UFC Fight Night 271',
    status: 'scheduled',
    scheduledAt: 'Сегодня, 23:40',
    delivered: '—',
    openRate: '—',
    summary: 'Уведомление о запуске новой комнаты поддержки перед главным кардом.',
    message: 'Комната UFC уже почти готова. Подключайтесь заранее, чтобы занять место в обсуждении и поддержке.',
    template: 'Room launch / MMA',
    errorDetails: 'Ожидает отправки по расписанию.',
    logs: [
      { id: 'notif-3', title: 'Поставлено в очередь на отправку', at: 'Сегодня, 16:10' }
    ]
  },
  {
    id: 'notif-email-vip',
    name: 'VIP digest недели',
    type: 'email',
    audience: 'vip',
    audienceLabel: 'VIP пользователи',
    event: 'Без привязки к событию',
    status: 'draft',
    scheduledAt: 'Черновик',
    delivered: '—',
    openRate: '—',
    summary: 'Подборка лучших событий недели и персональных рекомендаций для VIP сегмента.',
    message: 'Собрали для вас события недели, новые комнаты и наиболее активные live-поддержки в Fansten.',
    template: 'VIP weekly digest',
    errorDetails: 'Черновик ещё не проверен редактором.',
    logs: [
      { id: 'notif-4', title: 'Последнее редактирование шаблона', at: 'Сегодня, 14:22' }
    ]
  },
  {
    id: 'notif-f1-quali',
    name: 'Напоминание о Гран-при Японии',
    type: 'push',
    audience: 'event',
    audienceLabel: 'Пользователи Formula 1',
    event: 'Гран-при Японии 2026',
    status: 'scheduled',
    scheduledAt: 'Завтра, 07:30',
    delivered: '—',
    openRate: '—',
    summary: 'Напоминание о старте предгоночной поддержки и выборе победителя.',
    message: 'Гран-при Японии стартует уже скоро. Выберите команду и поддержите своего фаворита до старта гонки.',
    template: 'Formula 1 reminder',
    errorDetails: 'Ожидает запуска по часовому поясу Europe/Moscow.',
    logs: [
      { id: 'notif-5', title: 'Период отправки подтверждён', at: 'Сегодня, 13:05' }
    ]
  },
  {
    id: 'notif-nba-error',
    name: 'NBA Night push',
    type: 'push',
    audience: 'event',
    audienceLabel: 'Фанаты NBA',
    event: 'Detroit Pistons vs Los Angeles Lakers',
    status: 'error',
    scheduledAt: 'Сегодня, 01:55',
    delivered: '71.4%',
    openRate: '22.6%',
    summary: 'Push перед ночным NBA-слотом, часть токенов не была доставлена.',
    message: 'Ночной слот NBA уже близко. Возвращайтесь в Fansten, чтобы поддержать Lakers и следить за комнатой матча.',
    template: 'NBA night push',
    errorDetails: 'Ошибка доставки в Android-пуле: 1 248 токенов устарели и требуют очистки.',
    logs: [
      { id: 'notif-6', title: 'Доставка завершена с ошибками', at: 'Сегодня, 01:58' },
      { id: 'notif-7', title: 'Создана задача на очистку токенов', at: 'Сегодня, 02:04' }
    ]
  }
];
