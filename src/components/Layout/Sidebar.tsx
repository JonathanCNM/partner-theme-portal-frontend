import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/partners', label: 'Partners', icon: '🤝' },
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-300 overflow-y-auto z-10">
      <div className="p-6 flex-1">
        <Link to="/" className="block mb-8 group">
          <div className="flex items-center gap-3 px-3 py-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-[1.02]">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🎨</span>
            </div>
            <div>
              <h2 className="font-bold text-white text-xl">Theme Portal</h2>
              <p className="text-xs text-blue-100 font-medium">Design System Hub</p>
            </div>
          </div>
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl text-xs font-bold shadow-md">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            DEVELOPMENT MODE
          </div>
        </div>

        <div className="mb-6">
          <ThemeToggle />
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">Navigation</p>
          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/50 transform scale-[1.02]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm hover:scale-[1.01]'
                  }`}
                >
                  <span className={`text-2xl transition-transform group-hover:scale-110 ${isActive ? '' : 'grayscale-[50%]'}`}>
                    {link.icon}
                  </span>
                  <span className="font-semibold">{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Quick Tip</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Generate themes in Storybook, then import them here for your partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
        <a
          href="https://lola-framweork-ui.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all group"
        >
          <span className="text-lg">🎨</span>
          <span>Open Storybook</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};
