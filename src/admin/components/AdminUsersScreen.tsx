'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  adminManagedUsers,
  adminUserRoleFilters,
  adminUsersKpis,
  adminUserStatusFilters,
  type AdminManagedUser,
  type AdminUserRole,
  type AdminUserStatus
} from '@/admin/data/users';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

type BalanceFilterId = 'all' | 'low' | 'mid' | 'high';
type ActivityFilterId = 'all' | 'day' | 'week' | 'inactive';
type RegistrationFilterId = 'week' | 'month' | 'quarter' | 'all';

const balanceFilters: Array<{ id: BalanceFilterId; label: string }> = [
  { id: 'all', label: 'Любой баланс' },
  { id: 'low', label: 'До 5 000 ₽' },
  { id: 'mid', label: '5 000–20 000 ₽' },
  { id: 'high', label: '20 000 ₽+' }
];

const activityFilters: Array<{ id: ActivityFilterId; label: string }> = [
  { id: 'all', label: 'Любая активность' },
  { id: 'day', label: 'За 24 часа' },
  { id: 'week', label: 'За 7 дней' },
  { id: 'inactive', label: 'Неактивные' }
];

const registrationFilters: Array<{ id: RegistrationFilterId; label: string }> = [
  { id: 'week', label: 'За 7 дней' },
  { id: 'month', label: 'За 30 дней' },
  { id: 'quarter', label: 'За 90 дней' },
  { id: 'all', label: 'Все время' }
];

function formatWithSpaces(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('ru-RU', options).format(value).replace(/[\u00a0\u202f]/g, ' ');
}

function formatInteger(value: number) {
  return formatWithSpaces(value);
}

function formatCurrency(value: number) {
  return formatWithSpaces(value, {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  });
}

function formatRating(value: number) {
  return value.toFixed(1);
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.6 19.2a7.2 7.2 0 0 1 12.8 0" strokeLinecap="round" />
    </svg>
  );
}

function RoomIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="6" width="8" height="6" rx="2" />
      <rect x="12" y="12" width="8" height="6" rx="2" />
      <path d="M12 9h2" strokeLinecap="round" />
      <path d="M10 15H8" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 16.5h11L16 14V10a4 4 0 1 0-8 0v4z" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 7.5h11.5a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 16.5 18H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2z" />
      <path d="M15 13h4" strokeLinecap="round" />
      <path d="M5 7.5V6a2 2 0 0 1 2-2h8" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4l2.7 1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

function getStatusTone(status: AdminUserStatus) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'new':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'limited':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'blocked':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
  }
}

function getStatusLabel(status: AdminUserStatus) {
  switch (status) {
    case 'active':
      return 'Активен';
    case 'new':
      return 'Новый';
    case 'limited':
      return 'Ограничен';
    case 'blocked':
      return 'Заблокирован';
  }
}

function getRoleLabel(role: AdminUserRole) {
  switch (role) {
    case 'user':
      return 'Пользователь';
    case 'room-lead':
      return 'Лидер комнаты';
    case 'ambassador':
      return 'Амбассадор';
    case 'vip':
      return 'VIP';
  }
}

function getKpiBadgeTone(tone: 'blue' | 'green' | 'indigo' | 'rose') {
  switch (tone) {
    case 'blue':
      return 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]';
    case 'green':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'indigo':
      return 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200';
    case 'rose':
    default:
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
  }
}

function KpiCard({
  label,
  value,
  delta,
  tone
}: {
  label: string;
  value: number;
  delta: string;
  tone: 'blue' | 'green' | 'indigo' | 'rose';
}) {
  return (
    <article className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{formatInteger(value)}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getKpiBadgeTone(tone))}>{delta}</span>
      </div>
    </article>
  );
}

function FilterButton({
  label,
  value,
  active = false,
  wide = false,
  onClick
}: {
  label: string;
  value: string;
  active?: boolean;
  wide?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-between gap-4 rounded-[16px] border px-4 py-3 text-left shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition',
        wide ? 'min-w-[14.5rem]' : 'min-w-[11rem]',
        active ? 'border-[#dbe7fb] bg-[#eef5ff] text-[#2f78d3]' : 'border-black/[0.05] bg-white text-slate-600 hover:bg-slate-50'
      )}
    >
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-1 text-[0.9rem] font-medium text-slate-700">{value}</p>
      </div>
      <ChevronDownIcon />
    </button>
  );
}

