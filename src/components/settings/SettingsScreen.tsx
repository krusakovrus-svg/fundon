'use client';

import { useEffect, useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { formatCurrency } from '@/lib/format';
import {
  DEFAULT_SUPPORT_AMOUNT,
  DEFAULT_QUICK_SUPPORT_AMOUNTS,
  MIN_SUPPORT_AMOUNT,
  QUICK_SUPPORT_AMOUNT_SLOTS,
  SUPPORT_AMOUNT_SUGGESTIONS,
  createSupportPreferences,
  readSupportPreferences,
  writeSupportPreferences
} from '@/lib/supportPreferences';
import { cn } from '@/lib/utils';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'relative inline-flex h-8 w-14 items-center rounded-full border transition',
        checked
          ? 'border-[rgba(var(--accent-orange),0.18)] bg-[rgba(var(--accent-orange),0.12)]'
          : 'border-black/[0.06] bg-[rgba(247,249,252,0.84)] dark:border-white/[0.08] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))]'
      )}
    >
      <span
        className={cn(
          'absolute left-1 inline-flex h-6 w-6 rounded-full bg-white shadow-[0_8px_18px_rgba(15,23,42,0.10)] transition dark:bg-white/[0.92]',
          checked && 'translate-x-6'
        )}
      />
    </button>
  );
}

