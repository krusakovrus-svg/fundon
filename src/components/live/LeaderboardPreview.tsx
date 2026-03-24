'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { SectionCard } from '@/components/ui/SectionCard';
import { formatCount } from '@/lib/format';
import { appRoutes } from '@/lib/routing';
import type { LeaderboardEntry, UserProfile } from '@/types';

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
  profile: UserProfile;
}

export function LeaderboardPreview({ entries, profile }: LeaderboardPreviewProps) {
  const { language, t } = useLanguage();
  const myPositionLabel = language === 'ru' ? 'Моя позиция' : 'My position';
  const pointsLabel = language === 'ru' ? 'очков' : 'points';

  return (
    <SectionCard className="space-y-4 border border-white/34 bg-white/52 px-4 py-4 shadow-[0_16px_38px_rgba(15,23,42,0.09)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.055] dark:shadow-[0_14px_30px_rgba(2,6,23,0.18)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardPreview')}</p>
          <p className="mt-1.5 text-[0.84rem] text-text-secondary/80">{t('leaderboardPreviewHint')}</p>
        </div>
        <Link
          href={appRoutes.leaderboard}
          className="rounded-full border border-black/[0.05] bg-white/66 px-3 py-1.5 text-[0.76rem] font-semibold text-text-primary shadow-[0_8px_18px_rgba(15,23,42,0.04)] dark:border-white/[0.08] dark:bg-white/[0.06] dark:shadow-none"
        >
          {t('openLeaderboard')}
        </Link>
      </div>

      <div className="space-y-2.5">
        {entries.slice(0, 3).map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-white/40 bg-white/62 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.05]">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                #{index + 1} {language === 'ru' ? entry.nameRu : entry.name}
              </p>
              <p className="mt-1 text-[0.72rem] text-text-secondary/76">
                {t('streak')}: {entry.streak}
              </p>
            </div>
            <p className="text-lg font-semibold text-text-primary">{formatCount(entry.points, language)}</p>
          </div>
        ))}

        <div className="flex items-center justify-between gap-3 rounded-[1.15rem] border border-accent-orange/12 bg-[rgba(255,124,65,0.06)] px-4 py-3 dark:border-accent-orange/12 dark:bg-[rgba(255,124,65,0.08)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{myPositionLabel}</p>
            <p className="mt-1.5 text-sm font-semibold text-text-primary">{t('you')}</p>
            <p className="mt-1 text-[0.72rem] text-text-secondary/78">
              {t('rankLabel')}: #{profile.currentRank}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-text-primary">{formatCount(profile.points, language)}</p>
            <p className="mt-1 text-[0.7rem] text-text-secondary/78">{pointsLabel}</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
