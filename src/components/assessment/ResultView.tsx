'use client';

import React from 'react';
import { AssessmentResult } from '../../types/assessment';

export function ResultView({ result, onRetake }: { result: AssessmentResult; onRetake: () => void }) {
  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
      <div className={`inline-flex items-center justify-center h-20 w-20 rounded-full mb-6 ${
        result.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
      }`}>
        <span className="text-2xl font-bold">{result.accuracyPercentage}%</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-2">
        {result.passed ? 'Assessment Passed!' : 'Assessment Incomplete'}
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        You scored {result.score} out of {result.totalQuestions} questions correctly.
      </p>

      <div className="grid grid-cols-2 gap-4 text-left mb-8">
        {Object.entries(result.categoryBreakdown).map(([cat, data]) => {
          if (data.total === 0) return null;
          const pct = Math.round((data.correct / data.total) * 100);
          return (
            <div key={cat} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block mb-1">{cat}</span>
              <span className="text-lg font-bold text-slate-200">{pct}%</span>
              <span className="text-xs text-slate-500 block">({data.correct}/{data.total})</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetake}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
      >
        Take Another Assessment
      </button>
    </div>
  );
}
