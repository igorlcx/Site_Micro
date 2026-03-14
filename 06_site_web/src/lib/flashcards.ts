import { shuffle } from './utils';
import type { Flashcard, FlashcardProgress } from '@/types';

export const FLASHCARD_CHAPITRES = [
  { id: 'all',         label: '🎲 Salade (tous chapitres)' },
  { id: 'chapitre_01', label: 'Ch.1 — Négociation' },
  { id: 'chapitre_02', label: 'Ch.2 — A-compétition' },
  { id: 'chapitre_03', label: 'Ch.3 — V-compétition' },
  { id: 'chapitre_04', label: 'Ch.4 — Concurrence imparfaite' },
  { id: 'chapitre_05', label: 'Ch.5 — Préférences' },
  { id: 'chapitre_06', label: 'Ch.6 — Échange' },
  { id: 'chapitre_07', label: 'Ch.7 — Optimum de Pareto' },
  { id: 'chapitre_08', label: 'Ch.8 — Méthodes transversales' },
];

export function getSessionCards(
  allCards: Flashcard[],
  progress: FlashcardProgress,
  chapitreId: string,
  count = 20
): Flashcard[] {
  const pool = chapitreId === 'all' ? allCards : allCards.filter((f) => f.chapitre_id === chapitreId);
  const mastered   = pool.filter((f) => progress.mastered.includes(f.id));
  const struggling = pool.filter((f) => progress.struggling.includes(f.id));
  const unseen     = pool.filter((f) => !progress.seen.includes(f.id));
  const nUnseen     = Math.min(unseen.length,     Math.floor(count * 0.5));
  const nStruggling = Math.min(struggling.length, Math.floor(count * 0.3));
  const nMastered   = Math.min(mastered.length,   Math.floor(count * 0.2));
  const selected = shuffle([
    ...shuffle(unseen).slice(0, nUnseen),
    ...shuffle(struggling).slice(0, nStruggling),
    ...shuffle(mastered).slice(0, nMastered),
  ]);
  if (selected.length < count) {
    const usedIds = new Set(selected.map((f) => f.id));
    const extra = shuffle(pool.filter((f) => !usedIds.has(f.id))).slice(0, count - selected.length);
    return shuffle([...selected, ...extra]).slice(0, count);
  }
  return shuffle(selected).slice(0, count);
}
