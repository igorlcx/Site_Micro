'use client';
import { NIVEAUX } from '@/lib/constants';

interface XPBarProps {
  xp: number;
  niveau: number;
  xpProchain: number;
}

export function XPBar({ xp, niveau, xpProchain }: XPBarProps) {
  const currentNiveau = NIVEAUX.find((n) => n.niveau === niveau) ?? NIVEAUX[0];
  const prevXP = currentNiveau.xp_requis;
  const range = xpProchain - prevXP;
  const progress = range > 0 ? Math.min(100, Math.round(((xp - prevXP) / range) * 100)) : 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {currentNiveau.emoji} {currentNiveau.titre}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {xp} XP
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--bg-card)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))',
          }}
        />
      </div>
    </div>
  );
}
