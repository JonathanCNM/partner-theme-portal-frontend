import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemeVersionStore } from '@/store/themeVersionStore';
import { usePartnerStore } from '@/store/partnerStore';
import { Button } from '@/components/common/Button';

export const ThemeComparer: React.FC = () => {
  const { partnerId, version1Id, version2Id } = useParams<{ 
    partnerId: string; 
    version1Id: string; 
    version2Id: string; 
  }>();
  const navigate = useNavigate();
  const { currentComparison, loading, error, compareVersions, clearComparison, compareWithCurrent } = useThemeVersionStore();
  const { partners } = usePartnerStore();

  const partner = partners.find(p => p._id === partnerId);

  useEffect(() => {
    if (partnerId && version1Id && version2Id) {
      if (version2Id === 'current') {
        // Compare with current partner theme
        if (partner?.theme) {
          compareWithCurrent(partnerId, version1Id, partner.theme);
        }
      } else {
        compareVersions(partnerId, version1Id, version2Id);
      }
    }
    return () => {
      clearComparison();
    };
  }, [partnerId, version1Id, version2Id, partner]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderJsonDiff = (oldValue: any, newValue: any, label: string) => {
    const hasChanges = JSON.stringify(oldValue) !== JSON.stringify(newValue);
    
    if (!hasChanges && !oldValue && !newValue) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          {label}
          {hasChanges && (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
              Modified
            </span>
          )}
          {!hasChanges && (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              Unchanged
            </span>
          )}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Version {currentComparison?.version1.versionNumber} (Old)
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-auto text-xs border border-gray-200 dark:border-gray-700 max-h-96 font-mono">
              {JSON.stringify(oldValue, null, 2)}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {version2Id === 'current' ? 'Current Theme (Active)' : `Version ${currentComparison?.version2.versionNumber} (New)`}
            </p>
            <pre className="bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-blue-100 p-4 rounded-lg overflow-auto text-xs border-2 border-blue-200 dark:border-blue-800 max-h-96 font-mono">
              {JSON.stringify(newValue, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Comparing versions...</div>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button
          variant="secondary"
          onClick={() => navigate(`/partners/${partnerId}/theme-history`)}
        >
          ← Back to History
        </Button>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!currentComparison) {
    return null;
  }

  const hasAnyChanges = 
    JSON.stringify(currentComparison.changes.font.old) !== JSON.stringify(currentComparison.changes.font.new) ||
    JSON.stringify(currentComparison.changes.colors.old) !== JSON.stringify(currentComparison.changes.colors.new) ||
    JSON.stringify(currentComparison.changes.styles.old) !== JSON.stringify(currentComparison.changes.styles.new);

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="secondary"
          onClick={() => navigate(`/partners/${partnerId}/theme-history`)}
          className="mb-4"
        >
          ← Back to History
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Theme Version Comparison</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comparing changes between two theme versions
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold">
                v{currentComparison.version1.versionNumber}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Version {currentComparison.version1.versionNumber}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(currentComparison.version1.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                {version2Id === 'current' ? '⭐' : `v${currentComparison.version2.versionNumber}`}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {version2Id === 'current' ? 'Current Theme' : `Version ${currentComparison.version2.versionNumber}`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {version2Id === 'current' ? 'Active theme' : formatDate(currentComparison.version2.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!hasAnyChanges ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-center">
            <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No changes detected between these versions
          </div>
        ) : (
          <div className="space-y-6">
            {renderJsonDiff(
              currentComparison.changes.font.old,
              currentComparison.changes.font.new,
              '🔤 Font Configuration'
            )}
            {renderJsonDiff(
              currentComparison.changes.colors.old,
              currentComparison.changes.colors.new,
              '🎨 Color Palette'
            )}
            {renderJsonDiff(
              currentComparison.changes.styles.old,
              currentComparison.changes.styles.new,
              '✨ Styles Configuration'
            )}
          </div>
        )}
      </div>
    </div>
  );
};
