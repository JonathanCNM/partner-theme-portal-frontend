import api from './api';
import { Theme, ThemeFormData } from '../types/Theme';

export const themeService = {
  getAll: async (partnerId?: string): Promise<Theme[]> => {
    const params = partnerId ? { partnerId } : {};
    const response = await api.get('/themes', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Theme> => {
    const response = await api.get(`/themes/${id}`);
    return response.data.data;
  },

  getByPartner: async (partnerId: string): Promise<Theme[]> => {
    const response = await api.get(`/themes/partner/${partnerId}`);
    return response.data.data;
  },

  create: async (data: ThemeFormData): Promise<Theme> => {
    const response = await api.post('/themes', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<ThemeFormData>): Promise<Theme> => {
    const response = await api.put(`/themes/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/themes/${id}`);
  },

  exportAsJSON: async (id: string): Promise<any> => {
    const response = await api.get(`/themes/${id}/export`);
    return response.data.data;
  },

  importFromJSON: async (partnerId: string, themeData: any, name?: string, version?: 'legacy' | 'actual'): Promise<Theme> => {
    const response = await api.post('/themes/import', {
      partnerId,
      themeData,
      name,
      version,
    });
    return response.data.data;
  },

  getPublicTheme: async (partnerId: string): Promise<any> => {
    const response = await api.get(`/public/themes/${partnerId}`);
    return response.data.data;
  },
};
