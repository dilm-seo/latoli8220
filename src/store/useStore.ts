import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ForexSignal } from '../types';

interface AppState {
  signals: ForexSignal[];
  isScanning: boolean;
  apiKey: string | null;
  budget: number;
  maxSources: number;
  dailyCost: number;
  setApiKey: (key: string) => void;
  setBudget: (budget: number) => void;
  setMaxSources: (max: number) => void;
  setDailyCost: (cost: number) => void;
  addSignal: (signal: ForexSignal) => void;
  clearSignals: () => void;
  setScanning: (scanning: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      signals: [],
      isScanning: false,
      apiKey: null,
      budget: 10,
      maxSources: 5,
      dailyCost: 0,
      setApiKey: (key) => set({ apiKey: key }),
      setBudget: (budget) => set({ budget }),
      setMaxSources: (max) => set({ maxSources: max }),
      setDailyCost: (cost) => set({ dailyCost: cost }),
      addSignal: (signal) => set((state) => ({ 
        signals: [signal, ...state.signals] 
      })),
      clearSignals: () => set({ signals: [] }),
      setScanning: (scanning) => set({ isScanning: scanning }),
    }),
    {
      name: 'forex-analysis-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        budget: state.budget,
        maxSources: state.maxSources,
      }),
    }
  )
);