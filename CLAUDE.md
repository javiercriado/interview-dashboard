# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the AI Interview Dashboard project.

## 🎯 Project Context

**Assignment**: Build an admin dashboard for a voice-enabled AI interviewing platform
**Company**: DaCodes (Key Singularity)
**Time Estimate**: 6-8 hours of focused development
**Key Evaluation**: 30% of grade is on AI collaboration documentation (CLAUDE_CODE.md)

**Original Requirements Document**: `docs/requirements/technical-task-requirements.md`
→ Always refer to this document for detailed specifications and evaluation criteria

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with KeySingularity brand colors
- **Components**: shadcn/ui (pre-built, saves time)
- **Data Tables**: TanStack Table v8
- **Data Fetching**: TanStack Query
- **Charts**: Recharts (NOT TanStack Charts)
- **Forms**: React Hook Form + Zod validation
- **State**: Context API (keep it simple, no Zustand)
- **Icons**: Lucide React (comes with shadcn/ui)

### Backend
- Mock Express API server (provided in requirements)
- Runs on port 3001

### Development Tools
- **Testing**: Vitest (selective, high-impact tests only)
- **Linting/Formatting**: Biome (not ESLint)
- **Task Management**: Task Master AI
- **Deployment**: Vercel (one-click deploy)

## 🎨 Design System

### Brand Colors (KeySingularity)
```css
/* Tailwind config */
primary: #facc15       /* Yellow accent */
background: #0D121C    /* Dark background */
foreground: #f8fafc    /* Light text */
muted: #1e293b         /* Muted elements */
border: #334155        /* Borders */
```

### Typography (KeySingularity)
```css
/* Font families */
font-family: 'IBM Plex Mono'  /* Headers */
font-family: 'Open Sans'      /* Body text */
```

