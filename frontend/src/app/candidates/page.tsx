import { CandidateList } from '@/components/candidates/candidate-list';
import { AppLayout } from '@/components/layout/app-layout';

export default function CandidatesPage() {
  return (
    <AppLayout>
      <CandidateList />
    </AppLayout>
  );
}
