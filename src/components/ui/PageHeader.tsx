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
        {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">{eyebrow}</p> : null}
        <h1 className={cn('text-[2rem] font-semibold leading-[1.02] tracking-tight text-text-primary', eyebrow && 'mt-2')}>
          {title}
        </h1>
        {description ? <p className="mt-2 max-w-[22rem] text-sm leading-6 text-text-secondary">{description}</p> : null}
      </div>
      <div className="flex shrink-0 items-start gap-2 self-start">
        {badge ? <span className="app-pill">{badge}</span> : null}
        {actions}
      </div>
    </div>
  );
}
