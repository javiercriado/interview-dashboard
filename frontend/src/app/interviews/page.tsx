import { InterviewList } from '@/components/interviews/interview-list';
import { AppLayout } from '@/components/layout/app-layout';

export default function InterviewsPage() {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary">Interviews</h1>
          <p className="text-muted-foreground">View and manage all interviews</p>
        </div>
        <InterviewList />
      </div>
    </AppLayout>
  );
}
