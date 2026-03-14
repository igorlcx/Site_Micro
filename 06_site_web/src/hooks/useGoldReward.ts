'use client';
import { useCallback, useState } from 'react';
import { usePlayerData } from './usePlayerData';

interface GoldEvent {
  id: number;
  amount: number;
  label: string;
}

export function useGoldReward() {
  const { addPieces } = usePlayerData();
  const [events, setEvents] = useState<GoldEvent[]>([]);

  const reward = useCallback(
    (amount: number, label = '') => {
      addPieces(amount);
      const id = Date.now();
      setEvents((prev) => [...prev, { id, amount, label }]);
      setTimeout(() => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }, 2000);
    },
    [addPieces]
  );

  return { reward, events };
}
