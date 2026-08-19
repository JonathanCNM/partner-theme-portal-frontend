import api from './api';
import { Partner, PartnerFormData } from '../types/Partner';

export const partnerService = {
  getAll: async (): Promise<Partner[]> => {
    const response = await api.get('/partners');
    return response.data.data;
  },

  getById: async (id: string): Promise<Partner> => {
    const response = await api.get(`/partners/${id}`);
    return response.data.data;
  },

  create: async (data: PartnerFormData): Promise<Partner> => {
    const formData = new FormData();
    formData.append('partnerId', data.partnerId);
    formData.append('name', data.name);

    if (data.logoType === 'url' && data.logoValue) {
      formData.append('logoType', 'url');
      formData.append('logoValue', data.logoValue);
    } else if (data.logoType === 'file' && data.logoFile) {
      formData.append('logo', data.logoFile);
    }

    if (data.logoWhiteType === 'url' && data.logoWhiteValue) {
      formData.append('logoWhiteType', 'url');
      formData.append('logoWhiteValue', data.logoWhiteValue);
    } else if (data.logoWhiteType === 'file' && data.logoWhiteFile) {
      formData.append('logoWhite', data.logoWhiteFile);
    }

    if (data.figmaLinks) {
      formData.append('figmaLinks', JSON.stringify(data.figmaLinks));
    }

    if (data.themeJson) {
      formData.append('themeJson', data.themeJson);
    }

    const response = await api.post('/partners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  update: async (id: string, data: Partial<PartnerFormData>): Promise<Partner> => {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);

    if (data.logoType === 'url' && data.logoValue) {
      formData.append('logoType', 'url');
      formData.append('logoValue', data.logoValue);
    } else if (data.logoType === 'file' && data.logoFile) {
      formData.append('logo', data.logoFile);
    }

    if (data.logoWhiteType === 'url' && data.logoWhiteValue) {
      formData.append('logoWhiteType', 'url');
      formData.append('logoWhiteValue', data.logoWhiteValue);
    } else if (data.logoWhiteType === 'file' && data.logoWhiteFile) {
      formData.append('logoWhite', data.logoWhiteFile);
    }

    if (data.figmaLinks) {
      formData.append('figmaLinks', JSON.stringify(data.figmaLinks));
    }

    if (data.themeJson) {
      formData.append('themeJson', data.themeJson);
    }

    const response = await api.put(`/partners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/partners/${id}`);
  },
};
