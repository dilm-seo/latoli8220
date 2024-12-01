export type NewsCategory = 'TIER_1' | 'TIER_2';

export interface NewsSource {
  name: string;
  url: string;
  reliability: number;
  category: NewsCategory;
}

export interface NewsItem {
  headline: string;
  source: string;
  importance: 'high' | 'medium' | 'low';
  timestamp?: Date;
}