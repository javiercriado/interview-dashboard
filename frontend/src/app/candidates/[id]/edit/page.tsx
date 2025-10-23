'use client';

import { CandidateForm } from '@/components/candidates/candidate-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useCandidate } from '@/lib/hooks/use-candidates';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditCandidatePage() {
  const params = useParams();
  const candidateId = params.id as string;
  const { data: candidate, isLoading, error } = useCandidate(candidateId);

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
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href={`/candidates/${candidateId}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to candidate
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Candidate</h1>
          <p className="text-muted-foreground">Update candidate information below</p>
        </div>

        <CandidateForm candidate={candidate} />
      </div>
    </div>
  );
}
