import OpenAI from 'openai';
import { Signal } from '../types';
import { NEWS_SOURCES } from '../config/sources';
import { ANALYSIS_CONFIG, createOpenAIClient } from '../config/openai';
import { parseSignalResponse } from './parser';
import { APIKeyError, AnalysisError } from './errors';
import { fetchLatestNews } from './news';

const SYSTEM_PROMPT = `Vous êtes un expert en analyse des marchés Forex. En tant qu'analyste financier expérimenté, votre tâche est de :

1. Analyser les actualités économiques des sources fournies
2. Identifier les opportunités de trading sur les paires de devises majeures
3. Générer des signaux de trading précis au format suivant :

PAIR: [Code de la paire de devises, ex: EUR/USD]
DIRECTION: [ACHAT ou VENTE]
CONFIDENCE: [Niveau de confiance 0-100]
REASON: [Explication détaillée basée sur l'actualité]
SOURCE: [Source de l'information]

Vos analyses doivent être :
- Objectives et basées sur des faits
- Justifiées par des événements économiques récents
- Accompagnées d'un niveau de confiance réaliste
- Limitées aux paires majeures : EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD
- Basées sur des indicateurs économiques clés : taux d'intérêt, PIB, inflation, emploi, décisions des banques centrales
- Prendre en compte l'impact des événements géopolitiques majeurs`;

export async function analyzeMarketNews(apiKey: string, model: string): Promise<Signal[]> {
  if (!apiKey) {
    throw new APIKeyError();
  }

  try {
    const openai = createOpenAIClient(apiKey);
    const newsData = await fetchLatestNews();
    const analysisContext = formatAnalysisContext(newsData);

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Analysez les dernières actualités économiques et générez des signaux de trading pertinents.
                   
                   Actualités récentes:
                   ${analysisContext}
                   
                   Générez au moins 3 signaux de trading avec des explications détaillées.
                   Pour chaque signal, citez la source d'information principale et expliquez l'impact attendu sur la paire de devises.`
        }
      ],
      ...ANALYSIS_CONFIG
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new AnalysisError("La réponse de l'API est vide");
    }

    const signals = parseSignalResponse(content);
    if (signals.length === 0) {
      throw new AnalysisError("Aucun signal n'a pu être généré à partir de l'analyse");
    }

    return signals;
  } catch (error) {
    if (error instanceof APIKeyError || error instanceof AnalysisError) {
      throw error;
    }
    
    console.error('Erreur OpenAI:', error);
    throw new AnalysisError("Erreur lors de l'analyse des marchés");
  }
}

function formatAnalysisContext(newsData: any[]): string {
  return newsData
    .map(item => `[${item.source}] ${item.title}\n${item.summary}\n`)
    .join('\n');
}