import { NextRequest, NextResponse } from 'next/server';
import { candidates } from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { candidates: newCandidates } = body;

  const created = newCandidates.map((c: unknown, i: number) => ({
    id: `c${candidates.length + i + 1}`,
    ...c,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }));

  candidates.push(...created);

  return NextResponse.json({ created: created.length, candidates: created }, { status: 201 });
}
