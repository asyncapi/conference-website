import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer'; // Imports the Footer component that we modified
import { useState, useEffect } from 'react';
import ScrollButton from '../components/Buttons/scroll-button';

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  }
  return (
      <div>
      <Navbar />
      
      <Component {...pageProps} />
      <ScrollButton /> {/* Renders a button that scrolls to top of page when clicked */}
      <Footer /> {/* This renders our Footer component which now has the Code of Conduct visible on all screen sizes */}
      </div>
  );
}

export default MyApp