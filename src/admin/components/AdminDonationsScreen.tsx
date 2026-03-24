'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminDonationAmountFilters,
  adminDonationEventFilters,
  adminDonationMethodFilters,
  adminDonationsKpis,
  adminDonationSideFilters,
  adminDonationStatusFilters,
  adminDonationTimingFilters,
  adminDonationUserFilters,
  adminManagedDonations,
  type AdminDonationAmountFilter,
  type AdminDonationMethod,
  type AdminDonationStatus,
  type AdminDonationTiming,
  type AdminDonationUserFilter,
  type AdminManagedDonation
} from '@/admin/data/donations';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function formatWithSpaces(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[\u00a0\u202f]/g, ' ');
}

function formatCurrency(value: number | null) {
  return value === null ? 'Не требуется' : `${formatWithSpaces(value)} ₽`;
}

function formatPercent(value: number) {
  return `${new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })
    .format(value)
    .replace(/[\u00a0\u202f]/g, ' ')}%`;
}

function formatKpiValue(value: number, kind: 'currency' | 'percent' | 'count') {
  if (kind === 'currency') {
    return formatCurrency(value);
  }

  if (kind === 'percent') {
    return formatPercent(value);
  }

  return formatWithSpaces(value);
}

function getMethodLabel(method: AdminDonationMethod) {
  switch (method) {
    case 'card':
      return 'Банковская карта';
    case 'sbp':
      return 'СБП';
    case 'apple-pay':
      return 'Apple Pay';
  }
}

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

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4v-4.5z" strokeLinejoin="round" />
    </svg>
  );
}

function getKpiBadgeTone(tone: 'blue' | 'green' | 'orange' | 'rose') {
  switch (tone) {
    case 'blue':
      return 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]';
    case 'green':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'orange':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'rose':
    default:
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
  }
}

function KpiCard({
  label,
  value,
  kind,
  hint,
  tone
}: {
  label: string;
  value: number;
  kind: 'currency' | 'percent' | 'count';
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'rose';
}) {
  return (
    <article className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{formatKpiValue(value, kind)}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getKpiBadgeTone(tone))}>{hint}</span>
      </div>
    </article>
  );
}

