import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import type { LoginDto } from '../types/UserTypes';
import AuthService from '../services/AuthService';
import { useAuthStore } from '../store/authStore';
import { formatCPF } from '../utils/formatterCpf';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const { setToken, setUser } = useAuthStore();

  const validationSchema = Yup.object().shape({
    cpf: Yup.string()
     .required('CPF é obrigatório')
     .matches(
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        'CPF deve estar no formato 000.000.000-00'
      ),
    password: Yup.string()
     .required('Senha é obrigatória')
     .min(8, 'Senha deve ter no mínimo 8 caracteres, contendo minúsculo, maiúsculo, números e caracter especial'),
  });

  const handleSubmit = async (values: LoginDto) => {
    try {
      const unformattedCpf = values.cpf.replace(/[.-]/g, '');
      const { token, status } = await AuthService.login({
       ...values,
        cpf: unformattedCpf,
      });

      if (status === 200) {
        setToken(token);

        const user = await AuthService.getLoggedUser(token);

        setUser(user);

        navigate('/users');
      } else {
        setError('Login falhou. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao realizar o login.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-5xl font-bold mb-8">
        Registro de Usuários
      </h2>

      <div className="flex justify-center items-center">
        <Formik
          initialValues={{ cpf: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor="cpf">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder="000.000.000-00"
                  value={values.cpf}
                  onChange={(e) => {
                    setFieldValue('cpf', formatCPF(e.target.value));
                  }}

                />
                <ErrorMessage
                  name="cpf"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor="password">
                  Senha
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg- text-white p-2 rounded-md w-full bg-blue-400 cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
