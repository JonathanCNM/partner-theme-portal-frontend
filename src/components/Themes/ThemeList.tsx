import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { usePartnerStore } from '../../store/partnerStore';
import { Theme } from '../../types/Theme';
import { ThemeCard } from './ThemeCard';
import { ThemeForm } from './ThemeForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const ThemeList: React.FC = () => {
  const { themes, selectedPartnerId, loading, error, fetchThemes, fetchThemesByPartner, createTheme, updateTheme, deleteTheme, setSelectedPartnerId } = useThemeStore();
  const { partners, fetchPartners } = usePartnerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | undefined>();

  useEffect(() => {
    fetchPartners();
    fetchThemes();
  }, [fetchPartners, fetchThemes]);

  const handleCreate = async (data: any) => {
    await createTheme(data);
    setIsModalOpen(false);
  };

  const handleUpdate = async (data: any) => {
    if (editingTheme) {
      await updateTheme(editingTheme._id, data);
      setIsModalOpen(false);
      setEditingTheme(undefined);
    }
  };

  const handleDelete = async (theme: Theme) => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      try {
        await deleteTheme(theme._id);
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete theme');
      }
    }
  };

  const handleEdit = (theme: Theme) => {
    setEditingTheme(theme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTheme(undefined);
  };

  const handlePartnerFilter = (partnerId: string) => {
    if (partnerId === 'all') {
      setSelectedPartnerId(null);
      fetchThemes();
    } else {
      setSelectedPartnerId(partnerId);
      fetchThemesByPartner(partnerId);
    }
  };

  if (loading && themes.length === 0) {
    return <div className="text-center py-12">Loading themes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Themes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          + New Theme
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Partner
        </label>
        <select
          value={selectedPartnerId || 'all'}
          onChange={(e) => handlePartnerFilter(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Partners</option>
          {partners.map((partner) => (
            <option key={partner._id} value={partner.partnerId}>
              {partner.name}
            </option>
          ))}
        </select>
      </div>

      {themes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No themes found. Create your first theme to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme._id}
              theme={theme}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTheme ? 'Edit Theme' : 'Create Theme'}
      >
        <ThemeForm
          theme={editingTheme}
          initialPartnerId={selectedPartnerId || undefined}
          onSubmit={editingTheme ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
