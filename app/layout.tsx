import type { Metadata } from 'next';
import '../styles/globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'AsyncAPI Conference',
  description: 'AsyncAPI Conference - The conference for the AsyncAPI community',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
