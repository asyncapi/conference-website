import Head from 'next/head';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

export default function Register2026() {
  return (
    <div>
      <Head>
        <title>Conference 2026 Registration</title>
        <meta name="description" content="Register for Conference 2026" />
      </Head>

      <Header />

      <main className="container mt-20 mb-20">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-semibold text-white">
            Conference 2026 Registration
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}
