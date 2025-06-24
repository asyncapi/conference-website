import '../styles/globals.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
function MyApp({ Component, pageProps,router}: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
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

export default MyApp;
