export interface AdminAnalyticsKpi {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendTone: 'positive' | 'negative' | 'neutral';
  points: number[];
}

export interface AdminAnalyticsMetricRow {
  id: string;
  label: string;
  hint: string;
  value: string;
  delta: string;
  tone?: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminAnalyticsRankingRow {
  id: string;
  rank: number;
  label: string;
  meta: string;
  value: string;
  delta: string;
  tone?: 'blue' | 'green' | 'orange' | 'slate';
}

export interface AdminAnalyticsInsight {
  id: string;
  title: string;
  value: string;
  note: string;
}

export interface AdminAnalyticsAnomaly {
  id: string;
  title: string;
  description: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AdminAnalyticsSegment {
  id: string;
  label: string;
  value: string;
  note: string;
  delta: string;
}

export const adminAnalyticsKpis: AdminAnalyticsKpi[] = [
  {
    id: 'dau',
    label: 'DAU',
    value: '15 280',
    trend: '+6,4% к прошлому периоду',
    trendTone: 'positive',
    points: [58, 54, 52, 57, 61, 58, 55, 60, 53, 54, 52, 55, 63, 59, 66, 57]
  },
  {
    id: 'mau',
    label: 'MAU',
    value: '58 640',
    trend: '+4,1% за месяц',
    trendTone: 'positive',
    points: [64, 67, 65, 63, 66, 69, 66, 64, 67, 65, 63, 71, 66, 69, 67, 72]
  },
  {
    id: 'new-users',
    label: 'Новые пользователи',
    value: '4 320',
    trend: '+14% за счёт эфиров',
    trendTone: 'positive',
    points: [28, 29, 30, 34, 33, 37, 32, 33, 35, 34, 31, 33, 30, 34, 34, 36]
  },
  {
    id: 'retention',
    label: 'Удержание',
    value: '58,5%',
    trend: '-1,8 п.п. у новой аудитории',
    trendTone: 'negative',
    points: [63, 62, 64, 65, 63, 61, 60, 62, 61, 60, 62, 67, 64, 69, 66, 71]
  },
  {
    id: 'donation-conversion',
    label: 'Конверсия в донат',
    value: '6,8%',
    trend: '+0,9 п.п. в комнатах эфира',
    trendTone: 'positive',
    points: [31, 31, 34, 37, 37, 36, 36, 33, 31, 35, 32, 33, 35, 35, 38, 38]
  },
  {
    id: 'average-check',
    label: 'Средний чек',
    value: '870 ₽',
    trend: '+5,7% в вечернем эфире',
    trendTone: 'positive',
    points: [41, 42, 43, 45, 47, 50, 49, 46, 44, 47, 50, 48, 46, 51, 50, 54]
  },
  {
    id: 'support-volume',
    label: 'Общий объём поддержки',
    value: '12,4 млн ₽',
    trend: '+9,2% к предыдущим 30 дням',
    trendTone: 'positive',
    points: [56, 57, 57, 56, 55, 55, 59, 59, 59, 57, 57, 54, 56, 56, 58, 61]
  },
  {
    id: 'post-event-volume',
    label: 'Поддержка после эфира',
    value: '812 тыс. ₽',
    trend: '6,5% от объёма за период',
    trendTone: 'neutral',
    points: [8, 9, 10, 12, 11, 13, 12, 15, 16, 14, 15, 17, 19, 18, 20, 22]
  }
];

export const adminAnalyticsGrowthLabels = ['01 мар', '03 мар', '05 мар', '07 мар', '09 мар', '11 мар', '13 мар', '15 мар', '17 мар', '19 мар', '21 мар', '23 мар'];
export const adminAnalyticsGrowthNewUsers = [62, 68, 64, 75, 79, 84, 89, 96, 103, 110, 118, 132];
export const adminAnalyticsGrowthActiveUsers = [31, 33, 34, 35, 37, 39, 41, 44, 46, 47, 50, 57];
export const adminAnalyticsGrowthBaseline = [126, 133, 129, 139, 134, 142, 140, 149, 154, 160, 158, 169];

export const adminAnalyticsDonationLabels = ['01 мар', '03 мар', '05 мар', '07 мар', '09 мар', '11 мар', '13 мар', '15 мар', '17 мар', '19 мар', '21 мар', '23 мар'];
export const adminAnalyticsDonationAmounts = [12, 15, 9, 13, 11, 16, 18, 27, 14, 10, 9, 13];
export const adminAnalyticsDonationErrors = [2.1, 1.8, 1.5, 1.7, 1.6, 1.9, 2.4, 3.1, 2.2, 1.8, 1.6, 1.9];
export const adminAnalyticsDonationAverage = [13, 12, 12, 13, 14, 14, 15, 16, 15, 15, 14, 16];

export const adminAnalyticsLiveLabels = ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00'];
export const adminAnalyticsLiveViewers = [24, 48, 82, 44, 67, 38, 98, 79];
export const adminAnalyticsLiveSupport = [12, 19, 41, 22, 31, 18, 36, 33];
export const adminAnalyticsLivePeaks = [18, 25, 29, 21, 27, 19, 34, 31];
export const adminAnalyticsLiveMoments = [
  { id: 'moment-1', label: '15:00', value: 48, baseline: 32 },
  { id: 'moment-2', label: '18:00', value: 61, baseline: 39 },
  { id: 'moment-3', label: '21:00', value: 72, baseline: 46 },
  { id: 'moment-4', label: '23:00', value: 56, baseline: 40 },
  { id: 'moment-5', label: '01:00', value: 34, baseline: 26 }
];

export const adminAnalyticsPopularitySports: AdminAnalyticsRankingRow[] = [
  {
    id: 'sport-1',
    rank: 1,
    label: 'MMA',
    meta: '31% от объёма поддержки',
    value: '3,8 млн ₽',
    delta: '+11%',
    tone: 'blue'
  },
  {
    id: 'sport-2',
    rank: 2,
    label: 'Бокс',
    meta: '24% активной аудитории',
    value: '2,9 млн ₽',
    delta: '+7%',
    tone: 'green'
  },
  {
    id: 'sport-3',
    rank: 3,
    label: 'Кикбоксинг',
    meta: 'Лучший рост по новым пользователям',
    value: '1,7 млн ₽',
    delta: '+18%',
    tone: 'orange'
  }
];

export const adminAnalyticsPopularityEntities: AdminAnalyticsRankingRow[] = [
  {
    id: 'archive-1',
    rank: 1,
    label: 'Miami Open: Сёнмез vs Хаддад Майя',
    meta: 'Лидер по поддержке после эфира',
    value: '186 тыс. ₽',
    delta: '18 ч окна',
    tone: 'blue'
  },
  {
    id: 'archive-2',
    rank: 2,
    label: 'Локомотив vs Спартак',
    meta: 'Лучший возврат внутри архивного окна',
    value: '144 тыс. ₽',
    delta: '22 ч окна',
    tone: 'green'
  },
  {
    id: 'archive-3',
    rank: 3,
    label: 'UFC Fight Night 271',
    meta: 'Лучшая конверсия в быстрые суммы',
    value: '64% пресеты',
    delta: '+5%',
    tone: 'slate'
  }
];

export const adminAnalyticsNotificationMetrics: AdminAnalyticsMetricRow[] = [
  {
    id: 'notify-1',
    label: 'Отправлено',
    hint: 'Push, email и событийные триггеры',
    value: '152 300',
    delta: '+8% за месяц',
    tone: 'blue'
  },
  {
    id: 'notify-2',
    label: 'Доставлено',
    hint: 'Стабильность доставки по активной базе',
    value: '94%',
    delta: '-0,4 п.п.',
    tone: 'green'
  },
  {
    id: 'notify-3',
    label: 'Открыто',
    hint: 'Лучший слот: 19:00–22:00',
    value: '28%',
    delta: '+2,1 п.п.',
    tone: 'orange'
  },
  {
    id: 'notify-4',
    label: 'Возврат в продукт',
    hint: 'Переходы из уведомлений в событие',
    value: '7,4%',
    delta: '+0,6 п.п.',
    tone: 'slate'
  }
];

export const adminAnalyticsFunnelMetrics: AdminAnalyticsMetricRow[] = [
  {
    id: 'funnel-1',
    label: 'Просмотр события',
    hint: 'Доля аудитории, дошедшей до карточки эфира',
    value: '64%',
    delta: '+3,8 п.п.',
    tone: 'blue'
  },
  {
    id: 'funnel-2',
    label: 'Вход в комнату',
    hint: 'Переход из события в комнату эфира',
    value: '41%',
    delta: '+2,2 п.п.',
    tone: 'green'
  },
  {
    id: 'funnel-3',
    label: 'Переход к оплате',
    hint: 'Открытие экрана доната внутри сценария',
    value: '13,6%',
    delta: '+1,1 п.п.',
    tone: 'orange'
  },
  {
    id: 'funnel-4',
    label: 'Завершённый донат',
    hint: 'Итоговая конверсия в поддержке эфира',
    value: '6,8%',
    delta: '+0,9 п.п.',
    tone: 'slate'
  }
];

export const adminAnalyticsEngagementMetrics: AdminAnalyticsMetricRow[] = [
  {
    id: 'engage-1',
    label: 'Сессии в комнатах',
    hint: 'Среднее число заходов в комнаты эфира',
    value: '3,4',
    delta: '+9%',
    tone: 'blue'
  },
  {
    id: 'engage-2',
    label: 'Избранное',
    hint: 'События и спортсмены в персональных списках',
    value: '18%',
    delta: '+1,2 п.п.',
    tone: 'green'
  },
  {
    id: 'engage-3',
    label: 'Повторные сессии',
    hint: 'Возврат в продукт в течение 7 дней',
    value: '43%',
    delta: '-1,3 п.п.',
    tone: 'orange'
  },
  {
    id: 'engage-4',
    label: 'Глубина просмотра',
    hint: 'Среднее число экранов за сессию',
    value: '5,2',
    delta: '+0,4',
    tone: 'slate'
  }
];

export const adminAnalyticsSupportBehaviorMetrics: AdminAnalyticsMetricRow[] = [
  {
    id: 'support-1',
    label: 'Эфир / после эфира',
    hint: 'Сравнение эфирной и архивной поддержки',
    value: '93,5% / 6,5%',
    delta: '+1,4 п.п. после эфира',
    tone: 'blue'
  },
  {
    id: 'support-2',
    label: 'Топ быстрая сумма',
    hint: 'Чаще всего выбирают 100 ₽ в быстром сценарии поддержки',
    value: '34%',
    delta: '100 ₽',
    tone: 'green'
  },
  {
    id: 'support-3',
    label: 'Своя сумма',
    hint: 'Пользовательская сумма поверх быстрых кнопок',
    value: '18%',
    delta: '+3 п.п.',
    tone: 'orange'
  },
  {
    id: 'support-4',
    label: 'Послеэфирные транзакции',
    hint: 'Успешные донаты внутри архивного окна',
    value: '126',
    delta: '9 требуют ручной проверки',
    tone: 'slate'
  }
];

export const adminAnalyticsSegments: AdminAnalyticsSegment[] = [
  {
    id: 'segment-1',
    label: 'Новые пользователи',
    value: '8 540',
    note: 'Лучше всего заходят в вечерний эфир',
    delta: '+14%'
  },
  {
    id: 'segment-2',
    label: 'Активные донатеры',
    value: '2 110',
    note: 'Чаще других возвращаются в комнаты эфира',
    delta: '+6%'
  },
  {
    id: 'segment-3',
    label: 'Спящие',
    value: '5 780',
    note: 'Теряются после первого просмотренного события',
    delta: '-4%'
  },
  {
    id: 'segment-4',
    label: 'Премиум-сегмент',
    value: '940',
    note: 'Формирует 38% объёма поддержки',
    delta: '+9%'
  },
  {
    id: 'segment-5',
    label: 'Зрители без доната',
    value: '12 300',
    note: 'Нужен мягкий перевод из просмотра в поддержку',
    delta: '+5%'
  },
  {
    id: 'segment-6',
    label: 'Фанаты после эфира',
    value: '680',
    note: 'Возвращаются после эфира и поддерживают победителей',
    delta: '+12%'
  }
];

export const adminAnalyticsAnomalies: AdminAnalyticsAnomaly[] = [
  {
    id: 'anomaly-1',
    title: 'Ошибки оплаты в Android',
    description: '21:00–22:00: отклонения выросли на 25%.',
    impact: 'Теряем часть вечерней выручки. Нужно проверить checkout до следующего прайм-эфира.',
    severity: 'high'
  },
  {
    id: 'anomaly-2',
    title: 'Окно после эфира у тенниса выше нормы',
    description: 'Miami Open даёт всплеск поддержки после эфира после 12-го часа окна.',
    impact: 'Есть смысл отделить теннис в отдельное правило поддержки после эфира.',
    severity: 'medium'
  },
  {
    id: 'anomaly-3',
    title: 'Своя сумма растёт быстрее пресетов',
    description: 'Доля пользовательских сумм поднялась на 3 п.п. за неделю.',
    impact: 'Нужно проверить, хватает ли текущих быстрых сумм для вечернего сценария.',
    severity: 'low'
  }
];

export const adminAnalyticsInsights: AdminAnalyticsInsight[] = [
  {
    id: 'insight-1',
    title: 'Поддержка после эфира',
    value: '812 тыс. ₽',
    note: 'Послеэфирное окно уже приносит заметный объём без каннибализации эфирного потока.'
  },
  {
    id: 'insight-2',
    title: 'Быстрые суммы',
    value: '100 ₽',
    note: 'Пресет 100 ₽ остаётся самым быстрым сценарием и лидирует по частоте выбора.'
  },
  {
    id: 'insight-3',
    title: 'Своя сумма',
    value: '18%',
    note: 'Своя сумма чаще используется на крупных спортивных событиях и в архивном окне.'
  }
];

export const adminAnalyticsRecommendation =
  'Главный фокус: удержать рост поддержки после эфира, не перегружая эфирный сценарий, и пересобрать быстрые суммы для видов спорта, где своя сумма растёт быстрее пресет-кнопок.';
