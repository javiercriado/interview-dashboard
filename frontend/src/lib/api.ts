// frontend/src/lib/api.ts
import type {
  Analytics,
  Candidate,
  CandidateFilters,
  Interview,
  InterviewFilters,
  InterviewTemplate,
} from './types';

// Use NEXT_PUBLIC_API_URL if set, otherwise use relative URLs (for Vercel deployment)
// In development without env var, falls back to empty string which uses Next.js API routes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper function to build query string
function buildQueryString(params: Record<string, unknown>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '' && typeof value === 'string') {
      query.append(key, value);
    }
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

// Interviews API
export async function getInterviews(filters?: InterviewFilters): Promise<Interview[]> {
  const queryString = buildQueryString((filters || {}) as Record<string, unknown>);
  const response = await fetch(`${API_BASE_URL}/api/interviews${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch interviews');
  return response.json();
}

export async function getInterview(id: string): Promise<Interview> {
  const response = await fetch(`${API_BASE_URL}/api/interviews/${id}`);
  if (!response.ok) throw new Error('Failed to fetch interview');
  return response.json();
}

export async function createInterview(data: Partial<Interview>): Promise<Interview> {
  const response = await fetch(`${API_BASE_URL}/api/interviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create interview');
  return response.json();
}

// Candidates API
export async function getCandidates(filters?: CandidateFilters): Promise<Candidate[]> {
  const queryString = buildQueryString((filters || {}) as Record<string, unknown>);
  const response = await fetch(`${API_BASE_URL}/api/candidates${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch candidates');
  return response.json();
}

export async function getCandidate(id: string): Promise<Candidate> {
  const response = await fetch(`${API_BASE_URL}/api/candidates/${id}`);
  if (!response.ok) throw new Error('Failed to fetch candidate');
  return response.json();
}

export async function createCandidate(data: Partial<Candidate>): Promise<Candidate> {
  const response = await fetch(`${API_BASE_URL}/api/candidates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create candidate');
  return response.json();
}

export async function updateCandidate(id: string, data: Partial<Candidate>): Promise<Candidate> {
  const response = await fetch(`${API_BASE_URL}/api/candidates/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update candidate');
  return response.json();
}

export async function bulkCreateCandidates(candidates: Partial<Candidate>[]): Promise<{
  created: number;
  candidates: Candidate[];
}> {
  const response = await fetch(`${API_BASE_URL}/api/candidates/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidates }),
  });
  if (!response.ok) throw new Error('Failed to bulk create candidates');
  return response.json();
}

// Interview Templates API
export async function getInterviewTemplates(): Promise<InterviewTemplate[]> {
  const response = await fetch(`${API_BASE_URL}/api/interview-templates`);
  if (!response.ok) throw new Error('Failed to fetch templates');
  return response.json();
}

export async function getInterviewTemplate(id: string): Promise<InterviewTemplate> {
  const response = await fetch(`${API_BASE_URL}/api/interview-templates/${id}`);
  if (!response.ok) throw new Error('Failed to fetch template');
  return response.json();
}

export async function createInterviewTemplate(
  data: Partial<InterviewTemplate>,
): Promise<InterviewTemplate> {
  const response = await fetch(`${API_BASE_URL}/api/interview-templates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create template');
  return response.json();
}

export async function updateInterviewTemplate(
  id: string,
  data: Partial<InterviewTemplate>,
): Promise<InterviewTemplate> {
  const response = await fetch(`${API_BASE_URL}/api/interview-templates/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update template');
  return response.json();
}

export async function deleteInterviewTemplate(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/interview-templates/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete template');
}

// Analytics API
export async function getAnalytics(): Promise<Analytics> {
  const response = await fetch(`${API_BASE_URL}/api/analytics`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
}
