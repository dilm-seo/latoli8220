import axios from 'axios';
import type { NewsSource, NewsItem } from '../types';
import { newsCache } from './newsCache';
import { SENTIMENT_KEYWORDS } from './constants';

const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Reuters Forex',
    tier: 1,
    score: 0.95,
    url: 'https://www.reutersagency.com/feed/?best-topics=foreign-exchange-fixed-income',
    type: 'rss'
  },
  {
    name: 'FXStreet',
    tier: 1,
    score: 0.9,
    url: 'https://www.fxstreet.com/rss',
    type: 'rss'
  },
  {
    name: 'ForexLive',
    tier: 2,
    score: 0.85,
    url: 'https://www.forexlive.com/feed',
    type: 'rss'
  }
];

async function fetchNewsFromSource(source: NewsSource): Promise<NewsItem[]> {
  try {
    const response = await axios.get(source.url);
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, 'text/xml');
    const items = xml.querySelectorAll('item');

    return Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      pubDate: new Date(item.querySelector('pubDate')?.textContent || ''),
      source: source.name
    })).filter(item => {
      // Filter out irrelevant news by checking for currency-related keywords
      const title = item.title.toLowerCase();
      return (
        title.includes('forex') ||
        title.includes('currency') ||
        title.includes('eur') ||
        title.includes('usd') ||
        title.includes('gbp') ||
        title.includes('jpy') ||
        title.includes('rate') ||
        title.includes('central bank') ||
        Object.values(SENTIMENT_KEYWORDS).flat().some(keyword => 
          title.includes(keyword.toLowerCase())
        )
      );
    });
  } catch (error) {
    console.error(`Error fetching news from ${source.name}:`, error);
    return [];
  }
}

export async function fetchLatestNews(maxSources: number): Promise<NewsItem[]> {
  const cacheKey = `news-${maxSources}`;
  const cachedNews = newsCache.get(cacheKey);
  
  if (cachedNews) {
    return cachedNews;
  }

  const newsPromises = NEWS_SOURCES
    .slice(0, maxSources)
    .map(source => fetchNewsFromSource(source));

  try {
    const results = await Promise.allSettled(newsPromises);
    const news = results
      .flatMap(result => 
        result.status === 'fulfilled' ? result.value : []
      )
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
      .slice(0, 20);

    if (news.length > 0) {
      newsCache.set(cacheKey, news);
      return news;
    }

    throw new Error('No relevant news found from any source');
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch latest news');
  }
}

export function getNewsSources(): NewsSource[] {
  return NEWS_SOURCES;
}