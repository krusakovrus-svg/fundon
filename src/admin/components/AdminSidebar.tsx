'use client';

import { adminNavItems } from '@/admin/data/dashboard';
import { cn } from '@/lib/utils';

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="11" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="17" width="7" height="3" rx="1.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.6 19.2a7.2 7.2 0 0 1 12.8 0" strokeLinecap="round" />
    </svg>
  );
}

function AthleteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v5" strokeLinecap="round" />
      <path d="M8.2 7.2 5 10.5" strokeLinecap="round" />
      <path d="M15.8 7.2 19 10.5" strokeLinecap="round" />
      <path d="M7.5 20.5h9l2-7.5H5.5z" strokeLinejoin="round" />
    </svg>
  );
}

function EventIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3.5V7" strokeLinecap="round" />
      <path d="M16 3.5V7" strokeLinecap="round" />
      <path d="M4 10h16" strokeLinecap="round" />
    </svg>
  );
}

function DonationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v18" strokeLinecap="round" />
      <path d="M16.5 7.5c0-1.9-2-3.5-4.5-3.5S7.5 5.6 7.5 7.5 9.5 11 12 11s4.5 1.6 4.5 3.5S14.5 18 12 18s-4.5-1.6-4.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function RoomsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="6" width="8" height="6" rx="2" />
      <rect x="12" y="12" width="8" height="6" rx="2" />
      <path d="M12 9h2" strokeLinecap="round" />
      <path d="M10 15H8" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 16.5h11L16 14V10a4 4 0 1 0-8 0v4z" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 19V9" strokeLinecap="round" />
      <path d="M12 19V5" strokeLinecap="round" />
      <path d="M19 19v-7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.3-2.8 7.7-7 10-4.2-2.3-7-5.7-7-10V6z" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z" strokeLinejoin="round" />
    </svg>
  );
}

const iconById = {
  dashboard: DashboardIcon,
  users: UserIcon,
  athletes: AthleteIcon,
  events: EventIcon,
  donations: DonationIcon,
  rooms: RoomsIcon,
  notifications: BellIcon,
  analytics: AnalyticsIcon,
  moderation: ShieldIcon,
  settings: SettingsIcon
} satisfies Record<string, () => JSX.Element>;

const sections = [
  { id: 'main', label: 'Основное' },
  { id: 'community', label: 'Комьюнити' },
  { id: 'system', label: 'Система' }
] as const;

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 flex h-dvh w-[17rem] shrink-0 flex-col border-r border-black/[0.05] bg-[linear-gradient(180deg,#fbfcfe_0%,#f6f7fb_100%)] px-5 py-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#4f8ff6_0%,#6aa8ff_100%)] text-white shadow-[0_14px_30px_rgba(79,143,246,0.24)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 7h16v10H4z" />
            <path d="M8 17V7" />
          </svg>
        </div>
        <div>
          <p className="text-[1.55rem] font-semibold tracking-tight text-slate-900">FUNDON</p>
          <p className="text-sm text-slate-500">Admin Console</p>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {sections.map((section) => (
          <div key={section.id} className="space-y-2.5">
            <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{section.label}</p>

            <div className="space-y-1">
              {adminNavItems
                .filter((item) => item.section === section.id)
                .map((item) => {
                  const Icon = iconById[item.id as keyof typeof iconById];

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(
                        'flex w-full items-center gap-3 rounded-[16px] px-3.5 py-3 text-left text-[0.95rem] font-medium transition',
                        item.active
                          ? 'bg-[linear-gradient(180deg,#eef5ff_0%,#e8f1fe_100%)] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_rgba(79,143,246,0.12)] ring-1 ring-[#dbe7fb]'
                          : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_22px_rgba(15,23,42,0.05)]'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-[12px]',
                          item.active ? 'bg-white text-[#4f8ff6] shadow-[0_6px_14px_rgba(79,143,246,0.15)]' : 'bg-white/75 text-slate-400'
                        )}
                      >
                        <Icon />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
