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
