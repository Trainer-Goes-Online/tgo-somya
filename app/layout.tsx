import type { Metadata } from 'next';
import { Bebas_Neue, Manrope } from 'next/font/google';

import './globals.css';
import './footer.css';

import Analytics from '@/components/shared/Analytics';
import FunnelTracker from '@/components/shared/FunnelTracker';
import MetaPixel from '@/components/shared/MetaPixel';

/* Both variables go on <html>: the tokens that read them are declared on :root. */
const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const body = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Struggling To Get Pregnant Because Of PCOD, Insulin Resistance Or Excess Weight?',
  description:
    'Through a personalised 90-day nutrition & lifestyle programme designed to address excess weight, improve hormonal & metabolic health, and help increase your chances of getting pregnant.',
  /* Pre-launch: the client facts and legal pages are not signed off. */
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        {/* Each renders nothing without its env id. MetaPixel captures
            attribution ABOVE its own pixel guard, on every page. */}
        <MetaPixel />
        <Analytics />
        <FunnelTracker />
      </body>
    </html>
  );
}
