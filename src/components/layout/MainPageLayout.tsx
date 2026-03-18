import { cn } from '@/lib/utils';

export function MainPageLayout({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('app-page space-y-4', className)}>{children}</div>;
}
