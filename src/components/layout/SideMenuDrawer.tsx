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
        'flex items-center justify-between gap-2.5 rounded-[18px] px-3 py-2.5 transition',
        isActive ? 'bg-accent-orange/12 text-text-primary' : 'text-text-primary hover:bg-surface-subtle/70'
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold leading-[1.15] tracking-tight">{item.label}</p>
        {item.subtitle ? <p className="mt-0.5 truncate text-[11px] leading-[1.2] text-text-secondary">{item.subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {item.badge !== undefined ? (
          <span className="app-pill min-w-[1.7rem] justify-center px-1.5 py-0.5 text-[10px]">{item.badge}</span>
        ) : null}
        <span className={cn('h-1.5 w-1.5 rounded-full transition', isActive ? 'bg-accent-orange' : 'bg-transparent')} />
      </div>
    </Link>
  );
}

export function SideMenuDrawer({ isOpen, currentPath, onClose }: SideMenuDrawerProps) {
  const { favorites } = useFavorites();
  const { language, t } = useLanguage();
  const [storedHomePath, setStoredHomePath] = useState('/sports/martial-arts');

  useEffect(() => {
    setStoredHomePath(getStoredSportPath());
  }, []);

  const homePath = currentPath.startsWith('/sports/') ? currentPath : storedHomePath;
  const currentSport = getSportById(getSportIdFromPath(homePath));
  const currentSportLabel = currentSport ? (language === 'ru' ? currentSport.labelRu : currentSport.label) : '';
  const favoriteCount = favorites.length;
  const liveFavoriteCount = favorites.filter((event) => isSportEventLive(event)).length;
  const displayName = t('you');
  const avatarLetter = displayName.slice(0, 1).toUpperCase();
  const compactSwitcherClass =
    'w-full justify-between rounded-[13px] bg-transparent p-[2px] [&_button]:min-h-[28px] [&_button]:rounded-[10px] [&_button]:px-2 [&_button]:py-1 [&_button]:text-[11px] [&_button]:leading-none';

  const primaryItems = useMemo<DrawerItem[]>(
    () => [
      {
        href: homePath,
        label: language === 'ru' ? 'Дом' : 'Home',
        subtitle: currentSportLabel,
        matches: (path) => path.startsWith('/sports/') && path !== '/sports'
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
    [currentSportLabel, favoriteCount, homePath, language, liveFavoriteCount, t]
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
        'pointer-events-none absolute inset-y-0 left-0 w-[74%] max-w-[288px] pr-3 pt-4 pb-28',
        isOpen && 'pointer-events-auto'
      )}
      aria-hidden={!isOpen}
    >
      <div className="app-card flex h-full min-h-0 flex-col overflow-hidden rounded-[1.9rem] px-4 py-4">
        <div className="rounded-[1.35rem] border border-border/15 bg-surface-muted/85 px-3.5 py-3.5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-accent-orange/12 text-base font-semibold text-accent-orange">
              {avatarLetter}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight text-text-primary">{displayName}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-text-secondary">
                <span className="app-pill">#{mockData.profile.currentRank}</span>
                <span className="app-pill">{mockData.profile.points} {t('points')}</span>
                <span className="app-pill">${mockData.profile.walletBalance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
          <div className="space-y-1">
            {primaryItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-1 border-t border-border/10 pt-3">
            {secondaryItems.map((item) => (
              <DrawerLink key={item.href} item={item} currentPath={currentPath} onClose={onClose} />
            ))}
          </div>

          <div className="mt-3 space-y-2 border-t border-border/10 pt-3">
            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-surface-subtle/50">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary">{t('language')}</p>
              </div>
              <div className="w-[102px] shrink-0">
                <LanguageSwitcher className={compactSwitcherClass} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[16px] px-1.5 py-1.5 transition hover:bg-surface-subtle/50">
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-text-secondary">{t('theme')}</p>
              </div>
              <div className="w-[112px] shrink-0">
                <ThemeSwitcher className={compactSwitcherClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
