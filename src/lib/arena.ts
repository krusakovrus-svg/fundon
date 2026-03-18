import type { LiveActivityItem, LiveMoment } from '@/types';

export function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export function calculateSupportSplit(leftTotal: number, rightTotal: number) {
  const total = leftTotal + rightTotal;

  if (total === 0) {
    return {
      leftPercent: 50,
      rightPercent: 50
    };
  }

  const leftPercent = Math.round((leftTotal / total) * 100);
  const rightPercent = Math.max(0, 100 - leftPercent);

  return { leftPercent, rightPercent };
}

export function getHeatState(value: number) {
  if (value < 35) return 'fanHeatCalm' as const;
  if (value < 55) return 'fanHeatRising' as const;
  if (value < 75) return 'fanHeatHot' as const;
  if (value < 90) return 'fanHeatExtreme' as const;
  return 'fanHeatPeak' as const;
}

export function getLocalizedMomentLabel(moment: LiveMoment, language: 'ru' | 'en') {
  return language === 'ru' ? moment.labelRu : moment.label;
}

export function getLocalizedActivityLabel(activity: LiveActivityItem, language: 'ru' | 'en') {
  return language === 'ru' ? activity.labelRu : activity.label;
}
