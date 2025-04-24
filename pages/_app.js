import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import { useState, useEffect } from 'react';
import AppContext from '../context/AppContext';

function MyApp({ Component, pageProps, router }) {
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
    <AppContext.Provider value={{ path: router.asPath }}>
      <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default MyApp
