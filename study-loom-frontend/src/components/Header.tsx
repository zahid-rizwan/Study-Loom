import React, { useState } from 'react';
import { User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { darkMode, toggleDarkMode } = useStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      const button = document.getElementById('user-menu-button');
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-200">
      <div className="h-full px-4 flex items-center justify-end">
        <div className="relative">
          <button
            id="user-menu-button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center transition-all duration-200 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {user.name}
            </span>
          </button>

          {showDropdown && (
            <div
              id="user-dropdown"
              className="dropdown animate-fadeIn"
              style={{ animation: 'fadeIn 0.2s ease-out' }}
            >
              <button
                onClick={() => navigate('/profile')}
                className="dropdown-item w-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => toggleDarkMode()}
                className="dropdown-item w-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="dropdown-item w-full hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <button 
                onClick={handleLogout}
                className="dropdown-item w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;