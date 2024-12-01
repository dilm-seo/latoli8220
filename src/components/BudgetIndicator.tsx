import React from 'react';
import { DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency, calculateRemainingBudget } from '../utils/currencyUtils';

export const BudgetIndicator: React.FC = () => {
  const { budget, dailyCost } = useStore();
  const remaining = calculateRemainingBudget(budget, dailyCost);
  const percentage = (dailyCost / budget) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium">Daily Budget</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Spent: {formatCurrency(dailyCost)}</span>
          <span>Budget: {formatCurrency(budget)}</span>
        </div>
        
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full transition-all duration-300 rounded-full ${
              percentage > 90 ? 'bg-red-500' : 
              percentage > 70 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-600">
          Remaining: {formatCurrency(remaining)}
        </div>
      </div>
    </div>
  );
};