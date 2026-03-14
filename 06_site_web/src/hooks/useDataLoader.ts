'use client';
import { useState, useEffect } from 'react';

interface DataLoaderState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useDataLoader<T>(filename: string): DataLoaderState<T> {
  const [state, setState] = useState<DataLoaderState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetch(`/data/${filename}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });
    return () => { cancelled = true; };
  }, [filename]);

  return state;
}
