import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      // Temporarily set instant behavior for page transitions
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Restore smooth scroll behavior for in-page navigation
      const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.documentElement.style.scrollBehavior = 'smooth';
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname, search, hash]);

  return null;
}

