'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface GoldCounterProps {
  pieces: number;
}

export function GoldCounter({ pieces }: GoldCounterProps) {
  const spring = useSpring(pieces, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    spring.set(pieces);
  }, [pieces, spring]);

  return (
    <div className="flex items-center gap-1.5">
      <span>🪙</span>
      <motion.span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--accent-gold)' }}>
        {display}
      </motion.span>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
        pièces
      </span>
    </div>
  );
}
