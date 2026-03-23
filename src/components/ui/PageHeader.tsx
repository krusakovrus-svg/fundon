import { cn } from '@/lib/utils';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
  align?: 'left' | 'right';
}

export function PageHeader({ eyebrow, title, description, badge, actions, align = 'left' }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className={cn('min-w-0', align === 'right' && 'text-right')}>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{eyebrow}</p>
        ) : null}
        <h1
          className={cn(
            'text-[1.68rem] font-semibold leading-[1.02] tracking-tight text-text-primary dark:text-white/[0.96]',
            eyebrow && 'mt-2'
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-[22rem] text-[0.92rem] leading-6 text-text-secondary dark:text-white/[0.58]">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-start gap-2 self-start">
        {badge ? <span className="app-pill">{badge}</span> : null}
        {actions}
      </div>
    </div>
  );
}
