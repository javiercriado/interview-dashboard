'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Detect navigation by listening to link clicks and button clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Find the closest anchor tag or button
      const anchor = target.closest('a[href]');
      const button = target.closest('button[type="button"], button:not([type])');
      const tableRow = target.closest('tr[role="button"], tr.cursor-pointer');

      if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute('href');
        // Check if it's an internal navigation (not external, not hash, not same page)
        if (
          href &&
          !href.startsWith('http') &&
          !href.startsWith('//') &&
          !href.startsWith('#') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:') &&
          href !== pathname
        ) {
          setIsNavigating(true);
          setProgress(0);
        }
      } else if (button || tableRow) {
        // Check if button/row text suggests navigation
        const text = target.textContent?.toLowerCase() || '';
        const isNavigationButton =
          text.includes('cancel') ||
          text.includes('back') ||
          text.includes('add') ||
          text.includes('create') ||
          text.includes('edit') ||
          text.includes('view') ||
          text.includes('preview') ||
          tableRow !== null;

        if (isNavigationButton) {
          setIsNavigating(true);
          setProgress(0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Phase 1: Slow progress to 90% on click (never reaches 100%)
  useEffect(() => {
    if (isNavigating && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Slow asymptotic approach to 90%
          const increment = (90 - prev) * 0.1;
          return Math.min(prev + increment, 90);
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isNavigating, progress]);

  // Phase 2: Complete to 100% when route actually changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Need to track route changes
  useEffect(() => {
    if (isNavigating && progress >= 0) {
      // Route changed! Complete the progress bar quickly
      setProgress(100);

      // Hide after completion animation
      const timeout = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [pathname, searchParams]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/20">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
