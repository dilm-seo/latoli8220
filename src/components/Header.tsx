import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Forex Analysis</h1>
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};