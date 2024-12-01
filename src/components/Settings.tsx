import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CostTracker } from './CostTracker';

export const Settings: React.FC = () => {
  const { settings, setSettings } = useStore();

  return (
    <div className="space-y-6">
      <CostTracker />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => setSettings({ apiKey: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="sk-..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <select
              value={settings.model}
              onChange={(e) => setSettings({ model: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Max Sources
            </label>
            <input
              type="number"
              value={settings.maxSources}
              onChange={(e) => setSettings({ maxSources: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Max Daily Cost ($)
            </label>
            <input
              type="number"
              value={settings.maxDailyCost}
              onChange={(e) => setSettings({ maxDailyCost: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};