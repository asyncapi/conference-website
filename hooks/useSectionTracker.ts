import { useState, useEffect } from 'react';
import { LinkItem } from '../types/types';

/**
 * Tracks the currently active navbar section based on scroll position and URL hash.
 * Uses IntersectionObserver for smooth scroll-spy on the home page and listens to
 * hashchange/click events for Next.js client-side transitions.
 *
 * @returns `activeSection` - the ID of the section in view, and `isActive` - a helper
 *   that checks whether a given nav link should be highlighted.
 */
export function useSectionTracker(pathname: string) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // 1. Initialize active hash from window.location.hash
    const updateHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      }
    };
    updateHash();

    // 2. Click listener for Next.js soft transitions
    const handleDocumentClick = () => {
      setTimeout(updateHash, 50);
    };

    // 3. Scroll spy listener using IntersectionObserver on home page
    let observer: IntersectionObserver | null = null;
    if (pathname === '/') {
      const sections = ['about', 'speakers', 'tickets', 'sponsors'];
      const elements = sections
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length > 0) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          {
            root: null,
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0,
          }
        );
        elements.forEach((el) => observer?.observe(el));
      }
    } else {
      setActiveSection('');
    }

    // 4. Scroll position tracking: if scrolled to the top, reset active state
    const handleScroll = () => {
      if (window.scrollY < 100 && pathname === '/') {
        setActiveSection('');
      }
    };

    window.addEventListener('hashchange', updateHash);
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', updateHash);
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  const isActive = (link: LinkItem): boolean => {
    if (link.ref.includes('#')) {
      const [path, hash] = link.ref.split('#');
      const isCorrectPath = pathname === (path || '/');
      const isCorrectHash = activeSection === hash;
      return isCorrectPath && isCorrectHash;
    }
    if (link.ref === pathname) return true;
    if (link.subMenu) {
      return link.subMenu.some((sub) => {
        if (sub.ref.includes('#')) {
          const [path, hash] = sub.ref.split('#');
          return pathname === (path || '/') && activeSection === hash;
        }
        return sub.ref === pathname;
      });
    }
    return false;
  };

  return { activeSection, isActive };
}
