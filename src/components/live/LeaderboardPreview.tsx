'use client';

import Link from 'next/link';
import { SectionCard } from '@/components/ui/SectionCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { LeaderboardEntry, UserProfile } from '@/types';

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
  profile: UserProfile;
}

export function LeaderboardPreview({ entries, profile }: LeaderboardPreviewProps) {
  const { language, t } = useLanguage();
  const userInTop = entries.some((entry) => entry.id === profile.id);

  return (
    <SectionCard className="space-y-4 border border-white/35 bg-white/55 px-4 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-white/6 dark:shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{t('leaderboardPreview')}</p>
          <p className="mt-2 text-sm text-text-secondary/90">{t('leaderboardPreviewHint')}</p>
        </div>
        <Link href="/leaderboard" className="app-pill">
          {t('openLeaderboard')}
        </Link>
      </div>

      <div className="space-y-2.5">
        {entries.slice(0, 3).map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between gap-3 rounded-[1.15rem] border border-white/45 bg-white/60 px-4 py-3 dark:border-white/8 dark:bg-white/6">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                #{index + 1} {language === 'ru' ? entry.nameRu : entry.name}
              </p>
              <p className="mt-1 text-xs text-text-secondary">{t('streak')}: {entry.streak}</p>
            </div>
            <p className="text-lg font-semibold text-text-primary">{entry.points}</p>
          </div>
        ))}

        {!userInTop ? (
          <div className="flex items-center justify-between gap-3 rounded-[1.15rem] border border-accent-orange/18 bg-accent-orange/8 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">{t('you')}</p>
              <p className="mt-1 text-xs text-text-secondary">{t('rankLabel')}: #{profile.currentRank}</p>
            </div>
            <p className="text-lg font-semibold text-text-primary">{profile.points}</p>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
