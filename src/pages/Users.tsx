import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { UserType } from '../types/UserTypes';
import UserService from '../services/UserService';
import { Header } from '../components/Header';
import { UserProfileFilter } from '../components/UserProfileFilter';
import { ListUsers } from '../components/ListUsers';

export const Users: React.FC = () => {
  const { token, user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        setLoading(true);
        const usersData: UserType[] =  []
        selectedProfile
         ? usersData.push(...await UserService.findUsersByProfile(selectedProfile, token))
          : usersData.push(...await UserService.getAllUsers(token));
        setUsers(usersData);
      } catch (err) {
        console.error('Falha ao buscar usuários:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedProfile, token, logout, navigate]);

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    try {
      await UserService.deleteUser(userId, token);
      setUsers((prevUsers) =>
        prevUsers ? prevUsers.filter((userItem) => userItem.id !== userId) : null
      );
    } catch (err) {
      console.error('Falha ao excluir usuário:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  const showAdminActions = user?.profile.id === 1;

  return (
    <div className="flex flex-col max-w-5xl mx-auto p-4">
      <Header />
      <div className="mt-8">
        {showAdminActions && (
          <UserProfileFilter
            selectedProfile={selectedProfile as number}
            setSelectedProfile={setSelectedProfile}
          />
        )}
        {users && (
          <ListUsers
            users={users}
            onEdit={(userId) => {
              navigate(`/edit-user/${userId}`);
            }}
            onDelete={handleDeleteUser}
            showAdminActions={showAdminActions}
          />
        )}
      </div>
    </div>
  );
};