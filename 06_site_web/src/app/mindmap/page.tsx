/**
 * @file mindmap/page.tsx
 * @description Interactive mindmap using React Flow with a node detail side panel
 * @dependencies @xyflow/react, useDataLoader, MathRenderer
 */
'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useDataLoader } from '@/hooks/useDataLoader';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import type { MindmapData, MindmapNode } from '@/types';
import { Network, X } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const NODE_TYPE_STYLES: Record<string, { background: string; color: string; fontSize: number; fontWeight: number; padding: string; borderRadius: number; border: string }> = {
  root: {
    background: 'rgba(245,158,11,0.18)',
    color: '#f59e0b',
    fontSize: 15,
    fontWeight: 700,
    padding: '10px 18px',
    borderRadius: 12,
    border: '2px solid rgba(245,158,11,0.5)',
  },
  chapitre: {
    background: 'rgba(139,92,246,0.14)',
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: 600,
    padding: '7px 14px',
    borderRadius: 10,
    border: '1.5px solid rgba(139,92,246,0.35)',
  },
  concept: {
    background: 'rgba(30,30,50,0.9)',
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: 400,
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid rgba(100,116,139,0.3)',
  },
  formule: {
    background: 'rgba(6,182,212,0.10)',
    color: '#22d3ee',
    fontSize: 11,
    fontWeight: 500,
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid rgba(6,182,212,0.3)',
  },
};

function convertNodes(mindmapNodes: MindmapNode[]): Node[] {
  return mindmapNodes.map(n => ({
    id: n.id,
    position: n.position,
    data: {
      label: n.label,
      formule: n.formule,
      type: n.type,
      couleur: n.couleur,
    },
    style: {
      ...(NODE_TYPE_STYLES[n.type] ?? NODE_TYPE_STYLES.concept),
      ...(n.couleur ? { borderColor: n.couleur, color: n.couleur } : {}),
      cursor: 'pointer',
      userSelect: 'none' as const,
      maxWidth: n.type === 'root' ? 200 : 180,
      whiteSpace: 'normal' as const,
      wordBreak: 'break-word' as const,
      textAlign: 'center' as const,
    },
  }));
}

interface SelectedNodeData {
  id: string;
  label: string;
  formule?: string;
  type: string;
}

export default function MindmapPage() {
  const { data: mindmapData, loading, error } = useDataLoader<MindmapData>('mindmap.json');
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  useEffect(() => {
    if (!mindmapData) return;
    const rfNodes = convertNodes(mindmapData.nodes);
    const rfEdges: Edge[] = mindmapData.edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      style: { stroke: 'rgba(100,116,139,0.4)', strokeWidth: 1.5 },
      animated: false,
    }));
    setNodes(rfNodes);
    setEdges(rfEdges);
  }, [mindmapData, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler<Node> = useCallback((_event, node) => {
    const data = node.data as { label: string; formule?: string; type: string };
    setSelectedNode({
      id: node.id,
      label: data.label,
      formule: data.formule,
      type: data.type,
    });
  }, []);

  const TYPE_BADGE_COLORS: Record<string, string> = {
    root:     'var(--accent-gold)',
    chapitre: 'var(--accent-purple)',
    concept:  'var(--text-muted)',
    formule:  'var(--accent-blue)',
  };

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
          <Network size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Mindmap
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Vue d&apos;ensemble des concepts
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ height: '650px' }}>
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      )}

      {error && (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            Impossible de charger la mindmap : {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="flex gap-4">
          {/* ReactFlow container */}
          <div
            className="flex-1 rounded-xl border overflow-hidden"
            style={{ borderColor: 'var(--border-subtle)', height: '650px', minWidth: 0 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              style={{ background: '#0d0d1a' }}
              minZoom={0.3}
              maxZoom={2}
            >
              <Background color="#1e2030" gap={20} />
              <Controls />
              <MiniMap
                style={{ background: '#16162a' }}
                nodeColor={(n) => {
                  const t = (n.data as { type?: string }).type ?? 'concept';
                  const map: Record<string, string> = { root: '#f59e0b', chapitre: '#a78bfa', concept: '#64748b', formule: '#22d3ee' };
                  return map[t] ?? '#64748b';
                }}
              />
            </ReactFlow>
          </div>

          {/* Side panel */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border p-5 flex-shrink-0"
                style={{
                  width: 280,
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-default)',
                  height: 'fit-content',
                  alignSelf: 'flex-start',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {selectedNode.label}
                  </h3>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="flex-shrink-0 p-0.5 rounded"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <span
                  className="inline-block text-xs px-2 py-0.5 rounded-full mb-4 font-medium"
                  style={{
                    background: `${TYPE_BADGE_COLORS[selectedNode.type] ?? 'var(--text-muted)'}20`,
                    color: TYPE_BADGE_COLORS[selectedNode.type] ?? 'var(--text-muted)',
                  }}
                >
                  {selectedNode.type}
                </span>

                {selectedNode.formule && (
                  <div
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}
                  >
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent-blue)' }}>
                      Formule
                    </p>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <MathRenderer text={selectedNode.formule} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
