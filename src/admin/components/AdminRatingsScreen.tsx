'use client';

import { useMemo, useState } from 'react';

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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

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
    <div className="rounded-[22px] border border-black/[0.05] bg-white/90 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <p className="text-[0.9rem] font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-[2rem] font-semibold tracking-tight text-slate-900">{value}</p>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', accent)}>{hint}</span>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  value,
  active = false,
  onClick
}: {
  label: string;
  value: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-w-[12rem] items-center justify-between gap-3 rounded-[14px] border px-3.5 py-2.5 text-left text-[0.9rem] shadow-[0_8px_18px_rgba(15,23,42,0.04)]',
        active ? 'border-[#dbe7fb] bg-[#eef5ff]' : 'border-black/[0.05] bg-white'
      )}
    >
      <div>
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-1 font-medium text-slate-700">{value}</p>
      </div>
      <span className="text-slate-400">
        <ChevronDownIcon />
      </span>
    </button>
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
      return 'bg-emerald-50 text-emerald-600';
    case 'negative':
      return 'bg-rose-50 text-rose-600';
    case 'neutral':
      return 'bg-slate-100 text-slate-500';
  }
}

function getStateTone(tone: 'good' | 'warning' | 'info') {
  switch (tone) {
    case 'good':
      return {
        dot: 'text-emerald-500',
        value: 'text-slate-600',
        Icon: SystemGoodIcon
      };
    case 'warning':
      return {
        dot: 'text-amber-500',
        value: 'text-amber-600',
        Icon: SystemWarningIcon
      };
    case 'info':
      return {
        dot: 'text-sky-500',
        value: 'text-slate-600',
        Icon: SystemInfoIcon
      };
  }
}

export function AdminRatingsScreen() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [periodIndex, setPeriodIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [sportIndex, setSportIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [query, setQuery] = useState('');

  const selectedType = adminRatingTypeFilters[typeIndex];
  const selectedPeriod = adminRatingPeriodFilters[periodIndex];
  const selectedEvent = adminRatingEventFilters[eventIndex];
  const selectedSport = adminRatingSportFilters[sportIndex];
  const selectedStatus = adminRatingStatusFilters[statusIndex];

  const filteredRows = useMemo(() => {
    return adminRatingsRows.filter((row) => {
      const typeMatch = selectedType.id === 'global' ? row.type === 'global' : selectedType.id === row.type;
      const eventMatch = selectedEvent.id === 'all' ? true : row.event === selectedEvent.label;
      const sportMatch = selectedSport.id === 'all' ? true : row.sport === selectedSport.label;
      const statusMatch = selectedStatus.id === 'all' ? true : row.status === selectedStatus.id;
      const queryMatch =
        query.trim().length === 0
          ? true
          : `${row.user} ${row.handle} ${row.event}`.toLowerCase().includes(query.trim().toLowerCase());

      return typeMatch && eventMatch && sportMatch && statusMatch && queryMatch;
    });
  }, [query, selectedEvent.id, selectedEvent.label, selectedSport.id, selectedSport.label, selectedStatus.id, selectedType.id]);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminRatingsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterButton label="Тип рейтинга" value={selectedType.label} onClick={() => setTypeIndex((current) => (current + 1) % adminRatingTypeFilters.length)} />
          <FilterButton label="Период" value={selectedPeriod.label} onClick={() => setPeriodIndex((current) => (current + 1) % adminRatingPeriodFilters.length)} />
          <FilterButton label="Событие" value={selectedEvent.label} onClick={() => setEventIndex((current) => (current + 1) % adminRatingEventFilters.length)} />
          <FilterButton label="Вид спорта" value={selectedSport.label} onClick={() => setSportIndex((current) => (current + 1) % adminRatingSportFilters.length)} />
          <FilterButton label="Статус" value={selectedStatus.label} onClick={() => setStatusIndex((current) => (current + 1) % adminRatingStatusFilters.length)} />

          <label className="ml-auto flex min-w-[18rem] items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по пользователю..."
              className="w-full bg-transparent text-[0.95rem] text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Топ пользователей</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор рейтингов, позиций и ручных корректировок</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">{filteredRows.length} записей</div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[4rem_minmax(16rem,1.4fr)_7rem_7rem_minmax(14rem,1.2fr)_8rem_7.5rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Позиция</span>
                <span>Пользователь</span>
                <span>Очки</span>
                <span>Изменение</span>
                <span>Событие / Период</span>
                <span>Статус</span>
                <span>Действия</span>
              </div>

              <div className="space-y-3">
                {filteredRows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[4rem_minmax(16rem,1.4fr)_7rem_7rem_minmax(14rem,1.2fr)_8rem_7.5rem] items-center gap-4 rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[1.02rem] font-semibold tracking-tight text-slate-900">{row.position}</span>
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

                    <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getChangeTone(row.changeTone))}>
                      {row.change}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-[0.92rem] font-medium text-slate-800">{row.event}</p>
                      <p className="truncate text-[0.82rem] text-slate-500">{row.period}</p>
                    </div>

                    <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(row.status))}>
                      {getStatusLabel(row.status)}
                    </span>

                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500 transition hover:text-slate-700">
                        <EyeIcon />
                      </button>
                      <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500 transition hover:text-slate-700">
                        <EditIcon />
                      </button>
                      <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500 transition hover:text-slate-700">
                        <RefreshIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 border-b border-black/[0.045] px-5 py-4">
              <div>
                <h3 className="text-[1.06rem] font-semibold tracking-tight text-slate-900">Правила начисления</h3>
              </div>
              <button type="button" className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.76rem] font-semibold text-slate-600">
                Управление правилами
              </button>
            </div>
            <div className="space-y-3 p-5">
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
            </div>
          </section>

          <section className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 border-b border-black/[0.045] px-5 py-4">
              <h3 className="text-[1.06rem] font-semibold tracking-tight text-slate-900">Последние корректировки</h3>
              <button type="button" className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.76rem] font-semibold text-slate-600">
                Смотреть все
              </button>
            </div>
            <div className="space-y-3 p-5">
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
            </div>
          </section>

          <section className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-4">
              <h3 className="text-[1.06rem] font-semibold tracking-tight text-slate-900">Состояние системы</h3>
            </div>
            <div className="space-y-3 p-5">
              {adminRatingSystemState.map((item) => {
                const tone = getStateTone(item.tone);
                const Icon = tone.Icon;

                return (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className={cn('flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd]', tone.dot)}>
                        <Icon />
                      </span>
                      <p className="text-[0.92rem] font-medium text-slate-800">{item.label}</p>
                    </div>
                    <span className={cn('text-[0.84rem] font-medium', tone.value)}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
