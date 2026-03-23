'use client';

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

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/[0.05] bg-[rgba(255,255,255,0.82)] px-8 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-[1.85rem] font-semibold tracking-tight text-slate-900">Дашборд</p>
          <p className="mt-1 text-sm text-slate-500">Операционный центр live-событий, донатов и модерации</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex min-w-[19rem] items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white/88 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Поиск по событиям, донатам и пользователям"
              className="w-full bg-transparent text-[0.95rem] text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            className="flex items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white/88 px-4 py-3 text-[0.95rem] font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
          >
            <CalendarIcon />
            <span>01.06.2024 — 07.06.2024</span>
          </button>

          <button
            type="button"
            className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-black/[0.05] bg-white/88 text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2 top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#ff6c5c] px-1 text-[0.68rem] font-semibold text-white">3</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-[18px] border border-black/[0.05] bg-white/92 px-3 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
          >
            <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#f2c9b7_0%,#d9946e_100%)]" />
            <div className="text-left">
              <p className="text-[0.95rem] font-semibold text-slate-900">Администратор</p>
              <p className="text-xs text-slate-500">Operations lead</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
