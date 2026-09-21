import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { QuestionCard } from '../src/components/assessment/QuestionCard';
import { AssessmentQuestion } from '../src/types/assessment';

describe('QuestionCard Component', () => {
  const sampleQuestion: AssessmentQuestion = {
    id: 'sample-1',
    category: 'NODE',
    difficulty: 'MID',
    question: 'How does Node.js handle asynchronous non-blocking I/O?',
    options: ['Event Loop & Libuv', 'Multi-threaded kernel threads', 'Apache workers', 'Direct memory polling'],
    correctIndex: 0,
    explanation: 'Node.js delegates non-blocking I/O operations through Libuv event loop.',
    timeLimitSeconds: 60,
  };

  it('renders question text and all 4 options accurately', () => {
    render(<QuestionCard question={sampleQuestion} selectedIndex={null} onSelectOption={() => {}} />);
    expect(screen.getByText(/How does Node.js handle asynchronous/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Loop & Libuv/i)).toBeInTheDocument();
  });

  it('invokes onSelectOption callback when clicking an unselected option', () => {
    const handleSelect = vi.fn();
    render(<QuestionCard question={sampleQuestion} selectedIndex={null} onSelectOption={handleSelect} />);
    fireEvent.click(screen.getByText(/Event Loop & Libuv/i));
    expect(handleSelect).toHaveBeenCalledWith(0);
  });
});
