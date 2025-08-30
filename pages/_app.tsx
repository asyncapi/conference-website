import '../styles/globals.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import ScrollToTopButton from '../components/Scroll-button/ScrollToTop';
import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }:AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild || typeof window === "undefined") {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default MyApp;