### UI Guidelines
- Dark theme by default
- Yellow (#facc15) for primary actions and accents
- Clean, professional interface
- Responsive design (mobile-friendly)
- Loading skeletons for async operations
- Empty states with helpful messages

## 📁 Required Repository Structure

As per `docs/requirements/technical-task-requirements.md`:

```
interview-dashboard/
├── api/                    # Mock API server
│   ├── server.js
│   └── package.json
├── frontend/               # Your dashboard app
│   ├── src/
│   ├── package.json
│   └── README.md
├── README.md              # Main setup instructions
├── DEVELOPMENT.md         # Your process documentation
├── CLAUDE_CODE.md         # AI usage documentation (CRITICAL - 30% of grade)
└── .gitignore             # Ignore node_modules, etc.

# Additional folders (for development, not submission)
├── docs/
│   ├── requirements/      # Original requirements (tracked in git)
│   │   └── technical-task-requirements.md
│   ├── references/        # Reference docs (ignored by git)
│   └── temp/              # Temporary files (ignored by git)
└── .taskmaster/           # Task Master AI workflow
```

## 📝 Documentation Requirements

### From Original Requirements (Section 2. Documentation)

**CLAUDE_CODE.md** - Dedicated to AI workflow (⭐ 30% of your grade)

This is the MOST IMPORTANT document. Required sections:

1. **Setup & Scaffolding**
   - Initial prompts to set up project structure
   - How Claude helped with routing, dependencies, etc.
   - Example: "I asked Claude: 'Help me set up...' and it generated..."

2. **Component Development**
   - Specific prompts for each major component
   - What Claude generated vs. what you modified
   - Example: "For the InterviewList component, I prompted: '...' Claude's code worked except for..."

3. **Debugging & Problem Solving**
   - Error messages you encountered
   - How you asked Claude for help
   - What worked and what didn't
   - Example: "Got error 'Cannot read property...' Asked Claude: '...' Solution was..."

4. **Testing**
   - How Claude helped generate tests
   - Test prompts you used
   - Tests you had to write manually

5. **Iteration Examples**
   - Times Claude's first attempt didn't work
   - How you refined your prompts
   - Example: "Claude suggested X but it had Y bug. I asked again with more context..."

6. **Critical Review**
   - Code Claude generated that you had to fix/reject
   - Why you chose a different approach
   - Demonstrates you reviewed AI output critically

7. **What Worked Well**
   - Where Claude was most helpful
   - Best prompting strategies you discovered

8. **What Didn't Work**
   - Where Claude struggled
   - What you had to do manually
   - Be honest!

**DEVELOPMENT.md** - Process Documentation (Required)

This document summarizes your development process and decisions:

1. **Development Approach**
   - How you tackled the assignment
   - Time breakdown by phase
   - Key decisions made

2. **Claude Code Usage Summary**
   - Where AI was most helpful
   - Productivity metrics
   - Key learnings

3. **Technical Decisions**
   - Why you chose specific approaches
   - Trade-offs made
   - What you'd do differently

**When to Update:** Before each commit (as a summary of CLAUDE_CODE.md entries)
**Purpose:** High-level overview for evaluators who want the summary before diving into detailed CLAUDE_CODE.md

### Documentation Format Example

```markdown
# Claude Code Usage Documentation

## Setup Phase
**Prompt:** "Help me set up a React TypeScript project with these routes..."
**Result:** Claude generated package.json and routing structure
**My modifications:** Had to adjust TypeScript config for strict mode

## Interview List Component
**Prompt:** "Create a filterable table component..."
**Claude's code:** [paste relevant snippet]
**Issues found:** Filter wasn't debounced, caused too many re-renders
**My fix:** Added useDeferredValue hook

[More examples...]
```

## ⚡ Development Workflow

**Detailed Steps**: See `WORKFLOW.md` for complete step-by-step workflow with approval gates

### Documentation Workflow (CRITICAL)

**Every significant interaction with Claude must be documented:**

1. **During Development (Real-time documentation)**
   - After each Claude interaction, update CLAUDE_CODE.md directly
   - Copy significant prompts and key parts of responses
   - Focus on meaningful interactions, not trivial ones

2. **Task Master Integration**
   - Task Master will remind you after each feature to update documentation
   - Use step in workflow: "Document Claude interaction in CLAUDE_CODE.md"

3. **Documentation Strategy**
   - Update CLAUDE_CODE.md with significant interactions as you work
   - Organize by feature/component being developed
   - Include iterations and improvements

4. **Documentation Checklist per Feature**
   - [ ] Copy exact prompt used
   - [ ] Paste relevant parts of Claude's response
   - [ ] Note what you modified and why
   - [ ] Record time saved vs manual coding
   - [ ] Rate effectiveness (optional but helpful)

### Task Master Workflow Steps

1. **Session Start**
   - Run `task-master next`
   - Create TodoWrite with workflow steps
   - Have CLAUDE_CODE.md open for updates

2. **For Each Feature**
   - Start: Note feature name in CLAUDE_CODE.md
   - Prompt Claude with specific requirements
   - Document: Copy prompt to CLAUDE_CODE.md immediately
   - Test Claude's code
   - Fix any issues
   - Document: Note fixes and improvements
   - Commit with descriptive message

3. **After Each Feature**
   - Update CLAUDE_CODE.md with outcomes
   - Mark task complete in Task Master
   - Check next task

4. **Before Final Submission**
   - Review CLAUDE_CODE.md for completeness
   - Ensure all required sections are covered
   - Add final reflection and time analysis

### Git Commit Strategy

Minimum 5 meaningful commits showing progression:
```bash
git log --oneline
# Example good history:
a1b2c3d docs: add README and setup instructions
d4e5f6g test: add tests for candidate management
g7h8i9j feat: implement interview template builder
j1k2l3m feat: add bulk CSV upload for candidates
m4n5o6p feat: create analytics dashboard
p7q8r9s feat: add interview detail view with charts
s1t2u3v feat: implement interview list with filtering
v4w5x6y chore: initial project setup
```

## 🚀 Essential Commands

### Development
```bash
# Start mock API server (terminal 1)
cd api && npm install && npm start

# Start Next.js dev server (terminal 2)
cd frontend && npm run dev

# Run both with concurrently (if set up)
npm run dev:all
```

### Testing & Quality
```bash
npm run test          # Run Vitest tests
npm run lint          # Run Biome linter
npm run format        # Format with Biome
npm run type-check    # TypeScript check
```

### Task Master Commands
```bash
task-master next              # Get next task
task-master list              # View all tasks
task-master set-status --id=<id> --status=in-progress
task-master set-status --id=<id> --status=completed
```

### Documentation Commands
```bash
# Open CLAUDE_CODE.md for editing during development
# Update it directly with significant interactions
code CLAUDE_CODE.md  # or your preferred editor
```

## 📋 Feature Requirements

Per `docs/requirements/technical-task-requirements.md`:

### Phase 1: Core Dashboard (3-4 hours)

**1.1 Interview List View**
- Table with: candidate name, position, date, score, status, recommendation
- Filters: date range picker, position dropdown, status dropdown
- Search bar (real-time)
- Sorting on columns
- Click row to view details

**1.2 Interview Detail View**
- Full interview information
- Competency breakdown (visual chart)
- Transcript display
- Audio player UI (doesn't need to actually play)
- Notes textarea (save to local state)
- Back button to list

**1.3 Analytics Dashboard**
- Key metrics cards: total interviews, completion rate, avg score
- Funnel visualization (invited → started → completed)
- Position breakdown (bar/pie chart)
- Recommendation distribution (hire/maybe/no-hire)
- Recent interviews list

### Phase 2: Candidate Management (2-3 hours)

**2.1 Candidate List**
- Table with: name, email, position, status, interview date
- Filter by status
- Search functionality
- Add new candidate button

**2.2 Add/Edit Candidate**
- Form with validation
- Fields: name, email, phone, position, source
- Submit creates candidate via API

**2.3 Candidate Detail View**
- Profile information
- Interview history (if any)
- Status update workflow
- Ability to send invite (simulated)

**2.4 Bulk Upload**
- CSV file upload
- Preview uploaded data
- Validation before import
- Show import results

### Phase 3: Interview Flow Builder (2-3 hours)

**3.1 Template List**
- Display existing templates
- Create new template button
- Duplicate template option
- Delete template

**3.2 Template Builder**
- Form to create/edit template
- Add/remove questions dynamically
- Assign competencies to questions
- Add follow-up questions
- Set interview duration
- Preview mode

**3.3 Question Management**
- Rich text editor for questions (or textarea)
- Competency dropdown
- Follow-up questions array
- Reorder questions (drag-drop bonus)

## 🔧 Implementation Patterns

### Component Pattern
```typescript
// ALWAYS use shadcn/ui components when available
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

// DON'T create custom components unless absolutely necessary
// ❌ BAD: Custom implementation
const CustomButton = ({ children, ...props }) => {
  return <button className="custom-styles" {...props}>{children}</button>
};

// ✅ GOOD: Use shadcn/ui component
<Button variant="outline" size="sm">Click me</Button>
```

**Why use shadcn/ui components:**
- Pre-built and tested
- Consistent design system
- Accessibility built-in
- Saves development time
- Matches KeySingularity branding when configured

**When custom components are acceptable:**
- No shadcn/ui equivalent exists
- Highly specialized business logic
- Composite components that combine multiple shadcn/ui components

### API Integration Pattern
```typescript
// Use TanStack Query for all API calls
import { useQuery, useMutation } from '@tanstack/react-query';

const useInterviews = (filters?: FilterParams) => {
  return useQuery({
    queryKey: ['interviews', filters],
    queryFn: () => fetchInterviews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Form Pattern with Zod
```typescript
// Define schema once, use everywhere
import { z } from 'zod';

const candidateSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  appliedFor: z.string().min(1, 'Position is required'),
});

