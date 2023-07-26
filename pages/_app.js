import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
function MyApp({ Component, pageProps }) {
  return (
      <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      </div>
  );
}

export default MyApp
