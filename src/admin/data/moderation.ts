export type AdminModerationCaseType = 'complaint' | 'transaction' | 'room' | 'user';

export type AdminModerationPriority = 'high' | 'medium' | 'low';

export type AdminModerationStatus = 'new' | 'open' | 'in-progress' | 'closed';

export type AdminModerationUserScope = 'all' | 'restricted' | 'new' | 'vip';

export interface AdminModerationKpi {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: 'blue' | 'orange' | 'rose' | 'slate';
}

export interface AdminModerationHistoryItem {
  id: string;
  actor: string;
  action: string;
  at: string;
}

export interface AdminModerationNote {
  id: string;
  title: string;
  body: string;
  at: string;
}

export interface AdminModerationCase {
  id: string;
  type: AdminModerationCaseType;
  typeLabel: string;
  priority: AdminModerationPriority;
  status: AdminModerationStatus;
  objectTitle: string;
  objectMeta: string;
  user: string;
  handle: string;
  userMeta: string;
  reason: string;
  event: string;
  createdAt: string;
  assignedModerator: string;
  avatarTone: string;
  summary: string;
  targetSummary: string;
  transactionSummary: string;
  restrictionState: string;
  complaints: string;
  history: AdminModerationHistoryItem[];
  notes: AdminModerationNote[];
}

export const adminModerationKpis: AdminModerationKpi[] = [
  { id: 'open-cases', label: 'Открытые кейсы', value: '26', hint: '4 требуют решения сегодня', tone: 'blue' },
  { id: 'new-complaints', label: 'Новые жалобы', value: '14', hint: 'За последние 24 часа', tone: 'orange' },
  { id: 'suspicious-transactions', label: 'Подозрительные транзакции', value: '7', hint: '2 повышенного риска', tone: 'rose' },
  { id: 'restricted-users', label: 'Пользователи под ограничением', value: '10', hint: '3 на повторной проверке', tone: 'slate' }
];

export const adminModerationCaseFilters = [
  { id: 'all', label: 'Все кейсы' },
  { id: 'complaint', label: 'Жалобы' },
  { id: 'transaction', label: 'Транзакции' },
  { id: 'room', label: 'Комнаты' },
  { id: 'user', label: 'Пользователи' }
] as const;

export const adminModerationTypeFilters = [
  { id: 'all', label: 'Все типы' },
  { id: 'complaint', label: 'Жалоба' },
  { id: 'transaction', label: 'Подозрительная транзакция' },
  { id: 'room', label: 'Нарушение в комнате' },
  { id: 'user', label: 'Риск по пользователю' }
] as const;

export const adminModerationPriorityFilters = [
  { id: 'all', label: 'Все приоритеты' },
  { id: 'high', label: 'Высокий' },
  { id: 'medium', label: 'Средний' },
  { id: 'low', label: 'Низкий' }
] as const;

export const adminModerationStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'new', label: 'Новое' },
  { id: 'open', label: 'Открыт' },
  { id: 'in-progress', label: 'В работе' },
  { id: 'closed', label: 'Закрыт' }
] as const;

export const adminModerationUserFilters = [
  { id: 'all', label: 'Все пользователи' },
  { id: 'restricted', label: 'Под ограничением' },
  { id: 'new', label: 'Новые' },
  { id: 'vip', label: 'VIP' }
] as const;

export const adminModerationEventFilters = [
  { id: 'all', label: 'Все события' },
  { id: 'frankfurt', label: 'FC Frankfurt vs Bayern Munich' },
  { id: 'ufc', label: 'UFC Fight Night 271' },
  { id: 'japan-gp', label: 'Гран-при Японии 2026' },
  { id: 'match-day', label: 'Комната Match Day' }
] as const;

