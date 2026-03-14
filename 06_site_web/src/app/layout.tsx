import 'katex/dist/katex.min.css';
import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export const metadata: Metadata = {
  title: 'Micro Quest — Révision de Microéconomie',
  description: 'Site de révision gamifié pour la microéconomie',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <Sidebar />
          {/* gap visible entre sidebar et contenu */}
          <div style={{ width: '1px', flexShrink: 0, background: 'var(--border-default)' }} />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh', paddingLeft: '8px' }}>
            <Topbar />
            {/* display:flex + flexDirection:column permet aux pages de remplir l'espace restant */}
            <main style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
