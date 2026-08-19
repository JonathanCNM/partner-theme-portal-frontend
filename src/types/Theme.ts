export interface FontConfig {
  fontWeight: string;
  min: string;
  max: string;
  lineHeight: string;
}

export interface ThemeFont {
  h1: FontConfig;
  highlight: FontConfig;
  h2: FontConfig;
  bodycopy: FontConfig;
  secondaryCta: FontConfig;
  footerText: FontConfig;
  mainButtonText: FontConfig;
  step: FontConfig;
  fontfamily: string;
  fontcdn: string;
}

export interface ThemeColors {
  primaryGradient: string;
  secondaryGradient: string;
  secondaryColor: string;
  whiteColor: string;
  inactived: string;
  errorColor: string;
  partnerHighlights: string;
  gradientDeg: string;
  primaryGradientPoint: string;
  secundaryGradientPoint: string;
  primaryMesh: string;
  gradient: string;
  lightness: string;
  useSystemTheme: boolean;
  errorViewBackground?: string;
  specialViewBackground?: string;
  cardPanelBackground?: string;
  cardBackground?: string;
  cardBackgroundSecundary?: string;
}

export interface ThemeStyles {
  cardBorderRadius: string;
  buttonBorderRadius: string;
  inputBorderRadius: string;
  cardBorderColor: string;
  inputBorderColor: string;
  activeBorderBoton: string;
  tamañoBordeCard: string;
  tamañoBordeInput: string;
  buttonPadding: string;
  inputPadding: string;
  cardPadding: string;
  buttonSize: string;
  buttonShowIcon: boolean;
}

export interface Theme {
  _id: string;
  partnerId: string;
  version: 'legacy' | 'actual';
  name?: string;
  font: ThemeFont;
  colors: ThemeColors;
  styles?: ThemeStyles;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeFormData {
  partnerId: string;
  version: 'legacy' | 'actual';
  name?: string;
  font: ThemeFont;
  colors: ThemeColors;
  styles?: ThemeStyles;
}
