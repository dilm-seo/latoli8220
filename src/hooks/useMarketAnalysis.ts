import { useState, useCallback } from 'react';
import { Signal } from '../types';
import { analyzeMarketNews } from '../utils/openai';
import { APIKeyError, AnalysisError } from '../utils/errors';
import { useStore } from '../store';
import { 
  loadSignalsCache, 
  saveSignalsCache, 
  updateLastScanTime, 
  getLastScanTime 
} from '../utils/storage';

interface AnalysisState {
  isScanning: boolean;
  error: string | null;
  scan: () => Promise<void>;
}

const MINUTE = 60 * 1000;

export function useMarketAnalysis(): AnalysisState {
  const { 
    settings, 
    setIsScanning, 
    addSignal, 
    dailyApiCalls,
    incrementApiCalls,
    clearSignals
  } = useStore();
  const [error, setError] = useState<string | null>(null);

  const checkCacheValidity = useCallback(() => {
    const lastScan = getLastScanTime();
    if (!lastScan) return false;

    const elapsed = Date.now() - lastScan;
    return elapsed < settings.cacheTimeout * MINUTE;
  }, [settings.cacheTimeout]);

  const loadCache = useCallback(() => {
    const cache = loadSignalsCache();
    if (cache && cache.data.length > 0) {
      clearSignals();
      cache.data.forEach(addSignal);
      return true;
    }
    return false;
  }, [addSignal, clearSignals]);

  const scan = async () => {
    setError(null);
    setIsScanning(true);

    try {
      if (dailyApiCalls >= settings.maxDailyCost) {
        throw new Error("Limite quotidienne d'appels API atteinte");
      }

      if (checkCacheValidity() && loadCache()) {
        setIsScanning(false);
        return;
      }

      const signals = await analyzeMarketNews(settings.apiKey, settings.model);
      
      clearSignals();
      signals.forEach(addSignal);
      
      saveSignalsCache(signals);
      updateLastScanTime();
      incrementApiCalls();

    } catch (err) {
      if (err instanceof APIKeyError || err instanceof AnalysisError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue s'est produite");
        console.error(err);
      }
    } finally {
      setIsScanning(false);
    }
  };

  return {
    isScanning: useStore(state => state.isScanning),
    error,
    scan
  };
}