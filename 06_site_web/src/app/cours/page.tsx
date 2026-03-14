/**
 * @file cours/page.tsx
 * @description PDF viewer for full course document with page navigation and zoom
 * @dependencies react-pdf (dynamic, ssr:false), useLocalStorage, STORAGE_KEYS
 */
'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';

// react-pdf uses DOMMatrix and other browser-only APIs — must be client-only
const PDFViewer = dynamic(() => import('@/components/cours/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 p-8 w-full max-w-2xl mx-auto">
      <Skeleton className="h-8 w-3/4 rounded" />
      <Skeleton className="h-[600px] w-full rounded-lg" />
    </div>
  ),
});

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function CoursPage() {
  const [savedPage, setSavedPage] = useLocalStorage<number>(STORAGE_KEYS.COURS_POSITION, 1);
  const [pageNumber, setPageNumber] = useState<number>(savedPage);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);

  const handleLoadSuccess = useCallback((total: number) => {
    setNumPages(total);
    setError(null);
  }, []);

  const handleError = useCallback((msg: string) => {
    setError(msg);
  }, []);

  const goToPrev = useCallback(() => {
    setPageNumber(p => {
      const next = Math.max(1, p - 1);
      setSavedPage(next);
      return next;
    });
  }, [setSavedPage]);

  const goToNext = useCallback(() => {
    setPageNumber(p => {
      const next = Math.min(numPages || p, p + 1);
      setSavedPage(next);
      return next;
    });
  }, [numPages, setSavedPage]);

  const zoomOut = useCallback(() => setScale(s => Math.max(0.5, parseFloat((s - 0.1).toFixed(1)))), []);
  const zoomIn  = useCallback(() => setScale(s => Math.min(2.0, parseFloat((s + 0.1).toFixed(1)))), []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-[1200px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--accent-purple)' }}>
          <BookOpen size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Cours complet</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Microéconomie — cours PDF</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3 mb-4"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={goToPrev} disabled={pageNumber <= 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <ChevronLeft size={16} /> Préc.
          </motion.button>
          <span className="text-sm tabular-nums px-2" style={{ color: 'var(--text-muted)' }}>
            {pageNumber} / {numPages || '…'}
          </span>
          <motion.button whileTap={{ scale: 0.97 }} onClick={goToNext} disabled={pageNumber >= numPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            Suiv. <ChevronRight size={16} />
          </motion.button>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={zoomOut} disabled={scale <= 0.5}
            className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <ZoomOut size={16} />
          </motion.button>
          <span className="text-sm tabular-nums w-12 text-center" style={{ color: 'var(--text-muted)' }}>
            {Math.round(scale * 100)}%
          </span>
          <motion.button whileTap={{ scale: 0.97 }} onClick={zoomIn} disabled={scale >= 2.0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <ZoomIn size={16} />
          </motion.button>
        </div>
      </div>

      {/* PDF or error */}
      {error ? (
        <div className="rounded-xl border p-8 flex flex-col items-center gap-4 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}>
          <AlertCircle size={40} style={{ color: 'var(--accent-red)' }} />
          <div>
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Impossible de charger le PDF</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Vérifiez que{' '}
              <code className="px-1 py-0.5 rounded text-xs" style={{ background: 'var(--bg-secondary)' }}>
                /cours/cours_micro_complet.pdf
              </code>{' '}
              est accessible.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border overflow-auto"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex justify-center p-4">
            <PDFViewer
              pageNumber={pageNumber}
              scale={scale}
              onLoadSuccess={handleLoadSuccess}
              onError={handleError}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
