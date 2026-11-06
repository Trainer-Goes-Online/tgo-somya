'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { trackViewItem } from '@/lib/track';

/**
 * ViewContent on the landing page only, gated on the pathname from the root
 * layout. AddToCart is the checkout's own mount, never a CTA click.
 */
export default function FunnelTracker() {
  const pathname = usePathname();
  const fired = useRef(false);

  useEffect(() => {
    if (pathname !== '/' || fired.current) return;
    fired.current = true;
    trackViewItem();
  }, [pathname]);

  return null;
}
