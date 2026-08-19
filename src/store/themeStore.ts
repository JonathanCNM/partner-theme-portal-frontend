import { create } from 'zustand';
import { Theme, ThemeFormData } from '../types/Theme';
import { themeService } from '../services/themeService';

interface ThemeState {
  themes: Theme[];
  selectedPartnerId: string | null;
  loading: boolean;
  error: string | null;
  fetchThemes: (partnerId?: string) => Promise<void>;
  fetchThemesByPartner: (partnerId: string) => Promise<void>;
  createTheme: (data: ThemeFormData) => Promise<void>;
  updateTheme: (id: string, data: Partial<ThemeFormData>) => Promise<void>;
  deleteTheme: (id: string) => Promise<void>;
  setSelectedPartnerId: (partnerId: string | null) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themes: [],
  selectedPartnerId: null,
  loading: false,
  error: null,

  fetchThemes: async (partnerId?: string) => {
    set({ loading: true, error: null });
    try {
      const themes = await themeService.getAll(partnerId);
      set({ themes, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchThemesByPartner: async (partnerId: string) => {
    set({ loading: true, error: null, selectedPartnerId: partnerId });
    try {
      const themes = await themeService.getByPartner(partnerId);
      set({ themes, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createTheme: async (data: ThemeFormData) => {
    set({ loading: true, error: null });
    try {
      const newTheme = await themeService.create(data);
      set((state) => ({
        themes: [newTheme, ...state.themes],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTheme: async (id: string, data: Partial<ThemeFormData>) => {
    set({ loading: true, error: null });
    try {
      const updatedTheme = await themeService.update(id, data);
      set((state) => ({
        themes: state.themes.map((t) =>
          t._id === id ? updatedTheme : t
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteTheme: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await themeService.delete(id);
      set((state) => ({
        themes: state.themes.filter((t) => t._id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  setSelectedPartnerId: (partnerId: string | null) => {
    set({ selectedPartnerId: partnerId });
  },
}));
