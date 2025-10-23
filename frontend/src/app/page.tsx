import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Clipboard, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold font-heading text-primary">AI Interview Dashboard</h1>
          <p className="text-muted-foreground">Key Singularity Interview Platform</p>
        </div>
      </div>

      {/* Dashboard Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/interviews">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-primary" />
                  <CardTitle>Interviews</CardTitle>
                </div>
                <CardDescription>View and manage all interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Go to Interviews →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/candidates">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Candidates</CardTitle>
                </div>
                <CardDescription>Manage candidate database</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Go to Candidates →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Analytics</CardTitle>
                </div>
                <CardDescription>View metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Go to Analytics →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/templates">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Templates</CardTitle>
                </div>
                <CardDescription>Interview question templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Go to Templates →
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Interviews</CardDescription>
                <CardTitle className="text-3xl">-</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Candidates</CardDescription>
                <CardTitle className="text-3xl">-</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completion Rate</CardDescription>
                <CardTitle className="text-3xl">-</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
