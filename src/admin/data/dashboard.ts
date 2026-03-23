export type AdminDashboardValueFormat = 'integer' | 'currency' | 'percent';

export interface AdminKpi {
  id: string;
  label: string;
  value: number;
  format: AdminDashboardValueFormat;
  trend: string;
  trendTone: 'positive' | 'neutral' | 'attention';
  accent: 'blue' | 'orange' | 'green' | 'indigo';
  points: number[];
}

export interface AdminLiveEvent {
  id: string;
  title: string;
  sport: string;
  status: string;
  sidesLabel: string;
  viewers: number;
  supportVolume: number;
  supportNote: string;
}

export interface AdminDonation {
  id: string;
  user: string;
  avatar: string;
  athlete: string;
  side: string;
  amount: number;
  event: string;
  status: string;
  statusTone: 'success' | 'review' | 'neutral';
  timestamp: string;
}

export interface AdminAlert {
  id: string;
  kind: 'critical' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface AdminQuickAction {
  id: string;
  label: string;
  description: string;
  priority: 'primary' | 'secondary';
}

export interface AdminProductMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: 'positive' | 'neutral' | 'attention';
}

export interface AdminInsight {
  id: string;
  title: string;
  summary: string;
  tone: 'blue' | 'amber' | 'slate';
}

export const adminKpis: AdminKpi[] = [
  {
    id: 'live-events',
    label: 'Активные live-события',
    value: 5,
    format: 'integer',
    trend: '+2 с утра',
    trendTone: 'positive',
    accent: 'blue',
    points: [22, 28, 24, 32, 29, 36, 30]
  },
  {
    id: 'donations-today',
    label: 'Донаты за сегодня',
    value: 128450,
    format: 'currency',
    trend: '+14% к вчерашнему дню',
    trendTone: 'positive',
    accent: 'orange',
    points: [18, 26, 22, 31, 27, 35, 39]
  },
  {
    id: 'active-users',
    label: 'Активные пользователи',
    value: 2310,
    format: 'integer',
    trend: '+8% в live-комнатах',
    trendTone: 'positive',
    accent: 'indigo',
    points: [16, 18, 20, 19, 24, 26, 28]
  },
  {
    id: 'avg-check',
    label: 'Средний чек',
    value: 540,
    format: 'currency',
    trend: '+5% за неделю',
    trendTone: 'positive',
    accent: 'green',
    points: [11, 14, 13, 17, 16, 18, 20]
  },
  {
    id: 'payments-success',
    label: 'Успешность платежей',
    value: 98.4,
    format: 'percent',
    trend: 'Стабильно по основным провайдерам',
    trendTone: 'neutral',
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
    sidesLabel: '2 стороны',
    viewers: 1240,
    supportVolume: 38900,
    supportNote: '84 доната за последние 30 минут'
  },
  {
    id: 'live-alvarez-jones',
    title: 'Alvarez vs Jones',
    sport: 'Бокс',
    status: 'Раунд 8 из 12',
    sidesLabel: '2 атлета',
    viewers: 980,
    supportVolume: 61200,
    supportNote: 'Самый высокий средний чек за вечер'
  },
  {
    id: 'live-team-russia-usa',
    title: 'Team Russia vs USA',
    sport: 'Хоккей',
    status: 'Финальный период',
    sidesLabel: '2 команды',
    viewers: 1680,
    supportVolume: 27640,
    supportNote: 'Пик активности смещён в третьем периоде'
  }
];

export const adminRecentDonations: AdminDonation[] = [
  {
    id: 'don-1',
    user: 'ivan93',
    avatar: 'I',
    athlete: 'Сергей Волков',
    side: 'За сторону Спартак',
    amount: 1500,
    event: 'Спартак vs Зенит',
    status: 'Успешно',
    statusTone: 'success',
    timestamp: '2 мин назад'
  },
  {
    id: 'don-2',
    user: 'AnnaK',
    avatar: 'A',
    athlete: 'Mike Alvarez',
    side: 'За сторону Alvarez',
    amount: 3000,
    event: 'Alvarez vs Jones',
    status: 'Успешно',
    statusTone: 'success',
    timestamp: '6 мин назад'
  },
  {
    id: 'don-3',
    user: 'Pam',
    avatar: 'P',
    athlete: 'Руслан Тренс',
    side: 'За сторону Escaev',
    amount: 5000,
    event: 'Escaev vs Zopat',
    status: 'На проверке',
    statusTone: 'review',
    timestamp: '12 мин назад'
  },
  {
    id: 'don-4',
    user: 'Сергий',
    avatar: 'С',
    athlete: 'Юрий Трив',
    side: 'За сторону Zopat',
    amount: 3000,
    event: 'Escaev vs Zopat',
    status: 'Успешно',
    statusTone: 'success',
    timestamp: '18 мин назад'
  }
];

