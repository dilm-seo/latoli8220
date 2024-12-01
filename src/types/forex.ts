export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF' | 'AUD' | 'CAD' | 'NZD';

export type CurrencyPair = `${Currency}/${Currency}`;

export type SignalType = 'BUY' | 'SELL' | 'NEUTRAL';

export interface NewsReference {
  source: string;
  headline: string;
  importance: 'high' | 'medium' | 'low';
}

export interface ForexSignal {
  id: string;
  pair: CurrencyPair;
  type: SignalType;
  confidence: number;
  timestamp: Date;
  reason: string;
  sources: NewsReference[];
}

export interface Settings {
  apiKey: string;
  model: 'gpt-4' | 'gpt-3.5-turbo';
  maxSources: number;
  maxDailyCost: number;
}