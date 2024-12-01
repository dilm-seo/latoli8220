import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { ForexSignal } from '../types/forex';
import { formatDistanceToNow } from 'date-fns';

interface SignalCardProps {
  signal: ForexSignal;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const [expanded, setExpanded] = React.useState(false);

  const getSignalIcon = () => {
    switch (signal.type) {
      case 'BUY':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'SELL':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sourcesCount = signal.sources?.length ?? 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{signal.pair}</h3>
        {getSignalIcon()}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Signal</span>
          <span className={`font-medium ${
            signal.type === 'BUY' ? 'text-green-600' : 
            signal.type === 'SELL' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {signal.type}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Confidence</span>
          <span className="font-medium">{signal.confidence}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Time</span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(signal.timestamp), { addSuffix: true })}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-4">{signal.reason}</p>

        {sourcesCount > 0 && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Sources
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show Sources ({sourcesCount})
                </>
              )}
            </button>

            {expanded && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">News Sources:</h4>
                {signal.sources.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {source.source}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(source.importance)}`}>
                        {source.importance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{source.headline}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};