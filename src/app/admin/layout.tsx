import type { Metadata } from 'next';

import { AdminShell } from '@/admin/components/AdminShell';

export const metadata: Metadata = {
  title: 'Fansten Admin',
  description: 'Administrative dashboard for Fansten'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
