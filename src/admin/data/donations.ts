export type AdminDonationStatus = 'success' | 'error' | 'refund' | 'dispute';

export interface AdminDonationsKpi {
  id: string;
  label: string;
  value: string;
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
  event: string;
  side: string;
  amount: string;
  status: AdminDonationStatus;
  method: string;
  at: string;
  disputeNote: string;
  internalComment: string;
  avatarTone: string;
  statusHistory: AdminDonationStatusHistoryItem[];
}

export const adminDonationsKpis: AdminDonationsKpi[] = [
  { id: 'today', label: 'Донаты за сегодня', value: '₽ 128 450', hint: '+14% к вчера', tone: 'blue' },
  { id: 'success', label: 'Успешные платежи', value: '94.8%', hint: '1 284 транзакции', tone: 'green' },
  { id: 'failed', label: 'Ошибки / отклонённые', value: '27', hint: '−6 за сутки', tone: 'orange' },
  { id: 'returns', label: 'Возвраты / спорные', value: '9', hint: '3 требуют решения', tone: 'rose' }
];

export const adminDonationStatusFilters = [
  { id: 'all', label: 'Все' },
  { id: 'success', label: 'Успешно' },
  { id: 'error', label: 'Ошибка' },
  { id: 'refund', label: 'Возврат' },
  { id: 'dispute', label: 'Спорно' }
] as const;

export const adminDonationMethodFilters = [
  { id: 'all', label: 'Все методы' },
  { id: 'card', label: 'Банковская карта' },
  { id: 'sbp', label: 'СБП' },
  { id: 'apple-pay', label: 'Apple Pay' }
] as const;

export const adminManagedDonations: AdminManagedDonation[] = [
  {
    id: 'TX-901245',
    user: 'Алексей Петров',
    userMeta: 'alex.petrov@mail.com',
    event: 'FC Frankfurt vs Bayern Munich',
    side: 'FC Frankfurt',
    amount: '12 300 ₽',
    status: 'success',
    method: 'Банковская карта',
    at: '18 июл 2024, 20:14',
    disputeNote: 'Спор отсутствует',
    internalComment: 'Крупный повторный донат от VIP-пользователя.',
    avatarTone: 'bg-[linear-gradient(135deg,#f2c8b4_0%,#d7906d_100%)]',
    statusHistory: [
      { id: 'tx1-h1', label: 'Платёж подтверждён', at: '20:14' },
      { id: 'tx1-h2', label: 'Проверка antifraud пройдена', at: '20:13' },
      { id: 'tx1-h3', label: 'Создан запрос в шлюз', at: '20:12' }
    ]
  },
  {
    id: 'TX-901246',
    user: 'JuliaStar',
    userMeta: '+7 912 345 6789',
    event: 'UFC Fight Night 271',
    side: 'Adesanya',
    amount: '800 ₽',
    status: 'error',
    method: 'Apple Pay',
    at: '18 июл 2024, 20:16',
    disputeNote: 'Платёж отклонён эмитентом.',
    internalComment: 'Рекомендуется повторная попытка после проверки 3DS.',
    avatarTone: 'bg-[linear-gradient(135deg,#f7d2c8_0%,#d89a8a_100%)]',
    statusHistory: [
      { id: 'tx2-h1', label: 'Ошибка оплаты', at: '20:16' },
      { id: 'tx2-h2', label: '3DS challenge не завершён', at: '20:15' },
      { id: 'tx2-h3', label: 'Создан запрос в шлюз', at: '20:15' }
    ]
  },
  {
    id: 'TX-901247',
    user: 'Максим Иванов',
    userMeta: 'max.ivanov@gmail.com',
    event: 'Detroit Pistons vs Los Angeles Lakers',
    side: 'Los Angeles Lakers',
    amount: '3 500 ₽',
    status: 'refund',
    method: 'СБП',
    at: '18 июл 2024, 20:19',
    disputeNote: 'Пользователь запросил возврат после двойного списания.',
    internalComment: 'Возврат согласован, ожидает подтверждения фин. команды.',
    avatarTone: 'bg-[linear-gradient(135deg,#f0cfbc_0%,#cb8d6d_100%)]',
    statusHistory: [
      { id: 'tx3-h1', label: 'Возврат инициирован', at: '20:24' },
      { id: 'tx3-h2', label: 'Платёж подтверждён', at: '20:19' },
      { id: 'tx3-h3', label: 'Средства списаны', at: '20:18' }
    ]
  },
  {
    id: 'TX-901248',
    user: 'OlgaSmile',
    userMeta: 'olga.smile@gmail.com',
    event: 'France Pro vs Belgium Pro',
    side: 'France Pro',
    amount: '1 200 ₽',
    status: 'success',
    method: 'Банковская карта',
    at: '18 июл 2024, 20:22',
    disputeNote: 'Спор отсутствует',
    internalComment: 'Стандартный live-донат без отклонений.',
    avatarTone: 'bg-[linear-gradient(135deg,#f6d5cc_0%,#cb9c88_100%)]',
    statusHistory: [
      { id: 'tx4-h1', label: 'Платёж подтверждён', at: '20:22' },
      { id: 'tx4-h2', label: 'Antifraud OK', at: '20:21' },
      { id: 'tx4-h3', label: 'Создан запрос в шлюз', at: '20:21' }
    ]
  },
  {
    id: 'TX-901249',
    user: 'Gamer89',
    userMeta: 'gamer_89@mail.ru',
    event: 'Dragon Ranger Gaming vs Any Questions Gaming',
    side: 'Dragon Ranger Gaming',
    amount: '650 ₽',
    status: 'dispute',
    method: 'Банковская карта',
    at: '18 июл 2024, 20:27',
    disputeNote: 'Пользователь оспаривает списание после блокировки аккаунта.',
    internalComment: 'Нужно проверить связь со статусом аккаунта и room-ban.',
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
    event: 'Lokomotiv vs Spartak',
    side: 'Spartak',
    amount: '5 000 ₽',
    status: 'success',
    method: 'Apple Pay',
    at: '18 июл 2024, 20:34',
    disputeNote: 'Спор отсутствует',
    internalComment: 'High-value transaction, проверка пройдена.',
    avatarTone: 'bg-[linear-gradient(135deg,#f5d6c7_0%,#d39c81_100%)]',
    statusHistory: [
      { id: 'tx6-h1', label: 'Платёж подтверждён', at: '20:34' },
      { id: 'tx6-h2', label: 'Antifraud OK', at: '20:33' },
      { id: 'tx6-h3', label: 'Создан запрос в шлюз', at: '20:33' }
    ]
  }
];
