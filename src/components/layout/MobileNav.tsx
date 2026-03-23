"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

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

  const navItems = useMemo(
    () => [
      {
        href: "/home",
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
    [language]
  );

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-5">
      <div
        className="pointer-events-auto w-full rounded-[28px] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,249,252,0.78))] p-2 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl ring-1 ring-white/48 dark:border-white/[0.07] dark:bg-[linear-gradient(180deg,rgba(21,28,42,0.80),rgba(13,19,31,0.76))] dark:shadow-[0_14px_26px_rgba(2,6,23,0.24)] dark:ring-white/5"
        style={{ maxWidth: "calc(var(--page-max-width) - (var(--page-padding-x) * 2))" }}
      >
        <div className="grid grid-cols-5 gap-1.5">
          {navItems.map(({ href, icon: Icon, key, label }) => {
            const isActive =
              key === "home"
                ? pathname === "/home" || pathname === "/"
                : key === "search"
                  ? pathname === "/sports" || pathname?.startsWith("/sports/")
                  : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={`${key}-${href}`}
                href={href}
                aria-label={label}
                className={cn(
                  "group flex h-14 items-center justify-center rounded-[22px] transition-all duration-200",
                  isActive
                    ? "bg-[linear-gradient(180deg,rgba(255,122,63,0.10),rgba(255,255,255,0.82))] text-[rgb(var(--text-primary))] shadow-[0_8px_18px_rgba(255,124,65,0.10)] ring-1 ring-white/50 dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.12),rgba(255,255,255,0.04))] dark:text-white dark:shadow-[0_8px_18px_rgba(255,124,65,0.08)] dark:ring-white/6"
                    : "text-[color:var(--text-secondary)] hover:bg-black/[0.04] hover:text-[color:var(--text-primary)] dark:hover:bg-white/[0.06] dark:hover:text-[color:var(--text-primary)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                    isActive
                      ? "bg-white/74 text-[rgb(var(--accent-orange))] shadow-[0_6px_14px_rgba(255,255,255,0.34)] dark:bg-white/[0.09] dark:text-[rgb(var(--accent-orange))] dark:shadow-none"
                      : "bg-transparent text-current group-hover:bg-white/70 group-hover:shadow-[0_8px_18px_rgba(255,255,255,0.36)] dark:group-hover:bg-white/8 dark:group-hover:shadow-none",
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
