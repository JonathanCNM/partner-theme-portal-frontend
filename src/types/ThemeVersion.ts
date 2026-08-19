export interface ThemeVersion {
  _id: string;
  partnerId: string;
  versionNumber: number;
  theme: {
    version: 'legacy' | 'actual';
    font: any;
    colors: any;
    styles?: any;
  };
  changeDescription: string;
  lastUsedAt?: string;
  metadata: {
    changedFields: string[];
    userAgent?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ThemeComparison {
  version1: {
    id: string;
    versionNumber: number;
    createdAt: string;
  };
  version2: {
    id: string;
    versionNumber: number;
    createdAt: string;
  };
  changes: {
    font: {
      old: any;
      new: any;
    };
    colors: {
      old: any;
      new: any;
    };
    styles: {
      old: any;
      new: any;
    };
  };
}
