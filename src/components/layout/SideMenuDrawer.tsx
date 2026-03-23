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

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        'group flex items-center justify-between gap-3 rounded-[20px] px-3 py-3 transition duration-200 dark:text-white dark:hover:text-white',
        isActive
          ? 'bg-white/70 text-text-primary shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:bg-white/8 dark:text-white dark:shadow-none'
          : 'text-text-primary hover:bg-white/40 dark:text-white dark:hover:bg-white/5'
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold leading-[1.15] tracking-tight dark:text-white">{item.label}</p>
        {item.subtitle ? <p className="mt-1 truncate text-[11px] leading-[1.2] text-text-secondary/80">{item.subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {item.badge !== undefined ? (
          <span className="inline-flex min-w-[1.6rem] items-center justify-center rounded-full border border-border/15 bg-white/55 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary dark:bg-white/8 dark:text-text-secondary">
            {item.badge}
          </span>
        ) : null}
        <span className={cn('h-1.5 w-1.5 rounded-full transition', isActive ? 'bg-accent-orange' : 'bg-transparent group-hover:bg-border/40')} />
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

  const preferredSportPath = storedHomePath;
  const currentSport = getSportById(getSportIdFromPath(preferredSportPath));
  const currentSportLabel = currentSport ? (language === 'ru' ? currentSport.labelRu : currentSport.label) : '';
  const favoriteCount = favorites.length;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const displayName = storedProfileName?.trim() || t('you');
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const compactSwitcherClass =
    'w-full justify-between rounded-[13px] bg-transparent p-[2px] [&_button]:min-h-[28px] [&_button]:rounded-[10px] [&_button]:px-2 [&_button]:py-1 [&_button]:text-[11px] [&_button]:leading-none';

  const primaryItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: '/home',
        label: language === 'ru' ? 'Дом' : 'Home',
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
    [currentSportLabel, favoriteCount, language, liveFavoriteCount, t]
  );

  const secondaryItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: '/profile',
        label: t('navProfile'),
        matches: (path) => path.startsWith('/profile')
      },
      {
        href: '/leaderboard',
        label: t('navLeaderboard'),
        matches: (path) => path.startsWith('/leaderboard')
      },
      {
        href: '/rooms',
        label: t('navRooms'),
        matches: (path) => path.startsWith('/rooms')
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
      <div className="app-card flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] px-4 py-4">
        <div className="rounded-[1.5rem] border border-white/40 bg-white/55 px-3.5 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white/75 text-[15px] font-semibold text-text-primary shadow-[0_6px_18px_rgba(15,23,42,0.08)] dark:bg-white/10 dark:text-white dark:shadow-none">
              {avatarImage ? (
                <img src={avatarImage} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                avatarLetter
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight text-text-primary">{displayName}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-text-secondary">
                <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 font-medium dark:bg-white/8">#{mockData.profile.currentRank}</span>
                <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 font-medium dark:bg-white/8">
                  {mockData.profile.points} {t('points')}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 font-medium dark:bg-white/8">${mockData.profile.walletBalance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
          <div className="space-y-1">
            {primaryItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-1 border-t border-border/6 pt-3">
            {secondaryItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-2 border-t border-border/6 pt-3">
            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-surface-subtle/50">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary">{t('language')}</p>
              </div>
              <div className="w-[86px] shrink-0">
                <LanguageSwitcher className={compactSwitcherClass} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-surface-subtle/50">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary">{t('theme')}</p>
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
