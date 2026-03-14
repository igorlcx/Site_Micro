/**
 * @file shop/page.tsx
 * @description Pirate skin shop with purchase modal, equip system, and gold rewards
 * @dependencies useDataLoader, usePlayerData, useGoldReward, RARETE_STYLES, framer-motion
 */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataLoader } from '@/hooks/useDataLoader';
import { usePlayerData } from '@/hooks/usePlayerData';
import { RARETE_STYLES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import type { SkinItem } from '@/types';
import { ShoppingBag, Coins, X, CheckCircle, PartyPopper } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

interface ConfirmModalProps {
  item: SkinItem;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ item, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="rounded-2xl border p-6 w-full max-w-sm"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-default)' }}
      >
        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Confirmer l&apos;achat
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Acheter <strong>{item.nom}</strong> pour{' '}
          <span style={{ color: 'var(--accent-gold)' }}>{item.prix} 🪙</span> ?
        </p>
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
          >
            Annuler
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--accent-gold)', color: 'white' }}
          >
            Confirmer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ShopPage() {
  const { data: skins, loading, error } = useDataLoader<SkinItem[]>('shop.json');
  const { playerData, buySkin, equipSkin } = usePlayerData();
  const [confirmItem, setConfirmItem] = useState<SkinItem | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { pieces, skins_debloquees, skin_actuel } = playerData;

  function handleBuy(item: SkinItem) {
    setConfirmItem(item);
  }

  function handleConfirm() {
    if (!confirmItem) return;
    // On n'appelle PAS reward() ici : reward() crée une seconde instance de
    // usePlayerData qui lirait un prev périmé et écraserait l'achat en localStorage.
    buySkin(confirmItem.id, confirmItem.prix);
    setSuccessMsg(`${confirmItem.nom} débloqué et équipé !`);
    setConfirmItem(null);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  function handleEquip(skinId: string) {
    equipSkin(skinId);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-[1200px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--accent-gold)' }}
          >
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Shop pirate
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Dépense tes pièces d&apos;or
            </p>
          </div>
        </div>

        {/* Wallet */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl border"
          style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.3)' }}
        >
          <Coins size={16} style={{ color: 'var(--accent-gold)' }} />
          <span className="font-bold tabular-nums" style={{ color: 'var(--accent-gold)' }}>
            {pieces}
          </span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            pièces
          </span>
        </div>
      </div>

      {/* Current avatar preview */}
      <div
        className="rounded-xl border p-5 mb-6 flex items-center gap-4"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-secondary)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/avatars/${skin_actuel}.svg`}
            alt={`Avatar actuel : ${skin_actuel}`}
            className="w-full h-full object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            Avatar actuel
          </p>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {skin_actuel}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {skins_debloquees.length} skin{skins_debloquees.length !== 1 ? 's' : ''} débloqué{skins_debloquees.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="rounded-xl border p-6 text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--accent-red)' }}>
            Impossible de charger la boutique : {error}
          </p>
        </div>
      )}

      {/* Skins grid */}
      {!loading && !error && skins && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skins.map(item => {
            const isOwned = skins_debloquees.includes(item.id);
            const isEquipped = skin_actuel === item.id;
            const canAfford = pieces >= item.prix;
            const rareteStyle = RARETE_STYLES[item.rarete];

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="rounded-xl border flex flex-col overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: isEquipped
                    ? 'rgba(245,158,11,0.5)'
                    : isOwned
                    ? 'rgba(16,185,129,0.3)'
                    : 'var(--border-subtle)',
                }}
              >
                {/* Preview */}
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.svg_preview}
                    alt={item.nom}
                    className="h-32 w-32 object-contain"
                    onError={e => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span style="font-size:48px;">🏴‍☠️</span>`;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {item.nom}
                      </h3>
                      <span className={`text-xs font-medium ${rareteStyle.className}`}>
                        {rareteStyle.label}
                      </span>
                    </div>
                    {isEquipped && (
                      <CheckCircle size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    )}
                  </div>

                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </p>

                  {/* Action button */}
                  <div className="mt-auto">
                    {isEquipped ? (
                      <div
                        className="w-full py-2 rounded-lg text-xs font-semibold text-center"
                        style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-gold)' }}
                      >
                        ✅ Équipé
                      </div>
                    ) : isOwned ? (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleEquip(item.id)}
                        className="w-full py-2 rounded-lg text-xs font-semibold border transition-all"
                        style={{
                          borderColor: 'rgba(16,185,129,0.4)',
                          background: 'rgba(16,185,129,0.08)',
                          color: 'var(--accent-green)',
                        }}
                      >
                        Équiper
                      </motion.button>
                    ) : canAfford ? (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleBuy(item)}
                        className="w-full py-2 rounded-lg text-xs font-semibold"
                        style={{ background: 'var(--accent-gold)', color: 'white' }}
                      >
                        Acheter {item.prix} 🪙
                      </motion.button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 rounded-lg text-xs font-medium cursor-not-allowed opacity-50"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                      >
                        {item.prix} 🪙 — manque {item.prix - pieces} 🪙
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Toast succès achat */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'rgba(16,185,129,0.4)', color: 'var(--accent-green)' }}
          >
            <PartyPopper size={18} />
            <span className="text-sm font-semibold">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmItem && (
          <ConfirmModal
            item={confirmItem}
            onConfirm={handleConfirm}
            onCancel={() => setConfirmItem(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
