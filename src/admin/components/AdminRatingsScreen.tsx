'use client';

import { useMemo, useState, type ReactNode } from 'react';

import {
  adminRatingAdjustments,
  adminRatingEventFilters,
  adminRatingPeriodFilters,
  adminRatingRules,
  adminRatingsKpis,
  adminRatingsRows,
  adminRatingSportFilters,
  adminRatingStatusFilters,
  adminRatingSystemState,
  adminRatingTypeFilters,
  type AdminRatingRow,
  type AdminRatingStatus
} from '@/admin/data/ratings';
import { cn } from '@/lib/utils';

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
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

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m4 20 4.5-1 9-9a2 2 0 1 0-2.8-2.8l-9 9z" strokeLinejoin="round" />
      <path d="M13 6.5 17.5 11" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 5v5h-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10a8 8 0 1 0 2 5.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RuleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="3" />
      <path d="M9 9h6" strokeLinecap="round" />
      <path d="M9 13h6" strokeLinecap="round" />
    </svg>
  );
}

function SystemGoodIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-4.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SystemWarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4 3.8 18h16.4z" strokeLinejoin="round" />
      <path d="M12 9v4" strokeLinecap="round" />
      <path d="M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}

function SystemInfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v5" strokeLinecap="round" />
      <path d="M12 7.5h.01" strokeLinecap="round" />
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
  tone: 'blue' | 'green' | 'orange' | 'slate';
}) {
  const accent =
    tone === 'blue'
      ? 'bg-[#edf4ff] text-[#4f8ff6]'
      : tone === 'green'
        ? 'bg-emerald-50 text-emerald-600'
        : tone === 'orange'
          ? 'bg-amber-50 text-amber-600'
          : 'bg-slate-100 text-slate-500';

  return (
    <div className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.88rem] font-medium text-slate-500">{label}</p>
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
  minWidth = 'min-w-[12rem]'
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

function getStatusTone(status: AdminRatingStatus) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'in-event':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'paused':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getStatusLabel(status: AdminRatingStatus) {
  switch (status) {
    case 'active':
      return 'Активен';
    case 'in-event':
      return 'В событии';
    case 'paused':
      return 'Пауза';
  }
}

function getChangeTone(changeTone: AdminRatingRow['changeTone']) {
  switch (changeTone) {
    case 'positive':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100';
    case 'negative':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-100';
    case 'neutral':
      return 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
  }
}

function getChangeLabel(change: string) {
  if (change.startsWith('+')) {
    return `↑ ${change.replace('+', '')}`;
  }

  if (change.startsWith('-')) {
    return `↓ ${change.replace('-', '')}`;
  }

  return 'Без изм.';
}

function getPositionTone(position: number) {
  if (position === 1) {
    return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  }

  if (position === 2) {
    return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }

  if (position === 3) {
    return 'bg-orange-50 text-orange-700 ring-1 ring-orange-200';
  }

  return 'bg-[#f5f8fd] text-slate-600 ring-1 ring-black/[0.05]';
}

function getStateTone(tone: 'good' | 'warning' | 'info') {
  switch (tone) {
    case 'good':
      return {
        iconClass: 'text-emerald-500',
        valueClass: 'text-slate-600',
        Icon: SystemGoodIcon
      };
    case 'warning':
      return {
        iconClass: 'text-amber-500',
        valueClass: 'text-amber-600',
        Icon: SystemWarningIcon
      };
    case 'info':
      return {
        iconClass: 'text-sky-500',
        valueClass: 'text-slate-600',
        Icon: SystemInfoIcon
      };
  }
}

function SideSection({
  title,
  actionLabel,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.045] px-5 py-4">
        <div>
          <h3 className="text-[1.06rem] font-semibold tracking-tight text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-[0.82rem] text-slate-500">{subtitle}</p> : null}
        </div>
        {actionLabel ? (
          <button type="button" className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.76rem] font-semibold text-slate-600">
            {actionLabel}
          </button>
        ) : null}
      </div>
      <div className="space-y-3 p-5">{children}</div>
    </section>
  );
}

function RowActionButton({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-[12px] border border-black/[0.05] bg-white/70 p-2 text-slate-400 transition hover:border-black/[0.08] hover:text-slate-700"
    >
      {children}
    </button>
  );
}

