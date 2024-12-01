import React from 'react';
import { Settings, ScanSearch } from 'lucide-react';
import { useStore } from './store';
import { SignalCard } from './components/SignalCard';
import { SettingsModal } from './components/SettingsModal';
import { EmptyState } from './components/EmptyState';
import { useMarketAnalysis } from './hooks/useMarketAnalysis';

function App() {
  const signals = useStore(state => state.signals);
  const [showSettings, setShowSettings] = React.useState(false);
  const { isScanning, error, scan } = useMarketAnalysis();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Signaux Forex IA
            </h1>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col items-center">
          <button
            onClick={scan}
            disabled={isScanning}
            className={`
              flex items-center px-6 py-3 rounded-lg text-white
              ${isScanning 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}
              transition-colors duration-200
            `}
          >
            <ScanSearch size={20} className="mr-2" />
            {isScanning ? 'Analyse en cours...' : 'Scanner les marchés'}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {signals.map((signal, index) => (
            <SignalCard key={index} signal={signal} />
          ))}
        </div>
        
        {signals.length === 0 && <EmptyState />}
      </main>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}

export default App;