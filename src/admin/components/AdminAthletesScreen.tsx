'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  adminAthleteActivityFilters,
  adminAthleteLiveFilters,
  adminAthleteSportFilters,
  adminAthleteStatusFilters,
  adminAthleteTypeFilters,
  adminAthletesKpis,
  adminManagedAthletes,
  type AdminAthleteSport,
  type AdminAthleteSportFilter,
  type AdminAthleteStatus,
  type AdminAthleteType,
  type AdminManagedAthlete
} from '@/admin/data/athletes';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function formatWithSpaces(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/[\u00a0\u202f]/g, ' ');
}

function formatCompactCount(value: number) {
  if (value >= 1000) {
    return `${new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    })
      .format(value / 1000)
      .replace(/[\u00a0\u202f]/g, ' ')} тыс.`;
  }

  return formatWithSpaces(value);
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

function DotIcon({ tone }: { tone: string }) {
  return <span className={cn('inline-flex h-2.5 w-2.5 rounded-full', tone)} />;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
    </svg>
  );
}

function getSportDot(sport: AdminAthleteSport) {
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
    case 'Лёгкая атлетика':
      return 'bg-violet-500';
    case 'Киберспорт':
      return 'bg-indigo-500';
    case 'Бокс':
      return 'bg-amber-500';
  }
}

function mapSportToFilter(sport: AdminAthleteSport): AdminAthleteSportFilter {
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
    case 'Лёгкая атлетика':
      return 'athletics';
    case 'Киберспорт':
      return 'esports';
    case 'Бокс':
      return 'boxing';
  }
}

