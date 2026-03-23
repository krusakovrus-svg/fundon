'use client';

import { useEffect, useState, type ReactNode } from 'react';

import {
  adminAdminUsers,
  adminAuditEntries,
  adminFeatureFlags,
  adminNotificationChannels,
  adminPaymentProviders,
  adminPlatformCurrencies,
  adminPlatformDomains,
  adminPlatformLanguages,
  adminPlatformTimezones,
  adminRoles,
  adminSettingsTabs,
  type AdminSettingsTabId
} from '@/admin/data/settings';
import { AdminConfirmDialog, type AdminConfirmDialogDetail } from '@/admin/components/AdminConfirmDialog';
import { cn } from '@/lib/utils';

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.3-2.8 7.7-7 10-4.2-2.3-7-5.7-7-10V6z" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 16.5h11L16 14V10a4 4 0 1 0-8 0v4z" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 7.5h11.5a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 16.5 18H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2z" />
      <path d="M15 13h4" strokeLinecap="round" />
      <path d="M5 7.5V6a2 2 0 0 1 2-2h8" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" strokeLinejoin="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4l2.7 1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsCard({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[26px] border border-black/[0.05] bg-white/94 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-black/[0.045] px-6 py-5">
        <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-[0.92rem] leading-6 text-slate-500">{subtitle}</p> : null}
      </div>
      <div className="space-y-4 p-6 md:space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2.5">
      <span className="text-[0.82rem] font-semibold tracking-[0.01em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-[3.125rem] w-full rounded-[16px] border border-black/[0.055] bg-[#fbfcff] px-4 text-[0.95rem] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_18px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#dbe7fb] focus:bg-white focus:ring-2 focus:ring-[#eef5ff]"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[3.125rem] w-full appearance-none rounded-[16px] border border-black/[0.055] bg-[#fbfcff] px-4 pr-10 text-[0.95rem] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#dbe7fb] focus:bg-white focus:ring-2 focus:ring-[#eef5ff]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <ChevronDownIcon />
      </span>
    </label>
  );
}

function Toggle({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-8 w-[3.25rem] items-center rounded-full p-1 transition',
        checked ? 'bg-[#4f8ff6]' : 'bg-slate-200'
      )}
    >
      <span
        className={cn(
          'h-6 w-6 rounded-full bg-white shadow-[0_6px_14px_rgba(15,23,42,0.14)] transition',
          checked ? 'translate-x-[1.2rem]' : 'translate-x-0'
        )}
      />
    </button>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  actionLabel
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-[18px] border border-black/[0.05] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] px-4.5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.95rem] font-semibold text-slate-900">{title}</p>
          {description ? <p className="mt-1 text-[0.84rem] leading-5 text-slate-500">{description}</p> : null}
        </div>
        <Toggle checked={checked} onChange={onChange} />
      </div>
      {actionLabel ? (
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-[14px] border border-black/[0.06] bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  quiet = false
}: {
  icon: ReactNode;
  label: string;
  value: string;
  quiet?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] border border-black/[0.05] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] px-4.5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-[12px]', quiet ? 'bg-[#f8f9fc] text-slate-400' : 'bg-[#f5f8fd] text-slate-500')}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[0.9rem] font-semibold text-slate-800">{label}</p>
          <p className="mt-1 text-[0.82rem] leading-5 text-slate-500 sm:truncate">{value}</p>
        </div>
      </div>
      <span className="text-slate-400">
        <ChevronRightIcon />
      </span>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-[5.9rem] flex-col justify-between rounded-[18px] border border-black/[0.05] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] px-4.5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[1.04rem] font-semibold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-[15px] px-4 py-2.5 text-[0.92rem] font-semibold transition',
        active
          ? 'bg-[linear-gradient(180deg,#f2f7ff_0%,#e8f1fe_100%)] text-[#2f78d3] shadow-[0_12px_24px_rgba(79,143,246,0.14)] ring-1 ring-[#dbe7fb]'
          : 'text-slate-600 hover:bg-white hover:text-slate-900'
      )}
    >
      {children}
    </button>
  );
}

