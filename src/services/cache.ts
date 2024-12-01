import type { ForexSignal } from '../types/forex';

const CACHE_KEY = 'forex-signals-cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  signals: ForexSignal[];
  timestamp: number;
}

export function getCachedSignals(): ForexSignal[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { signals, timestamp }: CacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    return isExpired ? null : signals;
  } catch {
    return null;
  }
}

export function cacheSignals(signals: ForexSignal[]): void {
  try {
    const entry: CacheEntry = {
      signals,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.error('Failed to cache signals:', error);
  }
}