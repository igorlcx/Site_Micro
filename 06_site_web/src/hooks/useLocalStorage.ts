'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item) as T);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [key]);

  // Sync across all instances in the same tab via a custom event.
  // setTimeout(0) est obligatoire : dispatchEvent est synchrone, donc sans délai
  // setValue serait appelé pendant le rendu d'un autre composant → erreur React.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string }>).detail;
      if (detail.key !== key) return;
      setTimeout(() => {
        try {
          const item = window.localStorage.getItem(key);
          if (item !== null) setValue(JSON.parse(item) as T);
        } catch { /* ignore */ }
      }, 0);
    };
    window.addEventListener('ls-change', handler);
    return () => window.removeEventListener('ls-change', handler);
  }, [key]);

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      // L'updater ne fait QUE calculer la valeur et écrire en localStorage.
      // dispatchEvent est interdit ici : il est synchrone et déclencherait
      // setValue sur d'autres composants pendant ce rendu → erreur React.
      setValue((prev) => {
        const resolved =
          typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(prev)
            : newValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore
        }
        return resolved;
      });
      // On notifie les autres instances APRÈS le rendu, dans le prochain tick.
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ls-change', { detail: { key } }));
      }, 0);
    },
    [key]
  );

  return [hydrated ? value : defaultValue, setStoredValue];
}
