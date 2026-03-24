'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { mockData } from '@/data/mock';
import { formatCurrency } from '@/lib/format';
import { appRoutes, normalizeAppPath } from '@/lib/routing';
import { cn } from '@/lib/utils';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <path d="M19 12H5" strokeLinecap="round" />
      <path d="M11 6L5 12L11 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <path d="M6 8H18" strokeLinecap="round" />
      <path d="M6 12H18" strokeLinecap="round" />
      <path d="M6 16H18" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <path
        d="M12 4.4l2.28 4.62 5.1.74-3.69 3.6.87 5.08L12 16.08l-4.56 2.4.87-5.08-3.69-3.6 5.1-.74z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.12rem] w-[1.12rem]" fill="none" stroke="currentColor" strokeWidth="1.85">
      <path
        d="M7.5 9.5a4.5 4.5 0 019 0v3.1c0 .7.22 1.39.63 1.95l.9 1.25A1 1 0 0117.22 17H6.78a1 1 0 01-.81-1.6l.9-1.25c.4-.56.63-1.25.63-1.95V9.5z"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 004 0" strokeLinecap="round" />
    </svg>
  );
}

export function TopUtilityBar({ isMenuOpen, onToggleMenu }: { isMenuOpen: boolean; onToggleMenu: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();
  const normalizedPath = normalizeAppPath(pathname);
  const balanceLabel = formatCurrency(mockData.profile.walletBalance, language);
  const isHomePage = normalizedPath === appRoutes.home;
  const isSportsIndexPage = normalizedPath === appRoutes.sports;
  const isSportDetailPage = normalizedPath.startsWith(`${appRoutes.sports}/`);
  const isFavoritesPage = normalizedPath.startsWith(appRoutes.favorites);
  const isNotificationsPage = normalizedPath.startsWith(appRoutes.notifications);

  const menuLabel = language === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e' : 'Open menu';
  const homeTitle = language === 'ru' ? '\u0413\u043b\u0430\u0432\u043d\u0430\u044f' : 'Home';
  const sportsTitle = language === 'ru' ? '\u0421\u043f\u043e\u0440\u0442' : 'Sport';
  const surfaceClass =
    'app-card border border-black/[0.04] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,249,252,0.76))] shadow-[0_12px_24px_rgba(15,23,42,0.06)] dark:border-white/[0.06] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.78),rgba(13,18,30,0.74))] dark:shadow-[0_12px_22px_rgba(2,6,23,0.16)]';

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(appRoutes.live);
  };

  if (isHomePage || isSportsIndexPage) {
    const title = isHomePage ? homeTitle : sportsTitle;

    return (
      <div className="app-topbar-wrap">
        <div className="app-topbar-inner">
          <div className="relative flex items-center gap-3">
            <button
              type="button"
              aria-label={menuLabel}
              aria-expanded={isMenuOpen}
              onClick={onToggleMenu}
              className={cn('app-topbar-icon shrink-0', surfaceClass)}
            >
              <MenuIcon />
            </button>

            <div className="min-w-0 flex-1 px-1 text-center">
              <p className="truncate text-[1rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">{title}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <Link
                href={appRoutes.notifications}
                aria-label={t('notificationsLabel')}
                className={cn(
                  'app-topbar-icon',
                  surfaceClass,
                  isNotificationsPage && 'text-[rgb(var(--accent-orange))]'
                )}
              >
                <BellIcon />
              </Link>

              <button
                type="button"
                aria-label={t('balanceLabel')}
                className={cn('app-topbar-balance min-w-[6.7rem] px-3', surfaceClass)}
              >
                <span className="inline-flex items-center justify-center gap-1.5 text-[0.98rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">
                  <span>{balanceLabel}</span>
                  <span className="text-accent-green">+</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-topbar-wrap">
      <div className="app-topbar-inner">
        <div className="app-topbar-grid">
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
            className={cn('app-topbar-icon', surfaceClass)}
          >
            <MenuIcon />
          </button>

          {isSportDetailPage ? (
            <button type="button" aria-label={t('backLabel')} onClick={handleBack} className={cn('app-topbar-icon', surfaceClass)}>
              <ArrowLeftIcon />
            </button>
          ) : (
            <Link href={appRoutes.sports} aria-label={t('searchLabel')} className={cn('app-topbar-icon', surfaceClass)}>
              <SearchIcon />
            </Link>
          )}

          <button type="button" aria-label={t('balanceLabel')} className={cn('app-topbar-balance', surfaceClass)}>
            <span className="inline-flex items-center justify-center gap-1.5 text-[1rem] font-semibold tracking-tight text-text-primary dark:text-white/[0.94]">
              <span>{balanceLabel}</span>
              <span className="text-accent-green">+</span>
            </span>
          </button>

          <Link
            href={appRoutes.favorites}
            aria-label={t('favoritesTitle')}
            className={cn('app-topbar-icon', surfaceClass, isFavoritesPage && 'text-[rgb(var(--accent-orange))]')}
          >
            <StarIcon />
          </Link>

          <Link
            href={appRoutes.notifications}
            aria-label={t('notificationsLabel')}
            className={cn('app-topbar-icon', surfaceClass, isNotificationsPage && 'text-[rgb(var(--accent-orange))]')}
          >
            <BellIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
