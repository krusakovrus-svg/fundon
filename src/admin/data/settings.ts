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
}

export const adminSettingsTabs: AdminSettingsTab[] = [
  { id: 'general', label: 'Общие' },
  { id: 'roles', label: 'Роли и права' },
  { id: 'payments', label: 'Платежи' },
  { id: 'notifications', label: 'Уведомления' },
  { id: 'ratings', label: 'Рейтинги' },
  { id: 'rooms', label: 'Комнаты' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'flags', label: 'Feature Flags' },
  { id: 'security', label: 'Безопасность' },
  { id: 'audit', label: 'Audit Log' }
];

export const adminPlatformDomains = ['fundon.app', 'fundon.com', 'admin.fundon.app'] as const;
export const adminPlatformLanguages = ['Русский', 'English'] as const;
export const adminPlatformTimezones = ['(GMT+3:00) Москва', '(UTC+1:00) Берлин', '(UTC-5:00) New York'] as const;
export const adminPlatformCurrencies = ['₽ — Российский рубль', 'USD — Доллар США', 'EUR — Евро'] as const;

export const adminRoles: AdminRoleItem[] = [
  { id: 'role-admin', name: 'Администратор', summary: 'Полный доступ к событиям, платежам и настройкам', members: '6 участников' },
  { id: 'role-mod', name: 'Модератор', summary: 'Модерация комнат, жалоб и ограничений', members: '12 участников' },
  { id: 'role-ops', name: 'Операционный менеджер', summary: 'Live-события, донаты и расписания уведомлений', members: '8 участников' },
  { id: 'role-analyst', name: 'Аналитик', summary: 'Отчёты, рейтинги, сегменты и Audit Log', members: '4 участника' }
];

export const adminPaymentProviders: AdminPaymentProvider[] = [
  { id: 'pay-1', name: 'T-Bank Acquiring', status: 'active' },
  { id: 'pay-2', name: 'CloudPayments', status: 'active' },
  { id: 'pay-3', name: 'Unified Wallet', status: 'review' }
];

export const adminNotificationChannels: AdminNotificationChannel[] = [
  { id: 'notify-1', title: 'Push-уведомления', description: 'Системные пуши по live-событиям, жалобам и действиям платформы' },
  { id: 'notify-2', title: 'Email-оповещения', description: 'Еженедельные отчёты, critical alerts и шаблонные отправки' },
  { id: 'notify-3', title: 'Комнатные уведомления', description: 'События внутри комнат, запуск эфира и всплески активности' }
];

export const adminFeatureFlags: AdminFeatureFlag[] = [
  { id: 'flag-1', name: 'Smart Donation Boost', description: 'Умный буст суммы поддержки внутри live flow', rollout: '25% production' },
  { id: 'flag-2', name: 'Room Momentum Cards', description: 'Новые карточки энергии комнаты и групповой поддержки', rollout: 'Внутренний beta' },
  { id: 'flag-3', name: 'Anti-fraud Hold', description: 'Автоматическая задержка спорных транзакций до ручной проверки', rollout: '100% production' }
];

export const adminAuditEntries: AdminAuditEntry[] = [
  {
    id: 'audit-1',
    title: 'Обновлён payout limit',
    actor: 'Ольга Романова',
    at: 'Сегодня, 14:20',
    description: 'Лимит на вывод изменён с ₽ 250 000 до ₽ 300 000 в день.'
  },
  {
    id: 'audit-2',
    title: 'Создана роль Support Ops',
    actor: 'Андрей Смирнов',
    at: 'Сегодня, 11:05',
    description: 'Добавлена роль с доступом к уведомлениям, комнатам и модерации.'
  },
  {
    id: 'audit-3',
    title: 'Включён feature flag Anti-fraud Hold',
    actor: 'Екатерина Белова',
    at: 'Вчера, 18:42',
    description: 'Полный rollout для новых suspicious payment cases.'
  }
];
