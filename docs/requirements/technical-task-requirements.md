# AI INTERVIEW DASHBOARD - TECHNICAL ASSIGNMENT
## Build Admin Dashboard for Voice AI Interviewing Platform

**Time Estimate:** 6-8 hours
**Due:** Submit within 72 hours of receipt

---

## 🎯 THE SCENARIO

You're joining a team that has built a **voice-enabled AI interviewing agent**. The AI conducts interviews, but we need dashboards for clients to:
- Track completed interviews
- View reports and candidate dispositions
- Create new interview flows
- Manage candidates

The backend APIs are ready, but the admin dashboard is missing. Your job is to build it.

---

## ⚠️ IMPORTANT: THIS IS A CLAUDE CODE TEST

**We are specifically testing your ability to work WITH AI coding assistants.**

This assignment evaluates:
- ✅ **How effectively you use Claude Code** (or similar AI tools)
- ✅ **Your prompting skills** - Can you get Claude to help you efficiently?
- ✅ **Your AI collaboration workflow** - How do you partner with AI?
- ✅ **Your code review skills** - Can you catch AI mistakes?
- ✅ **Your documentation** - Can you explain what Claude helped with?

**WE EXPECT AND ENCOURAGE HEAVY CLAUDE CODE USAGE!**

This is NOT about coding without AI. This is about:
- Using Claude Code to scaffold components
- Using Claude Code to debug issues
- Using Claude Code to write tests
- Using Claude Code to understand APIs
- **Documenting everything Claude helped you with**

**The CLAUDE_CODE.md documentation is just as important as your actual code.**

---

## 📋 WHAT YOU'RE BUILDING

### Dashboard Features Required

**1. Interview Tracking Dashboard**
- List of all completed interviews
- Filter by: date range, job position, status, candidate
- Search by candidate name or email
- Sort by: completion date, score, status
- Visual metrics: total interviews, completion rate, average score
- Export to CSV

**2. Interview Report View**
- Detailed interview transcript/summary
- AI-generated candidate assessment
- Scoring breakdown by competency
- Recommendations (hire/no-hire/maybe)
- Audio playback controls (simulated)
- Interviewer notes section

**3. Candidate Management**
- List all candidates
- View candidate profile with interview history
- Add new candidates manually
- Bulk upload candidates (CSV)
- Candidate disposition workflow (pending → interviewed → hired/rejected)
- Email invitation system (simulated)

**4. Interview Flow Builder**
- Create new interview templates
- Define questions for each job role
- Set evaluation criteria/competencies
- Configure interview duration and structure
- Duplicate existing templates
- Preview interview flow

**5. Client Analytics Dashboard**
- Interview completion funnel (invited → started → completed)
- Time-to-completion metrics
- Top performing candidates
- Hiring pipeline status
- Interview quality scores
- Charts/graphs for key metrics

---

## 🔧 TECHNICAL REQUIREMENTS

### Frontend
**Stack:** Your choice, but must use:
- **React/Vue/Svelte** + TypeScript
- **Chart library** for analytics (Chart.js, Recharts, D3, etc.)
- **Table library** for data grids (TanStack Table, AG-Grid, or custom)
- **Routing** (React Router, Vue Router, etc.)
- **State management** (Context, Redux, Zustand, Pinia, etc.)

**UI/UX:**
- Responsive design (mobile-friendly)
- Loading states for async operations
- Error handling with user-friendly messages
- Empty states when no data
- Professional, clean design (Tailwind/Material-UI/shadcn acceptable)

### Backend/API (Provided)
You'll work with a **simulated REST API** (see starter code below).
In a real scenario, you'd integrate with our actual API.

**Key Endpoints:**
```
GET    /api/interviews                    # List all interviews
GET    /api/interviews/:id                # Get interview details
POST   /api/interviews                    # Create new interview
GET    /api/candidates                    # List candidates
GET    /api/candidates/:id                # Get candidate details
POST   /api/candidates                    # Add candidate
PATCH  /api/candidates/:id                # Update candidate
POST   /api/candidates/bulk               # Bulk upload
GET    /api/interview-templates           # List templates
POST   /api/interview-templates           # Create template
GET    /api/analytics                     # Get analytics data
```

### Data Management
- Handle loading states properly
- Implement optimistic updates where appropriate
- Cache data to reduce API calls
- Handle errors gracefully

