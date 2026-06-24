import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Business Hub Kenya - Kenya\'s #1 Marketplace',
  description: 'Discover businesses, properties, vehicles, jobs, and services in Kenya.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
