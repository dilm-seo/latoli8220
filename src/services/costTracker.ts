const COST_TRACKER_KEY = 'forex-cost-tracker';

interface CostEntry {
  date: string;
  cost: number;
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function getStoredCosts(): CostEntry[] {
  try {
    const stored = localStorage.getItem(COST_TRACKER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getDailyCost(): number {
  const today = getTodayKey();
  const costs = getStoredCosts();
  const todayEntry = costs.find(entry => entry.date === today);
  return todayEntry?.cost || 0;
}

export function trackCost(tokens: number): void {
  const today = getTodayKey();
  const costs = getStoredCosts().filter(entry => entry.date === today);
  
  // Approximate cost calculation (adjust based on actual OpenAI pricing)
  const cost = tokens * 0.000002; // $0.002 per 1K tokens
  
  const todayEntry = costs[0] || { date: today, cost: 0 };
  todayEntry.cost += cost;
  
  localStorage.setItem(COST_TRACKER_KEY, JSON.stringify([todayEntry]));
}

export function checkCostLimit(maxDailyCost: number): boolean {
  const currentCost = getDailyCost();
  return currentCost < maxDailyCost;
}