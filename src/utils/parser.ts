import { Signal } from '../types';

interface ParsedSignal {
  pair?: string;
  direction?: 'buy' | 'sell';
  confidence?: number;
  reason?: string;
  timestamp?: string;
}

export function parseSignalResponse(content: string): Signal[] {
  const signals: Signal[] = [];
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
  
  let currentSignal: ParsedSignal = {};
  
  for (const line of lines) {
    if (line.startsWith('PAIR:')) {
      if (isValidSignal(currentSignal)) {
        signals.push(currentSignal as Signal);
      }
      currentSignal = {
        pair: line.split('PAIR:')[1].trim(),
        timestamp: new Date().toISOString()
      };
    } else if (line.startsWith('DIRECTION:')) {
      currentSignal.direction = line.toLowerCase().includes('achat') ? 'buy' : 'sell';
    } else if (line.startsWith('CONFIDENCE:')) {
      const confidenceMatch = line.match(/\d+/);
      if (confidenceMatch) {
        currentSignal.confidence = Math.min(100, Math.max(0, parseInt(confidenceMatch[0], 10)));
      }
    } else if (line.startsWith('REASON:')) {
      currentSignal.reason = line.split('REASON:')[1].trim();
    }
  }
  
  if (isValidSignal(currentSignal)) {
    signals.push(currentSignal as Signal);
  }
  
  return signals;
}

function isValidSignal(signal: ParsedSignal): boolean {
  return Boolean(
    signal.pair &&
    signal.direction &&
    typeof signal.confidence === 'number' &&
    signal.reason &&
    signal.timestamp
  );
}