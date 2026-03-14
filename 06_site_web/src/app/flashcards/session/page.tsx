/**
 * @file flashcards/session/page.tsx
 * @description Flashcard session with 3D flip, progress tracking, and gold rewards
 * @dependencies useDataLoader, useFlashcardProgress, useGoldReward, getSessionCards, MathRenderer
 */
'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useGoldReward } from '@/hooks/useGoldReward';
import { getSessionCards } from '@/lib/flashcards';
import { RECOMPENSES } from '@/lib/constants';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Flashcard } from '@/types';
import { X, RotateCcw, ArrowLeft } from 'lucide-react';

const CATEGORIE_COLORS: Record<string, string> = {
  définition: 'rgba(59,130,246,0.15)',
  formule:    'rgba(139,92,246,0.15)',
  méthode:    'rgba(16,185,129,0.15)',
  piège:      'rgba(239,68,68,0.15)',
  exemple:    'rgba(249,115,22,0.15)',
};

const CATEGORIE_TEXT: Record<string, string> = {
  définition: 'var(--accent-blue)',
  formule:    'var(--accent-purple)',
  méthode:    'var(--accent-green)',
  piège:      'var(--accent-red)',
  exemple:    'var(--accent-orange)',
};

interface CardResult {
  id: string;
  status: 'mastered' | 'struggling' | 'missed';
}

export default function FlashcardSessionPage() {
  const router = useRouter();
  const { data: allCards, loading } = useDataLoader<Flashcard[]>('flashcards.json');
  const { progress, markMastered, markStruggling, markSeen } = useFlashcardProgress();
  const { reward } = useGoldReward();

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [results, setResults] = useState<CardResult[]>([]);
  const [sessionDone, setSessionDone] = useState(false);
  const [chapitreId, setChapitreId] = useState('all');

  useEffect(() => {
    const stored = sessionStorage.getItem('flashcard_chapitre') ?? 'all';
    setChapitreId(stored);
  }, []);

  useEffect(() => {
    if (!allCards || !chapitreId) return;
    const session = getSessionCards(allCards, progress, chapitreId, 20);
    setCards(session);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCards, chapitreId]);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (!currentCard) return;
    markSeen(currentCard.id);
  }, [currentCard, markSeen]);

  const handleFlip = useCallback(() => {
    if (flipped) return;
    setFlipped(true);
    setTimeout(() => setShowButtons(true), 400);
  }, [flipped]);

  const handleResult = useCallback((status: 'mastered' | 'struggling' | 'missed') => {
    if (!currentCard) return;

    setResults(prev => [...prev, { id: currentCard.id, status }]);

    if (status === 'mastered') {
      markMastered(currentCard.id);
      reward(RECOMPENSES.FLASHCARD_MAITRISE, '+10 🪙 Maîtrisé !');
    } else if (status === 'struggling') {
      markStruggling(currentCard.id);
      reward(RECOMPENSES.FLASHCARD_A_REVOIR, '+5 🪙 À revoir');
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1);
      setFlipped(false);
      setShowButtons(false);
    } else {
      setSessionDone(true);
    }
  }, [currentCard, currentIndex, cards.length, markMastered, markStruggling, reward]);

  const handleRestart = useCallback(() => {
    if (!allCards) return;
    const session = getSessionCards(allCards, progress, chapitreId, 20);
    setCards(session);
    setCurrentIndex(0);
    setFlipped(false);
    setShowButtons(false);
    setResults([]);
    setSessionDone(false);
  }, [allCards, progress, chapitreId]);

  if (loading || (cards.length === 0 && !sessionDone)) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
        </div>
      </div>
    );
  }

  if (sessionDone) {
    const mastered = results.filter(r => r.status === 'mastered').length;
    const struggling = results.filter(r => r.status === 'struggling').length;
    const missed = results.filter(r => r.status === 'missed').length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-6 max-w-2xl mx-auto"
      >
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-4xl mb-4">🏴‍☠️</p>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Session terminée !
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {results.length} cartes révisées
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-green)' }}>{mastered}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Maîtrisées</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-orange)' }}>{struggling}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>À revoir</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-red)' }}>{missed}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Ratées</p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/flashcards')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={16} />
              Retour
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
              style={{ background: 'var(--accent-purple)', color: 'white' }}
            >
              <RotateCcw size={16} />
              Recommencer
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentCard) return null;

  const progressPct = ((currentIndex) / cards.length) * 100;

  return (
    <div className="px-6 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={() => router.push('/flashcards')}
          className="p-1.5 rounded-lg"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent-purple)' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Categorie badge */}
      <div className="flex justify-center mb-4">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            background: CATEGORIE_COLORS[currentCard.categorie] ?? 'rgba(255,255,255,0.05)',
            color: CATEGORIE_TEXT[currentCard.categorie] ?? 'var(--text-muted)',
          }}
        >
          {currentCard.categorie}
        </span>
      </div>

      {/* Flip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="relative cursor-pointer mb-6"
            style={{ perspective: '1000px', minHeight: '260px' }}
            onClick={handleFlip}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '260px' }}
            >
              {/* Recto */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl border"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <p className="text-xs font-medium mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Recto
                </p>
                <p className="text-lg text-center leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
                  <MathRenderer text={currentCard.recto} />
                </p>
                {!flipped && (
                  <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
                    Cliquer pour retourner
                  </p>
                )}
              </div>

              {/* Verso */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl border"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'var(--bg-card-hover)',
                  borderColor: 'var(--accent-purple)',
                }}
              >
                <p className="text-xs font-medium mb-4 uppercase tracking-wider" style={{ color: 'var(--accent-purple)' }}>
                  Verso
                </p>
                <p className="text-base text-center leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  <MathRenderer text={currentCard.verso} />
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleResult('missed')}
              className="py-3 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)' }}
            >
              😰 Raté
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleResult('struggling')}
              className="py-3 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.1)', color: 'var(--accent-orange)' }}
            >
              🤔 À revoir
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleResult('mastered')}
              className="py-3 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)' }}
            >
              ✅ Maîtrisé
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
