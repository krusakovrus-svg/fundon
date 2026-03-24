import Link from 'next/link';

import { appRoutes, mvpDomainConfig, routeZones } from '@/lib/routing';

type PublicSiteScreenProps = {
  locale: 'en' | 'ru';
};

const copy = {
  en: {
    eyebrow: 'Fansten MVP',
    title: 'Live fan support for sports events, split cleanly across site, app, and admin.',
    description:
      'The MVP keeps the public website on fansten.com, the consumer app under /app, and the operational admin zone under /admin so later migration to admin.fansten.com stays low-risk.',
    primaryCta: 'Open app',
    secondaryCta: 'Open admin',
    localeSwitch: 'Русская версия',
    structureTitle: 'MVP route structure',
    structureBody: 'The public website, app, and admin already live in separate route zones on the same domain.',
    routes: [
      { label: 'Main website', value: 'fansten.com', note: 'Primary landing and product website.' },
      { label: 'Russian website', value: 'fansten.com/ru', note: 'Localized Russian public website.' },
      { label: 'App entry', value: 'fansten.com/app', note: 'Consumer mobile/web app entry point.' },
      { label: 'Admin zone', value: 'fansten.com/admin', note: 'Operational admin panel, isolated for later subdomain migration.' },
      { label: 'Russian domain redirect', value: 'fansten.ru -> fansten.com/ru', note: 'Canonical redirect to the Russian public website.' }
    ],
    zoneTitle: 'Product zones',
    zoneCards: [
      { title: 'Public site', body: 'Marketing, product framing, and website content stay outside the app shell.' },
      { title: 'App', body: 'Consumer flows live under /app with their own navigation and shell.' },
      { title: 'Admin', body: 'Admin stays isolated under /admin so auth and middleware can move to a dedicated host later.' }
    ],
    futureReady:
      'Admin already lives in its own route zone and can move from /admin to admin.fansten.com later without mixing public and admin navigation.'
  },
  ru: {
    eyebrow: 'Fansten MVP',
    title: 'Платформа поддержки болельщиков во время спортивных событий с чётким разделением сайта, app и admin.',
    description:
      'В MVP публичный сайт остаётся на fansten.com, пользовательское приложение живёт под /app, а операционный admin-контур под /admin, чтобы будущий перенос на admin.fansten.com был простым и безопасным.',
    primaryCta: 'Открыть приложение',
    secondaryCta: 'Открыть admin',
    localeSwitch: 'English version',
    structureTitle: 'MVP-структура маршрутов',
    structureBody: 'Публичный сайт, app и admin уже разведены по отдельным route-зонам внутри одного домена.',
    routes: [
      { label: 'Основной сайт', value: 'fansten.com', note: 'Главный landing и публичный сайт продукта.' },
      { label: 'Русская версия сайта', value: 'fansten.com/ru', note: 'Локализованная публичная версия на русском.' },
      { label: 'Точка входа в app', value: 'fansten.com/app', note: 'Вход в consumer mobile/web app.' },
      { label: 'Admin-зона', value: 'fansten.com/admin', note: 'Операционный admin-контур, уже готовый к будущему выносу на отдельный host.' },
      { label: 'Редирект .ru-домена', value: 'fansten.ru -> fansten.com/ru', note: 'Канонический редирект на русскую публичную версию.' }
    ],
    zoneTitle: 'Продуктовые зоны',
    zoneCards: [
      { title: 'Публичный сайт', body: 'Маркетинговый и продуктовый контент живёт отдельно от app shell.' },
      { title: 'App', body: 'Пользовательские сценарии живут под /app со своей навигацией и мобильным shell.' },
      { title: 'Admin', body: 'Admin остаётся изолированным под /admin, чтобы auth и middleware позже можно было перенести на отдельный поддомен.' }
    ],
    futureReady:
      'Admin уже живёт в собственной route-зоне и позже сможет перейти с /admin на admin.fansten.com без смешения public- и admin-навигации.'
  }
} as const;

export function PublicSiteScreen({ locale }: PublicSiteScreenProps) {
  const content = copy[locale];
  const localeSwitchHref = locale === 'ru' ? routeZones.site : routeZones.siteRu;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f5ef_0%,#fbfaf7_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 rounded-[28px] border border-black/[0.05] bg-white/84 px-5 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{content.eyebrow}</p>
            <p className="mt-1 text-[1.45rem] font-semibold tracking-tight text-slate-950">Fansten</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={localeSwitchHref}
              className="inline-flex items-center rounded-full border border-black/[0.05] bg-[rgba(247,249,252,0.8)] px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
            >
              {content.localeSwitch}
            </Link>
            <Link
              href={routeZones.admin}
              className="inline-flex items-center rounded-full border border-black/[0.05] bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(15,23,42,0.12)] transition hover:bg-slate-900"
            >
              Admin
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-start gap-8 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.9fr)] lg:py-14">
          <div className="space-y-6">
            <div className="rounded-[36px] border border-black/[0.05] bg-white/88 px-6 py-7 shadow-[0_24px_48px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:px-8 sm:py-9">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{content.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-[2.5rem] font-semibold tracking-tight text-slate-950 sm:text-[3.2rem]">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-[1.05rem]">{content.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={appRoutes.home}
                  className="inline-flex min-h-[3.2rem] items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,rgba(255,136,83,1),rgba(255,108,54,1))] px-5 text-[0.98rem] font-semibold text-white shadow-[0_18px_28px_rgba(255,116,55,0.18)] transition hover:brightness-105"
                >
                  {content.primaryCta}
                </Link>
                <Link
                  href={routeZones.admin}
                  className="inline-flex min-h-[3.2rem] items-center justify-center rounded-[18px] border border-black/[0.05] bg-[rgba(247,249,252,0.84)] px-5 text-[0.98rem] font-semibold text-slate-900 transition hover:bg-white"
                >
                  {content.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {content.zoneCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[24px] border border-black/[0.05] bg-white/82 px-5 py-5 shadow-[0_18px_34px_rgba(15,23,42,0.05)]"
                >
                  <p className="text-[1rem] font-semibold tracking-tight text-slate-950">{card.title}</p>
                  <p className="mt-2 text-[0.92rem] leading-7 text-slate-600">{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[32px] border border-black/[0.05] bg-white/88 px-5 py-6 shadow-[0_24px_42px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{content.structureTitle}</p>
            <p className="mt-3 text-[0.95rem] leading-7 text-slate-600">{content.structureBody}</p>

            <div className="mt-5 space-y-3">
              {content.routes.map((item) => (
                <div key={item.value} className="rounded-[20px] border border-black/[0.045] bg-[rgba(247,249,252,0.82)] px-4 py-3.5">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-[1rem] font-semibold tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-1.5 text-[0.84rem] leading-6 text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-black/[0.045] bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_100%)] px-4 py-4">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Future-ready admin</p>
              <p className="mt-2 text-[0.92rem] leading-7 text-slate-600">{content.futureReady}</p>
              <p className="mt-2 text-[0.9rem] font-semibold text-slate-900">{mvpDomainConfig.futureAdminHost}</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
