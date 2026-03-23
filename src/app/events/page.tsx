import dynamic from 'next/dynamic';

const EventsScreen = dynamic(() => import('@/components/events/EventsScreen').then((mod) => mod.EventsScreen), {
  ssr: false,
  loading: () => (
    <div className="app-page space-y-[1.125rem]">
      <div className="h-14 rounded-[1.4rem] border border-black/[0.04] bg-white/[0.74] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-20 rounded-[1.2rem] border border-black/[0.04] bg-white/[0.82] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
        <div className="h-20 rounded-[1.2rem] border border-black/[0.04] bg-white/[0.82] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
        <div className="h-20 rounded-[1.2rem] border border-black/[0.04] bg-white/[0.82] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      </div>
      <div className="h-14 rounded-[1.25rem] border border-black/[0.04] bg-white/[0.78] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      <div className="space-y-3">
        <div className="h-24 rounded-[1.35rem] border border-black/[0.04] bg-white/[0.86] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
        <div className="h-24 rounded-[1.35rem] border border-black/[0.04] bg-white/[0.86] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
        <div className="h-24 rounded-[1.35rem] border border-black/[0.04] bg-white/[0.86] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      </div>
    </div>
  )
});

export default function EventsPage() {
  return <EventsScreen />;
}
