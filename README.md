# AI Proof

An interactive developer skill assessment that evaluates how resilient your engineering capabilities are against generative AI automation.

**Live Demo:** [aiproof-sage.vercel.app](https://aiproof-sage.vercel.app)

---

## Why AI Proof?

Large language models and AI coding assistants excel at syntax completion, boilerplate generation, and routine CRUD functions. However, they consistently struggle with:
- Distributed systems architecture and trade-off decisions.
- Complex state synchronization and race conditions.
- Real-world debugging across ambiguous production environments.
- Business domain modeling and requirements translation.

**AI Proof** puts developers through realistic architectural scenarios to measure high-leverage engineering intuition versus easily automatable syntax knowledge.

---

## Key Features

- **Interactive Scenario Assessments:** Real-world problem scenarios testing design decisions, concurrency handling, and debugging depth rather than trivia.
- **Dynamic Skill Scoring:** Analyzes responses to deliver an individualized breakdown across architectural reasoning, system intuition, and automation vulnerability.
- **Fluid Multi-Step Flow:** Step-by-step questionnaire transitions and micro-interactions built with **Framer Motion**.
- **MDX-Driven Content Pipeline:** Question sets and technical explanations authored in MDX using `@next/mdx`, allowing structured rich text alongside interactive UI components.
- **Responsive Dark/Light UI:** Clean typography and layout designed for quick mobile or desktop completion.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Animation** | Framer Motion |
| **Content** | MDX (`@next/mdx`, `@mdx-js/react`) |
| **Styling** | Vanilla CSS / Modular CSS |
| **Deployment** | Vercel |

---

## Project Structure
ai-proof/ ├── src/ │ ├── app/ # Next.js App Router routes & layouts │ ├── components/ # UI components (Quiz cards, score displays, animations) │ └── content/ # MDX questions, scoring rubrics, and explanations ├── public/ # Static assets & icons ├── next.config.ts # Next.js & MDX configuration ├── tsconfig.json # Strict TypeScript configuration └── package.json


---

## Getting Started

### Prerequisites
- **Node.js** >= 18
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmad-zayab/AI-proof.git
   cd AI-proof
