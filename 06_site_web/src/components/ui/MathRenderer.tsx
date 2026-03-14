/**
 * @file MathRenderer.tsx
 * @description Renders mixed text with LaTeX formulas using KaTeX
 * @dependencies katex
 */
'use client';
import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  text: string;
  className?: string;
  displayMode?: boolean;
  errorColor?: string;
}

interface Segment {
  type: 'text' | 'math';
  content: string;
  display?: boolean;
}

function parseTextWithMath(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    const isDisplay = raw.startsWith('$$');
    segments.push({
      type: 'math',
      content: isDisplay ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim(),
      display: isDisplay,
    });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }
  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}

export function MathRenderer({
  text,
  className = '',
  displayMode = false,
  errorColor = '#ef4444',
}: MathRendererProps) {
  if (!text) return null;
  const segments = parseTextWithMath(text);
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') return <span key={index}>{segment.content}</span>;
        try {
          const html = katex.renderToString(segment.content, {
            displayMode: segment.display ?? displayMode,
            throwOnError: false,
            errorColor,
            strict: false,
            trust: false,
            macros: { '\\R': '\\mathbb{R}', '\\E': '\\mathbb{E}', '\\N': '\\mathbb{N}' },
          });
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className={segment.display ? 'block my-2 overflow-x-auto' : 'inline'}
            />
          );
        } catch {
          return <code key={index} className="text-red-400 text-sm px-1 font-mono">{segment.content}</code>;
        }
      })}
    </span>
  );
}
