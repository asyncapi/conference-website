import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AsyncAPI Conference',
    template: '%s | AsyncAPI Conference',
  },
  description:
    'Join the AsyncAPI Conference — the event for API developers building event-driven architectures. Talks, workshops, and networking across multiple cities and online.',
  icons: { icon: '/favicon.ico' },
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
