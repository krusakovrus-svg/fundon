'use client';

import { usePathname } from 'next/navigation';

import { AppShell } from '@/components/layout/AppShell';
import { isAdminPath, isAppShellPath } from '@/lib/routing';

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isAdminPath(pathname)) {
    return <>{children}</>;
  }

  if (isAppShellPath(pathname)) {
    return <AppShell>{children}</AppShell>;
  }

  return <>{children}</>;
}
