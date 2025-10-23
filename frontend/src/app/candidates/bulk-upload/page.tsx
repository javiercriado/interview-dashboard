import { BulkUploadForm } from '@/components/candidates/bulk-upload-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BulkUploadPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Bulk Upload Candidates</h1>
          <p className="text-muted-foreground">
            Upload a CSV file with candidate information to add multiple candidates at once
          </p>
        </div>

        <BulkUploadForm />
      </div>
    </div>
  );
}
