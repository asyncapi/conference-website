'use client';

import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import BackToTopButton from '../components/Buttons/BackToTopButton';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <BackToTopButton />
    </div>
  );
}
