import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6 18 18" strokeLinecap="round" />
      <path d="M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export interface AdminConfirmDialogDetail {
  label: string;
  value: string;
}

export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Отмена',
  tone = 'primary',
  badge,
  details,
  footnote,
  onConfirm,
  onClose
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: 'primary' | 'danger';
  badge?: string;
  details?: AdminConfirmDialogDetail[];
  footnote?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.36)] px-4 backdrop-blur-sm">
      <div className="w-full max-w-[32rem] rounded-[28px] border border-black/[0.06] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafd_100%)] shadow-[0_32px_80px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.045] px-6 py-5">
          <div>
            {badge ? (
              <span
                className={cn(
                  'inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold',
                  tone === 'danger' ? 'bg-[#fff1ef] text-[#d25346] ring-1 ring-[#ffd7d1]' : 'bg-[#eef5ff] text-[#2f78d3] ring-1 ring-[#dbe7fb]'
                )}
              >
                {badge}
              </span>
            ) : null}
            <h2 className="mt-3 text-[1.26rem] font-semibold tracking-tight text-slate-900">{title}</h2>
            <p className="mt-2 text-[0.92rem] leading-6 text-slate-600">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] border border-black/[0.05] bg-white/80 p-2 text-slate-400 transition hover:text-slate-700"
            aria-label="Закрыть подтверждение"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {details?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={`${detail.label}-${detail.value}`}
                  className="rounded-[18px] border border-black/[0.045] bg-white/80 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
                >
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{detail.label}</p>
                  <p className="mt-2 text-[0.94rem] font-medium text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {footnote ? (
            <div className="rounded-[18px] border border-black/[0.045] bg-[#f8f9fc] px-4 py-3.5">
              <p className="text-[0.82rem] leading-6 text-slate-500">{footnote}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3.5 text-[0.95rem] font-semibold text-slate-700"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={cn(
                'rounded-[16px] px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_30px_rgba(15,23,42,0.12)]',
                tone === 'danger'
                  ? 'bg-[linear-gradient(180deg,#eb7462_0%,#d25346_100%)] shadow-[0_18px_30px_rgba(210,83,70,0.24)]'
                  : 'bg-[linear-gradient(180deg,#5d9cff_0%,#4f8ff6_100%)] shadow-[0_18px_30px_rgba(79,143,246,0.22)]'
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
