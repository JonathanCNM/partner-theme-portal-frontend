import React, { useState, useEffect, useRef } from 'react';
import { Theme, ThemeFormData } from '../../types/Theme';
import { usePartnerStore } from '../../store/partnerStore';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ColorPicker } from '../common/ColorPicker';
import { ThemePreview } from './ThemePreview';
import { validateThemeJSON } from '../../utils/themeValidator';

interface ThemeFormProps {
  theme?: Theme;
  initialPartnerId?: string;
  onSubmit: (data: ThemeFormData) => Promise<void>;
  onCancel: () => void;
}

export const ThemeForm: React.FC<ThemeFormProps> = ({
  theme,
  initialPartnerId,
  onSubmit,
  onCancel,
}) => {
  const { partners, fetchPartners } = usePartnerStore();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'fonts' | 'colors' | 'styles' | 'import'>('fonts');
  const [jsonInput, setJsonInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ThemeFormData>({
    partnerId: theme?.partnerId || initialPartnerId || '',
    version: theme?.version || 'actual',
    name: theme?.name || '',
    font: theme?.font || {
      h1: { fontWeight: '400', min: '1.75rem', max: '2rem', lineHeight: '1' },
      highlight: { fontWeight: '700', min: '1.75rem', max: '2rem', lineHeight: '0.95' },
      h2: { fontWeight: '600', min: '1rem', max: '1.15rem', lineHeight: 'normal' },
      bodycopy: { fontWeight: '400', min: '1rem', max: '1rem', lineHeight: 'normal' },
      secondaryCta: { fontWeight: '400', min: '0.74rem', max: '1rem', lineHeight: '1' },
      footerText: { fontWeight: '400', min: '0.75rem', max: '0.75rem', lineHeight: '1' },
      mainButtonText: { fontWeight: '600', min: '1rem', max: '1rem', lineHeight: 'normal' },
      step: { fontWeight: '600', min: '0.5rem', max: '0.875rem', lineHeight: '1' },
      fontfamily: 'Inter',
      fontcdn: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
    colors: theme?.colors || {
      primaryGradient: '#124734',
      secondaryGradient: '#124734',
      secondaryColor: '#212121',
      whiteColor: '#FFFFFF',
      inactived: '#D0DAD6',
      errorColor: '#E81C1C',
      partnerHighlights: '#fff',
      gradientDeg: '90deg',
      primaryGradientPoint: '0%',
      secundaryGradientPoint: '100%',
      primaryMesh: 'linear-gradient(90deg, #124734 0%, #124734 100%)',
      gradient: 'linear-gradient(90deg, #124734 0%, #124734 100%)',
      lightness: 'dark',
      useSystemTheme: false,
      errorViewBackground: '#051510',
      specialViewBackground: 'linear-gradient(90deg, #124734 0%, #124734 100%)',
      cardPanelBackground: 'transparent',
      cardBackground: '#eeeef1',
      cardBackgroundSecundary: '#17171c',
    },
    styles: theme?.styles || {
      cardBorderRadius: '16px',
      buttonBorderRadius: '99999px',
      inputBorderRadius: '8px',
      cardBorderColor: '#E4E4E4',
      inputBorderColor: '#E4E4E4',
      activeBorderBoton: '#1DAFA1',
      tamañoBordeCard: '1px',
      tamañoBordeInput: '1px',
      buttonPadding: '1rem',
      inputPadding: '0.75rem',
      cardPadding: '1.5rem',
      buttonSize: 'medium',
      buttonShowIcon: false,
    },
  });

  useEffect(() => {
    if (partners.length === 0) {
      fetchPartners();
    }
  }, [partners.length, fetchPartners]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = { ...formData };
      if (formData.version === 'legacy') {
        delete dataToSubmit.styles;
      }
      await onSubmit(dataToSubmit);
    } finally {
      setLoading(false);
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string;
        processJSONImport(jsonString);
      } catch (error) {
        setValidationErrors(['Error reading file']);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteJSON = () => {
    if (!jsonInput.trim()) {
      setValidationErrors(['Please paste JSON content']);
      return;
    }
    processJSONImport(jsonInput);
  };

  const processJSONImport = (jsonString: string) => {
    setValidationErrors([]);
    
    const validation = validateThemeJSON(jsonString);
    
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    if (validation.data) {
      setFormData({
        ...formData,
        version: validation.data.version,
        name: validation.data.name || formData.name,
        font: validation.data.font,
        colors: validation.data.colors,
        styles: validation.data.styles || formData.styles,
      });
      
      setJsonInput('');
      setValidationErrors([]);
      setActiveTab('fonts');
      alert('✅ Theme imported successfully!');
    }
  };

  const updateColors = (key: string, value: string | boolean) => {
    setFormData({
      ...formData,
      colors: { ...formData.colors, [key]: value },
    });
  };

  const updateStyles = (key: string, value: string | boolean) => {
    setFormData({
      ...formData,
      styles: { ...formData.styles!, [key]: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Partner *
          </label>
          <select
            value={formData.partnerId}
            onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
            required
            disabled={!!theme}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a partner</option>
            {partners.map((partner) => (
              <option key={partner._id} value={partner.partnerId}>
                {partner.name} ({partner.partnerId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Version *
          </label>
          <select
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value as 'legacy' | 'actual' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="actual">Actual (with styles)</option>
            <option value="legacy">Legacy (without styles)</option>
          </select>
        </div>
      </div>

      <Input
        label="Theme Name (optional)"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Summer Theme 2024"
      />

      <div className="border-t pt-4">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'import'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📥 Import JSON
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fonts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'fonts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fonts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'colors'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Colors
          </button>
          {formData.version === 'actual' && (
            <button
              type="button"
              onClick={() => setActiveTab('styles')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'styles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Styles
            </button>
          )}
        </div>

        {activeTab === 'import' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                💡 <strong>Tip:</strong> Copia el JSON del tema desde lola-framework-ui-test y pégalo aquí
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Theme JSON
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"font": {...}, "colors": {...}, "styles": {...}}'
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>

            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-red-800 mb-2">❌ Validation Errors:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handlePasteJSON}
                disabled={!jsonInput.trim()}
                className="flex-1"
              >
                ✓ Validate & Import Pasted JSON
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                📁 Or Upload File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Font Family"
                value={formData.font.fontfamily}
                onChange={(e) => setFormData({ ...formData, font: { ...formData.font, fontfamily: e.target.value } })}
              />
              <Input
                label="Font CDN URL"
                value={formData.font.fontcdn}
                onChange={(e) => setFormData({ ...formData, font: { ...formData.font, fontcdn: e.target.value } })}
              />
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <ColorPicker label="Primary Gradient" value={formData.colors.primaryGradient} onChange={(v) => updateColors('primaryGradient', v)} />
            <ColorPicker label="Secondary Gradient" value={formData.colors.secondaryGradient} onChange={(v) => updateColors('secondaryGradient', v)} />
            <ColorPicker label="Secondary Color" value={formData.colors.secondaryColor} onChange={(v) => updateColors('secondaryColor', v)} />
            <ColorPicker label="White Color" value={formData.colors.whiteColor} onChange={(v) => updateColors('whiteColor', v)} />
            <ColorPicker label="Inactived" value={formData.colors.inactived} onChange={(v) => updateColors('inactived', v)} />
            <ColorPicker label="Error Color" value={formData.colors.errorColor} onChange={(v) => updateColors('errorColor', v)} />
            <ColorPicker label="Partner Highlights" value={formData.colors.partnerHighlights} onChange={(v) => updateColors('partnerHighlights', v)} />
            
            {formData.version === 'actual' && (
              <>
                <ColorPicker label="Error View Background" value={formData.colors.errorViewBackground || ''} onChange={(v) => updateColors('errorViewBackground', v)} />
                <ColorPicker label="Card Background" value={formData.colors.cardBackground || ''} onChange={(v) => updateColors('cardBackground', v)} />
                <ColorPicker label="Card Background Secondary" value={formData.colors.cardBackgroundSecundary || ''} onChange={(v) => updateColors('cardBackgroundSecundary', v)} />
              </>
            )}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lightness</label>
              <select
                value={formData.colors.lightness}
                onChange={(e) => updateColors('lightness', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'styles' && formData.version === 'actual' && formData.styles && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <Input label="Card Border Radius" value={formData.styles.cardBorderRadius} onChange={(e) => updateStyles('cardBorderRadius', e.target.value)} />
            <Input label="Button Border Radius" value={formData.styles.buttonBorderRadius} onChange={(e) => updateStyles('buttonBorderRadius', e.target.value)} />
            <Input label="Input Border Radius" value={formData.styles.inputBorderRadius} onChange={(e) => updateStyles('inputBorderRadius', e.target.value)} />
            <ColorPicker label="Card Border Color" value={formData.styles.cardBorderColor} onChange={(v) => updateStyles('cardBorderColor', v)} />
            <ColorPicker label="Input Border Color" value={formData.styles.inputBorderColor} onChange={(v) => updateStyles('inputBorderColor', v)} />
            <ColorPicker label="Active Border Button" value={formData.styles.activeBorderBoton} onChange={(v) => updateStyles('activeBorderBoton', v)} />
            <Input label="Tamaño Borde Card" value={formData.styles.tamañoBordeCard} onChange={(e) => updateStyles('tamañoBordeCard', e.target.value)} />
            <Input label="Tamaño Borde Input" value={formData.styles.tamañoBordeInput} onChange={(e) => updateStyles('tamañoBordeInput', e.target.value)} />
            <Input label="Button Padding" value={formData.styles.buttonPadding} onChange={(e) => updateStyles('buttonPadding', e.target.value)} />
            <Input label="Input Padding" value={formData.styles.inputPadding} onChange={(e) => updateStyles('inputPadding', e.target.value)} />
            <Input label="Card Padding" value={formData.styles.cardPadding} onChange={(e) => updateStyles('cardPadding', e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Size</label>
              <select
                value={formData.styles.buttonSize}
                onChange={(e) => updateStyles('buttonSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.styles.buttonShowIcon}
                  onChange={(e) => updateStyles('buttonShowIcon', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Show Button Icon</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowPreview(!showPreview)}
          className="mb-4"
        >
          {showPreview ? 'Hide' : 'Show'} Preview
        </Button>
        {showPreview && <ThemePreview theme={{ ...theme, ...formData, _id: theme?._id || '', createdAt: '', updatedAt: '' } as Theme} />}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : theme ? 'Update Theme' : 'Create Theme'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
