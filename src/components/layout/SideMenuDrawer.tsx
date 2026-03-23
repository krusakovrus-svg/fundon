'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { mockData } from '@/data/mock';
import { isSportEventLive } from '@/data/sportEvents';
import { getSportById } from '@/data/sports';
import { formatCurrency } from '@/lib/format';
import { getStoredProfileAvatar, PROFILE_AVATAR_UPDATED_EVENT } from '@/lib/profileAvatar';
import { getStoredProfileName, PROFILE_NAME_UPDATED_EVENT } from '@/lib/profileName';
import { getStoredSportPath } from '@/lib/sportsHome';
import { cn } from '@/lib/utils';

interface SideMenuDrawerProps {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
}

interface DrawerItem {
  href: string;
  label: string;
  subtitle?: string;
  badge?: string | number;
  matches: (path: string) => boolean;
}

function getSportIdFromPath(path: string) {
  if (!path.startsWith('/sports/')) return 'martial-arts';
  return path.replace('/sports/', '') || 'martial-arts';
}

function DrawerLink({ item, currentPath, onClose }: { item: DrawerItem; currentPath: string; onClose: () => void }) {
  const isActive = item.matches(currentPath);
  const showBadge = item.badge !== undefined && item.badge !== 0 && item.badge !== '0';

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        'group flex items-center justify-between gap-3 rounded-[18px] border px-3 py-3 transition duration-200',
        isActive
          ? 'border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,249,252,0.94))] text-text-primary shadow-[0_10px_22px_rgba(15,23,42,0.05)] dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(255,124,65,0.10),rgba(255,255,255,0.035))] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
          : 'border-transparent text-text-primary hover:border-black/[0.035] hover:bg-white/[0.62] dark:text-white/[0.92] dark:hover:border-white/[0.04] dark:hover:bg-white/[0.045]'
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold leading-[1.15] tracking-tight text-text-primary dark:text-white/[0.94]">
          {item.label}
        </p>
        {item.subtitle ? (
          <p className="mt-1 truncate text-[11px] leading-[1.2] text-text-secondary/80 dark:text-white/[0.42]">{item.subtitle}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {showBadge ? (
          <span className="inline-flex min-w-[1.55rem] items-center justify-center rounded-full border border-black/[0.045] bg-[rgba(247,249,252,0.92)] px-1.5 py-0.5 text-[10px] font-medium text-text-secondary dark:border-white/[0.06] dark:bg-white/[0.045] dark:text-white/[0.62]">
            {item.badge}
          </span>
        ) : null}

        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full transition',
            isActive ? 'bg-accent-orange' : 'bg-transparent group-hover:bg-black/[0.16] dark:group-hover:bg-white/[0.14]'
          )}
        />
      </div>
    </Link>
  );
}

