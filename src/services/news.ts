import axios from 'axios';
import { NewsSource } from '../types/news';

const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Reuters Forex',
    url: 'https://www.reuters.com/markets/currencies',
    reliability: 0.95,
    category: 'TIER_1'
  },
  {
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com/markets/currencies',
    reliability: 0.95,
    category: 'TIER_1'
  },
  {
    name: 'Financial Times',
    url: 'https://www.ft.com/currencies',
    reliability: 0.9,
    category: 'TIER_1'
  },
  {
    name: 'Wall Street Journal',
    url: 'https://www.wsj.com/news/markets/currencies',
    reliability: 0.9,
    category: 'TIER_1'
  },
  {
    name: 'ForexLive',
    url: 'https://www.forexlive.com',
    reliability: 0.85,
    category: 'TIER_2'
  },
  {
    name: 'DailyFX',
    url: 'https://www.dailyfx.com/market-news',
    reliability: 0.85,
    category: 'TIER_2'
  },
  {
    name: 'FXStreet',
    url: 'https://www.fxstreet.com/news',
    reliability: 0.8,
    category: 'TIER_2'
  },
  {
    name: 'Investing.com',
    url: 'https://www.investing.com/currencies',
    reliability: 0.8,
    category: 'TIER_2'
  },
  {
    name: 'MarketWatch',
    url: 'https://www.marketwatch.com/markets/currencies',
    reliability: 0.8,
    category: 'TIER_2'
  }
];

// Mock news data for demonstration
const MOCK_NEWS_DATA = [
  {
    headline: "ECB signals potential rate cuts amid cooling inflation",
    source: "Reuters Forex",
    importance: "high"
  },
  {
    headline: "USD strengthens as Fed maintains hawkish stance",
    source: "Bloomberg",
    importance: "high"
  },
  {
    headline: "Japanese Yen weakens following BoJ policy meeting",
    source: "Financial Times",
    importance: "high"
  },
  {
    headline: "Swiss National Bank keeps rates steady, signals potential cuts",
    source: "Wall Street Journal",
    importance: "medium"
  },
  {
    headline: "Australian dollar falls on weak employment data",
    source: "ForexLive",
    importance: "medium"
  },
  {
    headline: "Bank of England hints at maintaining higher rates for longer",
    source: "DailyFX",
    importance: "high"
  },
  {
    headline: "Canadian dollar strengthens on rising oil prices",
    source: "FXStreet",
    importance: "medium"
  },
  {
    headline: "New Zealand's GDP growth beats expectations",
    source: "Investing.com",
    importance: "medium"
  }
];

export async function fetchLatestNews(maxSources: number): Promise<string[]> {
  // In a real application, we would:
  // 1. Use proper news APIs or web scraping
  // 2. Implement rate limiting
  // 3. Handle errors for each source
  // 4. Cache responses
  // 5. Filter by timestamp
  
  // For demo purposes, return filtered mock data
  return MOCK_NEWS_DATA
    .sort(() => Math.random() - 0.5) // Randomize news order
    .slice(0, maxSources) // Limit to maxSources
    .map(news => `[${news.source}] ${news.headline} (${news.importance})`);
}

export function getNewsSourceInfo(): NewsSource[] {
  return NEWS_SOURCES.map(({ name, url, reliability, category }) => ({
    name,
    url,
    reliability,
    category
  }));
}