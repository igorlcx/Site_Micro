import { RECOMPENSES } from './constants';
import { shuffle } from './utils';
import type { Question } from '@/types';

export const QCM_CHAPITRES = [
  { id: 'all',         label: 'Tous les chapitres' },
  { id: 'chapitre_01', label: 'Ch.1 — Négociation' },
  { id: 'chapitre_02', label: 'Ch.2 — A-compétition' },
  { id: 'chapitre_03', label: 'Ch.3 — V-compétition' },
  { id: 'chapitre_04', label: 'Ch.4 — Concurrence imparfaite' },
  { id: 'chapitre_05', label: 'Ch.5 — Préférences' },
  { id: 'chapitre_06', label: 'Ch.6 — Échange' },
  { id: 'chapitre_07', label: 'Ch.7 — Optimum de Pareto' },
  { id: 'methodes',    label: 'Méthodes générales' },
];

export function generateQCMSession(
  allQuestions: Question[],
  chapitreFilter?: string,
  targetCount = 15
): Question[] {
  const pool =
    chapitreFilter && chapitreFilter !== 'all'
      ? allQuestions.filter((q) => q.chapitre_id === chapitreFilter)
      : allQuestions;
  if (pool.length === 0) return [];
  const faciles    = shuffle(pool.filter((q) => q.difficulte === 'facile')).slice(0, 5);
  const moyens     = shuffle(pool.filter((q) => q.difficulte === 'moyen')).slice(0, 7);
  const difficiles = shuffle(pool.filter((q) => q.difficulte === 'difficile')).slice(0, 3);
  const selected = [...faciles, ...moyens, ...difficiles];
  if (selected.length < targetCount) {
    const usedIds = new Set(selected.map((q) => q.id));
    const remaining = shuffle(pool.filter((q) => !usedIds.has(q.id))).slice(0, targetCount - selected.length);
    return shuffle([...selected, ...remaining]);
  }
  return shuffle(selected).slice(0, targetCount);
}

export function calculateQCMReward(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 0.93) return RECOMPENSES.QCM_PARFAIT;
  if (pct >= 0.80) return RECOMPENSES.QCM_EXCELLENT;
  if (pct >= 0.60) return RECOMPENSES.QCM_BON;
  if (pct >= 0.40) return RECOMPENSES.QCM_MOYEN;
  return RECOMPENSES.QCM_TENTE;
}
