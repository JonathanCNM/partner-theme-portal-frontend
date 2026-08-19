import api from './api';
import { ThemeVersion, ThemeComparison } from '../types/ThemeVersion';

export const themeVersionService = {
  // Obtener todas las versiones de un partner
  getVersions: async (partnerId: string) => {
    const response = await api.get(`/theme-versions/${partnerId}/versions`);
    return response.data.data as ThemeVersion[];
  },

  // Obtener una versión específica
  getVersion: async (partnerId: string, versionId: string) => {
    const response = await api.get(`/theme-versions/${partnerId}/versions/${versionId}`);
    return response.data.data as ThemeVersion;
  },

  // Comparar dos versiones
  compareVersions: async (partnerId: string, version1Id: string, version2Id: string) => {
    const response = await api.get(`/theme-versions/${partnerId}/versions/compare/${version1Id}/${version2Id}`);
    return response.data.data as ThemeComparison;
  },

  // Marcar versión como usada
  markAsUsed: async (partnerId: string, versionId: string) => {
    const response = await api.put(`/theme-versions/${partnerId}/versions/${versionId}/use`);
    return response.data.data as ThemeVersion;
  },

  // Restaurar una versión
  restoreVersion: async (partnerId: string, versionId: string) => {
    const response = await api.post(`/theme-versions/${partnerId}/versions/${versionId}/restore`);
    return response.data.data;
  },
};