export const adminModerationCases: AdminModerationCase[] = [
  {
    id: 'M-5104',
    type: 'transaction',
    typeLabel: 'Подозрительная транзакция',
    priority: 'high',
    status: 'new',
    objectTitle: 'Донат ₽ 2 500',
    objectMeta: 'FC Frankfurt vs Bayern Munich · Волков',
    user: 'Sergey Romanov',
    handle: '@romanov',
    userMeta: 'Жалоб: 1 · Регистрация: 6 мес. назад',
    reason: 'Несовпадение гео платежа и устройства',
    event: 'FC Frankfurt vs Bayern Munich',
    createdAt: 'Сегодня, 11:58',
    assignedModerator: 'Андрей Смирнов',
    avatarTone: 'bg-[linear-gradient(135deg,#f1d4c7_0%,#d89a77_100%)]',
    summary: 'Платёж отмечен антифрод-правилом: резкая смена устройства и повторный донат на тот же side за 3 минуты.',
    targetSummary: 'Wallet: Unified Wallet · ID платежа 60 027 · Карта **** 5371',
    transactionSummary: '₽ 2 500 · Волков · 11:58',
    restrictionState: 'Временное ограничение на вывод не применялось',
    complaints: '1 связанный сигнал',
    history: [
      { id: 'm5104-h1', actor: 'System', action: 'Кейс создан антифрод-правилом', at: '12:06' },
      { id: 'm5104-h2', actor: 'Dmitry', action: 'Назначил на ручную проверку', at: '12:12' },
      { id: 'm5104-h3', actor: 'Andrey', action: 'Запросил проверку транзакции и профиля', at: '12:19' }
    ],
    notes: [
      {
        id: 'm5104-n1',
        title: 'Проверка устройства',
        body: 'Последний вход был с нового IP. Предыдущие 8 донатов приходили с одного Android-устройства.',
        at: '12:15'
      },
      {
        id: 'm5104-n2',
        title: 'Следующий шаг',
        body: 'Сверить карту с предыдущими возвратами и проверить, нет ли связи с комнатой Match Day.',
        at: '12:18'
      }
    ]
  },
  {
    id: 'M-5088',
    type: 'complaint',
    typeLabel: 'Жалоба',
    priority: 'medium',
    status: 'open',
    objectTitle: 'Сообщение в комнате Match Day',
    objectMeta: 'Спартак vs Зенит · Room #204',
    user: 'Елена Петрова',
    handle: '@elena_p',
    userMeta: 'Жалоб: 3 · Support streak: 12',
    reason: 'Оскорбление участника комнаты',
    event: 'Комната Match Day',
    createdAt: 'Сегодня, 09:24',
    assignedModerator: 'Ирина Климова',
    avatarTone: 'bg-[linear-gradient(135deg,#f4d9cf_0%,#cf937f_100%)]',
    summary: 'На сообщение пожаловались 3 участника. Внутри комнаты высокий темп активности после live-доната.',
    targetSummary: 'Комментарий: “...” · 3 жалобы · 42 просмотра',
    transactionSummary: 'Не связано с транзакцией',
    restrictionState: 'Чат-лимит на 30 минут включён',
    complaints: '3 жалобы в очереди',
    history: [
      { id: 'm5088-h1', actor: 'System', action: 'Кейс создан из жалобы комнаты', at: '09:24' },
      { id: 'm5088-h2', actor: 'Irina', action: 'Открыла кейс и включила лимит', at: '09:31' }
    ],
    notes: [
      {
        id: 'm5088-n1',
        title: 'Контекст комнаты',
        body: 'Перед жалобой в комнате было 126 новых сообщений за 10 минут. Тон обсуждения быстро ухудшился.',
        at: '09:36'
      }
    ]
  },
  {
    id: 'M-5079',
    type: 'room',
    typeLabel: 'Нарушение в комнате',
    priority: 'high',
    status: 'in-progress',
    objectTitle: 'Комната Final Push',
    objectMeta: 'UFC Fight Night 271 · 214 участников',
    user: 'Максим Иванов',
    handle: '@ivanov_max',
    userMeta: 'Создатель комнаты · Жалоб: 2',
    reason: 'Повторяющиеся призывы к обходу правил доната',
    event: 'UFC Fight Night 271',
    createdAt: 'Вчера, 22:18',
    assignedModerator: 'Ольга Романова',
    avatarTone: 'bg-[linear-gradient(135deg,#f2cfbf_0%,#cf8f73_100%)]',
    summary: 'В комнате нашли серию однотипных сообщений с просьбой переводить вне платформы. Идёт проверка организатора и закрепов.',
    targetSummary: 'Комната Final Push · 214 участников · активность высокая',
    transactionSummary: '4 связанных доната на общую сумму ₽ 18 400',
    restrictionState: 'Комната ограничена до завершения проверки',
    complaints: '2 связанные жалобы',
    history: [
      { id: 'm5079-h1', actor: 'System', action: 'Кейс создан по модерационному правилу комнаты', at: '22:18' },
      { id: 'm5079-h2', actor: 'Olga', action: 'Перевела кейс в работу', at: '22:29' },
      { id: 'm5079-h3', actor: 'Olga', action: 'Ограничила комнату и скрыла закреп', at: '22:44' }
    ],
    notes: [
      {
        id: 'm5079-n1',
        title: 'Подозрительная активность',
        body: 'Один и тот же призыв повторён 7 раз от разных аккаунтов. Возможно, coordinated spam внутри комнаты.',
        at: '22:46'
      }
    ]
  },
  {
    id: 'M-5065',
    type: 'user',
    typeLabel: 'Риск по пользователю',
    priority: 'low',
    status: 'closed',
    objectTitle: 'Профиль Julia North',
    objectMeta: 'Проверка повторного нарушения',
    user: 'Julia North',
    handle: '@julia_n',
    userMeta: 'Новый пользователь · 2 доната',
    reason: 'Подозрение на мультиаккаунт',
    event: 'Гран-при Японии 2026',
    createdAt: '21 мар., 18:10',
    assignedModerator: 'Екатерина Белова',
    avatarTone: 'bg-[linear-gradient(135deg,#f6dace_0%,#d79f8a_100%)]',
    summary: 'Совпадение по устройству подтвердилось, но отдельного нарушения не выявлено. Кейс закрыт после верификации профиля.',
    targetSummary: 'Профиль верифицирован · Совпадение по устройству объяснено',
    transactionSummary: '₽ 700 суммарно · 2 платежа',
    restrictionState: 'Ограничения сняты',
    complaints: 'Новых жалоб нет',
    history: [
      { id: 'm5065-h1', actor: 'System', action: 'Кейс создан risk-правилом', at: '21 мар., 18:10' },
      { id: 'm5065-h2', actor: 'Ekaterina', action: 'Проверила KYC и закрыла кейс', at: '21 мар., 19:02' }
    ],
    notes: [
      {
        id: 'm5065-n1',
        title: 'Результат проверки',
        body: 'Супруги используют одно устройство. Поведение не конфликтует с правилами платформы.',
        at: '21 мар., 19:02'
      }
    ]
  },
  {
    id: 'M-5051',
    type: 'transaction',
    typeLabel: 'Подозрительная транзакция',
    priority: 'medium',
    status: 'open',
    objectTitle: 'Возврат по донату ₽ 8 000',
    objectMeta: 'Team Russia vs USA · Крыло',
    user: 'Антон Крылов',
    handle: '@krilov',
    userMeta: '7 донатов за неделю',
    reason: 'Запрос на спорный возврат после завершения live',
    event: 'Team Russia vs USA',
    createdAt: 'Сегодня, 08:42',
    assignedModerator: 'Павел Новиков',
    avatarTone: 'bg-[linear-gradient(135deg,#eed1c2_0%,#cc8e74_100%)]',
    summary: 'Пользователь оспаривает списание после завершения эфира. Требуется сверка статуса live и платежного шлюза.',
    targetSummary: 'Chargeback request · Wallet hold active',
    transactionSummary: '₽ 8 000 · спорный возврат',
    restrictionState: 'Вывод временно ограничен до решения',
    complaints: 'Без жалоб',
    history: [
      { id: 'm5051-h1', actor: 'Support', action: 'Создан кейс по dispute request', at: '08:42' },
      { id: 'm5051-h2', actor: 'Pavel', action: 'Открыл кейс и запросил лог платежа', at: '09:04' }
    ],
    notes: [
      {
        id: 'm5051-n1',
        title: 'Что проверить',
        body: 'Сверить точное время завершения эфира, статусы PSP и наличие пользовательского подтверждения в момент доната.',
        at: '09:07'
      }
    ]
  },
  {
    id: 'M-5038',
    type: 'complaint',
    typeLabel: 'Жалоба',
    priority: 'low',
    status: 'new',
    objectTitle: 'Комментарий в ленте поддержки',
    objectMeta: 'FC Frankfurt vs Bayern Munich',
    user: 'Дмитрий Ковалёв',
    handle: '@dkovalev',
    userMeta: 'Жалоб: 0 · Аккаунт 1 год',
    reason: 'Спам в комментариях',
    event: 'FC Frankfurt vs Bayern Munich',
    createdAt: 'Сегодня, 10:11',
    assignedModerator: 'Не назначен',
    avatarTone: 'bg-[linear-gradient(135deg,#f3d6c8_0%,#d49477_100%)]',
    summary: 'Автоматический фильтр поднял кейс после трёх однотипных комментариев под одним событием.',
    targetSummary: '3 однотипных комментария за 2 минуты',
    transactionSummary: 'Не связано с транзакцией',
    restrictionState: 'Ограничения не применялись',
    complaints: '1 новая жалоба',
    history: [{ id: 'm5038-h1', actor: 'System', action: 'Кейс создан автопроверкой комментариев', at: '10:11' }],
    notes: [
      {
        id: 'm5038-n1',
        title: 'Первичная оценка',
        body: 'Похоже на низкоприоритетный spam-case. Можно обработать пакетно вместе с похожими кейсами.',
        at: '10:13'
      }
    ]
  }
];