type CandidateForm = z.infer<typeof candidateSchema>;
```

### Table Pattern with TanStack Table
```typescript
// Use shadcn/ui Table with TanStack Table v8
import { DataTable } from '@/components/ui/data-table';

// Columns definition with proper typing
const columns: ColumnDef<Interview>[] = [
  {
    accessorKey: 'candidateName',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Candidate <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // ... more columns
];
```

## 🔒 Type Safety Architecture

### Philosophy

We follow a clear separation between validation and data representation:

- **TypeScript types** (`types.ts`) - Single source of truth for API data structures
- **Zod schemas** (`schemas.ts`) - User input validation only (forms, CSV uploads)
- **No runtime validation** of trusted API responses
- **Type-safe API client** - All endpoints return properly typed data

### File Organization

```
frontend/src/lib/
├── types.ts          # API data types (Interview, Candidate, etc.)
├── schemas.ts        # Zod validation schemas (forms only)
├── api.ts            # Typed API client functions
└── hooks/            # TanStack Query hooks with proper types
    ├── use-interviews.ts
    ├── use-candidates.ts
    ├── use-templates.ts
    └── use-analytics.ts
```

### When to Use Zod vs TypeScript Types

#### ✅ Use Zod Schemas (Runtime Validation)
- **Form validation** (React Hook Form)
- **CSV bulk uploads** (user-provided data)
- **URL parameters** and query strings
- **Any untrusted user input**

```typescript
// Example: Form validation
import { zodResolver } from '@hookform/resolvers/zod';
import { createCandidateSchema } from '@/lib/schemas';

const form = useForm({
  resolver: zodResolver(createCandidateSchema),
});

const onSubmit = (data: CreateCandidateInput) => {
  // Data is validated by Zod before reaching here
  createCandidate.mutate(data);
};
```

#### ✅ Use TypeScript Types (Compile-Time Safety)
- **API responses** (we control both frontend and API)
- **Component props** and state
- **Hook return values**
- **Internal data transformations**

```typescript
// Example: Typed API responses
import type { Interview } from '@/lib/types';

const { data, isLoading } = useInterviews({ status: 'completed' });
// data is typed as Interview[] - no runtime validation needed
```

### Type Safety Patterns

#### Pattern 1: Form Input → API Call

```typescript
// 1. Define Zod schema for validation
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// 2. Infer TypeScript type from schema
type FormInput = z.infer<typeof schema>;

// 3. Use in React Hook Form
const form = useForm<FormInput>({
  resolver: zodResolver(schema),
});

// 4. Submit validated data
const onSubmit = (data: FormInput) => {
  createCandidate.mutate(data); // Type-safe mutation
};
```

#### Pattern 2: API Response → UI Display

```typescript
// 1. API returns typed data (no validation)
const { data: interviews } = useInterviews();
// Type: Interview[] | undefined

// 2. Use with TypeScript safety
interviews?.map((interview: Interview) => (
  <InterviewRow
    key={interview.id}
    candidateName={interview.candidateName}
    score={interview.score}
    // All fields are type-checked
  />
));
```

#### Pattern 3: Filter Objects

```typescript
// Filters use TypeScript types (optional fields)
const [filters, setFilters] = useState<InterviewFilters>({
  status: undefined,
  jobPosition: undefined,
  search: '',
});

// API client handles undefined values
const { data } = useInterviews(filters);
```

### Anti-Patterns to Avoid

#### ❌ Don't Validate Trusted API Responses

```typescript
// BAD: Unnecessary validation overhead
const response = await getInterviews();
const validated = interviewArraySchema.parse(response); // Overkill!
```

#### ❌ Don't Duplicate Types in Zod

```typescript
// BAD: Duplicates types.ts
const candidateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  // ... duplicating everything from Candidate type
});
```

#### ✅ GOOD: Separate Concerns

```typescript
// types.ts - Complete data structure
export interface Candidate {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  // ... all fields
}

