import type { Metadata } from 'next';

import { AdminShell } from '@/admin/components/AdminShell';

export const metadata: Metadata = {
  title: 'FUNDON Admin',
  description: 'Administrative dashboard for FUNDON'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
