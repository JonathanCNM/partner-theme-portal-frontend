import { create } from 'zustand';
import { Partner, PartnerFormData } from '../types/Partner';
import { partnerService } from '../services/partnerService';

interface PartnerState {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  fetchPartners: () => Promise<void>;
  createPartner: (data: PartnerFormData) => Promise<void>;
  updatePartner: (id: string, data: Partial<PartnerFormData>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
}

export const usePartnerStore = create<PartnerState>((set) => ({
  partners: [],
  loading: false,
  error: null,

  fetchPartners: async () => {
    set({ loading: true, error: null });
    try {
      const partners = await partnerService.getAll();
      set({ partners, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createPartner: async (data: PartnerFormData) => {
    set({ loading: true, error: null });
    try {
      const newPartner = await partnerService.create(data);
      set((state) => ({
        partners: [newPartner, ...state.partners],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePartner: async (id: string, data: Partial<PartnerFormData>) => {
    set({ loading: true, error: null });
    try {
      const updatedPartner = await partnerService.update(id, data);
      set((state) => ({
        partners: state.partners.map((p) =>
          p._id === id ? updatedPartner : p
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deletePartner: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await partnerService.delete(id);
      set((state) => ({
        partners: state.partners.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
