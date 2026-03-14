/**
 * @file fiches/[chapitreId]/page.tsx
 * @description Detailed study sheet view with methods, key concepts, and mnemonics
 * @dependencies useDataLoader, MathRenderer, CHAPITRE_LABELS, framer-motion
 */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { CHAPITRE_LABELS } from '@/lib/constants';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Fiche } from '@/types';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Brain, List, Zap } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export default function FicheDetailPage() {
  const router = useRouter();
  const params = useParams<{ chapitreId: string }>();
  const searchParams = useSearchParams();
  const ficheId = searchParams.get('id');

  const { data: fiches, loading, error } = useDataLoader<Fiche[]>('fiches.json');
  const [openMethode, setOpenMethode] = useState<number | null>(null);

  const chapitreId = params.chapitreId;

  const fiche = fiches?.find(f =>
    ficheId ? f.id === ficheId : f.chapitre_id === chapitreId
  ) ?? null;

  if (loading) {
    return (
      <div className="px-6 py-6 max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !fiche) {
    return (
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/fiches')}
          className="flex items-center gap-2 text-sm mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Retour aux fiches
        </button>
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            {error ? `Erreur : ${error}` : 'Fiche introuvable.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-3xl mx-auto"
    >
      {/* Back button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push('/fiches')}
        className="flex items-center gap-2 text-sm mb-6 transition-colors"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={16} />
        Retour aux fiches
      </motion.button>

      <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-6">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border p-6"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {fiche.titre}
              </h1>
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: 'rgba(6,182,212,0.12)', color: 'var(--accent-blue)' }}
              >
                {CHAPITRE_LABELS[fiche.chapitre_id] ?? fiche.chapitre_id}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Intuition */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border p-6"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} style={{ color: 'var(--accent-blue)' }} />
            <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Intuition
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <MathRenderer text={fiche.intuition} />
          </p>
        </motion.div>

        {/* Moyen mémo */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border p-6"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.25)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: 'var(--accent-gold)' }} />
            <h2 className="text-base font-semibold" style={{ color: 'var(--accent-gold)' }}>
              Moyen mémo
            </h2>
          </div>
          <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
            <MathRenderer text={fiche.moyen_mnemo} />
          </p>
        </motion.div>

        {/* Résumé condensé */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border p-6"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <List size={16} style={{ color: 'var(--accent-purple)' }} />
            <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Résumé condensé
            </h2>
          </div>
          <ul className="space-y-2">
            {fiche.resume_condense.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent-purple)' }}
                />
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <MathRenderer text={item} />
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Méthodes */}
        {fiche.methodes.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border p-6"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} style={{ color: 'var(--accent-green)' }} />
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Méthodes
              </h2>
            </div>
            <div className="space-y-3">
              {fiche.methodes.map((methode, i) => (
                <div
                  key={i}
                  className="rounded-lg border overflow-hidden"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <button
                    onClick={() => setOpenMethode(openMethode === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                    style={{
                      background: openMethode === i ? 'rgba(16,185,129,0.08)' : 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span className="text-sm font-medium">
                      <MathRenderer text={methode.situation} />
                    </span>
                    {openMethode === i ? (
                      <ChevronUp size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    ) : (
                      <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                  </button>

                  <AnimatePresence>
                    {openMethode === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ol className="px-4 py-4 space-y-2">
                          {methode.etapes.map((etape, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span
                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)' }}
                              >
                                {j + 1}
                              </span>
                              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                <MathRenderer text={etape} />
                              </span>
                            </li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Concepts clés */}
        {fiche.concepts_cles.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border p-6"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
          >
            <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Concepts clés
            </h2>
            <div className="flex flex-wrap gap-2">
              {fiche.concepts_cles.map((concept, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    background: 'rgba(6,182,212,0.08)',
                    borderColor: 'rgba(6,182,212,0.2)',
                    color: 'var(--accent-blue)',
                  }}
                >
                  <MathRenderer text={concept} />
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
