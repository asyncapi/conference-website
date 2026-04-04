import React, { useState, useEffect } from 'react';
import Arrows from '../illustration/arrows';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let inThrottle = false;
    let pendingCheck = false;

    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    const throttledToggleVisibility = () => {
      if (!inThrottle) {
        toggleVisibility();
        inThrottle = true;
        pendingCheck = false;
        setTimeout(() => {
          inThrottle = false;
          if (pendingCheck) {
            toggleVisibility();
            pendingCheck = false;
          }
        }, 150);
      } else {
        pendingCheck = true;
      }
    };

    window.addEventListener('scroll', throttledToggleVisibility);

    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
