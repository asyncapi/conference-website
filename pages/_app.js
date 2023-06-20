import '../styles/globals.css';
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
    <div className='container'>
      <div>
        <Toaster position="bottom-center" />
      <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp
