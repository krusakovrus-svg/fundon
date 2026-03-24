export type AdminUserStatus = 'active' | 'new' | 'limited' | 'blocked';
export type AdminUserRole = 'user' | 'room-lead' | 'ambassador' | 'vip';

export interface AdminUsersKpi {
  id: string;
  label: string;
  value: number;
  delta: string;
  tone: 'blue' | 'green' | 'indigo' | 'rose';
}

export interface AdminUserDonationHistoryItem {
  id: string;
  event: string;
  side: string;
  amount: number;
  at: string;
}

export interface AdminManagedUser {
  id: string;
  name: string;
  nickname: string;
  email?: string;
  phone?: string;
  balance: number;
  totalDonations: number;
  donationCount: number;
  rating: number;
  status: AdminUserStatus;
  role: AdminUserRole;
  activeRooms: string[];
  notifications: string;
  lastSeen: string;
  lastSeenMinutes: number;
  registeredAt: string;
  registeredDaysAgo: number;
  avatarTone: string;
  donationHistory: AdminUserDonationHistoryItem[];
}

export const adminUsersKpis: AdminUsersKpi[] = [
  { id: 'total', label: 'Всего пользователей', value: 5120, delta: '+2,4% к месяцу', tone: 'blue' },
  { id: 'active', label: 'Активные сегодня', value: 342, delta: '+18 за час', tone: 'green' },
  { id: 'new', label: 'Новые за 7 дней', value: 118, delta: '+9% к прошлой неделе', tone: 'indigo' },
  { id: 'blocked', label: 'Заблокированные', value: 25, delta: '−3 за неделю', tone: 'rose' }
];

export const adminUserStatusFilters = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активен' },
  { id: 'new', label: 'Новый' },
  { id: 'limited', label: 'Ограничен' },
  { id: 'blocked', label: 'Заблокирован' }
] as const;

export const adminUserRoleFilters = [
  { id: 'all', label: 'Все роли' },
  { id: 'user', label: 'Пользователь' },
  { id: 'room-lead', label: 'Лидер комнаты' },
  { id: 'ambassador', label: 'Амбассадор' },
  { id: 'vip', label: 'VIP' }
] as const;

