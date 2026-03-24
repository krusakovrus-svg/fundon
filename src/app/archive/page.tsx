import dynamic from 'next/dynamic';

const ArchiveScreen = dynamic(() => import('@/components/archive/ArchiveScreen').then((mod) => mod.ArchiveScreen), {
  ssr: false,
  loading: () => (
    <div className="app-page space-y-4">
      <div className="h-20 rounded-[1.4rem] border border-black/[0.04] bg-white/[0.78] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      <div className="h-16 rounded-[1.3rem] border border-black/[0.04] bg-white/[0.82] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      <div className="h-14 rounded-[1.25rem] border border-black/[0.04] bg-white/[0.78] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      <div className="space-y-3">
        <div className="h-48 rounded-[1.35rem] border border-black/[0.04] bg-white/[0.86] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
        <div className="h-48 rounded-[1.35rem] border border-black/[0.04] bg-white/[0.86] shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.06] dark:bg-white/[0.05]" />
      </div>
    </div>
  )
});

export default function ArchivePage() {
  return <ArchiveScreen />;
}
