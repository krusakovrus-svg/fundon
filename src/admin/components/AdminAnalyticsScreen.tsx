import type { ReactNode } from 'react';

import {
  adminAnalyticsAnomalies,
  adminAnalyticsDonationAmounts,
  adminAnalyticsDonationAverage,
  adminAnalyticsDonationErrors,
  adminAnalyticsDonationLabels,
  adminAnalyticsEngagementMetrics,
  adminAnalyticsFunnelMetrics,
  adminAnalyticsGrowthActiveUsers,
  adminAnalyticsGrowthBaseline,
  adminAnalyticsGrowthLabels,
  adminAnalyticsGrowthNewUsers,
  adminAnalyticsInsights,
  adminAnalyticsKpis,
  adminAnalyticsLiveLabels,
  adminAnalyticsLiveMoments,
  adminAnalyticsLivePeaks,
  adminAnalyticsLiveSupport,
  adminAnalyticsLiveViewers,
  adminAnalyticsNotificationMetrics,
  adminAnalyticsPopularityEntities,
  adminAnalyticsPopularitySports,
  adminAnalyticsRecommendation,
  adminAnalyticsSegments,
  type AdminAnalyticsMetricRow,
  type AdminAnalyticsRankingRow
} from '@/admin/data/analytics';
import { cn } from '@/lib/utils';

const palette = {
  blue: '#4f8ff6',
  blueFill: '#dfeafe',
  green: '#78b28c',
  greenFill: '#e3f1e8',
  orange: '#e3a25a',
  orangeFill: '#f8ebda',
  coral: '#ea8068',
  coralFill: '#fde9e4',
  slate: '#8c99ac',
  slateFill: '#edf1f6',
  graphite: '#4a5a70',
  grid: '#e8edf4'
} as const;

type ChartPoint = {
  x: number;
  y: number;
};

function getSeriesPoints(
  values: number[],
  {
    width,
    height,
    top = 18,
    right = 16,
    bottom = 28,
    left = 16,
    min = 0,
    max
  }: {
    width: number;
    height: number;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    min?: number;
    max?: number;
  }
) {
  const resolvedMax = max ?? Math.max(...values, min + 1);
  const range = Math.max(1, resolvedMax - min);
  const baseline = height - bottom;
  const innerWidth = width - left - right;
  const innerHeight = baseline - top;

  return values.map((value, index) => {
    const x = values.length === 1 ? left + innerWidth / 2 : left + (index / (values.length - 1)) * innerWidth;
    const y = baseline - ((value - min) / range) * innerHeight;
    return { x, y };
  });
}

function toPolyline(points: ChartPoint[]) {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function toLinePath(points: ChartPoint[]) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}

function toAreaPath(points: ChartPoint[], baseline: number) {
  if (points.length === 0) {
    return '';
  }

  const first = points[0];
  const last = points[points.length - 1];

  return `M ${first.x} ${baseline} ${points.map((point) => `L ${point.x} ${point.y}`).join(' ')} L ${last.x} ${baseline} Z`;
}

function SectionCard({
  title,
  subtitle,
  action,
  className,
  children
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
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
      <div className="p-6">{children}</div>
    </section>
  );
}

function LegendDot({ color, muted = false }: { color: string; muted?: boolean }) {
  return <span className={cn('h-2.5 w-2.5 rounded-full', muted && 'opacity-60')} style={{ backgroundColor: color }} />;
}

