'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, DEFAULT_PLAYER_DATA, NIVEAUX } from '@/lib/constants';
import { getDaysDiff, isSameDay } from '@/lib/utils';
import type { PlayerData } from '@/types';

export function usePlayerData() {
  const [playerData, setPlayerData] = useLocalStorage<PlayerData>(
    STORAGE_KEYS.PLAYER_DATA,
    DEFAULT_PLAYER_DATA
  );

  const addPieces = useCallback(
    (amount: number) => {
      setPlayerData((prev) => {
        const newPieces = prev.pieces + amount;
        const newXP = prev.xp + amount;
        let nouveauNiveau = prev.niveau;
        let xpPourProchain = prev.xp_pour_prochain_niveau;
        for (const n of NIVEAUX) {
          if (newXP >= n.xp_requis) {
            nouveauNiveau = n.niveau;
            const next = NIVEAUX.find((nl) => nl.niveau === n.niveau + 1);
            xpPourProchain = next?.xp_requis ?? n.xp_requis;
          }
        }
        return { ...prev, pieces: newPieces, xp: newXP, niveau: nouveauNiveau, xp_pour_prochain_niveau: xpPourProchain };
      });
    },
    [setPlayerData]
  );

  const updateStreak = useCallback(() => {
    setPlayerData((prev) => {
      const today = new Date().toISOString();
      if (isSameDay(today, prev.derniere_visite)) return prev;
      const diff = getDaysDiff(today, prev.derniere_visite);
      return { ...prev, streak: diff === 1 ? prev.streak + 1 : 1, derniere_visite: today };
    });
  }, [setPlayerData]);

  const equipSkin = useCallback(
    (skinId: string) => {
      setPlayerData((prev) => {
        if (!prev.skins_debloquees.includes(skinId)) return prev;
        return { ...prev, skin_actuel: skinId };
      });
    },
    [setPlayerData]
  );

  const buySkin = useCallback(
    (skinId: string, prix: number) => {
      setPlayerData((prev) => {
        if (prev.pieces < prix || prev.skins_debloquees.includes(skinId)) return prev;
        return {
          ...prev,
          pieces: prev.pieces - prix,
          skins_debloquees: [...prev.skins_debloquees, skinId],
          skin_actuel: skinId,
        };
      });
    },
    [setPlayerData]
  );

  const addQCMScore = useCallback(
    (score: number, total: number) => {
      setPlayerData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          qcm_total: prev.stats.qcm_total + 1,
          qcm_scores: [...prev.stats.qcm_scores.slice(-9), Math.round((score / total) * 100)],
        },
      }));
    },
    [setPlayerData]
  );

  const addExerciceComplete = useCallback(
    (exerciceId: string) => {
      setPlayerData((prev) => {
        if (prev.stats.exercices_completes.includes(exerciceId)) return prev;
        return {
          ...prev,
          stats: { ...prev.stats, exercices_completes: [...prev.stats.exercices_completes, exerciceId] },
        };
      });
    },
    [setPlayerData]
  );

  return { playerData, addPieces, updateStreak, equipSkin, buySkin, addQCMScore, addExerciceComplete };
}
