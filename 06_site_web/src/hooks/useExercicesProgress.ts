'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';

export function useExercicesProgress() {
  const [completed, setCompleted] = useLocalStorage<string[]>(STORAGE_KEYS.EXERCICES_PROGRESS, []);

  const markComplete = useCallback(
    (id: string) => {
      setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setCompleted]
  );

  const isComplete = useCallback((id: string) => completed.includes(id), [completed]);

  return { completed, markComplete, isComplete };
}
