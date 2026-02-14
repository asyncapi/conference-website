'use client';

import '../styles/globals.css';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import BackToTopButton from '../components/Buttons/BackToTopButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Navbar />
          {children}
          <Footer />
          <BackToTopButton />
        </div>
      </body>
    </html>
  );
}
