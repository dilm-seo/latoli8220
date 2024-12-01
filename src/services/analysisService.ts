import type { NewsItem, AnalysisResult } from '../types';
import { CURRENCY_PAIRS } from './currencyPairs';
import { SENTIMENT_KEYWORDS } from './constants';

export function analyzeNewsImpact(news: NewsItem[]): AnalysisResult[] {
  return CURRENCY_PAIRS.map(pair => {
    const currencies = pair.symbol.split('/');
    const relevantNews = news.filter(item => {
      const title = item.title.toLowerCase();
      return currencies.some(currency => 
        title.includes(currency.toLowerCase()) ||
        title.includes('forex') ||
        title.includes('currency') ||
        title.includes('central bank') ||
        title.includes('interest rate')
      );
    });

    const sentiment = calculateSentiment(relevantNews);
    const confidence = calculateConfidence(relevantNews, pair.weight);

    return {
      pair: pair.symbol,
      sentiment,
      confidence,
      relevantNews
    };
  }).filter(result => result.relevantNews.length > 0);
}

function calculateSentiment(news: NewsItem[]): number {
  if (news.length === 0) return 0;

  return news.reduce((acc, item) => {
    const text = item.title.toLowerCase();
    const posScore = SENTIMENT_KEYWORDS.positive.reduce((score, word) => 
      score + (text.includes(word.toLowerCase()) ? 1 : 0), 0
    );
    const negScore = SENTIMENT_KEYWORDS.negative.reduce((score, word) => 
      score + (text.includes(word.toLowerCase()) ? 1 : 0), 0
    );
    
    // Weight recent news more heavily
    const timeWeight = calculateTimeWeight([item]);
    return acc + (posScore - negScore) * timeWeight;
  }, 0) / news.length;
}

function calculateConfidence(news: NewsItem[], pairWeight: number): number {
  if (news.length === 0) return 0;

  const baseConfidence = 40; // Lower base confidence
  const newsQuantityImpact = Math.min(news.length * 5, 30); // Max 30% from quantity
  const timeWeight = calculateTimeWeight(news);
  const sourceWeight = calculateSourceWeight(news);
  
  return Math.min(
    Math.round(
      baseConfidence + 
      newsQuantityImpact * pairWeight * timeWeight +
      sourceWeight * 20 // Source quality can add up to 20%
    ),
    100
  );
}

function calculateTimeWeight(news: NewsItem[]): number {
  if (news.length === 0) return 0;
  
  const now = new Date().getTime();
  const avgTimeAgo = news.reduce((acc, item) => 
    acc + (now - item.pubDate.getTime()), 0
  ) / news.length;
  
  // Sharper exponential decay for older news
  return Math.exp(-avgTimeAgo / (1800000)); // 30 minutes half-life
}

function calculateSourceWeight(news: NewsItem[]): number {
  const sourceCounts = news.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate diversity score (0-1)
  const diversity = Object.keys(sourceCounts).length / news.length;
  
  // Higher weight for more diverse sources
  return diversity;
}