// schemas.ts - Only user-provided fields
export const createCandidateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // No id, createdAt - backend generates these
});
```

### Benefits of This Approach

- ✅ **No duplication** - Types defined once in `types.ts`
- ✅ **Performance** - No unnecessary runtime validation
- ✅ **Type safety** - Full TypeScript checking across the app
- ✅ **Clear separation** - Validation vs data representation
- ✅ **Maintainability** - Single source of truth for data structures

### Adding New Data Types

When adding a new API endpoint:

1. **Add TypeScript type** to `types.ts`
   ```typescript
   export interface NewEntity {
     id: string;
     // ... fields
   }
   ```

2. **Add Zod schema** to `schemas.ts` (if there's a form)
   ```typescript
   export const createNewEntitySchema = z.object({
     // Only user-provided fields
   });
   ```

3. **Add API function** to `api.ts`
   ```typescript
   export async function getNewEntities(): Promise<NewEntity[]> {
     // Typed response
   }
   ```

4. **Create custom hook** in `hooks/`
   ```typescript
   export function useNewEntities() {
     return useQuery({
       queryKey: ['new-entities'],
       queryFn: getNewEntities,
     });
   }
   ```

### Type Safety in Forms

All forms use React Hook Form + Zod resolver:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCandidateSchema, type CreateCandidateInput } from '@/lib/schemas';

const form = useForm<CreateCandidateInput>({
  resolver: zodResolver(createCandidateSchema),
  defaultValues: {
    name: '',
    email: '',
    appliedFor: '',
    source: 'Direct',
  },
});
```

