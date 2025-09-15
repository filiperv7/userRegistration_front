import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { UserForm } from '../components/UserForm';
import UserService from '../services/UserService';
import { useAuthStore } from '../store/authStore';
import type { UserCreationDto } from '../types/UserTypes';

const initialValues: UserCreationDto = {
  cpf: '',
  name: '',
  email: '',
  gender: '',
  placeOfBirth: '',
  nationality: '',
  password: '',
  idProfile: 0,
};

export const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const register = async (values: UserCreationDto) => {
    try {
      const unformattedCpf = values.cpf.replace(/[.-]/g, '')

      await UserService.createUser({...values, cpf: unformattedCpf}, token!);
      navigate('/users');
    } catch (error) {
      alert('Erro ao registrar usuário. Verifique os dados e tente novamente.');
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-medium">Cadastrar Usuário</h1>
      <UserForm initialValues={initialValues} onSubmit={register} />
    </div>
  );
};
