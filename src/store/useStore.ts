import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ForexSignal, Settings } from '../types/forex';

interface State {
  signals: ForexSignal[];
  settings: Settings;
  isScanning: boolean;
  setSettings: (settings: Partial<Settings>) => void;
  setSignals: (signals: ForexSignal[]) => void;
  setIsScanning: (isScanning: boolean) => void;
}

const defaultSettings: Settings = {
  apiKey: '',
  model: 'gpt-3.5-turbo',
  maxSources: 5,
  maxDailyCost: 5,
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      signals: [],
      settings: defaultSettings,
      isScanning: false,
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setSignals: (signals) => set({ signals }),
      setIsScanning: (isScanning) => set({ isScanning }),
    }),
    {
      name: 'forex-analysis-storage',
    }
  )
);