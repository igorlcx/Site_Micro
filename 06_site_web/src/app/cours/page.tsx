/**
 * @file cours/page.tsx
 * @description PDF viewer via iframe natif — navigation, liens TDM, zoom et plein écran inclus
 * @dependencies framer-motion, useLocalStorage
 */
'use client';
import { useCallback, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { BookOpen, FileText, GraduationCap, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

const DOCUMENTS = [
  {
    id: 'micro_complet',
    label: 'Cours structuré',
    description: 'Version annotée et structurée',
    file: '/cours/cours_micro_complet.pdf',
    Icon: FileText,
    color: 'var(--accent-purple)',
    colorRaw: '#8b5cf6',
  },
  {
    id: 'cours_prof',
    label: 'Cours du professeur',
    description: 'Document original du prof',
    file: '/cours/cours_prof.pdf',
    Icon: GraduationCap,
    color: 'var(--accent-blue)',
    colorRaw: '#3b82f6',
  },
] as const;

type DocumentId = typeof DOCUMENTS[number]['id'];

export default function CoursPage() {
  const [activeDocId, setActiveDocId] = useLocalStorage<DocumentId>('micro_quest_cours_doc', 'micro_complet');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDoc = DOCUMENTS.find(d => d.id === activeDocId) ?? DOCUMENTS[0];

  // Écoute les changements d'état plein écran (touche Échap, etc.)
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleSelectDoc = useCallback((id: DocumentId) => {
    setActiveDocId(id);
  }, [setActiveDocId]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const openInNewTab = useCallback(() => {
    window.open(activeDoc.file, '_blank');
  }, [activeDoc.file]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 24px 16px' }}
    >
      {/* ── Barre supérieure ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-3 flex-wrap">

        {/* Titre */}
        <div className="flex items-center gap-2.5 mr-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--accent-purple)' }}>
            <BookOpen size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Cours complet
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Microéconomie</p>
          </div>
        </div>

        {/* Sélecteur de document */}
        <div className="flex gap-2 flex-1">
          {DOCUMENTS.map(doc => {
            const isActive = doc.id === activeDocId;
            return (
              <motion.button
                key={doc.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectDoc(doc.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all"
                style={{
                  background: isActive ? `${doc.colorRaw}18` : 'var(--bg-card)',
                  borderColor: isActive ? doc.color : 'var(--border-subtle)',
                  minWidth: 160,
                }}
              >
                <doc.Icon size={15} style={{ color: isActive ? doc.color : 'var(--text-muted)', flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: isActive ? doc.color : 'var(--text-primary)' }}>
                    {doc.label}
                  </p>
                  <p className="text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>
                    {doc.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={openInNewTab}
            title="Ouvrir dans un nouvel onglet"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
          >
            <ExternalLink size={14} />
            Nouvel onglet
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isFullscreen ? 'Réduire' : 'Plein écran'}
          </motion.button>
        </div>
      </div>

      {/* ── Hint ─────────────────────────────────────────────────────────── */}
      <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        Navigation, zoom, recherche et liens de la table des matières sont gérés directement par le viewer intégré.
      </p>

      {/* ── iframe PDF natif ──────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          background: '#525659', // couleur de fond PDF.js
        }}
      >
        <iframe
          key={activeDoc.file} // force le rechargement quand on change de doc
          src={activeDoc.file}
          title={activeDoc.label}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          // Plein écran autorisé dans l'iframe
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
