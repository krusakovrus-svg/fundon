'use client';

import { useState } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionCard } from '@/components/ui/SectionCard';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { formatCurrency } from '@/lib/format';
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
          : 'border-black/[0.08] bg-[rgba(247,249,252,0.92)] dark:border-white/10 dark:bg-white/6'
      )}
    >
      <span
        className={cn(
          'absolute left-1 inline-flex h-6 w-6 rounded-full bg-white shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition',
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
    <div className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-black/[0.05] bg-[rgba(247,249,252,0.78)] px-4 py-3.5 dark:border-white/8 dark:bg-white/5">
      <div className="min-w-0">
        <p className="text-[0.94rem] font-semibold text-text-primary">{title}</p>
        <p className="mt-1 text-[0.82rem] leading-5 text-text-secondary">{description}</p>
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
  const [defaultSupportAmount, setDefaultSupportAmount] = useState(100);

  const labels = {
    appearanceTitle: isRussian ? 'Внешний вид и язык' : 'Appearance and language',
    appearanceBody: isRussian
      ? 'Настройте язык интерфейса и светлую тему для ежедневного использования.'
      : 'Adjust interface language and light appearance for daily use.',
    alertsTitle: isRussian ? 'Уведомления' : 'Notifications',
    alertsBody: isRussian
      ? 'Управляйте сигналами по избранным эфирам, крупной поддержке и ежедневной сводке.'
      : 'Control favorite live alerts, large support signals, and the daily digest.',
    supportTitle: isRussian ? 'Поддержка и платежи' : 'Support and payments',
    supportBody: isRussian
      ? 'Выберите сумму по умолчанию и задайте подтверждения для крупных донатов.'
      : 'Choose a default support amount and confirm large donations.',
    securityTitle: isRussian ? 'Безопасность устройства' : 'Device security',
    securityBody: isRussian
      ? 'Включите быстрые защитные проверки для кошелька и личного профиля.'
      : 'Turn on quick protection checks for wallet access and profile actions.'
  };

  const supportOptions = [100, 500, 1000];

  return (
    <MainPageLayout className="space-y-4">
      <PageHeader eyebrow={t('settings')} title={t('settingsTitle')} description={t('settingsHint')} badge="Mobile" />

      <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.88] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{labels.appearanceTitle}</p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{labels.appearanceBody}</p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.25rem] border border-black/[0.05] bg-[rgba(247,249,252,0.78)] px-4 py-4 dark:border-white/8 dark:bg-white/5">
            <p className="text-sm font-semibold text-text-primary">{t('settingsLanguageLabel')}</p>
            <p className="mt-1 text-sm text-text-secondary">{t('language')}</p>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-black/[0.05] bg-[rgba(247,249,252,0.78)] px-4 py-4 dark:border-white/8 dark:bg-white/5">
            <p className="text-sm font-semibold text-text-primary">{t('settingsThemeLabel')}</p>
            <p className="mt-1 text-sm text-text-secondary">{t('themeSystemCaption')}</p>
            <div className="mt-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.86] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{labels.alertsTitle}</p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{labels.alertsBody}</p>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? 'Эфиры из избранного' : 'Favorite live streams'}
            description={isRussian ? 'Показывать старт эфира и заметные всплески поддержки.' : 'Show live starts and major support swings.'}
            control={<Toggle checked={liveAlerts} onChange={() => setLiveAlerts((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? 'Крупная поддержка' : 'Large support alerts'}
            description={isRussian ? 'Отдельный сигнал для донатов выше обычного уровня.' : 'Separate signal for unusually large support.'}
            control={<Toggle checked={bigSupportAlerts} onChange={() => setBigSupportAlerts((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? 'Ежедневная сводка' : 'Daily digest'}
            description={isRussian ? 'Собирать краткую сводку активности по событиям и профилю.' : 'Receive a compact daily recap of activity.'}
            control={<Toggle checked={dailyDigest} onChange={() => setDailyDigest((value) => !value)} />}
          />
        </div>
      </SectionCard>

      <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.84] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{labels.supportTitle}</p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{labels.supportBody}</p>
        </div>

        <div className="rounded-[1.25rem] border border-black/[0.05] bg-[rgba(247,249,252,0.78)] px-4 py-4 dark:border-white/8 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">{isRussian ? 'Сумма по умолчанию' : 'Default amount'}</p>
              <p className="mt-1 text-sm text-text-secondary">{isRussian ? 'Появится первой в панели поддержки.' : 'Shown first in the support dock.'}</p>
            </div>
            <span className="rounded-full border border-[rgba(var(--accent-orange),0.14)] bg-[rgba(var(--accent-orange),0.08)] px-3 py-1.5 text-[0.78rem] font-semibold text-text-primary">
              {formatCurrency(defaultSupportAmount, language)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {supportOptions.map((amount) => {
              const active = amount === defaultSupportAmount;
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setDefaultSupportAmount(amount)}
                  className={cn(
                    'rounded-[1rem] border px-3 py-3 text-sm font-semibold transition',
                    active
                      ? 'border-[rgba(var(--accent-orange),0.18)] bg-[rgba(var(--accent-orange),0.1)] text-text-primary shadow-[0_10px_18px_rgba(255,116,55,0.12)]'
                      : 'border-black/[0.06] bg-white/78 text-text-secondary dark:border-white/8 dark:bg-white/8'
                  )}
                >
                  {formatCurrency(amount, language)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? 'Подтверждать крупные донаты' : 'Confirm large donations'}
            description={isRussian ? 'Запрашивать подтверждение перед поддержкой от 1 000 ₽.' : 'Ask for confirmation before support above ₽1,000.'}
            control={<Toggle checked={confirmLargeSupport} onChange={() => setConfirmLargeSupport((value) => !value)} />}
          />
          <PreferenceRow
            title={isRussian ? 'Тактильный отклик' : 'Haptic feedback'}
            description={isRussian ? 'Подтверждать действия лёгкой вибрацией интерфейса.' : 'Confirm important actions with subtle haptics.'}
            control={<Toggle checked={hapticsEnabled} onChange={() => setHapticsEnabled((value) => !value)} />}
          />
        </div>
      </SectionCard>

      <SectionCard className="space-y-4 border border-black/[0.045] bg-white/[0.82] px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{labels.securityTitle}</p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{labels.securityBody}</p>
        </div>

        <div className="space-y-3">
          <PreferenceRow
            title={isRussian ? 'Биометрия при входе' : 'Biometric unlock'}
            description={isRussian ? 'Проверять доступ к профилю и кошельку через устройство.' : 'Protect profile and wallet access with device biometrics.'}
            control={<Toggle checked={biometricsEnabled} onChange={() => setBiometricsEnabled((value) => !value)} />}
          />
          <div className="rounded-[1.2rem] border border-black/[0.05] bg-[rgba(247,249,252,0.78)] px-4 py-4 dark:border-white/8 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.94rem] font-semibold text-text-primary">{isRussian ? 'Статус профиля' : 'Profile status'}</p>
                <p className="mt-1 text-[0.82rem] leading-5 text-text-secondary">
                  {isRussian ? 'Настройки применяются локально и готовы к синхронизации с аккаунтом.' : 'Preferences are stored locally and ready for account sync.'}
                </p>
              </div>
              <span className="rounded-full border border-[rgba(var(--accent-green),0.18)] bg-[rgba(var(--accent-green),0.12)] px-3 py-1.5 text-[0.75rem] font-semibold text-[rgb(var(--accent-green))]">
                {isRussian ? 'Готово' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </SectionCard>
    </MainPageLayout>
  );
}
