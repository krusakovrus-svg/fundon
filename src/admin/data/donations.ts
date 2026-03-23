export type AdminDonationStatus = 'success' | 'error' | 'refund' | 'dispute';
export type AdminDonationMethod = 'card' | 'sbp' | 'apple-pay';
export type AdminDonationUserFilter = 'all' | 'vip' | 'email' | 'phone';
export type AdminDonationAmountFilter = 'all' | 'small' | 'medium' | 'large';

export interface AdminDonationsKpi {
  id: string;
  label: string;
  value: number;
  kind: 'currency' | 'percent' | 'count';
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'rose';
}

export interface AdminDonationStatusHistoryItem {
  id: string;
  label: string;
  at: string;
}

export interface AdminManagedDonation {
  id: string;
  user: string;
  userMeta: string;
  userFilter: AdminDonationUserFilter;
  event: string;
  eventFilter: string;
  side: string;
  amount: number;
  refundAmount: number | null;
  status: AdminDonationStatus;
  method: AdminDonationMethod;
  at: string;
  disputeNote: string;
  internalComment: string;
  avatarTone: string;
  statusHistory: AdminDonationStatusHistoryItem[];
}

export const adminDonationsKpis: AdminDonationsKpi[] = [
  { id: 'today', label: 'Донаты за сегодня', value: 128450, kind: 'currency', hint: '+14% к вчера', tone: 'blue' },
  { id: 'success', label: 'Успешные', value: 94.8, kind: 'percent', hint: '1 284 транзакции', tone: 'green' },
  { id: 'failed', label: 'Ошибка', value: 27, kind: 'count', hint: '−6 за сутки', tone: 'orange' },
  { id: 'returns', label: 'Возврат / спорные', value: 9, kind: 'count', hint: '3 требуют решения', tone: 'rose' }
];

export const adminDonationStatusFilters = [
  { id: 'all', label: 'Все статусы' },
  { id: 'success', label: 'Успешно' },
  { id: 'error', label: 'Ошибка' },
  { id: 'refund', label: 'Возврат' },
  { id: 'dispute', label: 'Спорно' }
] as const;

export const adminDonationUserFilters = [
  { id: 'all', label: 'Все пользователи' },
  { id: 'vip', label: 'VIP и крупные суммы' },
  { id: 'email', label: 'С email' },
  { id: 'phone', label: 'С телефоном' }
] as const;

export const adminDonationMethodFilters = [
  { id: 'all', label: 'Все методы' },
  { id: 'card', label: 'Банковская карта' },
  { id: 'sbp', label: 'СБП' },
  { id: 'apple-pay', label: 'Apple Pay' }
] as const;

export const adminDonationAmountFilters = [
  { id: 'all', label: 'Любая сумма' },
  { id: 'small', label: 'До 1 000 ₽' },
  { id: 'medium', label: '1 000–5 000 ₽' },
  { id: 'large', label: 'От 5 000 ₽' }
] as const;

export const adminDonationEventFilters = [
  { id: 'all', label: 'Все события' },
  { id: 'eintracht-bayern', label: 'Айнтрахт Франкфурт vs Бавария' },
  { id: 'ufc-271', label: 'UFC Fight Night 271' },
  { id: 'pistons-lakers', label: 'Детройт Пистонс vs Лос-Анджелес Лейкерс' },
  { id: 'vnl', label: 'Франция Pro vs Бельгия Pro' },
  { id: 'valorant', label: 'Dragon Ranger Gaming vs Any Questions Gaming' },
  { id: 'lokomotiv-spartak', label: 'Локомотив vs Спартак' }
] as const;

export const adminDonationSideFilters = [
  { id: 'all', label: 'Все стороны' },
  { id: 'eintracht', label: 'Айнтрахт Франкфурт' },
  { id: 'adesanya', label: 'Адесанья' },
  { id: 'lakers', label: 'Лос-Анджелес Лейкерс' },
  { id: 'france-pro', label: 'Франция Pro' },
  { id: 'dragon-ranger', label: 'Dragon Ranger Gaming' },
  { id: 'spartak', label: 'Спартак' }
] as const;

