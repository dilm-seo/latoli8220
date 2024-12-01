import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { apiKey, budget, maxSources, setApiKey, setBudget, setMaxSources } = useStore();
  const [localApiKey, setLocalApiKey] = useState(apiKey || '');
  const [localBudget, setLocalBudget] = useState(budget);
  const [localMaxSources, setLocalMaxSources] = useState(maxSources);

  const handleSave = () => {
    setApiKey(localApiKey);
    setBudget(localBudget);
    setMaxSources(localMaxSources);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="sk-..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Budget (USD)
            </label>
            <input
              type="number"
              value={localBudget}
              onChange={(e) => setLocalBudget(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Sources per Analysis
            </label>
            <input
              type="number"
              value={localMaxSources}
              onChange={(e) => setLocalMaxSources(Number(e.target.value))}
              min="1"
              max="10"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};