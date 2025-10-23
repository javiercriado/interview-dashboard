import { NextRequest, NextResponse } from 'next/server';
import { interviewTemplates } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const template = interviewTemplates.find((t) => t.id === id);

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  return NextResponse.json(template);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const index = interviewTemplates.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  interviewTemplates[index] = {
    ...interviewTemplates[index],
    ...body,
    id, // Preserve ID
  };

  return NextResponse.json(interviewTemplates[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = interviewTemplates.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  interviewTemplates.splice(index, 1);

  return new NextResponse(null, { status: 204 });
}
