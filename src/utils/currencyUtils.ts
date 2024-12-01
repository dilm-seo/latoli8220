export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(amount);
}

export function calculateRemainingBudget(budget: number, spent: number): number {
  return Math.max(0, budget - spent);
}