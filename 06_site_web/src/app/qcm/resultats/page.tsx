/**
 * @file qcm/resultats/page.tsx
 * @description QCM results page with score, gold reward and question review
 */
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { RotateCcw, Home, ChevronDown, ChevronUp } from 'lucide-react';

interface ResultQuestion {
  id: string;
  question: string;
  bonne_reponse: string;
  explication: string;
  options: string[];
}

interface ResultData {
  score: number;
  total: number;
  goldEarned: number;
  questions: ResultQuestion[];
  answers: Record<string, { selected: string; correct: boolean }>;
}

export default function QCMResultatsPage() {
  const router = useRouter();
  const [results, setResults] = useState<ResultData | null>(null);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('qcm_results');
      if (stored) setResults(JSON.parse(stored));
      else router.push('/qcm');
    } catch {
      router.push('/qcm');
    }
  }, [router]);

  if (!results) return null;

  const pct = Math.round((results.score / results.total) * 100);
  const scoreColor = pct >= 80 ? 'var(--accent-green)' : pct >= 60 ? 'var(--accent-orange)' : 'var(--accent-red)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-6 max-w-2xl mx-auto"
    >
      {/* Score hero */}
      <div
        className="rounded-2xl border p-8 text-center mb-6"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-7xl font-black tabular-nums mb-2"
          style={{ color: scoreColor }}
        >
          {pct}%
        </motion.div>
        <p className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {results.score} / {results.total} bonnes réponses
        </p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mt-2"
          style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-gold)' }}
        >
          <span className="text-sm font-semibold">+{results.goldEarned} 🪙 gagnées</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Link href="/qcm" className="flex-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-medium text-sm"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
          >
            <RotateCcw size={16} />
            Rejouer
          </motion.button>
        </Link>
        <Link href="/" className="flex-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm"
            style={{ background: 'var(--accent-orange)', color: 'white' }}
          >
            <Home size={16} />
            Accueil
          </motion.button>
        </Link>
      </div>

      {/* Question review */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
          Révision des réponses
        </h3>
        <div className="space-y-2">
          {results.questions.map((q, i) => {
            const answer = results.answers[i];
            const isExpanded = expandedQ === q.id;
            return (
              <div
                key={q.id}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: answer?.correct ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }}
              >
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{ background: answer?.correct ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)' }}
                  onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                >
                  <span className="text-base">{answer?.correct ? '✅' : '❌'}</span>
                  <span className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
                    <MathRenderer text={q.question.length > 80 ? q.question.slice(0, 80) + '...' : q.question} />
                  </span>
                  {isExpanded
                    ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} />
                    : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                  }
                </button>
                {isExpanded && (
                  <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    {answer && !answer.correct && (
                      <p className="text-xs mb-2" style={{ color: 'var(--accent-red)' }}>
                        Votre réponse : <MathRenderer text={answer.selected} />
                      </p>
                    )}
                    <p className="text-xs mb-2" style={{ color: 'var(--accent-green)' }}>
                      Bonne réponse : <MathRenderer text={q.bonne_reponse} />
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      <MathRenderer text={q.explication} />
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
