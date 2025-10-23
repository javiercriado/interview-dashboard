import { NextRequest, NextResponse } from 'next/server';
import { interviewTemplates } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(interviewTemplates);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newTemplate = {
    id: `t${interviewTemplates.length + 1}`,
    ...body,
    createdAt: new Date().toISOString(),
  };

  interviewTemplates.push(newTemplate);

  return NextResponse.json(newTemplate, { status: 201 });
}