export const adminAlerts: AdminAlert[] = [
  {
    id: 'alert-1',
    kind: 'warning',
    category: 'Платежи',
    title: 'Подозрительный донат от user123',
    description: 'Платёж выше обычного лимита и требует быстрой ручной проверки до финального клиринга.',
    timestamp: '5 минут назад'
  },
  {
    id: 'alert-2',
    kind: 'critical',
    category: 'Модерация',
    title: 'Жалоба на комнату #7',
    description: 'Нужно проверить оскорбления в чате и принять решение по ограничению пользователя до конца эфира.',
    timestamp: '12 минут назад'
  },
  {
    id: 'alert-3',
    kind: 'info',
    category: 'Система',
    title: 'Повторная отправка webhook уже запущена',
    description: 'Потеряно 3 webhook-события. Очередь перезапущена автоматически, но нужен контроль результата.',
    timestamp: '21 минуту назад'
  }
];

export const adminQuickActions: AdminQuickAction[] = [
  {
    id: 'create-event',
    label: 'Создать событие',
    description: 'Новый эфир или матч в operational календаре.',
    priority: 'primary'
  },
  {
    id: 'add-athlete',
    label: 'Добавить спортсмена',
    description: 'Карточка, статус и привязка к событиям.',
    priority: 'secondary'
  },
  {
    id: 'send-notification',
    label: 'Отправить уведомление',
    description: 'Push и room-оповещение по активному потоку.',
    priority: 'secondary'
  },
  {
    id: 'open-moderation',
    label: 'Открыть модерацию',
    description: 'Жалобы, ограничения и проблемные кейсы.',
    priority: 'secondary'
  }
];

export const adminProductMetrics: AdminProductMetric[] = [
  {
    id: 'conversion',
    label: 'Конверсия в донат',
    value: '6,8%',
    delta: '+0,4 п.п.',
    tone: 'positive'
  },
  {
    id: 'repeat-support',
    label: 'Повторная поддержка',
    value: '34%',
    delta: '+3 п.п.',
    tone: 'positive'
  },
  {
    id: 'cta-click-through',
    label: 'CTR кнопки поддержки',
    value: '18,2%',
    delta: 'Стабильно',
    tone: 'neutral'
  },
  {
    id: 'time-to-donation',
    label: 'Время до первого доната',
    value: '4 мин 20 с',
    delta: '-18 с',
    tone: 'positive'
  }
];

export const adminDashboardInsights: AdminInsight[] = [
  {
    id: 'football-support',
    title: 'Футбол удерживает лидерство по объёму поддержки.',
    summary: 'Основной объём донатов приходит из live-матчей с высокой room-активностью и коротким временем до первого платежа.',
    tone: 'blue'
  },
  {
    id: 'boxing-check',
    title: 'Бокс остаётся драйвером среднего чека.',
    summary: 'У карточек с персональной поддержкой выше средний платёж и лучше возврат в live-сессию после первого доната.',
    tone: 'amber'
  },
  {
    id: 'moderation-cluster',
    title: 'Жалобы концентрируются в одной active room.',
    summary: 'Нагрузка на модерацию усиливается после 21:00, поэтому стоит держать дополнительного оператора в горячем слоте.',
    tone: 'slate'
  }
];

export const adminDashboardFocus =
  'Усилить pre-live push для вечерних эфиров и отдельно контролировать комнату #7, чтобы не терять конверсию на фоне модерационных инцидентов.';

export const adminAudienceGrowthBars = [28, 42, 54, 68, 81, 94];

export const adminAudienceGrowthLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const adminAnalyticsSegments = [
  { label: 'Футбол', value: 38, color: '#4f8ff6' },
  { label: 'Бокс', value: 22, color: '#e3a25a' },
  { label: 'Хоккей', value: 18, color: '#6da9ff' },
  { label: 'MMA', value: 12, color: '#78b28c' },
  { label: 'Баскетбол', value: 10, color: '#aeb7f4' }
];
