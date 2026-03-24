import type { Metadata } from 'next';

import { AdminShell } from '@/admin/components/AdminShell';

const adminBrandName = 'Fansten Admin';
const adminBrandDescription = 'Administrative dashboard for Fansten.';

export const metadata: Metadata = {
  applicationName: adminBrandName,
  title: {
    default: adminBrandName,
    template: `%s · ${adminBrandName}`
  },
  description: adminBrandDescription,
  openGraph: {
    title: adminBrandName,
    description: adminBrandDescription,
    type: 'website'
  },
  twitter: {
    title: adminBrandName,
    description: adminBrandDescription
  }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
