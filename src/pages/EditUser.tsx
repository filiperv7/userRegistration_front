import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { UserForm } from '../components/UserForm';
import UserService from '../services/UserService';
import { useAuthStore } from '../store/authStore';
import type { UserUpdateDto } from '../types/UserTypes';
import { formatCPF } from '../utils/formatterCpf';

export const EditUser: React.FC = () => {
  const [formValues, setFormValues] = useState<UserUpdateDto | null>(null);
  const { token, user } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      if (!id) {
        navigate('/users');
        return;
      }

      try {
        const userData = await UserService.findUserById(id, token);
        setFormValues({
          id: userData.id,
          cpf: formatCPF(userData.cpf),
          name: userData.name,
          email: userData.email,
          gender: userData.gender,
          placeOfBirth: userData.placeOfBirth,
          nationality: userData.nationality,
        });
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Usuário não encontrado ou erro ao carregar.');
        navigate('/users');
      }
    };

    fetchUserData();
  }, [id, token, navigate]);

  const edit = async (values: UserUpdateDto) => {
    try {
      const unformattedCpf = values.cpf.replace(/[.-]/g, '')

      await UserService.updateUser({...values, cpf: unformattedCpf}, token!);
      navigate('/users');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      alert('Erro ao editar usuário. Verifique os dados e tente novamente.');
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!formValues) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-medium">Editar Usuário</h1>
      <UserForm initialValues={formValues} onSubmit={edit} isEditMode />
    </div>
  );
};