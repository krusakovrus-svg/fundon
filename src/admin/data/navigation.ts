export interface AdminNavItem {
  id: string;
  label: string;
  section: 'main' | 'community' | 'system';
  href?: string;
}

export interface AdminPageMeta {
  title: string;
  description: string;
  searchPlaceholder: string;
  periodLabel: string;
  primaryActionLabel?: string;
}

export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Дашборд', section: 'main', href: '/admin' },
  { id: 'users', label: 'Пользователи', section: 'main' },
  { id: 'athletes', label: 'Спортсмены', section: 'main' },
  { id: 'events', label: 'События', section: 'main', href: '/admin/events' },
  { id: 'donations', label: 'Донаты', section: 'main' },
  { id: 'rooms', label: 'Комнаты', section: 'community' },
  { id: 'ratings', label: 'Рейтинги', section: 'community' },
  { id: 'notifications', label: 'Уведомления', section: 'community' },
  { id: 'analytics', label: 'Аналитика', section: 'system' },
  { id: 'moderation', label: 'Модерация', section: 'system' },
  { id: 'settings', label: 'Настройки', section: 'system' }
];

const defaultMeta: AdminPageMeta = {
  title: 'Дашборд',
  description: 'Операционный центр live-событий, донатов и модерации',
  searchPlaceholder: 'Поиск по событиям, донатам и пользователям',
  periodLabel: 'Последние 7 дней'
};

export function getAdminPageMeta(pathname: string): AdminPageMeta {
  if (pathname.startsWith('/admin/events')) {
    return {
      title: 'События',
      description: 'Управление upcoming, live и draft-событиями FUNDON',
      searchPlaceholder: 'Поиск по событиям, турнирам и участникам',
      periodLabel: 'Последние 7 дней',
      primaryActionLabel: 'Создать событие'
    };
  }

  return defaultMeta;
}
