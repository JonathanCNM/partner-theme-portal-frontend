import { ThemeFormData } from '../types/Theme';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  data?: ThemeFormData;
}

export const validateThemeJSON = (json: string): ValidationResult => {
  const errors: string[] = [];

  try {
    const parsed = JSON.parse(json);

    // Validar estructura principal
    if (!parsed.font || typeof parsed.font !== 'object') {
      errors.push('Missing or invalid "font" section');
    }

    if (!parsed.colors || typeof parsed.colors !== 'object') {
      errors.push('Missing or invalid "colors" section');
    }

    // Validar font properties
    const requiredFontProps = ['h1', 'highlight', 'h2', 'bodycopy', 'secondaryCta', 'footerText', 'mainButtonText', 'step', 'fontfamily', 'fontcdn'];
    
    if (parsed.font) {
      const fontKeys = Object.keys(parsed.font);
      const missingFontProps = requiredFontProps.filter(prop => !fontKeys.includes(prop));
      
      if (missingFontProps.length > 0) {
        errors.push(`Missing font properties: ${missingFontProps.join(', ')}`);
      }

      // Validar que cada font type tenga las propiedades necesarias
      ['h1', 'highlight', 'h2', 'bodycopy', 'secondaryCta', 'footerText', 'mainButtonText', 'step'].forEach(type => {
        if (parsed.font[type]) {
          const required = ['fontWeight', 'min', 'max', 'lineHeight'];
          const missing = required.filter(prop => !parsed.font[type][prop]);
          if (missing.length > 0) {
            errors.push(`${type} is missing: ${missing.join(', ')}`);
          }
        }
      });
    }

    // Validar colors properties
    const requiredColorProps = ['primaryGradient', 'secondaryGradient', 'secondaryColor', 'whiteColor', 'inactived', 'errorColor', 'partnerHighlights', 'gradientDeg', 'primaryGradientPoint', 'secundaryGradientPoint', 'gradient', 'lightness', 'useSystemTheme'];
    
    if (parsed.colors) {
      const colorKeys = Object.keys(parsed.colors);
      const missingColorProps = requiredColorProps.filter(prop => !colorKeys.includes(prop));
      
      if (missingColorProps.length > 0) {
        errors.push(`Missing color properties: ${missingColorProps.join(', ')}`);
      }
    }

    // Detectar versión
    const hasStyles = parsed.styles && Object.keys(parsed.styles).length > 0;
    const version = hasStyles ? 'actual' : 'legacy';

    // Validar styles si existen
    if (hasStyles) {
      const requiredStyleProps = ['cardBorderRadius', 'buttonBorderRadius', 'inputBorderRadius', 'cardBorderColor', 'inputBorderColor', 'activeBorderBoton', 'buttonPadding', 'inputPadding', 'cardPadding', 'buttonSize', 'buttonShowIcon'];
      
      const styleKeys = Object.keys(parsed.styles);
      const missingStyleProps = requiredStyleProps.filter(prop => !styleKeys.includes(prop));
      
      if (missingStyleProps.length > 0) {
        errors.push(`Missing style properties: ${missingStyleProps.join(', ')}`);
      }
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      errors: [],
      data: {
        partnerId: '', // Se llenará en el form
        version,
        name: parsed.name || '',
        font: parsed.font,
        colors: parsed.colors,
        styles: parsed.styles,
      },
    };

  } catch (error: any) {
    return {
      valid: false,
      errors: [`Invalid JSON: ${error.message}`],
    };
  }
};
