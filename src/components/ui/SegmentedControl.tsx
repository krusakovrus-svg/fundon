'use client';

import { cn } from '@/lib/utils';

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: Array<SegmentedOption<T>>;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ value, options, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div className={cn('inline-flex rounded-[1.15rem] border border-black/[0.08] bg-[rgba(245,247,251,0.9)] p-1 dark:border-white/8 dark:bg-white/6', className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-[0.95rem] px-3 py-2 text-sm font-semibold transition',
              active
                ? 'bg-white text-text-primary shadow-[0_10px_20px_rgba(15,23,42,0.08)] dark:bg-white/12 dark:shadow-none'
                : 'text-text-secondary hover:text-text-primary dark:hover:text-white'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
