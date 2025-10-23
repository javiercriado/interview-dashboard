# Product Requirements Document - AI Interview Dashboard

**Reference Document**: `docs/requirements/technical-task-requirements.md` contains complete original requirements and evaluation criteria.

## Project Overview

Build an admin dashboard for a voice-enabled AI interviewing platform that allows clients to track interviews, view reports, manage candidates, and create interview flows.

**Time Estimate**: 6-8 hours
**Key Evaluation**: 30% of grade is AI collaboration documentation (CLAUDE_CODE.md)

## Tech Stack (Defined)

### Frontend
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with KeySingularity brand colors
- **UI Components**: shadcn/ui
- **Data Tables**: TanStack Table v8
- **Data Fetching**: TanStack Query
- **Charts**: Recharts (NOT TanStack Charts)
- **Forms**: React Hook Form + Zod validation
- **State Management**: Context API
- **Icons**: Lucide React

### Backend
- Mock Express API server (provided in requirements)
- Port: 3001

### Development Tools
- **Linting/Formatting**: Biome (NOT ESLint)
- **Testing**: Vitest (selective, high-impact tests)
- **Task Management**: Task Master AI
- **Version Control**: Git with conventional commits
- **Deployment**: Vercel

### Design System
```css
/* KeySingularity Brand */
primary: #facc15        /* Yellow accent */
background: #0D121C     /* Dark background */
font-family: 'IBM Plex Mono'  /* Headers */
font-family: 'Open Sans'       /* Body text */
```

## Required Features & Deliverables

### Phase 1: Core Dashboard (3-4 hours)

#### 1.1 Interview Tracking Dashboard
**Feature Requirements**:
- List of all completed interviews
- Filter by: date range, job position, status, candidate
- Search by candidate name or email (debounced)
- Sort by: completion date, score, status
- Visual metrics: total interviews, completion rate, average score
- Export to CSV functionality

**Deliverables**:
- Table with columns: candidate name, position, date, score, status, recommendation
- Filters: date range picker, position dropdown, status dropdown
- Real-time search bar with debouncing
- Sorting enabled on all columns
- Click row to navigate to detail view
- CSV export button

