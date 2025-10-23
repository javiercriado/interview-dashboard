# AI Interview Dashboard

A comprehensive admin dashboard for managing AI-powered voice interviews, built as a technical assessment for DaCodes (Key Singularity).

## 📋 Project Overview

This full-stack application provides a complete interview management system with analytics, candidate tracking, and customizable interview templates. The dashboard features a modern, dark-themed UI with KeySingularity branding and comprehensive data visualization.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd interview-dashboard

# Install dependencies and start Next.js (includes API routes)
npm install
npm run dev
```

### Access the Application

- **Live Demo**: https://interview-dashboard-buni.vercel.app/ 🚀
- **Local Development**: http://localhost:3000

### API Implementation

This project supports **two backend options**:

**Option 1: Next.js API Routes (Default)** ⭐
- Built-in serverless functions in `frontend/src/app/api/`
- No separate server needed
- Works seamlessly on Vercel deployment
- Runs at http://localhost:3000/api/*

**Option 2: Express Mock Server (Optional)**
- Standalone Express.js server in `api/`
- Runs on port 3001
- Useful for testing separate backend scenarios
- Runs at http://localhost:3001/api/*

Both use the same mock data structure. To switch between them, set the `NEXT_PUBLIC_API_URL` environment variable.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with KeySingularity branding
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Data Tables**: TanStack Table v8
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **State Management**: Context API
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library

### Backend
- **API**: Next.js API Routes (serverless functions)
- **Data**: In-memory mock data (shared across API routes)

### Development Tools
- **Linting/Formatting**: Biome
- **Type Checking**: TypeScript (strict mode)
- **Task Management**: Task Master AI
- **AI Collaboration**: Claude Code

## ✨ Features Implemented

### 1. Interview Management
- ✅ Interview list with advanced filtering
  - Date range picker
  - Position dropdown filter
  - Status filter (scheduled/completed/cancelled)
  - Real-time search
- ✅ Sortable columns (candidate, position, date, score, status)
- ✅ Interview detail view
  - Full interview information
  - Competency breakdown chart (Recharts)
  - Transcript display
  - Audio player UI
  - Notes textarea with save functionality
  - Navigation back to list

### 2. Analytics Dashboard
- ✅ Key metrics cards
  - Total interviews
  - Completion rate
  - Average score
- ✅ Visualizations
  - Funnel chart (invited → started → completed)
  - Position breakdown (bar chart)
  - Recommendation distribution (pie chart)
- ✅ Recent interviews list

### 3. Candidate Management
- ✅ Candidate list with filtering
  - Status filter
  - Position filter
  - Search functionality
- ✅ Add/Edit candidate forms
  - Full validation (Zod schemas)
  - Error handling
  - Success notifications
- ✅ Candidate detail view
  - Profile information
  - Interview history
  - Status update workflow
  - Send invite (simulated)
- ✅ Bulk CSV upload
  - File upload with preview
  - Data validation
  - Import results display

### 4. Interview Template Builder
- ✅ Template list view
  - Create new template
  - Duplicate existing template
  - Delete template
- ✅ Template builder form
  - Dynamic question management
  - Competency assignment
  - Follow-up questions
  - Drag-and-drop reordering
  - Duration settings
  - Preview mode

### 5. UI/UX Features
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark theme with KeySingularity colors (#facc15 yellow, #0D121C dark)
- ✅ Sidebar navigation
- ✅ Breadcrumbs
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Error boundaries
- ✅ Toast notifications
- ✅ Smooth transitions
- ✅ Form validation feedback

## 🧪 Testing

```bash
# Run tests (from root or frontend directory)
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode (from frontend directory only)
cd frontend && npm run test:ui
```

**Test Coverage**: 29 tests covering:
- Schema validation (15 tests)
- Component rendering (10 tests)
- Integration tests (4 tests)

## 📁 Project Structure

```
interview-dashboard/
├── api/                          # Express mock server (optional)
│   ├── server.js                 # Express server with endpoints
│   └── package.json
├── frontend/                     # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/              # Next.js API routes (serverless) ⭐
│   │   │   │   ├── interviews/   # Interview endpoints
│   │   │   │   ├── candidates/   # Candidate endpoints
│   │   │   │   ├── interview-templates/  # Template endpoints
│   │   │   │   └── analytics/    # Analytics endpoint
│   │   │   ├── page.tsx          # Dashboard/Analytics
│   │   │   ├── interviews/       # Interview pages
│   │   │   ├── candidates/       # Candidate pages
│   │   │   └── templates/        # Template pages
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── layout/           # Layout components
│   │   │   ├── interviews/       # Interview components
│   │   │   ├── candidates/       # Candidate components
│   │   │   └── templates/        # Template components
│   │   ├── lib/
│   │   │   ├── api.ts            # API client functions
│   │   │   ├── types.ts          # TypeScript types
│   │   │   ├── schemas.ts        # Zod validation schemas
│   │   │   ├── mock-data.ts      # Shared mock data for API routes
│   │   │   └── hooks/            # TanStack Query hooks
│   │   └── test/                 # Test utilities
│   ├── public/                   # Static assets
│   └── package.json
├── docs/                         # Documentation
│   ├── requirements/             # Original requirements
│   └── references/               # Reference docs
├── README.md                     # This file
├── CLAUDE_CODE.md                # AI collaboration documentation (30% of grade)
├── CLAUDE_CODE_LOG.md            # Chronological log of some interactions
├── DEVELOPMENT.md                # Development process documentation
└── package.json                  # Root package for scripts
```

## 🎨 Design System

### Colors (KeySingularity Brand)
- **Primary**: `#facc15` (Yellow accent)
- **Background**: `#0D121C` (Dark background)
- **Foreground**: `#f8fafc` (Light text)
- **Muted**: `#1e293b` (Muted elements)
- **Border**: `#334155` (Borders)