function PreferenceRow({
  title,
  description,
  control
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.12rem] border border-black/[0.045] bg-[rgba(247,249,252,0.80)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="min-w-0">
        <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">{title}</p>
        <p className="mt-1 text-[0.81rem] leading-5 text-text-secondary dark:text-white/[0.56]">{description}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export function SettingsScreen() {
  const { language, t } = useLanguage();
  const isRussian = language === 'ru';
  const [liveAlerts, setLiveAlerts] = useState(true);
  const [bigSupportAlerts, setBigSupportAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [confirmLargeSupport, setConfirmLargeSupport] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [supportSettingsLoaded, setSupportSettingsLoaded] = useState(false);
  const [defaultSupportAmount, setDefaultSupportAmount] = useState(DEFAULT_SUPPORT_AMOUNT);
  const [defaultSupportDraft, setDefaultSupportDraft] = useState(String(DEFAULT_SUPPORT_AMOUNT));
  const [quickSupportAmounts, setQuickSupportAmounts] = useState<number[]>(DEFAULT_QUICK_SUPPORT_AMOUNTS);
  const [quickSupportDrafts, setQuickSupportDrafts] = useState<string[]>(DEFAULT_QUICK_SUPPORT_AMOUNTS.map(String));

  const sectionCardClass =
    'border border-black/[0.045] bg-white/[0.88] shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.90),rgba(13,18,30,0.84))] dark:shadow-[0_18px_30px_rgba(2,6,23,0.20)]';
  const panelClass =
    'rounded-[1.2rem] border border-black/[0.045] bg-[rgba(247,249,252,0.80)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(34,42,56,0.94),rgba(22,30,43,0.92))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]';

  const labels = {
    appearanceTitle: isRussian ? '\u0412\u043d\u0435\u0448\u043d\u0438\u0439 \u0432\u0438\u0434 \u0438 \u044f\u0437\u044b\u043a' : 'Appearance and language',
    appearanceBody: isRussian
      ? '\u042f\u0437\u044b\u043a \u0438 \u0442\u0435\u043c\u0430 \u0434\u043e\u043b\u0436\u043d\u044b \u043e\u0449\u0443\u0449\u0430\u0442\u044c\u0441\u044f \u043a\u0430\u043a \u043e\u0434\u0438\u043d \u0441\u043f\u043e\u043a\u043e\u0439\u043d\u044b\u0439 consumer-\u043e\u043f\u044b\u0442 \u0432\u043e \u0432\u0441\u0435\u043c \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438.'
      : 'Language and theme should feel like one calm consumer experience across the app.',
    alertsTitle: isRussian ? '\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f' : 'Notifications',
    alertsBody: isRussian
      ? '\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0441\u0442\u0430\u0440\u0442\u0430\u043c\u0438 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0445 \u044d\u0444\u0438\u0440\u043e\u0432, \u043a\u0440\u0443\u043f\u043d\u044b\u043c\u0438 \u0432\u0441\u043f\u043b\u0435\u0441\u043a\u0430\u043c\u0438 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 \u0438 daily-\u0441\u0432\u043e\u0434\u043a\u043e\u0439.'
      : 'Manage favorite starts, support spikes, and the daily digest.',
    supportTitle: isRussian ? '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 \u0438 \u043f\u043b\u0430\u0442\u0435\u0436\u0438' : 'Support and payments',
    supportBody: isRussian
      ? '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e, \u0441\u0432\u043e\u0438 \u0431\u044b\u0441\u0442\u0440\u044b\u0435 \u043a\u043d\u043e\u043f\u043a\u0438 \u0432 \u044d\u0444\u0438\u0440\u0435 \u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u043a\u0440\u0443\u043f\u043d\u043e\u0439 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438.'
      : 'Choose a default support amount, configure live quick amounts, and confirm large donations.',
    securityTitle: isRussian ? '\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c' : 'Security',
    securityBody: isRussian
      ? '\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0434\u043b\u044f \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430 \u0438 \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f.'
      : 'Quick protection checks for wallet and profile access.'
  };

  useEffect(() => {
    const preferences = readSupportPreferences();
    setDefaultSupportAmount(preferences.defaultAmount);
    setDefaultSupportDraft(String(preferences.defaultAmount));
    setQuickSupportAmounts(preferences.quickAmounts);
    setQuickSupportDrafts(preferences.quickAmounts.map(String));
    setSupportSettingsLoaded(true);
  }, []);

  useEffect(() => {
    if (!supportSettingsLoaded) {
      return;
    }

    writeSupportPreferences({
      defaultAmount: defaultSupportAmount,
      quickAmounts: quickSupportAmounts
    });
  }, [defaultSupportAmount, quickSupportAmounts, supportSettingsLoaded]);

  const syncSupportSettings = (nextDefaultAmount: number, nextQuickAmounts: number[]) => {
    const nextPreferences = createSupportPreferences({
      defaultAmount: nextDefaultAmount,
      quickAmounts: nextQuickAmounts
    });

    setDefaultSupportAmount(nextPreferences.defaultAmount);
    setDefaultSupportDraft(String(nextPreferences.defaultAmount));
    setQuickSupportAmounts(nextPreferences.quickAmounts);
    setQuickSupportDrafts(nextPreferences.quickAmounts.map(String));
  };

  const applyDefaultSupportAmount = (value: string) => {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < MIN_SUPPORT_AMOUNT) {
      setDefaultSupportDraft(String(defaultSupportAmount));
      return;
    }

    syncSupportSettings(parsed, quickSupportAmounts);
  };

  const handleQuickAmountDraftChange = (index: number, value: string) => {
    setQuickSupportDrafts((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const commitQuickAmountDraft = (index: number) => {
    const parsed = Number(quickSupportDrafts[index]);

    if (!Number.isFinite(parsed) || parsed < MIN_SUPPORT_AMOUNT) {
      setQuickSupportDrafts((current) => {
        const next = [...current];
        next[index] = String(quickSupportAmounts[index] ?? DEFAULT_QUICK_SUPPORT_AMOUNTS[index] ?? DEFAULT_SUPPORT_AMOUNT);
        return next;
      });
      return;
    }

    const nextQuickAmounts = [...quickSupportAmounts];
    nextQuickAmounts[index] = parsed;
    syncSupportSettings(defaultSupportAmount, nextQuickAmounts);
  };

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader eyebrow={t('settings')} title={t('settingsTitle')} description={t('settingsHint')} badge="Mobile" />

      <SectionCard className={cn(sectionCardClass, 'space-y-4 px-4 py-4')}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{labels.appearanceTitle}</p>
          <p className="mt-2 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{labels.appearanceBody}</p>
        </div>

        <div className="grid gap-3">
          <div className={panelClass}>
            <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">{t('settingsLanguageLabel')}</p>
            <p className="mt-1 text-[0.82rem] text-text-secondary dark:text-white/[0.56]">{t('language')}</p>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">{t('settingsThemeLabel')}</p>
            <p className="mt-1 text-[0.82rem] text-text-secondary dark:text-white/[0.56]">{t('themeSystemCaption')}</p>
            <div className="mt-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'space-y-4 px-4 py-4')}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{labels.alertsTitle}</p>
          <p className="mt-2 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{labels.alertsBody}</p>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? '\u042d\u0444\u0438\u0440\u044b \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e' : 'Favorite live streams'}
            description={isRussian ? '\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0441\u0442\u0430\u0440\u0442 \u044d\u0444\u0438\u0440\u0430 \u0438 \u0437\u0430\u043c\u0435\u0442\u043d\u044b\u0435 \u0432\u0441\u043f\u043b\u0435\u0441\u043a\u0438 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438.' : 'Show live starts and major support swings.'}
            control={<Toggle checked={liveAlerts} onChange={() => setLiveAlerts((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? '\u041a\u0440\u0443\u043f\u043d\u0430\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430' : 'Large support alerts'}
            description={isRussian ? '\u041e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u0441\u0438\u0433\u043d\u0430\u043b \u0434\u043b\u044f \u0434\u043e\u043d\u0430\u0442\u043e\u0432 \u0432\u044b\u0448\u0435 \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0443\u0440\u043e\u0432\u043d\u044f.' : 'Separate signal for unusually large support.'}
            control={<Toggle checked={bigSupportAlerts} onChange={() => setBigSupportAlerts((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? '\u0415\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u0430\u044f \u0441\u0432\u043e\u0434\u043a\u0430' : 'Daily digest'}
            description={isRussian ? '\u0421\u043e\u0431\u0438\u0440\u0430\u0442\u044c \u043a\u0440\u0430\u0442\u043a\u0443\u044e \u0441\u0432\u043e\u0434\u043a\u0443 \u043f\u043e \u044d\u0444\u0438\u0440\u0430\u043c \u0438 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044f.' : 'Receive a compact daily recap of activity.'}
            control={<Toggle checked={dailyDigest} onChange={() => setDailyDigest((value) => !value)} />}
          />
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'space-y-4 px-4 py-4')}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{labels.supportTitle}</p>
          <p className="mt-2 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{labels.supportBody}</p>
        </div>

        <div className={panelClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">
                {isRussian ? 'Сумма по умолчанию' : 'Default amount'}
              </p>
              <p className="mt-1 text-[0.82rem] text-text-secondary dark:text-white/[0.56]">
                {isRussian ? 'Подставим её в поддержку и покажем среди быстрых кнопок в эфире.' : 'We preselect it for support and keep it visible in live quick amounts.'}
              </p>
            </div>
            <span className="rounded-full border border-[rgba(var(--accent-orange),0.14)] bg-[rgba(var(--accent-orange),0.08)] px-3 py-1.5 text-[0.78rem] font-semibold text-text-primary dark:text-white/[0.92]">
              {formatCurrency(defaultSupportAmount, language)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUPPORT_AMOUNT_SUGGESTIONS.map((amount) => {
              const active = amount === defaultSupportAmount;

              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => syncSupportSettings(amount, quickSupportAmounts)}
                  className={cn(
                    'rounded-full border px-3 py-2 text-[0.82rem] font-semibold transition',
                    active
                      ? 'border-[rgba(var(--accent-orange),0.18)] bg-[rgba(var(--accent-orange),0.10)] text-text-primary shadow-[0_10px_18px_rgba(255,116,55,0.10)] dark:text-white'
                      : 'border-black/[0.05] bg-white/78 text-text-secondary hover:bg-white dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(31,39,53,0.94),rgba(21,28,40,0.90))] dark:text-white/[0.68]'
                  )}
                >
                  {formatCurrency(amount, language)}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1rem] border border-black/[0.04] bg-white/72 p-3 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(29,37,51,0.94),rgba(20,27,39,0.90))]">
            <p className="text-[0.74rem] font-medium text-text-secondary dark:text-white/[0.56]">
              {isRussian ? 'Своя сумма' : 'Custom amount'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={MIN_SUPPORT_AMOUNT}
                step="1"
                inputMode="numeric"
                value={defaultSupportDraft}
                onChange={(event) => setDefaultSupportDraft(event.target.value)}
                onBlur={() => applyDefaultSupportAmount(defaultSupportDraft)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    applyDefaultSupportAmount(defaultSupportDraft);
                  }
                }}
                placeholder={isRussian ? 'Например, 250' : 'For example, 250'}
                className="min-w-0 flex-1 rounded-[0.95rem] border border-black/[0.05] bg-white/88 px-3 py-2.5 text-[0.92rem] font-semibold text-text-primary outline-none placeholder:text-text-muted dark:border-white/[0.06] dark:bg-[rgba(12,18,28,0.48)] dark:text-white/[0.92] dark:placeholder:text-white/[0.32]"
              />
              <button
                type="button"
                onClick={() => applyDefaultSupportAmount(defaultSupportDraft)}
                className="rounded-[0.95rem] border border-[rgba(var(--accent-orange),0.18)] bg-[rgba(var(--accent-orange),0.10)] px-3 py-2.5 text-[0.8rem] font-semibold text-text-primary transition hover:bg-[rgba(var(--accent-orange),0.14)] dark:text-white"
              >
                {isRussian ? 'Применить' : 'Apply'}
              </button>
            </div>
          </div>
        </div>

        <div className={panelClass}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">
                {isRussian ? 'Быстрые суммы в эфире' : 'Live quick amounts'}
              </p>
              <p className="mt-1 text-[0.82rem] text-text-secondary dark:text-white/[0.56]">
                {isRussian ? 'Эти кнопки появятся прямо в блоке «Битва поддержки».' : 'These buttons appear directly in the support battle block.'}
              </p>
            </div>
            <span className="rounded-full border border-black/[0.05] bg-white/72 px-3 py-1.5 text-[0.72rem] font-semibold text-text-secondary dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-white/[0.58]">
              {QUICK_SUPPORT_AMOUNT_SLOTS}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {quickSupportDrafts.map((draft, index) => (
              <label
                key={`quick-amount-${index}`}
                className="rounded-[1rem] border border-black/[0.05] bg-white/78 px-3 py-3 dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(31,39,53,0.94),rgba(21,28,40,0.90))]"
              >
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted dark:text-white/[0.38]">
                  {isRussian ? `Кнопка ${index + 1}` : `Button ${index + 1}`}
                </span>
                <input
                  type="number"
                  min={MIN_SUPPORT_AMOUNT}
                  step="1"
                  inputMode="numeric"
                  value={draft}
                  onChange={(event) => handleQuickAmountDraftChange(index, event.target.value)}
                  onBlur={() => commitQuickAmountDraft(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      commitQuickAmountDraft(index);
                    }
                  }}
                  className="mt-2 w-full bg-transparent text-[1rem] font-semibold tracking-tight text-text-primary outline-none placeholder:text-text-muted dark:text-white/[0.92] dark:placeholder:text-white/[0.28]"
                />
                <span className="mt-1 block text-[0.72rem] text-text-secondary dark:text-white/[0.5]">₽</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0442\u044c \u043a\u0440\u0443\u043f\u043d\u044b\u0435 \u0434\u043e\u043d\u0430\u0442\u044b' : 'Confirm large donations'}
            description={isRussian ? '\u0417\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044c \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u0434 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u043e\u0439 \u043e\u0442 1 000 \u20bd.' : 'Ask for confirmation before support above 1,000 RUB.'}
            control={<Toggle checked={confirmLargeSupport} onChange={() => setConfirmLargeSupport((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? '\u0422\u0430\u043a\u0442\u0438\u043b\u044c\u043d\u044b\u0439 \u043e\u0442\u043a\u043b\u0438\u043a' : 'Haptic feedback'}
            description={isRussian ? '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0442\u044c \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u043b\u0451\u0433\u043a\u043e\u0439 \u0432\u0438\u0431\u0440\u0430\u0446\u0438\u0435\u0439.' : 'Confirm important actions with subtle haptics.'}
            control={<Toggle checked={hapticsEnabled} onChange={() => setHapticsEnabled((value) => !value)} />}
          />
        </div>
      </SectionCard>

      <SectionCard className={cn(sectionCardClass, 'space-y-4 px-4 py-4')}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted dark:text-white/[0.42]">{labels.securityTitle}</p>
          <p className="mt-2 text-[0.9rem] leading-6 text-text-secondary dark:text-white/[0.58]">{labels.securityBody}</p>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? '\u0411\u0438\u043e\u043c\u0435\u0442\u0440\u0438\u044f \u043f\u0440\u0438 \u0432\u0445\u043e\u0434\u0435' : 'Biometric unlock'}
            description={isRussian ? '\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u043f\u0440\u043e\u0444\u0438\u043b\u044e \u0438 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0443 \u0447\u0435\u0440\u0435\u0437 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u043e.' : 'Protect profile and wallet access with device biometrics.'}
            control={<Toggle checked={biometricsEnabled} onChange={() => setBiometricsEnabled((value) => !value)} />}
          />

          <div className={panelClass}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.92rem] font-semibold text-text-primary dark:text-white/[0.94]">
                  {isRussian ? '\u0421\u0442\u0430\u0442\u0443\u0441 \u043f\u0440\u043e\u0444\u0438\u043b\u044f' : 'Profile status'}
                </p>
                <p className="mt-1 text-[0.82rem] leading-5 text-text-secondary dark:text-white/[0.56]">
                  {isRussian
                    ? '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0445\u0440\u0430\u043d\u044f\u0442\u0441\u044f \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e \u0438 \u0433\u043e\u0442\u043e\u0432\u044b \u043a \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0430\u0446\u0438\u0438 \u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u043e\u043c.'
                    : 'Preferences are stored locally and ready for account sync.'}
                </p>
              </div>
              <span className="rounded-full border border-[rgba(var(--accent-green),0.18)] bg-[rgba(var(--accent-green),0.12)] px-3 py-1.5 text-[0.75rem] font-semibold text-[rgb(var(--accent-green))]">
                {isRussian ? '\u0413\u043e\u0442\u043e\u0432\u043e' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
