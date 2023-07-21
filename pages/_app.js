import '../styles/globals.css';
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
      <div>
        <Toaster position="bottom-center" />
      <Component {...pageProps} />
      </div>
  );
}

export default MyApp
