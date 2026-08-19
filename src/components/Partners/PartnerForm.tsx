import React, { useState, useRef } from 'react';
import { Partner, PartnerFormData } from '../../types/Partner';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { validateThemeJSON } from '../../utils/themeValidator';

interface PartnerFormProps {
  partner?: Partner;
  onSubmit: (data: PartnerFormData) => Promise<void>;
  onCancel: () => void;
}

export const PartnerForm: React.FC<PartnerFormProps> = ({
  partner,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    partnerId: partner?.partnerId || '',
    name: partner?.name || '',
    logoType: partner?.logo?.type || 'url',
    logoValue: partner?.logo?.type === 'url' ? partner.logo.value : '',
    logoWhiteType: partner?.logoWhite?.type || 'url',
    logoWhiteValue: partner?.logoWhite?.type === 'url' ? partner.logoWhite.value : '',
    figmaLinks: partner?.figmaLinks || [],
    themeJson: partner?.theme ? JSON.stringify({ font: partner.theme.font, colors: partner.theme.colors, styles: partner.theme.styles }, null, 2) : '',
  });

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFigmaLink = () => {
    setFormData({
      ...formData,
      figmaLinks: [...(formData.figmaLinks || []), { productName: '', url: '' }],
    });
  };

  const removeFigmaLink = (index: number) => {
    const newLinks = formData.figmaLinks?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, figmaLinks: newLinks });
  };

  const updateFigmaLink = (index: number, field: 'productName' | 'url', value: string) => {
    const newLinks = [...(formData.figmaLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, figmaLinks: newLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar tema si se proporciona
    if (formData.themeJson && formData.themeJson.trim()) {
      const validation = validateThemeJSON(formData.themeJson);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        return;
      }
    }
    
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFormData({ ...formData, themeJson: content });
      
      // Validar automáticamente
      const validation = validateThemeJSON(content);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
      } else {
        setValidationErrors([]);
      }
    };
    reader.readAsText(file);
  };

  const handleValidateTheme = () => {
    if (!formData.themeJson || !formData.themeJson.trim()) {
      setValidationErrors(['Please provide theme JSON']);
      return;
    }

    const validation = validateThemeJSON(formData.themeJson);
    if (validation.valid) {
      setValidationErrors([]);
      alert('✅ Theme JSON is valid!');
    } else {
      setValidationErrors(validation.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Partner ID *"
        value={formData.partnerId}
        onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
        required
        disabled={!!partner}
        placeholder="e.g., partner-123"
      />

      <Input
        label="Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        placeholder="Partner Name"
      />

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Logo</h3>
        <div className="space-y-3">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="logoType"
                value="url"
                checked={formData.logoType === 'url'}
                onChange={() => setFormData({ ...formData, logoType: 'url' })}
                className="mr-2"
              />
              URL
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="logoType"
                value="file"
                checked={formData.logoType === 'file'}
                onChange={() => setFormData({ ...formData, logoType: 'file' })}
                className="mr-2"
              />
              File Upload
            </label>
          </div>

          {formData.logoType === 'url' ? (
            <Input
              placeholder="https://example.com/logo.png"
              value={formData.logoValue || ''}
              onChange={(e) => setFormData({ ...formData, logoValue: e.target.value })}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, logoFile: e.target.files?.[0] })}
              className="w-full"
            />
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Logo White</h3>
        <div className="space-y-3">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="logoWhiteType"
                value="url"
                checked={formData.logoWhiteType === 'url'}
                onChange={() => setFormData({ ...formData, logoWhiteType: 'url' })}
                className="mr-2"
              />
              URL
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="logoWhiteType"
                value="file"
                checked={formData.logoWhiteType === 'file'}
                onChange={() => setFormData({ ...formData, logoWhiteType: 'file' })}
                className="mr-2"
              />
              File Upload
            </label>
          </div>

          {formData.logoWhiteType === 'url' ? (
            <Input
              placeholder="https://example.com/logo-white.png"
              value={formData.logoWhiteValue || ''}
              onChange={(e) => setFormData({ ...formData, logoWhiteValue: e.target.value })}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, logoWhiteFile: e.target.files?.[0] })}
              className="w-full"
            />
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">🎨 Figma Design Links</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addFigmaLink}
          >
            + Add Product
          </Button>
        </div>

        {formData.figmaLinks && formData.figmaLinks.length > 0 ? (
          <div className="space-y-3">
            {formData.figmaLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Product Name (e.g., Remesas, Request, Cashi)"
                    value={link.productName}
                    onChange={(e) => updateFigmaLink(index, 'productName', e.target.value)}
                  />
                  <Input
                    placeholder="Figma URL"
                    value={link.url}
                    onChange={(e) => updateFigmaLink(index, 'url', e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => removeFigmaLink(index)}
                  className="mt-1"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
            No Figma links added yet. Click "+ Add Product" to add one.
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">🎨 Theme Configuration</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800 mb-2">
            💡 <strong>Importar tema desde JSON</strong>
          </p>
          <p className="text-xs text-blue-700">
            Configura el tema en el <a href="https://lola-framweork-ui.vercel.app" target="_blank" rel="noopener noreferrer" className="underline">Storybook del UI Kit</a>, 
            copia el JSON y pégalo aquí, o sube un archivo .json o .txt
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme JSON (opcional)
            </label>
            <textarea
              value={formData.themeJson || ''}
              onChange={(e) => setFormData({ ...formData, themeJson: e.target.value })}
              placeholder='{"font": {...}, "colors": {...}, "styles": {...}}'
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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
              variant="secondary"
              onClick={handleValidateTheme}
            >
              ✓ Validate Theme JSON
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              📁 Import from File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : partner ? 'Update Partner' : 'Create Partner'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
