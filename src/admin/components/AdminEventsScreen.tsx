'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminDateFilters,
  adminEventKpis,
  adminManagedEvents,
  adminParticipantFilters,
  adminRoomFilters,
  adminSportFilters,
  adminStatusFilters,
  adminSupportFilters,
  adminTournamentFilters,
  type AdminEventDateFilter,
  type AdminEventParticipantFilter,
  type AdminEventRoomFilter,
  type AdminEventSport,
  type AdminEventSportFilter,
  type AdminEventStatus,
  type AdminEventStatusFilter,
  type AdminEventTournamentFilter,
  type AdminManagedEvent,
  type AdminSupportState
} from '@/admin/data/events';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function formatWithSpaces(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[\u00a0\u202f]/g, ' ');
}

function formatCurrency(value: number | null) {
  return value === null ? '—' : `${formatWithSpaces(value)} ₽`;
}

function formatDonationCount(value: number) {
  return value === 0 ? 'Без донатов' : `${formatWithSpaces(value)} донатов`;
}

function getAudienceLabel(event: AdminManagedEvent) {
  return event.audienceCount === null ? event.audienceNote : `${formatWithSpaces(event.audienceCount)} зрителей`;
}

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
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'today':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'upcoming':
      return 'bg-violet-50 text-violet-700 ring-1 ring-violet-200';
    case 'finished':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'archived':
      return 'bg-stone-100 text-stone-600 ring-1 ring-stone-200';
    case 'draft':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
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
    case 'archived':
      return 'В архиве';
    case 'draft':
      return 'Черновик';
  }
}

function getSupportTone(support: AdminSupportState) {
  switch (support) {
    case 'live':
      return 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]';
    case 'post-event':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'disabled':
      return 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
  }
}

function getSupportLabel(support: AdminSupportState) {
  switch (support) {
    case 'live':
      return 'Live-поддержка';
    case 'post-event':
      return 'Post-event';
    case 'disabled':
      return 'Отключена';
  }
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
      { id: 'archive', label: 'В архив', tone: 'default' }
    ];
  }

  if (event.status === 'archived') {
    return [
      { id: 'open', label: 'Открыть', tone: 'primary' },
      { id: 'edit', label: 'Редактировать', tone: 'default' },
      { id: 'archive', label: 'Скрыть', tone: 'danger' }
    ];
  }

  return [
    { id: 'open', label: 'Открыть', tone: 'primary' },
    { id: 'edit', label: 'Редактировать', tone: 'default' },
    { id: 'launch-live', label: 'В эфир', tone: 'default' }
  ];
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
  delta,
  tone
}: {
  label: string;
  value: number;
  delta?: string;
  tone: 'blue' | 'green' | 'orange' | 'slate';
}) {
  return (
    <article className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{formatWithSpaces(value)}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getKpiBadgeTone(tone))}>{delta ?? '—'}</span>
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-[0.92rem] font-medium leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function getActionButtonLabel(event: AdminManagedEvent) {
  if (event.status === 'live') {
    return 'Завершить событие';
  }

  if (event.status === 'draft') {
    return 'Опубликовать событие';
  }

  if (event.status === 'finished') {
    return 'В архив';
  }

  if (event.status === 'archived') {
    return 'Снять из архива';
  }

  return 'Запустить в эфир';
}

