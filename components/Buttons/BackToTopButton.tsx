import React, { useState, useEffect, useCallback } from 'react';
import Arrows from '../illustration/arrows';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let inThrottle = false;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const throttledToggleVisibility = () => {
      if (!inThrottle) {
        toggleVisibility();
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, 150);
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
      className="group fixed bottom-8 right-8 w-12 h-12 rounded-full border-none font-semibold flex items-center justify-center cursor-pointer overflow-hidden z-50 outline-none transition-all duration-300 ease-in-out transform hover:scale-95 active:scale-90 bg-[rgb(20,20,20)] shadow-[0px_0px_0px_4px_rgba(180,160,255,0.253)] hover:w-[140px] hover:rounded-[50px] hover:bg-[rgb(181,160,255)]"
      aria-label="Back to top"
    >
      <Arrows
        className="w-3 h-3 transition-all duration-300 ease-in-out group-hover:-translate-y-[200%] group-hover:opacity-0"
        direction="up"
        fill="white"
      />
      <span className="absolute text-white text-xs opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:text-[13px] group-hover:opacity-100">
        Back to Top
      </span>
    </button>
  ) : null;
};

export default BackToTopButton;
