import { ArrowLeftIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Modal } from './Modal'

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const firstName = user?.name.split(' ').shift()
  const lastName = user?.name.split(' ').pop()
  let userName = firstName
  if (user?.name.split(' ')!= undefined && user?.name.split(' ').length!= 1)
    userName = `${firstName} ${lastName}`

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const handleBackClick = () => {
    if (location.pathname!== '/users') {
      navigate('/users')
    } else {
      setIsLogoutModalOpen(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-between w-full p-4 mb-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <ArrowLeftIcon
            size={23}
            weight="bold"
            className="text-gray-800 mr-3 cursor-pointer"
            onClick={handleBackClick}
          />
          <h2 className="text-2xl font-bold">
            Registro de Usuários
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex flex-col items-end text-sm">
            <span>
              Bem-vindo(a), <span className="font-bold">{userName}</span>!
            </span>
          </p>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      {user?.profile.id === 1 && (
        <div className="flex w-full justify-start mt-4">
          <a
            href="/users/create"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Cadastrar Novo Usuário
          </a>
        </div>
      )}

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirmar Saída"
        onConfirm={handleLogout}
      />
    </div>
  )
}