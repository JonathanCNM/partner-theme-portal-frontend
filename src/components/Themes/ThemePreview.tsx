import React from 'react';
import { Theme } from '../../types/Theme';

interface ThemePreviewProps {
  theme: Theme;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const gradient = `linear-gradient(${theme.colors.gradientDeg}, ${theme.colors.primaryGradient} ${theme.colors.primaryGradientPoint}, ${theme.colors.secondaryGradient} ${theme.colors.secundaryGradientPoint})`;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Theme Preview</h3>
      
      <div
        className="rounded-lg p-8 mb-4"
        style={{ background: gradient }}
      >
        <h1
          style={{
            fontFamily: theme.font.fontfamily,
            fontWeight: theme.font.h1.fontWeight,
            fontSize: theme.font.h1.max,
            lineHeight: theme.font.h1.lineHeight,
            color: theme.colors.whiteColor,
          }}
        >
          Heading 1
        </h1>
        <h2
          style={{
            fontFamily: theme.font.fontfamily,
            fontWeight: theme.font.h2.fontWeight,
            fontSize: theme.font.h2.max,
            lineHeight: theme.font.h2.lineHeight,
            color: theme.colors.whiteColor,
            marginTop: '1rem',
          }}
        >
          Heading 2
        </h2>
        <p
          style={{
            fontFamily: theme.font.fontfamily,
            fontWeight: theme.font.bodycopy.fontWeight,
            fontSize: theme.font.bodycopy.max,
            lineHeight: theme.font.bodycopy.lineHeight,
            color: theme.colors.whiteColor,
            marginTop: '1rem',
          }}
        >
          This is body copy text to demonstrate the theme typography.
        </p>
        <span
          style={{
            display: 'inline-block',
            fontFamily: theme.font.fontfamily,
            fontWeight: theme.font.highlight.fontWeight,
            fontSize: theme.font.highlight.max,
            lineHeight: theme.font.highlight.lineHeight,
            color: theme.colors.partnerHighlights,
            marginTop: '1rem',
          }}
        >
          Highlighted Text
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-gray-600 mb-1">Primary</p>
          <div
            className="h-12 rounded border"
            style={{ backgroundColor: theme.colors.primaryGradient }}
          />
          <p className="text-xs mt-1">{theme.colors.primaryGradient}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Secondary</p>
          <div
            className="h-12 rounded border"
            style={{ backgroundColor: theme.colors.secondaryGradient }}
          />
          <p className="text-xs mt-1">{theme.colors.secondaryGradient}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Highlights</p>
          <div
            className="h-12 rounded border"
            style={{ backgroundColor: theme.colors.partnerHighlights }}
          />
          <p className="text-xs mt-1">{theme.colors.partnerHighlights}</p>
        </div>
      </div>
    </div>
  );
};
