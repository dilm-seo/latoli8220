import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Scanner } from './components/Scanner';
import { SignalList } from './components/SignalList';
import { Settings } from './components/Settings';
import { BudgetIndicator } from './components/BudgetIndicator';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-6">
            <BudgetIndicator />
          </div>
          <Scanner />
          <SignalList />
        </main>
        <Settings 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;