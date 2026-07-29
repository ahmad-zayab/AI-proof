import { Category, Question } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'systemDesign',
    name: 'System Design',
    description: 'Ability to architect scalable and resilient software systems.',
    weight: 0.20,
  },
  {
    id: 'fundamentals',
    name: 'Computer Science Fundamentals',
    description: 'Deep understanding of algorithms, data structures, and how things work under the hood.',
    weight: 0.15,
  },
  {
    id: 'aiOrchestration',
    name: 'AI Orchestration',
    description: 'Effectively utilizing and integrating AI tools into development workflows.',
    weight: 0.15,
  },
  {
    id: 'debugging',
    name: 'Advanced Debugging',
    description: 'Troubleshooting complex, non-obvious issues across the stack.',
    weight: 0.15,
  },
  {
    id: 'architecture',
    name: 'Software Architecture',
    description: 'Making high-level design choices and defining technical standards.',
    weight: 0.15,
  },
  {
    id: 'communication',
    name: 'Communication & Soft Skills',
    description: 'Translating technical requirements to stakeholders and collaborating with teams.',
    weight: 0.10,
  },
  {
    id: 'domainExpertise',
    name: 'Business Domain Expertise',
    description: 'Understanding the specific business logic, constraints, and user needs of your industry.',
    weight: 0.10,
  },
];

export const EXPERIENCE_LEVELS = [
  "Junior (0-2 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (6-9 yrs)",
  "Staff/Principal (10+ yrs)"
];

export const PRIMARY_ROLES = [
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps/SRE",
  "Mobile",
  "Data/ML",
  "Other"
];

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    categoryId: 'systemDesign',
    text: "Your team is tasked with building a real-time collaborative document editor (like Google Docs). How do you approach the initial design?",
    answers: [
      {
        id: 'q1a1',
        text: "I'd ask an AI to generate the architecture and copy the system design it provides.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q1a2',
        text: "I'd use WebSockets for real-time syncing and rely on standard database transactions.",
        scoreMap: { systemDesign: 25, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q1a3',
        text: "I'd evaluate Operational Transformation (OT) versus CRDTs based on our latency requirements and team expertise.",
        scoreMap: { systemDesign: 100, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q1a4',
        text: "I'd look for an open-source library that does this and implement it without worrying about the underlying algorithms.",
        scoreMap: { systemDesign: 50, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q2',
    categoryId: 'fundamentals',
    text: "A critical production API is experiencing a sudden latency spike. What is your immediate troubleshooting step?",
    answers: [
      {
        id: 'q2a1',
        text: "Look at the APM metrics (Datadog/NewRelic) to identify if the bottleneck is in the DB, cache, or application layer.",
        scoreMap: { systemDesign: 0, fundamentals: 100, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q2a2',
        text: "Paste the error logs into ChatGPT and ask it what is wrong.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q2a3',
        text: "Restart the servers to see if clearing the memory fixes the issue.",
        scoreMap: { systemDesign: 0, fundamentals: 25, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q2a4',
        text: "Add more instances to the auto-scaling group to handle the load.",
        scoreMap: { systemDesign: 0, fundamentals: 50, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q3',
    categoryId: 'aiOrchestration',
    text: "Your team's AI coding assistant generates a PR that adds caching to a heavily used endpoint, but the code looks overly complex. What do you do?",
    answers: [
      {
        id: 'q3a1',
        text: "Approve it immediately. AI usually writes optimized code.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q3a2',
        text: "Reject it. I don't trust AI to handle caching logic.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 25, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q3a3',
        text: "Review the logic to ensure it avoids cache stampedes and race conditions, asking the AI to simplify it if needed.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 100, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q3a4',
        text: "Rewrite the entire caching layer from scratch myself.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 50, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q4',
    categoryId: 'debugging',
    text: "A user reports a bug that only happens on Safari on iOS when they are on a cellular network. How do you fix it?",
    answers: [
      {
        id: 'q4a1',
        text: "Ignore it since it's an edge case and affects a small percentage of users.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q4a2',
        text: "Set up a Safari remote debugging session with a throttled network connection to reproduce the exact conditions.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 100, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q4a3',
        text: "Ask Copilot why Safari behaves differently on cellular networks.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 25, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q4a4',
        text: "Add a generic error boundary and apologize to the user.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 50, architecture: 0, communication: 0, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q5',
    categoryId: 'architecture',
    text: "The business wants to migrate from a monolith to microservices to 'speed up development'. What is your response?",
    answers: [
      {
        id: 'q5a1',
        text: "Agree enthusiastically and start splitting the codebase immediately.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 25, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q5a2',
        text: "Explain that microservices add operational complexity and we should first ensure our monolith is properly modularized.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 100, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q5a3',
        text: "Ask an AI tool to generate a microservices transition plan.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q5a4',
        text: "Refuse, stating that monoliths are always better for our team size.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 50, communication: 0, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q6',
    categoryId: 'communication',
    text: "The product manager requests a feature that is technically feasible but will incur massive technical debt. How do you handle it?",
    answers: [
      {
        id: 'q6a1',
        text: "Build it exactly as requested to keep the PM happy.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q6a2',
        text: "Refuse to build it until they give you time to do it perfectly.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 25, domainExpertise: 0 }
      },
      {
        id: 'q6a3',
        text: "Explain the trade-offs in business terms (e.g., future slowdowns) and propose a compromise solution.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 100, domainExpertise: 0 }
      },
      {
        id: 'q6a4',
        text: "Complain to other engineers but build it anyway.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 50, domainExpertise: 0 }
      }
    ]
  },
  {
    id: 'q7',
    categoryId: 'domainExpertise',
    text: "You are building a financial application. How do you handle floating-point arithmetic for currency calculations?",
    answers: [
      {
        id: 'q7a1',
        text: "Just use standard floats/doubles, it's close enough for most calculations.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 0 }
      },
      {
        id: 'q7a2',
        text: "Ask an AI to write a rounding function.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 25 }
      },
      {
        id: 'q7a3',
        text: "Store currency as integers (e.g., cents) or use a dedicated decimal/money library to avoid precision errors.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 100 }
      },
      {
        id: 'q7a4',
        text: "Use standard floats but round everything to 2 decimal places at the end of calculations.",
        scoreMap: { systemDesign: 0, fundamentals: 0, aiOrchestration: 0, debugging: 0, architecture: 0, communication: 0, domainExpertise: 50 }
      }
    ]
  }
];
