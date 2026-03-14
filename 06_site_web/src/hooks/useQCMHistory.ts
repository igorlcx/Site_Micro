'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { QCMSession } from '@/types';

export function useQCMHistory() {
  const [history, setHistory] = useLocalStorage<QCMSession[]>(STORAGE_KEYS.QCM_HISTORY, []);

  const addSession = useCallback(
    (session: QCMSession) => {
      setHistory((prev) => [...prev.slice(-49), session]);
    },
    [setHistory]
  );

  const getAvgScore = useCallback(
    (last = 5): number => {
      const recent = history.slice(-last);
      if (recent.length === 0) return 0;
      const scores = recent.map((s) => Math.round((s.score / s.total) * 100));
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    },
    [history]
  );

  return { history, addSession, getAvgScore };
}
