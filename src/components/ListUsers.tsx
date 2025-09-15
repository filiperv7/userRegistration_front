import React, { useState } from 'react';
import type { UserType } from '../types/UserTypes';
import { Modal } from './Modal';
import { formatCPF } from '../utils/formatterCpf';

interface ListUsersProps {
  users: UserType[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  showAdminActions: boolean;
}

export const ListUsers: React.FC<ListUsersProps> = ({
  users,
  onEdit,
  onDelete,
  showAdminActions,
}) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const confirmDelete = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalDeleteOpen(true);
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      onDelete(selectedUserId);
    }
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-medium pb-2">Lista de Usuários</h1>
      <div className="flex flex-col space-y-2">
        {users.map((user) => (
          <div
            key={String(user.id)}
            className="border border-gray-300 rounded p-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm text-gray-500">
                CPF: {formatCPF(user.cpf)} | Perfil: {user.profile.id === 1 ? 'Admin' : 'User'}
              </p>
            </div>
            {showAdminActions && (
              <div>
                <button
                  onClick={() => onEdit(user.id)}
                  className="text-blue-500 hover:underline mr-2 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => confirmDelete(user.id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Confirmar Exclusão"
        onConfirm={handleDelete}
      />
    </>
  );
};
