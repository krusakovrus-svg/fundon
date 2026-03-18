import { cn } from '@/lib/utils';

export function SectionCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn('app-card app-section-card', className)}>{children}</section>;
}