function FilterField({
  label,
  value,
  onChange,
  options,
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
  className?: string;
}) {
  return (
    <label className={cn('relative min-w-[11rem]', className)}>
      <span className="pointer-events-none absolute left-4 top-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full appearance-none rounded-[16px] border border-black/[0.05] bg-white px-4 pb-3 pt-6 text-[0.9rem] font-medium text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
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

function SearchField({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative min-w-[18rem] flex-1">
      <span className="pointer-events-none absolute left-4 top-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
        Поиск по пользователю
      </span>
      <span className="pointer-events-none absolute left-4 top-[2.05rem] text-slate-400">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Имя, email, телефон или ID"
        className="h-14 w-full rounded-[16px] border border-black/[0.05] bg-white pl-10 pr-4 pt-4 text-[0.9rem] font-medium text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.04)] outline-none placeholder:text-slate-400 focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
      />
    </label>
  );
}

function getStatusTone(status: AdminDonationStatus) {
  switch (status) {
    case 'success':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'error':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'refund':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'dispute':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
  }
}

function getStatusLabel(status: AdminDonationStatus) {
  switch (status) {
    case 'success':
      return 'Успешно';
    case 'error':
      return 'Ошибка';
    case 'refund':
      return 'Возврат';
    case 'dispute':
      return 'Спорно';
  }
}

function getTimingTone(timing: AdminDonationTiming) {
  return timing === 'live'
    ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
    : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
}

function getTimingLabel(timing: AdminDonationTiming) {
  return timing === 'live' ? 'Эфир' : 'После эфира';
}

function DetailMetric({
  label,
  value,
  note
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[1.04rem] font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-[0.76rem] text-slate-500">{note}</p>
    </div>
  );
}

function DetailField({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-[0.92rem] font-medium leading-6 text-slate-800">{value}</p>
    </div>
  );
}

type DonationFilters = {
  status: (typeof adminDonationStatusFilters)[number]['id'];
  timing: (typeof adminDonationTimingFilters)[number]['id'];
  user: AdminDonationUserFilter;
  event: (typeof adminDonationEventFilters)[number]['id'];
  side: (typeof adminDonationSideFilters)[number]['id'];
  amount: AdminDonationAmountFilter;
  method: (typeof adminDonationMethodFilters)[number]['id'];
  query: string;
};

const defaultFilters: DonationFilters = {
  status: 'all',
  timing: 'all',
  user: 'all',
  event: 'all',
  side: 'all',
  amount: 'all',
  method: 'all',
  query: ''
};

function DonationDrawer({
  donation,
  disputeNote,
  internalComment,
  notesSaved,
  onDisputeNoteChange,
  onInternalCommentChange,
  onOpen,
  onRefund,
  onSave
}: {
  donation: AdminManagedDonation;
  disputeNote: string;
  internalComment: string;
  notesSaved: boolean;
  onDisputeNoteChange: (value: string) => void;
  onInternalCommentChange: (value: string) => void;
  onOpen: () => void;
  onRefund: () => void;
  onSave: () => void;
}) {
  const refundValue =
    donation.status === 'refund'
      ? formatCurrency(donation.refundAmount ?? donation.amount)
      : donation.status === 'dispute'
        ? 'Под вопросом'
        : 'Не требуется';

  const refundNote =
    donation.status === 'refund'
      ? 'Возврат инициирован'
      : donation.status === 'dispute'
        ? 'Нужна проверка финкоманды'
        : 'Критичных действий нет';

  return (
    <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-black/[0.045] px-5 py-5">
        <div className="rounded-[22px] border border-black/[0.04] bg-[linear-gradient(135deg,#fbfcfe_0%,#f2f5fb_100%)] p-4">
          <div className="rounded-[18px] border border-black/[0.04] bg-white/80 px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Транзакция</p>
                <p className="mt-2 text-[1.28rem] font-semibold tracking-tight text-slate-900">{donation.id}</p>
              </div>
              <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(donation.status))}>
                {getStatusLabel(donation.status)}
              </span>
            </div>

            <p className="mt-4 text-[1.9rem] font-semibold tracking-tight text-slate-900">{formatCurrency(donation.amount)}</p>
            <p className="mt-1 text-[0.88rem] text-slate-500">
              {getMethodLabel(donation.method)} · {donation.at}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          <DetailMetric label="Сумма" value={formatCurrency(donation.amount)} note={getMethodLabel(donation.method)} />
          <DetailMetric label="Возврат" value={refundValue} note={refundNote} />
        </div>

        <div className="space-y-3">
          <DetailField label="Пользователь" value={`${donation.user} · ${donation.userMeta}`} />
          <DetailField label="Событие" value={donation.event} />
          <DetailField label="Состояние события" value={donation.eventState} />
          <DetailField label="Кого поддержал" value={donation.side} />
          <DetailField label="Окно поддержки" value={donation.timingWindow} />
          <DetailField label="Связь с архивом" value={donation.archiveRelation} />
          <DetailField label="Быстрая сумма" value={`${donation.quickAmount} · ${donation.customAmount ? 'есть своя сумма' : 'использован пресет'}`} />
        </div>

        <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
          <div>
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">История</p>
            <p className="mt-1 text-[0.82rem] text-slate-500">Последние этапы обработки транзакции.</p>
          </div>

          <div className="mt-4 space-y-2.5">
            {donation.statusHistory.map((item) => (
              <div key={item.id} className="rounded-[14px] bg-[#f8fafc] px-3.5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.86rem] font-medium text-slate-800">{item.label}</p>
                  <p className="text-[0.78rem] text-slate-500">{item.at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <CommentIcon />
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em]">Примечание по спору</p>
          </div>
          <p className="mt-1 text-[0.82rem] text-slate-500">Зафиксируйте решение, риск или контекст для финансовой команды.</p>
          <textarea
            value={disputeNote}
            onChange={(event) => onDisputeNoteChange(event.target.value)}
            className="mt-3 min-h-[5.25rem] w-full resize-none rounded-[16px] border border-black/[0.05] bg-[#f8fafc] px-3.5 py-3 text-[0.9rem] text-slate-700 outline-none focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
          />
        </div>

        <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <CommentIcon />
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em]">Внутренний комментарий</p>
          </div>
          <p className="mt-1 text-[0.82rem] text-slate-500">Внутренние замечания по пользователю, шлюзу или ручной проверке.</p>
          <textarea
            value={internalComment}
            onChange={(event) => onInternalCommentChange(event.target.value)}
            className="mt-3 min-h-[5.25rem] w-full resize-none rounded-[16px] border border-black/[0.05] bg-[#f8fafc] px-3.5 py-3 text-[0.9rem] text-slate-700 outline-none focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
          />
        </div>

        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.92rem] font-semibold text-slate-700"
            >
              Открыть
            </button>
            <button
              type="button"
              onClick={onRefund}
              disabled={donation.status === 'refund'}
              className={cn(
                'rounded-[16px] px-4 py-3.5 text-[0.92rem] font-semibold',
                donation.status === 'refund'
                  ? 'cursor-not-allowed border border-black/[0.06] bg-[#f8fafc] text-slate-400'
                  : 'border border-[#f1ddcd] bg-[#fff7f2] text-[#a9693a]'
              )}
            >
              {donation.status === 'refund' ? 'Возврат оформлен' : 'Оформить возврат'}
            </button>
          </div>

          <button
            type="button"
            onClick={onSave}
            className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
          >
            {notesSaved ? 'Сохранено' : 'Сохранить'}
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AdminDonationsScreen() {
  const [managedDonations, setManagedDonations] = useState(adminManagedDonations);
  const [draftFilters, setDraftFilters] = useState<DonationFilters>(defaultFilters);
  const [filters, setFilters] = useState<DonationFilters>(defaultFilters);
  const [selectedDonationId, setSelectedDonationId] = useState(adminManagedDonations[0]?.id ?? '');
  const [disputeNote, setDisputeNote] = useState(adminManagedDonations[0]?.disputeNote ?? '');
  const [internalComment, setInternalComment] = useState(adminManagedDonations[0]?.internalComment ?? '');
  const [notesSaved, setNotesSaved] = useState(false);
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

  const filteredDonations = useMemo(() => {
    const selectedSideOption = adminDonationSideFilters.find((filter) => filter.id === filters.side);

    return managedDonations.filter((donation) => {
      const statusMatch = filters.status === 'all' ? true : donation.status === filters.status;
      const timingMatch = filters.timing === 'all' ? true : donation.timing === filters.timing;
      const userMatch = filters.user === 'all' ? true : donation.userFilter === filters.user;
      const eventMatch = filters.event === 'all' ? true : donation.eventFilter === filters.event;
      const sideMatch = filters.side === 'all' || !selectedSideOption ? true : donation.side === selectedSideOption.label;
      const methodMatch = filters.method === 'all' ? true : donation.method === filters.method;
      const amountMatch =
        filters.amount === 'all'
          ? true
          : filters.amount === 'small'
            ? donation.amount <= 1000
            : filters.amount === 'medium'
              ? donation.amount > 1000 && donation.amount < 5000
              : donation.amount >= 5000;
      const query = filters.query.trim().toLowerCase();
      const queryMatch =
        query.length === 0
          ? true
          : `${donation.id} ${donation.user} ${donation.userMeta} ${donation.event} ${donation.side}`.toLowerCase().includes(query);

      return statusMatch && timingMatch && userMatch && eventMatch && sideMatch && methodMatch && amountMatch && queryMatch;
    });
  }, [filters, managedDonations]);

  useEffect(() => {
    if (!filteredDonations.some((donation) => donation.id === selectedDonationId)) {
      setSelectedDonationId(filteredDonations[0]?.id ?? '');
    }
  }, [filteredDonations, selectedDonationId]);

  const selectedDonation =
    filteredDonations.find((donation) => donation.id === selectedDonationId) ?? filteredDonations[0] ?? managedDonations[0];

  useEffect(() => {
    if (selectedDonation) {
      setDisputeNote(selectedDonation.disputeNote);
      setInternalComment(selectedDonation.internalComment);
      setNotesSaved(false);
    }
  }, [selectedDonation]);

  const updateDonation = (donationId: string, updater: (donation: AdminManagedDonation) => AdminManagedDonation) => {
    setManagedDonations((current) => current.map((donation) => (donation.id === donationId ? updater(donation) : donation)));
  };

  const openDonationConfirmation = (
    donation: AdminManagedDonation,
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
    setSelectedDonationId(donation.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Транзакция', value: donation.id },
        { label: 'Сумма', value: formatCurrency(donation.amount) },
        { label: 'Статус', value: getStatusLabel(donation.status) },
        { label: 'Окно поддержки', value: donation.timingWindow },
        { label: 'Состояние события', value: donation.eventState },
        { label: 'Пользователь', value: donation.user }
      ]
    });
  };

  const handleRefund = (donation: AdminManagedDonation) => {
    if (donation.status === 'refund') {
      return;
    }

    openDonationConfirmation(donation, {
      title: 'Оформить возврат',
      description: 'Транзакция будет переведена в статус возврата, а действие попадёт в обязательный журнал действий финансовой команды.',
      confirmLabel: 'Подтвердить возврат',
      tone: 'danger',
      badge: 'Возврат',
      footnote: 'Возвраты относятся к критичным действиям и требуют явного подтверждения.',
      onConfirm: () => {
        updateDonation(donation.id, (current) => ({
          ...current,
          status: 'refund',
          refundAmount: current.amount,
          disputeNote,
          internalComment,
          statusHistory: [{ id: `${current.id}-refund-approved`, label: 'Возврат подтверждён вручную', at: 'Сейчас' }, ...current.statusHistory]
        }));
        setConfirmState(null);
      }
    });
  };

  const handleSaveNotes = () => {
    if (!selectedDonation) {
      return;
    }

    updateDonation(selectedDonation.id, (current) => ({
      ...current,
      disputeNote,
      internalComment,
      statusHistory: [{ id: `${current.id}-notes-updated`, label: 'Сохранены внутренние заметки', at: 'Сейчас' }, ...current.statusHistory]
    }));
    setNotesSaved(true);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminDonationsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} kind={kpi.kind} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterField
            label="Статус"
            value={draftFilters.status}
            onChange={(value) => setDraftFilters((current) => ({ ...current, status: value as DonationFilters['status'] }))}
            options={adminDonationStatusFilters}
          />
          <FilterField
            label="Окно поддержки"
            value={draftFilters.timing}
            onChange={(value) => setDraftFilters((current) => ({ ...current, timing: value as DonationFilters['timing'] }))}
            options={adminDonationTimingFilters}
          />
          <FilterField
            label="Пользователь"
            value={draftFilters.user}
            onChange={(value) => setDraftFilters((current) => ({ ...current, user: value as AdminDonationUserFilter }))}
            options={adminDonationUserFilters}
          />
          <FilterField
            label="Событие"
            value={draftFilters.event}
            onChange={(value) => setDraftFilters((current) => ({ ...current, event: value as DonationFilters['event'] }))}
            options={adminDonationEventFilters}
            className="min-w-[12rem]"
          />
          <FilterField
            label="Кого поддержал"
            value={draftFilters.side}
            onChange={(value) => setDraftFilters((current) => ({ ...current, side: value as DonationFilters['side'] }))}
            options={adminDonationSideFilters}
            className="min-w-[12rem]"
          />
          <FilterField
            label="Сумма"
            value={draftFilters.amount}
            onChange={(value) => setDraftFilters((current) => ({ ...current, amount: value as AdminDonationAmountFilter }))}
            options={adminDonationAmountFilters}
          />
          <FilterField
            label="Метод"
            value={draftFilters.method}
            onChange={(value) => setDraftFilters((current) => ({ ...current, method: value as DonationFilters['method'] }))}
            options={adminDonationMethodFilters}
          />

          <SearchField value={draftFilters.query} onChange={(value) => setDraftFilters((current) => ({ ...current, query: value }))} />

          <button
            type="button"
            onClick={() => setFilters(draftFilters)}
            className="rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-5 py-3 text-[0.92rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
          >
            Применить
          </button>
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Транзакции</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор донатов, возвратов и спорных кейсов платформы.</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">{filteredDonations.length} записей</div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[8rem_minmax(14rem,1.25fr)_minmax(12rem,1.2fr)_minmax(10rem,1fr)_8rem_8rem_9rem_8rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>ID</span>
                <span>Пользователь</span>
                <span>Событие</span>
                <span>Кого поддержал</span>
                <span>Сумма</span>
                <span>Статус</span>
                <span>Дата и время</span>
                <span>Метод</span>
              </div>

              <div className="space-y-3">
                {filteredDonations.map((donation) => {
                  const active = donation.id === selectedDonation?.id;

                  return (
                    <button
                      key={donation.id}
                      type="button"
                      onClick={() => setSelectedDonationId(donation.id)}
                      className={cn(
                        'grid w-full grid-cols-[8rem_minmax(14rem,1.25fr)_minmax(12rem,1.2fr)_minmax(10rem,1fr)_8rem_8rem_9rem_8rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <p className="text-[0.9rem] font-semibold tracking-tight text-slate-900">{donation.id}</p>

                      <div className="flex min-w-0 items-center gap-3">
                        <div className={cn('flex h-11 w-11 items-center justify-center rounded-full text-[0.9rem] font-semibold text-slate-700', donation.avatarTone)}>
                          {donation.user.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[0.98rem] font-semibold tracking-tight text-slate-900">{donation.user}</p>
                          <p className="truncate text-[0.82rem] text-slate-500">{donation.userMeta}</p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.9rem] font-medium text-slate-800">{donation.event}</p>
                        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{donation.eventState}</p>
                      </div>
                      <p className="truncate text-[0.86rem] text-slate-600">{donation.side}</p>
                      <div>
                        <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{formatCurrency(donation.amount)}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-400">
                          {donation.customAmount ? `своя сумма · ${donation.quickAmount}` : `пресет · ${donation.quickAmount}`}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(donation.status))}>
                          {getStatusLabel(donation.status)}
                        </span>
                        <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getTimingTone(donation.timing))}>
                          {getTimingLabel(donation.timing)}
                        </span>
                      </div>

                      <div>
                        <p className="text-[0.84rem] text-slate-500">{donation.at}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-400">{donation.timingWindow}</p>
                      </div>
                      <p className="text-[0.84rem] text-slate-500">{getMethodLabel(donation.method)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedDonation ? (
          <DonationDrawer
            donation={selectedDonation}
            disputeNote={disputeNote}
            internalComment={internalComment}
            notesSaved={notesSaved}
            onDisputeNoteChange={setDisputeNote}
            onInternalCommentChange={setInternalComment}
            onOpen={() => setSelectedDonationId(selectedDonation.id)}
            onRefund={() => handleRefund(selectedDonation)}
            onSave={handleSaveNotes}
          />
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
