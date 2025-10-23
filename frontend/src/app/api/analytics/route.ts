import { NextResponse } from 'next/server';
import { interviews, candidates } from '@/lib/mock-data';

export async function GET() {
  const total = interviews.length;
  const completed = interviews.filter((i) => i.status === 'completed').length;
  const avgScore = interviews.reduce((sum, i) => sum + i.score, 0) / total;

  const funnel = {
    invited: candidates.length,
    started: interviews.length,
    completed: completed,
  };

  const byPosition: Record<string, number> = {};
  for (const interview of interviews) {
    if (!byPosition[interview.jobPosition]) {
      byPosition[interview.jobPosition] = 0;
    }
    byPosition[interview.jobPosition]++;
  }

  return NextResponse.json({
    total,
    completed,
    avgScore,
    funnel,
    byPosition,
    recommendations: {
      hire: interviews.filter((i) => i.recommendation === 'hire' || i.recommendation === 'strong_hire')
        .length,
      maybe: interviews.filter((i) => i.recommendation === 'maybe').length,
      no_hire: interviews.filter((i) => i.recommendation === 'no_hire').length,
    },
  });
}
