/**
 * @file exercices/[exerciceId]/page.tsx
 * @description Step-by-step exercise session with hints, corrections, and gold rewards
 * @dependencies useDataLoader, usePlayerData, useGoldReward, MathRenderer, DIFFICULTE_STYLES, RECOMPENSES
 */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { usePlayerData } from '@/hooks/usePlayerData';
import { useGoldReward } from '@/hooks/useGoldReward';
import { DIFFICULTE_STYLES, CHAPITRE_LABELS, RECOMPENSES } from '@/lib/constants';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Exercice, Etape } from '@/types';
import { ArrowLeft, Clock, Lightbulb, CheckCircle, Eye, Trophy } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

interface EtapeState {
  showHint: boolean;
  showAnswer: boolean;
}

function EtapeCard({ etape, state, onShowHint, onShowAnswer }: {
  etape: Etape;
  state: EtapeState;
  onShowHint: () => void;
  onShowAnswer: () => void;
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Step number + question */}
      <div className="flex items-start gap-4 mb-4">
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)' }}
        >
          {etape.numero}
        </span>
        <p className="text-sm leading-relaxed pt-0.5" style={{ color: 'var(--text-primary)' }}>
          <MathRenderer text={etape.question} />
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap ml-11">
        {etape.indice && !state.showHint && !state.showAnswer && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onShowHint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{
              borderColor: 'rgba(245,158,11,0.3)',
              background: 'rgba(245,158,11,0.08)',
              color: 'var(--accent-gold)',
            }}
          >
            <Lightbulb size={12} />
            Voir un indice
          </motion.button>
        )}
        {!state.showAnswer && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onShowAnswer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{
              borderColor: 'rgba(6,182,212,0.3)',
              background: 'rgba(6,182,212,0.08)',
              color: 'var(--accent-blue)',
            }}
          >
            <Eye size={12} />
            Voir la correction
          </motion.button>
        )}
      </div>

      {/* Hint */}
      <AnimatePresence>
        {state.showHint && etape.indice && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden ml-11 mt-3"
          >
            <div
              className="rounded-lg border p-3"
              style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-gold)' }}>
                💡 Indice
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <MathRenderer text={etape.indice} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer + explanation */}
      <AnimatePresence>
        {state.showAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden ml-11 mt-3 space-y-3"
          >
            <div
              className="rounded-lg border p-3"
              style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-green)' }}>
                ✅ Réponse
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <MathRenderer text={etape.reponse} />
              </p>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                Logique
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <MathRenderer text={etape.explication_logique} />
              </p>
            </div>

            {etape.moyen_mnemo && (
              <div
                className="rounded-lg border p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-gold)' }}>
                  🧠 Mémo
                </p>
                <p className="text-xs leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                  <MathRenderer text={etape.moyen_mnemo} />
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExerciceDetailPage() {
  const router = useRouter();
  const params = useParams<{ exerciceId: string }>();
  const exerciceId = params.exerciceId;

  const { data: exercices, loading, error } = useDataLoader<Exercice[]>('exercices.json');
  const { playerData, addExerciceComplete } = usePlayerData();
  const { reward } = useGoldReward();

  const [etapeStates, setEtapeStates] = useState<Record<number, EtapeState>>({});
  const [done, setDone] = useState(false);

  const exercice = exercices?.find(e => e.id === exerciceId) ?? null;
  const isAlreadyCompleted = playerData.stats.exercices_completes.includes(exerciceId);

  function showHint(index: number) {
    setEtapeStates(prev => ({
      ...prev,
      [index]: { showHint: true, showAnswer: prev[index]?.showAnswer ?? false },
    }));
  }

  function showAnswer(index: number) {
    setEtapeStates(prev => ({
      ...prev,
      [index]: { showHint: prev[index]?.showHint ?? false, showAnswer: true },
    }));
  }

  function handleComplete() {
    if (!exercice) return;
    addExerciceComplete(exercice.id);
    reward(RECOMPENSES.EXERCICE_COMPLETE, 'Exercice complété ! +30 🪙');
    setDone(true);
    setTimeout(() => router.push('/exercices'), 1500);
  }

  if (loading) {
    return (
      <div className="px-6 py-6 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !exercice) {
    return (
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/exercices')}
          className="flex items-center gap-2 text-sm mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Retour
        </button>
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            {error ? `Erreur : ${error}` : 'Exercice introuvable.'}
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
      {/* Back */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push('/exercices')}
        className="flex items-center gap-2 text-sm mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={16} />
        Retour aux exercices
      </motion.button>

      {/* Header */}
      <div
        className="rounded-xl border p-6 mb-6"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {exercice.titre}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTE_STYLES[exercice.difficulte].className}`}>
                {DIFFICULTE_STYLES[exercice.difficulte].label}
              </span>
              <span
                className="inline-block text-xs px-2 py-0.5 rounded"
                style={{ background: 'rgba(6,182,212,0.08)', color: 'var(--accent-blue)' }}
              >
                {CHAPITRE_LABELS[exercice.chapitre_id] ?? exercice.chapitre_id}
              </span>
              <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <Clock size={12} />
                <span className="text-xs">{exercice.duree_estimee} min</span>
              </div>
            </div>
          </div>
          {isAlreadyCompleted && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)' }}
            >
              <CheckCircle size={12} />
              Déjà complété
            </div>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {exercice.resume}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-6">
        {exercice.etapes.map((etape, i) => (
          <EtapeCard
            key={i}
            etape={etape}
            state={etapeStates[i] ?? { showHint: false, showAnswer: false }}
            onShowHint={() => showHint(i)}
            onShowAnswer={() => showAnswer(i)}
          />
        ))}
      </div>

      {/* Complete button */}
      {!isAlreadyCompleted && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleComplete}
          disabled={done}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'var(--accent-green)', color: 'white' }}
        >
          {done ? (
            <>
              <CheckCircle size={18} />
              Enregistré ! +30 🪙
            </>
          ) : (
            <>
              <Trophy size={18} />
              Exercice terminé ! +{RECOMPENSES.EXERCICE_COMPLETE} 🪙
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}
