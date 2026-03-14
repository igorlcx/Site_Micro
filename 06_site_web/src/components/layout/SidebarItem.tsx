'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
}

export function SidebarItem({ item, isActive }: SidebarItemProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[item.icon];

  return (
    <Link href={item.href}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative flex items-center gap-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer',
          isActive
            ? 'font-medium pl-5 pr-3'
            : 'font-normal hover:bg-white/5 px-3'
        )}
        style={
          isActive
            ? {
                background: 'rgba(255,255,255,0.08)',
                color: item.color,
              }
            : { color: 'var(--text-secondary)' }
        }
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
            style={{ background: item.color }}
          />
        )}
        {IconComponent && <IconComponent size={16} />}
        <span>{item.label}</span>
      </motion.div>
    </Link>
  );
}
