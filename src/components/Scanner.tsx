import React from 'react';
import { Scan, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useMarketAnalysis } from '../hooks/useMarketAnalysis';

export const Scanner: React.FC = () => {
  const { isScanning } = useStore();
  const { scanMarkets, error } = useMarketAnalysis();

  return (
    <div className="flex flex-col items-center my-8">
      <button
        onClick={scanMarkets}
        disabled={isScanning}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg
          ${isScanning 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}
          text-white font-semibold transition-colors
        `}
      >
        <Scan className="w-5 h-5" />
        {isScanning ? 'Scanning Markets...' : 'Scan Markets'}
      </button>
      
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};