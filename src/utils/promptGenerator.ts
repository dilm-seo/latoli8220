export function generatePrompt(news: string[]): string {
  return `
You are a professional forex analyst. Based on the following news items, generate trading signals.

NEWS ITEMS:
${news.map((item, index) => `${index + 1}. ${item}`).join('\n')}

INSTRUCTIONS:
- Analyze each news item and its impact on major currency pairs
- Generate trading signals only for directly affected currency pairs
- Provide a confidence level based on the strength of the signal
- Include clear reasoning based on the news
- List the specific news sources that influenced each signal

RESPONSE FORMAT:
You must respond with a valid JSON object using this exact structure:
{
  "signals": [
    {
      "pair": "EUR/USD",
      "type": "BUY",
      "confidence": 85,
      "reason": "ECB's dovish stance on rates suggests potential euro weakness",
      "sources": [
        "[Reuters] ECB signals rate cuts (high)",
        "[Bloomberg] USD strengthens as Fed maintains hawkish stance (high)"
      ]
    }
  ]
}

RULES:
- "pair" must be one of: "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CAD", "AUD/USD", "NZD/USD"
- "type" must be exactly "BUY", "SELL", or "NEUTRAL"
- "confidence" must be a number between 0 and 100
- "reason" must be a clear, concise explanation
- "sources" must be an array of news items that influenced this signal
- Response must be valid JSON

Generate the analysis now:`;
}