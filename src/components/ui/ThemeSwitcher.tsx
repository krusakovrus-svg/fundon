'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  className?: string;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2.8v2.4" strokeLinecap="round" />
      <path d="M12 18.8v2.4" strokeLinecap="round" />
      <path d="m5.5 5.5 1.7 1.7" strokeLinecap="round" />
      <path d="m16.8 16.8 1.7 1.7" strokeLinecap="round" />
      <path d="M2.8 12h2.4" strokeLinecap="round" />
      <path d="M18.8 12h2.4" strokeLinecap="round" />
      <path d="m5.5 18.5 1.7-1.7" strokeLinecap="round" />
      <path d="m16.8 7.2 1.7-1.7" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M18.5 14.8a7.2 7.2 0 0 1-9.3-9.3 7.9 7.9 0 1 0 9.3 9.3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { language } = useLanguage();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const lightLabel = language === 'ru' ? '\u0421\u0432\u0435\u0442\u043b\u0430\u044f \u0442\u0435\u043c\u0430' : 'Light theme';
  const darkLabel = language === 'ru' ? '\u0422\u0451\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430' : 'Dark theme';

  return (
    <SegmentedControl<'dark' | 'light'>
      value={currentTheme}
      onChange={setTheme}
      options={[
        {
          value: 'light',
          label: (
            <span className="flex items-center justify-center">
              <SunIcon />
              <span className="sr-only">{lightLabel}</span>
            </span>
          )
        },
        {
          value: 'dark',
          label: (
            <span className="flex items-center justify-center">
              <MoonIcon />
              <span className="sr-only">{darkLabel}</span>
            </span>
          )
        }
      ]}
      className={cn('w-full justify-between', className)}
    />
  );
}
