import React from 'react';
import { Scan } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useForexAnalysis } from '../hooks/useForexAnalysis';

export const Scanner: React.FC = () => {
  const { isScanning } = useStore();
  const { scanMarkets, error } = useForexAnalysis();

  return (
    <div className="space-y-4">
      <button
        onClick={scanMarkets}
        disabled={isScanning}
        className={`
          flex items-center justify-center gap-2 px-6 py-3 
          rounded-lg font-semibold text-white
          transition-all duration-200
          ${
            isScanning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }
        `}
      >
        <Scan className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
        {isScanning ? 'Scanning...' : 'Scan Markets'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};