import './global.css'; // Import global styles for the App Router
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Example font, replace with actual project font if different

const inter = Inter({ subsets: ['latin'] }); // Initialize font

// Define global metadata for SEO, including Open Graph and Twitter tags
export const metadata: Metadata = {
  title: {
    template: '%s | AsyncAPI Conference', // Dynamic title template
    default: 'AsyncAPI Conference', // Default title for pages without a specific title
  },
  description: 'The official website for the AsyncAPI Conference. Join us to learn about event-driven architectures and the AsyncAPI specification.',
  metadataBase: new URL('https://conference.asyncapi.com'), // Replace with your actual production domain
  openGraph: {
    title: 'AsyncAPI Conference',
    description: 'The official website for the AsyncAPI Conference. Join us to learn about event-driven architectures and the AsyncAPI specification.',
    url: 'https://conference.asyncapi.com', // Replace with your actual production domain
    siteName: 'AsyncAPI Conference',
    images: [
      {
        url: '/img/opengraph-image.jpg', // Path to your Open Graph image, relative to the `public` directory
        width: 1200,
        height: 630,
        alt: 'AsyncAPI Conference Banner Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', // Use 'summary' for smaller images, 'summary_large_image' for large
    title: 'AsyncAPI Conference',
    description: 'The official website for the AsyncAPI Conference. Join us to learn about event-driven architectures and the AsyncAPI specification.',
    creator: '@asyncapi', // Replace with your Twitter handle
    images: ['/img/twitter-image.jpg'], // Path to your Twitter card image, relative to the `public` directory
  },
  // Add other relevant meta tags as needed
  themeColor: '#000000', // Example theme color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font class to body, or to an inner div if you need more control */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
