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
      return 'Watch room';
    case 'fan':
      return 'Фан-комната';
    case 'vip':
      return 'VIP';
    case 'support':
      return 'Support';
  }
}

function getTypeTone(type: AdminRoomType) {
  switch (type) {
    case 'watch':
      return 'bg-[#eef5ff] text-[#2f78d3]';
    case 'fan':
      return 'bg-emerald-50 text-emerald-700';
    case 'vip':
      return 'bg-amber-50 text-amber-700';
    case 'support':
      return 'bg-violet-50 text-violet-700';
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

function InfoRow({ label, value }: { label: string; value: string }) {
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

export function AdminRoomsScreen() {
  const [statusFilter, setStatusFilter] = useState<(typeof adminRoomStatusFilters)[number]['id']>('all');
  const [eventFilter, setEventFilter] = useState<(typeof adminRoomEventFilters)[number]['id']>('all');
  const [typeFilter, setTypeFilter] = useState<(typeof adminRoomTypeFilters)[number]['id']>('all');
  const [participantFilter, setParticipantFilter] = useState<(typeof adminRoomParticipantFilters)[number]['id']>('all');
  const [activityFilter, setActivityFilter] = useState<(typeof adminRoomActivityFilters)[number]['id']>('all');
  const [moderationFilter, setModerationFilter] = useState<(typeof adminRoomModerationFilters)[number]['id']>('all');
  const [selectedRoomId, setSelectedRoomId] = useState(adminManagedRooms[0]?.id ?? '');

  const filteredRooms = useMemo(() => {
    return adminManagedRooms.filter((room) => {
      const statusMatch = statusFilter === 'all' ? true : room.status === statusFilter;
      const eventMatch =
        eventFilter === 'all'
          ? true
          : eventFilter === 'live'
            ? room.linkedEventStatus.toLowerCase().includes('live')
            : eventFilter === 'football'
              ? room.linkedEventStatus.toLowerCase().includes('футбол')
              : eventFilter === 'mma'
                ? room.linkedEventStatus.toLowerCase().includes('mma')
                : room.linkedEventStatus.toLowerCase().includes('баскетбол');
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
  }, [activityFilter, eventFilter, moderationFilter, participantFilter, statusFilter, typeFilter]);

  useEffect(() => {
    if (!filteredRooms.some((room) => room.id === selectedRoomId)) {
      setSelectedRoomId(filteredRooms[0]?.id ?? '');
    }
  }, [filteredRooms, selectedRoomId]);

  const selectedRoom = filteredRooms.find((room) => room.id === selectedRoomId) ?? filteredRooms[0] ?? adminManagedRooms[0];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        {adminRoomsKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={statusFilter} onChange={(value) => setStatusFilter(value as (typeof adminRoomStatusFilters)[number]['id'])} options={adminRoomStatusFilters} />
          <FilterSelect value={eventFilter} onChange={(value) => setEventFilter(value as (typeof adminRoomEventFilters)[number]['id'])} options={adminRoomEventFilters} minWidth="min-w-[11.5rem]" />
          <FilterSelect value={typeFilter} onChange={(value) => setTypeFilter(value as (typeof adminRoomTypeFilters)[number]['id'])} options={adminRoomTypeFilters} />
          <FilterSelect value={participantFilter} onChange={(value) => setParticipantFilter(value as (typeof adminRoomParticipantFilters)[number]['id'])} options={adminRoomParticipantFilters} minWidth="min-w-[12rem]" />
          <FilterSelect value={activityFilter} onChange={(value) => setActivityFilter(value as (typeof adminRoomActivityFilters)[number]['id'])} options={adminRoomActivityFilters} />
          <FilterSelect value={moderationFilter} onChange={(value) => setModerationFilter(value as (typeof adminRoomModerationFilters)[number]['id'])} options={adminRoomModerationFilters} minWidth="min-w-[13rem]" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Комнаты поддержки</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор комнат, активности участников и состояния модерации.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              <SearchIcon />
              {filteredRooms.length} в списке
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1040px]">
              <div className="grid grid-cols-[minmax(15rem,1.45fr)_minmax(12rem,1.2fr)_7rem_8rem_8rem_7rem_8rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Название комнаты</span>
                <span>Событие</span>
                <span>Участники</span>
                <span>Активность</span>
                <span>Статус</span>
                <span>Жалобы</span>
                <span>Дата создания</span>
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
                        'grid w-full grid-cols-[minmax(15rem,1.45fr)_minmax(12rem,1.2fr)_7rem_8rem_8rem_7rem_8rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{room.name}</p>
                          <span className={cn('rounded-full px-2 py-0.5 text-[0.72rem] font-semibold', getTypeTone(room.type))}>
                            {getTypeLabel(room.type)}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-[0.84rem] text-slate-500">{room.summary}</p>
                      </div>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-800">{room.event}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{room.linkedEventStatus}</p>
                      </div>

                      <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{room.participants}</p>

                      <span className={cn('inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getActivityTone(room.activity))}>
                        <DotIcon
                          tone={
                            room.activity === 'high'
                              ? 'bg-rose-500'
                              : room.activity === 'medium'
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                          }
                        />
                        {getActivityLabel(room.activity)}
                      </span>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(room.status))}>
                        {getStatusLabel(room.status)}
                      </span>

                      <p className={cn('text-[0.96rem] font-semibold', room.complaints > 0 ? 'text-slate-900' : 'text-slate-400')}>
                        {room.complaints}
                      </p>

                      <p className="text-[0.88rem] text-slate-500">{room.createdAt}</p>
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
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[1.32rem] font-semibold tracking-tight text-slate-900">{selectedRoom.name}</p>
                  <div className="mt-2 inline-flex items-center gap-2 text-[0.9rem] text-slate-500">
                    <span>{selectedRoom.event}</span>
                    <span>·</span>
                    <span>{selectedRoom.linkedEventStatus}</span>
                  </div>
                </div>
                <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold', getStatusTone(selectedRoom.status))}>
                  {getStatusLabel(selectedRoom.status)}
                </span>
              </div>

              <p className="mt-4 text-[0.95rem] leading-6 text-slate-600">{selectedRoom.summary}</p>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Участники" value={String(selectedRoom.participants)} />
                <MetricCard label="Активность" value={getActivityLabel(selectedRoom.activity)} />
                <MetricCard label="Жалобы" value={String(selectedRoom.complaints)} />
              </div>

              <InfoRow label="Событие" value={selectedRoom.event} />
              <InfoRow label="Статус комнаты" value={getStatusLabel(selectedRoom.status)} />
              <InfoRow label="Модератор" value={selectedRoom.moderator} />

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Заметки модератора</p>
                  <p className="mt-1 text-sm text-slate-500">Текущие сигналы и действия по комнате.</p>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedRoom.notes.map((note) => (
                    <div key={note.id} className="rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.9rem] font-medium leading-5 text-slate-800">{note.text}</p>
                        <span className="shrink-0 text-[0.8rem] text-slate-500">{note.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  Ограничить
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-[16px] bg-[#f7f8fb] px-4 py-3.5 text-[0.95rem] font-semibold text-slate-600"
                >
                  Архивировать
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-[16px] bg-[#fff1ef] px-4 py-3.5 text-[0.95rem] font-semibold text-[#d25346] ring-1 ring-[#ffd7d1]"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
                >
                  История
                </button>
              </div>
            </div>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