export function AdminRatingsScreen() {
  const [typeFilter, setTypeFilter] = useState<(typeof adminRatingTypeFilters)[number]['id']>('global');
  const [periodFilter, setPeriodFilter] = useState<(typeof adminRatingPeriodFilters)[number]['id']>('current-month');
  const [eventFilter, setEventFilter] = useState<(typeof adminRatingEventFilters)[number]['id']>('all');
  const [sportFilter, setSportFilter] = useState<(typeof adminRatingSportFilters)[number]['id']>('all');
  const [statusFilter, setStatusFilter] = useState<(typeof adminRatingStatusFilters)[number]['id']>('all');

  const filteredRows = useMemo(() => {
    return adminRatingsRows.filter((row) => {
      const typeMatch = typeFilter === 'global' ? row.type === 'global' : row.type === typeFilter;
      const eventMatch = eventFilter === 'all' ? true : row.event === adminRatingEventFilters.find((item) => item.id === eventFilter)?.label;
      const sportMatch = sportFilter === 'all' ? true : row.sport === adminRatingSportFilters.find((item) => item.id === sportFilter)?.label;
      const statusMatch = statusFilter === 'all' ? true : row.status === statusFilter;
      return typeMatch && eventMatch && sportMatch && statusMatch;
    });
  }, [eventFilter, sportFilter, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminRatingsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={typeFilter} onChange={(value) => setTypeFilter(value as (typeof adminRatingTypeFilters)[number]['id'])} options={adminRatingTypeFilters} />
          <FilterSelect value={periodFilter} onChange={(value) => setPeriodFilter(value as (typeof adminRatingPeriodFilters)[number]['id'])} options={adminRatingPeriodFilters} />
          <FilterSelect value={eventFilter} onChange={(value) => setEventFilter(value as (typeof adminRatingEventFilters)[number]['id'])} options={adminRatingEventFilters} minWidth="min-w-[13rem]" />
          <FilterSelect value={sportFilter} onChange={(value) => setSportFilter(value as (typeof adminRatingSportFilters)[number]['id'])} options={adminRatingSportFilters} />
          <FilterSelect value={statusFilter} onChange={(value) => setStatusFilter(value as (typeof adminRatingStatusFilters)[number]['id'])} options={adminRatingStatusFilters} />
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
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Таблица рейтингов</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор позиций, ручных корректировок и текущих периодов начисления.</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">{filteredRows.length} записей</div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[5rem_minmax(16rem,1.4fr)_7rem_7rem_minmax(14rem,1.2fr)_8rem_7.5rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Позиция</span>
                <span>Пользователь</span>
                <span>Очки</span>
                <span>Изменение</span>
                <span>Событие / Период</span>
                <span>Статус</span>
                <span className="text-right">Действия</span>
              </div>

              <div className="space-y-3">
                {filteredRows.map((row) => (
                  <div
                    key={row.id}
                    className={cn(
                      'grid grid-cols-[5rem_minmax(16rem,1.4fr)_7rem_7rem_minmax(14rem,1.2fr)_8rem_7.5rem] items-center gap-4 rounded-[20px] border px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                      row.position <= 3
                        ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_14px_28px_rgba(79,143,246,0.08)]'
                        : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)]'
                    )}
                  >
                    <div className="flex items-center">
                      <span className={cn('inline-flex min-w-[2.5rem] items-center justify-center rounded-full px-3 py-1.5 text-[0.86rem] font-semibold', getPositionTone(row.position))}>
                        {row.position}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <div className={cn('flex h-11 w-11 items-center justify-center rounded-full text-[0.9rem] font-semibold text-slate-700', row.avatarTone)}>
                        {row.user.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.98rem] font-semibold tracking-tight text-slate-900">{row.user}</p>
                        <p className="truncate text-[0.84rem] text-slate-500">{row.handle}</p>
                      </div>
                    </div>

                    <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{row.points}</p>

                    <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getChangeTone(row.changeTone))}>
                      {getChangeLabel(row.change)}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-[0.92rem] font-medium text-slate-800">{row.event}</p>
                      <p className="truncate text-[0.82rem] text-slate-500">{row.period}</p>
                    </div>

                    <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(row.status))}>
                      {getStatusLabel(row.status)}
                    </span>

                    <div className="flex items-center justify-end gap-2">
                      <RowActionButton label={`Открыть ${row.user}`}>
                        <EyeIcon />
                      </RowActionButton>
                      <RowActionButton label={`Редактировать ${row.user}`}>
                        <EditIcon />
                      </RowActionButton>
                      <RowActionButton label={`Пересчитать ${row.user}`}>
                        <RefreshIcon />
                      </RowActionButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <SideSection title="Правила начисления" subtitle="Текущие базовые правила расчёта" actionLabel="Управление правилами">
            {adminRatingRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd] text-slate-500">
                    <RuleIcon />
                  </span>
                  <p className="truncate text-[0.92rem] font-medium text-slate-800">{rule.label}</p>
                </div>
                <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[0.78rem] font-semibold text-[#2f78d3]">{rule.points}</span>
              </div>
            ))}
          </SideSection>

          <SideSection title="Последние корректировки" subtitle="Ручные изменения по пользователям" actionLabel="Смотреть все">
            {adminRatingAdjustments.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-full text-[0.88rem] font-semibold text-slate-700', item.avatarTone)}>
                  {item.user.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[0.92rem] font-semibold text-slate-900">{item.user}</p>
                      <p className="truncate text-[0.82rem] text-slate-500">{item.reason}</p>
                    </div>
                    <p className={cn('text-[0.9rem] font-semibold', item.tone === 'positive' ? 'text-emerald-600' : item.tone === 'negative' ? 'text-rose-600' : 'text-slate-600')}>
                      {item.amount}
                    </p>
                  </div>
                  <p className="mt-2 text-[0.8rem] text-slate-400">{item.at}</p>
                </div>
              </div>
            ))}
          </SideSection>

          <SideSection title="Состояние системы" subtitle="Блок контроля расчёта и обновлений">
            {adminRatingSystemState.map((item) => {
              const tone = getStateTone(item.tone);
              const Icon = tone.Icon;

              return (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-[12px]',
                        item.tone === 'good'
                          ? 'bg-emerald-50/80'
                          : item.tone === 'warning'
                            ? 'bg-amber-50/80'
                            : 'bg-sky-50/80',
                        tone.iconClass
                      )}
                    >
                      <Icon />
                    </span>
                    <p className="text-[0.92rem] font-medium text-slate-800">{item.label}</p>
                  </div>
                  <span className={cn('text-right text-[0.84rem] font-medium', tone.valueClass)}>{item.value}</span>
                </div>
              );
            })}
          </SideSection>
        </div>
      </section>
    </div>
  );
}
