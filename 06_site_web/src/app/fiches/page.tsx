/**
 * @file fiches/page.tsx
 * @description Study sheets selector with chapter filtering
 * @dependencies useDataLoader, CHAPITRE_LABELS, Skeleton, framer-motion
 */
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { CHAPITRE_LABELS } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import type { Fiche } from '@/types';
import { FileText, BookMarked } from 'lucide-react';

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

const CHAPITRE_IDS = Object.keys(CHAPITRE_LABELS);

export default function FichesPage() {
  const router = useRouter();
  const { data: fiches, loading, error } = useDataLoader<Fiche[]>('fiches.json');
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = fiches
    ? activeTab === 'all'
      ? fiches
      : fiches.filter(f => f.chapitre_id === activeTab)
    : [];

  const chapitresAvailable = fiches
    ? [...new Set(fiches.map(f => f.chapitre_id))]
    : [];

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
          style={{ background: 'rgba(6,182,212,0.15)', color: 'var(--accent-blue)' }}
        >
          <FileText size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Fiches &amp; méthodes
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Résumés condensés par chapitre
          </p>
        </div>
      </div>

      {/* Chapter filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab('all')}
          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
          style={
            activeTab === 'all'
              ? { background: 'rgba(6,182,212,0.15)', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }
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
                ? { background: 'rgba(6,182,212,0.15)', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }
                : { background: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }
            }
          >
            {CHAPITRE_LABELS[id] ?? id}
          </motion.button>
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          className="rounded-xl border p-6 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            Impossible de charger les fiches : {error}
          </p>
        </div>
      )}

      {/* Fiches grid */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div
              className="rounded-xl border p-8 text-center"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Aucune fiche pour ce chapitre.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map(fiche => (
                <motion.div
                  key={fiche.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/fiches/${fiche.chapitre_id}?id=${fiche.id}`)}
                  className="rounded-xl border p-5 cursor-pointer flex flex-col gap-3 transition-all"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(6,182,212,0.12)', color: 'var(--accent-blue)' }}
                    >
                      <BookMarked size={15} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-semibold text-sm leading-tight mb-1 truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {fiche.titre}
                      </h3>
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-blue)' }}
                      >
                        {CHAPITRE_LABELS[fiche.chapitre_id] ?? fiche.chapitre_id}
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-xs leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {fiche.intuition}
                  </p>

                  <div className="flex items-center gap-3 pt-1 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {fiche.concepts_cles.length} concept{fiche.concepts_cles.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {fiche.methodes.length} méthode{fiche.methodes.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