---

## 📦 STARTER CODE & DATA

### Mock API Server (Node.js/Express)

Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Data
let interviews = [
  {
    id: '1',
    candidateId: 'c1',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.j@email.com',
    jobPosition: 'Senior Software Engineer',
    completedAt: '2025-10-10T14:30:00Z',
    duration: 1847, // seconds
    status: 'completed',
    score: 85,
    recommendation: 'hire',
    competencies: {
      'Technical Skills': 90,
      'Problem Solving': 85,
      'Communication': 80,
      'Cultural Fit': 85
    },
    summary: 'Strong technical candidate with excellent problem-solving skills. Demonstrated deep knowledge of system design and algorithms. Communication was clear and concise.',
    transcript: 'AI: Tell me about your experience with distributed systems...\nCandidate: I have worked extensively with microservices...',
    audioUrl: '/audio/interview-1.mp3'
  },
  {
    id: '2',
    candidateId: 'c2',
    candidateName: 'Michael Chen',
    candidateEmail: 'mchen@email.com',
    jobPosition: 'Product Manager',
    completedAt: '2025-10-09T10:15:00Z',
    duration: 2134,
    status: 'completed',
    score: 72,
    recommendation: 'maybe',
    competencies: {
      'Product Strategy': 75,
      'Stakeholder Management': 70,
      'Data Analysis': 68,
      'Leadership': 75
    },
    summary: 'Decent product sense but lacks senior-level strategic thinking. Would benefit from more experience in larger organizations.',
    transcript: 'AI: Describe a time you had to make a difficult product decision...\nCandidate: At my previous company...',
    audioUrl: '/audio/interview-2.mp3'
  },
  {
    id: '3',
    candidateId: 'c3',
    candidateName: 'Emily Rodriguez',
    candidateEmail: 'emily.r@email.com',
    jobPosition: 'Senior Software Engineer',
    completedAt: '2025-10-08T16:45:00Z',
    duration: 1654,
    status: 'completed',
    score: 92,
    recommendation: 'strong_hire',
    competencies: {
      'Technical Skills': 95,
      'Problem Solving': 92,
      'Communication': 88,
      'Cultural Fit': 92
    },
    summary: 'Exceptional candidate. Deep technical expertise, excellent communication, strong culture fit. Highly recommended for hire.',
    transcript: 'AI: Walk me through how you would design a URL shortener...\nCandidate: I would start by considering the scale...',
    audioUrl: '/audio/interview-3.mp3'
  }
];

let candidates = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0101',
    appliedFor: 'Senior Software Engineer',
    status: 'interviewed',
    invitedAt: '2025-10-09T09:00:00Z',
    interviewedAt: '2025-10-10T14:30:00Z',
    source: 'LinkedIn'
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1-555-0102',
    appliedFor: 'Product Manager',
    status: 'interviewed',
    invitedAt: '2025-10-08T10:00:00Z',
    interviewedAt: '2025-10-09T10:15:00Z',
    source: 'Job Board'
  },
  {
    id: 'c3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1-555-0103',
    appliedFor: 'Senior Software Engineer',
    status: 'interviewed',
    invitedAt: '2025-10-07T14:00:00Z',
    interviewedAt: '2025-10-08T16:45:00Z',
    source: 'Referral'
  },
  {
    id: 'c4',
    name: 'David Kim',
    email: 'dkim@email.com',
    phone: '+1-555-0104',
    appliedFor: 'Data Scientist',
    status: 'invited',
    invitedAt: '2025-10-10T08:00:00Z',
    source: 'LinkedIn'
  },
  {
    id: 'c5',
    name: 'Lisa Wang',
    email: 'lwang@email.com',
    phone: '+1-555-0105',
    appliedFor: 'Senior Software Engineer',
    status: 'pending',
    source: 'Company Website'
  }
];

