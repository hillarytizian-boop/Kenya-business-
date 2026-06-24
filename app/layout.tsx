import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business Hub Kenya - Kenya\'s #1 Marketplace',
  description: 'Discover businesses, properties, vehicles, jobs, and services in Kenya. Post listings for KES 100. Trusted by 12,000+ sellers.',
  keywords: 'Kenya marketplace, business listings, properties Kenya, vehicles Kenya, jobs Kenya',
  authors: [{ name: 'Business Hub Kenya' }],
  openGraph: {
    title: 'Business Hub Kenya',
    description: 'Kenya\'s #1 Business Marketplace',
    url: 'https://businesshubkenya.com',
    siteName: 'Business Hub Kenya',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Hub Kenya',
    description: 'Kenya\'s #1 Business Marketplace',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
