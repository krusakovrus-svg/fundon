'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminEventKpis,
  adminManagedEvents,
  adminSportFilters,
  adminStatusFilters,
  type AdminEventSport,
  type AdminEventSportFilter,
  type AdminEventStatus,
  type AdminManagedEvent,
  type AdminSupportState
} from '@/admin/data/events';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3.5V7" strokeLinecap="round" />
      <path d="M16 3.5V7" strokeLinecap="round" />
      <path d="M4 10h16" strokeLinecap="round" />
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

function LinkArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotIcon({ tone }: { tone: string }) {
  return <span className={cn('inline-flex h-2.5 w-2.5 rounded-full', tone)} />;
}

function getStatusTone(status: AdminEventStatus) {
  switch (status) {
    case 'live':
      return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
    case 'today':
      return 'bg-sky-100 text-sky-700 ring-1 ring-sky-200';
    case 'upcoming':
      return 'bg-violet-100 text-violet-700 ring-1 ring-violet-200';
    case 'finished':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'draft':
      return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
  }
}

function getStatusLabel(status: AdminEventStatus) {
  switch (status) {
    case 'live':
      return 'В эфире';
    case 'today':
      return 'Сегодня';
    case 'upcoming':
      return 'Скоро';
    case 'finished':
      return 'Завершено';
    case 'draft':
      return 'Черновик';
  }
}

function getSupportTone(support: AdminSupportState) {
  return support === 'enabled'
    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
    : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
}

function getSupportLabel(support: AdminSupportState) {
  return support === 'enabled' ? 'Включена' : 'Выключена';
}

function mapSportToFilter(sport: AdminEventSport): AdminEventSportFilter {
  switch (sport) {
    case 'Футбол':
      return 'football';
    case 'Хоккей':
      return 'hockey';
    case 'Теннис':
      return 'tennis';
    case 'MMA':
      return 'mma';
    case 'Баскетбол':
      return 'basketball';
    case 'Волейбол':
      return 'volleyball';
    case 'Киберспорт':
      return 'esports';
  }
}

function getSportDot(sport: AdminEventSport) {
  switch (sport) {
    case 'Футбол':
      return 'bg-emerald-500';
    case 'Хоккей':
      return 'bg-sky-500';
    case 'Теннис':
      return 'bg-lime-500';
    case 'MMA':
      return 'bg-rose-500';
    case 'Баскетбол':
      return 'bg-orange-500';
    case 'Волейбол':
      return 'bg-amber-500';
    case 'Киберспорт':
      return 'bg-indigo-500';
  }
}

type EventActionId = 'open' | 'edit' | 'finish' | 'publish' | 'archive' | 'launch-live';

function getRowActions(event: AdminManagedEvent): Array<{
  id: EventActionId;
  label: string;
  tone: 'primary' | 'default' | 'danger';
}> {
  if (event.status === 'live') {
    return [
      { id: 'open', label: 'Открыть', tone: 'primary' },
      { id: 'edit', label: 'Редактировать', tone: 'default' },
      { id: 'finish', label: 'Завершить', tone: 'danger' }
    ];
  }

  if (event.status === 'draft') {
    return [
      { id: 'open', label: 'Открыть', tone: 'primary' },
      { id: 'edit', label: 'Редактировать', tone: 'default' },
      { id: 'publish', label: 'Опубликовать', tone: 'default' }
    ];
  }

  if (event.status === 'finished') {
    return [
      { id: 'open', label: 'Открыть', tone: 'primary' },
      { id: 'edit', label: 'Редактировать', tone: 'default' },
      { id: 'archive', label: 'Архив', tone: 'default' }
    ];
  }

  return [
    { id: 'open', label: 'Открыть', tone: 'primary' },
    { id: 'edit', label: 'Редактировать', tone: 'default' },
    { id: 'launch-live', label: 'Запустить live', tone: 'default' }
  ];
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
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', accent)}>{delta ?? '—'}</span>
      </div>
    </div>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-[14px] border border-black/[0.05] bg-white px-3.5 py-2.5 text-[0.88rem] font-medium text-slate-600 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
    >
      <CalendarIcon />
      <span>{label}</span>
      <ChevronDownIcon />
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[0.96rem] font-medium text-slate-800">{value}</p>
    </div>
  );
}

