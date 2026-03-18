'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <SegmentedControl<'dark' | 'light'>
      value={currentTheme}
      onChange={setTheme}
      options={[
        { value: 'dark', label: t('dark') },
        { value: 'light', label: t('light') }
      ]}
      className={cn('w-full justify-between', className)}
    />
  );
}
