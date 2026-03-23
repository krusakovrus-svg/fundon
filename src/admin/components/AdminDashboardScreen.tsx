'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import {
  adminAlerts,
  adminAnalyticsSegments,
  adminAudienceGrowthBars,
  adminAudienceGrowthLabels,
  adminDashboardFocus,
  adminDashboardInsights,
  adminKpis,
  adminLiveEvents,
  adminProductMetrics,
  adminQuickActions,
  adminRecentDonations,
  type AdminDashboardValueFormat,
  type AdminInsight,
  type AdminProductMetric
} from '@/admin/data/dashboard';
import { cn } from '@/lib/utils';

const kpiPalette = {
  blue: '#5d92f7',
  orange: '#e3a25a',
  green: '#78b28c',
  indigo: '#7b8ff4'
} as const;

function formatWithSpaces(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('ru-RU', options).format(value).replace(/[\u00a0\u202f]/g, ' ');
}

function formatInteger(value: number) {
  return formatWithSpaces(value);
}

function formatCurrency(value: number) {
  return formatWithSpaces(value, {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  });
}

function formatPercent(value: number) {
  const precision = Number.isInteger(value) ? 0 : 1;

  return `${formatWithSpaces(value, {
    minimumFractionDigits: precision,
    maximumFractionDigits: 1
  })}%`;
}

function formatDashboardValue(value: number, format: AdminDashboardValueFormat) {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return formatPercent(value);
    case 'integer':
    default:
      return formatInteger(value);
  }
}

function SectionCard({
  title,
  subtitle,
  action,
  className,
  bodyClassName,
  children
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn('rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]', className)}>
      <div className="flex items-start justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
        <div>
          <h2 className="text-[1.16rem] font-semibold tracking-tight text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className={cn('p-6', bodyClassName)}>{children}</div>
    </section>
  );
}

function SectionPill({
  children,
  tone = 'slate'
}: {
  children: ReactNode;
  tone?: 'slate' | 'blue' | 'amber';
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1.5 text-[0.76rem] font-semibold',
        tone === 'blue'
          ? 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
          : tone === 'amber'
            ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
            : 'bg-[#f5f8fd] text-slate-500'
      )}
    >
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sparkline({
  id,
  points,
  accent
}: {
  id: string;
  points: number[];
  accent: string;
}) {
  const width = 164;
  const height = 42;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const baseline = height - 4;

  const coordinates = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-11 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-spark-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline fill={`url(#${id}-spark-fill)`} stroke="none" points={`0,${baseline} ${coordinates} ${width},${baseline}`} />
      <polyline fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" points={coordinates} />
    </svg>
  );
}

function getKpiBadgeTone(tone: 'positive' | 'neutral' | 'attention') {
  switch (tone) {
    case 'positive':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'attention':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getKpiBadgeLabel(tone: 'positive' | 'neutral' | 'attention') {
  switch (tone) {
    case 'positive':
      return 'Рост';
    case 'attention':
      return 'Фокус';
    case 'neutral':
    default:
      return 'Стабильно';
  }
}

function KpiCard({
  id,
  label,
  value,
  format,
  trend,
  trendTone,
  accent,
  points
}: {
  id: string;
  label: string;
  value: number;
  format: AdminDashboardValueFormat;
  trend: string;
  trendTone: 'positive' | 'neutral' | 'attention';
  accent: keyof typeof kpiPalette;
  points: number[];
}) {
  return (
    <article className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{formatDashboardValue(value, format)}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getKpiBadgeTone(trendTone))}>
          {getKpiBadgeLabel(trendTone)}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4 border-t border-black/[0.045] pt-3">
        <p className="max-w-[11rem] text-[0.8rem] leading-5 text-slate-500">{trend}</p>
        <div className="w-[42%] min-w-[7.5rem]">
          <Sparkline id={id} points={points} accent={kpiPalette[accent]} />
        </div>
      </div>
    </article>
  );
}