let interviewTemplates = [
  {
    id: 't1',
    name: 'Senior Software Engineer Interview',
    jobPosition: 'Senior Software Engineer',
    duration: 30,
    questions: [
      {
        id: 'q1',
        text: 'Tell me about your experience with distributed systems.',
        competency: 'Technical Skills',
        followUps: ['What challenges did you face?', 'How did you solve them?']
      },
      {
        id: 'q2',
        text: 'Describe a time you had to make a technical trade-off.',
        competency: 'Problem Solving',
        followUps: ['What factors did you consider?']
      },
      {
        id: 'q3',
        text: 'How do you approach code reviews?',
        competency: 'Communication',
        followUps: ['Give an example of feedback you provided.']
      }
    ],
    competencies: ['Technical Skills', 'Problem Solving', 'Communication', 'Cultural Fit'],
    createdAt: '2025-09-01T10:00:00Z'
  },
  {
    id: 't2',
    name: 'Product Manager Interview',
    jobPosition: 'Product Manager',
    duration: 30,
    questions: [
      {
        id: 'q1',
        text: 'Describe your product development process.',
        competency: 'Product Strategy',
        followUps: ['How do you prioritize features?']
      },
      {
        id: 'q2',
        text: 'Tell me about a time you had to influence without authority.',
        competency: 'Stakeholder Management',
        followUps: ['What was the outcome?']
      }
    ],
    competencies: ['Product Strategy', 'Stakeholder Management', 'Data Analysis', 'Leadership'],
    createdAt: '2025-09-01T10:00:00Z'
  }
];

// Routes
app.get('/api/interviews', (req, res) => {
  const { status, jobPosition, startDate, endDate, search, sortBy } = req.query;

  let filtered = [...interviews];

  if (status) filtered = filtered.filter(i => i.status === status);
  if (jobPosition) filtered = filtered.filter(i => i.jobPosition === jobPosition);
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(i =>
      i.candidateName.toLowerCase().includes(term) ||
      i.candidateEmail.toLowerCase().includes(term)
    );
  }

  if (sortBy === 'score') filtered.sort((a, b) => b.score - a.score);
  if (sortBy === 'date') filtered.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  res.json(filtered);
});

app.get('/api/interviews/:id', (req, res) => {
  const interview = interviews.find(i => i.id === req.params.id);
  if (!interview) return res.status(404).json({ error: 'Interview not found' });
  res.json(interview);
});

app.post('/api/interviews', (req, res) => {
  const newInterview = {
    id: String(interviews.length + 1),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'scheduled'
  };
  interviews.push(newInterview);
  res.status(201).json(newInterview);
});

