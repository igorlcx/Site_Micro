/**
 * @file PDFViewer.tsx
 * @description Client-only PDF viewer component using react-pdf
 * @dependencies react-pdf
 */
'use client';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Skeleton } from '@/components/ui/skeleton';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PDFViewerProps {
  pageNumber: number;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onError: (message: string) => void;
}

export default function PDFViewer({ pageNumber, scale, onLoadSuccess, onError }: PDFViewerProps) {
  return (
    <Document
      file="/cours/cours_micro_complet.pdf"
      onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}
      onLoadError={(err) => onError(err.message)}
      loading={
        <div className="space-y-4 p-4 w-full max-w-2xl">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      }
    >
      <Page
        pageNumber={pageNumber}
        scale={scale}
        loading={
          <div style={{ width: Math.round(595 * scale), height: Math.round(842 * scale) }}>
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        }
      />
    </Document>
  );
}
