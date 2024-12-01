import { NewsItem } from '../types';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry {
  timestamp: number;
  data: NewsItem[];
}

class NewsCache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map();
  }

  set(key: string, data: NewsItem[]): void {
    this.cache.set(key, {
      timestamp: Date.now(),
      data,
    });
  }

  get(key: string): NewsItem[] | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const newsCache = new NewsCache();