import { NEWS_SOURCES } from '../config/sources';

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  timestamp: string;
}

export async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const newsPromises = NEWS_SOURCES.map(async source => {
      try {
        const response = await fetch(source.url);
        if (!response.ok) {
          console.warn(`Erreur lors de la récupération des news depuis ${source.name}`);
          return [];
        }
        
        const text = await response.text();
        const newsItems = extractNewsItems(text, source);
        return newsItems;
      } catch (error) {
        console.warn(`Erreur pour ${source.name}:`, error);
        return [];
      }
    });

    const allNews = await Promise.all(newsPromises);
    return allNews
      .flat()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return [];
  }
}

function extractNewsItems(html: string, source: typeof NEWS_SOURCES[0]): NewsItem[] {
  // Utilisation d'expressions régulières simples pour extraire les titres et résumés
  const titleRegex = /<h1[^>]*>(.*?)<\/h1>|<h2[^>]*>(.*?)<\/h2>/g;
  const summaryRegex = /<p[^>]*>(.*?)<\/p>/g;
  
  const titles = [...html.matchAll(titleRegex)]
    .map(match => match[1] || match[2])
    .filter(Boolean)
    .map(title => title.replace(/<[^>]*>/g, ''))
    .slice(0, 5);

  const summaries = [...html.matchAll(summaryRegex)]
    .map(match => match[1])
    .filter(Boolean)
    .map(summary => summary.replace(/<[^>]*>/g, ''))
    .slice(0, 5);

  return titles.map((title, index) => ({
    title,
    summary: summaries[index] || '',
    source: source.name,
    url: source.url,
    timestamp: new Date().toISOString()
  }));
}