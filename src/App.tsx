import React from 'react';
import { Scanner } from './components/Scanner';
import { SignalCard } from './components/SignalCard';
import { Settings } from './components/Settings';
import { useStore } from './store/useStore';

function App() {
  const { signals } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Forex Analysis</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-center">
              <Scanner />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signals.length > 0 ? (
                signals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-gray-500">
                    No signals available. Click the Scan button to analyze the markets.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Settings />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;