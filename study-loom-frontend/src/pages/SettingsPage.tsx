import React from 'react';
import { Settings, Bell, Moon, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
      </div>

      <div className="card divide-y dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="dark:text-white">Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="dark:text-white">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="dark:text-white">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Language</h2>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <select className="form-input">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;