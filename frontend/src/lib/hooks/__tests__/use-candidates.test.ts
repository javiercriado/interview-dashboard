import { createCandidateSchema } from '@/lib/schemas';
import { describe, expect, it } from 'vitest';

// Basic API integration validation tests
describe('Candidate API Integration', () => {
  it('should validate candidate data structure', () => {
    const validCandidate = {
      name: 'John Doe',
      email: 'john@example.com',
      appliedFor: 'Frontend Developer',
      source: 'LinkedIn',
    };

    const result = createCandidateSchema.safeParse(validCandidate);
    expect(result.success).toBe(true);
  });

  it('should reject invalid candidate data', () => {
    const invalidCandidate = {
      name: 'J',
      email: 'invalid',
      appliedFor: '',
      source: '',
    };

    const result = createCandidateSchema.safeParse(invalidCandidate);
    expect(result.success).toBe(false);
  });
});
