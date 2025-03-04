import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import { useState, useEffect } from 'react';
import  { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
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
    <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      
      <Component {...pageProps} />
      <Footer />
      </div>
  );
}

export default MyApp
