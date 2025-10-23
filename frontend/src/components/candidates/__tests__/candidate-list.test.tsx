import { useCandidates } from '@/lib/hooks/use-candidates';
import type { Candidate } from '@/lib/types';
import type { UseQueryResult } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CandidateList } from '../candidate-list';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the hooks
vi.mock('@/lib/hooks/use-candidates');

// Test wrapper with providers
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('CandidateList Component - Error Handling', () => {
  // ✅ TEST REQUIREMENT: Test API error handling
  it('should display error message when API fails', () => {
    // Mock API error state - only include fields the component uses
    vi.mocked(useCandidates).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch candidates'),
    } as UseQueryResult<Candidate[], Error>);

    render(<CandidateList />, { wrapper });

    // Error message should be displayed
    expect(screen.getByText(/error loading candidates/i)).toBeInTheDocument();
  });

  it('should display loading state', () => {
    // Mock loading state - only include fields the component uses
    vi.mocked(useCandidates).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as UseQueryResult<Candidate[], Error>);

    render(<CandidateList />, { wrapper });

    // Header should still render during loading
    expect(screen.getByText('Candidates')).toBeInTheDocument();

    // Table should be present (with loading skeleton rows)
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
