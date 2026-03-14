import { NIVEAUX } from './constants';
import type { Niveau } from '@/types';

export function getNiveauForXP(xp: number): Niveau {
  let current = NIVEAUX[0];
  for (const n of NIVEAUX) {
    if (xp >= n.xp_requis) current = n;
  }
  return current;
}

export function getNextNiveau(currentNiveau: number): Niveau | null {
  return NIVEAUX.find((n) => n.niveau === currentNiveau + 1) ?? null;
}

export function getXPProgress(xp: number): { current: number; next: number; pct: number } {
  const current = getNiveauForXP(xp);
  const next = getNextNiveau(current.niveau);
  if (!next) return { current: xp, next: xp, pct: 100 };
  const range = next.xp_requis - current.xp_requis;
  const progress = xp - current.xp_requis;
  return { current: progress, next: range, pct: Math.min(100, Math.round((progress / range) * 100)) };
}
