'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { mockData } from '@/data/mock';
import { cn } from '@/lib/utils';

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M19 12H5" strokeLinecap="round" />
      <path d="M11 6L5 12L11 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M6 8H18" strokeLinecap="round" />
      <path d="M6 12H18" strokeLinecap="round" />
      <path d="M6 16H18" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        d="M12 4.4l2.28 4.62 5.1.74-3.69 3.6.87 5.08L12 16.08l-4.56 2.4.87-5.08-3.69-3.6 5.1-.74z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        d="M7.5 9.5a4.5 4.5 0 019 0v3.1c0 .7.22 1.39.63 1.95l.9 1.25A1 1 0 0117.22 17H6.78a1 1 0 01-.81-1.6l.9-1.25c.4-.56.63-1.25.63-1.95V9.5z"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 004 0" strokeLinecap="round" />
    </svg>
  );
}

interface TopUtilityBarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function TopUtilityBar({ isMenuOpen, onToggleMenu }: TopUtilityBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, t } = useLanguage();
  const balance = mockData.profile.walletBalance;
  const isHomePage = pathname === '/home';
  const isSportsPage = pathname?.startsWith('/sports');
  const isFavoritesPage = pathname?.startsWith('/favorites');
  const isNotificationsPage = pathname?.startsWith('/notifications');
  const menuLabel = language === 'ru' ? 'Меню' : 'Menu';

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/live');
  };

  if (isHomePage) {
    return (
      <div className="app-topbar-wrap">
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
            className="app-topbar-icon app-card shrink-0"
          >
            <MenuIcon />
          </button>

          <div className="min-w-0 flex-1 px-1 text-center">
            <p className="truncate text-[1.02rem] font-semibold tracking-tight text-text-primary">
              {language === 'ru' ? 'Главная' : 'Home'}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button type="button" aria-label={t('balanceLabel')} className="app-topbar-balance app-card min-w-[5.5rem] px-3">
              <span className="inline-flex items-center justify-center gap-1.5 text-[1rem] font-semibold tracking-tight text-text-primary">
                <span>${balance}</span>
                <span className="text-accent-green">+</span>
              </span>
            </button>

            <Link
              href="/notifications"
              aria-label={t('notificationsLabel')}
              className={cn('app-topbar-icon app-card', isNotificationsPage && 'text-accent')}
            >
              <BellIcon />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-topbar-wrap">
      <div className="app-topbar-grid">
        <button
          type="button"
          aria-label={menuLabel}
          aria-expanded={isMenuOpen}
          onClick={onToggleMenu}
          className="app-topbar-icon app-card"
        >
          <MenuIcon />
        </button>

        {isSportsPage ? (
          <button type="button" aria-label={t('backLabel')} onClick={handleBack} className="app-topbar-icon app-card">
            <ArrowLeftIcon />
          </button>
        ) : (
          <Link href="/sports" aria-label={t('searchLabel')} className="app-topbar-icon app-card">
            <SearchIcon />
          </Link>
        )}

        <button type="button" aria-label={t('balanceLabel')} className="app-topbar-balance app-card">
          <span className="inline-flex items-center justify-center gap-1.5 text-[1.05rem] font-semibold tracking-tight text-text-primary">
            <span>${balance}</span>
            <span className="text-accent-green">+</span>
          </span>
        </button>

        <Link
          href="/favorites"
          aria-label={t('favoritesTitle')}
          className={cn('app-topbar-icon app-card', isFavoritesPage && 'text-[#f4c542]')}
        >
          <StarIcon />
        </Link>

        <Link
          href="/notifications"
          aria-label={t('notificationsLabel')}
          className={cn('app-topbar-icon app-card', isNotificationsPage && 'text-accent')}
        >
          <BellIcon />
        </Link>
      </div>
    </div>
  );
}
