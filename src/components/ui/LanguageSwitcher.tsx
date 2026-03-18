'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { cn } from '@/lib/utils';
import type { Language } from '@/types';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <SegmentedControl<Language>
      value={language}
      onChange={setLanguage}
      options={[
        { value: 'ru', label: 'RU' },
        { value: 'en', label: 'EN' }
      ]}
      className={cn('w-full justify-between', className)}
    />
  );
}
