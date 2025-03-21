import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={scrollToTop} 
        className="gradient-bg text-white m-5 p-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 flex justify-center items-center md:p-3 md:m-2 sm:p-2 sm:m-1"
      >
        <ChevronUp size={24} className="md:w-8 md:h-8 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;