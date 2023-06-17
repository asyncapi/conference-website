import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <div className='px-7'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
