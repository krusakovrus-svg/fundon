import {
  adminAlerts,
  adminAnalyticsBars,
  adminAnalyticsSegments,
  adminKpis,
  adminLiveEvents,
  adminQuickActions,
  adminRecentDonations
} from '@/admin/data/dashboard';
import { cn } from '@/lib/utils';

function SectionCard({
  title,
  subtitle,
  action,
  className,
  children
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('rounded-[24px] border border-black/[0.05] bg-white/88 shadow-[0_18px_40px_rgba(15,23,42,0.06)]', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-black/[0.04] px-6 py-5">
        <div>
          <h2 className="text-[1.2rem] font-semibold tracking-tight text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function Sparkline({ points, accent }: { points: number[]; accent: string }) {
  const width = 170;
  const height = 46;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);

  const coordinates = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-12 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-fill-${accent}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={accent} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" points={coordinates} />
      <polyline
        fill={`url(#spark-fill-${accent})`}
        stroke="none"
        points={`0,${height} ${coordinates} ${width},${height}`}
      />
    </svg>
  );
}

function LiveStatusDot({ sport }: { sport: string }) {
  const tone =
    sport === 'Футбол' ? 'bg-emerald-500' : sport === 'Бокс' ? 'bg-amber-500' : sport === 'Хоккей' ? 'bg-sky-500' : 'bg-slate-400';

  return <span className={cn('mt-[0.32rem] h-2.5 w-2.5 rounded-full', tone)} />;
}

function AlertDot({ kind }: { kind: 'critical' | 'warning' | 'info' }) {
  const tone =
    kind === 'critical'
      ? 'bg-[#ff7d6e] text-[#c23d2e]'
      : kind === 'warning'
        ? 'bg-[#ffdca8] text-[#9b6a08]'
        : 'bg-[#d7ebff] text-[#3479be]';

  return <span className={cn('mt-[0.28rem] h-3 w-3 rounded-full', tone)} />;
}

export function AdminDashboardScreen() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-5 gap-4">
        {adminKpis.map((kpi) => {
          const accent =
            kpi.accent === 'blue'
              ? '#5d92f7'
              : kpi.accent === 'orange'
                ? '#ffb35a'
                : kpi.accent === 'green'
                  ? '#6fc28a'
                  : '#7b8ff4';

          return (
            <div
              key={kpi.id}
              className="rounded-[22px] border border-black/[0.05] bg-white/88 px-5 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.05)]"
            >
              <p className="text-[0.9rem] font-medium text-slate-500">{kpi.label}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[2rem] font-semibold tracking-tight text-slate-900">{kpi.value}</p>
                  <p className="mt-1 text-[0.8rem] font-medium text-slate-500">{kpi.trend}</p>
                </div>
                <div className="w-[42%]">
                  <Sparkline points={kpi.points} accent={accent} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-[1.2fr_0.95fr] gap-6">
        <div className="space-y-6">
          <SectionCard title="Live-события" subtitle="Оперативное управление текущими трансляциями">
            <div className="space-y-4">
              {adminLiveEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[1.04rem] font-semibold tracking-tight text-slate-900">{event.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <LiveStatusDot sport={event.sport} />
                        {event.sport} · {event.status}
                      </span>
                      <span>{event.participants}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{event.supportVolume}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    <button
                      type="button"
                      className="rounded-[14px] border border-[#dbe7fb] bg-[#eef5ff] px-4 py-2.5 text-[0.9rem] font-semibold text-[#2f78d3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                    >
                      Управлять
                    </button>
                    <button
                      type="button"
                      className="rounded-[14px] border border-black/[0.06] bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-slate-700"
                    >
                      Завершить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Оповещения" subtitle="Сигналы модерации и системные события">
            <div className="space-y-3">
              {adminAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfd_100%)] px-4 py-3.5"
                >
                  <AlertDot kind={alert.kind} />
                  <div className="min-w-0">
                    <p className="text-[0.96rem] font-semibold text-slate-900">{alert.title}</p>
                    <p className="mt-1 text-[0.88rem] leading-relaxed text-slate-500">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Аналитика" subtitle="Динамика новых пользователей и вовлечения">
            <div className="h-[13rem] rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f9fc_100%)] px-4 py-5">
              <div className="flex h-full items-end gap-3">
                {adminAnalyticsBars.map((value, index) => (
                  <div key={index} className="flex h-full flex-1 flex-col justify-end">
                    <div
                      className="rounded-t-[12px] bg-[linear-gradient(180deg,#6ca7ff_0%,#4f8ff6_100%)]"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Последние донаты" subtitle="Быстрый просмотр текущей поддержки">
            <div className="space-y-3">
              {adminRecentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[18px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfd_100%)] px-4 py-3.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f7dac9_0%,#e2b49d_100%)] text-[0.88rem] font-semibold text-slate-700">
                      {donation.avatar}
                    </div>
                    <p className="truncate text-[0.95rem] font-semibold text-slate-900">{donation.user}</p>
                  </div>
                  <p className="truncate text-[0.92rem] font-medium text-slate-700">{donation.athlete}</p>
                  <p className="text-[1rem] font-semibold tracking-tight text-slate-900">{donation.amount}</p>
                  <p className="truncate text-[0.88rem] text-slate-500">{donation.event}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.76rem] font-medium text-slate-600">{donation.status}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Рост и распределение" subtitle="Новые пользователи и интерес по видам спорта">
            <div className="grid grid-cols-[1fr_15rem] gap-5">
              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f9fc_100%)] px-4 py-5">
                <p className="text-sm font-medium text-slate-500">Новые пользователи</p>
                <p className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-900">1,250 <span className="text-[1rem] text-emerald-500">+18%</span></p>

                <div className="mt-5 flex items-end gap-3">
                  {adminAnalyticsBars.map((value, index) => (
                    <div key={index} className="flex h-28 flex-1 flex-col justify-end">
                      <div
                        className="rounded-t-[10px] bg-[linear-gradient(180deg,#7bb3ff_0%,#4f8ff6_100%)]"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f9fc_100%)] px-4 py-5">
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(${adminAnalyticsSegments.map((segment, index) => `${segment.color} 0 ${adminAnalyticsSegments.slice(0, index + 1).reduce((sum, current) => sum + current.value, 0)}%`).join(', ')})` }}>
                  <div className="h-20 w-20 rounded-full bg-white" />
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
            </div>
          </SectionCard>

          <SectionCard title="Быстрые действия" subtitle="Частые операционные сценарии">
            <div className="space-y-3">
              {adminQuickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-center rounded-[16px] px-4 py-3.5 text-[0.95rem] font-semibold transition',
                    action.priority === 'primary'
                      ? 'bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]'
                      : 'border border-black/[0.05] bg-white text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}
