import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Users, Target, Globe, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { login, signup, isLoading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let success = false;
    
    if (isLogin) {
      success = await login(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password. Please check your credentials or create an account.');
      }
    } else {
      const result = await signup(formData.name, formData.email, formData.password);
      success = result.success;
      if (!success && result.message) {
        setError(result.message);
      }
    }
    
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear error when user starts typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Left Section - Branding & Info */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
          {/* Logo & Branding */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Invisihome
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              AI-powered platform for sustainable urban development and inclusive cities
            </p>
          </div>

          {/* SDG 11 Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-3" />
              SDG 11: Sustainable Cities
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300">
                  Make cities and human settlements inclusive, safe, resilient and sustainable
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300">
                  Using AI/ML to identify underserved communities and promote urban inclusion
                </p>
              </div>
            </div>
          </div>

          {/* Project Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Data-Driven</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">Real urban datasets analysis</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">AI-Powered</h3>
              <p className="text-sm text-green-700 dark:text-green-400">Machine learning insights</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">Inclusive</h3>
              <p className="text-sm text-orange-700 dark:text-orange-400">Promoting urban equity</p>
            </div>
          </div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="w-full max-w-md flex items-center justify-center p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Enter your password"
                  required
                />
                {!isLogin && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters with uppercase, lowercase, number, and special character
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;