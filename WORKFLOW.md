# Development Workflow - AI Interview Dashboard

## Overview
Simplified workflow for 6-8 hour technical assessment with heavy emphasis on AI documentation.

**Original Requirements**: See `docs/requirements/technical-task-requirements.md` for complete specifications and evaluation criteria.

## Critical Rules
1. **Document EVERY significant Claude interaction in CLAUDE_CODE.md**
2. **Get approval BEFORE saving code**
3. **Commit after each completed feature**
4. **Create TodoWrite at session start with all workflow steps**
5. **Run quality checks (lint, build) after approval**

---

## Session Start Prompt Template

Copy and paste this when starting a new session:

```
I'm working on the AI Interview Dashboard.

1. Check next/in-progress task: task-master next
2. Confirm you've read WORKFLOW.md
3. Show TodoWrite with all workflow steps (1-13) for my approval
4. Then proceed with the task

Let's start!
```

---

## Workflow Steps (Per Task)

### Step 0: Session Preparation
**MANDATORY**: Create TodoWrite with all workflow steps
```bash
# Check for next or in-progress task
task-master next
# or if resuming
task-master list | grep in_progress
```

### Step 1: Start Task
```bash
# Set task to in_progress
task-master set-status --id=<id> --status=in_progress
```

### Step 2: Develop with Claude
- **Check Dependencies First**: Review `docs/requirements/PRD.md` (lines 14-23) for required tech stack
  - Install dependencies ONLY if needed for current feature
  - Example: TanStack Table for interview list, React Hook Form for candidate forms
  - Claude will ask if new dependencies should be documented
- Ask Claude for implementation
- Reference PRD for exact requirements

### Step 3: Review Before Save ⚠️
**CRITICAL**: Show generated code to user BEFORE saving
```
Here's the implementation I've created:
[show code]

Should I proceed to save this code?
```
- Wait for user approval
- Make any requested changes

### Step 4: Save Code
**Only after approval in Step 3**
- Save the approved implementation

### Step 5: Validate Implementation
```bash
# Check if it runs without errors
npm run dev  # Verify no compilation errors
```
- Show any issues found
- Fix if needed

### Step 6: Testing (Optional)
**Only if tests exist or critical feature**
```bash
npm run test  # If applicable
```

### Step 7: Get Final Approval
Ask user: "Implementation is working. Should I proceed with quality checks?"

### Step 8: Quality Checks
**After approval**
```bash
npm run lint        # Biome linting
npm run type-check  # TypeScript
npm run build       # Build check
```
- Fix any issues found

### Step 9: Documentation Check
- Claude will ask if interaction is significant enough to document in CLAUDE_CODE_LOG.md
**Before commit only**: Claude will ask "Ready to update CLAUDE_CODE.md summary?"
- Review significant interactions from this task
- Update appropriate sections (1-8) in CLAUDE_CODE.md
- Quick summary, not detailed verbatim

### Step 10: Update Task Master
```bash
task-master set-status --id=<id> --status=completed
```

### Step 11: Update DEVELOPMENT.md
**Before commit only**: Summarize progress in DEVELOPMENT.md
- Update development approach section
- Add time spent on this feature
- Note key decisions made
- Summarize Claude Code effectiveness

### Step 12: Commit and Push to GitHub
```bash
# Stage all changes
git add .

# Create commit with conventional format
git commit -m "feat: [feature name]"

# Push to GitHub
git push
```

**Commit Message Format:**
- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`
- Include detailed description with key changes
- Add Claude Code attribution footer:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Important:** Always push to GitHub after committing to keep remote in sync

### Step 13: Loop
```
Please copy the session start prompt and use /clear to reset context.
Then paste the prompt to continue with the next task.
```

---

## Documentation Requirements

### For each feature in CLAUDE_CODE.md:

```markdown
## [Feature Name]

