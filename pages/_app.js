import '../styles/globals.css';
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
    <div className='px-7'>
      <Toaster />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
