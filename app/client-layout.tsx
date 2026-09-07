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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
