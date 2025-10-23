import { NextRequest, NextResponse } from 'next/server';
import { candidates } from '@/lib/mock-data';
import type { Candidate } from '@/lib/types';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { candidates: newCandidates } = body as { candidates: Partial<Candidate>[] };

  const created: Candidate[] = newCandidates.map((c, i) => ({
    id: `c${candidates.length + i + 1}`,
    name: c.name || '',
    email: c.email || '',
    phone: c.phone,
    appliedFor: c.appliedFor || '',
    source: c.source || 'Unknown',
    status: 'pending',
    createdAt: new Date().toISOString(),
  }));

  candidates.push(...created);

  return NextResponse.json({ created: created.length, candidates: created }, { status: 201 });
}
