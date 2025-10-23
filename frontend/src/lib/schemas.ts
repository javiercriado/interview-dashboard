// frontend/src/lib/schemas.ts
import { z } from 'zod';

// ===========================
// Candidate Schemas
// ===========================

export const createCandidateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  appliedFor: z.string().min(1, 'Position is required'),
  phone: z.string().optional(),
  source: z.string().min(1, 'Source is required'),
});

export const updateCandidateSchema = createCandidateSchema.partial();

export type CreateCandidateInput = z.infer<typeof createCandidateSchema>;
export type UpdateCandidateInput = z.infer<typeof updateCandidateSchema>;

// ===========================
// Interview Template Schemas
// ===========================

// Base question schema for validation (allows optional followUps/isRequired with defaults)
const questionSchemaBase = z.object({
  id: z.string().optional(),
  text: z.string().min(10, 'Question must be at least 10 characters'),
  competency: z.string().min(1, 'Competency is required'),
  followUps: z.array(z.string()).optional(),
  isRequired: z.boolean().optional(),
});

// Transform schema that provides defaults (this is what the form actually uses)
export const questionSchema = questionSchemaBase.transform((data) => ({
  ...data,
  followUps: data.followUps ?? [],
  isRequired: data.isRequired ?? true,
}));

export const createInterviewTemplateSchema = z.object({
  name: z.string().min(3, 'Template name must be at least 3 characters'),
  jobPosition: z.string().min(1, 'Job position is required'),
  duration: z.number().min(10).max(120, 'Duration must be between 10 and 120 minutes'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
  competencies: z.array(z.string()).min(1, 'At least one competency is required'),
});

export const updateInterviewTemplateSchema = createInterviewTemplateSchema.partial();

// Export input types (what the form uses - with optional fields)
export type QuestionInput = z.input<typeof questionSchema>;
export type CreateInterviewTemplateInput = z.input<typeof createInterviewTemplateSchema>;
export type UpdateInterviewTemplateInput = z.infer<typeof updateInterviewTemplateSchema>;

// Export output types (after validation/transformation - with required fields)
export type QuestionOutput = z.output<typeof questionSchema>;
export type CreateInterviewTemplateOutput = z.output<typeof createInterviewTemplateSchema>;

// ===========================
// Bulk Upload Schema
// ===========================

export const bulkCandidateSchema = z.object({
  candidates: z
    .array(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        appliedFor: z.string().min(1),
        phone: z.string().optional(),
        source: z.string().default('CSV Import'),
      }),
    )
    .min(1, 'At least one candidate is required'),
});

export type BulkCandidateInput = z.infer<typeof bulkCandidateSchema>;

// ===========================
// Interview Notes Schema
// ===========================

export const interviewNotesSchema = z.object({
  notes: z.string().max(5000, 'Notes cannot exceed 5000 characters'),
});

export type InterviewNotesInput = z.infer<typeof interviewNotesSchema>;