#### 1.2 Interview Detail/Report View
**Feature Requirements**:
- Detailed interview transcript/summary
- AI-generated candidate assessment
- Scoring breakdown by competency 
- Recommendations (hire/no-hire/maybe/strong_hire)
- Audio playback controls (simulated, doesn't actually play)
- Interviewer notes section

**Deliverables**:
- Full interview information display
- Competency breakdown radar chart (using Recharts) [let's make the max. score 1,000 o 100 and not multiply by 10 the actual scoring of each candidate]
- Transcript display in readable format
- Mock audio player UI
- Notes textarea with local state persistence
- Back button navigation to list

#### 1.3 Client Analytics Dashboard
**Feature Requirements**:
- Interview completion funnel (invited → started → completed)
- Time-to-completion metrics
- Top performing candidates
- Hiring pipeline status
- Interview quality scores
- Charts/graphs for key metrics

**Deliverables**:
- Key metrics cards: total interviews, completion rate, avg score
- Funnel visualization chart
- Position breakdown (bar/pie chart)
- Recommendation distribution (hire/maybe/no-hire)
- Recent interviews list
- All charts using Recharts with brand colors

### Phase 2: Candidate Management (2-3 hours)

#### 2.1 Candidate Management System
**Feature Requirements**:
- List all candidates
- View candidate profile with interview history
- Add new candidates manually
- Bulk upload candidates (CSV)
- Candidate disposition workflow (pending → invited → interviewed → hired/rejected)
- Email invitation system (simulated)

**Deliverables - Candidate List**:
- Table with: name, email, position, status, interview date
- Filter by status (pending, invited, interviewed)
- Search functionality
- Add new candidate button
- Click row to view candidate details

**Deliverables - Add/Edit Candidate**:
- Form with React Hook Form + Zod validation
- Fields: name, email, phone, position (applied for), source
- Submit creates/updates candidate via API
- Show validation errors clearly

**Deliverables - Candidate Detail View**:
- Complete profile information display
- Interview history list (if any)
- Status update workflow UI
- Send invite button (simulated functionality)
- Edit candidate information

**Deliverables - Bulk CSV Upload**:
- Drag & drop file upload area
- Parse CSV and display preview table
- Validate data (required fields, email format)
- Show validation errors per row
- Import progress indicator
- Display import results summary

### Phase 3: Interview Flow Builder (2-3 hours)

#### 3.1 Interview Flow Builder
**Feature Requirements**:
- Create new interview templates
- Define questions for each job role
- Set evaluation criteria/competencies
- Configure interview duration and structure
- Duplicate existing templates
- Preview interview flow

**Deliverables - Template List**:
- Display all existing templates in cards or list
- Create new template button
- Duplicate template option
- Delete template functionality
- Click to edit template

**Deliverables - Template Builder**:
- Form to create/edit template
- Template name and job position fields
- Set interview duration (minutes)
- Add/remove questions dynamically
- Assign competencies to each question
- Add follow-up questions for each main question
- Reorder questions (drag-drop if time permits)
- Preview mode to see interview flow

**Deliverables - Question Management**:
- Text area for question content
- Competency assignment dropdown
- Follow-up questions array management
- Question type selection (if applicable)
- Required/optional question toggle

## Implementation Requirements

### Folder Structure (MUST MATCH)
```
interview-dashboard/
├── api/                    # Mock API server
│   ├── server.js          # Copy from requirements doc
│   └── package.json
├── frontend/               # Next.js app
│   ├── src/
│   ├── package.json
│   └── README.md
├── README.md              # Setup instructions
├── DEVELOPMENT.md         # Process documentation
├── CLAUDE_CODE.md         # AI usage documentation (30% of grade!)
└── .gitignore
```

### API Endpoints (Provided)
```
GET    /api/interviews
GET    /api/interviews/:id
POST   /api/interviews
GET    /api/candidates
GET    /api/candidates/:id
POST   /api/candidates
PATCH  /api/candidates/:id
POST   /api/candidates/bulk
GET    /api/interview-templates
POST   /api/interview-templates
GET    /api/analytics
```

### Mock Data
Use the complete mock API server code from `docs/requirements/technical-task-requirements.md` lines 137-475.

## Development Workflow

### Task Execution Order
1. **Setup & Configuration** (1 hour)
   - Create public GitHub repository via gh CLI
   - Initialize Next.js with TypeScript
   - Configure Tailwind with brand colors
   - Install shadcn/ui
   - Setup mock API server
   - Configure Biome

2. **Interview Features** (2 hours)
   - Interview List with TanStack Table
   - Interview Detail with Recharts
   - Document Claude usage immediately

3. **Analytics Dashboard** (1 hour)
   - Metrics cards
   - Charts with Recharts
   - Document Claude usage

4. **Candidate Management** (2 hours)
   - CRUD operations
   - CSV upload with validation
   - Document Claude usage

5. **Template Builder** (1.5 hours)
   - Dynamic form management
   - Question management
   - Document Claude usage

6. **Polish & Deploy** (0.5 hour)
   - Tests for critical paths
   - Deploy to Vercel
   - Finalize documentation

### Critical Workflow Rules
1. **ALWAYS update CLAUDE_CODE.md after each Claude interaction**
2. Ask for user approval before saving major code changes
3. Test feature before marking task complete
4. Commit after each completed feature with descriptive message
5. Use TypeScript strict mode
6. Include loading states and error handling
7. Ensure responsive design

## Documentation Requirements (CRITICAL - 30% of grade)

### CLAUDE_CODE.md Must Include:
1. **Setup & Scaffolding** - Initial prompts and results
2. **Component Development** - Prompts for each component
3. **Debugging & Problem Solving** - Errors and solutions
4. **Testing** - Test generation prompts
5. **Iteration Examples** - Refinements needed
6. **Critical Review** - Code you had to fix
7. **What Worked Well** - Effective strategies
8. **What Didn't Work** - Claude limitations

**Format**: Include exact prompts, Claude's response, your modifications, and time saved.

### Git Requirements
- Minimum 5 meaningful commits
- Show work progression
- Conventional commit format (feat:, fix:, etc.)

## Quality Checklist

### Before Each Feature Commit
- [ ] Feature works as specified
- [ ] TypeScript has no errors
- [ ] Component has loading/error states
- [ ] Responsive on mobile
- [ ] Updated CLAUDE_CODE.md

### Before Final Submission
- [ ] All 5 main features working
- [ ] Tests written for critical paths (60% coverage)
- [ ] CLAUDE_CODE.md comprehensive
- [ ] Repository structure matches requirements
- [ ] Deployed to Vercel (bonus)

## Evaluation Criteria
1. **Claude Code Usage & Documentation** (30%)
2. **Functionality** (30%)
3. **Code Quality** (20%)
4. **UI/UX** (10%)
5. **Testing & Process** (10%)

## Important Notes
- This is a Claude Code proficiency test - use it heavily and document everything
- Don't implement authentication (mock it)
- Don't create real database (use mock API)
- Focus on functionality over perfection
- Use KeySingularity branding throughout
- Reference original requirements document for complete details and starter code