**Context**: [What you're building]
**Task ID**: [From task-master]

**Prompt**:
```
[Exact prompt to Claude]
```

**Claude's Response**:
[Key code or solution provided]

**Review Notes**:
- [User feedback before save]

**Issues Found**:
- [Any problems during validation]

**My Fixes**:
- [What you changed]

**Result**: ✅ Working
**Time Saved**: ~X minutes
**Effectiveness**: X/10
```

---

## Key Reference Files

**Required Reading:**
- `WORKFLOW.md` (this file) - Step-by-step development process
- `CLAUDE.md` - Tech stack, patterns, brand colors, project context
- `docs/requirements/PRD.md` - Feature specifications and requirements
- `docs/requirements/technical-task-requirements.md` - Evaluation criteria (30% is documentation!)

**Documentation:**
- `CLAUDE_CODE_LOG.md` - Chronological log (append as you go)
- `CLAUDE_CODE.md` - 8-section organized summary (update before commits)
- `DEVELOPMENT.md` - Process summary (update before commits)

**Task Management:**
- `.taskmaster/tasks/tasks.json` - Task database
- `task-master next` - Get next available task
- `task-master show <id>` - View task details

---

## Quick Reference Commands

```bash
# Task Master
task-master next
task-master list
task-master set-status --id=<id> --status=in_progress
task-master set-status --id=<id> --status=completed

# Development
cd api && npm start  # Start mock API (port 3001)
cd frontend && npm run dev  # Start Next.js

# Quality Checks
npm run lint        # Biome linting
npm run type-check  # TypeScript check
npm run build       # Production build
npm run test        # Run tests (if any)

# Git
git add .
git commit -m "feat: description"
git push
git status
git log --oneline

# GitHub (for initial setup)
gh repo create interview-dashboard --public
git remote add origin [url]
git push -u origin main
```

---

## Time Allocation

| Hour | Focus | Key Deliverables |
|------|-------|-----------------|
| 1 | Setup + API | GitHub repo, Next.js, Mock API |
| 2-3 | Interview List & Detail | Filtering, sorting, charts |
| 4 | Analytics Dashboard | Metrics, visualizations |
| 5-6 | Candidate Management | CRUD, CSV upload |
| 7 | Template Builder | Dynamic forms |
| 8 | Polish + Deploy | Tests, Vercel deployment |

---

## Commit Strategy

Use conventional commits showing progression:
```bash
chore: initial project setup with Next.js and Tailwind
chore: add mock API server
feat: implement interview list with filtering and sorting
feat: add interview detail view with competency charts
feat: create analytics dashboard with metrics
feat: implement candidate management CRUD
feat: add CSV bulk upload with validation
feat: create interview template builder
test: add tests for critical features
docs: finalize documentation
chore: deploy to Vercel
```

---

## Quality Gates

### Before Moving to Next Task
- [ ] Feature works as specified in PRD
- [ ] User approved implementation
- [ ] CLAUDE_CODE.md updated
- [ ] Quality checks passed (lint, type-check, build)
- [ ] DEVELOPMENT.md summary updated
- [ ] Code committed with conventional format
- [ ] Code pushed to GitHub remote
- [ ] Task marked completed in Task Master

### Before Final Submission
- [ ] All features functional per requirements
- [ ] CLAUDE_CODE.md complete with 8+ examples
- [ ] 5+ meaningful commits minimum
- [ ] README.md with setup instructions
- [ ] DEVELOPMENT.md with process documentation
- [ ] Deployed to Vercel (bonus)

---

## Important Reminders

⚠️ **Documentation is 30% of your grade!**
- Document AS YOU GO, not at the end
- Include actual prompts and responses
- Show iterations and learning
- Be honest about what didn't work

🎯 **Focus Areas**:
1. Functionality over perfection
2. Clear documentation of AI usage
3. KeySingularity branding (#facc15 yellow, #0D121C dark)
4. Clean git history showing progression

⏱️ **Time Management**:
- 6-8 hours total
- Don't over-engineer
- Skip authentication (mock it)
- Use Context API (not Zustand)
- Selective testing only

📚 **Reference Documents**:
- `CLAUDE.md` - Tech stack and patterns
- `docs/requirements/technical-task-requirements.md` - Complete original requirements
- `docs/requirements/PRD.md` - Combined feature specifications
- `CLAUDE_CODE.md` - Document all AI interactions here
- `WORKFLOW.md` - This file, the process to follow