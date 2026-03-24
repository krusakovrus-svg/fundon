const STORAGE_KEY = 'fightpulse-support-preferences';

export const MIN_SUPPORT_AMOUNT = 10;
export const DEFAULT_SUPPORT_AMOUNT = 10;
export const DEFAULT_QUICK_SUPPORT_AMOUNTS = [10, 50, 100, 500];
export const SUPPORT_AMOUNT_SUGGESTIONS = [10, 20, 50, 100, 250, 500, 1000];
export const QUICK_SUPPORT_AMOUNT_SLOTS = 4;

export interface SupportPreferences {
  defaultAmount: number;
  quickAmounts: number[];
}

function parseAmount(value: number | string | null | undefined) {
  const parsed = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.max(MIN_SUPPORT_AMOUNT, Math.min(100000, Math.round(parsed)));
}

function fillQuickAmounts(values: number[]) {
  const next = [...values];

  for (const fallback of DEFAULT_QUICK_SUPPORT_AMOUNTS) {
    if (next.length >= QUICK_SUPPORT_AMOUNT_SLOTS) {
      break;
    }

    if (!next.includes(fallback)) {
      next.push(fallback);
    }
  }

  return next.slice(0, QUICK_SUPPORT_AMOUNT_SLOTS);
}

export function createSupportPreferences(input?: Partial<SupportPreferences>): SupportPreferences {
  const defaultAmount = parseAmount(input?.defaultAmount) ?? DEFAULT_SUPPORT_AMOUNT;
  const quickSource = input?.quickAmounts ?? DEFAULT_QUICK_SUPPORT_AMOUNTS;
  const quickAmounts = fillQuickAmounts(
    Array.from(
      new Set(
        quickSource
          .map((value) => parseAmount(value))
          .filter((value): value is number => value !== null)
      )
    )
  );

  const nextQuickAmounts = fillQuickAmounts([
    defaultAmount,
    ...quickAmounts.filter((amount) => amount !== defaultAmount)
  ]);

  return {
    defaultAmount,
    quickAmounts: nextQuickAmounts
  };
}

export function readSupportPreferences() {
  if (typeof window === 'undefined') {
    return createSupportPreferences();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return createSupportPreferences();
    }

    return createSupportPreferences(JSON.parse(raw) as Partial<SupportPreferences>);
  } catch {
    return createSupportPreferences();
  }
}

export function writeSupportPreferences(input: Partial<SupportPreferences>) {
  if (typeof window === 'undefined') {
    return createSupportPreferences(input);
  }

  const next = createSupportPreferences(input);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
