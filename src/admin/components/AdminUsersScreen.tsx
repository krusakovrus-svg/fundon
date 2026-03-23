'use client';

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
import { cn } from '@/lib/utils';

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

function CircleBadge({
  color,
  children
}: {
  color: string;
  children: React.ReactNode;
}) {
  return <span className={cn('inline-flex h-2.5 w-2.5 rounded-full', color)}>{children}</span>;
}

function KpiCard({
  label,
  value,
  delta,
  tone
}: {
  label: string;
  value: string;
  delta?: string;
  tone: 'blue' | 'green' | 'orange' | 'rose';
}) {
  const accent =
    tone === 'blue'
      ? 'bg-[#edf4ff] text-[#4f8ff6]'
      : tone === 'green'
        ? 'bg-emerald-50 text-emerald-600'
        : tone === 'orange'
          ? 'bg-amber-50 text-amber-600'
          : 'bg-rose-50 text-rose-600';

  return (
    <div className="rounded-[22px] border border-black/[0.05] bg-white/90 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.9rem] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', accent)}>{delta ?? '—'}</span>
      </div>
    </div>
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

function FilterButton({
  label,
  active = false,
  wide = false,
  onClick
}: {
  label: string;
  active?: boolean;
  wide?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-between gap-3 rounded-[14px] border px-3.5 py-2.5 text-[0.9rem] font-medium shadow-[0_8px_18px_rgba(15,23,42,0.04)]',
        wide ? 'min-w-[15rem]' : 'min-w-[9.5rem]',
        active ? 'border-[#dbe7fb] bg-[#eef5ff] text-[#2f78d3]' : 'border-black/[0.05] bg-white text-slate-600'
      )}
    >
      <span>{label}</span>
      <ChevronDownIcon />
    </button>
  );
}

function SideMenuRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd] text-slate-500">{icon}</span>
        <div className="min-w-0">
          <p className="text-[0.94rem] font-semibold text-slate-800">{label}</p>
          <p className="truncate text-[0.82rem] text-slate-500">{value}</p>
        </div>
      </div>
      <span className="text-slate-400">
        <ChevronRightIcon />
      </span>
    </div>
  );
}

export function AdminUsersScreen() {
  const [statusFilter, setStatusFilter] = useState<(typeof adminUserStatusFilters)[number]['id']>('all');
  const [roleFilter, setRoleFilter] = useState<(typeof adminUserRoleFilters)[number]['id']>('all');
  const [selectedUserId, setSelectedUserId] = useState(adminManagedUsers[0]?.id ?? '');

  const cycleRoleFilter = () => {
    const currentIndex = adminUserRoleFilters.findIndex((filter) => filter.id === roleFilter);
    const nextIndex = currentIndex === adminUserRoleFilters.length - 1 ? 0 : currentIndex + 1;
    setRoleFilter(adminUserRoleFilters[nextIndex].id);
  };

  const filteredUsers = useMemo(() => {
    return adminManagedUsers.filter((user) => {
      const matchesStatus = statusFilter === 'all' ? true : user.status === statusFilter;
      const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;

      return matchesStatus && matchesRole;
    });
  }, [roleFilter, statusFilter]);

  useEffect(() => {
    if (!filteredUsers.some((user) => user.id === selectedUserId)) {
      setSelectedUserId(filteredUsers[0]?.id ?? '');
    }
  }, [filteredUsers, selectedUserId]);

  const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? filteredUsers[0] ?? adminManagedUsers[0];

  const currentRoleLabel = adminUserRoleFilters.find((filter) => filter.id === roleFilter)?.label ?? 'Все роли';

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminUsersKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} delta={kpi.delta} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-[16px] border border-black/[0.05] bg-[#f4f7fb] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
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

          <FilterButton label={`Роль: ${currentRoleLabel}`} active={roleFilter !== 'all'} onClick={cycleRoleFilter} />
          <FilterButton label="Баланс" />
          <FilterButton label="Активность" />
          <FilterButton label="Дата регистрации" wide />

          <button
            type="button"
            className="ml-auto rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-5 py-3 text-[0.92rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
          >
            Применить
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Пользователи</h2>
              <p className="mt-1 text-sm text-slate-500">Управление аккаунтами, балансами, активностью и статусами модерации</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              {filteredUsers.length} в выборке
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[minmax(16rem,1.35fr)_minmax(15rem,1.2fr)_8rem_8rem_7rem_9rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Имя / Ник</span>
                <span>Email / Телефон</span>
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
                        'grid w-full grid-cols-[minmax(16rem,1.35fr)_minmax(15rem,1.2fr)_8rem_8rem_7rem_9rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
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
                          <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{user.name}</p>
                          <p className="truncate text-[0.84rem] text-slate-500">@{user.nickname}</p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.92rem] font-medium text-slate-800">{user.email ?? '—'}</p>
                        <p className="truncate text-[0.84rem] text-slate-500">{user.phone ?? '—'}</p>
                      </div>

                      <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{user.balance}</p>
                      <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{user.totalDonations}</p>
                      <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{user.rating}</p>

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
                      <p className="mt-1 truncate text-[0.92rem] text-slate-500">{selectedUser.email ?? selectedUser.phone ?? `@${selectedUser.nickname}`}</p>
                    </div>
                    <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500">
                      <ChevronDownIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Баланс</p>
                  <p className="mt-2 text-[1.8rem] font-semibold tracking-tight text-slate-900">{selectedUser.balance}</p>
                </div>
                <div className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Всего донатов</p>
                  <p className="mt-2 text-[1.8rem] font-semibold tracking-tight text-slate-900">{selectedUser.totalDonations}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <SideMenuRow
                icon={<RoomIcon />}
                label="Активные комнаты"
                value={selectedUser.activeRooms.length ? selectedUser.activeRooms.join(' · ') : 'Нет активных комнат'}
              />
              <SideMenuRow icon={<BellIcon />} label="Уведомления" value={selectedUser.notifications} />
              <SideMenuRow icon={<HistoryIcon />} label="История донатов" value={`${selectedUser.donationHistory.length} последних действий`} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">История донатов</p>
                    <p className="mt-1 text-sm text-slate-500">Последняя поддержка и ключевые события</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedUser.donationHistory.map((item) => (
                    <div key={item.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-[0.92rem] font-semibold text-slate-900">{item.event}</p>
                        <p className="text-[0.9rem] font-semibold text-slate-900">{item.amount}</p>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-3 text-[0.82rem] text-slate-500">
                        <span>{item.side}</span>
                        <span>{item.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  <UserIcon />
                  Открыть
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  <WalletIcon />
                  Редактировать
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-[#e4e8ef] bg-[#f8f9fc] px-4 py-3.5 text-[0.95rem] font-semibold text-slate-600"
                >
                  Ограничить
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] bg-[#fff1ef] px-4 py-3.5 text-[0.95rem] font-semibold text-[#d25346] ring-1 ring-[#ffd7d1]"
                >
                  Заблокировать
                </button>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
              >
                <HistoryIcon />
                История
              </button>
            </div>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