### Typography
- **Headers**: IBM Plex Mono
- **Body**: Open Sans

## 📊 Scripts Reference

### Root Level (Recommended)
```bash
npm run dev           # Start Next.js dev server (uses built-in API routes) ⭐
npm test              # Run all tests
npm run test:coverage # Run tests with coverage report
npm run lint          # Run Biome linter
npm run type-check    # TypeScript type checking
npm run build         # Production build
```

### Frontend Only
```bash
cd frontend
npm run dev           # Start development server (port 3000)
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run Biome linter
npm run lint:fix      # Fix linting issues
npm run type-check    # TypeScript type checking
npm test              # Run tests
npm run test:coverage # Run tests with coverage
npm run test:ui       # Run tests with UI
```

### Express API (Optional)
```bash
cd api
npm install           # Install Express API dependencies
npm start             # Start Express server (port 3001)

# To use Express API instead of Next.js routes:
# In frontend directory, create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

## ⚠️ Known Limitations

1. **Authentication**: No real authentication implemented (mocked user state)
2. **Data Persistence**: In-memory storage only (data resets on server restart)
3. **Audio Playback**: UI only, no actual audio playback functionality
4. **File Upload**: CSV parsing implemented, but file validation is basic
5. **Real-time Updates**: No WebSocket support (uses polling via TanStack Query)
6. **Mobile Optimization**: Responsive but optimized primarily for desktop/tablet
7. **Browser Support**: Tested primarily on modern Chrome/Firefox

## 🚀 Future Improvements

### Short Term
1. **Real Database Integration**
   - PostgreSQL/MongoDB for persistent storage
   - Prisma ORM for type-safe database queries

2. **Authentication & Authorization**
   - NextAuth.js integration
   - Role-based access control (Admin, Interviewer, HR)
   - Secure session management

3. **Enhanced Testing**
   - Increase coverage to 80%+
   - E2E tests with Playwright
   - Visual regression testing

### Long Term
4. **Real-time Features**
   - WebSocket integration for live updates
   - Real-time interview status notifications
   - Collaborative template editing

5. **Advanced Analytics**
   - ML-based candidate scoring predictions
   - Interview outcome trends
   - Competency gap analysis
   - Export to PDF/Excel

6. **Interview Features**
   - Actual audio recording/playback
   - Video interview support
   - Live transcription
   - Sentiment analysis

7. **Performance Optimizations**
   - Server-side pagination
   - Virtual scrolling for large lists
   - Image optimization
   - Code splitting improvements

8. **Internationalization**
   - Multi-language support
   - Timezone handling
   - Localized date/time formats

## 🤖 AI Collaboration Documentation

**⚠️ IMPORTANT**: AI collaboration documentation represents **30% of the project grade** per assignment requirements.

### Primary Documentation
- **`CLAUDE_CODE.md`** - **Required for grading** (30% weight)
  - 8 required sections documenting AI usage
  - Prompts, iterations, and critical review
  - What worked well and what didn't
  - Demonstrates thoughtful AI collaboration

### Supporting Documentation
- **`CLAUDE_CODE_LOG.md`** - Chronological log of some AI interactions
- **`DEVELOPMENT.md`** - Development process, decisions, and time breakdown

### Time Investment
**Total Time**: ~12.4 hours (exceeds 6-8 hour estimate due to comprehensive documentation and quality standards)
- Planning & Setup: 3.5 hours
- Feature Implementation: 7.4 hours
- Testing & Documentation: 1.5 hours

**Key Insight**: Heavy upfront planning (Task Master AI + complexity analysis) enabled systematic execution and comprehensive documentation throughout development.

## 📝 Development Notes

- **Git History**: Check commit history for progression through features
- **Task Management**: Used Task Master AI for systematic task breakdown and execution
- **Quality Standards**: All code passes lint, type-check, build, and test requirements

## 🤝 Contributing

This is a technical assessment project. For questions or feedback, please contact the developer.

## 📄 License

This project was created as a technical assessment for DaCodes.

---

**Built with Claude Code** | **Developer**: Javier Criado | **Company**: DaCodes (Key Singularity)
