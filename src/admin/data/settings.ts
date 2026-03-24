export type AdminSettingsTabId =
  | 'general'
  | 'roles'
  | 'payments'
  | 'notifications'
  | 'ratings'
  | 'rooms'
  | 'integrations'
  | 'flags'
  | 'security'
  | 'audit';

export interface AdminSettingsTab {
  id: AdminSettingsTabId;
  label: string;
}

export interface AdminRoleItem {
  id: string;
  name: string;
  summary: string;
  members: string;
  ownership: string;
  permissions: string[];
  approvalPolicy: string;
}

export interface AdminAdminUserItem {
  id: string;
  name: string;
  roleId: string;
  roleName: string;
  scope: string;
  lastActive: string;
  status: 'active' | 'invited';
}

export interface AdminPaymentProvider {
  id: string;
  name: string;
  status: 'active' | 'review';
}

export interface AdminNotificationChannel {
  id: string;
  title: string;
  description: string;
}

export interface AdminFeatureFlag {
  id: string;
  name: string;
  description: string;
  rollout: string;
}

export interface AdminAuditEntry {
  id: string;
  title: string;
  actor: string;
  at: string;
  description: string;
  category: 'events' | 'refunds' | 'users' | 'settings' | 'notifications' | 'roles';
}

export const adminSettingsTabs: AdminSettingsTab[] = [
  { id: 'general', label: 'Общие' },
  { id: 'roles', label: 'Роли и права' },
  { id: 'payments', label: 'Платежи' },
  { id: 'notifications', label: 'Уведомления' },
  { id: 'ratings', label: 'Рейтинги' },
  { id: 'rooms', label: 'Комнаты' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'flags', label: 'Флаги функций' },
  { id: 'security', label: 'Безопасность' },
  { id: 'audit', label: 'Журнал аудита' }
];

export const adminPlatformDomains = ['fundon.app', 'fundon.com', 'admin.fundon.app'] as const;
export const adminPlatformLanguages = ['Русский', 'English'] as const;
export const adminPlatformTimezones = ['Москва (GMT+3)', 'Берлин (UTC+1)', 'Нью-Йорк (UTC-5)'] as const;
export const adminPlatformCurrencies = ['Российский рубль (₽)', 'Доллар США ($)', 'Евро (€)'] as const;

export const adminRoles: AdminRoleItem[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    summary: 'Полный контроль над FUNDON, конфигурацией платформы и критичными действиями.',
    members: '3 участника',
    ownership: 'Весь административный контур платформы',
    permissions: ['События и эфирные операции', 'Платежи и возвраты', 'Настройки и интеграции', 'Роли и права'],
    approvalPolicy: 'Может подтверждать все критичные действия без эскалации'
  },
  {
    id: 'operations-manager',
    name: 'Operations Manager',
    summary: 'Отвечает за дашборд, события, спортсменов и ежедневные операционные сценарии.',
    members: '6 участников',
    ownership: 'События, спортсмены, пользователи и дашборд',
    permissions: ['Создание и запуск событий', 'Управление спортсменами и командами', 'Просмотр пользователей', 'Ограниченное управление комнатами'],
    approvalPolicy: 'Завершение эфира и массовые действия требуют второго подтверждения'
  },
  {
    id: 'moderator-support',
    name: 'Moderator / Support',
    summary: 'Ведёт кейсы, ограничения пользователей, жалобы и эскалации по комнатам.',
    members: '10 участников',
    ownership: 'Модерация, пользователи и кейсы поддержки',
    permissions: ['Ограничение и блокировка пользователей', 'Работа с кейсами модерации', 'Контроль комнат', 'Обработка жалоб'],
    approvalPolicy: 'Блокировка пользователя и постоянный бан логируются и требуют подтверждения'
  },
  {
    id: 'finance-payments',
    name: 'Finance / Payments',
    summary: 'Контролирует донаты, возвраты, спорные транзакции и финансовые ограничения.',
    members: '4 участника',
    ownership: 'Донаты, возвраты, балансы и споры',
    permissions: ['Возвраты и спорные платежи', 'Просмотр балансов', 'Проверка крупных операций', 'Финансовые заметки'],
    approvalPolicy: 'Любой возврат выше 5 000 ₽ проходит двойное подтверждение'
  },
  {
    id: 'readonly-analyst',
    name: 'Read-only / Analyst',
    summary: 'Имеет доступ только на просмотр дашборда, списков и отчётных разделов.',
    members: '5 участников',
    ownership: 'Дашборд, отчёты и витрины данных',
    permissions: ['Просмотр дашборда', 'Просмотр пользователей и событий', 'Просмотр аналитики', 'Чтение журнала аудита'],
    approvalPolicy: 'Изменения недоступны'
  }
];

