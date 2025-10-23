import { InterviewList } from '@/components/interviews/interview-list';

export default function InterviewsPage() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <p className="text-muted-foreground">Manage and review all candidate interviews</p>
      </div>
      <InterviewList />
    </div>
  );
}
