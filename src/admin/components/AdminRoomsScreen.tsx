'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminManagedRooms,
  adminRoomActivityFilters,
  adminRoomEventFilters,
  adminRoomModerationFilters,
  adminRoomParticipantFilters,
  adminRoomStatusFilters,
  adminRoomTypeFilters,
  adminRoomsKpis,
  type AdminManagedRoom,
  type AdminRoomActivity,
  type AdminRoomStatus,
  type AdminRoomType
} from '@/admin/data/rooms';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function formatWithSpaces(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[\u00a0\u202f]/g, ' ');
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

function DotIcon({ tone }: { tone: string }) {
  return <span className={cn('inline-flex h-2.5 w-2.5 rounded-full', tone)} />;
}

function getStatusTone(status: AdminRoomStatus) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'limited':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'closed':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'archived':
      return 'bg-violet-50 text-violet-700 ring-1 ring-violet-200';
  }
}

function getStatusLabel(status: AdminRoomStatus) {
  switch (status) {
    case 'active':
      return 'Активна';
    case 'limited':
      return 'Ограничена';
    case 'closed':
      return 'Закрыта';
    case 'archived':
      return 'Архивная';
  }
}

function getActivityTone(activity: AdminRoomActivity) {
  switch (activity) {
    case 'high':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'medium':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'low':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getActivityDot(activity: AdminRoomActivity) {
  switch (activity) {
    case 'high':
      return 'bg-rose-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-slate-400';
  }
}

function getActivityLabel(activity: AdminRoomActivity) {
  switch (activity) {
    case 'high':
      return 'Высокая';
    case 'medium':
      return 'Средняя';
    case 'low':
      return 'Низкая';
  }
}

function getTypeLabel(type: AdminRoomType) {
  switch (type) {
    case 'watch':
      return 'Комната просмотра';
    case 'fan':
      return 'Фан-комната';
    case 'vip':
      return 'VIP-комната';
    case 'support':
      return 'Комната поддержки';
  }
}

function getTypeTone(type: AdminRoomType) {
  switch (type) {
    case 'watch':
      return 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]';
    case 'fan':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'vip':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'support':
      return 'bg-violet-50 text-violet-700 ring-1 ring-violet-200';
  }
}

function getKpiBadgeTone(tone: 'blue' | 'green' | 'orange' | 'slate') {
  switch (tone) {
    case 'blue':
      return 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]';
    case 'green':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'orange':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'slate':
    default:
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function KpiCard({
  label,
  value,
  hint,
  tone
}: {
  label: string;
  value: number;
  hint: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}) {
  return (
    <article className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{formatWithSpaces(value)}</p>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <p className="mt-1 truncate text-[0.92rem] font-medium text-slate-800">{value}</p>
      </div>
      <span className="text-slate-400">
        <ChevronRightIcon />
      </span>
    </div>
  );
}

function MetricCard({
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

function toArchiveEventMeta(room: AdminManagedRoom) {
  const parts = room.eventMeta.split('·');
  const suffix = parts[1]?.trim() ?? room.eventMeta;
  return `Архив · ${suffix}`;
}

type RoomActionId = 'limit' | 'archive' | 'close';

export function AdminRoomsScreen() {
  const [managedRooms, setManagedRooms] = useState(adminManagedRooms);
  const [statusFilter, setStatusFilter] = useState<(typeof adminRoomStatusFilters)[number]['id']>('all');
  const [eventFilter, setEventFilter] = useState<(typeof adminRoomEventFilters)[number]['id']>('all');
  const [typeFilter, setTypeFilter] = useState<(typeof adminRoomTypeFilters)[number]['id']>('all');
  const [participantFilter, setParticipantFilter] = useState<(typeof adminRoomParticipantFilters)[number]['id']>('all');
  const [activityFilter, setActivityFilter] = useState<(typeof adminRoomActivityFilters)[number]['id']>('all');
  const [moderationFilter, setModerationFilter] = useState<(typeof adminRoomModerationFilters)[number]['id']>('all');
  const [selectedRoomId, setSelectedRoomId] = useState(adminManagedRooms[0]?.id ?? '');
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

  const filteredRooms = useMemo(() => {
    return managedRooms.filter((room) => {
      const statusMatch = statusFilter === 'all' ? true : room.status === statusFilter;
      const eventMatch = eventFilter === 'all' ? true : room.eventState === eventFilter;
      const typeMatch = typeFilter === 'all' ? true : room.type === typeFilter;
      const participantMatch =
        participantFilter === 'all'
          ? true
          : participantFilter === 'small'
            ? room.participants < 100
            : participantFilter === 'medium'
              ? room.participants >= 100 && room.participants <= 250
              : room.participants > 250;
      const activityMatch = activityFilter === 'all' ? true : room.activity === activityFilter;
      const moderationMatch =
        moderationFilter === 'all'
          ? true
          : moderationFilter === 'clean'
            ? room.complaints === 0
            : moderationFilter === 'review'
              ? room.complaints >= 1 && room.complaints <= 2
              : room.complaints >= 3;

      return statusMatch && eventMatch && typeMatch && participantMatch && activityMatch && moderationMatch;
    });
  }, [activityFilter, eventFilter, managedRooms, moderationFilter, participantFilter, statusFilter, typeFilter]);

  useEffect(() => {
    if (!filteredRooms.some((room) => room.id === selectedRoomId)) {
      setSelectedRoomId(filteredRooms[0]?.id ?? '');
    }
  }, [filteredRooms, selectedRoomId]);

  const selectedRoom = filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0] ?? managedRooms[0];

  const updateRoom = (roomId: string, updater: (room: AdminManagedRoom) => AdminManagedRoom) => {
    setManagedRooms((current) => current.map((room) => (room.id === roomId ? updater(room) : room)));
  };

  const openRoomConfirmation = (
    room: AdminManagedRoom,
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
    setSelectedRoomId(room.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Комната', value: room.name },
        { label: 'Событие', value: room.event },
        { label: 'Статус', value: getStatusLabel(room.status) },
        { label: 'Жалобы', value: formatWithSpaces(room.complaints) }
      ]
    });
  };

  const handleRoomAction = (room: AdminManagedRoom, action: RoomActionId) => {
    if (action === 'limit') {
      openRoomConfirmation(room, {
        title: 'Ограничить комнату',
        description: 'Комната перейдёт в ограниченный режим: новые сообщения и часть реакций будут доступны только после модерации.',
        confirmLabel: 'Ограничить',
        tone: 'primary',
        badge: 'Ограничение',
        footnote: 'Ограничение комнаты фиксируется в журнале действий и влияет на поток новых сообщений.',
        onConfirm: () => {
          updateRoom(room.id, (current) => ({
            ...current,
            status: 'limited',
            complaintSummary: current.complaints > 0 ? 'Требует ручного контроля' : 'Ограничена вручную',
            notes: [{ id: `${current.id}-limit`, text: 'Комната переведена в ограниченный режим.', at: 'Сейчас' }, ...current.notes]
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (action === 'archive') {
      openRoomConfirmation(room, {
        title: 'Архивировать комнату',
        description: 'Комната останется доступной команде, но будет снята с операционного обзора и переведена в архив.',
        confirmLabel: 'Архивировать',
        tone: 'danger',
        badge: 'Архив',
        footnote: 'Архивирование комнаты фиксируется в журнале действий и убирает её из активного оборота.',
        onConfirm: () => {
          updateRoom(room.id, (current) => ({
            ...current,
            status: 'archived',
            eventState: 'archive',
            eventMeta: toArchiveEventMeta(current),
            activity: 'low',
            activitySummary: 'Архивный режим',
            complaintSummary: current.complaints > 0 ? 'Сохранена история жалоб' : 'Архив без активных сигналов',
            notes: [{ id: `${current.id}-archive`, text: 'Комната переведена в архив.', at: 'Сейчас' }, ...current.notes]
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    openRoomConfirmation(room, {
      title: 'Закрыть комнату',
      description: 'Комната будет закрыта для новых сообщений и поддержки до повторного открытия командой.',
      confirmLabel: 'Закрыть',
      tone: 'danger',
      badge: 'Закрытие',
      footnote: 'Закрытие комнаты фиксируется в журнале действий и блокирует новый пользовательский поток.',
      onConfirm: () => {
        updateRoom(room.id, (current) => ({
          ...current,
          status: 'closed',
          activity: 'low',
          activitySummary: 'Закрыта для новых сообщений',
          complaintSummary: current.complaints > 0 ? 'Закрыта после сигналов' : 'Закрыта вручную без эскалации',
          notes: [{ id: `${current.id}-close`, text: 'Комната закрыта вручную.', at: 'Сейчас' }, ...current.notes]
        }));
        setConfirmState(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminRoomsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterField label="Статус" value={statusFilter} onChange={(value) => setStatusFilter(value as (typeof adminRoomStatusFilters)[number]['id'])} options={adminRoomStatusFilters} />
          <FilterField
            label="Событие"
            value={eventFilter}
            onChange={(value) => setEventFilter(value as (typeof adminRoomEventFilters)[number]['id'])}
            options={adminRoomEventFilters}
            className="min-w-[12rem]"
          />
          <FilterField label="Тип комнаты" value={typeFilter} onChange={(value) => setTypeFilter(value as (typeof adminRoomTypeFilters)[number]['id'])} options={adminRoomTypeFilters} className="min-w-[12rem]" />
          <FilterField
            label="Участники"
            value={participantFilter}
            onChange={(value) => setParticipantFilter(value as (typeof adminRoomParticipantFilters)[number]['id'])}
            options={adminRoomParticipantFilters}
            className="min-w-[12rem]"
          />
          <FilterField
            label="Активность"
            value={activityFilter}
            onChange={(value) => setActivityFilter(value as (typeof adminRoomActivityFilters)[number]['id'])}
            options={adminRoomActivityFilters}
          />
          <FilterField
            label="Жалобы"
            value={moderationFilter}
            onChange={(value) => setModerationFilter(value as (typeof adminRoomModerationFilters)[number]['id'])}
            options={adminRoomModerationFilters}
            className="min-w-[12rem]"
          />

          <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
            <SearchIcon />
            {filteredRooms.length} в списке
          </div>
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Комнаты поддержки</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор комнат, активности участников и состояния модерации.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              <SearchIcon />
              {filteredRooms.length} в обзоре
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[minmax(15rem,1.55fr)_minmax(12rem,1.15fr)_7rem_8rem_8rem_7rem_8rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Название комнаты</span>
                <span>Событие</span>
                <span>Участники</span>
                <span>Активность</span>
                <span>Статус</span>
                <span>Жалобы</span>
                <span>Создана</span>
              </div>

              <div className="space-y-3">
                {filteredRooms.map((room) => {
                  const active = room.id === selectedRoom?.id;

                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoomId(room.id)}
                      className={cn(
                        'grid w-full grid-cols-[minmax(15rem,1.55fr)_minmax(12rem,1.15fr)_7rem_8rem_8rem_7rem_8rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{room.name}</p>
                          <span className={cn('rounded-full px-2 py-0.5 text-[0.68rem] font-semibold', getTypeTone(room.type))}>{getTypeLabel(room.type)}</span>
                        </div>
                        <p className="mt-1 truncate text-[0.82rem] text-slate-500">{room.summary}</p>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[0.9rem] font-semibold text-slate-900">{room.event}</p>
                        <p className="mt-1 truncate text-[0.82rem] text-slate-500">{room.eventMeta}</p>
                      </div>

                      <div>
                        <p className="text-[0.98rem] font-semibold tracking-tight text-slate-900">{formatWithSpaces(room.participants)}</p>
                        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{room.participantNote}</p>
                      </div>

                      <span className={cn('inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getActivityTone(room.activity))}>
                        <DotIcon tone={getActivityDot(room.activity)} />
                        {getActivityLabel(room.activity)}
                      </span>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(room.status))}>
                        {getStatusLabel(room.status)}
                      </span>

                      <div>
                        <p className={cn('text-[0.96rem] font-semibold', room.complaints > 0 ? 'text-slate-900' : 'text-slate-400')}>{formatWithSpaces(room.complaints)}</p>
                        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{room.complaintSummary}</p>
                      </div>

                      <p className="text-[0.84rem] text-slate-500">{room.createdAt}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedRoom ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="rounded-[22px] border border-black/[0.04] bg-[linear-gradient(135deg,#fbfcfe_0%,#f2f5fb_100%)] p-4">
                <div className="rounded-[18px] border border-black/[0.04] bg-white/80 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn('rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getStatusTone(selectedRoom.status))}>{getStatusLabel(selectedRoom.status)}</span>
                        <span className={cn('rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getTypeTone(selectedRoom.type))}>{getTypeLabel(selectedRoom.type)}</span>
                      </div>
                      <p className="mt-3 text-[1.72rem] font-semibold tracking-tight text-slate-900">{selectedRoom.name}</p>
                      <p className="mt-1 text-[0.9rem] text-slate-600">{selectedRoom.event}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-[0.88rem] leading-6 text-slate-600">{selectedRoom.summary}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Участники" value={formatWithSpaces(selectedRoom.participants)} note={selectedRoom.participantNote} />
                <MetricCard label="Активность" value={getActivityLabel(selectedRoom.activity)} note={selectedRoom.activitySummary} />
                <MetricCard label="Жалобы" value={formatWithSpaces(selectedRoom.complaints)} note={selectedRoom.complaintSummary} />
              </div>

              <div className="space-y-3">
                <InfoRow label="Событие" value={`${selectedRoom.event} · ${selectedRoom.eventMeta}`} />
                <InfoRow label="Статус комнаты" value={getStatusLabel(selectedRoom.status)} />
                <InfoRow label="Модератор" value={`${selectedRoom.moderator} · ${selectedRoom.moderatorRole}`} />
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Заметки модератора</p>
                  <p className="mt-1 text-[0.82rem] text-slate-500">Ключевые сигналы и последние действия по комнате.</p>
                </div>

                <div className="mt-4 space-y-2.5">
                  {selectedRoom.notes.map((note) => (
                    <div key={note.id} className="rounded-[14px] bg-[#f8fafc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.86rem] font-medium leading-5 text-slate-800">{note.text}</p>
                        <span className="shrink-0 text-[0.76rem] text-slate-500">{note.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedRoomId(selectedRoom.id)}
                  className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Открыть
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoomAction(selectedRoom, 'limit')}
                    className="rounded-[16px] border border-[#f1ddcd] bg-[#fff7f2] px-4 py-3.5 text-[0.9rem] font-semibold text-[#a9693a]"
                  >
                    Ограничить
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoomAction(selectedRoom, 'archive')}
                    className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.9rem] font-semibold text-slate-700"
                  >
                    Архивировать
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoomAction(selectedRoom, 'close')}
                    className="rounded-[16px] bg-[#fff1ef] px-4 py-3.5 text-[0.9rem] font-semibold text-[#d25346] ring-1 ring-[#ffd7d1]"
                  >
                    Закрыть
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRoomId(selectedRoom.id)}
                    className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.9rem] font-semibold text-slate-700"
                  >
                    История
                  </button>
                </div>
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
