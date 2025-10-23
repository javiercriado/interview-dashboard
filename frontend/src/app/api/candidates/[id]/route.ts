import { NextRequest, NextResponse } from 'next/server';
import { candidates, interviews } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
  }

  const candidateInterviews = interviews.filter((i) => i.candidateId === id);

  return NextResponse.json({ ...candidate, interviews: candidateInterviews });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const index = candidates.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
  }

  candidates[index] = { ...candidates[index], ...body };

  return NextResponse.json(candidates[index]);
}
