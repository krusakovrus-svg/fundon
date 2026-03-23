import './globals.css';

import { AppFrame } from '@/components/layout/AppFrame';
import { FavoritesProvider } from '@/components/providers/FavoritesProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const themeBootScript = `(function(){try{var theme=localStorage.getItem('fightpulse-theme')||'light';var resolved=theme==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):theme;document.documentElement.classList.add(resolved);document.documentElement.dataset.theme=resolved;}catch(e){document.documentElement.classList.add('light');document.documentElement.dataset.theme='light';}})();`;
const languageBootScript = `(function(){try{var language=localStorage.getItem('fightpulse-language')||'ru';document.documentElement.lang=language;}catch(e){document.documentElement.lang='ru';}})();`;

export const metadata = {
  title: 'FUNDON',
  description: 'Live fan support platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <AppFrame>{children}</AppFrame>
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
