'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  adminModerationCaseFilters,
  adminModerationCases,
  adminModerationEventFilters,
  adminModerationKpis,
  adminModerationPriorityFilters,
  adminModerationStatusFilters,
  adminModerationTypeFilters,
  adminModerationUserFilters,
  type AdminModerationCaseType,
  type AdminModerationPriority,
  type AdminModerationStatus,
  type AdminModerationUserScope
} from '@/admin/data/moderation';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
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

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.3-2.8 7.7-7 10-4.2-2.3-7-5.7-7-10V6z" strokeLinejoin="round" />
    </svg>
  );
}

function SlashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 15.5 15.5 8.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4 3.8 18h16.4z" strokeLinejoin="round" />
      <path d="M12 9v4" strokeLinecap="round" />
      <path d="M12 16h.01" strokeLinecap="round" />
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

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 4h10l4 4v12H5z" strokeLinejoin="round" />
      <path d="M15 4v4h4" strokeLinejoin="round" />
      <path d="M9 12h6" strokeLinecap="round" />
      <path d="M9 16h5" strokeLinecap="round" />
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

function KpiCard({
  label,
  value,
  hint,
  tone
}: {
  label: string;
  value: string;
  hint: string;
  tone: 'blue' | 'orange' | 'rose' | 'slate';
}) {
  const accent =
    tone === 'blue'
      ? 'bg-[#edf4ff] text-[#4f8ff6]'
      : tone === 'orange'
        ? 'bg-amber-50 text-amber-600'
        : tone === 'rose'
          ? 'bg-rose-50 text-rose-600'
          : 'bg-slate-100 text-slate-500';

  return (
    <div className="rounded-[22px] border border-black/[0.05] bg-white/90 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.9rem] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', accent)}>{hint}</span>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  minWidth = 'min-w-[10.5rem]'
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
  minWidth?: string;
}) {
  return (
    <label className={cn('relative', minWidth)}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-[14px] border border-black/[0.05] bg-white px-4 pr-10 text-[0.9rem] font-medium text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <ChevronDownIcon />
      </span>
    </label>
  );
}

