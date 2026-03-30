'use client';

import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';

const BackToTopButton = dynamic(
  () => import('../components/Buttons/BackToTopButton'),
  { ssr: false }
);

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
