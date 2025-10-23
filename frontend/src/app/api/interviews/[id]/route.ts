import { NextRequest, NextResponse } from 'next/server';
import { interviews } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const interview = interviews.find((i) => i.id === id);

  if (!interview) {
    return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
  }

  return NextResponse.json(interview);
}