function SummaryRow({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd] text-slate-500">{icon}</span>
        <div className="min-w-0">
          <p className="text-[0.9rem] font-semibold text-slate-800">{label}</p>
          <p className="truncate text-[0.8rem] text-slate-500">{value}</p>
        </div>
      </div>
      <span className="text-slate-400">
        <ChevronRightIcon />
      </span>
    </div>
  );
}

function cycleFilter<T extends { id: string }>(items: readonly T[], currentId: string) {
  const currentIndex = items.findIndex((item) => item.id === currentId);
  const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
  return items[nextIndex].id;
}

export function AdminUsersScreen() {
  const [managedUsers, setManagedUsers] = useState(adminManagedUsers);
  const [statusFilter, setStatusFilter] = useState<(typeof adminUserStatusFilters)[number]['id']>('all');
  const [roleFilter, setRoleFilter] = useState<(typeof adminUserRoleFilters)[number]['id']>('all');
  const [balanceFilter, setBalanceFilter] = useState<BalanceFilterId>('all');
  const [activityFilter, setActivityFilter] = useState<ActivityFilterId>('all');
  const [registrationFilter, setRegistrationFilter] = useState<RegistrationFilterId>('month');
  const [selectedUserId, setSelectedUserId] = useState(adminManagedUsers[0]?.id ?? '');
  const [confirmState, setConfirmState] = useState<{
    title: string;
    description: string;
    confirmLabel: string;
    tone: 'primary' | 'danger';
    badge: string;
    footnote: string;
    details: AdminConfirmDialogDetail[];
    onConfirm: () => void;
  } | null>(null);

  const filteredUsers = useMemo(() => {
    return managedUsers.filter((user) => {
      const matchesStatus = statusFilter === 'all' ? true : user.status === statusFilter;
      const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
      const matchesBalance =
        balanceFilter === 'all'
          ? true
          : balanceFilter === 'low'
            ? user.balance < 5000
            : balanceFilter === 'mid'
              ? user.balance >= 5000 && user.balance < 20000
              : user.balance >= 20000;
      const matchesActivity =
        activityFilter === 'all'
          ? true
          : activityFilter === 'day'
            ? user.lastSeenMinutes <= 1440
            : activityFilter === 'week'
              ? user.lastSeenMinutes <= 10080
              : user.lastSeenMinutes > 10080;
      const matchesRegistration =
        registrationFilter === 'all'
          ? true
          : registrationFilter === 'week'
            ? user.registeredDaysAgo <= 7
            : registrationFilter === 'month'
              ? user.registeredDaysAgo <= 30
              : user.registeredDaysAgo <= 90;

      return matchesStatus && matchesRole && matchesBalance && matchesActivity && matchesRegistration;
    });
  }, [activityFilter, balanceFilter, managedUsers, registrationFilter, roleFilter, statusFilter]);

  useEffect(() => {
    if (!filteredUsers.some((user) => user.id === selectedUserId)) {
      setSelectedUserId(filteredUsers[0]?.id ?? '');
    }
  }, [filteredUsers, selectedUserId]);

  const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? filteredUsers[0] ?? managedUsers[0];

  const updateUser = (userId: string, updater: (user: AdminManagedUser) => AdminManagedUser) => {
    setManagedUsers((current) => current.map((user) => (user.id === userId ? updater(user) : user)));
  };

  const openUserConfirmation = (
    user: AdminManagedUser,
    config: {
      title: string;
      description: string;
      confirmLabel: string;
      tone: 'primary' | 'danger';
      badge: string;
      footnote: string;
      onConfirm: () => void;
    }
  ) => {
    setSelectedUserId(user.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Пользователь', value: user.name },
        { label: 'Текущий статус', value: getStatusLabel(user.status) },
        { label: 'Баланс', value: formatCurrency(user.balance) },
        { label: 'Последняя активность', value: user.lastSeen }
      ]
    });
  };

  const handleModerationAction = (user: AdminManagedUser, action: 'limit' | 'block') => {
    if (action === 'limit') {
      openUserConfirmation(user, {
        title: 'Ограничить пользователя',
        description:
          'Пользователь сохранит доступ к профилю, но не сможет участвовать в room и новых донатных сценариях до снятия ограничения.',
        confirmLabel: 'Ограничить',
        tone: 'primary',
        badge: 'Ограничение',
        footnote: 'Ограничение попадёт в audit trail и будет видно в moderation flow.',
        onConfirm: () => {
          updateUser(user.id, (current) => ({
            ...current,
            status: 'limited',
            notifications: 'Только системные уведомления',
            activeRooms: current.activeRooms.slice(0, 1)
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    openUserConfirmation(user, {
      title: 'Заблокировать пользователя',
      description: 'Аккаунт будет заблокирован, а доступ к room и операциям поддержки закрыт до ручного пересмотра.',
      confirmLabel: 'Заблокировать',
      tone: 'danger',
      badge: 'Критичное действие',
      footnote: 'Блокировка логируется как критичное административное действие и требует явного подтверждения.',
      onConfirm: () => {
        updateUser(user.id, (current) => ({
          ...current,
          status: 'blocked',
          activeRooms: [],
          notifications: 'Отключены'
        }));
        setConfirmState(null);
      }
    });
  };

  const currentRoleLabel = adminUserRoleFilters.find((filter) => filter.id === roleFilter)?.label ?? 'Все роли';
  const currentBalanceLabel = balanceFilters.find((filter) => filter.id === balanceFilter)?.label ?? 'Любой баланс';
  const currentActivityLabel = activityFilters.find((filter) => filter.id === activityFilter)?.label ?? 'Любая активность';
  const currentRegistrationLabel = registrationFilters.find((filter) => filter.id === registrationFilter)?.label ?? 'За 30 дней';

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminUsersKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} delta={kpi.delta} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit rounded-[16px] border border-black/[0.05] bg-[#f4f7fb] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {adminUserStatusFilters.map((filter) => {
              const active = filter.id === statusFilter;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setStatusFilter(filter.id)}
                  className={cn(
                    'rounded-[12px] px-4 py-2.5 text-[0.9rem] font-semibold transition',
                    active
                      ? 'bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] text-white shadow-[0_12px_22px_rgba(79,143,246,0.22)]'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterButton
              label="Роль"
              value={currentRoleLabel}
              active={roleFilter !== 'all'}
              onClick={() => setRoleFilter(cycleFilter(adminUserRoleFilters, roleFilter) as (typeof adminUserRoleFilters)[number]['id'])}
            />
            <FilterButton
              label="Баланс"
              value={currentBalanceLabel}
              active={balanceFilter !== 'all'}
              onClick={() => setBalanceFilter(cycleFilter(balanceFilters, balanceFilter) as BalanceFilterId)}
            />
            <FilterButton
              label="Активность"
              value={currentActivityLabel}
              active={activityFilter !== 'all'}
              onClick={() => setActivityFilter(cycleFilter(activityFilters, activityFilter) as ActivityFilterId)}
            />
            <FilterButton
              label="Дата регистрации"
              value={currentRegistrationLabel}
              wide
              active={registrationFilter !== 'month'}
              onClick={() => setRegistrationFilter(cycleFilter(registrationFilters, registrationFilter) as RegistrationFilterId)}
            />

            <button
              type="button"
              className="ml-auto inline-flex items-center gap-2 rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-5 py-3 text-[0.92rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
            >
              <SearchIcon />
              Применить
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Пользователи</h2>
              <p className="mt-1 text-sm text-slate-500">Управление аккаунтами, балансами, активностью и статусами модерации.</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              {filteredUsers.length} в выборке
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1020px]">
              <div className="grid grid-cols-[minmax(17rem,1.45fr)_minmax(16rem,1.2fr)_8.5rem_10rem_7rem_9rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Имя / ник</span>
                <span>Email / телефон</span>
                <span>Баланс</span>
                <span>Донатов</span>
                <span>Рейтинг</span>
                <span>Статус</span>
              </div>

              <div className="space-y-3">
                {filteredUsers.map((user) => {
                  const active = user.id === selectedUser?.id;

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => setSelectedUserId(user.id)}
                      className={cn(
                        'grid w-full grid-cols-[minmax(17rem,1.45fr)_minmax(16rem,1.2fr)_8.5rem_10rem_7rem_9rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={cn('flex h-12 w-12 items-center justify-center rounded-full text-[0.92rem] font-semibold text-slate-700', user.avatarTone)}>
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{user.name}</p>
                            <span className="rounded-full bg-[#f5f8fd] px-2 py-0.5 text-[0.68rem] font-semibold text-slate-500">
                              {getRoleLabel(user.role)}
                            </span>
                          </div>
                          <p className="truncate text-[0.84rem] text-slate-500">@{user.nickname}</p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.9rem] font-medium text-slate-800">{user.email ?? '—'}</p>
                        <p className="truncate text-[0.82rem] text-slate-500">{user.phone ?? '—'}</p>
                      </div>

                      <div className="text-[0.98rem] font-semibold tracking-tight text-slate-900">{formatCurrency(user.balance)}</div>

                      <div>
                        <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{formatCurrency(user.totalDonations)}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-500">{formatInteger(user.donationCount)} донатов</p>
                      </div>

                      <div>
                        <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{formatRating(user.rating)}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-500">Fansten score</p>
                      </div>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(user.status))}>
                        {getStatusLabel(user.status)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedUser ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="flex items-start gap-4">
                <div className={cn('flex h-14 w-14 items-center justify-center rounded-full text-[1rem] font-semibold text-slate-700', selectedUser.avatarTone)}>
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[1.32rem] font-semibold tracking-tight text-slate-900">{selectedUser.name}</p>
                      <p className="mt-1 truncate text-[0.9rem] text-slate-500">
                        {selectedUser.email ?? selectedUser.phone ?? `@${selectedUser.nickname}`}
                      </p>
                    </div>
                    <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500">
                      <ChevronDownIcon />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getStatusTone(selectedUser.status))}>
                      {getStatusLabel(selectedUser.status)}
                    </span>
                    <span className="inline-flex rounded-full bg-[#f5f8fd] px-2.5 py-1 text-[0.74rem] font-semibold text-slate-600">
                      {getRoleLabel(selectedUser.role)}
                    </span>
                    <span className="inline-flex rounded-full bg-[#f5f8fd] px-2.5 py-1 text-[0.74rem] font-semibold text-slate-500">
                      @{selectedUser.nickname}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Баланс</p>
                  <p className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-900">{formatCurrency(selectedUser.balance)}</p>
                  <p className="mt-1 text-[0.78rem] text-slate-500">Доступно для live-поддержки</p>
                </div>
                <div className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Всего донатов</p>
                  <p className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-900">{formatCurrency(selectedUser.totalDonations)}</p>
                  <p className="mt-1 text-[0.78rem] text-slate-500">{formatInteger(selectedUser.donationCount)} операций поддержки</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="space-y-3">
                <SummaryRow
                  icon={<RoomIcon />}
                  label="Активные комнаты"
                  value={selectedUser.activeRooms.length ? selectedUser.activeRooms.join(' · ') : 'Нет активных комнат'}
                />
                <SummaryRow icon={<BellIcon />} label="Уведомления" value={selectedUser.notifications} />
                <SummaryRow
                  icon={<HistoryIcon />}
                  label="Последний визит"
                  value={`${selectedUser.lastSeen} · регистрация ${selectedUser.registeredAt}`}
                />
                <SummaryRow
                  icon={<HistoryIcon />}
                  label="История донатов"
                  value={`${formatInteger(selectedUser.donationCount)} последних действий в support flow`}
                />
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">История донатов</p>
                  <p className="mt-1 text-[0.82rem] text-slate-500">Последняя поддержка и ключевые события.</p>
                </div>

                <div className="mt-4 space-y-2.5">
                  {selectedUser.donationHistory.map((item) => (
                    <div key={item.id} className="rounded-[14px] bg-[#f8fafc] px-3.5 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-[0.88rem] font-semibold text-slate-900">{item.event}</p>
                        <p className="shrink-0 text-[0.88rem] font-semibold text-slate-900">{formatCurrency(item.amount)}</p>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-3 text-[0.78rem] text-slate-500">
                        <span className="truncate">{item.side}</span>
                        <span className="shrink-0">{item.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUserId(selectedUser.id)}
                  className="flex items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  <UserIcon />
                  Открыть
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUserId(selectedUser.id)}
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  <WalletIcon />
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => handleModerationAction(selectedUser, 'limit')}
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-[#e4e8ef] bg-[#f8f9fc] px-4 py-3.5 text-[0.95rem] font-semibold text-slate-600"
                >
                  Ограничить
                </button>
                <button
                  type="button"
                  onClick={() => handleModerationAction(selectedUser, 'block')}
                  className="flex items-center justify-center gap-2 rounded-[16px] bg-[#fff4f1] px-4 py-3.5 text-[0.95rem] font-semibold text-[#cf5a49] ring-1 ring-[#ffd8d2]"
                >
                  Заблокировать
                </button>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.92rem] font-semibold text-slate-600"
              >
                <HistoryIcon />
                История
              </button>
            </div>
          </aside>
        ) : null}
      </section>

      <AdminConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title ?? ''}
        description={confirmState?.description ?? ''}
        confirmLabel={confirmState?.confirmLabel ?? ''}
        tone={confirmState?.tone ?? 'primary'}
        badge={confirmState?.badge}
        details={confirmState?.details}
        footnote={confirmState?.footnote}
        onClose={() => setConfirmState(null)}
        onConfirm={() => confirmState?.onConfirm()}
      />
    </div>
  );
}
