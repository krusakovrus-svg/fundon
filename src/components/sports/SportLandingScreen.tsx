'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { MainPageLayout } from '@/components/layout/MainPageLayout';
import type { SportOption } from '@/data/sports';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { setStoredSportPath } from '@/lib/sportsHome';
import { getSportHref } from '@/data/sports';

export function SportLandingScreen({ sport }: { sport: SportOption }) {
  const { language } = useLanguage();
  const title = language === 'ru' ? sport.labelRu : sport.label;

  useEffect(() => {
    setStoredSportPath(getSportHref(sport.id));
  }, [sport.id]);

  return (
    <MainPageLayout className="space-y-4 pt-2">
      <section className="app-card app-section-card overflow-hidden">
        <div className="space-y-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
            {language === 'ru' ? 'Последний выбранный спорт' : 'Last selected sport'}
          </p>
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-text-primary">{title}</h1>
            <p className="max-w-[24rem] text-[0.98rem] leading-relaxed text-text-secondary">
              {language === 'ru'
                ? 'Эта страница уже закреплена в нижнем меню как Дом. Здесь позже появятся эфиры, предстоящие события и быстрый вход в выбранный спорт.'
                : 'This page is now pinned to Home in the bottom navigation. Live events, upcoming cards, and quick entry for this sport will appear here later.'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        <div className="app-subtle-card space-y-2 rounded-[1.35rem]">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
            {language === 'ru' ? 'Сейчас' : 'Now'}
          </p>
          <p className="text-[1rem] font-semibold text-text-primary">
            {language === 'ru' ? `${title}: лента скоро появится` : `${title}: live feed is coming soon`}
          </p>
          <p className="text-[0.92rem] leading-relaxed text-text-secondary">
            {language === 'ru'
              ? 'Для первого прохода мы уже закрепили этот спорт как домашний экран. Следующим этапом сюда можно добавить live и upcoming блоки.'
              : 'For the first pass, this sport is now pinned as your home screen. Live and upcoming blocks can be added here next.'}
          </p>
        </div>

        <Link
          href="/sports"
          className="app-card rounded-[1.35rem] px-4 py-4 text-[0.98rem] font-semibold text-text-primary transition hover:border-accent-orange/20"
        >
          {language === 'ru' ? 'Выбрать другой спорт' : 'Choose another sport'}
        </Link>
      </section>
    </MainPageLayout>
  );
}
