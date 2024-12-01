import { useState, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { fetchLatestNews } from '../services/news';
import { analyzeNews } from '../services/openai';
import { getCachedSignals, cacheSignals } from '../services/cache';
import { checkCostLimit, trackCost } from '../services/costTracker';

export function useForexAnalysis() {
  const { settings, setIsScanning, setSignals } = useStore();
  const [error, setError] = useState<string | null>(null);

  const scanMarkets = useCallback(async () => {
    setError(null);
    setIsScanning(true);

    try {
      if (!settings.apiKey) {
        throw new Error('OpenAI API key is required');
      }

      // Check cached signals first
      const cachedSignals = getCachedSignals();
      if (cachedSignals) {
        setSignals(cachedSignals);
        return;
      }

      // Check daily cost limit
      if (!checkCostLimit(settings.maxDailyCost)) {
        throw new Error('Daily cost limit exceeded');
      }

      const news = await fetchLatestNews(settings.maxSources);
      const signals = await analyzeNews(settings.apiKey, settings.model, news);
      
      if (signals.length > 0) {
        setSignals(signals);
        cacheSignals(signals);
        trackCost(1000); // Approximate token usage
      } else {
        throw new Error('No valid signals generated from the analysis');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSignals([]);
    } finally {
      setIsScanning(false);
    }
  }, [settings, setIsScanning, setSignals]);

  return { scanMarkets, error };
}