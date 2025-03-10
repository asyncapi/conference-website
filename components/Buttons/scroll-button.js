import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user has scrolled down more than 700px
      if (window.scrollY > 700) {
        setVisible(true);
      } else {
        // Hide button when user is near the top of the page
        setVisible(false);
      }
    };

    // Add scroll event listener to window to track scroll position
    window.addEventListener("scroll", toggleVisibility);
    
    // This prevents memory leaks and unnecessary processing
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle the button click and scroll back to top
  const scrollToTop = () => {
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the scroll-to-top button
  return (
    <button
      onClick={scrollToTop} // Attach click handler to scroll to top
      className={`fixed bottom-10 right-6 flex items-center justify-center w-12 h-12 
        text-white rounded-full shadow-lg transition-opacity 
        border border-gray-200 gradient-bg
        ${visible ? "opacity-100 z-50" : "opacity-0"}`} // Conditionally apply classes based on visibility
      
    >
      {/* Arrow icon pointing upward */}
      <ArrowUp size={24} />
    </button>
  );
};

// Export the component 
export default ScrollButton;