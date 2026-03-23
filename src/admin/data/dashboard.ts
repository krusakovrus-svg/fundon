export interface AdminNavItem {
  id: string;
  label: string;
  section: 'main' | 'community' | 'system';
  active?: boolean;
}

export interface AdminKpi {
  id: string;
  label: string;
  value: string;
  trend: string;
  accent: 'blue' | 'orange' | 'green' | 'indigo';
  points: number[];
}

export interface AdminLiveEvent {
  id: string;
  title: string;
  sport: string;
  status: string;
  supportVolume: string;
  participants: string;
}

export interface AdminDonation {
  id: string;
  user: string;
  avatar: string;
  athlete: string;
  amount: string;
  event: string;
  status: string;
}

export interface AdminAlert {
  id: string;
  kind: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
}

export interface AdminQuickAction {
  id: string;
  label: string;
  priority: 'primary' | 'secondary';
}

export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Дашборд', section: 'main', active: true },
  { id: 'users', label: 'Пользователи', section: 'main' },
  { id: 'athletes', label: 'Спортсмены', section: 'main' },
  { id: 'events', label: 'События', section: 'main' },
  { id: 'donations', label: 'Донаты', section: 'community' },
  { id: 'rooms', label: 'Комнаты', section: 'community' },
  { id: 'notifications', label: 'Уведомления', section: 'community' },
  { id: 'analytics', label: 'Аналитика', section: 'system' },
  { id: 'moderation', label: 'Модерация', section: 'system' },
  { id: 'settings', label: 'Настройки', section: 'system' }
];

export const adminKpis: AdminKpi[] = [
  {
    id: 'live-events',
    label: 'Активные live-события',
    value: '5',
    trend: '+2 с утра',
    accent: 'blue',
    points: [22, 28, 24, 32, 29, 36, 30]
  },
  {
    id: 'donations-today',
    label: 'Донаты за сегодня',
    value: '₽128,450',
    trend: '+14%',
    accent: 'orange',
    points: [18, 26, 22, 31, 27, 35, 39]
  },
  {
    id: 'active-users',
    label: 'Активные пользователи',
    value: '2,310',
    trend: '+8%',
    accent: 'indigo',
    points: [16, 18, 20, 19, 24, 26, 28]
  },
  {
    id: 'avg-check',
    label: 'Средний чек',
    value: '₽540',
    trend: '+5%',
    accent: 'green',
    points: [11, 14, 13, 17, 16, 18, 20]
  },
  {
    id: 'payments-success',
    label: 'Успешность платежей',
    value: '98.4%',
    trend: 'Стабильно',
    accent: 'blue',
    points: [92, 94, 95, 96, 96, 98, 98]
  }
];

export const adminLiveEvents: AdminLiveEvent[] = [
  {
    id: 'live-spartak-zenit',
    title: 'Спартак vs Зенит',
    sport: 'Футбол',
    status: 'В эфире',
    supportVolume: '₽38,900',
    participants: '2 стороны · 1,240 зрителей'
  },
  {
    id: 'live-alvarez-jones',
    title: 'Alvarez vs Jones',
    sport: 'Бокс',
    status: '50К донатов',
    supportVolume: '₽61,200',
    participants: '2 атлета · 980 зрителей'
  },
  {
    id: 'live-team-russia-usa',
    title: 'Team Russia vs USA',
    sport: 'Хоккей',
    status: 'Финальный период',
    supportVolume: '₽27,640',
    participants: '2 команды · 1,680 зрителей'
  }
];

export const adminRecentDonations: AdminDonation[] = [
  {
    id: 'don-1',
    user: 'ivan93',
    avatar: 'I',
    athlete: 'Сергей Волков',
    amount: '₽1,500',
    event: 'Спартак vs Зенит',
    status: 'Успешно'
  },
  {
    id: 'don-2',
    user: 'AnnaK',
    avatar: 'A',
    athlete: 'Mike Alvarez',
    amount: '₽3,000',
    event: 'Alvarez vs Jones',
    status: '15 мин назад'
  },
  {
    id: 'don-3',
    user: 'Pam',
    avatar: 'P',
    athlete: 'Руслан Тренс',
    amount: '₽5,000',
    event: 'Escaev vs Zopat',
    status: '12 мин назад'
  },
  {
    id: 'don-4',
    user: 'Сергий',
    avatar: 'С',
    athlete: 'Юрий Трив',
    amount: '₽3,000',
    event: 'Escaev vs Zopat',
    status: '18 мин назад'
  }
];

export const adminAlerts: AdminAlert[] = [
  {
    id: 'alert-1',
    kind: 'warning',
    title: 'Подозрительный донат от user123',
    description: 'Платёж выше обычного лимита и требует проверки.'
  },
  {
    id: 'alert-2',
    kind: 'critical',
    title: 'Жалоба: оскорбления в комнате #7',
    description: 'Нужна ручная модерация и решение по бану.'
  },
  {
    id: 'alert-3',
    kind: 'info',
    title: 'Система: ошибка API сервера',
    description: 'Потеряно 3 webhook-события, повторная отправка запущена.'
  }
];

export const adminQuickActions: AdminQuickAction[] = [
  { id: 'create-event', label: 'Создать событие', priority: 'primary' },
  { id: 'add-athlete', label: 'Добавить спортсмена', priority: 'secondary' },
  { id: 'send-notification', label: 'Отправить уведомление', priority: 'secondary' },
  { id: 'open-moderation', label: 'Открыть модерацию', priority: 'secondary' }
];

export const adminAnalyticsBars = [24, 38, 56, 64, 82, 96];

export const adminAnalyticsSegments = [
  { label: 'Футбол', value: 38, color: '#4f8ff6' },
  { label: 'Бокс', value: 22, color: '#ffb34d' },
  { label: 'Хоккей', value: 18, color: '#5eb5ff' },
  { label: 'MMA', value: 12, color: '#79c97c' },
  { label: 'NBA', value: 10, color: '#b2b8f7' }
];
