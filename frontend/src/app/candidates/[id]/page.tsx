'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCandidate, useUpdateCandidate } from '@/lib/hooks/use-candidates';
import type { Candidate } from '@/lib/types';
import { format } from 'date-fns';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;
  const { data: candidate, isLoading, error } = useCandidate(candidateId);
  const updateCandidate = useUpdateCandidate();
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  const handleStatusChange = async (newStatus: Candidate['status']) => {
    if (!candidate) return;

    try {
      await updateCandidate.mutateAsync({
        id: candidate.id,
        data: { status: newStatus },
      });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSendInvite = async () => {
    if (!candidate) return;

    setIsSendingInvite(true);
    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await updateCandidate.mutateAsync({
      id: candidate.id,
      data: {
        status: 'invited',
        invitedAt: new Date().toISOString(),
      },
    });

    setIsSendingInvite(false);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">Error loading candidate</p>
            <p className="text-sm text-muted-foreground">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !candidate) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  const statusColors: Record<Candidate['status'], string> = {
    pending: 'bg-gray-500/10 text-gray-500',
    invited: 'bg-blue-500/10 text-blue-500',
    interviewed: 'bg-yellow-500/10 text-yellow-500',
    rejected: 'bg-red-500/10 text-red-500',
    hired: 'bg-green-500/10 text-green-500',
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/candidates"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to candidates
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{candidate.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {candidate.email}
            </span>
            {candidate.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {candidate.phone}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/candidates/${candidate.id}/edit`)}>
            Edit
          </Button>
          {candidate.status === 'pending' && (
            <Button onClick={handleSendInvite} disabled={isSendingInvite}>
              {isSendingInvite ? 'Sending...' : 'Send Invite'}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Position Applied For</div>
              <div className="font-medium">{candidate.appliedFor}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Source</div>
              <div className="font-medium">{candidate.source}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <Badge className={statusColors[candidate.status]}>
                {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
              </Badge>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Applied Date</div>
              <div className="font-medium">
                {candidate.createdAt ? format(new Date(candidate.createdAt), 'MMMM dd, yyyy') : '-'}
              </div>
            </div>

            {candidate.invitedAt && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Invited Date</div>
                <div className="font-medium">
                  {(() => {
                    try {
                      return format(new Date(candidate.invitedAt), 'MMMM dd, yyyy');
                    } catch {
                      return '-';
                    }
                  })()}
                </div>
              </div>
            )}

            {candidate.interviewedAt && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Interview Date</div>
                <div className="font-medium">
                  {(() => {
                    try {
                      return format(new Date(candidate.interviewedAt), 'MMMM dd, yyyy');
                    } catch {
                      return '-';
                    }
                  })()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Workflow */}
        <Card>
          <CardHeader>
            <CardTitle>Update Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium mb-2">Change Status</div>
              <Select
                value={candidate.status}
                onValueChange={(value) => handleStatusChange(value as Candidate['status'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Workflow Visualization */}
            <div className="space-y-3 pt-4">
              <div className="text-sm font-medium">Application Workflow</div>
              <div className="space-y-2">
                {[
                  { status: 'pending', label: 'Pending' },
                  { status: 'invited', label: 'Invited' },
                  { status: 'interviewed', label: 'Interviewed' },
                  { status: 'hired/rejected', label: 'Hired/Rejected' },
                ].map((item, index) => {
                  const isActive =
                    candidate.status === item.status ||
                    (item.status === 'hired/rejected' &&
                      ['hired', 'rejected'].includes(candidate.status)) ||
                    (['invited', 'interviewed', 'hired', 'rejected'].includes(candidate.status) &&
                      index === 0) ||
                    (['interviewed', 'hired', 'rejected'].includes(candidate.status) &&
                      index === 1) ||
                    (['hired', 'rejected'].includes(candidate.status) && index === 2);

                  return (
                    <div key={item.status} className="flex items-center gap-2">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="text-sm">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview History */}
      {candidate.interviews && candidate.interviews.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Interview History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidate.interviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/interviews/${interview.id}`)}
                  >
                    <TableCell>{format(new Date(interview.completedAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{interview.jobPosition}</TableCell>
                    <TableCell>{interview.score}/100</TableCell>
                    <TableCell>
                      <Badge>{interview.status.replace('_', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{interview.recommendation.replace('_', ' ')}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
