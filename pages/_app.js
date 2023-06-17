import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }) {
  return (
    <div className='px-7'>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