function getStatusTone(status: AdminModerationStatus) {
  switch (status) {
    case 'new':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'open':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'in-progress':
      return 'bg-violet-50 text-violet-700 ring-1 ring-violet-200';
    case 'closed':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getStatusLabel(status: AdminModerationStatus) {
  switch (status) {
    case 'new':
      return 'Новое';
    case 'open':
      return 'Открыт';
    case 'in-progress':
      return 'В работе';
    case 'closed':
      return 'Закрыт';
  }
}

function getPriorityTone(priority: AdminModerationPriority) {
  switch (priority) {
    case 'high':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'medium':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'low':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getPriorityLabel(priority: AdminModerationPriority) {
  switch (priority) {
    case 'high':
      return 'Высокий';
    case 'medium':
      return 'Средний';
    case 'low':
      return 'Низкий';
  }
}

function getTypeTone(type: AdminModerationCaseType) {
  switch (type) {
    case 'complaint':
      return 'bg-[#eef5ff] text-[#2f78d3]';
    case 'transaction':
      return 'bg-rose-50 text-rose-700';
    case 'room':
      return 'bg-violet-50 text-violet-700';
    case 'user':
      return 'bg-emerald-50 text-emerald-700';
  }
}

function mapCaseToEventFilterLabel(eventFilter: string) {
  return adminModerationEventFilters.find((item) => item.id === eventFilter)?.label;
}

function RowActionButton({
  label,
  onClick,
  children
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className="rounded-[12px] border border-black/[0.05] bg-white/70 p-2 text-slate-400 transition hover:border-black/[0.08] hover:text-slate-700"
    >
      {children}
    </button>
  );
}

function DetailRow({
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
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-1 truncate text-[0.94rem] font-medium text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[1.02rem] font-semibold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

export function AdminModerationScreen() {
  const [managedCases, setManagedCases] = useState(adminModerationCases);
  const [caseFilter, setCaseFilter] = useState<(typeof adminModerationCaseFilters)[number]['id']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | AdminModerationCaseType>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | AdminModerationPriority>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AdminModerationStatus>('all');
  const [userFilter, setUserFilter] = useState<'all' | AdminModerationUserScope>('all');
  const [eventFilter, setEventFilter] = useState<(typeof adminModerationEventFilters)[number]['id']>('all');
  const [query, setQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(adminModerationCases[0]?.id ?? '');
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

  const filteredCases = useMemo(() => {
    return managedCases.filter((item) => {
      const caseMatch = caseFilter === 'all' ? true : item.type === caseFilter;
      const typeMatch = typeFilter === 'all' ? true : item.type === typeFilter;
      const priorityMatch = priorityFilter === 'all' ? true : item.priority === priorityFilter;
      const statusMatch = statusFilter === 'all' ? true : item.status === statusFilter;
      const userMatch =
        userFilter === 'all'
          ? true
          : userFilter === 'restricted'
            ? item.restrictionState.toLowerCase().includes('огранич')
            : userFilter === 'new'
              ? item.userMeta.toLowerCase().includes('нов')
              : item.userMeta.toLowerCase().includes('vip');
      const eventMatch =
        eventFilter === 'all'
          ? true
          : item.event === mapCaseToEventFilterLabel(eventFilter) || item.objectMeta.includes(mapCaseToEventFilterLabel(eventFilter) ?? '');
      const queryMatch =
        query.trim().length === 0
          ? true
          : `${item.id} ${item.user} ${item.handle} ${item.objectTitle} ${item.event} ${item.reason}`.toLowerCase().includes(query.trim().toLowerCase());

      return caseMatch && typeMatch && priorityMatch && statusMatch && userMatch && eventMatch && queryMatch;
    });
  }, [caseFilter, eventFilter, managedCases, priorityFilter, query, statusFilter, typeFilter, userFilter]);

  useEffect(() => {
    if (!filteredCases.some((item) => item.id === selectedCaseId)) {
      setSelectedCaseId(filteredCases[0]?.id ?? '');
    }
  }, [filteredCases, selectedCaseId]);

  const selectedCase = filteredCases.find((item) => item.id === selectedCaseId) ?? filteredCases[0] ?? managedCases[0];

  const updateCase = (caseId: string, updater: (item: (typeof managedCases)[number]) => (typeof managedCases)[number]) => {
    setManagedCases((current) => current.map((item) => (item.id === caseId ? updater(item) : item)));
  };

  const openCaseConfirmation = (
    item: (typeof managedCases)[number],
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
    setSelectedCaseId(item.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Кейс', value: item.id },
        { label: 'Тип', value: item.typeLabel },
        { label: 'Статус', value: getStatusLabel(item.status) },
        { label: 'Пользователь', value: item.user }
      ]
    });
  };

  const handleCaseAction = (item: (typeof managedCases)[number], action: 'open' | 'restrict' | 'close' | 'block') => {
    if (action === 'open') {
      openCaseConfirmation(item, {
        title: 'Открыть кейс в работу',
        description: 'Кейс будет переведён в рабочий статус и появится в активном moderation pipeline.',
        confirmLabel: 'Открыть кейс',
        tone: 'primary',
        badge: 'Moderation flow',
        footnote: 'Открытие кейса фиксируется в журнале действий и назначает ручную обработку.',
        onConfirm: () => {
          updateCase(item.id, (current) => ({
            ...current,
            status: current.status === 'closed' ? 'open' : current.status === 'new' ? 'open' : current.status,
            history: [{ id: `${current.id}-open-now`, actor: 'Admin', action: 'Кейс переведён в active processing', at: 'Сейчас' }, ...current.history]
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (action === 'restrict') {
      openCaseConfirmation(item, {
        title: 'Ограничить пользователя',
        description: 'На пользователя будет наложено ограничение до завершения проверки. Доступ к критичным сценариям поддержки будет урезан.',
        confirmLabel: 'Ограничить',
        tone: 'primary',
        badge: 'Ограничение',
        footnote: 'Временные ограничения видны в user profile и moderation queue.',
        onConfirm: () => {
          updateCase(item.id, (current) => ({
            ...current,
            status: current.status === 'closed' ? 'closed' : 'in-progress',
            restrictionState: 'Временное ограничение включено до завершения проверки',
            history: [{ id: `${current.id}-restrict-now`, actor: 'Admin', action: 'На пользователя наложено временное ограничение', at: 'Сейчас' }, ...current.history]
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (action === 'close') {
      openCaseConfirmation(item, {
        title: 'Закрыть кейс',
        description: 'Кейс будет снят с активной очереди модерации и сохранён в журнале с итоговым статусом.',
        confirmLabel: 'Закрыть кейс',
        tone: 'primary',
        badge: 'Закрытие кейса',
        footnote: 'Закрытие кейса завершает active flow, но сохраняет все заметки и историю.',
        onConfirm: () => {
          updateCase(item.id, (current) => ({
            ...current,
            status: 'closed',
            history: [{ id: `${current.id}-close-now`, actor: 'Admin', action: 'Кейс закрыт после ручной проверки', at: 'Сейчас' }, ...current.history]
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    openCaseConfirmation(item, {
      title: 'Заблокировать пользователя',
      description: 'Пользователь будет заблокирован, а связанный кейс останется в журнале как критический инцидент.',
      confirmLabel: 'Заблокировать',
      tone: 'danger',
      badge: 'Критичное действие',
      footnote: 'Блокировка требует явного подтверждения и записывается в audit trail.',
      onConfirm: () => {
        updateCase(item.id, (current) => ({
          ...current,
          status: 'closed',
          restrictionState: 'Пользователь заблокирован до отдельного пересмотра',
          history: [{ id: `${current.id}-block-now`, actor: 'Admin', action: 'Пользователь заблокирован по итогам кейса', at: 'Сейчас' }, ...current.history]
        }));
        setConfirmState(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminModerationKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={caseFilter} onChange={(value) => setCaseFilter(value as (typeof adminModerationCaseFilters)[number]['id'])} options={adminModerationCaseFilters} />
          <FilterSelect value={typeFilter} onChange={(value) => setTypeFilter(value as 'all' | AdminModerationCaseType)} options={adminModerationTypeFilters} minWidth="min-w-[12rem]" />
          <FilterSelect value={priorityFilter} onChange={(value) => setPriorityFilter(value as 'all' | AdminModerationPriority)} options={adminModerationPriorityFilters} minWidth="min-w-[11rem]" />
          <FilterSelect value={statusFilter} onChange={(value) => setStatusFilter(value as 'all' | AdminModerationStatus)} options={adminModerationStatusFilters} minWidth="min-w-[11rem]" />
          <FilterSelect value={userFilter} onChange={(value) => setUserFilter(value as 'all' | AdminModerationUserScope)} options={adminModerationUserFilters} minWidth="min-w-[12rem]" />
          <FilterSelect value={eventFilter} onChange={(value) => setEventFilter(value as (typeof adminModerationEventFilters)[number]['id'])} options={adminModerationEventFilters} minWidth="min-w-[13rem]" />

          <label className="ml-auto flex min-w-[18rem] items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по пользователю"
              className="w-full bg-transparent text-[0.95rem] text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            className="rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-5 py-3 text-[0.92rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
          >
            Применить
          </button>
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="self-start overflow-hidden rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Кейсы модерации</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор жалоб, подозрительных транзакций и ручных разборов по событиям Fansten.</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">{filteredCases.length} в очереди</div>
          </div>

          <div className="px-4 py-4">
            <div className="overflow-hidden rounded-[22px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f7f9fd_100%)]">
              <div className="overflow-x-auto px-4 py-4 [scrollbar-color:rgba(148,163,184,0.35)_transparent] [scrollbar-width:thin]">
                <div className="min-w-[1020px]">
                  <div className="grid grid-cols-[7.25rem_9rem_minmax(13rem,1.15fr)_minmax(12rem,1fr)_minmax(12.5rem,1.1fr)_10rem_8rem_7.5rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>ID / кейс</span>
                <span>Тип</span>
                <span>Объект</span>
                <span>Пользователь</span>
                <span>Причина</span>
                <span>Статус / приоритет</span>
                <span>Дата / время</span>
                <span className="text-right">Действия</span>
              </div>

              <div className="space-y-3">
                {filteredCases.map((item) => {
                  const active = item.id === selectedCase?.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedCaseId(item.id)}
                      className={cn(
                        'grid w-full grid-cols-[7.25rem_9rem_minmax(13rem,1.15fr)_minmax(12rem,1fr)_minmax(12.5rem,1.1fr)_10rem_8rem_7.5rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div>
                        <p className="text-[0.96rem] font-semibold tracking-tight text-slate-900">{item.id}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{item.createdAt}</p>
                      </div>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getTypeTone(item.type))}>{item.typeLabel}</span>

                      <div className="min-w-0">
                        <p className="truncate text-[0.95rem] font-semibold text-slate-900">{item.objectTitle}</p>
                        <p className="truncate text-[0.84rem] text-slate-500">{item.objectMeta}</p>
                      </div>

                      <div className="flex min-w-0 items-center gap-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-full text-[0.9rem] font-semibold text-slate-700', item.avatarTone)}>
                          {item.user.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[0.95rem] font-semibold text-slate-900">{item.user}</p>
                          <p className="truncate text-[0.84rem] text-slate-500">{item.handle}</p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.92rem] font-medium text-slate-800">{item.reason}</p>
                        <p className="truncate text-[0.82rem] text-slate-500">{item.event}</p>
                      </div>

                      <div className="space-y-2">
                        <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(item.status))}>
                          {getStatusLabel(item.status)}
                        </span>
                        <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getPriorityTone(item.priority))}>
                          {getPriorityLabel(item.priority)}
                        </span>
                      </div>

                      <div>
                        <p className="text-[0.9rem] font-medium text-slate-700">{item.createdAt}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{item.assignedModerator}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <RowActionButton
                          label={`Открыть ${item.id}`}
                          onClick={() => handleCaseAction(item, 'open')}
                        >
                          <EyeIcon />
                        </RowActionButton>
                        <RowActionButton label={`Ограничить ${item.id}`} onClick={() => handleCaseAction(item, 'restrict')}>
                          <ShieldIcon />
                        </RowActionButton>
                        <RowActionButton label={`Закрыть ${item.id}`} onClick={() => handleCaseAction(item, 'close')}>
                          <SlashIcon />
                        </RowActionButton>
                      </div>
                    </button>
                  );
                })}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedCase ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[1.3rem] font-semibold tracking-tight text-slate-900">{selectedCase.id}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getTypeTone(selectedCase.type))}>
                      {selectedCase.typeLabel}
                    </span>
                    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getPriorityTone(selectedCase.priority))}>
                      {getPriorityLabel(selectedCase.priority)}
                    </span>
                    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(selectedCase.status))}>
                      {getStatusLabel(selectedCase.status)}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.76rem] font-semibold text-slate-500">{selectedCase.createdAt}</span>
              </div>

              <p className="mt-4 text-[0.95rem] leading-6 text-slate-600">{selectedCase.summary}</p>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Приоритет" value={getPriorityLabel(selectedCase.priority)} />
                <MetricCard label="Статус" value={getStatusLabel(selectedCase.status)} />
                <MetricCard label="Жалобы" value={selectedCase.complaints} />
              </div>

              <DetailRow icon={<UserIcon />} label="Пользователь" value={`${selectedCase.user} · ${selectedCase.handle}`} />
              <DetailRow icon={<AlertIcon />} label="Объект" value={selectedCase.objectTitle} />
              <DetailRow icon={<ShieldIcon />} label="Ограничения" value={selectedCase.restrictionState} />
              <DetailRow icon={<HistoryIcon />} label="Модератор" value={selectedCase.assignedModerator} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Причина и контекст</p>
                  <p className="mt-1 text-sm text-slate-500">Короткое объяснение кейса и связанный объект проверки.</p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                    <p className="text-[0.92rem] font-semibold text-slate-900">{selectedCase.reason}</p>
                    <p className="mt-1 text-[0.84rem] text-slate-500">{selectedCase.targetSummary}</p>
                  </div>
                  <div className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Связанная операция</p>
                    <p className="mt-2 text-[0.9rem] text-slate-700">{selectedCase.transactionSummary}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <HistoryIcon />
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em]">История кейса</p>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedCase.history.map((entry) => (
                    <div key={entry.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[0.9rem] font-semibold text-slate-900">{entry.actor}</p>
                          <p className="mt-1 text-[0.84rem] leading-5 text-slate-600">{entry.action}</p>
                        </div>
                        <span className="shrink-0 text-[0.8rem] text-slate-400">{entry.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <NoteIcon />
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em]">Внутренние заметки</p>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedCase.notes.map((note) => (
                    <div key={note.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[0.9rem] font-semibold text-slate-900">{note.title}</p>
                          <p className="mt-1 text-[0.84rem] leading-5 text-slate-600">{note.body}</p>
                        </div>
                        <span className="shrink-0 text-[0.8rem] text-slate-400">{note.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleCaseAction(selectedCase, 'open')}
                  className="col-span-2 flex items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseAction(selectedCase, 'restrict')}
                  className="flex items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Ограничить
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseAction(selectedCase, 'close')}
                  className="flex items-center justify-center rounded-[16px] bg-[#f7f8fb] px-4 py-3.5 text-[0.95rem] font-semibold text-slate-600"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  onClick={() => handleCaseAction(selectedCase, 'block')}
                  className="col-span-2 flex items-center justify-center rounded-[16px] bg-[#fff1ef] px-4 py-3.5 text-[0.95rem] font-semibold text-[#d25346] ring-1 ring-[#ffd7d1]"
                >
                  Заблокировать
                </button>
              </div>
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