export const adminAdminUsers: AdminAdminUserItem[] = [
  {
    id: 'admin-1',
    name: 'Ольга Романова',
    roleId: 'super-admin',
    roleName: 'Super Admin',
    scope: 'Платформа и настройки',
    lastActive: 'Сейчас',
    status: 'active'
  },
  {
    id: 'admin-2',
    name: 'Андрей Смирнов',
    roleId: 'operations-manager',
    roleName: 'Operations Manager',
    scope: 'Live-события и спортсмены',
    lastActive: '12 минут назад',
    status: 'active'
  },
  {
    id: 'admin-3',
    name: 'Ирина Климова',
    roleId: 'moderator-support',
    roleName: 'Moderator / Support',
    scope: 'Модерация и пользователи',
    lastActive: '18 минут назад',
    status: 'active'
  },
  {
    id: 'admin-4',
    name: 'Павел Новиков',
    roleId: 'finance-payments',
    roleName: 'Finance / Payments',
    scope: 'Возвраты и споры',
    lastActive: '35 минут назад',
    status: 'active'
  },
  {
    id: 'admin-5',
    name: 'Екатерина Белова',
    roleId: 'readonly-analyst',
    roleName: 'Read-only / Analyst',
    scope: 'Дашборд и аудит',
    lastActive: '1 час назад',
    status: 'active'
  },
  {
    id: 'admin-6',
    name: 'Никита Серов',
    roleId: 'moderator-support',
    roleName: 'Moderator / Support',
    scope: 'Эскалации поддержки',
    lastActive: 'Приглашение отправлено',
    status: 'invited'
  }
];

export const adminPaymentProviders: AdminPaymentProvider[] = [
  { id: 'pay-1', name: 'T-Bank Acquiring', status: 'active' },
  { id: 'pay-2', name: 'CloudPayments', status: 'active' },
  { id: 'pay-3', name: 'Unified Wallet', status: 'review' }
];

export const adminNotificationChannels: AdminNotificationChannel[] = [
  { id: 'notify-1', title: 'Push-уведомления', description: 'Системные уведомления по live-событиям, жалобам и действиям платформы' },
  { id: 'notify-2', title: 'Email-уведомления', description: 'Еженедельные отчёты, критичные сигналы и шаблонные отправки' },
  { id: 'notify-3', title: 'Уведомления комнат', description: 'События внутри комнат, запуск эфира и всплески активности' }
];

export const adminFeatureFlagNames = ['Smart Donation Boost', 'Room Momentum Cards', 'Anti-fraud Hold'] as const;

export const adminFeatureFlags: AdminFeatureFlag[] = [
  { id: 'flag-1', name: 'Smart Donation Boost', description: 'Умный буст суммы поддержки внутри live-потока', rollout: '25% продакшена' },
  { id: 'flag-2', name: 'Room Momentum Cards', description: 'Карточки энергии комнаты и групповой поддержки', rollout: 'Внутренняя бета' },
  { id: 'flag-3', name: 'Anti-fraud Hold', description: 'Автоматическая задержка спорных транзакций до ручной проверки', rollout: '100% продакшена' }
];

