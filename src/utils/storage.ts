import { Settings } from '../types';

const SETTINGS_KEY = 'forex_signals_settings';
const SIGNALS_CACHE_KEY = 'forex_signals_cache';
const LAST_SCAN_KEY = 'forex_signals_last_scan';

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): Settings | null {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function saveSignalsCache(signals: any[]): void {
  localStorage.setItem(SIGNALS_CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: signals
  }));
}

export function loadSignalsCache(): { timestamp: number; data: any[] } | null {
  const stored = localStorage.getItem(SIGNALS_CACHE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function updateLastScanTime(): void {
  localStorage.setItem(LAST_SCAN_KEY, Date.now().toString());
}

export function getLastScanTime(): number | null {
  const stored = localStorage.getItem(LAST_SCAN_KEY);
  return stored ? parseInt(stored, 10) : null;
}

export function clearCache(): void {
  localStorage.removeItem(SIGNALS_CACHE_KEY);
  localStorage.removeItem(LAST_SCAN_KEY);
}