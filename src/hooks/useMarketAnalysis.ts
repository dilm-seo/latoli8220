import { useState } from 'react';
import { useStore } from '../store/useStore';
import { fetchLatestNews } from '../services/newsService';
import { analyzeMarketData } from '../services/openaiService';

export function useMarketAnalysis() {
  const { 
    apiKey, 
    maxSources, 
    budget, 
    dailyCost,
    setDailyCost,
    addSignal,
    setScanning 
  } = useStore();
  const [error, setError] = useState<string | null>(null);

  const scanMarkets = async () => {
    if (!apiKey) {
      setError('Please set your OpenAI API key in settings');
      return;
    }

    if (dailyCost >= budget) {
      setError('Daily budget exceeded');
      return;
    }

    setError(null);
    setScanning(true);

    try {
      const news = await fetchLatestNews(maxSources);
      
      if (news.length === 0) {
        throw new Error('No recent news available');
      }

      const signal = await analyzeMarketData(apiKey, news);
      
      // Estimate cost (this is a simplified calculation)
      const estimatedCost = 0.002; // $0.002 per API call
      setDailyCost(dailyCost + estimatedCost);
      
      addSignal(signal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setScanning(false);
    }
  };

  return { scanMarkets, error };
}