import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemeVersionStore } from '@/store/themeVersionStore';
import { usePartnerStore } from '@/store/partnerStore';
import { Button } from '@/components/common/Button';
import { ThemeVersion } from '@/types/ThemeVersion';

export const ThemeHistory: React.FC = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const { versions, loading, error, fetchVersions, restoreVersion } = useThemeVersionStore();
  const { partners } = usePartnerStore();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const partner = partners.find(p => p._id === partnerId);

  useEffect(() => {
    if (partnerId) {
      fetchVersions(partnerId);
    }
  }, [partnerId, fetchVersions]);

  const handleRestore = async (versionId: string) => {
    if (!partnerId) return;
    if (window.confirm('Are you sure you want to restore this version? This will create a new version with the restored theme.')) {
      await restoreVersion(partnerId, versionId);
      await fetchVersions(partnerId);
      alert('Theme restored successfully!');
    }
  };

  const handleSelectVersion = (versionId: string) => {
    if (selectedVersion === versionId) {
      setSelectedVersion(null);
    } else {
      setSelectedVersion(versionId);
    }
  };

  const handleCompare = () => {
    if (selectedVersion && partnerId) {
      navigate(`/partners/${partnerId}/theme-history/compare/${selectedVersion}/current`);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && versions.length === 0) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading version history...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="secondary"
            onClick={() => navigate('/partners')}
            className="mb-4"
          >
            ← Back to Partners
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Theme Version History</h1>
          {partner && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Partner: <span className="font-semibold">{partner.name}</span> ({partner.partnerId})
            </p>
          )}
        </div>
        {selectedVersion && (
          <Button onClick={handleCompare} className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Compare with Current Theme
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {selectedVersion && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg">
          <p>Version selected. Click "Compare with Current Theme" to see differences with the active theme.</p>
        </div>
      )}

      {versions.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No version history found for this partner.
        </div>
      ) : (
        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version._id}
              className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${
                selectedVersion === version._id
                  ? 'border-blue-500 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-700'
              } shadow-sm hover:shadow-md transition-all p-6`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        v{version.versionNumber}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Version {version.versionNumber}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(version.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {version.changeDescription}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {version.metadata.changedFields.map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                      >
                        {field}
                      </span>
                    ))}
                    {version.lastUsedAt && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Last used: {formatDate(version.lastUsedAt)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant={selectedVersion === version._id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => handleSelectVersion(version._id)}
                    className="whitespace-nowrap"
                  >
                    {selectedVersion === version._id ? (
                      <>
                        <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Selected
                      </>
                    ) : (
                      'Select to Compare'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRestore(version._id)}
                    className="whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Restore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
