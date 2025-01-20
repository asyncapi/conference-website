import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-4 sm:right-8 flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-white focus:ring-opacity-80 active:ring-4 active:ring-white active:ring-opacity-100 z-50 transition-all duration-300 ease-in-out transform hover:scale-110"
        style={{
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          boxShadow: '0 8px 12px rgba(255, 255, 255, 0.5)', // Subtle white shadow for appeal
        }}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span className="text-sm font-medium">Back to top</span>
      </button>
    )
  );
};

export default ScrollToTop;
