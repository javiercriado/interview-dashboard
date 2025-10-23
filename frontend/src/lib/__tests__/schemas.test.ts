import { describe, expect, it } from 'vitest';
import {
  bulkCandidateSchema,
  createCandidateSchema,
  createInterviewTemplateSchema,
  interviewNotesSchema,
} from '../schemas';

describe('Candidate Schema Validation', () => {
  it('should validate correct candidate data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      appliedFor: 'Frontend Developer',
      source: 'LinkedIn',
    };

    const result = createCandidateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      appliedFor: 'Frontend Developer',
      source: 'LinkedIn',
    };

    const result = createCandidateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('should reject name shorter than 2 characters', () => {
    const invalidData = {
      name: 'J',
      email: 'john@example.com',
      appliedFor: 'Frontend Developer',
      source: 'LinkedIn',
    };

    const result = createCandidateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 2 characters');
    }
  });

  it('should require position field', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      appliedFor: '',
      source: 'LinkedIn',
    };

    const result = createCandidateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Position is required');
    }
  });
});

describe('Interview Template Schema Validation', () => {
  it('should validate correct template data', () => {
    const validData = {
      name: 'Frontend Developer Assessment',
      jobPosition: 'Frontend Developer',
      duration: 45,
      questions: [
        {
          text: 'Describe your experience with React',
          competency: 'Technical Skills',
        },
      ],
      competencies: ['Technical Skills', 'Communication'],
    };

    const result = createInterviewTemplateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject template name shorter than 3 characters', () => {
    const invalidData = {
      name: 'AB',
      jobPosition: 'Frontend Developer',
      duration: 45,
      questions: [
        {
          text: 'Describe your experience',
          competency: 'Technical Skills',
        },
      ],
      competencies: ['Technical Skills'],
    };

    const result = createInterviewTemplateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject duration outside valid range', () => {
    const invalidData = {
      name: 'Frontend Assessment',
      jobPosition: 'Frontend Developer',
      duration: 150, // Max is 120
      questions: [
        {
          text: 'Describe your experience',
          competency: 'Technical Skills',
        },
      ],
      competencies: ['Technical Skills'],
    };

    const result = createInterviewTemplateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('between 10 and 120');
    }
  });

  it('should require at least one question', () => {
    const invalidData = {
      name: 'Frontend Assessment',
      jobPosition: 'Frontend Developer',
      duration: 45,
      questions: [],
      competencies: ['Technical Skills'],
    };

    const result = createInterviewTemplateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('At least one question is required');
    }
  });

  it('should reject question text shorter than 10 characters', () => {
    const invalidData = {
      name: 'Frontend Assessment',
      jobPosition: 'Frontend Developer',
      duration: 45,
      questions: [
        {
          text: 'Too short',
          competency: 'Technical Skills',
        },
      ],
      competencies: ['Technical Skills'],
    };

    const result = createInterviewTemplateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Bulk Candidate Schema Validation', () => {
  it('should validate correct bulk candidate data', () => {
    const validData = {
      candidates: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          appliedFor: 'Frontend Developer',
          source: 'CSV Import',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          appliedFor: 'Backend Developer',
          source: 'CSV Import',
        },
      ],
    };

    const result = bulkCandidateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should require at least one candidate', () => {
    const invalidData = {
      candidates: [],
    };

    const result = bulkCandidateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('At least one candidate is required');
    }
  });

  it('should reject invalid candidate email in bulk upload', () => {
    const invalidData = {
      candidates: [
        {
          name: 'John Doe',
          email: 'invalid-email',
          appliedFor: 'Frontend Developer',
          source: 'CSV Import',
        },
      ],
    };

    const result = bulkCandidateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Interview Notes Schema Validation', () => {
  it('should validate notes within character limit', () => {
    const validData = {
      notes: 'This is a valid interview note.',
    };

    const result = interviewNotesSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject notes exceeding 5000 characters', () => {
    const invalidData = {
      notes: 'a'.repeat(5001),
    };

    const result = interviewNotesSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('cannot exceed 5000 characters');
    }
  });

  it('should allow empty notes', () => {
    const validData = {
      notes: '',
    };

    const result = interviewNotesSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
