import { NextRequest, NextResponse } from 'next/server';
import { interviews } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const jobPosition = searchParams.get('jobPosition');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy');

  let filtered = [...interviews];

  // Filter by status
  if (status) {
    filtered = filtered.filter((i) => i.status === status);
  }

  // Filter by job position
  if (jobPosition) {
    filtered = filtered.filter((i) => i.jobPosition === jobPosition);
  }

  // Date range filtering
  if (startDate || endDate) {
    filtered = filtered.filter((i) => {
      const interviewDate = new Date(i.completedAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Set time to start of day for startDate and end of day for endDate (UTC)
      if (start) start.setUTCHours(0, 0, 0, 0);
      if (end) end.setUTCHours(23, 59, 59, 999);

      if (start && end) {
        return interviewDate >= start && interviewDate <= end;
      }
      if (start) {
        return interviewDate >= start;
      }
      if (end) {
        return interviewDate <= end;
      }
      return true;
    });
  }

  // Search filtering
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.candidateName.toLowerCase().includes(term) ||
        i.candidateEmail.toLowerCase().includes(term),
    );
  }

  // Sorting
  if (sortBy === 'score') {
    filtered.sort((a, b) => b.score - a.score);
  }
  if (sortBy === 'date') {
    filtered.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newInterview = {
    id: String(interviews.length + 1),
    ...body,
    createdAt: new Date().toISOString(),
    status: 'scheduled',
  };

  interviews.push(newInterview);

  return NextResponse.json(newInterview, { status: 201 });
}
