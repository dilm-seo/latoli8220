import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Settings, Signal } from '../types';
import { loadSettings, saveSettings } from '../utils/storage';

const INITIAL_SETTINGS: Settings = {
  apiKey: '',
  model: 'gpt-4-turbo-preview',
  maxSites: 5,
  maxDailyCost: 10,
  cacheTimeout: 15, // minutes
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      signals: [],
      settings: loadSettings() || INITIAL_SETTINGS,
      isScanning: false,
      dailyApiCalls: 0,
      lastApiCall: null,

      setSettings: (newSettings: Settings) => {
        saveSettings(newSettings);
        set({ settings: newSettings });
      },

      addSignal: (signal: Signal) => 
        set(state => ({ 
          signals: [signal, ...state.signals].slice(0, 100)
        })),

      setIsScanning: (isScanning: boolean) => 
        set({ isScanning }),

      incrementApiCalls: () => 
        set(state => ({ 
          dailyApiCalls: state.dailyApiCalls + 1,
          lastApiCall: new Date().toISOString()
        })),

      resetDailyApiCalls: () => 
        set({ dailyApiCalls: 0 }),

      clearSignals: () => 
        set({ signals: [] }),
    }),
    {
      name: 'forex-signals-storage',
      partialize: (state) => ({
        settings: state.settings,
        dailyApiCalls: state.dailyApiCalls,
        lastApiCall: state.lastApiCall,
      }),
    }
  )
);