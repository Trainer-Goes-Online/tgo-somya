'use client';

import { useEffect } from 'react';

/**
 * The page's one reveal observer. Fail-open: targets are hidden only under
 * `html.sdp-armed`, which only this effect adds, after hydration.
 *
 * Every rect is read BEFORE `sdp-armed` goes on and the on-screen nodes get
 * `vis` in the same task, so above-the-fold content never blinks out. The
 * scroll sweep catches anything an anchor jump skips past.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-sdp-reveal]'));
    if (!nodes.length) return;

    const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.92;
    const onScreen = nodes.filter(inView);

    const root = document.documentElement;
    root.classList.add('sdp-armed');
    onScreen.forEach((n) => n.classList.add('vis'));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.filter((n) => !n.classList.contains('vis')).forEach((n) => io.observe(n));

    const sweep = () => {
      for (const n of nodes) {
        if (!n.classList.contains('vis') && inView(n)) {
          n.classList.add('vis');
          io.unobserve(n);
        }
      }
    };
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      root.classList.remove('sdp-armed');
    };
  }, []);

  return null;
}
