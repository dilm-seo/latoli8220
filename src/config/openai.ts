import OpenAI from 'openai';

export function createOpenAIClient(apiKey: string): OpenAI {
  return new OpenAI({ 
    apiKey,
    dangerouslyAllowBrowser: true
  });
}

export const ANALYSIS_CONFIG = {
  temperature: 0.5,
  max_tokens: 1500,
  presence_penalty: 0.3,
  frequency_penalty: 0.5,
  top_p: 0.9
} as const;