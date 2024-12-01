import type { CurrencyPair } from '../types';

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { symbol: 'EUR/USD', name: 'Euro/US Dollar', weight: 1.0 },
  { symbol: 'GBP/USD', name: 'British Pound/US Dollar', weight: 0.9 },
  { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', weight: 0.9 },
  { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', weight: 0.8 },
  { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', weight: 0.8 },
  { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', weight: 0.8 }
];