export const adminAuditEntries: AdminAuditEntry[] = [
  {
    id: 'audit-1',
    title: 'Событие переведено в эфир',
    actor: 'Андрей Смирнов',
    at: 'Сегодня, 19:42',
    description: 'FC Frankfurt vs Bayern Munich переведено в эфир, поддержка и связка с комнатой активированы.',
    category: 'events'
  },
  {
    id: 'audit-2',
    title: 'Событие завершено',
    actor: 'Ольга Романова',
    at: 'Сегодня, 18:16',
    description: 'Miami Open: Sonmez vs Haddad Maia завершено, поддержка отключена и комната закрыта.',
    category: 'events'
  },
  {
    id: 'audit-3',
    title: 'Возврат подтверждён',
    actor: 'Павел Новиков',
    at: 'Сегодня, 16:28',
    description: 'Возврат по TX-901247 на сумму 3 500 ₽ подтверждён после ручной сверки двойного списания.',
    category: 'refunds'
  },
  {
    id: 'audit-4',
    title: 'Пользователь заблокирован',
    actor: 'Ирина Климова',
    at: 'Сегодня, 14:52',
    description: 'Аккаунт Gamer89 заблокирован после повторного нарушения правил комнаты и связанной эскалации по спору.',
    category: 'users'
  },
  {
    id: 'audit-5',
    title: 'Обновлены критичные настройки',
    actor: 'Ольга Романова',
    at: 'Сегодня, 12:11',
    description: 'Изменены лимит вывода, тихие часы и политика ручной проверки подозрительных платежей.',
    category: 'settings'
  },
  {
    id: 'audit-6',
    title: 'Отправлено системное уведомление',
    actor: 'Наталья Фролова',
    at: 'Сегодня, 11:20',
    description: 'Push-кампания по вечерним live-событиям отправлена сегменту активных донатеров.',
    category: 'notifications'
  },
  {
    id: 'audit-7',
    title: 'Изменена роль доступа',
    actor: 'Ольга Романова',
    at: 'Вчера, 18:04',
    description: 'Никита Серов приглашён в роль Moderator / Support с доступом к пользователям, комнатам и модерации.',
    category: 'roles'
  }
];

export const adminArchiveDurationOptions = ['12 часов', '24 часа', '48 часов'] as const;
export const adminSupportMinimumOptions = ['10 ₽', '25 ₽', '50 ₽', '100 ₽'] as const;
export const adminSupportMaximumOptions = ['5 000 ₽', '10 000 ₽', '20 000 ₽'] as const;
export const adminQuickAmountPresetOptions = ['10 / 50 / 100 / 500 ₽', '25 / 100 / 250 / 1 000 ₽', '50 / 250 / 500 / 2 000 ₽'] as const;

export interface AdminSportSupportRule {
  id: string;
  sport: string;
  archiveWindow: string;
  quickAmounts: string;
  customAmount: boolean;
}

export interface AdminLocalizationRule {
  id: string;
  category: string;
  ruLabel: string;
  enLabel: string;
}

export const adminSportSupportRules: AdminSportSupportRule[] = [
  {
    id: 'sport-rule-1',
    sport: 'Футбол',
    archiveWindow: '24 часа',
    quickAmounts: '25 / 100 / 250 / 1 000 ₽',
    customAmount: true
  },
  {
    id: 'sport-rule-2',
    sport: 'MMA',
    archiveWindow: '24 часа',
    quickAmounts: '50 / 250 / 500 / 2 000 ₽',
    customAmount: true
  },
  {
    id: 'sport-rule-3',
    sport: 'Теннис',
    archiveWindow: '12 часов',
    quickAmounts: '10 / 50 / 100 / 500 ₽',
    customAmount: false
  }
];

export const adminLocalizationRules: AdminLocalizationRule[] = [
  { id: 'loc-1', category: 'Вид спорта', ruLabel: 'Единоборства', enLabel: 'Martial Arts' },
  { id: 'loc-2', category: 'Вид спорта', ruLabel: 'Киберспорт', enLabel: 'Esports' },
  { id: 'loc-3', category: 'Категория', ruLabel: 'Стадия / раунд', enLabel: 'Stage / Round' },
  { id: 'loc-4', category: 'Категория', ruLabel: 'Архив событий', enLabel: 'Event Archive' }
];
