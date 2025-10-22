import type { Metadata } from 'next';
import { IBM_Plex_Mono, Open_Sans } from 'next/font/google';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'AI Interview Dashboard',
  description: 'Admin dashboard for voice AI interviewing platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ibmPlexMono.variable} ${openSans.variable}`}>{children}</body>
    </html>
  );
}