export const adminManagedUsers: AdminManagedUser[] = [
  {
    id: 'user-alexey',
    name: 'Алексей Петров',
    nickname: 'alex.petrov',
    email: 'alex.petrov@mail.com',
    phone: '+7 912 345 6789',
    balance: 12500,
    totalDonations: 8200,
    donationCount: 14,
    rating: 4.7,
    status: 'active',
    role: 'vip',
    activeRooms: ['Матч дня', 'Bundesliga Live', 'Premium Lounge'],
    notifications: 'Push, email, live-напоминания',
    lastSeen: '2 минуты назад',
    lastSeenMinutes: 2,
    registeredAt: '12 фев 2025',
    registeredDaysAgo: 404,
    avatarTone: 'bg-[linear-gradient(135deg,#f2c8b4_0%,#d7906d_100%)]',
    donationHistory: [
      { id: 'alex-1', event: 'FC Frankfurt vs Bayern Munich', side: 'FC Frankfurt', amount: 630, at: '12 мин назад' },
      { id: 'alex-2', event: 'Локомотив vs Спартак', side: 'Спартак', amount: 500, at: 'вчера' },
      { id: 'alex-3', event: 'France Pro vs Belgium Pro', side: 'France Pro', amount: 850, at: '2 дня назад' }
    ]
  },
  {
    id: 'user-julia',
    name: 'JuliaStar',
    nickname: 'juliastar',
    email: 'julia.star@gmail.com',
    phone: '+7 916 456 1122',
    balance: 3150,
    totalDonations: 1100,
    donationCount: 4,
    rating: 3.9,
    status: 'new',
    role: 'user',
    activeRooms: ['Новички Fansten'],
    notifications: 'Push',
    lastSeen: '15 минут назад',
    lastSeenMinutes: 15,
    registeredAt: '17 мар 2026',
    registeredDaysAgo: 6,
    avatarTone: 'bg-[linear-gradient(135deg,#f7d2c8_0%,#d89a8a_100%)]',
    donationHistory: [
      { id: 'julia-1', event: 'Detroit Pistons vs Los Angeles Lakers', side: 'Los Angeles Lakers', amount: 300, at: '1 час назад' },
      { id: 'julia-2', event: 'UFC Fight Night 271', side: 'Adesanya', amount: 450, at: 'вчера' }
    ]
  },
  {
    id: 'user-max',
    name: 'Максим Иванов',
    nickname: 'max.ivanov',
    email: 'max.ivanov@gmail.com',
    phone: '+7 926 888 1100',
    balance: 0,
    totalDonations: 15500,
    donationCount: 22,
    rating: 5,
    status: 'limited',
    role: 'room-lead',
    activeRooms: ['MMA Watch Room', 'Premium Cage'],
    notifications: 'Push, room alerts',
    lastSeen: '5 минут назад',
    lastSeenMinutes: 5,
    registeredAt: '09 окт 2024',
    registeredDaysAgo: 531,
    avatarTone: 'bg-[linear-gradient(135deg,#f0cfbc_0%,#cb8d6d_100%)]',
    donationHistory: [
      { id: 'max-1', event: 'UFC Fight Night 271', side: 'Pfeifer', amount: 2000, at: 'сегодня' },
      { id: 'max-2', event: 'Alvarez vs Jones', side: 'Jones', amount: 1500, at: 'вчера' },
      { id: 'max-3', event: 'Спартак vs Зенит', side: 'Зенит', amount: 900, at: '3 дня назад' }
    ]
  },
  {
    id: 'user-olga',
    name: 'OlgaSmile',
    nickname: 'olga.smile',
    email: 'olga.smile@gmail.com',
    phone: '+7 916 777 5555',
    balance: 7800,
    totalDonations: 22400,
    donationCount: 31,
    rating: 4.5,
    status: 'active',
    role: 'ambassador',
    activeRooms: ['Women Champions League', 'MMA Fans'],
    notifications: 'Push, email',
    lastSeen: '25 минут назад',
    lastSeenMinutes: 25,
    registeredAt: '22 янв 2025',
    registeredDaysAgo: 425,
    avatarTone: 'bg-[linear-gradient(135deg,#f6d5cc_0%,#cb9c88_100%)]',
    donationHistory: [
      { id: 'olga-1', event: 'Arsenal London (ж) vs Chelsea (ж)', side: 'Arsenal London (ж)', amount: 1200, at: 'сегодня' },
      { id: 'olga-2', event: 'FC Frankfurt vs Bayern Munich', side: 'Bayern Munich', amount: 950, at: 'вчера' }
    ]
  },
  {
    id: 'user-gamer',
    name: 'Gamer89',
    nickname: 'gamer_89',
    email: 'gamer_89@mail.ru',
    phone: '+7 901 111 4444',
    balance: 550,
    totalDonations: 300,
    donationCount: 1,
    rating: 3.2,
    status: 'blocked',
    role: 'user',
    activeRooms: [],
    notifications: 'Отключены',
    lastSeen: '7 дней назад',
    lastSeenMinutes: 10080,
    registeredAt: '01 мар 2026',
    registeredDaysAgo: 22,
    avatarTone: 'bg-[linear-gradient(135deg,#d9dfe9_0%,#b0bdcf_100%)]',
    donationHistory: [
      { id: 'gamer-1', event: 'Dragon Ranger Gaming vs Any Questions Gaming', side: 'Dragon Ranger Gaming', amount: 300, at: '5 дней назад' }
    ]
  },
  {
    id: 'user-irina',
    name: 'Ирина Соколова',
    nickname: 'ira.sokol',
    email: 'irina.sokolova@mail.com',
    phone: '+7 915 101 6677',
    balance: 19300,
    totalDonations: 31800,
    donationCount: 43,
    rating: 4.9,
    status: 'active',
    role: 'vip',
    activeRooms: ['Матч дня', 'NBA Night', 'Center Court'],
    notifications: 'Push, email, SMS',
    lastSeen: 'сейчас',
    lastSeenMinutes: 0,
    registeredAt: '11 авг 2024',
    registeredDaysAgo: 590,
    avatarTone: 'bg-[linear-gradient(135deg,#f5d6c7_0%,#d39c81_100%)]',
    donationHistory: [
      { id: 'irina-1', event: 'Detroit Pistons vs Los Angeles Lakers', side: 'Los Angeles Lakers', amount: 1800, at: '8 мин назад' },
      { id: 'irina-2', event: 'Miami Open', side: 'Haddad Maia', amount: 1250, at: 'вчера' },
      { id: 'irina-3', event: 'Спартак vs Зенит', side: 'Спартак', amount: 1000, at: '4 дня назад' }
    ]
  }
];
