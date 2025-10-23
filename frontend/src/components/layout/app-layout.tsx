'use client';

import { Breadcrumbs } from './breadcrumbs';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content area */}
      <div className="lg:pl-64">
        <Header />

        <main className="p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
