import React from 'react';
import { Settings } from '../types';
import { useStore } from '../store';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, setSettings, dailyApiCalls } = useStore();
  const [localSettings, setLocalSettings] = React.useState<Settings>(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Paramètres</h2>
          <button onClick={onClose} className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clé API OpenAI
            </label>
            <input
              type="password"
              value={localSettings.apiKey}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                apiKey: e.target.value
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modèle
            </label>
            <select
              value={localSettings.model}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                model: e.target.value
              })}
              className="w-full p-2 border rounded-md"
            >
              <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre maximum de sites
            </label>
            <input
              type="number"
              value={localSettings.maxSites}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                maxSites: parseInt(e.target.value)
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coût maximum journalier ($)
            </label>
            <input
              type="number"
              value={localSettings.maxDailyCost}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                maxDailyCost: parseInt(e.target.value)
              })}
              className="w-full p-2 border rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              Appels API aujourd'hui: {dailyApiCalls}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durée du cache (minutes)
            </label>
            <input
              type="number"
              value={localSettings.cacheTimeout}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                cacheTimeout: parseInt(e.target.value)
              })}
              className="w-full p-2 border rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              Les signaux seront mis en cache pendant cette durée
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};