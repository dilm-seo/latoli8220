import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import type { ForexSignal } from '../types';

const SignalCard: React.FC<{ signal: ForexSignal }> = ({ signal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{signal.pair}</h3>
          <div className="flex items-center gap-2 mt-1">
            {signal.type === 'BUY' ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={signal.type === 'BUY' ? 'text-green-500' : 'text-red-500'}>
              {signal.type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(signal.timestamp, { addSuffix: true })}
          </div>
          <div className="mt-1 text-sm font-medium">
            Confidence: {signal.confidence}%
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Local Analysis</span>
        </div>
        <div className="text-sm text-gray-600">
          <div>Sentiment: {signal.localAnalysis.sentiment.toFixed(2)}</div>
          <div>Initial Confidence: {signal.localAnalysis.confidence}%</div>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700">Related News:</h4>
        <ul className="mt-2 space-y-2">
          {signal.news.map((item, index) => (
            <li key={index} className="text-sm">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title}
              </a>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(item.pubDate, { addSuffix: true })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SignalList: React.FC = () => {
  const signals = useStore((state) => state.signals);

  if (signals.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No signals available. Start scanning to generate signals.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </div>
  );
};