function EventTableRow({
  event,
  active,
  onSelect,
  onAction
}: {
  event: AdminManagedEvent;
  active: boolean;
  onSelect: () => void;
  onAction: (actionId: EventActionId) => void;
}) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'grid w-full grid-cols-[minmax(16rem,1.55fr)_minmax(7rem,0.78fr)_minmax(12rem,1.15fr)_minmax(8rem,0.86fr)_7rem_9.5rem_10rem_9rem_12rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
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
        <p className="mt-1 truncate text-[0.84rem] text-slate-500">{event.tournament}</p>
      </div>

      <div className="inline-flex min-w-0 items-center gap-2 text-[0.9rem] font-medium text-slate-700">
        <DotIcon tone={getSportDot(event.sport)} />
        <span className="truncate">{event.sport}</span>
      </div>

      <div className="min-w-0">
        <p className="truncate text-[0.9rem] font-semibold text-slate-900">{event.participants[0]}</p>
        <p className="mt-1 truncate text-[0.82rem] text-slate-500">{event.participants[1]}</p>
      </div>

      <p className="text-[0.84rem] leading-relaxed text-slate-600">{event.startsAt}</p>

      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(event.status))}>
        {getStatusLabel(event.status)}
      </span>

      <div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getSupportTone(event.support))}>
          {getSupportLabel(event.support)}
        </span>
        <p className="mt-1 truncate text-[0.8rem] text-slate-500">
          {event.donationsAmount === null ? 'Без поступлений' : formatCurrency(event.donationsAmount)}
        </p>
        <p className="mt-1 truncate text-[0.76rem] text-slate-400">
          {event.support === 'post-event' ? event.archiveSupportRemaining : event.archiveVisibilityLabel}
        </p>
      </div>

      <div>
        <p className="truncate text-[0.92rem] font-semibold text-slate-900">{event.room}</p>
        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{event.archiveVisible ? 'Виден в Архиве событий' : getAudienceLabel(event)}</p>
      </div>

      <div>
        <p className="text-[0.92rem] font-semibold text-slate-900">{event.activity}</p>
        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{event.liveDataStatus}</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {getRowActions(event).map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={(mouseEvent) => {
              mouseEvent.stopPropagation();
              onAction(action.id);
            }}
            className={cn(
              'inline-flex rounded-[12px] px-3 py-2 text-[0.8rem] font-semibold',
              action.tone === 'primary'
                ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
                : action.tone === 'danger'
                  ? 'bg-[#fff1ef] text-[#d25346] ring-1 ring-[#ffd7d1]'
                  : 'bg-white text-slate-600 ring-1 ring-black/[0.06]'
            )}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventDrawer({
  event,
  onOpen,
  onEdit,
  onToggleSupport,
  onToggleArchiveVisibility,
  onAction
}: {
  event: AdminManagedEvent;
  onOpen: () => void;
  onEdit: () => void;
  onToggleSupport: () => void;
  onToggleArchiveVisibility: () => void;
  onAction: (actionId: EventActionId) => void;
}) {
  return (
    <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-black/[0.045] px-5 py-5">
        <div className="rounded-[22px] border border-black/[0.04] bg-[linear-gradient(135deg,#fbfcfe_0%,#f2f5fb_100%)] p-4">
          <div className="rounded-[18px] border border-black/[0.04] bg-white/80 px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getStatusTone(event.status))}>
                    {getStatusLabel(event.status)}
                  </span>
                  <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getSupportTone(event.support))}>
                    {getSupportLabel(event.support)}
                  </span>
                </div>
                <p className="mt-3 text-[1.72rem] font-semibold tracking-tight text-slate-900">{event.title}</p>
                <p className="mt-1 text-[0.9rem] text-slate-600">{event.tournament}</p>
              </div>

              <button type="button" className="rounded-[12px] bg-[#f5f8fd] p-2 text-slate-500">
                <LinkArrowIcon />
              </button>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7f9fc] px-3 py-1.5 text-[0.8rem] font-medium text-slate-600">
              <CalendarIcon />
              <span>{event.startsAt}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          <DetailMetric label="Поддержка" value={formatCurrency(event.donationsAmount)} note={formatDonationCount(event.donationCount)} />
          <DetailMetric label="Архив" value={event.archiveVisible ? 'Показывается' : 'Скрыт'} note={event.archiveSupportRemaining} />
          <DetailMetric label="Комната" value={event.room} note={getAudienceLabel(event)} />
          <DetailMetric label="Mobile live" value={event.liveDataStatus} note={event.supportSides} />
        </div>

        <div className="space-y-3">
          <DetailRow label="Участники" value={event.participants.join(' — ')} />
          <DetailRow label="Стадия и локация" value={`${event.stage} · ${event.arena}`} />
          <DetailRow label="Архив и post-event" value={`${event.archiveVisibilityLabel} · ${event.postEventSupportEnabled ? 'post-event поддержка разрешена' : 'post-event поддержка отключена'}`} />
          <DetailRow label="Поля mobile live" value={event.mobileFields.map((field) => `${field.label}: ${field.value}`).join(' · ')} />
          <DetailRow label="Уведомления" value={event.notifications} />
          <DetailRow label="Ответственный" value={event.moderator} />
        </div>

        <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
          <div>
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Последние донаты</p>
            <p className="mt-1 text-[0.82rem] text-slate-500">Быстрый обзор текущей и недавней активности поддержки.</p>
          </div>

          <div className="mt-4 space-y-2.5">
            {event.donationsFeed.length ? (
              event.donationsFeed.map((donation) => (
                <div key={donation.id} className="rounded-[14px] bg-[#f8fafc] px-3.5 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[0.86rem] font-semibold text-slate-900">{donation.user}</p>
                    <p className="text-[0.88rem] font-semibold text-slate-900">{formatCurrency(donation.amount)}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3 text-[0.78rem] text-slate-500">
                    <span className="truncate">{donation.side}</span>
                    <span>{donation.at}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[14px] bg-[#f8fafc] px-3.5 py-4 text-[0.86rem] text-slate-500">
                Донатов пока нет. Событие можно подготовить и включить поддержку позже.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={onOpen}
            className="flex w-full items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
          >
            Открыть событие
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="flex w-full items-center justify-center rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
          >
            Редактировать
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onToggleSupport}
              className={cn(
                'flex items-center justify-center rounded-[16px] px-4 py-3.5 text-[0.9rem] font-semibold',
                event.support === 'disabled'
                  ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
                  : 'border border-[#f1ddcd] bg-[#fff7f2] text-[#a9693a]'
              )}
            >
              {event.support === 'disabled' ? 'Включить поддержку' : event.support === 'post-event' ? 'Отключить post-event' : 'Отключить live-поддержку'}
            </button>

            <button
              type="button"
              onClick={onToggleArchiveVisibility}
              className={cn(
                'flex items-center justify-center rounded-[16px] px-4 py-3.5 text-[0.9rem] font-semibold',
                event.archiveVisible
                  ? 'border border-[#f1ddcd] bg-[#fff7f2] text-[#a9693a]'
                  : 'bg-white text-slate-700 ring-1 ring-black/[0.06]'
              )}
            >
              {event.archiveVisible ? 'Скрыть из архива' : 'Показать в архиве'}
            </button>
          </div>

          <button
              type="button"
              onClick={() =>
                onAction(
                  event.status === 'live'
                    ? 'finish'
                    : event.status === 'draft'
                      ? 'publish'
                      : event.status === 'finished' || event.status === 'archived'
                        ? 'archive'
                        : 'launch-live'
                )
              }
              className={cn(
                'flex w-full items-center justify-center rounded-[16px] px-4 py-3.5 text-[0.9rem] font-semibold',
                event.status === 'live' || event.status === 'finished' || event.status === 'archived'
                  ? 'bg-[#fff1ef] text-[#d25346] ring-1 ring-[#ffd7d1]'
                  : 'bg-white text-slate-700 ring-1 ring-black/[0.06]'
              )}
            >
              {getActionButtonLabel(event)}
            </button>
          </div>
      </div>
    </aside>
  );
}

export function AdminEventsScreen() {
  const [managedEvents, setManagedEvents] = useState(adminManagedEvents);
  const [statusFilter, setStatusFilter] = useState<AdminEventStatusFilter>('all');
  const [sportFilter, setSportFilter] = useState<AdminEventSportFilter>('all');
  const [dateFilter, setDateFilter] = useState<AdminEventDateFilter>('all');
  const [tournamentFilter, setTournamentFilter] = useState<AdminEventTournamentFilter>('all');
  const [participantFilter, setParticipantFilter] = useState<AdminEventParticipantFilter>('all');
  const [roomFilter, setRoomFilter] = useState<AdminEventRoomFilter>('all');
  const [supportFilter, setSupportFilter] = useState<(typeof adminSupportFilters)[number]['id']>('all');
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
      const dateMatch =
        dateFilter === 'all'
          ? true
          : dateFilter === 'today'
            ? event.status === 'live' || event.status === 'today'
            : dateFilter === 'week'
              ? event.status !== 'archived'
              : dateFilter === 'planned'
                ? event.status === 'upcoming' || event.status === 'draft'
                : event.status === 'finished' || event.status === 'archived' || event.support === 'post-event';
      const tournamentMatch = tournamentFilter === 'all' ? true : event.tournamentFilter === tournamentFilter;
      const participantMatch = participantFilter === 'all' ? true : event.participantFilter === participantFilter;
      const roomMatch = roomFilter === 'all' ? true : event.roomState === roomFilter;
      const supportMatch = supportFilter === 'all' ? true : event.support === supportFilter;

      return statusMatch && sportMatch && dateMatch && tournamentMatch && participantMatch && roomMatch && supportMatch;
    });
  }, [dateFilter, managedEvents, participantFilter, roomFilter, sportFilter, statusFilter, supportFilter, tournamentFilter]);

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
        { label: 'Поддержка', value: `${getSupportLabel(event.support)} · ${formatCurrency(event.donationsAmount)}` },
        { label: 'Архив', value: event.archiveSupportRemaining },
        { label: 'Mobile live', value: event.liveDataStatus },
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
        title: 'Запустить событие в эфир',
        description: 'Событие перейдёт в режим эфира, комната станет активной, а поддержка откроется для пользователей.',
        confirmLabel: 'Запустить эфир',
        tone: 'primary',
        badge: 'Запуск эфира',
        footnote: 'Действие будет записано в журнал действий как запуск события в эфир.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'live',
            support: 'live',
            archiveVisible: false,
            room: current.roomState === 'missing' ? 'Комната эфира' : current.room,
            roomState: 'active',
            activity: 'Эфир запущен',
            donationsAmount: current.donationsAmount ?? 0,
            audienceCount: current.audienceCount ?? 0,
            audienceNote: 'Комната активна и принимает поддержку',
            archiveSupportRemaining: `Окно архива откроется после завершения на ${current.archiveWindowHours} ч`,
            archiveVisibilityLabel: 'Появится в Архиве событий после завершения',
            liveDataStatus: '5/5 полей готовы для mobile live',
            notifications: 'Push и оповещения комнаты включены'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (actionId === 'finish') {
      openEventConfirmation(event, {
        title: 'Завершить событие',
        description: 'Событие будет закрыто для поддержки, а комната перейдёт в постэфирный режим.',
        confirmLabel: 'Завершить',
        tone: 'danger',
        badge: 'Критичное действие',
        footnote: 'Завершение события фиксируется в журнале действий и влияет на комнату и платёжный поток.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'finished',
            support: current.postEventSupportEnabled ? 'post-event' : 'disabled',
            archiveVisible: current.postEventSupportEnabled,
            roomState: 'archive',
            activity: current.postEventSupportEnabled ? 'Окно post-event поддержки открыто' : 'Эфир завершён',
            audienceNote: 'Итоговая статистика сохранена',
            archiveSupportRemaining: current.postEventSupportEnabled ? `Доступно ещё ${current.archiveWindowHours} ч` : 'Post-event окно закрыто',
            archiveVisibilityLabel: current.postEventSupportEnabled ? 'Показывается в Архиве событий' : 'Не показывается в Архиве событий',
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
        description: 'Черновик появится в операционном контуре, а комната и уведомления будут подготовлены к запуску.',
        confirmLabel: 'Опубликовать',
        tone: 'primary',
        badge: 'Публикация',
        footnote: 'Публикация создаст запись в журнале действий и переведёт событие в планирование.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: 'upcoming',
            support: 'disabled',
            room: current.roomState === 'missing' ? 'Комната события' : current.room,
            roomState: 'scheduled',
            activity: 'Готово к публикации',
            audienceNote: 'Событие добавлено в планирование',
            archiveVisible: false,
            archiveSupportRemaining: `После завершения доступно ${current.archiveWindowHours} ч`,
            archiveVisibilityLabel: 'Архив будет включён после завершения',
            notifications: 'Подготовлены push и оповещения комнаты'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    if (actionId === 'archive') {
      openEventConfirmation(event, {
        title: 'Отправить событие в архив',
        description: 'Карточка останется в журнале, но будет снята с оперативного обзора и активной поддержки.',
        confirmLabel: 'Архивировать',
        tone: 'danger',
        badge: 'Архив',
        footnote: 'Архивирование влияет на доступность карточки и логируется как административное действие.',
        onConfirm: () => {
          updateEvent(event.id, (current) => ({
            ...current,
            status: current.archiveVisible ? 'archived' : 'finished',
            support: 'disabled',
            archiveVisible: false,
            postEventSupportEnabled: false,
            roomState: 'archive',
            activity: 'Скрыто из Архива событий',
            audienceNote: 'Скрыто из оперативного списка',
            archiveSupportRemaining: 'Окно архива закрыто',
            archiveVisibilityLabel: 'Не показывается в Архиве событий',
            notifications: 'Архивировано'
          }));
          setConfirmState(null);
        }
      });
    }
  };

  const handleToggleSupport = (event: AdminManagedEvent) => {
    const enable = event.support === 'disabled';
    const nextSupportState: AdminSupportState =
      event.status === 'finished' || event.status === 'archived' ? 'post-event' : 'live';

    openEventConfirmation(event, {
      title: enable ? 'Включить поддержку' : 'Отключить поддержку',
      description: enable
        ? nextSupportState === 'post-event'
          ? 'Событие снова появится в Архиве событий и будет доступно для post-event поддержки в течение архивного окна.'
          : 'Поддержка станет доступна пользователям, а связанная комната будет готова к приёму донатов.'
        : 'Поддержка будет выключена для новых донатов, но история события и комната останутся доступными.',
      confirmLabel: enable ? 'Включить' : 'Отключить',
      tone: enable ? 'primary' : 'danger',
      badge: enable ? 'Поддержка' : 'Критичное действие',
      footnote: 'Изменение состояния поддержки записывается в журнале действий и влияет на live и post-event донаты.',
      onConfirm: () => {
        updateEvent(event.id, (current) => ({
          ...current,
          support: enable ? nextSupportState : 'disabled',
          postEventSupportEnabled: enable ? current.postEventSupportEnabled || nextSupportState === 'post-event' : current.postEventSupportEnabled,
          archiveVisible: nextSupportState === 'post-event' ? enable : current.archiveVisible,
          room: enable && current.roomState === 'missing' ? 'Комната события' : current.room,
          roomState: enable && current.roomState === 'missing' ? 'scheduled' : current.roomState,
          archiveSupportRemaining:
            nextSupportState === 'post-event' && enable
              ? `Доступно ещё ${current.archiveWindowHours} ч`
              : current.archiveSupportRemaining,
          archiveVisibilityLabel:
            nextSupportState === 'post-event' && enable
              ? 'Показывается в Архиве событий'
              : enable
                ? current.archiveVisibilityLabel
                : 'Не показывается в Архиве событий',
          notifications:
            enable
              ? nextSupportState === 'post-event'
                ? 'Post-event поддержка и карточка архива активированы'
                : 'Поддержка и оповещения комнаты активированы'
              : 'Поддержка отключена, комната работает в режиме чтения'
        }));
        setConfirmState(null);
      }
    });
  };

  const handleToggleArchiveVisibility = (event: AdminManagedEvent) => {
    const nextVisible = !event.archiveVisible;

    openEventConfirmation(event, {
      title: nextVisible ? 'Показать событие в архиве' : 'Скрыть событие из архива',
      description: nextVisible
        ? 'Карточка появится в мобильном Архиве событий и будет доступна для post-event поддержки в пределах архивного окна.'
        : 'Карточка исчезнет из мобильного Архива событий и новые late-support донаты будут остановлены.',
      confirmLabel: nextVisible ? 'Показать в архиве' : 'Скрыть из архива',
      tone: nextVisible ? 'primary' : 'danger',
      badge: 'Архив событий',
      footnote: 'Изменение видимости влияет на мобильный Архив событий и late-support сценарий.',
      onConfirm: () => {
        updateEvent(event.id, (current) => ({
          ...current,
          status: nextVisible ? 'finished' : 'archived',
          archiveVisible: nextVisible,
          support: nextVisible && current.postEventSupportEnabled ? 'post-event' : current.support === 'live' ? 'live' : 'disabled',
          archiveSupportRemaining: nextVisible ? `Доступно ещё ${current.archiveWindowHours} ч` : 'Окно архива закрыто',
          archiveVisibilityLabel: nextVisible ? 'Показывается в Архиве событий' : 'Не показывается в Архиве событий',
          activity: nextVisible ? 'Доступно в Архиве событий' : 'Скрыто из Архива событий'
        }));
        setConfirmState(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {adminEventKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} delta={kpi.delta} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-[16px] border border-black/[0.05] bg-[#f4f7fb] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {adminStatusFilters.map((filter) => {
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

          <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
            <SearchIcon />
            {filteredEvents.length} в обзоре
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <FilterField label="Вид спорта" value={sportFilter} onChange={(value) => setSportFilter(value as AdminEventSportFilter)} options={adminSportFilters} />
          <FilterField label="Дата" value={dateFilter} onChange={(value) => setDateFilter(value as AdminEventDateFilter)} options={adminDateFilters} />
          <FilterField
            label="Турнир"
            value={tournamentFilter}
            onChange={(value) => setTournamentFilter(value as AdminEventTournamentFilter)}
            options={adminTournamentFilters}
            className="min-w-[12rem]"
          />
          <FilterField
            label="Участники"
            value={participantFilter}
            onChange={(value) => setParticipantFilter(value as AdminEventParticipantFilter)}
            options={adminParticipantFilters}
            className="min-w-[12rem]"
          />
          <FilterField label="Комната" value={roomFilter} onChange={(value) => setRoomFilter(value as AdminEventRoomFilter)} options={adminRoomFilters} />
          <FilterField
            label="Поддержка"
            value={supportFilter}
            onChange={(value) => setSupportFilter(value as (typeof adminSupportFilters)[number]['id'])}
            options={adminSupportFilters}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Список событий</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор ближайших, эфирных, завершённых и черновых событий FUNDON.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
              <SearchIcon />
              {filteredEvents.length} найдено
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[1030px]">
              <div className="grid grid-cols-[minmax(16rem,1.55fr)_minmax(7rem,0.78fr)_minmax(12rem,1.15fr)_minmax(8rem,0.86fr)_7rem_9.5rem_10rem_9rem_12rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Событие</span>
                <span>Вид спорта</span>
                <span>Участники</span>
                <span>Дата и время</span>
                <span>Статус</span>
                <span>Поддержка</span>
                <span>Комната</span>
                <span>Активность</span>
                <span>Действия</span>
              </div>

              <div className="space-y-3">
                {filteredEvents.map((event) => (
                  <EventTableRow
                    key={event.id}
                    event={event}
                    active={event.id === selectedEvent?.id}
                    onSelect={() => setSelectedEventId(event.id)}
                    onAction={(actionId) => handleEventAction(event, actionId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedEvent ? (
          <EventDrawer
            event={selectedEvent}
            onOpen={() => setSelectedEventId(selectedEvent.id)}
            onEdit={() => setSelectedEventId(selectedEvent.id)}
            onToggleSupport={() => handleToggleSupport(selectedEvent)}
            onToggleArchiveVisibility={() => handleToggleArchiveVisibility(selectedEvent)}
            onAction={(actionId) => handleEventAction(selectedEvent, actionId)}
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
