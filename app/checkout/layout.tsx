import type { Metadata } from 'next';

import '../checkout.css';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your booking.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
