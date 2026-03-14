/**
 * @file qcm/page.tsx
 * @description QCM configuration page - choose chapter and difficulty
 * @dependencies useDataLoader, QCM_CHAPITRES
 */
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { QCM_CHAPITRES } from '@/lib/qcm';
import { DIFFICULTE_STYLES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import type { Question } from '@/types';
import { HelpCircle, Play } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function QCMPage() {
  const router = useRouter();
  const { data: questions, loading } = useDataLoader<Question[]>('qcm.json');
  const [selectedChapitre, setSelectedChapitre] = useState('all');
  const [selectedDifficulte, setSelectedDifficulte] = useState<'all' | 'facile' | 'moyen' | 'difficile'>('all');

  const filteredCount = questions
    ? questions.filter(q =>
        (selectedChapitre === 'all' || q.chapitre_id === selectedChapitre) &&
        (selectedDifficulte === 'all' || q.difficulte === selectedDifficulte)
      ).length
    : 0;

  function handleStart() {
    sessionStorage.setItem('qcm_config', JSON.stringify({ chapitre: selectedChapitre, difficulte: selectedDifficulte }));
    router.push('/qcm/session');
  }

  if (loading) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.15)', color: 'var(--accent-orange)' }}>
          <HelpCircle size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>QCM de révision</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>170 questions disponibles</p>
        </div>
      </div>

      <div className="rounded-xl border p-6 space-y-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
        {/* Chapter selector */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
            Chapitre
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {QCM_CHAPITRES.map(ch => (
              <motion.button
                key={ch.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedChapitre(ch.id)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all"
                style={{
                  background: selectedChapitre === ch.id ? 'rgba(249,115,22,0.15)' : 'var(--bg-secondary)',
                  borderColor: selectedChapitre === ch.id ? 'var(--accent-orange)' : 'var(--border-subtle)',
                  color: selectedChapitre === ch.id ? 'var(--accent-orange)' : 'var(--text-secondary)',
                }}
              >
                {ch.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulty selector */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
            Difficulté
          </label>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'facile', 'moyen', 'difficile'] as const).map(d => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedDifficulte(d)}
                className="px-4 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={
                  selectedDifficulte === d
                    ? { background: 'rgba(249,115,22,0.15)', borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)' }
                    : { background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }
                }
              >
                {d === 'all' ? 'Toutes' : DIFFICULTE_STYLES[d].label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info + Start */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {filteredCount} question{filteredCount !== 1 ? 's' : ''} disponible{filteredCount !== 1 ? 's' : ''}
            {' '}→ session de 15 max
          </span>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            disabled={filteredCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'var(--accent-orange)', color: 'white' }}
          >
            <Play size={16} />
            Commencer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
