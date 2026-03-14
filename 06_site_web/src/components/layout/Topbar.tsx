'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS, CHAPITRE_LABELS } from '@/lib/constants';
import { usePlayerData } from '@/hooks/usePlayerData';
import { ChevronRight } from 'lucide-react';

export function Topbar() {
  const pathname = usePathname();
  const { playerData } = usePlayerData();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b"
      style={{
        background: 'rgba(10,10,11,0.85)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:text-white transition-colors">
          Accueil
        </Link>
        {segments.map((seg, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/');
          const label = CHAPITRE_LABELS[seg] ?? (NAV_ITEMS.find((n) => n.href === href)?.label ?? seg);
          return (
            <span key={href} className="flex items-center gap-1">
              <ChevronRight size={12} />
              <Link href={href} className="hover:text-white transition-colors capitalize">
                {label}
              </Link>
            </span>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold" style={{ color: 'var(--accent-gold)' }}>
          🪙 {playerData.pieces}
        </span>
        <span
          className="text-xs px-2 py-1 rounded-full border"
          style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}
        >
          Niv.{playerData.niveau}
        </span>
      </div>
    </header>
  );
}