export function SideMenuDrawer({ isOpen, currentPath, onClose }: SideMenuDrawerProps) {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const [storedHomePath, setStoredHomePath] = useState('/sports/martial-arts');
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [storedProfileName, setStoredProfileName] = useState<string | null>(null);

  useEffect(() => {
    setStoredHomePath(getStoredSportPath());
  }, []);

  useEffect(() => {
    const syncAvatar = () => {
      setAvatarImage(getStoredProfileAvatar());
    };

    syncAvatar();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === 'fundon.profile.avatar') {
        syncAvatar();
      }
    };

    const handleAvatarUpdated = () => {
      syncAvatar();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(PROFILE_AVATAR_UPDATED_EVENT, handleAvatarUpdated);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(PROFILE_AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    };
  }, []);

  useEffect(() => {
    const syncProfileName = () => {
      setStoredProfileName(getStoredProfileName());
    };

    syncProfileName();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === 'fundon.profile.name') {
        syncProfileName();
      }
    };

    const handleProfileNameUpdated = () => {
      syncProfileName();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(PROFILE_NAME_UPDATED_EVENT, handleProfileNameUpdated);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(PROFILE_NAME_UPDATED_EVENT, handleProfileNameUpdated);
    };
  }, []);

  const currentSport = getSportById(getSportIdFromPath(storedHomePath));
  const currentSportLabel = currentSport ? (language === 'ru' ? currentSport.labelRu : currentSport.label) : '';
  const favoriteCount = favorites.length;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const displayName = storedProfileName?.trim() || t('you');
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const walletBalanceLabel = formatCurrency(mockData.profile.walletBalance, language);
  const compactSwitcherClass =
    'w-full justify-between rounded-[13px] bg-transparent p-[2px] [&_button]:min-h-[28px] [&_button]:rounded-[10px] [&_button]:px-2 [&_button]:py-1 [&_button]:text-[11px] [&_button]:leading-none';

  const mainItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: '/home',
        label: language === 'ru' ? 'Главная' : 'Home',
        subtitle: currentSportLabel,
        matches: (path) => path === '/home' || path === '/'
      },
      {
        href: '/live',
        label: t('navLive'),
        matches: (path) => path.startsWith('/live')
      },
      {
        href: '/events',
        label: t('navEvents'),
        matches: (path) => path.startsWith('/events')
      },
      {
        href: '/sports',
        label: language === 'ru' ? 'Виды спорта' : 'Sports',
        subtitle: currentSportLabel || undefined,
        matches: (path) => path.startsWith('/sports')
      }
    ],
    [currentSportLabel, language, t]
  );

  const personalItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: '/profile',
        label: t('navProfile'),
        matches: (path) => path.startsWith('/profile')
      },
      {
        href: '/favorites',
        label: t('favoritesTitle'),
        badge: favoriteCount,
        matches: (path) => path.startsWith('/favorites')
      },
      {
        href: '/notifications',
        label: t('notificationsTitle'),
        badge: liveFavoriteCount,
        matches: (path) => path.startsWith('/notifications')
      }
    ],
    [favoriteCount, liveFavoriteCount, t]
  );

  const socialItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: '/leaderboard',
        label: t('navLeaderboard'),
        matches: (path) => path.startsWith('/leaderboard')
      },
      {
        href: '/rooms',
        label: t('navRooms'),
        matches: (path) => path.startsWith('/rooms')
      },
      {
        href: '/settings',
        label: t('settings'),
        matches: (path) => path.startsWith('/settings')
      }
    ],
    [t]
  );

  return (
    <motion.aside
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : -24,
        scale: isOpen ? 1 : 0.985
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'pointer-events-none absolute left-0 top-0 h-dvh w-[74%] max-w-[288px] py-2 pr-3',
        isOpen && 'pointer-events-auto'
      )}
      aria-hidden={!isOpen}
    >
      <div className="app-card flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] px-4 py-4 dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(20,27,41,0.94),rgba(13,18,30,0.92))] dark:shadow-[0_18px_40px_rgba(2,6,23,0.30)]">
        <div className="rounded-[1.45rem] border border-black/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,249,252,0.78))] px-3.5 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/[0.05] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.028))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-black/[0.04] bg-white text-[15px] font-semibold text-text-primary shadow-[0_6px_16px_rgba(15,23,42,0.06)] dark:border-white/[0.04] dark:bg-white/[0.06] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              {avatarImage ? <img src={avatarImage} alt={displayName} className="h-full w-full object-cover" /> : avatarLetter}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight text-text-primary dark:text-white/[0.94]">{displayName}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-text-secondary dark:text-white/[0.52]">
                <span className="inline-flex items-center rounded-full border border-black/[0.035] bg-white/86 px-2 py-0.5 font-medium dark:border dark:border-white/[0.04] dark:bg-white/[0.045]">
                  #{mockData.profile.currentRank}
                </span>
                <span className="inline-flex items-center rounded-full border border-black/[0.035] bg-white/86 px-2 py-0.5 font-medium dark:border dark:border-white/[0.04] dark:bg-white/[0.045]">
                  {mockData.profile.points} {t('points')}
                </span>
                <span className="inline-flex items-center rounded-full border border-black/[0.035] bg-white/86 px-2 py-0.5 font-medium dark:border dark:border-white/[0.04] dark:bg-white/[0.045]">
                  {walletBalanceLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
          <div className="space-y-1">
            {mainItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-1 border-t border-black/[0.045] pt-3 dark:border-white/[0.04]">
            {personalItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-1 border-t border-black/[0.045] pt-3 dark:border-white/[0.04]">
            {socialItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-2 border-t border-black/[0.045] pt-3 dark:border-white/[0.04]">
            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-[rgba(247,249,252,0.7)] dark:hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary dark:text-white/[0.48]">{t('language')}</p>
              </div>
              <div className="w-[86px] shrink-0">
                <LanguageSwitcher className={compactSwitcherClass} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-[rgba(247,249,252,0.7)] dark:hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary dark:text-white/[0.48]">{t('theme')}</p>
              </div>
              <div className="w-[86px] shrink-0">
                <ThemeSwitcher className={compactSwitcherClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
