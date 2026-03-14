/**
 * @file exercices/page.tsx
 * @description Exercise list with chapter and difficulty filtering
 * @dependencies useDataLoader, usePlayerData, DIFFICULTE_STYLES, CHAPITRE_LABELS, framer-motion
 */
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { usePlayerData } from '@/hooks/usePlayerData';
import { DIFFICULTE_STYLES, CHAPITRE_LABELS } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import type { Exercice } from '@/types';
import { Dumbbell, Clock, CheckCircle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

type DifficulteFilter = 'all' | 'facile' | 'moyen' | 'difficile';

const CHAPITRE_IDS = Object.keys(CHAPITRE_LABELS);

export default function ExercicesPage() {
  const router = useRouter();
  const { data: exercices, loading, error } = useDataLoader<Exercice[]>('exercices.json');
  const { playerData } = usePlayerData();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeDiff, setActiveDiff] = useState<DifficulteFilter>('all');

  const chapitresAvailable = exercices
    ? [...new Set(exercices.map(e => e.chapitre_id))]
    : [];

  const filtered = exercices
    ? exercices.filter(e => {
        const chapOk = activeTab === 'all' || e.chapitre_id === activeTab;
        const diffOk = activeDiff === 'all' || e.difficulte === activeDiff;
        return chapOk && diffOk;
      })
    : [];

  const completedIds = playerData.stats.exercices_completes;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-[1200px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)' }}
        >
          <Dumbbell size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Exercices TD
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {completedIds.length} complété{completedIds.length !== 1 ? 's' : ''}
            {exercices ? ` / ${exercices.length}` : ''}
          </p>
        </div>
      </div>

      {/* Chapter filter tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab('all')}
          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
          style={
            activeTab === 'all'
              ? { background: 'rgba(16,185,129,0.15)', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }
              : { background: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }
          }
        >
          Tous
        </motion.button>
        {CHAPITRE_IDS.filter(id => chapitresAvailable.includes(id)).map(id => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(id)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
            style={
              activeTab === id
                ? { background: 'rgba(16,185,129,0.15)', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }
            }
          >
            {CHAPITRE_LABELS[id] ?? id}
          </motion.button>
        ))}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(['all', 'facile', 'moyen', 'difficile'] as const).map(d => (
          <motion.button
            key={d}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveDiff(d)}
            className="px-4 py-1.5 rounded-full text-xs font-medium border transition-all"
            style={
              activeDiff === d
                ? { background: 'rgba(16,185,129,0.15)', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }
            }
          >
            {d === 'all' ? 'Toutes' : DIFFICULTE_STYLES[d].label}
          </motion.button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="rounded-xl border p-6 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            Impossible de charger les exercices : {error}
          </p>
        </div>
      )}

      {/* Exercices grid */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div
              className="rounded-xl border p-8 text-center"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Aucun exercice pour ces filtres.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map(exercice => {
                const isCompleted = completedIds.includes(exercice.id);
                return (
                  <motion.div
                    key={exercice.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/exercices/${exercice.id}`)}
                    className="rounded-xl border p-5 cursor-pointer flex flex-col gap-3 transition-all"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: isCompleted ? 'rgba(16,185,129,0.3)' : 'var(--border-subtle)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-semibold text-sm leading-tight flex-1 min-w-0"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {exercice.titre}
                      </h3>
                      {isCompleted && (
                        <CheckCircle size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      )}
                    </div>

                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {exercice.resume}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${DIFFICULTE_STYLES[exercice.difficulte].className}`}
                      >
                        {DIFFICULTE_STYLES[exercice.difficulte].label}
                      </span>
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(6,182,212,0.08)', color: 'var(--accent-blue)' }}
                      >
                        {CHAPITRE_LABELS[exercice.chapitre_id] ?? exercice.chapitre_id}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4 pt-2 border-t"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {exercice.duree_estimee} min
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {exercice.etapes.length} étape{exercice.etapes.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
