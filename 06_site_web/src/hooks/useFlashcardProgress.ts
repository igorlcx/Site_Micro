'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { FlashcardProgress } from '@/types';

const DEFAULT_PROGRESS: FlashcardProgress = { mastered: [], struggling: [], seen: [] };

export function useFlashcardProgress() {
  const [progress, setProgress] = useLocalStorage<FlashcardProgress>(
    STORAGE_KEYS.FLASHCARD_PROGRESS,
    DEFAULT_PROGRESS
  );

  const markMastered = useCallback((id: string) => {
    setProgress((prev) => ({
      mastered: prev.mastered.includes(id) ? prev.mastered : [...prev.mastered, id],
      struggling: prev.struggling.filter((x) => x !== id),
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const markStruggling = useCallback((id: string) => {
    setProgress((prev) => ({
      mastered: prev.mastered.filter((x) => x !== id),
      struggling: prev.struggling.includes(id) ? prev.struggling : [...prev.struggling, id],
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const markSeen = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const resetProgress = useCallback(() => setProgress(DEFAULT_PROGRESS), [setProgress]);

  return { progress, markMastered, markStruggling, markSeen, resetProgress };
}
