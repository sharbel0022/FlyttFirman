import './globals.css';
import { site } from '../lib/site';

export const metadata = {
  title: `${site.name} | ${site.slogan}`,
  description: 'Behöver du hjälp med bohagsflytt, företagsflytt eller transport? Beskriv din flytt och begär en personlig offert hos Komplett Flytt och Transport.',
  applicationName: site.name,
  keywords: ['flyttfirma', 'flytthjälp', 'bohagsflytt', 'företagsflytt', 'transport', 'flyttoffert'],
  openGraph: {
    title: `${site.name} | ${site.slogan}`,
    description: 'Enklare flytt och transport. Berätta vad du behöver hjälp med och begär en personlig offert.',
    locale: 'sv_SE',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return <html lang="sv"><body>{children}</body></html>;
}
