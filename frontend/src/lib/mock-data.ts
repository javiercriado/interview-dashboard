// Shared mock data for API routes
import type { Interview, Candidate, InterviewTemplate } from './types';

export let interviews: Interview[] = [
  {
    id: '1',
    candidateId: 'c1',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.j@email.com',
    jobPosition: 'Senior Software Engineer',
    completedAt: '2025-10-10T14:30:00Z',
    duration: 1847,
    status: 'completed',
    score: 85,
    recommendation: 'hire',
    competencies: {
      'Technical Skills': 90,
      'Problem Solving': 85,
      Communication: 80,
      'Cultural Fit': 85,
    },
    summary:
      'Strong technical candidate with excellent problem-solving skills. Demonstrated deep knowledge of system design and algorithms. Communication was clear and concise.',
    transcript:
      'AI: Tell me about your experience with distributed systems...\nCandidate: I have worked extensively with microservices...',
    audioUrl: '/audio/interview-1.mp3',
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
      Leadership: 75,
    },
    summary:
      'Decent product sense but lacks senior-level strategic thinking. Would benefit from more experience in larger organizations.',
    transcript:
      'AI: Describe a time you had to make a difficult product decision...\nCandidate: At my previous company...',
    audioUrl: '/audio/interview-2.mp3',
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
      Communication: 88,
      'Cultural Fit': 92,
    },
    summary:
      'Exceptional candidate. Deep technical expertise, excellent communication, strong culture fit. Highly recommended for hire.',
    transcript:
      'AI: Walk me through how you would design a URL shortener...\nCandidate: I would start by considering the scale...',
    audioUrl: '/audio/interview-3.mp3',
  },
  {
    id: '4',
    candidateId: 'c4',
    candidateName: 'Javier Criado',
    candidateEmail: 'javiercriado2@email.com',
    jobPosition: 'Senior Frontend Engineer',
    completedAt: '2025-10-23T15:22:00Z',
    duration: 1654,
    status: 'completed',
    score: 99,
    recommendation: 'strong_hire',
    competencies: {
      'Technical Skills': 99,
      'Problem Solving': 99,
      Communication: 99,
      'Cultural Fit': 99,
    },
    summary:
      'Exceptional candidate. Deep technical expertise, excellent communication, strong culture fit. Highly recommended for hire.',
    transcript:
      'AI: Walk me through how you would design a URL shortener...\nCandidate: I would start by considering the scale...',
    audioUrl: '/audio/interview-3.mp3',
  },
];

export let candidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0101',
    appliedFor: 'Senior Software Engineer',
    status: 'interviewed',
    invitedAt: '2025-10-09T09:00:00Z',
    interviewedAt: '2025-10-10T14:30:00Z',
    source: 'LinkedIn',
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1-555-0102',
    appliedFor: 'Senior Frontend Engineer',
    status: 'invited',
    invitedAt: '2025-22-08T10:00:00Z',
    interviewedAt: '2025-10-09T10:15:00Z',
    source: 'Job Board',
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
    source: 'Referral',
  },
  {
    id: 'c4',
    name: 'Javier Criado',
    email: 'javiercriado2@email.com',
    phone: '+51-926-128-494',
    appliedFor: 'Senior Frontend Engineer',
    status: 'hired',
    invitedAt: '2025-10-21T12:00:00Z',
    interviewedAt: '2025-10-23T15:15:00Z',
    source: 'Job Board',
  },
  {
    id: 'c5',
    name: 'Lisa Wang',
    email: 'lwang@email.com',
    phone: '+1-555-0105',
    appliedFor: 'Senior Software Engineer',
    status: 'pending',
    source: 'Company Website',
  },
];

export let interviewTemplates: InterviewTemplate[] = [
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
        followUps: ['What challenges did you face?', 'How did you solve them?'],
      },
      {
        id: 'q2',
        text: 'Describe a time you had to make a technical trade-off.',
        competency: 'Problem Solving',
        followUps: ['What factors did you consider?'],
      },
      {
        id: 'q3',
        text: 'How do you approach code reviews?',
        competency: 'Communication',
        followUps: ['Give an example of feedback you provided.'],
      },
    ],
    competencies: ['Technical Skills', 'Problem Solving', 'Communication', 'Cultural Fit'],
    createdAt: '2025-09-01T10:00:00Z',
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
        followUps: ['How do you prioritize features?'],
      },
      {
        id: 'q2',
        text: 'Tell me about a time you had to influence without authority.',
        competency: 'Stakeholder Management',
        followUps: ['What was the outcome?'],
      },
    ],
    competencies: ['Product Strategy', 'Stakeholder Management', 'Data Analysis', 'Leadership'],
    createdAt: '2025-09-01T10:00:00Z',
  },
];