function LiveStatusDot({ sport }: { sport: string }) {
  const tone =
    sport === 'Футбол' ? 'bg-emerald-500' : sport === 'Бокс' ? 'bg-amber-500' : sport === 'Хоккей' ? 'bg-sky-500' : 'bg-slate-400';

  return <span className={cn('h-2.5 w-2.5 rounded-full', tone)} />;
}

function getAlertStyles(kind: 'critical' | 'warning' | 'info') {
  switch (kind) {
    case 'critical':
      return {
        accent: 'bg-[#ef6d5b]',
        badge: 'bg-[#fff2ef] text-[#cb4a39] ring-1 ring-[#ffd5cf]'
      };
    case 'warning':
      return {
        accent: 'bg-[#e6a551]',
        badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
      };
    case 'info':
    default:
      return {
        accent: 'bg-[#5d92f7]',
        badge: 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
      };
  }
}

function getDonationStatusClasses(tone: 'success' | 'review' | 'neutral') {
  switch (tone) {
    case 'success':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'review':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getProductMetricClasses(tone: AdminProductMetric['tone']) {
  switch (tone) {
    case 'positive':
      return 'bg-emerald-50 text-emerald-700';
    case 'attention':
      return 'bg-amber-50 text-amber-700';
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

function getInsightClasses(tone: AdminInsight['tone']) {
  switch (tone) {
    case 'blue':
      return 'border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)]';
    case 'amber':
      return 'border-[#f1ddbf] bg-[linear-gradient(180deg,#ffffff_0%,#fdf8ef_100%)]';
    case 'slate':
    default:
      return 'border-black/[0.05] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)]';
  }
}

function DistributionChart() {
  return (
    <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-5">
      <div
        className="mx-auto flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${adminAnalyticsSegments
            .map(
              (segment, index) =>
                `${segment.color} 0 ${adminAnalyticsSegments.slice(0, index + 1).reduce((sum, current) => sum + current.value, 0)}%`
            )
            .join(', ')})`
        }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Спорт
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {adminAnalyticsSegments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
              {segment.label}
            </span>
            <span className="font-semibold text-slate-900">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboardScreen() {
  const [liveEvents, setLiveEvents] = useState(adminLiveEvents);
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

  const handleFinishLiveEvent = (eventId: string) => {
    const liveEvent = liveEvents.find((item) => item.id === eventId);

    if (!liveEvent) {
      return;
    }

    setConfirmState({
      title: 'Завершить live-событие',
      description: 'Событие будет снято с dashboard live-контроля и переведено в завершённое состояние вместе с текущим потоком поддержки.',
      confirmLabel: 'Завершить',
      tone: 'danger',
      badge: 'Критичное действие',
      footnote: 'Завершение live с dashboard логируется так же, как и действие из экрана событий.',
      details: [
        { label: 'Событие', value: liveEvent.title },
        { label: 'Статус', value: liveEvent.status },
        { label: 'Поддержка', value: formatCurrency(liveEvent.supportVolume) },
        { label: 'Аудитория', value: `${liveEvent.sidesLabel} · ${formatInteger(liveEvent.viewers)} зрителей` }
      ],
      onConfirm: () => {
        setLiveEvents((current) => current.filter((item) => item.id !== eventId));
        setConfirmState(null);
      }
    });
  };

  const activeSupportVolume = liveEvents.reduce((sum, event) => sum + event.supportVolume, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {adminKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            id={kpi.id}
            label={kpi.label}
            value={kpi.value}
            format={kpi.format}
            trend={kpi.trend}
            trendTone={kpi.trendTone}
            accent={kpi.accent}
            points={kpi.points}
          />
        ))}
      </section>

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_0.95fr]">
        <div className="space-y-6">
          <SectionCard
            title="Live-события"
            subtitle="Оперативный обзор текущих эфиров и денежного потока по активным матчам."
            action={<SectionPill tone="blue">{liveEvents.length} в эфире</SectionPill>}
          >
            <div className="space-y-3.5">
              {liveEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-[1.04rem] font-semibold tracking-tight text-slate-900">{event.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.84rem] text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <LiveStatusDot sport={event.sport} />
                          <span>{event.sport}</span>
                        </span>
                        <span>•</span>
                        <span>{event.status}</span>
                        <span>•</span>
                        <span>{event.sidesLabel}</span>
                        <span>•</span>
                        <span>{formatInteger(event.viewers)} зрителей</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="rounded-[16px] border border-black/[0.045] bg-white/90 px-4 py-3 text-right shadow-[0_10px_22px_rgba(15,23,42,0.04)]">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Поддержка</p>
                        <p className="mt-1 text-[1.18rem] font-semibold tracking-tight text-slate-900">{formatCurrency(event.supportVolume)}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-500">{event.supportNote}</p>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-[14px] border border-[#dbe7fb] bg-[#eef5ff] px-4 py-2.5 text-[0.9rem] font-semibold text-[#2f78d3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                        >
                          Управлять
                          <ArrowIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFinishLiveEvent(event.id)}
                          className="rounded-[14px] border border-black/[0.06] bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Завершить
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] border border-black/[0.045] bg-[#f8fafc] px-4 py-3.5">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Общий live-объём</p>
                <p className="mt-2 text-[1.4rem] font-semibold tracking-tight text-slate-900">{formatCurrency(activeSupportVolume)}</p>
              </div>
              <div className="rounded-[18px] border border-black/[0.045] bg-[#f8fafc] px-4 py-3.5">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Суммарная аудитория</p>
                <p className="mt-2 text-[1.4rem] font-semibold tracking-tight text-slate-900">
                  {formatInteger(liveEvents.reduce((sum, event) => sum + event.viewers, 0))} зрителей
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Оповещения"
            subtitle="Сигналы модерации, платежей и системы в одном операционном потоке."
            action={<SectionPill>{adminAlerts.length} сигнала</SectionPill>}
          >
            <div className="space-y-3">
              {adminAlerts.map((alert) => {
                const styles = getAlertStyles(alert.kind);

                return (
                  <article
                    key={alert.id}
                    className="rounded-[18px] border border-black/[0.045] bg-white px-4 py-4 shadow-[0_10px_22px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className={cn('mt-1 block h-10 w-1.5 shrink-0 rounded-full', styles.accent)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', styles.badge)}>{alert.category}</span>
                          <span className="text-[0.78rem] text-slate-500">{alert.timestamp}</span>
                        </div>
                        <p className="mt-2 text-[0.96rem] font-semibold text-slate-900">{alert.title}</p>
                        <p className="mt-1.5 text-[0.84rem] leading-6 text-slate-600">{alert.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            title="Динамика аудитории"
            subtitle="Новые пользователи и активность в live-контуре за последние шесть дней."
            action={<SectionPill tone="amber">+18% к прошлой неделе</SectionPill>}
          >
            <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-5 py-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Новые пользователи</p>
                  <p className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-900">1 250</p>
                </div>
                <p className="max-w-[16rem] text-right text-[0.84rem] leading-6 text-slate-500">
                  Самый сильный приток приходит в пятничные и субботние live-слоты.
                </p>
              </div>

              <div className="mt-6 flex items-end gap-3">
                {adminAudienceGrowthBars.map((value, index) => (
                  <div key={adminAudienceGrowthLabels[index]} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex h-36 w-full items-end rounded-[14px] bg-white/80 px-2 pb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                      <div
                        className="w-full rounded-[10px] bg-[linear-gradient(180deg,#7bb3ff_0%,#4f8ff6_100%)]"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-[0.78rem] font-medium text-slate-500">{adminAudienceGrowthLabels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Последние донаты"
            subtitle="Быстрый обзор поддержки по пользователям, событиям и сторонам."
            action={<SectionPill>{adminRecentDonations.length} за 20 мин</SectionPill>}
          >
            <div className="space-y-3">
              {adminRecentDonations.map((donation) => (
                <article
                  key={donation.id}
                  className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-4"
                >
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1.18fr)_minmax(0,0.95fr)_auto] md:items-center">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f7dac9_0%,#e2b49d_100%)] text-[0.9rem] font-semibold text-slate-700">
                        {donation.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.96rem] font-semibold text-slate-900">{donation.user}</p>
                        <p className="mt-1 truncate text-[0.82rem] text-slate-500">{donation.event}</p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[0.9rem] font-medium text-slate-800">{donation.athlete}</p>
                      <p className="mt-1 truncate text-[0.82rem] text-slate-500">{donation.side}</p>
                    </div>

                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <div className="text-right">
                        <p className="text-[1.14rem] font-semibold tracking-tight text-slate-900">{formatCurrency(donation.amount)}</p>
                        <p className="mt-1 text-[0.78rem] text-slate-500">{donation.timestamp}</p>
                      </div>
                      <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.74rem] font-semibold', getDonationStatusClasses(donation.statusTone))}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Рост и распределение" subtitle="Новые пользователи и интерес аудитории по видам спорта.">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem]">
              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-5">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Новые пользователи</p>
                <p className="mt-2 text-[1.9rem] font-semibold tracking-tight text-slate-900">
                  1 250 <span className="text-[0.98rem] font-semibold text-emerald-600">+18%</span>
                </p>

                <div className="mt-5 flex items-end gap-3">
                  {adminAudienceGrowthBars.map((value, index) => (
                    <div key={adminAudienceGrowthLabels[index]} className="flex h-28 flex-1 flex-col justify-end">
                      <div
                        className="rounded-t-[10px] bg-[linear-gradient(180deg,#7bb3ff_0%,#4f8ff6_100%)]"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 text-[0.78rem] text-slate-500">
                  {adminAudienceGrowthLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>

              <DistributionChart />
            </div>
          </SectionCard>

          <SectionCard title="Продуктовые сигналы" subtitle="Конверсия, возврат в поддержку и короткие управленческие выводы.">
            <div className="space-y-3">
              {adminProductMetrics.map((metric) => (
                <article
                  key={metric.id}
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="text-[0.86rem] font-semibold text-slate-800">{metric.label}</p>
                    <p className="mt-1 text-[0.78rem] text-slate-500">{metric.delta}</p>
                  </div>
                  <span className={cn('inline-flex rounded-full px-2.5 py-1.5 text-[0.82rem] font-semibold', getProductMetricClasses(metric.tone))}>
                    {metric.value}
                  </span>
                </article>
              ))}
            </div>

            <div className="mt-5 border-t border-black/[0.045] pt-5">
              <div className="space-y-3">
                {adminDashboardInsights.map((insight) => (
                  <article
                    key={insight.id}
                    className={cn(
                      'rounded-[18px] border px-4 py-4 shadow-[0_10px_22px_rgba(15,23,42,0.04)]',
                      getInsightClasses(insight.tone)
                    )}
                  >
                    <p className="text-[0.9rem] font-semibold text-slate-900">{insight.title}</p>
                    <p className="mt-2 text-[0.82rem] leading-6 text-slate-600">{insight.summary}</p>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-[18px] border border-[#dbe7fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e8f1fe_100%)] px-4 py-4">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[#2f78d3]">Фокус</p>
                <p className="mt-2 text-[0.86rem] leading-6 text-slate-700">{adminDashboardFocus}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Быстрые действия" subtitle="Частые операционные сценарии без перехода по длинному flow.">
            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
              {adminQuickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between gap-4 rounded-[18px] px-4 py-4 text-left transition',
                    action.priority === 'primary'
                      ? 'bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]'
                      : 'border border-black/[0.05] bg-white text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.04)] hover:bg-slate-50'
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold">{action.label}</span>
                    <span className={cn('mt-1 block text-[0.82rem] leading-6', action.priority === 'primary' ? 'text-white/80' : 'text-slate-500')}>
                      {action.description}
                    </span>
                  </span>
                  <span className={cn('shrink-0', action.priority === 'primary' ? 'text-white' : 'text-slate-400')}>
                    <ArrowIcon />
                  </span>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
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
