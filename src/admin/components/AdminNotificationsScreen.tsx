'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminManagedNotifications,
  adminNotificationAudienceFilters,
  adminNotificationDateFilters,
  adminNotificationEventFilters,
  adminNotificationsKpis,
  adminNotificationStatusFilters,
  adminNotificationTypeFilters,
  type AdminManagedNotification,
  type AdminNotificationAudience,
  type AdminNotificationStatus,
  type AdminNotificationType
} from '@/admin/data/notifications';
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

function getStatusTone(status: AdminNotificationStatus) {
  switch (status) {
    case 'sent':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'scheduled':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'error':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'draft':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getStatusLabel(status: AdminNotificationStatus) {
  switch (status) {
    case 'sent':
      return 'Отправлено';
    case 'scheduled':
      return 'Запланировано';
    case 'error':
      return 'Ошибка';
    case 'draft':
      return 'Черновик';
  }
}

function getTypeTone(type: AdminNotificationType) {
  switch (type) {
    case 'push':
      return 'bg-[#eef5ff] text-[#2f78d3]';
    case 'email':
      return 'bg-violet-50 text-violet-700';
    case 'room':
      return 'bg-emerald-50 text-emerald-700';
    case 'live':
      return 'bg-amber-50 text-amber-700';
  }
}

function getTypeLabel(type: AdminNotificationType) {
  switch (type) {
    case 'push':
      return 'Push';
    case 'email':
      return 'Email';
    case 'room':
      return 'Комната';
    case 'live':
      return 'Live';
  }
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <p className="mt-1 truncate text-[0.94rem] font-medium text-slate-800">{value}</p>
      </div>
      <span className="text-slate-400">
        <ChevronRightIcon />
      </span>
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

export function AdminNotificationsScreen() {
  const [typeFilter, setTypeFilter] = useState<'all' | AdminNotificationType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AdminNotificationStatus>('all');
  const [eventFilter, setEventFilter] = useState<(typeof adminNotificationEventFilters)[number]['id']>('all');
  const [audienceFilter, setAudienceFilter] = useState<'all' | AdminNotificationAudience>('all');
  const [dateFilter, setDateFilter] = useState<(typeof adminNotificationDateFilters)[number]['id']>('all');
  const [selectedNotificationId, setSelectedNotificationId] = useState(adminManagedNotifications[0]?.id ?? '');

  const filteredNotifications = useMemo(() => {
    return adminManagedNotifications.filter((notification) => {
      const typeMatch = typeFilter === 'all' ? true : notification.type === typeFilter;
      const statusMatch = statusFilter === 'all' ? true : notification.status === statusFilter;
      const eventMatch =
        eventFilter === 'all'
          ? true
          : eventFilter === 'football'
            ? notification.event.toLowerCase().includes('зенит') || notification.event.toLowerCase().includes('спартак')
            : eventFilter === 'mma'
              ? notification.event.toLowerCase().includes('ufc')
              : eventFilter === 'basketball'
                ? notification.event.toLowerCase().includes('lakers') || notification.event.toLowerCase().includes('detroit')
                : eventFilter === 'formula1'
                  ? notification.event.toLowerCase().includes('гран-при')
                  : notification.status === 'sent';
      const audienceMatch = audienceFilter === 'all' ? true : notification.audience === audienceFilter;
      const dateMatch =
        dateFilter === 'all'
          ? true
          : dateFilter === 'today'
            ? notification.scheduledAt.toLowerCase().includes('сегодня')
            : dateFilter === 'week'
              ? !notification.scheduledAt.toLowerCase().includes('черновик')
              : true;

      return typeMatch && statusMatch && eventMatch && audienceMatch && dateMatch;
    });
  }, [audienceFilter, dateFilter, eventFilter, statusFilter, typeFilter]);

  useEffect(() => {
    if (!filteredNotifications.some((notification) => notification.id === selectedNotificationId)) {
      setSelectedNotificationId(filteredNotifications[0]?.id ?? '');
    }
  }, [filteredNotifications, selectedNotificationId]);

  const selectedNotification =
    filteredNotifications.find((notification) => notification.id === selectedNotificationId) ??
    filteredNotifications[0] ??
    adminManagedNotifications[0];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminNotificationsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={typeFilter} onChange={(value) => setTypeFilter(value as 'all' | AdminNotificationType)} options={adminNotificationTypeFilters} />
          <FilterSelect value={statusFilter} onChange={(value) => setStatusFilter(value as 'all' | AdminNotificationStatus)} options={adminNotificationStatusFilters} />
          <FilterSelect value={eventFilter} onChange={(value) => setEventFilter(value as (typeof adminNotificationEventFilters)[number]['id'])} options={adminNotificationEventFilters} minWidth="min-w-[11rem]" />
          <FilterSelect value={audienceFilter} onChange={(value) => setAudienceFilter(value as 'all' | AdminNotificationAudience)} options={adminNotificationAudienceFilters} minWidth="min-w-[12.5rem]" />
          <FilterSelect value={dateFilter} onChange={(value) => setDateFilter(value as (typeof adminNotificationDateFilters)[number]['id'])} options={adminNotificationDateFilters} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Лента уведомлений</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор отправок, сегментов, связанных событий и шаблонов.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              <SearchIcon />
              {filteredNotifications.length} в списке
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1080px]">
              <div className="grid grid-cols-[minmax(16rem,1.45fr)_8rem_12rem_minmax(13rem,1.2fr)_8rem_9rem_9rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Название уведомления</span>
                <span>Тип</span>
                <span>Аудитория</span>
                <span>Связанное событие</span>
                <span>Статус</span>
                <span>Время отправки</span>
                <span>Delivery / Open</span>
              </div>

              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const active = notification.id === selectedNotification?.id;

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => setSelectedNotificationId(notification.id)}
                      className={cn(
                        'grid w-full grid-cols-[minmax(16rem,1.45fr)_8rem_12rem_minmax(13rem,1.2fr)_8rem_9rem_9rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{notification.name}</p>
                        <p className="mt-1 truncate text-[0.84rem] text-slate-500">{notification.summary}</p>
                      </div>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getTypeTone(notification.type))}>
                        {getTypeLabel(notification.type)}
                      </span>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-800">{notification.audienceLabel}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{notification.template}</p>
                      </div>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-800">{notification.event}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{notification.message}</p>
                      </div>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(notification.status))}>
                        {getStatusLabel(notification.status)}
                      </span>

                      <p className="text-[0.88rem] text-slate-500">{notification.scheduledAt}</p>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-900">{notification.delivered}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{notification.openRate}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedNotification ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[1.32rem] font-semibold tracking-tight text-slate-900">{selectedNotification.name}</p>
                  <div className="mt-2 inline-flex items-center gap-2 text-[0.9rem] text-slate-500">
                    <span>{getTypeLabel(selectedNotification.type)}</span>
                    <span>·</span>
                    <span>{selectedNotification.audienceLabel}</span>
                  </div>
                </div>
                <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(selectedNotification.status))}>
                  {getStatusLabel(selectedNotification.status)}
                </span>
              </div>

              <p className="mt-4 text-[0.95rem] leading-6 text-slate-600">{selectedNotification.summary}</p>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Текст сообщения</p>
                <p className="mt-3 text-[0.94rem] leading-6 text-slate-700">{selectedNotification.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Delivery" value={selectedNotification.delivered} />
                <MetricCard label="Open rate" value={selectedNotification.openRate} />
              </div>

              <DetailRow label="Тип" value={getTypeLabel(selectedNotification.type)} />
              <DetailRow label="Сегмент" value={selectedNotification.audienceLabel} />
              <DetailRow label="Связанное событие" value={selectedNotification.event} />
              <DetailRow label="Время отправки" value={selectedNotification.scheduledAt} />
              <DetailRow label="Шаблон" value={selectedNotification.template} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Детали ошибок</p>
                  <p className="mt-3 text-[0.92rem] leading-6 text-slate-700">{selectedNotification.errorDetails}</p>
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Последние действия</p>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedNotification.logs.map((log) => (
                    <div key={log.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.9rem] font-medium leading-5 text-slate-800">{log.title}</p>
                        <span className="shrink-0 text-[0.8rem] text-slate-500">{log.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="col-span-2 flex items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Дублировать
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[16px] bg-[#eef5ff] px-4 py-3.5 text-[0.95rem] font-semibold text-[#2f78d3] ring-1 ring-[#dbe7fb]"
                >
                  Отправить
                </button>
                <button
                  type="button"
                  className="col-span-2 flex items-center justify-center rounded-[16px] bg-[#fff1ef] px-4 py-3.5 text-[0.95rem] font-semibold text-[#d25346] ring-1 ring-[#ffd7d1]"
                >
                  Остановить
                </button>
              </div>
            </div>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
