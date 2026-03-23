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
  secondaryActionLabel?: string;
}

export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Дашборд', section: 'main', href: '/admin' },
  { id: 'users', label: 'Пользователи', section: 'main', href: '/admin/users' },
  { id: 'athletes', label: 'Спортсмены', section: 'main' },
  { id: 'events', label: 'События', section: 'main', href: '/admin/events' },
  { id: 'donations', label: 'Донаты', section: 'main', href: '/admin/donations' },
  { id: 'rooms', label: 'Комнаты', section: 'community' },
  { id: 'ratings', label: 'Рейтинги', section: 'community', href: '/admin/ratings' },
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
  if (pathname.startsWith('/admin/donations')) {
    return {
      title: 'Донаты и транзакции',
      description: 'Управление платежами, возвратами, спорами и внутренними комментариями',
      searchPlaceholder: 'Поиск по ID, пользователю, событию и транзакции',
      periodLabel: 'Последние 30 дней',
      secondaryActionLabel: 'Экспорт CSV'
    };
  }

  if (pathname.startsWith('/admin/users')) {
    return {
      title: 'Пользователи',
      description: 'Управление участниками платформы, балансами и активностью поддержки',
      searchPlaceholder: 'Поиск по имени, email, телефону и никнейму',
      periodLabel: 'Последние 30 дней',
      primaryActionLabel: 'Добавить пользователя'
    };
  }

  if (pathname.startsWith('/admin/events')) {
    return {
      title: 'События',
      description: 'Управление upcoming, live и draft-событиями FUNDON',
      searchPlaceholder: 'Поиск по событиям, турнирам и участникам',
      periodLabel: 'Последние 7 дней',
      primaryActionLabel: 'Создать событие'
    };
  }

  if (pathname.startsWith('/admin/ratings')) {
    return {
      title: 'Рейтинги',
      description: 'Управление логикой начисления, пересчётом и состоянием рейтингов FUNDON',
      searchPlaceholder: 'Поиск по пользователю, событию и правилу',
      periodLabel: 'Текущий период',
      primaryActionLabel: 'Пересчитать рейтинг',
      secondaryActionLabel: 'Создать правило'
    };
  }

  return defaultMeta;
}
