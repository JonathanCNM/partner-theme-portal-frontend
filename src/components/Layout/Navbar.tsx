import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Theme Portal</h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/partners"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Partners
            </Link>
            <Link
              to="/themes"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Themes
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};
