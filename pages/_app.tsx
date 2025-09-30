import '../styles/globals.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import BackToTopButton from '../components/Buttons/BackToTopButton';
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
  return (
    <div>
      <Navbar />

      <Component {...pageProps} />
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default MyApp;
