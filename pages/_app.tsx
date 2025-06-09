import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <></>;
  }
  // if (typeof window === 'undefined') {
  //   return <></>;
  // }
  return (
    <div>
      <Navbar />

      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
