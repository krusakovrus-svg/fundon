'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminDonationMethodFilters,
  adminDonationsKpis,
  adminDonationStatusFilters,
  adminManagedDonations,
  type AdminDonationStatus,
  type AdminManagedDonation
} from '@/admin/data/donations';
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

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4v-4.5z" strokeLinejoin="round" />
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
  onClick,
  wide = false
}: {
  label: string;
  value: string;
  onClick?: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-between gap-3 rounded-[14px] border border-black/[0.05] bg-white px-3.5 py-2.5 text-left text-[0.9rem] shadow-[0_8px_18px_rgba(15,23,42,0.04)]',
        wide ? 'min-w-[13rem]' : 'min-w-[10rem]'
      )}
    >
      <div>
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-1 font-medium text-slate-700">{value}</p>
      </div>
      <ChevronDownIcon />
    </button>
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

function DetailField({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[0.96rem] font-medium text-slate-800">{value}</p>
    </div>
  );
}

export function AdminDonationsScreen() {
  const [managedDonations, setManagedDonations] = useState(adminManagedDonations);
  const [statusIndex, setStatusIndex] = useState(0);
  const [methodIndex, setMethodIndex] = useState(0);
  const [userQuery, setUserQuery] = useState('');
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

  const selectedStatus = adminDonationStatusFilters[statusIndex];
  const selectedMethod = adminDonationMethodFilters[methodIndex];

  const filteredDonations = useMemo(() => {
    return managedDonations.filter((donation) => {
      const statusMatch = selectedStatus.id === 'all' ? true : donation.status === selectedStatus.id;
      const methodMatch = selectedMethod.id === 'all' ? true : donation.method === selectedMethod.label;
      const queryMatch =
        userQuery.trim().length === 0
          ? true
          : `${donation.id} ${donation.user} ${donation.event} ${donation.side}`.toLowerCase().includes(userQuery.trim().toLowerCase());

      return statusMatch && methodMatch && queryMatch;
    });
  }, [managedDonations, selectedMethod.id, selectedMethod.label, selectedStatus.id, userQuery]);

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
        { label: 'Сумма', value: donation.amount },
        { label: 'Статус', value: getStatusLabel(donation.status) },
        { label: 'Пользователь', value: donation.user }
      ]
    });
  };

  const handleRefund = (donation: AdminManagedDonation) => {
    openDonationConfirmation(donation, {
      title: 'Оформить возврат',
      description: 'Транзакция будет переведена в статус возврата, а действие попадёт в обязательный audit trail для finance-команды.',
      confirmLabel: 'Подтвердить возврат',
      tone: 'danger',
      badge: 'Refund approval',
      footnote: 'Возвраты относятся к критичным действиям и должны подтверждаться явно.',
      onConfirm: () => {
        updateDonation(donation.id, (current) => ({
          ...current,
          status: 'refund',
          internalComment,
          disputeNote,
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
      statusHistory: [{ id: `${current.id}-notes-updated`, label: 'Обновлены внутренние заметки', at: 'Сейчас' }, ...current.statusHistory]
    }));
    setNotesSaved(true);
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminDonationsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterButton label="Статус" value={selectedStatus.label} onClick={() => setStatusIndex((current) => (current + 1) % adminDonationStatusFilters.length)} />
          <FilterButton label="Пользователь" value={userQuery.trim().length ? 'Найдено по запросу' : 'Все пользователи'} wide />
          <FilterButton label="Событие" value="Все события" wide />
          <FilterButton label="Кого поддержал" value="Все стороны" wide />
          <FilterButton label="Сумма" value="Любая" />
          <FilterButton label="Метод" value={selectedMethod.label} onClick={() => setMethodIndex((current) => (current + 1) % adminDonationMethodFilters.length)} />
          <FilterButton label="Дата" value="Текущий период" />

          <label className="ml-auto flex min-w-[18rem] items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={userQuery}
              onChange={(event) => setUserQuery(event.target.value)}
              placeholder="Поиск по пользователю..."
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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Транзакции</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор платежей, возвратов и спорных случаев</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">{filteredDonations.length} записей</div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1040px]">
              <div className="grid grid-cols-[8rem_minmax(14rem,1.1fr)_minmax(16rem,1.35fr)_10rem_8rem_8rem_10rem_8rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>ID</span>
                <span>Пользователь</span>
                <span>Событие / кого поддержал</span>
                <span>Сумма</span>
                <span>Статус</span>
                <span>Метод</span>
                <span>Дата / время</span>
                <span>Действия</span>
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
                        'grid w-full grid-cols-[8rem_minmax(14rem,1.1fr)_minmax(16rem,1.35fr)_10rem_8rem_8rem_10rem_8rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <p className="text-[0.92rem] font-semibold tracking-tight text-slate-900">{donation.id}</p>

                      <div className="flex min-w-0 items-center gap-3">
                        <div className={cn('flex h-11 w-11 items-center justify-center rounded-full text-[0.9rem] font-semibold text-slate-700', donation.avatarTone)}>
                          {donation.user.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[0.98rem] font-semibold tracking-tight text-slate-900">{donation.user}</p>
                          <p className="truncate text-[0.84rem] text-slate-500">{donation.userMeta}</p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.92rem] font-medium text-slate-800">{donation.event}</p>
                        <p className="truncate text-[0.82rem] text-slate-500">{donation.side}</p>
                      </div>

                      <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{donation.amount}</p>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(donation.status))}>
                        {getStatusLabel(donation.status)}
                      </span>

                      <p className="text-[0.86rem] text-slate-500">{donation.method}</p>
                      <p className="text-[0.86rem] text-slate-500">{donation.at}</p>

                      <div className="flex items-center justify-end gap-2">
                        <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500 transition hover:text-slate-700">
                          <WalletIcon />
                        </button>
                        <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500 transition hover:text-slate-700">
                          <HistoryIcon />
                        </button>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedDonation ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Транзакция</p>
                  <p className="mt-2 text-[1.28rem] font-semibold tracking-tight text-slate-900">{selectedDonation.id}</p>
                </div>
                <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(selectedDonation.status))}>
                  {getStatusLabel(selectedDonation.status)}
                </span>
              </div>

              <p className="mt-4 text-[1.95rem] font-semibold tracking-tight text-slate-900">{selectedDonation.amount}</p>
              <p className="mt-1 text-sm text-slate-500">{selectedDonation.method} · {selectedDonation.at}</p>
            </div>

            <div className="space-y-4 p-5">
              <DetailField label="Пользователь" value={`${selectedDonation.user} · ${selectedDonation.userMeta}`} />
              <DetailField label="Событие" value={selectedDonation.event} />
              <DetailField label="Кого поддержал" value={selectedDonation.side} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">История статуса</p>
                  <p className="mt-1 text-sm text-slate-500">Этапы обработки транзакции</p>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedDonation.statusHistory.map((item) => (
                    <div key={item.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[0.9rem] font-medium text-slate-800">{item.label}</p>
                        <p className="text-[0.82rem] text-slate-500">{item.at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <CommentIcon />
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em]">Примечание по спору</p>
                </div>
                <textarea
                  value={disputeNote}
                  onChange={(event) => setDisputeNote(event.target.value)}
                  className="mt-3 min-h-[5.5rem] w-full resize-none rounded-[16px] border border-black/[0.05] bg-[#f8f9fc] px-3.5 py-3 text-[0.9rem] text-slate-700 outline-none"
                />
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <CommentIcon />
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em]">Внутренний комментарий</p>
                </div>
                <textarea
                  value={internalComment}
                  onChange={(event) => setInternalComment(event.target.value)}
                  className="mt-3 min-h-[5.5rem] w-full resize-none rounded-[16px] border border-black/[0.05] bg-[#f8f9fc] px-3.5 py-3 text-[0.9rem] text-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDonationId(selectedDonation.id)}
                  className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  onClick={() => handleRefund(selectedDonation)}
                  className="rounded-[16px] bg-[#eef5ff] px-4 py-3.5 text-[0.95rem] font-semibold text-[#2f78d3] ring-1 ring-[#dbe7fb]"
                >
                  Оформить возврат
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveNotes}
                className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
              >
                {notesSaved ? 'Сохранено' : 'Сохранить'}
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
