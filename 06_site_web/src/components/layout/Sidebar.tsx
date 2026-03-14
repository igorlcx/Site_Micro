/**
 * @file Sidebar.tsx
 * @description Main navigation sidebar with player profile, XP bar, gold counter
 * @dependencies framer-motion, lucide-react, usePlayerData
 */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { usePlayerData } from '@/hooks/usePlayerData';
import { PirateAvatar } from './PirateAvatar';
import { XPBar } from './XPBar';
import { GoldCounter } from './GoldCounter';
import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  const pathname = usePathname();
  const { playerData } = usePlayerData();

  return (
    <aside
      className="hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-5 py-4 hover:opacity-80 transition-opacity">
        <span className="text-xl">🏴‍☠️</span>
        <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--accent-gold)' }}>
          MICRO QUEST
        </span>
      </Link>

      {/* Player Profile */}
      <div className="px-4 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3 mb-3">
          <PirateAvatar skinId={playerData.skin_actuel} size={48} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {playerData.nom}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Niveau {playerData.niveau}
            </p>
          </div>
        </div>
        <XPBar xp={playerData.xp} niveau={playerData.niveau} xpProchain={playerData.xp_pour_prochain_niveau} />
        <div className="mt-2">
          <GoldCounter pieces={playerData.pieces} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
          />
        ))}
      </nav>

      {/* Streak footer */}
      {playerData.streak > 0 && (
        <div
          className="px-5 py-3 border-t text-xs flex items-center gap-2"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <span>🔥</span>
          <span>{playerData.streak} jour{playerData.streak > 1 ? 's' : ''} de suite</span>
        </div>
      )}
    </aside>
  );
}
