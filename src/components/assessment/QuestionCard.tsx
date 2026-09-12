'use client';

import React from 'react';
import { AssessmentQuestion } from '../../types/assessment';

interface QuestionCardProps {
  question: AssessmentQuestion;
  selectedIndex: number | null;
  onSelectOption: (idx: number) => void;
  isLocked?: boolean;
}

export function QuestionCard({ question, selectedIndex, onSelectOption, isLocked }: QuestionCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
          {question.category}
        </span>
        <span className="text-xs text-slate-400 font-mono">
          {question.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              disabled={isLocked}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 rounded-lg text-sm font-medium transition-all border ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md'
                  : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span className="inline-block w-6 font-mono text-slate-400">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
