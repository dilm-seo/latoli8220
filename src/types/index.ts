export interface Signal {
  pair: string;
  direction: 'buy' | 'sell';
  confidence: number;
  reason: string;
  timestamp: string;
  source?: string;
}

export interface Settings {
  apiKey: string;
  model: string;
  maxSites: number;
  maxDailyCost: number;
  cacheTimeout: number;
}

export interface AppState {
  signals: Signal[];
  settings: Settings;
  isScanning: boolean;
  dailyApiCalls: number;
  lastApiCall: string | null;
  setSettings: (settings: Settings) => void;
  addSignal: (signal: Signal) => void;
  setIsScanning: (scanning: boolean) => void;
  incrementApiCalls: () => void;
  resetDailyApiCalls: () => void;
  clearSignals: () => void;
}