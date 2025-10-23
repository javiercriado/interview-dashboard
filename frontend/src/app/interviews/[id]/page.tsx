'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useInterview } from '@/lib/hooks/use-interviews';
import type { Interview } from '@/lib/types';
import { format } from 'date-fns';
import { ArrowLeft, Pause, Play, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: interview, isLoading, error } = useInterview(params.id);
  const [notes, setNotes] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Load notes from localStorage on mount
  useEffect(() => {
    if (interview) {
      const savedNotes = localStorage.getItem(`interview-notes-${interview.id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }
  }, [interview]);

  // Save notes to localStorage on change
  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (interview) {
      localStorage.setItem(`interview-notes-${interview.id}`, value);
    }
  };

  // Mock audio player controls
  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const duration = interview?.duration || 0;

  // Prepare competency data for radar chart
  const competencyData = interview?.competencies
    ? Object.entries(interview.competencies).map(([name, score]) => ({
        competency: name,
        score: score, // Use actual 0-100 score from API
        fullMark: 100, // Max score is 100
      }))
    : [];

  // Loading state
  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </AppLayout>
    );
  }

  // Error state
  if (error || !interview) {
    return (
      <AppLayout>
        <div>
          <Button variant="ghost" onClick={() => router.push('/interviews')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Interviews
          </Button>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-red-500">
                <p className="text-lg font-semibold">Interview not found</p>
                <p className="text-sm text-muted-foreground">
                  The interview you're looking for doesn't exist
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Status and recommendation badge colors - using Interview type properly
  const statusColors: Record<Interview['status'], string> = {
    scheduled: 'bg-blue-500/10 text-blue-500',
    in_progress: 'bg-yellow-500/10 text-yellow-500',
    completed: 'bg-green-500/10 text-green-500',
    cancelled: 'bg-red-500/10 text-red-500',
  };

  const recommendationColors: Record<Interview['recommendation'], string> = {
    hire: 'bg-green-500/10 text-green-500',
    strong_hire: 'bg-green-600/10 text-green-600',
    maybe: 'bg-yellow-500/10 text-yellow-500',
    no_hire: 'bg-red-500/10 text-red-500',
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <Button variant="ghost" onClick={() => router.push('/interviews')} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Interviews
        </Button>

        {/* Header Card */}
        <Card className="card-dark">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-heading text-primary">
                  {interview.candidateName}
                </CardTitle>
                <p className="text-muted-foreground mt-1">{interview.candidateEmail}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColors[interview.status]}>
                  {interview.status.replace('_', ' ')}
                </Badge>
                <Badge className={recommendationColors[interview.recommendation]}>
                  {interview.recommendation.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="text-lg font-semibold">{interview.jobPosition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Date</p>
                <p className="text-lg font-semibold">
                  {format(new Date(interview.completedAt), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold">{Math.round(interview.duration / 60)} mins</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-primary">{interview.score}/100</p>
              </div>
            </div>

            {/* Summary */}
            {interview.summary && (
              <div className="mt-6 p-4 bg-muted/50 rounded-md">
                <h3 className="text-sm font-semibold text-primary mb-2">Summary</h3>
                <p className="text-sm text-foreground leading-relaxed">{interview.summary}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Competency Chart & Audio Player */}
          <div className="space-y-6">
            {/* Competency Breakdown Chart */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Competency Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {competencyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={competencyData}>
                      <PolarGrid stroke="#374151" strokeDasharray="3 3" />
                      <PolarAngleAxis
                        dataKey="competency"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        tickLine={{ stroke: '#374151' }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        tickCount={6}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#facc15"
                        fill="#facc15"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No competency data available
                  </div>
                )}

                {/* Competency Scores List */}
                <div className="mt-4 space-y-2">
                  {Object.entries(interview.competencies).map(([competency, score]) => (
                    <div key={competency} className="flex justify-between items-center text-sm">
                      <span className="text-foreground">{competency}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-primary font-semibold w-12 text-right">{score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mock Audio Player */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Interview Recording</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Audio Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={togglePlayPause}
                    className="h-12 w-12 rounded-full border-primary hover:bg-primary/10"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-primary" />
                    ) : (
                      <Play className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-primary hover:bg-primary/10"
                  >
                    <Volume2 className="h-4 w-4 text-primary" />
                  </Button>
                </div>

                {/* Audio Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                  </div>
                  <span>•</span>
                  <span className="text-xs truncate">{interview.audioUrl}</span>
                </div>

                {/* Note about mock player */}
                <p className="text-xs text-muted-foreground italic">
                  Note: This is a mock audio player interface. Actual playback is not implemented.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Transcript & Notes */}
          <div className="space-y-6">
            {/* Transcript */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Interview Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {interview.transcript ? (
                    interview.transcript.split('\n\n').map((paragraph) => (
                      <p
                        key={`${paragraph.substring(0, 50)}-${paragraph.length}`}
                        className="text-sm text-foreground leading-relaxed whitespace-pre-wrap"
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted-foreground italic">No transcript available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Notes</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add your observations and notes (saved automatically)
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your notes here..."
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="min-h-[200px] bg-background/50 border-border resize-none focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  ✓ Notes are saved automatically to your browser's local storage
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Helper function to format time in mm:ss
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
