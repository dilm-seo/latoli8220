import React from 'react';
import { Newspaper } from 'lucide-react';
import { NEWS_SOURCES } from '../config/sources';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="flex justify-center mb-4">
        <Newspaper size={48} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Aucun signal disponible
      </h3>
      <p className="text-gray-500 mb-6">
        Lancez une analyse pour obtenir des signaux basés sur l'actualité économique
      </p>
      
      <div className="max-w-2xl mx-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Sources d'information analysées :
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {NEWS_SOURCES.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{source.name}</h5>
                <p className="text-sm text-gray-500">
                  Fiabilité: {Math.round(source.reliability * 100)}%
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};