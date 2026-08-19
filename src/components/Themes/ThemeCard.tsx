import React from 'react';
import { Theme } from '../../types/Theme';
import { Button } from '../common/Button';
import { themeService } from '../../services/themeService';

interface ThemeCardProps {
  theme: Theme;
  onEdit: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onEdit,
  onDelete,
}) => {
  const handleExport = async () => {
    try {
      const themeJSON = await themeService.exportAsJSON(theme._id);
      const blob = new Blob([JSON.stringify(themeJSON, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theme-${theme.partnerId}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting theme:', error);
      alert('Failed to export theme');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">Partner: {theme.partnerId}</p>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            theme.version === 'actual' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {theme.version}
          </span>
        </div>
        {theme.name && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{theme.name}</h3>
        )}
        <div className="flex gap-2 flex-wrap">
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: theme.colors.primaryGradient }}
            title="Primary Gradient"
          />
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: theme.colors.secondaryGradient }}
            title="Secondary Gradient"
          />
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: theme.colors.partnerHighlights }}
            title="Partner Highlights"
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Font Family</p>
        <p className="text-base" style={{ fontFamily: theme.font.fontfamily }}>
          {theme.font.fontfamily}
        </p>
      </div>

      {theme.styles && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Styles</p>
          <p className="text-xs text-gray-500">
            Button: {theme.styles.buttonBorderRadius} | Card: {theme.styles.cardBorderRadius}
          </p>
        </div>
      )}

      <div className="text-sm text-gray-500 mb-4">
        <p>Lightness: <span className="font-medium">{theme.colors.lightness}</span></p>
        <p>Created: {new Date(theme.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(theme)}
        >
          Edit
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
        >
          Export JSON
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(theme)}
          className="col-span-2"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
