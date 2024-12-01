import React from 'react';
import { Signal } from '../types';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

interface SignalCardProps {
  signal: Signal;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const isBuy = signal.direction === 'buy';
  
  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      isBuy ? 'bg-green-50' : 'bg-red-50'
    } mb-4 transition-all hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{signal.pair}</h3>
        <div className={`flex items-center ${
          isBuy ? 'text-green-600' : 'text-red-600'
        }`}>
          {isBuy ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          <span className="ml-2 font-semibold">
            {isBuy ? 'ACHAT' : 'VENTE'}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              isBuy ? 'bg-green-600' : 'bg-red-600'
            }`}
            style={{ width: `${signal.confidence}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Confiance: {signal.confidence}%
        </p>
      </div>
      
      <p className="text-gray-700 mb-4">{signal.reason}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(signal.timestamp).toLocaleString()}</span>
        {signal.source && (
          <a
            href={signal.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            Source <ExternalLink size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};