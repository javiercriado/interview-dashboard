// frontend/src/lib/types.ts
export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobPosition: string;
  completedAt: string;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  score: number;
  recommendation: 'hire' | 'strong_hire' | 'maybe' | 'no_hire';
  competencies: Record<string, number>;
  summary: string;
  transcript: string;
  audioUrl: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  appliedFor: string;
  status: 'pending' | 'invited' | 'interviewed' | 'rejected' | 'hired';
  invitedAt?: string;
  interviewedAt?: string;
  source: string;
  createdAt?: string;
  interviews?: Interview[];
}

export interface Question {
  id: string;
  text: string;
  competency: string;
  followUps: string[];
}

export interface InterviewTemplate {
  id: string;
  name: string;
  jobPosition: string;
  duration: number;
  questions: Question[];
  competencies: string[];
  createdAt: string;
}

export interface Analytics {
  total: number;
  completed: number;
  avgScore: number;
  funnel: {
    invited: number;
    started: number;
    completed: number;
  };
  byPosition: Record<string, number>;
  recommendations: {
    hire: number;
    maybe: number;
    no_hire: number;
  };
}

export interface InterviewFilters {
  status?: string;
  jobPosition?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: 'score' | 'date';
}

export interface CandidateFilters {
  status?: string;
  jobPosition?: string;
  search?: string;
}
