'use client';

import { useState, useEffect } from 'react';

export function useAssessmentTimer(initialSeconds: number, onTimeExpired: () => void) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining, onTimeExpired]);

  return {
    secondsRemaining,
    isUrgent: secondsRemaining <= 10 && secondsRemaining > 0,
    pause: () => setIsRunning(false),
    resume: () => setIsRunning(true),
    reset: (newSeconds: number) => {
      setSecondsRemaining(newSeconds);
      setIsRunning(true);
    },
  };
}
