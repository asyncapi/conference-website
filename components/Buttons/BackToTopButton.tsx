import React, { useState, useEffect, useCallback } from 'react';
import Arrows from '../illustration/arrows';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const throttle = useCallback((func: () => void, limit: number) => {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Throttle to 150ms (6.7 calls/sec) for optimal performance without sacrificing UX
    const throttledToggleVisibility = throttle(toggleVisibility, 150);

    window.addEventListener('scroll', throttledToggleVisibility);

    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
    };
  }, [throttle, toggleVisibility]);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="back-to-top-button fixed bottom-8 right-8 w-12 h-12 rounded-full border-none font-semibold flex items-center justify-center cursor-pointer overflow-hidden z-50 outline-none transition-all duration-300 ease-in-out transform hover:scale-95 active:scale-90"
      aria-label="Back to top"
    >
      <Arrows
        className="back-to-top-icon w-3 h-3 transition-all duration-300 ease-in-out"
        direction="up"
        fill="white"
      />
      <span className="back-to-top-text absolute text-white text-xs opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out">
        Back to Top
      </span>
    </button>
  ) : null;
};

export default BackToTopButton;
