export type SignalType = 'BUY' | 'SELL';

export type NewsSource = {
  name: string;
  tier: 1 | 2;
  score: number;
  url: string;
  type: 'rss' | 'api';
};

export type NewsItem = {
  title: string;
  link: string;
  pubDate: Date;
  source: string;
};

export type CurrencyPair = {
  symbol: string;
  name: string;
  weight: number;
};

export type AnalysisResult = {
  pair: string;
  sentiment: number;
  confidence: number;
  relevantNews: NewsItem[];
};

export type ForexSignal = {
  id: string;
  pair: string;
  type: SignalType;
  confidence: number;
  sources: NewsSource[];
  timestamp: Date;
  news: NewsItem[];
  localAnalysis: AnalysisResult;
};