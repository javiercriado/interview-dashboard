import type { Metadata } from 'next';
import { IBM_Plex_Mono, Open_Sans } from 'next/font/google';
import './globals.css';
import { NavigationProgress } from '@/components/ui/navigation-progress';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/lib/context/app-context';
import { QueryProvider } from '@/lib/providers/query-provider';

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
  title: 'AI Interview Dashboard | Key Singularity',
  description: 'Admin dashboard for AI-powered voice interviews',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ibmPlexMono.variable} ${openSans.variable} font-sans antialiased`}>
        <NavigationProgress />
        <QueryProvider>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
