'use client';

import { useState, type ReactNode } from 'react';

import {
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
    <section className="rounded-[24px] border border-black/[0.05] bg-white/92 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="border-b border-black/[0.045] px-6 py-5">
        <h2 className="text-[1.18rem] font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      <div className="space-y-4 p-6">{children}</div>
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
    <label className="block space-y-2">
      <span className="text-[0.84rem] font-semibold text-slate-500">{label}</span>
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
      className="h-12 w-full rounded-[14px] border border-black/[0.05] bg-white px-4 text-[0.95rem] text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
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
        className="h-12 w-full appearance-none rounded-[14px] border border-black/[0.05] bg-white px-4 pr-10 text-[0.95rem] text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#dbe7fb] focus:ring-2 focus:ring-[#eef5ff]"
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
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
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
          className="mt-4 inline-flex items-center justify-center rounded-[14px] border border-black/[0.06] bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-slate-700"
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
    <div className="flex items-center justify-between gap-4 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-[12px]', quiet ? 'bg-[#f8f9fc] text-slate-400' : 'bg-[#f5f8fd] text-slate-500')}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[0.9rem] font-semibold text-slate-800">{label}</p>
          <p className="mt-1 truncate text-[0.82rem] text-slate-500">{value}</p>
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
    <div className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-[1.02rem] font-semibold tracking-tight text-slate-900">{value}</p>
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
        'rounded-[14px] px-4 py-2.5 text-[0.92rem] font-semibold transition',
        active
          ? 'bg-[linear-gradient(180deg,#eef5ff_0%,#e8f1fe_100%)] text-[#2f78d3] shadow-[0_10px_22px_rgba(79,143,246,0.12)] ring-1 ring-[#dbe7fb]'
          : 'text-slate-600 hover:bg-white hover:text-slate-900'
      )}
    >
      {children}
    </button>
  );
}

