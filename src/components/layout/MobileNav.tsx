"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { appRoutes, normalizeAppPath } from "@/lib/routing";
import { cn } from "@/lib/utils";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.8 10.4L12 4.8l7.2 5.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 9.6V19h9.6V9.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
      <path d="M8 3.5V7" strokeLinecap="round" />
      <path d="M16 3.5V7" strokeLinecap="round" />
      <path d="M4 10H20" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8.5" r="3.3" />
      <path d="M6.1 19.4a6.3 6.3 0 0111.8 0" strokeLinecap="round" />
    </svg>
  );
}

type StaticNavItem = {
  href: string;
  key: "search" | "events" | "live" | "profile";
  icon: () => JSX.Element;
  label: string;
};

export function MobileNav() {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const normalizedPath = normalizeAppPath(pathname);

  const navItems = useMemo(
    () =>
      [
        {
          href: appRoutes.home,
          key: "home" as const,
          icon: HomeIcon,
          label: language === "ru" ? "\u0414\u043e\u043c" : "Home",
        },
        {
          href: appRoutes.sports,
          key: "search" as const,
          icon: SearchIcon,
          label: t("searchLabel"),
        },
        {
          href: appRoutes.events,
          key: "events" as const,
          icon: EventsIcon,
          label: t("navEvents"),
        },
        {
          href: appRoutes.live,
          key: "live" as const,
          icon: LiveIcon,
          label: t("navLive"),
        },
        {
          href: appRoutes.profile,
          key: "profile" as const,
          icon: ProfileIcon,
          label: t("navProfile"),
        },
      ] satisfies Array<StaticNavItem | { href: string; key: "home"; icon: () => JSX.Element; label: string }>,
    [language, t]
  );

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-5">
      <div
        className="pointer-events-auto w-full rounded-[30px] border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,249,252,0.76))] p-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.07)] backdrop-blur-xl ring-1 ring-white/46 dark:border-white/[0.045] dark:bg-[linear-gradient(180deg,rgba(18,24,37,0.80),rgba(12,17,28,0.78))] dark:shadow-[0_8px_16px_rgba(2,6,23,0.10)] dark:ring-white/[0.035]"
        style={{ maxWidth: "calc(var(--page-max-width) - (var(--page-padding-x) * 2))" }}
      >
        <div className="grid grid-cols-5 gap-1">
          {navItems.map(({ href, icon: Icon, key, label }) => {
            const isActive =
              key === "home"
                ? normalizedPath === appRoutes.home
                : key === "search"
                  ? normalizedPath === appRoutes.sports || normalizedPath.startsWith(`${appRoutes.sports}/`)
                  : normalizedPath === href || normalizedPath.startsWith(`${href}/`);

            return (
              <Link
                key={`${key}-${href}`}
                href={href}
                aria-label={label}
                className={cn(
                  "group flex h-[3.35rem] items-center justify-center rounded-[24px] transition-all duration-200",
                  isActive
                    ? "bg-[linear-gradient(180deg,rgba(255,122,63,0.07),rgba(255,255,255,0.72))] text-[rgb(var(--text-primary))] shadow-[0_8px_16px_rgba(255,124,65,0.07)] ring-1 ring-white/40 dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.065),rgba(255,255,255,0.018))] dark:text-white dark:shadow-[0_5px_10px_rgba(255,124,65,0.035)] dark:ring-white/[0.035]"
                    : "text-[color:var(--text-secondary)] hover:bg-black/[0.03] hover:text-[color:var(--text-primary)] dark:hover:bg-white/[0.05] dark:hover:text-[color:var(--text-primary)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
                    isActive
                      ? "bg-white/68 text-[rgb(var(--accent-orange))] shadow-[0_5px_12px_rgba(255,255,255,0.2)] dark:bg-white/[0.04] dark:text-[rgb(var(--accent-orange))] dark:shadow-none"
                      : "bg-transparent text-current group-hover:bg-white/68 group-hover:shadow-[0_6px_14px_rgba(255,255,255,0.24)] dark:group-hover:bg-white/[0.05] dark:group-hover:shadow-none",
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
