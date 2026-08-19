import { create } from 'zustand';
import { ThemeVersion, ThemeComparison } from '../types/ThemeVersion';
import { themeVersionService } from '../services/themeVersionService';

interface ThemeVersionState {
  versions: ThemeVersion[];
  currentComparison: ThemeComparison | null;
  loading: boolean;
  error: string | null;
  fetchVersions: (partnerId: string) => Promise<void>;
  compareVersions: (partnerId: string, version1Id: string, version2Id: string) => Promise<void>;
  restoreVersion: (partnerId: string, versionId: string) => Promise<void>;
  clearComparison: () => void;
}

export const useThemeVersionStore = create<ThemeVersionState>((set) => ({
  versions: [],
  currentComparison: null,
  loading: false,
  error: null,

  fetchVersions: async (partnerId: string) => {
    set({ loading: true, error: null });
    try {
      const versions = await themeVersionService.getVersions(partnerId);
      set({ versions, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch versions',
        loading: false 
      });
    }
  },

  compareVersions: async (partnerId: string, version1Id: string, version2Id: string) => {
    set({ loading: true, error: null });
    try {
      const comparison = await themeVersionService.compareVersions(partnerId, version1Id, version2Id);
      set({ currentComparison: comparison, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to compare versions',
        loading: false 
      });
    }
  },

  restoreVersion: async (partnerId: string, versionId: string) => {
    set({ loading: true, error: null });
    try {
      await themeVersionService.restoreVersion(partnerId, versionId);
      set({ loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to restore version',
        loading: false 
      });
    }
  },

  clearComparison: () => set({ currentComparison: null }),
}));
