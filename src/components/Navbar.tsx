import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Home, BarChart3, Info, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Invisihome</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/about"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/about')
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>About SDG 11</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;