**Key points:**
- Use Zod schema for validation
- Infer TypeScript type with `z.infer<>`
- React Hook Form provides type-safe field access
- Validation happens before submission

## 🎯 Quality Checklist

### Before Each Commit
- [ ] Feature works as expected
- [ ] TypeScript has no errors
- [ ] Component has loading/error states
- [ ] Responsive on mobile
- [ ] **Documented in CLAUDE_CODE_LOG.md**

### Before Final Submission
- [ ] All 5 main features working
- [ ] Tests written for critical paths
- [ ] **CLAUDE_CODE.md shows comprehensive AI collaboration**
- [ ] README has clear setup instructions
- [ ] DEVELOPMENT.md documents process
- [ ] Repository structure matches requirements
- [ ] Minimum 5 meaningful commits
- [ ] Deployed to Vercel (bonus)

## 🚨 Important Reminders

### Documentation is 30% of Grade!
- Document AS YOU GO, not at the end
- Copy actual prompts and responses
- Show iterations and improvements
- Be honest about what didn't work
- Include time saved estimates

### What NOT to Do
- Don't over-engineer (this is a 6-8 hour task)
- Don't implement authentication (mock it)
- Don't create a real database
- Don't spend too much time on perfect tests
- Don't hide AI usage (document it proudly)
- **Don't forget to document Claude interactions!**

### Time Management
- Hour 1-2: Setup + Interview List + **document**
- Hour 3-4: Analytics Dashboard + **document**
- Hour 5-6: Candidate Management + **document**
- Hour 7: Template Builder + **document**
- Hour 8: Polish + **finalize CLAUDE_CODE.md**

## 📚 Reference Documents

For additional context and patterns, refer to:
- `docs/requirements/technical-task-requirements.md` - Original detailed requirements
- `docs/references/CLAUDE_CODE-template.md` - Documentation template
- `docs/references/CLAUDE-shortcat.md` - Production patterns reference
- `docs/references/type-safety.md` - TypeScript patterns
- `docs/references/ui-patterns.md` - UI component patterns

## 🔑 Success Formula

1. **Heavy Claude Usage** + **Great Documentation** = High Score
2. Document every significant Claude interaction
3. Show iterative improvement and critical thinking
4. Deliver working features with clean code
5. Use KeySingularity brand colors and fonts
6. Deploy to Vercel for bonus points

Remember: This assignment specifically tests AI collaboration skills. They EXPECT and WANT to see extensive Claude usage with detailed documentation!

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
