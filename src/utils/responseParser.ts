import { v4 as uuidv4 } from 'uuid';
import type { ForexSignal, CurrencyPair, NewsReference } from '../types/forex';

interface OpenAISignal {
  pair: string;
  type: 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number;
  reason: string;
  sources: string[];
}

interface OpenAIResponse {
  signals: OpenAISignal[];
}

const VALID_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'USD/CAD',
  'AUD/USD',
  'NZD/USD'
] as const;

function parseNewsReference(source: string): NewsReference {
  // Example format: "[Reuters] ECB signals rate cuts (high)"
  const match = source.match(/\[(.*?)\] (.*?) \((.*?)\)/);
  if (!match) {
    return {
      source: 'Unknown',
      headline: source,
      importance: 'medium'
    };
  }

  return {
    source: match[1],
    headline: match[2],
    importance: match[3] as 'high' | 'medium' | 'low'
  };
}

export function parseOpenAIResponse(response: string): ForexSignal[] {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No valid JSON found in response');
      return [];
    }

    const jsonStr = jsonMatch[0];
    const parsed: OpenAIResponse = JSON.parse(jsonStr);
    
    if (!parsed.signals || !Array.isArray(parsed.signals)) {
      console.error('Invalid response structure: missing signals array');
      return [];
    }

    return parsed.signals
      .filter(signal => {
        const isValid = 
          VALID_PAIRS.includes(signal.pair as any) &&
          ['BUY', 'SELL', 'NEUTRAL'].includes(signal.type) &&
          typeof signal.confidence === 'number' &&
          signal.confidence >= 0 &&
          signal.confidence <= 100 &&
          typeof signal.reason === 'string' &&
          Array.isArray(signal.sources);

        if (!isValid) {
          console.error('Invalid signal format:', signal);
        }

        return isValid;
      })
      .map(signal => ({
        id: uuidv4(),
        pair: signal.pair as CurrencyPair,
        type: signal.type,
        confidence: signal.confidence,
        timestamp: new Date(),
        reason: signal.reason,
        sources: signal.sources.map(parseNewsReference)
      }));
  } catch (error) {
    console.error('Failed to parse OpenAI response:', error);
    return [];
  }
}