function PermissionChip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-[#f5f8fd] px-2.5 py-1 text-[0.74rem] font-semibold text-slate-600">{children}</span>;
}

function RoleCard({
  title,
  summary,
  members,
  ownership,
  permissions,
  approvalPolicy
}: {
  title: string;
  summary: string;
  members: string;
  ownership: string;
  permissions: string[];
  approvalPolicy: string;
}) {
  return (
    <div className="rounded-[20px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.98rem] font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-[0.84rem] leading-6 text-slate-500">{summary}</p>
        </div>
        <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[0.74rem] font-semibold text-[#2f78d3]">{members}</span>
      </div>

      <div className="mt-4 rounded-[16px] bg-[#f8f9fc] px-3.5 py-3">
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Контур ответственности</p>
        <p className="mt-2 text-[0.9rem] text-slate-700">{ownership}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {permissions.map((permission) => (
          <PermissionChip key={permission}>{permission}</PermissionChip>
        ))}
      </div>

      <p className="mt-4 text-[0.82rem] leading-6 text-slate-500">{approvalPolicy}</p>
    </div>
  );
}

function AdminAccessRow({
  name,
  roleName,
  scope,
  lastActive,
  status
}: {
  name: string;
  roleName: string;
  scope: string;
  lastActive: string;
  status: 'active' | 'invited';
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[0.94rem] font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-[0.82rem] text-slate-500">{roleName} · {scope}</p>
      </div>
      <div className="text-right">
        <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200')}>
          {status === 'active' ? 'Активен' : 'Приглашён'}
        </span>
        <p className="mt-1 text-[0.8rem] text-slate-400">{lastActive}</p>
      </div>
    </div>
  );
}

function getAuditTone(category: 'events' | 'refunds' | 'users' | 'settings' | 'notifications' | 'roles') {
  switch (category) {
    case 'events':
      return 'bg-[#eef5ff] text-[#2f78d3]';
    case 'refunds':
      return 'bg-amber-50 text-amber-700';
    case 'users':
      return 'bg-rose-50 text-rose-700';
    case 'settings':
      return 'bg-violet-50 text-violet-700';
    case 'notifications':
      return 'bg-emerald-50 text-emerald-700';
    case 'roles':
      return 'bg-slate-100 text-slate-600';
  }
}

function getAuditLabel(category: 'events' | 'refunds' | 'users' | 'settings' | 'notifications' | 'roles') {
  switch (category) {
    case 'events':
      return 'События';
    case 'refunds':
      return 'Возвраты';
    case 'users':
      return 'Пользователи';
    case 'settings':
      return 'Настройки';
    case 'notifications':
      return 'Уведомления';
    case 'roles':
      return 'Роли';
  }
}

export function AdminSettingsScreen() {
  const [activeTab, setActiveTab] = useState<AdminSettingsTabId>('general');
  const [auditEntries, setAuditEntries] = useState(adminAuditEntries);
  const [confirmState, setConfirmState] = useState<{
    title: string;
    description: string;
    confirmLabel: string;
    tone: 'primary' | 'danger';
    badge: string;
    footnote: string;
    details: AdminConfirmDialogDetail[];
    onConfirm: () => void;
  } | null>(null);

  const [platformName, setPlatformName] = useState('FUNDON');
  const [domain, setDomain] = useState<(typeof adminPlatformDomains)[number]>('fundon.app');
  const [language, setLanguage] = useState<(typeof adminPlatformLanguages)[number]>('Русский');
  const [timezone, setTimezone] = useState<(typeof adminPlatformTimezones)[number]>('Москва (GMT+3)');
  const [currency, setCurrency] = useState<(typeof adminPlatformCurrencies)[number]>('Российский рубль (₽)');
  const [supportEmail, setSupportEmail] = useState('ops@fundon.app');
  const [dataRegion, setDataRegion] = useState('Франкфурт · EU Central');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [paymentToggles, setPaymentToggles] = useState({
    refunds: true,
    manualReview: true,
    payoutLock: false
  });

  const [notificationToggles, setNotificationToggles] = useState({
    push: true,
    email: true,
    room: true
  });

  const [quietHours, setQuietHours] = useState('23:00 - 07:00');

  const [featureToggles, setFeatureToggles] = useState<Record<string, boolean>>({
    'flag-1': true,
    'flag-2': false,
    'flag-3': true
  });
  const [ratingToggles, setRatingToggles] = useState({
    liveShift: true,
    hidePaused: true
  });
  const [roomToggles, setRoomToggles] = useState({
    autoprompts: true,
    highlights: true
  });
  const [securityToggles, setSecurityToggles] = useState({
    required2fa: true,
    deviceVerification: true
  });

  const openSaveConfirmation = () => {
    const meta =
      activeTab === 'roles'
        ? {
            title: 'Сохранить изменения ролей и прав',
            description: 'Новые правила доступа и состав ролей будут применены ко всему административному контуру FUNDON.',
            confirmLabel: 'Сохранить роли',
            category: 'roles' as const,
            badge: 'Роли и права'
          }
        : activeTab === 'payments'
          ? {
              title: 'Сохранить платёжные политики',
              description: 'Изменения затронут сценарий возвратов, ручную проверку и ограничения риска.',
              confirmLabel: 'Сохранить платежи',
              category: 'settings' as const,
              badge: 'Критичные настройки'
            }
          : activeTab === 'security'
            ? {
                title: 'Сохранить настройки безопасности',
                description: 'Изменения затронут политики доступа, проверку устройств и эскалацию риска.',
                confirmLabel: 'Сохранить безопасность',
                category: 'settings' as const,
                badge: 'Безопасность'
              }
            : {
                title: 'Сохранить изменения настроек',
                description: 'Текущие значения будут зафиксированы как актуальная конфигурация рабочего контура.',
                confirmLabel: 'Сохранить изменения',
                category: 'settings' as const,
                badge: 'Настройки'
              };

    setConfirmState({
      title: meta.title,
      description: meta.description,
      confirmLabel: meta.confirmLabel,
      tone: 'primary',
      badge: meta.badge,
      footnote: 'Критичные настройки и роли попадают в обязательный журнал аудита FUNDON.',
      details: [
        { label: 'Раздел', value: adminSettingsTabs.find((tab) => tab.id === activeTab)?.label ?? 'Настройки' },
        { label: 'Домен', value: domain },
        { label: 'Почта поддержки', value: supportEmail },
        { label: 'Платформа', value: platformName }
      ],
      onConfirm: () => {
        setAuditEntries((current) => [
          {
            id: `audit-local-${Date.now()}`,
            title: meta.title,
            actor: 'Ольга Романова',
            at: 'Сейчас',
            description: `${platformName} · ${domain} · ${supportEmail} · текущий контур ${adminSettingsTabs.find((tab) => tab.id === activeTab)?.label?.toLowerCase() ?? 'настроек'}.`,
            category: meta.category
          },
          ...current
        ]);
        setConfirmState(null);
      }
    });
  };

  useEffect(() => {
    const handleSettingsSave = () => openSaveConfirmation();

    window.addEventListener('fundon-admin-settings-save', handleSettingsSave);
    return () => window.removeEventListener('fundon-admin-settings-save', handleSettingsSave);
  }, [openSaveConfirmation]);

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Общие настройки" subtitle="Базовая конфигурация бренда, локали и рабочего контура FUNDON.">
              <Field label="Название платформы">
                <TextInput value={platformName} onChange={setPlatformName} />
              </Field>
              <Field label="Домен">
                <SelectInput value={domain} onChange={(value) => setDomain(value as (typeof adminPlatformDomains)[number])} options={adminPlatformDomains} />
              </Field>
              <Field label="Язык по умолчанию">
                <SelectInput value={language} onChange={(value) => setLanguage(value as (typeof adminPlatformLanguages)[number])} options={adminPlatformLanguages} />
              </Field>
              <Field label="Часовой пояс">
                <SelectInput value={timezone} onChange={(value) => setTimezone(value as (typeof adminPlatformTimezones)[number])} options={adminPlatformTimezones} />
              </Field>
              <Field label="Валюта по умолчанию">
                <SelectInput value={currency} onChange={(value) => setCurrency(value as (typeof adminPlatformCurrencies)[number])} options={adminPlatformCurrencies} />
              </Field>
            </SettingsCard>

            <SettingsCard title="Рабочий контур" subtitle="Параметры окружения, поддержки и системных URL для основного контура FUNDON.">
              <Field label="Почта поддержки">
                <TextInput value={supportEmail} onChange={setSupportEmail} />
              </Field>
              <Field label="Регион хранения данных">
                <TextInput value={dataRegion} onChange={setDataRegion} />
              </Field>
              <ToggleRow
                title="Режим обслуживания"
                description="Позволяет мягко ограничить публикацию новых событий и комнат на время технических работ."
                checked={maintenanceMode}
                onChange={setMaintenanceMode}
              />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Основной URL" value="https://fundon.vercel.app" />
                <MetricPill label="Админ-раздел" value="/admin" />
              </div>
            </SettingsCard>
          </div>
        );

      case 'roles':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Роли и права" subtitle="MVP-роли FUNDON с понятными зонами ответственности и базовыми правами доступа.">
              <div className="space-y-3">
                {adminRoles.map((role) => (
                  <RoleCard
                    key={role.id}
                    title={role.name}
                    summary={role.summary}
                    members={role.members}
                    ownership={role.ownership}
                    permissions={role.permissions}
                    approvalPolicy={role.approvalPolicy}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button type="button" className="rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-4 py-3 text-[0.92rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]">
                  Права доступа
                </button>
                <button type="button" className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3 text-[0.92rem] font-semibold text-slate-700">
                  Гранулярные разрешения
                </button>
                <button type="button" className="rounded-[16px] bg-[#f7f8fb] px-4 py-3 text-[0.92rem] font-semibold text-slate-600">
                  Добавить новую роль
                </button>
              </div>
            </SettingsCard>

            <SettingsCard title="Команда доступа" subtitle="Кто сейчас работает в контуре FUNDON и за какие зоны отвечает.">
              <div className="space-y-3">
                {adminAdminUsers.map((adminUser) => (
                  <AdminAccessRow
                    key={adminUser.id}
                    name={adminUser.name}
                    roleName={adminUser.roleName}
                    scope={adminUser.scope}
                    lastActive={adminUser.lastActive}
                    status={adminUser.status}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Двойное подтверждение" value="Возвраты, завершение эфира, смена ролей" />
                <MetricPill label="Базовый доступ" value="7 обязательных операционных контуров" />
              </div>
            </SettingsCard>
          </div>
        );

      case 'payments':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Платёжные настройки" subtitle="Провайдеры, комиссии и правила вывода платформы.">
              <div className="space-y-3">
                {adminPaymentProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between gap-4 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd] text-slate-500">
                        <WalletIcon />
                      </span>
                      <div>
                        <p className="text-[0.94rem] font-semibold text-slate-800">{provider.name}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{provider.status === 'active' ? 'Основной платёжный провайдер' : 'На дополнительной проверке'}</p>
                      </div>
                    </div>
                    <span className={cn('rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', provider.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200')}>
                      {provider.status === 'active' ? 'Активен' : 'Проверка'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <MetricPill label="Комиссия платформы" value="5.0%" />
                <MetricPill label="Лимит вывода" value="300 000 ₽ / день" />
                <MetricPill label="SLA по спорам" value="24 часа" />
              </div>
            </SettingsCard>

            <SettingsCard title="Политики платежей" subtitle="Управление возвратами, ручной проверкой и лимитами риска.">
              <ToggleRow
                title="Возвраты в одном окне"
                description="Возврат можно оформить без выхода из потока донатов в админке."
                checked={paymentToggles.refunds}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, refunds: next }))}
              />
              <ToggleRow
                title="Ручная проверка спорных донатов"
                description="Все подозрительные платежи автоматически уходят в модерацию до завершения проверки."
                checked={paymentToggles.manualReview}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, manualReview: next }))}
              />
              <ToggleRow
                title="Блокировка вывода после запроса на возврат"
                description="Временная блокировка вывода до закрытия спора по транзакции."
                checked={paymentToggles.payoutLock}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, payoutLock: next }))}
              />
            </SettingsCard>
          </div>
        );

      case 'notifications':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Уведомления" subtitle="Каналы доставки, тихие часы и операционные шаблоны.">
              <div className="space-y-3">
                {adminNotificationChannels.map((channel) => {
                  const channelValue =
                    channel.id === 'notify-1'
                      ? notificationToggles.push
                      : channel.id === 'notify-2'
                        ? notificationToggles.email
                        : notificationToggles.room;

                  return (
                    <ToggleRow
                      key={channel.id}
                      title={channel.title}
                      description={channel.description}
                      checked={channelValue}
                      onChange={(next) =>
                        setNotificationToggles((current) => ({
                          ...current,
                          [channel.id === 'notify-1' ? 'push' : channel.id === 'notify-2' ? 'email' : 'room']: next
                        }))
                      }
                    />
                  );
                })}
              </div>
            </SettingsCard>

            <SettingsCard title="Тихие часы и шаблоны" subtitle="Блокирует шумные отправки ночью и управляет шаблонами сообщений.">
              <Field label="Часы тишины">
                <TextInput value={quietHours} onChange={setQuietHours} />
              </Field>
              <InfoRow icon={<BellIcon />} label="Управление шаблонами" value="18 активных шаблонов · 4 на проверке" />
              <InfoRow icon={<HistoryIcon />} label="Окно повторной отправки" value="15 минут · 3 автоматических повтора" quiet />
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3 text-[0.92rem] font-semibold text-slate-700">
                  Шаблоны сообщений
                </button>
                <button type="button" className="rounded-[16px] bg-[#f7f8fb] px-4 py-3 text-[0.92rem] font-semibold text-slate-600">
                  Управление сегментами
                </button>
              </div>
            </SettingsCard>
          </div>
        );

      case 'ratings':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Рейтинги" subtitle="Настройка пересчёта, весов и публикации позиций.">
              <InfoRow icon={<SparkIcon />} label="Период пересчёта" value="Каждые 15 минут · приоритет live-событий" />
              <InfoRow icon={<ShieldIcon />} label="Ручные корректировки" value="Требуют двойного подтверждения" />
              <div className="grid grid-cols-3 gap-3">
                <MetricPill label="Базовый балл" value="+10" />
                <MetricPill label="Бонус за эфир" value="+25%" />
                <MetricPill label="Лимит" value="5 000 очков / день" />
              </div>
            </SettingsCard>

            <SettingsCard title="Публикация рейтингов" subtitle="Как рейтинги отображаются в приложении и live-потоке.">
              <ToggleRow
                title="Показывать изменения позиций в эфире"
                description="Изменение позиции после доната отображается в эфире и в профиле."
                checked={ratingToggles.liveShift}
                onChange={(next) => setRatingToggles((current) => ({ ...current, liveShift: next }))}
              />
              <ToggleRow
                title="Скрывать приостановленные рейтинги"
                description="Неактуальные рейтинги не попадают в пользовательские экраны."
                checked={ratingToggles.hidePaused}
                onChange={(next) => setRatingToggles((current) => ({ ...current, hidePaused: next }))}
              />
            </SettingsCard>
          </div>
        );

      case 'rooms':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Комнаты" subtitle="Базовые параметры комнат поддержки и модерации.">
              <InfoRow icon={<ShieldIcon />} label="Порог жалоб" value="3 жалобы → проверка · 5 жалоб → авто-ограничение" />
              <InfoRow icon={<SparkIcon />} label="Новая комната по умолчанию" value="Фан-комната · до 250 участников" />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Медленный режим" value="8 сек." />
                <MetricPill label="Закреплённые слоты" value="2 сообщения" />
              </div>
            </SettingsCard>

            <SettingsCard title="Комнатная активность" subtitle="Контроль всплесков, автоподсказок и связки с live-событиями.">
              <ToggleRow
                title="Автоподсказки поддержки"
                description="Система предлагает действия в одно касание при росте активности комнаты."
                checked={roomToggles.autoprompts}
                onChange={(next) => setRoomToggles((current) => ({ ...current, autoprompts: next }))}
              />
              <ToggleRow
                title="Пики активности"
                description="Ключевые пики активности показываются в карточках комнаты и в очереди модерации."
                checked={roomToggles.highlights}
                onChange={(next) => setRoomToggles((current) => ({ ...current, highlights: next }))}
              />
            </SettingsCard>
          </div>
        );

      case 'integrations':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Интеграции" subtitle="Платёжные, messaging- и data-интеграции FUNDON.">
              <InfoRow icon={<WalletIcon />} label="Платёжные вебхуки" value="3 endpoint'а · последняя синхронизация 2 мин. назад" />
              <InfoRow icon={<BellIcon />} label="Шлюз push-уведомлений" value="Firebase · статус стабильный" />
              <InfoRow icon={<HistoryIcon />} label="Хранилище данных" value="Синхронизация BigQuery · каждые 30 мин." />
            </SettingsCard>

            <SettingsCard title="API и ключи" subtitle="Технические доступы и ключи интеграций, скрытые за операционным слоем.">
              <MetricPill label="Активные ключи" value="12" />
              <MetricPill label="Скоро истекают" value="2" />
              <InfoRow icon={<ShieldIcon />} label="IP-список доступа" value="7 адресов · только продакшен" quiet />
            </SettingsCard>
          </div>
        );

      case 'flags':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Флаги функций" subtitle="Контролируемая раскатка новых продуктовых функций.">
              <div className="space-y-3">
                {adminFeatureFlags.map((flag) => (
                  <ToggleRow
                    key={flag.id}
                    title={flag.name}
                    description={`${flag.description} · ${flag.rollout}`}
                    checked={featureToggles[flag.id]}
                    onChange={(next) => setFeatureToggles((current) => ({ ...current, [flag.id]: next }))}
                  />
                ))}
              </div>
            </SettingsCard>

            <SettingsCard title="Эксперименты" subtitle="Управление сегментами раскатки и быстрый откат.">
              <InfoRow icon={<SparkIcon />} label="Текущий пилот" value="Room Momentum Cards · внутренняя бета" />
              <InfoRow icon={<HistoryIcon />} label="Окно отката" value="Мгновенный откат · 1 действие" quiet />
            </SettingsCard>
          </div>
        );

      case 'security':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Безопасность" subtitle="SSO, сессии и защитные политики админ-контура.">
              <ToggleRow
                title="Обязательная 2FA"
                description="Требуется для всех административных ролей без исключений."
                checked={securityToggles.required2fa}
                onChange={(next) => setSecurityToggles((current) => ({ ...current, required2fa: next }))}
              />
              <ToggleRow
                title="Проверка устройств"
                description="Новый доступ с устройства требует подтверждения через почту и запись в журнале."
                checked={securityToggles.deviceVerification}
                onChange={(next) => setSecurityToggles((current) => ({ ...current, deviceVerification: next }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Срок сессии" value="12 часов" />
                <MetricPill label="Обновление пароля" value="90 дней" />
              </div>
            </SettingsCard>

            <SettingsCard title="Контроль риска" subtitle="Связка админ-контура с модерацией и логикой подозрительных платежей.">
              <InfoRow icon={<ShieldIcon />} label="Эскалация риска" value="Очередь модерации · критичный путь" />
              <InfoRow icon={<AlertIconFallback />} label="Порог оповещения" value="7 подозрительных транзакций / 10 мин." quiet />
            </SettingsCard>
          </div>
        );

      case 'audit':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Журнал действий" subtitle="Обязательный журнал по событиям, возвратам, блокировкам, настройкам и ролям.">
              <div className="space-y-3">
                {auditEntries.map((entry) => (
                  <div key={entry.id} className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[0.94rem] font-semibold text-slate-900">{entry.title}</p>
                          <span className={cn('rounded-full px-2.5 py-1 text-[0.72rem] font-semibold', getAuditTone(entry.category))}>{getAuditLabel(entry.category)}</span>
                        </div>
                        <p className="mt-1 text-[0.84rem] leading-5 text-slate-600">{entry.description}</p>
                      </div>
                      <span className="shrink-0 text-[0.8rem] text-slate-400">{entry.at}</span>
                    </div>
                    <p className="mt-2 text-[0.82rem] text-slate-500">{entry.actor}</p>
                  </div>
                ))}
              </div>
            </SettingsCard>

            <SettingsCard title="Правила аудита" subtitle="Какие категории логируются в MVP и как долго они хранятся.">
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Срок хранения" value="180 дней" />
                <MetricPill label="Экспорт" value="CSV / JSON" />
              </div>
              <InfoRow icon={<HistoryIcon />} label="Обязательные категории" value="События, возвраты, пользователи, настройки, уведомления, роли" />
              <InfoRow icon={<ShieldIcon />} label="Неизменяемое хранение" value="Включено для критичных изменений" quiet />
            </SettingsCard>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-2.5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto pb-1 [scrollbar-color:rgba(148,163,184,0.35)_transparent] [scrollbar-width:thin]">
          <div className="flex min-w-max items-center gap-2">
            {adminSettingsTabs.map((tab) => (
              <TabButton key={tab.id} active={tab.id === activeTab} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#dbe7fb] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] px-6 py-5 shadow-[0_16px_34px_rgba(79,143,246,0.09)]">
        <div className="flex flex-wrap items-start justify-between gap-4 lg:gap-5">
          <div className="max-w-[42rem]">
            <p className="text-[1.02rem] font-semibold text-slate-900">Критичные изменения подтверждаются отдельно</p>
            <p className="mt-1 text-[0.88rem] leading-6 text-slate-500">Изменения ролей, платёжных политик, безопасности и общих настроек попадают в обязательный журнал действий.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-black/[0.05] bg-white/92 px-3 py-1.5 text-[0.76rem] font-semibold text-slate-500 shadow-[0_10px_18px_rgba(15,23,42,0.04)]">
              {auditEntries.length} записей в журнале аудита
            </span>
            <button
              type="button"
              onClick={openSaveConfirmation}
              className="rounded-[15px] bg-[linear-gradient(180deg,#5c9af8_0%,#4f8ff6_100%)] px-4.5 py-2.75 text-[0.9rem] font-semibold text-white shadow-[0_14px_24px_rgba(79,143,246,0.18)]"
            >
              Сохранить критичные изменения
            </button>
          </div>
        </div>
      </section>

      {renderContent()}

      <AdminConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title ?? ''}
        description={confirmState?.description ?? ''}
        confirmLabel={confirmState?.confirmLabel ?? ''}
        tone={confirmState?.tone ?? 'primary'}
        badge={confirmState?.badge}
        details={confirmState?.details}
        footnote={confirmState?.footnote}
        onClose={() => setConfirmState(null)}
        onConfirm={() => confirmState?.onConfirm()}
      />
    </div>
  );
}

function AlertIconFallback() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4 3.8 18h16.4z" strokeLinejoin="round" />
      <path d="M12 9v4" strokeLinecap="round" />
      <path d="M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}
