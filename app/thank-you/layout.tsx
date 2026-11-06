import type { Metadata } from 'next';

import '../thankyou.css';

export const metadata: Metadata = {
  title: 'Your call is booked',
  description: 'Payment received and your slot is booked.',
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
