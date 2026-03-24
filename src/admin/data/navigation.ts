export interface AdminNavItem {
  id: string;
  label: string;
  section: 'main' | 'community' | 'system';
  href?: string;
}

export interface AdminPageMeta {
  title: string;
  description?: string;
  searchPlaceholder: string;
  periodLabel?: string;
  comparePeriodLabel?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  showNotifications?: boolean;
  showProfile?: boolean;
}

export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Дашборд', section: 'main', href: '/admin' },
  { id: 'users', label: 'Пользователи', section: 'main', href: '/admin/users' },
  { id: 'athletes', label: 'Спортсмены', section: 'main', href: '/admin/athletes' },
  { id: 'events', label: 'События', section: 'main', href: '/admin/events' },
  { id: 'donations', label: 'Донаты', section: 'main', href: '/admin/donations' },
  { id: 'rooms', label: 'Комнаты', section: 'community', href: '/admin/rooms' },
  { id: 'ratings', label: 'Рейтинги', section: 'community', href: '/admin/ratings' },
  { id: 'notifications', label: 'Уведомления', section: 'community', href: '/admin/notifications' },
  { id: 'analytics', label: 'Аналитика', section: 'system', href: '/admin/analytics' },
  { id: 'moderation', label: 'Модерация', section: 'system', href: '/admin/moderation' },
  { id: 'settings', label: 'Настройки', section: 'system', href: '/admin/settings' }
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
      description: 'Управление платежами, возвратами и спорными транзакциями Fansten',
      searchPlaceholder: 'Поиск по ID, пользователю, событию и транзакции',
      periodLabel: 'Последние 30 дней',
      secondaryActionLabel: 'Экспорт'
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

  if (pathname.startsWith('/admin/athletes')) {
    return {
      title: 'Спортсмены',
      description: 'Управление спортсменами, командами, эфирными статусами и поддержкой',
      searchPlaceholder: 'Поиск по имени, команде, стране и виду спорта',
      periodLabel: 'Последние 30 дней',
      primaryActionLabel: 'Добавить спортсмена'
    };
  }

  if (pathname.startsWith('/admin/events')) {
    return {
      title: 'События',
      description: 'Управление ближайшими, эфирными и черновыми событиями Fansten',
      searchPlaceholder: 'Поиск по событиям, турнирам и участникам',
      periodLabel: 'Последние 7 дней',
      primaryActionLabel: 'Создать событие'
    };
  }

  if (pathname.startsWith('/admin/rooms')) {
    return {
      title: 'Комнаты',
      description: 'Управление комнатами, активностью участников и модерацией Fansten',
      searchPlaceholder: 'Поиск по комнате, событию, модератору и заметкам',
      periodLabel: 'За месяц',
      primaryActionLabel: 'Создать комнату'
    };
  }

  if (pathname.startsWith('/admin/notifications')) {
    return {
      title: 'Уведомления',
      description: 'Управление push, email и событийными уведомлениями для разных сегментов Fansten',
      searchPlaceholder: 'Поиск по уведомлению, событию, шаблону и сегменту',
      periodLabel: 'Последние 30 дней',
      primaryActionLabel: 'Создать уведомление'
    };
  }

  if (pathname.startsWith('/admin/ratings')) {
    return {
      title: 'Рейтинги',
      description: 'Управление логикой начисления, пересчётом и состоянием рейтингов Fansten',
      searchPlaceholder: 'Поиск по пользователю, событию и правилу',
      periodLabel: 'Текущий период',
      primaryActionLabel: 'Пересчитать рейтинг',
      secondaryActionLabel: 'Создать правило'
    };
  }

  if (pathname.startsWith('/admin/analytics')) {
    return {
      title: 'Аналитика',
      searchPlaceholder: 'Поиск по метрике, событию или сегменту',
      periodLabel: 'Последние 30 дней',
      comparePeriodLabel: 'К прошлому периоду',
      primaryActionLabel: 'Экспорт',
      showNotifications: false,
      showProfile: false
    };
  }

  if (pathname.startsWith('/admin/moderation')) {
    return {
      title: 'Модерация',
      description: 'Операционный контроль жалоб, рисков, подозрительных транзакций и кейсов Fansten',
      searchPlaceholder: 'Поиск по кейсу, пользователю, событию и объекту',
      periodLabel: 'Последние 7 дней',
      primaryActionLabel: 'Открыть инцидент'
    };
  }

  if (pathname.startsWith('/admin/settings')) {
    return {
      title: 'Настройки',
      description: 'Центральная конфигурация платформы, ролей, платежей, уведомлений и системных политик Fansten',
      searchPlaceholder: 'Поиск по настройкам, ролям, платежам и интеграциям',
      primaryActionLabel: 'Сохранить изменения'
    };
  }

  return defaultMeta;
}
