'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalytics } from '@/lib/hooks/use-analytics';
import { useInterviews } from '@/lib/hooks/use-interviews';
import type { Interview } from '@/lib/types';
import { Award, CheckCircle, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AnalyticsPage() {
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: interviews, isLoading: interviewsLoading } = useInterviews({});

  if (analyticsLoading || interviewsLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics || !interviews) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-muted-foreground">No analytics data available.</p>
      </div>
    );
  }

  // Calculate completion rate
  const completionRate =
    analytics.total > 0 ? ((analytics.completed / analytics.total) * 100).toFixed(1) : '0.0';

  // Prepare funnel data
  const funnelData = [
    { name: 'Invited', value: analytics.funnel.invited, fill: '#facc15' },
    { name: 'Started', value: analytics.funnel.started, fill: '#fbbf24' },
    { name: 'Completed', value: analytics.funnel.completed, fill: '#f59e0b' },
  ];

  // Prepare position breakdown data
  const positionData = Object.entries(analytics.byPosition).map(([position, count]) => ({
    position,
    count,
  }));

  // Prepare recommendations data
  const recommendationsData = [
    { name: 'Hire', value: analytics.recommendations.hire, fill: '#10b981' },
    { name: 'Maybe', value: analytics.recommendations.maybe, fill: '#f59e0b' },
    { name: 'No Hire', value: analytics.recommendations.no_hire, fill: '#ef4444' },
  ];

  // Get recent interviews (last 5)
  const recentInterviews = interviews
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Overview of interview performance and metrics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Interviews"
          value={analytics.total.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Average Score"
          value={analytics.avgScore.toFixed(1)}
          icon={<Award className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Completed"
          value={analytics.completed.toString()}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Funnel Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Funnel</CardTitle>
            <CardDescription>Candidate journey through interview process</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const label = data.payload?.name || data.name;
                      return (
                        <div
                          style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            padding: '8px 12px',
                          }}
                        >
                          <span style={{ color: '#f8fafc' }}>{label}:</span>
                          <span style={{ color: '#facc15', fontWeight: 600 }}> {data.value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="right" fill="#f8fafc" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommendation Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendation Distribution</CardTitle>
            <CardDescription>Hiring recommendations breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recommendationsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {recommendationsData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div
                          style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            padding: '8px 12px',
                          }}
                        >
                          <span style={{ color: '#f8fafc' }}>{data.name}:</span>
                          <span style={{ color: '#facc15', fontWeight: 600 }}> {data.value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Position Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Position Breakdown</CardTitle>
            <CardDescription>Interviews by job position</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="position" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const label = data.payload?.position || data.name;
                      return (
                        <div
                          style={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            padding: '8px 12px',
                          }}
                        >
                          <span style={{ color: '#f8fafc' }}>{label}:</span>
                          <span style={{ color: '#facc15', fontWeight: 600 }}> {data.value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#facc15" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Latest completed interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <RecentInterviewItem key={interview.id} interview={interview} />
              ))}
              {recentInterviews.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent interviews</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  icon,
}: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
      </CardContent>
    </Card>
  );
}

// Recent Interview Item Component
function RecentInterviewItem({ interview }: { interview: Interview }) {
  const getRecommendationColor = (rec: Interview['recommendation']) => {
    switch (rec) {
      case 'hire':
      case 'strong_hire':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'maybe':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'no_hire':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    }
  };

  return (
    <Link
      href={`/interviews/${interview.id}`}
      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{interview.candidateName}</p>
        <p className="text-xs text-muted-foreground">{interview.jobPosition}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          Score: {interview.score}
        </Badge>
        <Badge className={`text-xs ${getRecommendationColor(interview.recommendation)}`}>
          {interview.recommendation.replace('_', ' ')}
        </Badge>
      </div>
    </Link>
  );
}

// Loading Skeleton
function AnalyticsSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton array
          <Card key={`metric-skeleton-${i}`}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton array
          <Card key={`chart-skeleton-${i}`}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