function getStatusTone(status: AdminAthleteStatus) {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'live':
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    case 'archived':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getStatusLabel(status: AdminAthleteStatus) {
  switch (status) {
    case 'active':
      return 'Активен';
    case 'live':
      return 'В эфире';
    case 'archived':
      return 'Архив';
  }
}

function getTypeLabel(type: AdminAthleteType) {
  return type === 'team' ? 'Команда' : 'Спортсмен';
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
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
}) {
  return (
    <label className="relative min-w-[11rem]">
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

function SideInfoRow({ label, value }: { label: string; value: string }) {
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

function getSupportLabel(value: number) {
  return `${formatCompactCount(value)} донатов`;
}

export function AdminAthletesScreen() {
  const [managedAthletes, setManagedAthletes] = useState(adminManagedAthletes);
  const [sportFilter, setSportFilter] = useState<AdminAthleteSportFilter>('all');
  const [statusFilter, setStatusFilter] = useState<(typeof adminAthleteStatusFilters)[number]['id']>('all');
  const [typeFilter, setTypeFilter] = useState<(typeof adminAthleteTypeFilters)[number]['id']>('all');
  const [activityFilter, setActivityFilter] = useState<(typeof adminAthleteActivityFilters)[number]['id']>('all');
  const [liveFilter, setLiveFilter] = useState<(typeof adminAthleteLiveFilters)[number]['id']>('all');
  const [selectedAthleteId, setSelectedAthleteId] = useState(adminManagedAthletes[0]?.id ?? '');
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

  const filteredAthletes = useMemo(() => {
    return managedAthletes.filter((athlete) => {
      const sportMatch = sportFilter === 'all' ? true : mapSportToFilter(athlete.sport) === sportFilter;
      const statusMatch = statusFilter === 'all' ? true : athlete.status === statusFilter;
      const typeMatch = typeFilter === 'all' ? true : athlete.type === typeFilter;
      const activityMatch =
        activityFilter === 'all' ? true : activityFilter === 'active' ? athlete.supportStats.activeEvents > 0 : athlete.supportStats.activeEvents === 0;
      const liveMatch = liveFilter === 'all' ? true : liveFilter === 'live' ? athlete.status === 'live' : athlete.status !== 'live';

      return sportMatch && statusMatch && typeMatch && activityMatch && liveMatch;
    });
  }, [activityFilter, liveFilter, managedAthletes, sportFilter, statusFilter, typeFilter]);

  useEffect(() => {
    if (!filteredAthletes.some((athlete) => athlete.id === selectedAthleteId)) {
      setSelectedAthleteId(filteredAthletes[0]?.id ?? '');
    }
  }, [filteredAthletes, selectedAthleteId]);

  const selectedAthlete = filteredAthletes.find((athlete) => athlete.id === selectedAthleteId) ?? filteredAthletes[0] ?? managedAthletes[0];

  const updateAthlete = (athleteId: string, updater: (athlete: AdminManagedAthlete) => AdminManagedAthlete) => {
    setManagedAthletes((current) => current.map((athlete) => (athlete.id === athleteId ? updater(athlete) : athlete)));
  };

  const openAthleteConfirmation = (
    athlete: AdminManagedAthlete,
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
    setSelectedAthleteId(athlete.id);
    setConfirmState({
      ...config,
      details: [
        { label: 'Карточка', value: athlete.name },
        { label: 'Тип', value: getTypeLabel(athlete.type) },
        { label: 'Статус', value: getStatusLabel(athlete.status) },
        { label: 'Текущий эфир', value: athlete.liveEvent }
      ]
    });
  };

  const handleAthleteAction = (athlete: AdminManagedAthlete, action: 'archive' | 'hide') => {
    if (action === 'archive') {
      openAthleteConfirmation(athlete, {
        title: 'Архивировать карточку',
        description: 'Карточка останется в системе, но будет снята с оперативного оборота и live-потока поддержки.',
        confirmLabel: 'Архивировать',
        tone: 'danger',
        badge: 'Архив',
        footnote: 'Архивирование скрывает карточку из активного пула и фиксируется в audit trail.',
        onConfirm: () => {
          updateAthlete(athlete.id, (current) => ({
            ...current,
            status: 'archived',
            supportLabel: 'Скрыта из витрины',
            liveEvent: 'Сейчас вне эфира'
          }));
          setConfirmState(null);
        }
      });
      return;
    }

    openAthleteConfirmation(athlete, {
      title: 'Скрыть карточку из витрины',
      description: 'Карточка останется доступной команде, но будет снята с пользовательской витрины и активного live-продвижения.',
      confirmLabel: 'Скрыть',
      tone: 'primary',
      badge: 'Скрытие',
      footnote: 'Скрытие не удаляет карточку, но отключает её от витрины и рекомендаций.',
      onConfirm: () => {
        updateAthlete(athlete.id, (current) => ({
          ...current,
          supportLabel: 'Скрыта из витрины',
          liveEvent: current.status === 'live' ? current.liveEvent : 'Только для admin-просмотра'
        }));
        setConfirmState(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminAthletesKpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} hint={kpi.hint} tone={kpi.tone} />
        ))}
      </section>

      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <FilterField label="Вид спорта" value={sportFilter} onChange={(value) => setSportFilter(value as AdminAthleteSportFilter)} options={adminAthleteSportFilters} />
          <FilterField label="Статус" value={statusFilter} onChange={(value) => setStatusFilter(value as (typeof adminAthleteStatusFilters)[number]['id'])} options={adminAthleteStatusFilters} />
          <FilterField label="Тип" value={typeFilter} onChange={(value) => setTypeFilter(value as (typeof adminAthleteTypeFilters)[number]['id'])} options={adminAthleteTypeFilters} />
          <FilterField label="Активные" value={activityFilter} onChange={(value) => setActivityFilter(value as (typeof adminAthleteActivityFilters)[number]['id'])} options={adminAthleteActivityFilters} />
          <FilterField label="Прямой эфир" value={liveFilter} onChange={(value) => setLiveFilter(value as (typeof adminAthleteLiveFilters)[number]['id'])} options={adminAthleteLiveFilters} />

          <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">
            <SearchIcon />
            {filteredAthletes.length} в списке
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">Список спортсменов и команд</h2>
              <p className="mt-1 text-sm text-slate-500">Операционный обзор карточек, прямых эфиров и доступности поддержки в системе Fansten.</p>
            </div>
            <div className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.78rem] font-semibold text-slate-500">Быстрый выбор карточки</div>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <div className="min-w-[930px]">
              <div className="grid grid-cols-[minmax(17rem,1.55fr)_minmax(8rem,0.9fr)_minmax(9rem,1fr)_7.5rem_9rem_9rem] gap-4 px-4 pb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <span>Спортсмен</span>
                <span>Вид спорта</span>
                <span>Команда / страна</span>
                <span>Статус</span>
                <span>События</span>
                <span>Поддержка</span>
              </div>

              <div className="space-y-3">
                {filteredAthletes.map((athlete) => {
                  const active = athlete.id === selectedAthlete?.id;

                  return (
                    <button
                      key={athlete.id}
                      type="button"
                      onClick={() => setSelectedAthleteId(athlete.id)}
                      className={cn(
                        'grid w-full grid-cols-[minmax(17rem,1.55fr)_minmax(8rem,0.9fr)_minmax(9rem,1fr)_7.5rem_9rem_9rem] items-center gap-4 rounded-[20px] border px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition',
                        active
                          ? 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_34px_rgba(79,143,246,0.12)]'
                          : 'border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] hover:border-[#dbe7fb] hover:bg-white'
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[0.96rem] font-semibold text-slate-700', athlete.avatarTone)}>
                          {athlete.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-[1rem] font-semibold tracking-tight text-slate-900">{athlete.name}</p>
                            <span className="rounded-full bg-[#f7f8fb] px-2 py-0.5 text-[0.68rem] font-semibold text-slate-500">
                              {getTypeLabel(athlete.type)}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-[0.82rem] text-slate-500">{athlete.slug}</p>
                        </div>
                      </div>

                      <div className="inline-flex min-w-0 items-center gap-2 text-[0.9rem] font-medium text-slate-700">
                        <DotIcon tone={getSportDot(athlete.sport)} />
                        <span className="truncate">{athlete.sport}</span>
                      </div>

                      <p className="truncate text-[0.88rem] text-slate-600">{athlete.teamOrCountry}</p>

                      <span className={cn('inline-flex w-fit rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', getStatusTone(athlete.status))}>
                        {getStatusLabel(athlete.status)}
                      </span>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-900">{athlete.eventsCount}</p>
                        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{athlete.eventsLabel}</p>
                      </div>

                      <div>
                        <p className="text-[0.92rem] font-semibold text-slate-900">{formatCompactCount(athlete.supportCount)}</p>
                        <p className="mt-1 truncate text-[0.8rem] text-slate-500">{athlete.supportLabel}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedAthlete ? (
          <aside className="sticky top-[7.9rem] self-start rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="border-b border-black/[0.045] px-5 py-5">
              <div className="rounded-[22px] border border-black/[0.04] bg-[linear-gradient(135deg,#fbfcfe_0%,#f2f5fb_100%)] p-4">
                <div className={cn('flex h-44 items-end rounded-[18px] px-5 pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]', selectedAthlete.avatarTone)}>
                  <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.74rem] font-semibold backdrop-blur-sm', getStatusTone(selectedAthlete.status), 'bg-white/90')}>
                        {getStatusLabel(selectedAthlete.status)}
                      </span>
                      <span className="inline-flex rounded-full bg-white/80 px-2.5 py-1 text-[0.74rem] font-semibold text-slate-600">
                        {getTypeLabel(selectedAthlete.type)}
                      </span>
                    </div>
                    <p className="mt-3 text-[1.92rem] font-semibold tracking-tight text-slate-900">{selectedAthlete.name}</p>
                    <p className="mt-1 text-[0.9rem] text-slate-700">{selectedAthlete.slug}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[0.9rem] leading-6 text-slate-600">{selectedAthlete.shortBio}</p>
            </div>

            <div className="space-y-5 p-5">
              <div className="space-y-3">
                <SideInfoRow label="Вид спорта" value={selectedAthlete.sport} />
                <SideInfoRow label="Команда / страна" value={selectedAthlete.teamOrCountry} />
                <SideInfoRow label="Текущий эфир" value={selectedAthlete.liveEvent} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <DetailMetric label="Поддержка" value={getSupportLabel(selectedAthlete.supportStats.totalSupport)} note={selectedAthlete.supportLabel} />
                <DetailMetric label="Аудитория" value={formatCompactCount(selectedAthlete.supportStats.audience)} note="Подписчики" />
                <DetailMetric label="События" value={formatWithSpaces(selectedAthlete.supportStats.activeEvents)} note="Активные сейчас" />
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Последняя активность</p>
                  <p className="mt-1 text-[0.82rem] text-slate-500">Ключевые изменения карточки и состояния поддержки.</p>
                </div>

                <div className="mt-4 space-y-2.5">
                  {selectedAthlete.activitySummary.map((item) => (
                    <div key={item.id} className="rounded-[14px] bg-[#f8fafc] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.86rem] font-medium leading-5 text-slate-800">{item.title}</p>
                        <span className="shrink-0 text-[0.76rem] text-slate-500">{item.at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedAthleteId(selectedAthlete.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
                >
                  Редактировать
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleAthleteAction(selectedAthlete, 'archive')}
                    className="flex items-center justify-center gap-2 rounded-[16px] border border-[#eadfce] bg-[#fdf9f4] px-4 py-3.5 text-[0.92rem] font-semibold text-[#8e6d43]"
                  >
                    Архивировать
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAthleteAction(selectedAthlete, 'hide')}
                    className="flex items-center justify-center gap-2 rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.92rem] font-semibold text-slate-600"
                  >
                    Скрыть
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
