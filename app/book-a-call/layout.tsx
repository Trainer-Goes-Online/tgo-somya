import type { Metadata } from 'next';

import '../bookacall.css';

export const metadata: Metadata = {
  title: 'Pick your time',
  description: 'Payment received. One step left.',
  robots: { index: false, follow: false },
};

export default function BookACallLayout({ children }: { children: React.ReactNode }) {
  return children;
}
