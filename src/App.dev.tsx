import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Partners } from './pages/Partners';
import { ThemeHistory } from './pages/ThemeHistory';
import { ThemeComparer } from './pages/ThemeComparer';
import { ThemeInitializer } from './components/common/ThemeInitializer';

// Versión sin autenticación para desarrollo
function App() {
  return (
    <BrowserRouter>
      <ThemeInitializer />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Sidebar />
        <div className="ml-72">
          <main className="p-8">
            <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partners/:partnerId/theme-history" element={<ThemeHistory />} />
              <Route path="/partners/:partnerId/theme-history/compare/:version1Id/:version2Id" element={<ThemeComparer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
