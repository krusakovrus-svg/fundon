import type { Language } from '@/types';

function getLocale(language: Language) {
  return language === 'ru' ? 'ru-RU' : 'en-US';
}

export function formatCount(value: number, language: Language = 'ru') {
  return new Intl.NumberFormat(getLocale(language)).format(value);
}

export function formatCurrency(
  value: number,
  language: Language = 'ru',
  options?: { compact?: boolean; maximumFractionDigits?: number }
) {
  const compact = options?.compact ?? false;
  const maximumFractionDigits = options?.maximumFractionDigits ?? (compact ? 1 : 0);
  const locale = getLocale(language);

  const formatted = new Intl.NumberFormat(locale, {
    notation: compact ? 'compact' : 'standard',
    compactDisplay: compact ? 'short' : undefined,
    maximumFractionDigits
  }).format(value);

  return language === 'ru' ? `${formatted} ₽` : `₽${formatted}`;
}
