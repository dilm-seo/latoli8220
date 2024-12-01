import OpenAI from 'openai';
import type { ForexSignal } from '../types/forex';
import { generatePrompt } from '../utils/promptGenerator';
import { parseOpenAIResponse } from '../utils/responseParser';

export async function analyzeNews(
  apiKey: string,
  model: string,
  news: string[]
): Promise<ForexSignal[]> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const prompt = generatePrompt(news);
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional forex analyst. Always respond with valid JSON following the exact format specified in the prompt.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5, // Reduced for more consistent formatting
      max_tokens: 1000,
      response_format: { type: "json_object" } // Ensure JSON response
    });

    return parseOpenAIResponse(response.choices[0].message.content || '');
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze forex news. Please check your API key and try again.');
  }
}