export function AdminEventsScreen() {
  const [managedEvents, setManagedEvents] = useState(adminManagedEvents);
  const [statusFilter, setStatusFilter] = useState<(typeof adminStatusFilters)[number]['id']>('all');
  const [sportFilter, setSportFilter] = useState<AdminEventSportFilter>('all');
  const [selectedEventId, setSelectedEventId] = useState(adminManagedEvents[0]?.id ?? '');
  const [confirmState, setConfirmState] = useState<{
    title: string;
    description: string;
    confirmLabel: string;
    tone: 'primary' | 'danger';
    badge: string;
    details: AdminConfirmDialogDetail[];
    footnote: string;
    onConfirm: () => void;
  } | null>(null);

  const filteredEvents = useMemo(() => {
    return managedEvents.filter((event) => {
      const statusMatch =
        statusFilter === 'all'
          ? true
          : statusFilter === 'drafts'
            ? event.status === 'draft'
            : event.status === statusFilter;

      const sportMatch = sportFilter === 'all' ? true : mapSportToFilter(event.sport) === sportFilter;

      return statusMatch && sportMatch;
    });
  }, [managedEvents, sportFilter, statusFilter]);

  useEffect(() => {
    if (!filteredEvents.some((event) => event.id === selectedEventId)) {
      setSelectedEventId(filteredEvents[0]?.id ?? '');
    }
  }, [filteredEvents, selectedEventId]);

  const selectedEvent = filteredEvents.find((event) => event.id === selectedEventId) ?? filteredEvents[0] ?? managedEvents[0];

  const updateEvent = (eventId: string, updater: (event: AdminManagedEvent) => AdminManagedEvent) => {
    setManagedEvents((current) => current.map((event) => (event.id === eventId ? updater(event) : event)));
  };

  const openEventConfirmation = (
    event: AdminManagedEvent,
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
    setSelectedEventId(event.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Событие', value: event.title },
        { label: 'Статус', value: getStatusLabel(event.status) },
        { label: 'Поддержка', value: getSupportLabel(event.support) },
        { label: 'Комната', value: event.room }
      ]
    });
  };

  const handleEventAction = (event: AdminManagedEvent, actionId: EventActionId) => {
    if (actionId === 'open' || actionId === 'edit') {
      setSelectedEventId(event.id);
      return;
    }

    if (actionId === 'launch-live') {
      openEventConfirmation(event, {
        title: 'Запустить событие в live',
        description: 'Событие перейдёт в live-режим, room станет активной, а поддержка откроется для пользователей.',
        confirmLabel: 'Запустить live',
        tone: 'primary',
        badge: 'Подтверждение live',
        footnote: 'Действие будет записано в audit trail как запуск live-события.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'live',
            support: 'enabled',
            activity: 'Live запущен',
            donations: current.donations === '—' ? '₽0' : current.donations,
            audience: 'Комната активна · идёт эфир',
            notifications: 'Push и room-оповещения активированы'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (actionId === 'finish') {
      openEventConfirmation(event, {
        title: 'Завершить событие',
        description: 'Событие будет закрыто для live-поддержки, а комната перейдёт в post-live режим.',
        confirmLabel: 'Завершить',
        tone: 'danger',
        badge: 'Критичное действие',
        footnote: 'Завершение live-события обязательно логируется и влияет на room и payment flow.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'finished',
            support: 'disabled',
            activity: 'Эфир завершён',
            audience: 'Итоговая статистика сохранена',
            notifications: 'Итоговое уведомление отправлено'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (actionId === 'publish') {
      openEventConfirmation(event, {
        title: 'Опубликовать событие',
        description: 'Черновик станет доступен в операционном контуре, room и уведомления будут подготовлены к запуску.',
        confirmLabel: 'Опубликовать',
        tone: 'primary',
        badge: 'Публикация',
        footnote: 'Публикация создаст audit trail запись и переведёт событие в ближайший operational pipeline.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'upcoming',
            room: current.room === '—' ? 'Новая room подготовлена' : current.room,
            audience: 'Событие появилось в планировании',
            notifications: 'Подготовлены push и room-оповещения'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (actionId === 'archive') {
      openEventConfirmation(event, {
        title: 'Отправить событие в архив',
        description: 'Карточка останется в журнале, но будет снята с операционного обзора и активной поддержки.',
        confirmLabel: 'Архивировать',
        tone: 'danger',
        badge: 'Архив',
        footnote: 'Архивирование влияет на доступность карточки и логируется как административное действие.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            support: 'disabled',
            room: 'Архив',
            audience: 'Скрыто из оперативного списка',
            notifications: 'Архивировано'
          }));
          setConfirmState(null);
        }
      });
    }
  };

  const handleToggleSupport = (event: AdminManagedEvent) => {
    const enable = event.support === 'disabled';

    openEventConfirmation(event, {
      title: enable ? 'Включить поддержку' : 'Отключить поддержку',
      description: enable
        ? 'Поддержка станет доступна пользователям, а связанная room будет готова к приёму донатов.'
        : 'Поддержка будет выключена для новых донатов, но история события и room останутся доступными.',
      confirmLabel: enable ? 'Включить' : 'Отключить',
      tone: enable ? 'primary' : 'danger',
      badge: enable ? 'Поддержка' : 'Критичное действие',
      footnote: 'Изменение состояния поддержки записывается в audit trail и влияет на live-донаты.',
      onConfirm: () => {
        updateEvent(event.id, (current) => ({
          ...current,
          support: enable ? 'enabled' : 'disabled',
          notifications: enable ? 'Поддержка и room-оповещения активированы' : 'Поддержка отключена, room работает в режиме чтения'
        }));
        setConfirmState(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-5 gap-4">
        {adminEventKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} delta={kpi.delta} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-[16px] border border-black/[0.05] bg-[#f4f7fb] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {adminStatusFilters.map((filter) => {
              const active = filter.id === statusFilter;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setStatusFilter(filter.id)}
                  className={cn(
                    'rounded-[12px] px-4 py-2.5 text-[0.92rem] font-semibold transition',
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

          <div className="flex flex-wrap items-center gap-2.5">
            <FilterButton label="Дата" />
            <FilterButton label="Турнир" />
            <FilterButton label="Участник" />
            <FilterButton label="Комната" />
            <FilterButton label="Поддержка: все" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {adminSportFilters.map((filter) => {
            const active = filter.id === sportFilter;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSportFilter(filter.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition',
                  active ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]' : 'bg-[#f7f8fb] text-slate-600 hover:bg-white'
                )}
              >
                <DotIcon tone={active ? 'bg-[#4f8ff6]' : 'bg-slate-300'} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Список событий</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор всех upcoming, live, finished и draft-событий</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              <SearchIcon />
              {filteredEvents.length} найдено
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1110px]">
              <div className="grid grid-cols-[minmax(18rem,1.6fr)_8rem_minmax(15rem,1.3fr)_9rem_8rem_8rem_10rem_9rem_14rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Событие</span>
                <span>Вид спорта</span>
                <span>Участники</span>
                <span>Дата и время</span>
                <span>Статус</span>
                <span>Поддержка</span>
                <span>Комната</span>
                <span>Активность</span>
                <span>Quick actions</span>
              </div>

              <div className="space-y-3">
                {filteredEvents.map((event) => {
                  const active = event.id === selectedEvent?.id;

                  return (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(keyboardEvent) => {
                        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                          keyboardEvent.preventDefault();
                          setSelectedEventId(event.id);
                        }
                      }}
                      className={cn(
                        'grid w-full grid-cols-[minmax(18rem,1.6fr)_8rem_minmax(15rem,1.3fr)_9rem_8rem_8rem_10rem_9rem_14rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <DotIcon tone={getSportDot(event.sport)} />
                          <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{event.title}</p>
                        </div>
                        <p className="mt-1 truncate text-[0.88rem] text-slate-500">{event.tournament}</p>
                      </div>

                      <p className="text-[0.94rem] font-medium text-slate-700">{event.sport}</p>

                      <div className="min-w-0">
                        <p className="truncate text-[0.94rem] font-medium text-slate-800">{event.participants[0]}</p>
                        <p className="truncate text-[0.88rem] text-slate-500">{event.participants[1]}</p>
                      </div>

                      <p className="text-[0.88rem] leading-relaxed text-slate-600">{event.startsAt}</p>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(event.status))}>
                        {getStatusLabel(event.status)}
                      </span>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getSupportTone(event.support))}>
                        {getSupportLabel(event.support)}
                      </span>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-800">{event.room}</p>
                        <p className="mt-1 text-[0.8rem] text-slate-500">{event.audience}</p>
                      </div>

                      <div>
                        <p className="text-[0.94rem] font-semibold text-slate-900">{event.activity}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{event.donations}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        {getRowActions(event).map((action) => (
                          <span
                            key={action.id}
                            role="button"
                            tabIndex={0}
                            onClick={(mouseEvent) => {
                              mouseEvent.stopPropagation();
                              handleEventAction(event, action.id);
                            }}
                            onKeyDown={(keyboardEvent) => {
                              if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                                keyboardEvent.preventDefault();
                                keyboardEvent.stopPropagation();
                                handleEventAction(event, action.id);
                              }
                            }}
                            className={cn(
                              'inline-flex cursor-pointer rounded-[12px] px-3 py-2 text-[0.82rem] font-semibold',
                              action.tone === 'primary'
                                ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
                                : action.tone === 'danger'
                                  ? 'bg-[#fff1ef] text-[#d25346] ring-1 ring-[#ffd7d1]'
                                  : 'bg-white text-slate-600 ring-1 ring-black/[0.06]'
                            )}
                          >
                            {action.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedEvent ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.045] px-5 py-5">
              <div>
                <p className="text-[1.3rem] font-semibold tracking-tight text-slate-900">{selectedEvent.title}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-[0.92rem] text-slate-500">
                  <DotIcon tone={getSportDot(selectedEvent.sport)} />
                  <span>{selectedEvent.sport}</span>
                  <span>•</span>
                  <span>{getStatusLabel(selectedEvent.status)}</span>
                </div>
              </div>
              <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500">
                <LinkArrowIcon />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <DetailRow label="Дата и время" value={selectedEvent.startsAt} />
              <DetailRow label="Турнир" value={selectedEvent.tournament} />
              <DetailRow label="Участники" value={selectedEvent.participants.join(' vs ')} />
              <DetailRow label="Поддержка" value={`${getSupportLabel(selectedEvent.support)} · ${selectedEvent.donations}`} />
              <DetailRow label="Комната" value={selectedEvent.room} />
              <DetailRow label="Уведомления" value={selectedEvent.notifications} />
              <DetailRow label="Ответственный" value={selectedEvent.moderator} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Последние донаты</p>
                    <p className="mt-1 text-sm text-slate-500">Быстрый обзор активности поддержки</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedEvent.donationsFeed.length ? (
                    selectedEvent.donationsFeed.map((donation) => (
                      <div key={donation.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.92rem] font-semibold text-slate-900">{donation.user}</p>
                          <p className="text-[0.9rem] font-semibold text-slate-900">{donation.amount}</p>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-3 text-[0.82rem] text-slate-500">
                          <span>{donation.side}</span>
                          <span>{donation.at}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-4 text-[0.88rem] text-slate-500">
                      Донатов пока нет. Событие можно подготовить и включить поддержку позже.
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedEventId(selectedEvent.id)}
                  className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Открыть событие
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEventId(selectedEvent.id)}
                  className="flex w-full items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => handleEventAction(selectedEvent, selectedEvent.status === 'live' ? 'finish' : selectedEvent.status === 'draft' ? 'publish' : 'launch-live')}
                  className={cn(
                    'flex w-full items-center justify-center rounded-[16px] px-4 py-3.5 text-[0.95rem] font-semibold',
                    selectedEvent.status === 'live'
                      ? 'bg-[#fff1ef] text-[#d25346] ring-1 ring-[#ffd7d1]'
                      : 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
                  )}
                >
                  {selectedEvent.status === 'live' ? 'Завершить событие' : selectedEvent.status === 'draft' ? 'Опубликовать событие' : 'Запустить live'}
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleSupport(selectedEvent)}
                  className="flex w-full items-center justify-center rounded-[16px] bg-[#f7f8fb] px-4 py-3.5 text-[0.95rem] font-semibold text-slate-600"
                >
                  {selectedEvent.support === 'enabled' ? 'Отключить поддержку' : 'Включить поддержку'}
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
