export interface FigmaLink {
  productName: string;
  url: string;
  _id?: string;
}

export interface Partner {
  _id: string;
  partnerId: string;
  name: string;
  logo?: {
    type: 'url' | 'file';
    value: string;
  };
  logoWhite?: {
    type: 'url' | 'file';
    value: string;
  };
  figmaLinks?: FigmaLink[];
  theme?: {
    version: 'legacy' | 'actual';
    font: any;
    colors: any;
    styles?: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PartnerFormData {
  partnerId: string;
  name: string;
  logoType?: 'url' | 'file';
  logoValue?: string;
  logoFile?: File;
  logoWhiteType?: 'url' | 'file';
  logoWhiteValue?: string;
  logoWhiteFile?: File;
  figmaLinks?: FigmaLink[];
  themeJson?: string;
}
