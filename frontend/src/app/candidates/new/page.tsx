import { CandidateForm } from '@/components/candidates/candidate-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCandidatePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/candidates"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to candidates
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Candidate</h1>
          <p className="text-muted-foreground">Fill in the candidate information below</p>
        </div>

        <CandidateForm />
      </div>
    </div>
  );
}
