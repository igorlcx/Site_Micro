/**
 * @file flashcards/page.tsx
 * @description Flashcard chapter selector
 */
'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { FLASHCARD_CHAPITRES } from '@/lib/flashcards';
import { Skeleton } from '@/components/ui/skeleton';
import type { Flashcard } from '@/types';
import { Layers } from 'lucide-react';

export default function FlashcardsPage() {
  const router = useRouter();
  const { data: cards } = useDataLoader<Flashcard[]>('flashcards.json');
  const { progress } = useFlashcardProgress();

  function getChapterStats(chapitreId: string) {
    const pool = chapitreId === 'all' ? (cards ?? []) : (cards ?? []).filter(c => c.chapitre_id === chapitreId);
    const mastered = pool.filter(c => progress.mastered.includes(c.id)).length;
    return { total: pool.length, mastered };
  }

  function handleSelect(chapitreId: string) {
    sessionStorage.setItem('flashcard_chapitre', chapitreId);
    router.push('/flashcards/session');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-6 max-w-[1200px] mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--accent-purple)' }}>
          <Layers size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Flashcards</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>200 cartes — 8 chapitres</p>
        </div>
      </div>

      {!cards ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FLASHCARD_CHAPITRES.map(ch => {
            const stats = getChapterStats(ch.id);
            const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
            return (
              <motion.div
                key={ch.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(ch.id)}
                className="rounded-xl border p-5 cursor-pointer transition-all"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  {ch.label}
                </h3>
                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  {stats.mastered} / {stats.total} maîtrisées
                </p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: 'var(--accent-purple)' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
