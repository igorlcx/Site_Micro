/**
 * @file qcm/session/page.tsx
 * @description QCM interactive session - question by question with instant feedback
 * @dependencies useDataLoader, generateQCMSession, calculateQCMReward, MathRenderer, useGoldReward
 */
'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDataLoader } from '@/hooks/useDataLoader';
import { useGoldReward } from '@/hooks/useGoldReward';
import { useQCMHistory } from '@/hooks/useQCMHistory';
import { usePlayerData } from '@/hooks/usePlayerData';
import { generateQCMSession, calculateQCMReward } from '@/lib/qcm';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Question } from '@/types';
import { ChevronRight, X } from 'lucide-react';

interface AnswerState {
  selected: string;
  correct: boolean;
}

export default function QCMSessionPage() {
  const router = useRouter();
  const { data: allQuestions, loading } = useDataLoader<Question[]>('qcm.json');
  const { reward } = useGoldReward();
  const { addSession } = useQCMHistory();
  const { addQCMScore } = usePlayerData();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [showNext, setShowNext] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    if (!allQuestions) return;
    let config: { chapitre?: string; difficulte?: string } = {};
    try {
      const stored = sessionStorage.getItem('qcm_config');
      if (stored) config = JSON.parse(stored);
    } catch { /* ignore */ }
    const session = generateQCMSession(allQuestions, config.chapitre, 15);
    setQuestions(session);
  }, [allQuestions]);

  const currentQuestion = questions[currentIndex];
  const isAnswered = currentIndex in answers;

  const handleAnswer = useCallback((option: string) => {
    if (isAnswered || !currentQuestion) return;
    const correct = option === currentQuestion.bonne_reponse;
    setAnswers(prev => ({ ...prev, [currentIndex]: { selected: option, correct } }));
    setTimeout(() => setShowNext(true), 800);
  }, [isAnswered, currentQuestion, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowNext(false);
      setAnimateKey(k => k + 1);
    } else {
      const finalAnswers = { ...answers };
      // Include the current answer if it exists
      const finalScore = Object.values(finalAnswers).filter(a => a.correct).length;
      const total = questions.length;

      addSession({ date: new Date().toISOString(), score: finalScore, total, chapitre_filter: undefined });
      addQCMScore(finalScore, total);
      reward(calculateQCMReward(finalScore, total), 'QCM terminé !');

      sessionStorage.setItem('qcm_results', JSON.stringify({
        score: finalScore,
        total,
        answers: finalAnswers,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          bonne_reponse: q.bonne_reponse,
          explication: q.explication,
          options: q.options,
        })),
        goldEarned: calculateQCMReward(finalScore, total),
      }));
      router.push('/qcm/resultats');
    }
  }, [currentIndex, questions, answers, addSession, addQCMScore, reward, router]);

  if (loading || questions.length === 0) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  if (!currentQuestion) return null;

  const answered = answers[currentIndex];
  const progressPct = (currentIndex / questions.length) * 100;

  return (
    <div className="px-6 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={() => router.push('/qcm')}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent-orange)' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={animateKey}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Question card */}
          <div
            className="rounded-xl border p-6 mb-4"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
          >
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded mb-3"
              style={{ background: 'rgba(249,115,22,0.1)', color: 'var(--accent-orange)' }}
            >
              {currentQuestion.chapitre_id.replace('_', ' ').replace('chapitre ', 'Chapitre ').replace('methodes', 'Méthodes')}
            </span>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <MathRenderer text={currentQuestion.question} />
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5 mb-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = answered?.selected === option;
              const isCorrect = option === currentQuestion.bonne_reponse;

              let borderColor = 'var(--border-subtle)';
              let bgColor = 'var(--bg-card)';
              let textColor = 'var(--text-primary)';

              if (answered) {
                if (isCorrect) {
                  borderColor = 'var(--accent-green)';
                  bgColor = 'rgba(16,185,129,0.1)';
                  textColor = 'var(--accent-green)';
                } else if (isSelected && !isCorrect) {
                  borderColor = 'var(--accent-red)';
                  bgColor = 'rgba(239,68,68,0.1)';
                  textColor = 'var(--accent-red)';
                }
              }

              return (
                <motion.button
                  key={option}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswer(option)}
                  disabled={!!answered}
                  animate={
                    answered && isSelected && !isCorrect
                      ? { x: [0, -6, 6, -4, 4, 0] }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                  className="w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all disabled:cursor-default"
                  style={{ background: bgColor, borderColor, color: textColor }}
                >
                  <span className="mr-3 font-bold opacity-50">{['A', 'B', 'C', 'D'][i]}.</span>
                  <MathRenderer text={option} />
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-xl border p-4 mb-4"
                  style={{
                    background: answered.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                    borderColor: answered.correct ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
                  }}
                >
                  <p className="text-sm font-semibold mb-1" style={{ color: answered.correct ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {answered.correct ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <MathRenderer text={currentQuestion.explication} />
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {showNext && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
            style={{ background: 'var(--accent-orange)', color: 'white' }}
          >
            {currentIndex < questions.length - 1 ? (
              <><span>Question suivante</span><ChevronRight size={18} /></>
            ) : (
              <span>Voir les résultats 🏆</span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