export function AdminSettingsScreen() {
  const [activeTab, setActiveTab] = useState<AdminSettingsTabId>('general');

  const [platformName, setPlatformName] = useState('FUNDON');
  const [domain, setDomain] = useState<(typeof adminPlatformDomains)[number]>('fundon.app');
  const [language, setLanguage] = useState<(typeof adminPlatformLanguages)[number]>('Русский');
  const [timezone, setTimezone] = useState<(typeof adminPlatformTimezones)[number]>('(GMT+3:00) Москва');
  const [currency, setCurrency] = useState<(typeof adminPlatformCurrencies)[number]>('₽ — Российский рубль');
  const [supportEmail, setSupportEmail] = useState('ops@fundon.app');
  const [dataRegion, setDataRegion] = useState('Frankfurt · EU Central');

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

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Общие" subtitle="Базовая конфигурация бренда, локали и рабочего пространства.">
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

            <SettingsCard title="Рабочее пространство" subtitle="Параметры окружения и support-операций для production-контура.">
              <Field label="Support email">
                <TextInput value={supportEmail} onChange={setSupportEmail} />
              </Field>
              <Field label="Регион хранения данных">
                <TextInput value={dataRegion} onChange={setDataRegion} />
              </Field>
              <ToggleRow
                title="Режим обслуживания"
                description="Позволяет мягко ограничить публикацию новых событий и комнат на время технических работ."
                checked={false}
                onChange={() => {}}
              />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Production URL" value="https://fundon.vercel.app" />
                <MetricPill label="Admin URL" value="/admin" />
              </div>
            </SettingsCard>
          </div>
        );

      case 'roles':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Роли и права" subtitle="Управление ролями, областями ответственности и составом команд.">
              <div className="space-y-3">
                {adminRoles.map((role) => (
                  <InfoRow key={role.id} icon={<ShieldIcon />} label={role.name} value={`${role.summary} · ${role.members}`} />
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

            <SettingsCard title="Политики доступа" subtitle="Кто и как получает доступ к операциям FUNDON.">
              <ToggleRow
                title="Обязательный approval для критичных действий"
                description="Пересчёт рейтингов, возвраты и массовые рассылки требуют подтверждения второго администратора."
                checked={true}
                onChange={() => {}}
              />
              <ToggleRow
                title="Временный доступ по инциденту"
                description="Включает ограниченный elevated access для кейсов модерации и платёжных разборов."
                checked={true}
                onChange={() => {}}
              />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="SSO groups" value="8 групп" />
                <MetricPill label="Custom policies" value="14 правил" />
              </div>
            </SettingsCard>
          </div>
        );

      case 'payments':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Платежи" subtitle="Провайдеры, комиссии и payout-политики платформы.">
              <div className="space-y-3">
                {adminPaymentProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between gap-4 rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f5f8fd] text-slate-500">
                        <WalletIcon />
                      </span>
                      <div>
                        <p className="text-[0.94rem] font-semibold text-slate-800">{provider.name}</p>
                        <p className="mt-1 text-[0.82rem] text-slate-500">{provider.status === 'active' ? 'Основной production provider' : 'На расширенной проверке'}</p>
                      </div>
                    </div>
                    <span className={cn('rounded-full px-2.5 py-1 text-[0.76rem] font-semibold', provider.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200')}>
                      {provider.status === 'active' ? 'Активен' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <MetricPill label="Комиссия платформы" value="5.0%" />
                <MetricPill label="Лимит на вывод" value="₽ 300 000 / день" />
                <MetricPill label="Dispute SLA" value="24 часа" />
              </div>
            </SettingsCard>

            <SettingsCard title="Политики платежей" subtitle="Управление refund-flow, ручной проверкой и лимитами риска.">
              <ToggleRow
                title="Возвраты в одном окне"
                description="Возврат можно оформить без выхода из admin donations flow."
                checked={paymentToggles.refunds}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, refunds: next }))}
              />
              <ToggleRow
                title="Ручная проверка спорных донатов"
                description="Все suspicious payment cases автоматически уходят в moderation до завершения проверки."
                checked={paymentToggles.manualReview}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, manualReview: next }))}
              />
              <ToggleRow
                title="Hold на вывод после refund-запроса"
                description="Временная блокировка payout до закрытия спора по транзакции."
                checked={paymentToggles.payoutLock}
                onChange={(next) => setPaymentToggles((current) => ({ ...current, payoutLock: next }))}
              />
            </SettingsCard>
          </div>
        );

      case 'notifications':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Уведомления" subtitle="Каналы доставки, quiet hours и операционные шаблоны.">
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
              <InfoRow icon={<BellIcon />} label="Управление шаблонами" value="18 активных шаблонов · 4 в review" />
              <InfoRow icon={<HistoryIcon />} label="Retry window" value="15 минут · 3 автоматических повтора" quiet />
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
              <InfoRow icon={<SparkIcon />} label="Период пересчёта" value="Каждые 15 минут · live events priority" />
              <InfoRow icon={<ShieldIcon />} label="Manual overrides" value="Требуют double approval" />
              <div className="grid grid-cols-3 gap-3">
                <MetricPill label="Base score" value="+10" />
                <MetricPill label="Live bonus" value="+25%" />
                <MetricPill label="Cap" value="5 000 очков / день" />
              </div>
            </SettingsCard>

            <SettingsCard title="Публикация рейтингов" subtitle="Как рейтинги отображаются в consumer-продукте и в live flow.">
              <ToggleRow title="Показывать live rank shifts" description="Изменение позиции после доната отображается на live-screen и в профиле." checked={true} onChange={() => {}} />
              <ToggleRow title="Скрывать paused рейтинги" description="Неактуальные рейтинги не попадают в публичные consumer screens." checked={true} onChange={() => {}} />
            </SettingsCard>
          </div>
        );

      case 'rooms':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Комнаты" subtitle="Дефолтные параметры комнат поддержки и модерации.">
              <InfoRow icon={<ShieldIcon />} label="Порог жалоб" value="3 жалобы → review · 5 жалоб → auto-limit" />
              <InfoRow icon={<SparkIcon />} label="Новая комната по умолчанию" value="Фан-комната · до 250 участников" />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Slow mode" value="8 сек." />
                <MetricPill label="Pinned slots" value="2 сообщения" />
              </div>
            </SettingsCard>

            <SettingsCard title="Комнатная активность" subtitle="Контроль всплесков, auto-prompts и связки с live events.">
              <ToggleRow title="Авто-промпты поддержки" description="Система предлагает one-tap actions при росте энергии комнаты." checked={true} onChange={() => {}} />
              <ToggleRow title="Momentum highlights" description="Ключевые пики активности показываются в карточках комнаты и moderation queue." checked={true} onChange={() => {}} />
            </SettingsCard>
          </div>
        );

      case 'integrations':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Интеграции" subtitle="Платёжные, messaging и data-интеграции FUNDON.">
              <InfoRow icon={<WalletIcon />} label="PSP Webhooks" value="3 endpoints · last sync 2 мин. назад" />
              <InfoRow icon={<BellIcon />} label="Push gateway" value="Firebase · status stable" />
              <InfoRow icon={<HistoryIcon />} label="Data warehouse" value="BigQuery sync · каждые 30 мин." />
            </SettingsCard>

            <SettingsCard title="API и ключи" subtitle="Технические доступы и ключи интеграций, спрятанные за operational abstraction.">
              <MetricPill label="Активные ключи" value="12" />
              <MetricPill label="Скоро истекают" value="2" />
              <InfoRow icon={<ShieldIcon />} label="IP allowlist" value="7 адресов · production only" quiet />
            </SettingsCard>
          </div>
        );

      case 'flags':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Feature Flags" subtitle="Контролируемый rollout новых product-функций.">
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

            <SettingsCard title="Эксперименты" subtitle="Управление rollout-сегментами и оперативный rollback.">
              <InfoRow icon={<SparkIcon />} label="Current canary" value="Room Momentum Cards · internal beta" />
              <InfoRow icon={<HistoryIcon />} label="Rollback window" value="Мгновенный rollback · 1 click" quiet />
            </SettingsCard>
          </div>
        );

      case 'security':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Безопасность" subtitle="SSO, сессии и защитные политики admin-контура.">
              <ToggleRow title="Обязательная 2FA" description="Требуется для всех admin-ролей без исключений." checked={true} onChange={() => {}} />
              <ToggleRow title="Device verification" description="Новый device access требует подтверждения через email + audit запись." checked={true} onChange={() => {}} />
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Session TTL" value="12 часов" />
                <MetricPill label="Password rotation" value="90 дней" />
              </div>
            </SettingsCard>

            <SettingsCard title="Контроль риска" subtitle="Связка admin-контура с moderation и suspicious payment logic.">
              <InfoRow icon={<ShieldIcon />} label="Risk escalation" value="Moderation queue · critical path" />
              <InfoRow icon={<AlertIconFallback />} label="Alert threshold" value="7 suspicious transactions / 10 мин." quiet />
            </SettingsCard>
          </div>
        );

      case 'audit':
        return (
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingsCard title="Audit Log" subtitle="История административных изменений и access events.">
              <div className="space-y-3">
                {adminAuditEntries.map((entry) => (
                  <div key={entry.id} className="rounded-[16px] border border-black/[0.045] bg-[linear-gradient(180deg,#ffffff_0%,#fafbfe_100%)] px-4 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.94rem] font-semibold text-slate-900">{entry.title}</p>
                        <p className="mt-1 text-[0.84rem] leading-5 text-slate-600">{entry.description}</p>
                      </div>
                      <span className="shrink-0 text-[0.8rem] text-slate-400">{entry.at}</span>
                    </div>
                    <p className="mt-2 text-[0.82rem] text-slate-500">{entry.actor}</p>
                  </div>
                ))}
              </div>
            </SettingsCard>

            <SettingsCard title="Хранение логов" subtitle="Retention, экспорт и доступ к системным журналам.">
              <div className="grid grid-cols-2 gap-3">
                <MetricPill label="Retention" value="180 дней" />
                <MetricPill label="Экспорт" value="CSV / JSON" />
              </div>
              <InfoRow icon={<HistoryIcon />} label="Последняя выгрузка" value="Сегодня, 09:40 · security audit" />
              <InfoRow icon={<ShieldIcon />} label="Immutable storage" value="Включено для critical changes" quiet />
            </SettingsCard>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-black/[0.05] bg-white/92 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center gap-1.5">
          {adminSettingsTabs.map((tab) => (
            <TabButton key={tab.id} active={tab.id === activeTab} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </TabButton>
          ))}
        </div>
      </section>

      {renderContent()}
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
