import React, { useEffect, useState } from 'react';
import { usePartnerStore } from '../../store/partnerStore';
import { Partner } from '../../types/Partner';
import { PartnerCard } from './PartnerCard';
import { PartnerForm } from './PartnerForm';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const PartnerList: React.FC = () => {
  const { partners, loading, error, fetchPartners, createPartner, updatePartner, deletePartner } = usePartnerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleCreate = async (data: any) => {
    await createPartner(data);
    setIsModalOpen(false);
  };

  const handleUpdate = async (data: any) => {
    if (editingPartner) {
      await updatePartner(editingPartner._id, data);
      setIsModalOpen(false);
      setEditingPartner(undefined);
    }
  };

  const handleDelete = async (partner: Partner) => {
    if (window.confirm(`Are you sure you want to delete ${partner.name}?`)) {
      try {
        await deletePartner(partner._id);
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete partner');
      }
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPartner(undefined);
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.partnerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && partners.length === 0) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading partners...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Partners</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          + New Partner
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Search partners..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
      />

      {filteredPartners.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No partners found. Create your first partner to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner._id}
              partner={partner}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPartner ? 'Edit Partner' : 'Create Partner'}
      >
        <PartnerForm
          partner={editingPartner}
          onSubmit={editingPartner ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
