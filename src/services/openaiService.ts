import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import type { ForexSignal, SignalType, NewsItem, AnalysisResult } from '../types';
import { getNewsSources } from './newsService';
import { analyzeNewsImpact } from './analysisService';

interface AnalysisResponse {
  pair: string;
  type: SignalType;
  confidence: number;
  reasoning: string;
}

export async function analyzeMarketData(
  apiKey: string,
  news: NewsItem[]
): Promise<ForexSignal> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  // Perform initial analysis using local service
  const localAnalysis = analyzeNewsImpact(news);
  const mostConfidentPair = localAnalysis.reduce((prev, curr) => 
    curr.confidence > prev.confidence ? curr : prev
  );

  const newsContext = mostConfidentPair.relevantNews
    .map(item => `${item.title} (Published: ${item.pubDate.toISOString()})`)
    .join('\n');

  const prompt = `Analyze these recent forex market news items for ${mostConfidentPair.pair}:
    ${newsContext}
    
    Local Analysis Results:
    - Sentiment Score: ${mostConfidentPair.sentiment}
    - Confidence Level: ${mostConfidentPair.confidence}%
    
    Based on this data, provide a trading signal in JSON format:
    {
      "pair": "${mostConfidentPair.pair}",
      "type": "BUY or SELL based on analysis",
      "confidence": "Number between 0-100 indicating confidence level",
      "reasoning": "Brief explanation including key factors and potential risks"
    }`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 300
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}') as AnalysisResponse;

    return {
      id: uuidv4(),
      pair: response.pair,
      type: response.type,
      confidence: response.confidence,
      sources: getNewsSources(),
      timestamp: new Date(),
      news: mostConfidentPair.relevantNews,
      localAnalysis: mostConfidentPair
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze market data');
  }
}