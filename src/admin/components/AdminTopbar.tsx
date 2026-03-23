'use client';

import { usePathname } from 'next/navigation';

import { getAdminPageMeta } from '@/admin/data/navigation';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16 21 21" strokeLinecap="round" />
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3.5V7" strokeLinecap="round" />
      <path d="M16 3.5V7" strokeLinecap="round" />
      <path d="M4 10h16" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminTopbar() {
  const pathname = usePathname();
  const meta = getAdminPageMeta(pathname);
  const showNotifications = meta.showNotifications ?? true;
  const showProfile = meta.showProfile ?? true;

  return (
    <header className="sticky top-0 z-20 border-b border-black/[0.05] bg-[rgba(255,255,255,0.84)] px-8 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-[1.85rem] font-semibold tracking-tight text-slate-900">{meta.title}</p>
          {meta.description ? <p className="mt-1 text-sm text-slate-500">{meta.description}</p> : null}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex min-w-[20rem] items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white/92 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder={meta.searchPlaceholder}
              className="w-full bg-transparent text-[0.95rem] text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          {meta.periodLabel ? (
            <button
              type="button"
              className="flex items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white/92 px-4 py-3 text-[0.95rem] font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            >
              <CalendarIcon />
              <span>{meta.periodLabel}</span>
              <ChevronDownIcon />
            </button>
          ) : null}

          {meta.comparePeriodLabel ? (
            <button
              type="button"
              className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3 text-[0.92rem] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            >
              {meta.comparePeriodLabel}
            </button>
          ) : null}

          {showNotifications ? (
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-[15px] border border-black/[0.05] bg-white/92 text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
              aria-label="Notifications"
            >
              <BellIcon />
              <span className="absolute right-1.5 top-1.5 flex h-[1.05rem] min-w-[1.05rem] items-center justify-center rounded-full border border-[#f4d4c1] bg-[#fff6f0] px-1 text-[0.62rem] font-semibold text-[#cd7b47]">
                3
              </span>
            </button>
          ) : null}

          {showProfile ? (
            <button
              type="button"
              className="flex items-center gap-3 rounded-[18px] border border-black/[0.05] bg-white/94 px-3 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
            >
              <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#f3d7c8_0%,#d9946e_100%)]" />
              <div className="text-left">
                <p className="text-[0.95rem] font-semibold text-slate-900">Администратор</p>
                <p className="text-xs text-slate-500">Operations lead</p>
              </div>
              <ChevronDownIcon />
            </button>
          ) : null}

          {meta.secondaryActionLabel ? (
            <button
              type="button"
              className="rounded-[16px] border border-black/[0.06] bg-white px-5 py-3 text-[0.95rem] font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.05)]"
            >
              {meta.secondaryActionLabel}
            </button>
          ) : null}

          {meta.primaryActionLabel ? (
            <button
              type="button"
              className="rounded-[16px] bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(79,143,246,0.22)]"
            >
              {meta.primaryActionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
