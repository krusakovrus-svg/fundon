'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { SideMenuDrawer } from '@/components/layout/SideMenuDrawer';
import { TopUtilityBar } from '@/components/layout/TopUtilityBar';
import { appRoutes, normalizeAppPath } from '@/lib/routing';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPath = normalizeAppPath(pathname ?? appRoutes.live);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-text-primary">
      <div className="pointer-events-none fixed inset-0 z-10 flex justify-center">
        <div className="relative h-full w-full" style={{ maxWidth: 'var(--page-max-width)' }}>
          <SideMenuDrawer
            isOpen={isMenuOpen}
            currentPath={currentPath}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ x: isMenuOpen ? '75%' : '0%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
        className="relative z-20 mx-auto flex min-h-screen w-full flex-col"
        style={{ maxWidth: 'var(--page-max-width)' }}
      >
        {isMenuOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 z-30 cursor-default bg-transparent"
          />
        ) : null}

        <TopUtilityBar isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((value) => !value)} />
        <main className="relative z-20 flex-1">{children}</main>
        <MobileNav />
      </motion.div>
    </div>
  );
}
