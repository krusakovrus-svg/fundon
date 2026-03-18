"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { DEFAULT_SPORT_PATH, getStoredSportPath } from "@/lib/sportsHome";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.8 10.4L12 4.8l7.2 5.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 9.6V19h9.6V9.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M5.8 8.2a8.2 8.2 0 000 7.6" strokeLinecap="round" />
      <path d="M18.2 8.2a8.2 8.2 0 010 7.6" strokeLinecap="round" />
      <path d="M2.7 5.2a12 12 0 000 13.6" strokeLinecap="round" />
      <path d="M21.3 5.2a12 12 0 010 13.6" strokeLinecap="round" />
    </svg>
  );
}

function EventsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
      <path d="M8 3.5V7" strokeLinecap="round" />
      <path d="M16 3.5V7" strokeLinecap="round" />
      <path d="M4 10H20" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8.5" r="3.3" />
      <path d="M6.1 19.4a6.3 6.3 0 0111.8 0" strokeLinecap="round" />
    </svg>
  );
}

type StaticNavItem = {
  href: string;
  key: "search" | "events" | "live" | "profile";
  icon: () => JSX.Element;
  getLabel: (language: "ru" | "en") => string;
};

const staticNavItems: StaticNavItem[] = [
  { href: "/sports", key: "search", icon: SearchIcon, getLabel: (language) => (language === "ru" ? "Поиск" : "Search") },
  { href: "/events", key: "events", icon: EventsIcon, getLabel: (language) => (language === "ru" ? "События" : "Events") },
  { href: "/live", key: "live", icon: LiveIcon, getLabel: (language) => (language === "ru" ? "Эфир" : "Live") },
  { href: "/profile", key: "profile", icon: ProfileIcon, getLabel: (language) => (language === "ru" ? "Профиль" : "Profile") },
];

export function MobileNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [homeHref, setHomeHref] = useState(DEFAULT_SPORT_PATH);

  useEffect(() => {
    setHomeHref(getStoredSportPath());
  }, [pathname]);

  const navItems = useMemo(
    () => [
      {
        href: homeHref,
        key: "home" as const,
        icon: HomeIcon,
        label: language === "ru" ? "Дом" : "Home",
      },
      ...staticNavItems.map((item) => ({
        href: item.href,
        key: item.key,
        icon: item.icon,
        label: item.getLabel(language),
      })),
    ],
    [homeHref, language]
  );

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-5">
      <div
        className="pointer-events-auto w-full rounded-[28px] border border-white/65 bg-[color:var(--nav-surface)]/92 p-2 shadow-[0_18px_42px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-white/45 dark:border-white/10 dark:bg-[color:var(--nav-surface)]/88 dark:shadow-[0_24px_52px_rgba(2,6,23,0.52)] dark:ring-white/8"
        style={{ maxWidth: "calc(var(--page-max-width) - (var(--page-padding-x) * 2))" }}
      >
        <div className="grid grid-cols-5 gap-1.5">
          {navItems.map(({ href, icon: Icon, key, label }) => {
            const isActive =
              key === "home"
                ? pathname.startsWith("/sports/") && pathname !== "/sports"
                : key === "search"
                  ? pathname === "/sports"
                  : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={`${key}-${href}`}
                href={href}
                aria-label={label}
                className={cn(
                  "group flex h-14 items-center justify-center rounded-[22px] transition-all duration-200",
                  isActive
                    ? "bg-[color:var(--nav-active-surface)] text-[color:var(--nav-active-text)] shadow-[0_10px_24px_rgba(255,87,34,0.18)] dark:shadow-[0_14px_30px_rgba(255,94,58,0.2)]"
                    : "text-[color:var(--text-secondary)] hover:bg-black/[0.04] hover:text-[color:var(--text-primary)] dark:hover:bg-white/[0.06] dark:hover:text-[color:var(--text-primary)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                    isActive
                      ? "bg-white/80 text-[color:var(--nav-active-icon)] shadow-[0_10px_22px_rgba(255,255,255,0.62)] dark:bg-white/12 dark:text-white dark:shadow-none"
                      : "bg-transparent text-current group-hover:bg-white/75 group-hover:shadow-[0_8px_18px_rgba(255,255,255,0.45)] dark:group-hover:bg-white/10 dark:group-hover:shadow-none",
                  )}
                >
                  <Icon />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
