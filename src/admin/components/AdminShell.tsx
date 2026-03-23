import { AdminSidebar } from '@/admin/components/AdminSidebar';
import { AdminTopbar } from '@/admin/components/AdminTopbar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f8fb_48%,#f2f4f8_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <AdminSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1 px-8 py-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
