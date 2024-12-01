import React from 'react';
import { DollarSign } from 'lucide-react';
import { getDailyCost } from '../services/costTracker';
import { useStore } from '../store/useStore';

export const CostTracker: React.FC = () => {
  const { settings } = useStore();
  const dailyCost = getDailyCost();
  const costPercentage = (dailyCost / settings.maxDailyCost) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Cost Tracker</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Daily Usage</span>
          <span>${dailyCost.toFixed(3)}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all"
            style={{ width: `${Math.min(costPercentage, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>${settings.maxDailyCost}</span>
        </div>
      </div>
    </div>
  );
};