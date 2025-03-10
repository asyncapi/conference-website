import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 700) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-6 flex items-center justify-center w-12 h-12 
        text-white rounded-full shadow-lg transition-opacity 
        border border-gray-200 gradient-bg
        ${visible ? "opacity-100 z-50" : "opacity-0"}`}
      
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollButton;
