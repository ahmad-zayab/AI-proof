'use client';

import { useEffect, useState } from 'react';

export function useAntiCheat(maxViolations = 3, onDisqualify?: () => void) {
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          if (next >= maxViolations && onDisqualify) {
            onDisqualify();
          }
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [maxViolations, onDisqualify]);

  return { tabSwitchCount, isWarning: tabSwitchCount > 0 };
}
