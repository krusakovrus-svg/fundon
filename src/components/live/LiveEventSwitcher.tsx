'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

interface LiveEventSwitcherItem {
  id: string;
  sportLabel: string;
  headline: string;
  stageLabel?: string;
}

interface LiveEventSwitcherProps {
  items: LiveEventSwitcherItem[];
  activeId: string;
  onSelect: (eventId: string) => void;
  label: string;
}

export function LiveEventSwitcher({ items, activeId, onSelect, label }: LiveEventSwitcherProps) {
  const { t } = useLanguage();

  if (items.length <= 1) return null;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">{label}</p>
        <span className="text-[0.78rem] font-medium text-text-muted">{items.length}</span>
      </div>

      <div className="-mx-1 overflow-x-auto px-1">
        <div className="flex min-w-max gap-2.5">
          {items.map((item) => {
            const active = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  'min-w-[13rem] rounded-[1.2rem] border px-3.5 py-3 text-left transition',
                  active
                    ? 'border-accent-orange/35 bg-accent-orange/10 shadow-[0_12px_24px_rgba(255,124,65,0.14)]'
                    : 'border-border bg-surface-muted text-text-secondary'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    {item.sportLabel}
                  </p>
                  <span className="app-pill shrink-0">{t('liveStatus')}</span>
                </div>
                <p className="mt-2 truncate text-[1rem] font-semibold tracking-tight text-text-primary">{item.headline}</p>
                {item.stageLabel ? (
                  <p className="mt-1 truncate text-[0.85rem] text-text-secondary">{item.stageLabel}</p>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
