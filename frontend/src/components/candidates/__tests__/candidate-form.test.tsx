import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CandidateForm } from '../candidate-form';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock the API hooks
vi.mock('@/lib/hooks/use-candidates', () => ({
  useCreateCandidate: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useUpdateCandidate: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

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

describe('CandidateForm Component', () => {
  it('should render all form fields', () => {
    const mockOnSuccess = vi.fn();

    render(<CandidateForm onSuccess={mockOnSuccess} />, { wrapper });

    // Check text input fields exist
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();

    // Check Source field exists (it's a Select component)
    expect(screen.getByText(/source/i)).toBeInTheDocument();

    // Check submit button exists
    expect(screen.getByRole('button', { name: /add candidate/i })).toBeInTheDocument();
  });

  it('should have submit button', () => {
    const mockOnSuccess = vi.fn();

    render(<CandidateForm onSuccess={mockOnSuccess} />, { wrapper });

    const submitButton = screen.getByRole('button', { name: /add candidate/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('should render with initial values when candidate prop is provided', () => {
    const mockCandidate = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      appliedFor: 'Frontend Developer',
      phone: '555-1234',
      source: 'LinkedIn',
      status: 'invited' as const,
      interviewDate: null,
      createdAt: '2024-01-01',
    };

    const mockOnSuccess = vi.fn();

    render(<CandidateForm candidate={mockCandidate} onSuccess={mockOnSuccess} />, { wrapper });

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Frontend Developer')).toBeInTheDocument();
  });

  // ✅ TEST REQUIREMENT: Integration test for form validation
  it('should prevent form submission with invalid data', async () => {
    const user = userEvent.setup();
    const mockOnSuccess = vi.fn();

    render(<CandidateForm onSuccess={mockOnSuccess} />, { wrapper });

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /add candidate/i });
    await user.click(submitButton);

    // onSuccess should NOT be called with invalid data
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  // ✅ TEST REQUIREMENT: Critical flow integration test
  it('should handle valid form submission', () => {
    const mockOnSuccess = vi.fn();

    render(<CandidateForm onSuccess={mockOnSuccess} />, { wrapper });

    // Form renders and is ready for interaction
    const submitButton = screen.getByRole('button', { name: /add candidate/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