app.get('/api/candidates', (req, res) => {
  const { status, jobPosition, search } = req.query;

  let filtered = [...candidates];

  if (status) filtered = filtered.filter(c => c.status === status);
  if (jobPosition) filtered = filtered.filter(c => c.appliedFor === jobPosition);
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

app.get('/api/candidates/:id', (req, res) => {
  const candidate = candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

  const candidateInterviews = interviews.filter(i => i.candidateId === req.params.id);
  res.json({ ...candidate, interviews: candidateInterviews });
});

app.post('/api/candidates', (req, res) => {
  const newCandidate = {
    id: `c${candidates.length + 1}`,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

app.patch('/api/candidates/:id', (req, res) => {
  const index = candidates.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Candidate not found' });

  candidates[index] = { ...candidates[index], ...req.body };
  res.json(candidates[index]);
});

app.post('/api/candidates/bulk', (req, res) => {
  const { candidates: newCandidates } = req.body;
  const created = newCandidates.map((c, i) => ({
    id: `c${candidates.length + i + 1}`,
    ...c,
    status: 'pending',
    createdAt: new Date().toISOString()
  }));
  candidates.push(...created);
  res.status(201).json({ created: created.length, candidates: created });
});

app.get('/api/interview-templates', (req, res) => {
  res.json(interviewTemplates);
});

app.get('/api/interview-templates/:id', (req, res) => {
  const template = interviewTemplates.find(t => t.id === req.params.id);
  if (!template) return res.status(404).json({ error: 'Template not found' });
  res.json(template);
});

app.post('/api/interview-templates', (req, res) => {
  const newTemplate = {
    id: `t${interviewTemplates.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  interviewTemplates.push(newTemplate);
  res.status(201).json(newTemplate);
});

app.get('/api/analytics', (req, res) => {
  const total = interviews.length;
  const completed = interviews.filter(i => i.status === 'completed').length;
  const avgScore = interviews.reduce((sum, i) => sum + i.score, 0) / total;

  const funnel = {
    invited: candidates.length,
    started: interviews.length,
    completed: completed
  };

  const byPosition = {};
  interviews.forEach(i => {
    if (!byPosition[i.jobPosition]) byPosition[i.jobPosition] = 0;
    byPosition[i.jobPosition]++;
  });

  res.json({
    total,
    completed,
    avgScore,
    funnel,
    byPosition,
    recommendations: {
      hire: interviews.filter(i => i.recommendation === 'hire' || i.recommendation === 'strong_hire').length,
      maybe: interviews.filter(i => i.recommendation === 'maybe').length,
      no_hire: interviews.filter(i => i.recommendation === 'no_hire').length
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
```

### package.json for API server
```json
{
  "name": "interview-api-mock",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
```

---

## 📋 REQUIRED DELIVERABLES

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

---

## 🎨 DESIGN REQUIREMENTS

**Layout:**
- Sidebar navigation (Dashboard, Interviews, Candidates, Templates, Analytics)
- Header with user info (mock) and notifications
- Breadcrumbs for navigation context
- Responsive breakpoints (mobile, tablet, desktop)

**Components to Build:**
- Data table with sorting/filtering
- Charts (line, bar, pie)
- Form inputs with validation
- Modal dialogs
- Loading skeletons
- Empty states
- Error boundaries

**User Experience:**
- Smooth transitions
- Intuitive navigation
- Clear CTAs
- Helpful error messages
- Success confirmations
- Loading indicators

---

## 🧪 TESTING & QUALITY

**Testing Requirements:**
- Unit tests for key components (min 60% coverage)
- Integration tests for critical flows
- Test data table filtering/sorting
- Test form validation
- Test API error handling

**Code Quality:**
- TypeScript strict mode
- ESLint configured
- Component organization
- Reusable utilities
- Clean prop drilling / state management
- Meaningful variable names

**Performance:**
- Lazy load routes
- Debounce search inputs
- Memoize expensive computations
- Optimize re-renders

---

## 📤 SUBMISSION REQUIREMENTS

### ⚠️ IMPORTANT: GIT REPOSITORY REQUIRED

**You MUST submit via a Git repository (GitHub, GitLab, or Bitbucket).**

- ❌ NO ZIP files
- ❌ NO email attachments of code
- ❌ NO Google Drive/Dropbox links to code
- ✅ YES Git repository with commit history

**Why?** We want to see your development progression through commit history. This shows how you work, not just the final result.

### 1. Git Repository Setup

**Before you start coding:**

```bash
mkdir interview-dashboard
cd interview-dashboard
git init
git add .
git commit -m "Initial commit: project setup"

# Create repository on GitHub/GitLab/Bitbucket
# git remote add origin [your-repo-url]
# git push -u origin main
```

**Required Repository Structure:**
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
├── CLAUDE_CODE.md         # AI usage documentation
└── .gitignore             # Ignore node_modules, etc.
```

**Commit Requirements:**
- Minimum 5 meaningful commits (not all at the end!)
- Commit messages should be descriptive
- Show progression of work (e.g., "feat: add interview list", "fix: resolve filter bug")
- Commit as you complete each feature

**Example Good Commit History:**
```
git log --oneline
a1b2c3d docs: add README and setup instructions
d4e5f6g test: add tests for candidate management
g7h8i9j feat: implement interview template builder
j1k2l3m feat: add bulk CSV upload for candidates
m4n5o6p feat: create analytics dashboard
p7q8r9s feat: add interview detail view with charts
s1t2u3v feat: implement interview list with filtering
v4w5x6y chore: initial project setup
```

### 2. Documentation

**README.md** must include:
- Project overview
- Setup instructions (how to run API + frontend)
- Tech stack used
- Features implemented
- Known limitations
- Future improvements

**DEVELOPMENT.md** must include:
- Your development approach
- How you used Claude Code (be specific!)
- Challenges you faced and solutions
- Design decisions and trade-offs
- Time breakdown by phase
- What you'd do differently with more time

**CLAUDE_CODE.md** - Dedicated to AI workflow (⭐ 30% of your grade):

This is the MOST IMPORTANT document. We want to see:

**Required Sections:**

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

**Example Format:**
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

**What we want to see:**
✅ Actual prompts you used (copy-paste them!)
✅ Claude's responses (show the code it generated)
✅ Your modifications and why
✅ Honest reflection on what worked/didn't work
✅ Evidence of iteration and learning

**What NOT to do:**
❌ "I used Claude for components" (too vague)
❌ "Claude helped a lot" (no specifics)
❌ Claiming you did everything yourself (defeats the purpose)

### 3. How to Submit Your Repository

**Step 1: Push to Git Hosting**

Create a repository on GitHub, GitLab, or Bitbucket and push your code:

```bash
# On GitHub/GitLab/Bitbucket, create a new repository
# Then connect and push:
git remote add origin [your-repo-url]
git push -u origin main
```

**Step 2: Grant Access**

Choose one:
- **Option A:** Make repository public
- **Option B:** Add interviewer as collaborator
  - GitHub: Settings → Collaborators → Add people
  - GitLab: Settings → Members → Invite member
  - Provide interviewer's username in submission email

**Step 3: Email Submission**

Send email to [interviewer-email] with:

```
Subject: Submission - AI Interview Dashboard Assignment

Hi [Interviewer Name],

I've completed the AI Interview Dashboard assignment.

Repository: [your-repo-url]
Access: [Public / Added you as collaborator]

Setup instructions:
1. Clone the repository
2. cd interview-dashboard
3. Run API: cd api && npm install && npm start
4. Run Frontend: cd frontend && npm install && npm run dev
5. Open http://localhost:5173

Time spent: [X hours]

Key features implemented:
- Interview tracking with filtering/search
- Analytics dashboard with charts
- Candidate management with bulk upload
- Interview template builder
- [Any other highlights]

Test coverage: [X%]
Commits: [X commits]

Optional - Live demo: [URL if you deployed it]

Thanks!
[Your Name]
```

### 4. Optional Bonus Items

**Deployment (Bonus Points):**
- Deploy to Vercel/Netlify/Railway
- Provide live URL
- Document deployment steps in README

**Demo Video (Bonus Points):**
- 3-5 minute Loom/screen recording
- Walk through key features
- Explain one technical decision
- Include link in submission email

**Extra Features (Bonus Points):**
- Additional charts or visualizations
- Advanced filtering (date ranges, multi-select)
- Export to PDF functionality
- Real-time updates (WebSockets)
- Accessibility improvements (ARIA labels, keyboard navigation)

---

## 🎯 EVALUATION CRITERIA

### 1. Claude Code Usage & Documentation (30%) ⭐ PRIMARY FOCUS
- ✅ **CLAUDE_CODE.md is comprehensive and detailed**
- ✅ Shows effective prompting strategies
- ✅ Documents what Claude helped build vs. what you coded
- ✅ Explains when Claude was helpful vs. not helpful
- ✅ Shows you can review/debug AI-generated code
- ✅ Demonstrates iterative collaboration with Claude
- ✅ Includes specific examples of prompts used
- ✅ Shows learning and adaptation in your AI workflow

**What we want to see:**
- "I asked Claude to scaffold the interview list component with this prompt: '...'"
- "Claude generated code that had a bug in the filter logic, here's how I fixed it..."
- "I used Claude to help debug this error by asking: '...'"
- "Claude's first attempt didn't work because..., so I refined my prompt to..."

### 2. Functionality (30%)
- ✅ All required features working
- ✅ Filters and search work correctly
- ✅ Forms validate properly
- ✅ API integration correct
- ✅ Charts display accurate data
- ✅ Navigation flows smoothly

### 3. Code Quality (20%)
- ✅ Clean, readable code (AI-generated or not)
- ✅ Good component structure
- ✅ Proper TypeScript usage
- ✅ Reusable utilities
- ✅ Error handling
- ✅ Loading states

### 4. UI/UX (10%)
- ✅ Professional appearance
- ✅ Intuitive navigation
- ✅ Responsive design
- ✅ Good visual hierarchy
- ✅ Consistent styling

### 5. Testing & Process Documentation (10%)
- ✅ Tests exist and pass
- ✅ DEVELOPMENT.md shows your thinking
- ✅ Git commits show progression
- ✅ README has clear setup

**Note:** We care MORE about how you used Claude Code than perfect code. A candidate who documents excellent AI collaboration with decent code beats perfect code with no AI documentation.

---

## 💡 TIPS FOR SUCCESS

**1. Document Your Claude Code Usage AS YOU GO** ⭐ MOST IMPORTANT
- Keep CLAUDE_CODE.md open and add notes after each Claude interaction
- Copy-paste prompts you used and Claude's responses
- Note what worked and what didn't
- This documentation is 30% of your grade - don't save it for the end!

**2. Use Claude Code Aggressively:**
- **Start here:** "Claude, help me set up a React TypeScript project with routing for these 5 pages..."
- **For components:** "Create a filterable table component for interviews with these fields..."
- **For debugging:** "This filter isn't working, here's my code: [paste code]"
- **For tests:** "Write tests for this InterviewList component"
- **For charts:** "Help me create a radar chart showing competency scores using Recharts"
- Don't be shy - use Claude for everything, just document it!

**3. Iterate With Claude:**
- If Claude's first attempt doesn't work, refine your prompt
- Ask Claude to explain code it generated
- Ask Claude to review your code
- Show Claude error messages and ask for help
- Document this iteration process!

**4. Show Your Thinking:**
- When Claude generates buggy code, document how you fixed it
- When Claude's approach was wrong, explain what you did instead
- Show where you had to override or correct Claude
- This demonstrates you're not just copy-pasting blindly

**5. Time Management:**
- Hour 1-2: Core dashboard (use Claude heavily!)
- Hour 3-4: Charts and analytics (Claude is great at this)
- Hour 5-6: Candidate management
- Hour 7: Template builder
- Hour 8: Polish, testing, and DOCUMENT your Claude usage

**6. What We Want to See:**
- ✅ Heavy Claude Code usage with detailed documentation
- ✅ Evidence you can review/debug AI code
- ✅ Iterative refinement of prompts
- ✅ Honest about what Claude helped with
- ❌ Perfect code with no AI documentation
- ❌ Claiming you did everything yourself

---

## ❓ COMMON QUESTIONS

**Q: Can I use a component library?**
A: Yes! Material-UI, Ant Design, shadcn/ui, etc. are all fine. Focus on functionality.

**Q: Do I need authentication?**
A: No, just mock a logged-in user. Focus on dashboard features.

**Q: What if I don't finish everything?**
A: Document what's incomplete and how you'd finish it. Prioritize core features.

**Q: Can I modify the API?**
A: Yes, but document any changes you make and why.

**Q: Should I use real charts or can I use a library?**
A: Definitely use a library (Chart.js, Recharts, etc.). Don't reinvent the wheel.

**Q: How important is mobile responsiveness?**
A: Important. At minimum, it should be usable on tablet. Desktop-first is fine.

---

## 🚀 GETTING STARTED

1. **Clone/download starter code**
2. **Set up API server:**
   ```bash
   cd api
   npm install
   npm start
   ```
3. **Set up frontend:**
   ```bash
   npx create-react-app frontend --template typescript
   # or
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   ```
4. **Start building!**
5. **Commit frequently with meaningful messages**

---

## 📧 QUESTIONS & SUPPORT

If you have questions:
- Email: [your-email@company.com]
- Response time: 4-6 hours during business hours

We want to see how you think and work. Don't hesitate to ask for clarification!

---

## ✅ SUBMISSION CHECKLIST

Before submitting, verify:

**Code & Functionality:**
- [ ] All 5 main features work (Interviews, Analytics, Candidates, Bulk Upload, Templates)
- [ ] Responsive design implemented
- [ ] Tests written and passing
- [ ] Code is clean and well-organized
- [ ] API server included and works
- [ ] No console.log statements left in production code

**Documentation:**
- [ ] README.md complete with setup instructions
- [ ] DEVELOPMENT.md documents your process and decisions
- [ ] CLAUDE_CODE.md shows how you used AI assistance
- [ ] Known issues/limitations documented

**Git Repository (REQUIRED):**
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public OR interviewer added as collaborator
- [ ] .gitignore includes node_modules/, .env, etc.
- [ ] Minimum 5 meaningful commits
- [ ] Commit messages are descriptive
- [ ] Git history shows work progression (not one big commit at the end)

**Submission Email:**
- [ ] Includes repository URL
- [ ] Mentions how to grant access (public or collaborator)
- [ ] Provides setup instructions
- [ ] States time spent
- [ ] Highlights key features implemented

---

**Good luck! We're excited to see your dashboard and learn about your development process with Claude Code.**

---

*This assignment mirrors real work you'd do on our team. We value thoughtful solutions over speed.*
  