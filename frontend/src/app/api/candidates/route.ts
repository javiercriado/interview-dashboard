import { NextRequest, NextResponse } from 'next/server';
import { candidates } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const jobPosition = searchParams.get('jobPosition');
  const search = searchParams.get('search');

  let filtered = [...candidates];

  // Filter by status
  if (status) {
    filtered = filtered.filter((c) => c.status === status);
  }

  // Filter by job position
  if (jobPosition) {
    filtered = filtered.filter((c) => c.appliedFor === jobPosition);
  }

  // Search filtering
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (c) => c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term),
    );
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newCandidate = {
    id: `c${candidates.length + 1}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  candidates.push(newCandidate);

  return NextResponse.json(newCandidate, { status: 201 });
}
