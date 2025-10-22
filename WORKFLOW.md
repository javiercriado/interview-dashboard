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

Copy and paste this prompt when starting a new task or session:

```
I'm working on the AI Interview Dashboard technical assessment. We need to follow the workflow defined in WORKFLOW.md.

CRITICAL INSTRUCTIONS:
1. Create a TodoWrite with these workflow steps:
   - Check next task (task-master next)
   - Develop feature with Claude
   - Get review before saving (show code first)
   - Document in CLAUDE_CODE.md
   - Save code after approval
   - Validate implementation
   - Run tests (if needed)
   - Get final approval
   - Run quality checks (lint, build)
   - Update Task Master
   - Update DEVELOPMENT.md summary
   - Commit changes
   - Loop (clear context, next task)

2. Use `task-master next` to identify the next task (or continue in_progress task)
3. ALWAYS show code before saving and wait for approval
4. Update CLAUDE_CODE.md throughout development
5. Reference CLAUDE.md for tech stack and patterns
6. Reference docs/requirements/technical-task-requirements.md for detailed requirements
7. Reference docs/requirements/PRD.md for feature specifications

Let's start by checking the next task with task-master.
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
- Ask Claude for implementation
- Reference PRD for exact requirements
- **Document prompt in CLAUDE_CODE.md immediately**

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
- Document fixes in CLAUDE_CODE.md

### Step 9: Update Task Master
```bash
task-master set-status --id=<id> --status=completed
```

### Step 10: Update DEVELOPMENT.md
**Before commit**: Summarize progress in DEVELOPMENT.md
- Update development approach section
- Add time spent on this feature
- Note key decisions made
- Summarize Claude Code effectiveness

### Step 11: Commit
```bash
git add .
git commit -m "feat: [feature name]"
```
- Use conventional commit format

### Step 12: Loop
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
- [ ] Code committed
- [ ] Task marked completed

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