export const adminManagedDonations: AdminManagedDonation[] = [
  {
    id: 'TX-901245',
    user: 'Алексей Петров',
    userMeta: 'alex.petrov@mail.com',
    userFilter: 'vip',
    event: 'Айнтрахт Франкфурт vs Бавария',
    eventFilter: 'eintracht-bayern',
    side: 'Айнтрахт Франкфурт',
    amount: 12300,
    refundAmount: null,
    status: 'success',
    method: 'card',
    at: '23 мар 2026, 20:14',
    disputeNote: 'Спор отсутствует.',
    internalComment: 'Крупный повторный донат от VIP-участника.',
    avatarTone: 'bg-[linear-gradient(135deg,#f2c8b4_0%,#d7906d_100%)]',
    statusHistory: [
      { id: 'tx1-h1', label: 'Платёж подтверждён', at: '20:14' },
      { id: 'tx1-h2', label: 'Проверка антифрода пройдена', at: '20:13' },
      { id: 'tx1-h3', label: 'Создан запрос в шлюз', at: '20:12' }
    ]
  },
  {
    id: 'TX-901246',
    user: 'Юлия Стар',
    userMeta: '+7 912 345 67 89',
    userFilter: 'phone',
    event: 'UFC Fight Night 271',
    eventFilter: 'ufc-271',
    side: 'Адесанья',
    amount: 800,
    refundAmount: null,
    status: 'error',
    method: 'apple-pay',
    at: '23 мар 2026, 20:16',
    disputeNote: 'Платёж отклонён банком-эмитентом.',
    internalComment: 'Рекомендуется повторная попытка после прохождения 3DS.',
    avatarTone: 'bg-[linear-gradient(135deg,#f7d2c8_0%,#d89a8a_100%)]',
    statusHistory: [
      { id: 'tx2-h1', label: 'Ошибка оплаты', at: '20:16' },
      { id: 'tx2-h2', label: '3DS не завершён', at: '20:15' },
      { id: 'tx2-h3', label: 'Создан запрос в шлюз', at: '20:15' }
    ]
  },
  {
    id: 'TX-901247',
    user: 'Максим Иванов',
    userMeta: 'max.ivanov@gmail.com',
    userFilter: 'email',
    event: 'Детройт Пистонс vs Лос-Анджелес Лейкерс',
    eventFilter: 'pistons-lakers',
    side: 'Лос-Анджелес Лейкерс',
    amount: 3500,
    refundAmount: 3500,
    status: 'refund',
    method: 'sbp',
    at: '23 мар 2026, 20:19',
    disputeNote: 'Пользователь запросил возврат после двойного списания.',
    internalComment: 'Возврат согласован, ожидает подтверждения финансовой команды.',
    avatarTone: 'bg-[linear-gradient(135deg,#f0cfbc_0%,#cb8d6d_100%)]',
    statusHistory: [
      { id: 'tx3-h1', label: 'Возврат инициирован', at: '20:24' },
      { id: 'tx3-h2', label: 'Платёж подтверждён', at: '20:19' },
      { id: 'tx3-h3', label: 'Средства списаны', at: '20:18' }
    ]
  },
  {
    id: 'TX-901248',
    user: 'Ольга Смайл',
    userMeta: 'olga.smile@gmail.com',
    userFilter: 'email',
    event: 'Франция Pro vs Бельгия Pro',
    eventFilter: 'vnl',
    side: 'Франция Pro',
    amount: 1200,
    refundAmount: null,
    status: 'success',
    method: 'card',
    at: '23 мар 2026, 20:22',
    disputeNote: 'Спор отсутствует.',
    internalComment: 'Стандартный live-донат без отклонений.',
    avatarTone: 'bg-[linear-gradient(135deg,#f6d5cc_0%,#cb9c88_100%)]',
    statusHistory: [
      { id: 'tx4-h1', label: 'Платёж подтверждён', at: '20:22' },
      { id: 'tx4-h2', label: 'Проверка антифрода пройдена', at: '20:21' },
      { id: 'tx4-h3', label: 'Создан запрос в шлюз', at: '20:21' }
    ]
  },
  {
    id: 'TX-901249',
    user: 'Gamer89',
    userMeta: 'gamer_89@mail.ru',
    userFilter: 'email',
    event: 'Dragon Ranger Gaming vs Any Questions Gaming',
    eventFilter: 'valorant',
    side: 'Dragon Ranger Gaming',
    amount: 650,
    refundAmount: null,
    status: 'dispute',
    method: 'card',
    at: '23 мар 2026, 20:27',
    disputeNote: 'Пользователь оспаривает списание после ограничения аккаунта.',
    internalComment: 'Нужно проверить связь со статусом аккаунта и блокировкой комнаты.',
    avatarTone: 'bg-[linear-gradient(135deg,#d9dfe9_0%,#b0bdcf_100%)]',
    statusHistory: [
      { id: 'tx5-h1', label: 'Открыт спор', at: '20:31' },
      { id: 'tx5-h2', label: 'Платёж подтверждён', at: '20:27' },
      { id: 'tx5-h3', label: 'Создан запрос в шлюз', at: '20:26' }
    ]
  },
  {
    id: 'TX-901250',
    user: 'Ирина Соколова',
    userMeta: 'irina.sokolova@mail.com',
    userFilter: 'vip',
    event: 'Локомотив vs Спартак',
    eventFilter: 'lokomotiv-spartak',
    side: 'Спартак',
    amount: 5000,
    refundAmount: null,
    status: 'success',
    method: 'apple-pay',
    at: '23 мар 2026, 20:34',
    disputeNote: 'Спор отсутствует.',
    internalComment: 'Крупная транзакция, проверка пройдена.',
    avatarTone: 'bg-[linear-gradient(135deg,#f5d6c7_0%,#d39c81_100%)]',
    statusHistory: [
      { id: 'tx6-h1', label: 'Платёж подтверждён', at: '20:34' },
      { id: 'tx6-h2', label: 'Проверка антифрода пройдена', at: '20:33' },
      { id: 'tx6-h3', label: 'Создан запрос в шлюз', at: '20:33' }
    ]
  }
];