function ChartLegend({
  items
}: {
  items: {
    label: string;
    color: string;
    muted?: boolean;
  }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-2 text-[0.84rem] font-medium text-slate-500">
          <LegendDot color={item.color} muted={item.muted} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function getToneClasses(tone: 'positive' | 'negative' | 'neutral') {
  switch (tone) {
    case 'positive':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'negative':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'neutral':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function getMetricTone(tone?: AdminAnalyticsMetricRow['tone']) {
  switch (tone) {
    case 'green':
      return 'bg-emerald-50 text-emerald-700';
    case 'orange':
      return 'bg-amber-50 text-amber-700';
    case 'slate':
      return 'bg-slate-100 text-slate-600';
    case 'blue':
    default:
      return 'bg-[#eef5ff] text-[#2f78d3]';
  }
}

function KpiSparkline({ id, points, accent }: { id: string; points: number[]; accent: string }) {
  const width = 170;
  const height = 44;
  const seriesPoints = getSeriesPoints(points, { width, height, top: 5, right: 4, bottom: 3, left: 4 });
  const baseline = height - 3;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-11 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-spark-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={toAreaPath(seriesPoints, baseline)} fill={`url(#${id}-spark-fill)`} />
      <polyline fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={toPolyline(seriesPoints)} />
    </svg>
  );
}

function KpiCard({
  id,
  label,
  value,
  trend,
  trendTone,
  points
}: {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendTone: 'positive' | 'negative' | 'neutral';
  points: number[];
}) {
  const accent =
    trendTone === 'positive' ? palette.blue : trendTone === 'negative' ? palette.coral : palette.slate;

  return (
    <div className="rounded-[22px] border border-black/[0.05] bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getToneClasses(trendTone))}>{trendTone === 'negative' ? 'Внимание' : trendTone === 'positive' ? 'Рост' : 'Стабильно'}</span>
      </div>
      <p className="mt-2 text-[0.8rem] text-slate-500">{trend}</p>
      <div className="mt-4 border-t border-black/[0.045] pt-3">
        <KpiSparkline id={id} points={points} accent={accent} />
      </div>
    </div>
  );
}

function GrowthChart() {
  const width = 640;
  const height = 282;
  const top = 18;
  const right = 18;
  const bottom = 36;
  const left = 46;
  const baseline = height - bottom;
  const innerWidth = width - left - right;
  const maxValue = Math.max(...adminAnalyticsGrowthBaseline, ...adminAnalyticsGrowthNewUsers.map((value, index) => value + adminAnalyticsGrowthActiveUsers[index]));
  const axisSteps = [0, 0.33, 0.66, 1];
  const slotWidth = innerWidth / adminAnalyticsGrowthLabels.length;
  const barWidth = Math.min(26, slotWidth * 0.54);
  const baselinePoints = getSeriesPoints(adminAnalyticsGrowthBaseline, { width, height, top, right, bottom, left, max: maxValue });

  return (
    <div className="space-y-4">
      <ChartLegend
        items={[
          { label: 'Новые регистрации', color: palette.blue },
          { label: 'Активные пользователи', color: palette.green },
          { label: 'Базовый уровень', color: palette.slate, muted: true }
        ]}
      />

      <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[18rem] w-full" aria-hidden="true">
          {axisSteps.map((step) => {
            const y = top + (baseline - top) * (1 - step);
            const axisValue = Math.round(maxValue * step);

            return (
              <g key={step}>
                <line x1={left} x2={width - right} y1={y} y2={y} stroke={palette.grid} strokeWidth="1" />
                <text x={left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
                  {axisValue}
                </text>
              </g>
            );
          })}

          <path d={toLinePath(baselinePoints)} fill="none" stroke={palette.slate} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {adminAnalyticsGrowthLabels.map((label, index) => {
            const x = left + slotWidth * index + slotWidth / 2;
            const activeValue = adminAnalyticsGrowthActiveUsers[index];
            const newUsersValue = adminAnalyticsGrowthNewUsers[index];
            const activeHeight = ((activeValue / maxValue) * (baseline - top));
            const newUsersHeight = ((newUsersValue / maxValue) * (baseline - top));
            const barX = x - barWidth / 2;
            const activeY = baseline - activeHeight;
            const newUsersY = activeY - newUsersHeight;

            return (
              <g key={label}>
                <rect x={barX} y={activeY} width={barWidth} height={activeHeight} rx="8" fill={palette.greenFill} />
                <rect x={barX} y={newUsersY} width={barWidth} height={newUsersHeight} rx="8" fill={palette.blue} />
                {(index === 0 || index === 3 || index === 6 || index === 9 || index === adminAnalyticsGrowthLabels.length - 1) ? (
                  <text x={x} y={height - 10} textAnchor="middle" fontSize="11" fill="#94a3b8">
                    {label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function DonationChart() {
  const width = 640;
  const height = 282;
  const top = 18;
  const right = 18;
  const bottom = 36;
  const left = 46;
  const baseline = height - bottom;
  const innerWidth = width - left - right;
  const maxBarValue = Math.max(...adminAnalyticsDonationAmounts, ...adminAnalyticsDonationAverage);
  const errorMax = Math.max(...adminAnalyticsDonationErrors) + 0.4;
  const slotWidth = innerWidth / adminAnalyticsDonationLabels.length;
  const barWidth = Math.min(24, slotWidth * 0.48);
  const errorPoints = getSeriesPoints(adminAnalyticsDonationErrors, { width, height, top, right, bottom, left, max: errorMax });
  const averagePoints = getSeriesPoints(adminAnalyticsDonationAverage, { width, height, top, right, bottom, left, max: maxBarValue });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ChartLegend items={[{ label: 'Объём поддержки', color: palette.blue }, { label: 'Ошибки платежей', color: palette.coral }]} />
        <span className="rounded-full bg-[#f5f8fd] px-3 py-1.5 text-[0.76rem] font-semibold text-slate-500">Средний объём: 15 тыс ₽</span>
      </div>

      <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[18rem] w-full" aria-hidden="true">
          {[0, 0.33, 0.66, 1].map((step) => {
            const y = top + (baseline - top) * (1 - step);
            const axisValue = `${Math.round(maxBarValue * step)}k`;

            return (
              <g key={step}>
                <line x1={left} x2={width - right} y1={y} y2={y} stroke={palette.grid} strokeWidth="1" />
                <text x={left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
                  {axisValue}
                </text>
              </g>
            );
          })}

          <path d={toLinePath(averagePoints)} fill="none" stroke={palette.graphite} strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={toLinePath(errorPoints)} fill="none" stroke={palette.coral} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          {adminAnalyticsDonationLabels.map((label, index) => {
            const x = left + slotWidth * index + slotWidth / 2;
            const value = adminAnalyticsDonationAmounts[index];
            const barHeight = (value / maxBarValue) * (baseline - top);
            const barX = x - barWidth / 2;
            const y = baseline - barHeight;

            return (
              <g key={label}>
                <rect x={barX} y={y} width={barWidth} height={barHeight} rx="8" fill={palette.blueFill} />
                <rect x={barX} y={y + barHeight * 0.18} width={barWidth} height={barHeight * 0.82} rx="8" fill={palette.blue} fillOpacity="0.92" />
                {(index === 0 || index === 3 || index === 6 || index === 9 || index === adminAnalyticsDonationLabels.length - 1) ? (
                  <text x={x} y={height - 10} textAnchor="middle" fontSize="11" fill="#94a3b8">
                    {label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function LiveActivityChart() {
  const width = 720;
  const height = 250;
  const top = 20;
  const right = 20;
  const bottom = 34;
  const left = 34;
  const baseline = height - bottom;
  const maxValue = Math.max(...adminAnalyticsLiveViewers, ...adminAnalyticsLivePeaks) + 8;
  const viewerPoints = getSeriesPoints(adminAnalyticsLiveViewers, { width, height, top, right, bottom, left, max: maxValue });
  const supportPoints = getSeriesPoints(adminAnalyticsLiveSupport, { width, height, top, right, bottom, left, max: maxValue });
  const peakPoints = getSeriesPoints(adminAnalyticsLivePeaks, { width, height, top, right, bottom, left, max: maxValue });

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_0.88fr]">
      <div className="space-y-4 rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-4">
        <ChartLegend
          items={[
            { label: 'Live-сессии', color: palette.blue },
            { label: 'Поддержка в эфире', color: palette.green },
            { label: 'Пики нагрузки', color: palette.graphite, muted: true }
          ]}
        />

        <svg viewBox={`0 0 ${width} ${height}`} className="h-[15rem] w-full" aria-hidden="true">
          {[0, 0.33, 0.66, 1].map((step) => {
            const y = top + (baseline - top) * (1 - step);

            return <line key={step} x1={left} x2={width - right} y1={y} y2={y} stroke={palette.grid} strokeWidth="1" />;
          })}

          <path d={toAreaPath(viewerPoints, baseline)} fill={palette.blueFill} fillOpacity="0.9" />
          <path d={toAreaPath(supportPoints, baseline)} fill={palette.greenFill} fillOpacity="0.85" />
          <path d={toLinePath(viewerPoints)} fill="none" stroke={palette.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d={toLinePath(supportPoints)} fill="none" stroke={palette.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={toLinePath(peakPoints)} fill="none" stroke={palette.graphite} strokeWidth="1.8" strokeOpacity="0.65" strokeLinecap="round" strokeLinejoin="round" />

          {adminAnalyticsLiveLabels.map((label, index) => {
            if (!(index === 0 || index === 2 || index === 4 || index === 6 || index === adminAnalyticsLiveLabels.length - 1)) {
              return null;
            }

            return (
              <text key={label} x={viewerPoints[index]?.x} y={height - 10} textAnchor="middle" fontSize="11" fill="#94a3b8">
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafd_100%)] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.88rem] font-semibold text-slate-800">Пиковые интервалы</p>
            <p className="mt-1 text-[0.8rem] text-slate-500">Слоты с наибольшей нагрузкой на live-flow</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-[0.76rem] font-semibold text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">Пик: 21:00</span>
        </div>

        <div className="mt-6 space-y-4">
          {adminAnalyticsLiveMoments.map((moment) => (
            <div key={moment.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-[0.86rem] font-semibold text-slate-700">{moment.label}</p>
                <p className="text-[0.82rem] text-slate-500">{moment.value} тыс / базово {moment.baseline}</p>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-[#edf1f6]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#6da8ff_0%,#4f8ff6_100%)]"
                  style={{ width: `${moment.value}%` }}
                />
                <div
                  className="absolute inset-y-0 rounded-full border-l-2 border-[#4a5a70]"
                  style={{ left: `${moment.baseline}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricListCard({
  title,
  subtitle,
  metrics
}: {
  title: string;
  subtitle: string;
  metrics: AdminAnalyticsMetricRow[];
}) {
  return (
    <SectionCard title={title} subtitle={subtitle} className="h-full">
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex items-center justify-between gap-4 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[0.68rem] font-semibold', getMetricTone(metric.tone))}>{metric.label}</span>
              </div>
              <p className="mt-2 text-[0.84rem] leading-5 text-slate-500">{metric.hint}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[1.08rem] font-semibold tracking-tight text-slate-900">{metric.value}</p>
              <p className="mt-1 text-[0.76rem] font-medium text-slate-400">{metric.delta}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function RankingCard({
  title,
  subtitle,
  rows
}: {
  title: string;
  subtitle: string;
  rows: AdminAnalyticsRankingRow[];
}) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f5f8fd] text-[1rem] font-semibold text-slate-700">{row.rank}</span>
            <div className="min-w-0">
              <p className="truncate text-[0.96rem] font-semibold text-slate-900">{row.label}</p>
              <p className="mt-1 truncate text-[0.82rem] text-slate-500">{row.meta}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.98rem] font-semibold text-slate-900">{row.value}</p>
              <span className={cn('mt-1 inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getMetricTone(row.tone))}>{row.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SegmentsCard() {
  return (
    <SectionCard title="Сегменты пользователей" subtitle="Ключевые группы аудитории по объёму и качеству активности.">
      <div className="grid gap-3 md:grid-cols-2">
        {adminAnalyticsSegments.map((segment) => (
          <div
            key={segment.id}
            className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.88rem] font-semibold text-slate-800">{segment.label}</p>
                <p className="mt-1 text-[0.82rem] leading-5 text-slate-500">{segment.note}</p>
              </div>
              <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[0.72rem] font-semibold text-[#2f78d3]">{segment.delta}</span>
            </div>
            <p className="mt-4 text-[1.5rem] font-semibold tracking-tight text-slate-900">{segment.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function getSeverityClasses(severity: 'high' | 'medium' | 'low') {
  switch (severity) {
    case 'high':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'medium':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'low':
      return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

function AnomaliesCard() {
  return (
    <SectionCard title="Аномалии" subtitle="Сигналы, которые требуют ручной проверки и быстрых действий.">
      <div className="space-y-3">
        {adminAnalyticsAnomalies.map((item) => (
          <div
            key={item.id}
            className="rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[0.95rem] font-semibold text-slate-900">{item.title}</p>
              <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getSeverityClasses(item.severity))}>
                {item.severity === 'high' ? 'Высокий риск' : item.severity === 'medium' ? 'Средний риск' : 'Наблюдение'}
              </span>
            </div>
            <p className="mt-2 text-[0.84rem] leading-6 text-slate-500">{item.description}</p>
            <p className="mt-3 text-[0.82rem] font-semibold text-slate-700">{item.impact}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function InsightsCard() {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_18px_40px_rgba(79,143,246,0.12)]">
      <div className="border-b border-[#e2ebfb] px-6 py-5">
        <h2 className="text-[1.16rem] font-semibold tracking-tight text-slate-900">Выводы за период</h2>
        <p className="mt-1 text-sm text-slate-500">Короткая управленческая сводка по росту, донатам и вовлечённости.</p>
      </div>

      <div className="space-y-4 p-6">
        {adminAnalyticsInsights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-[18px] border border-[#e2ebfb] bg-white/90 px-4 py-4 shadow-[0_12px_24px_rgba(79,143,246,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.92rem] font-semibold text-slate-900">{insight.title}</p>
              <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[0.74rem] font-semibold text-[#2f78d3]">{insight.value}</span>
            </div>
            <p className="mt-2 text-[0.84rem] leading-6 text-slate-600">{insight.note}</p>
          </div>
        ))}

        <div className="rounded-[18px] border border-[#d7e4fb] bg-[linear-gradient(180deg,#eef5ff_0%,#e8f1fe_100%)] px-4 py-4">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#2f78d3]">Фокус</p>
          <p className="mt-2 text-[0.92rem] leading-6 text-slate-700">{adminAnalyticsRecommendation}</p>
        </div>
      </div>
    </section>
  );
}

export function AdminAnalyticsScreen() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {adminAnalyticsKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            id={kpi.id}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendTone={kpi.trendTone}
            points={kpi.points}
          />
        ))}
      </section>

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.55fr)_23rem]">
        <div className="space-y-6">
          <div className="grid gap-6 2xl:grid-cols-2">
            <SectionCard title="Рост пользователей" subtitle="Новые регистрации, активная аудитория и базовый уровень.">
              <GrowthChart />
            </SectionCard>

            <SectionCard title="Динамика донатов" subtitle="Объём поддержки по дням и поведение платёжного потока.">
              <DonationChart />
            </SectionCard>
          </div>

          <SectionCard title="Live-активность" subtitle="Поведение аудитории в эфире, поддержка и пиковые интервалы.">
            <LiveActivityChart />
          </SectionCard>

          <div className="grid gap-6 xl:grid-cols-3">
            <MetricListCard title="Уведомления" subtitle="Эффективность коммуникаций и возвратов в продукт." metrics={adminAnalyticsNotificationMetrics} />
            <MetricListCard title="Путь к донату" subtitle="Эффективность продуктового пути от события до поддержки." metrics={adminAnalyticsFunnelMetrics} />
            <MetricListCard title="Вовлечённость" subtitle="Повторные действия и глубина взаимодействия внутри FUNDON." metrics={adminAnalyticsEngagementMetrics} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_0.9fr]">
            <SegmentsCard />
            <AnomaliesCard />
          </div>
        </div>

        <div className="space-y-6">
          <RankingCard title="Популярные виды спорта" subtitle="Что собирает наибольшую поддержку и активность." rows={adminAnalyticsPopularitySports} />
          <RankingCard title="Популярные спортсмены и события" subtitle="Лидеры по интересу, возвратам и донатной активности." rows={adminAnalyticsPopularityEntities} />
          <InsightsCard />
        </div>
      </section>
    </div>
  );
}
