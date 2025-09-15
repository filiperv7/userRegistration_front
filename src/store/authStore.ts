import { create } from 'zustand'
import type { UserType } from '../types/UserTypes'

interface AuthState {
  token: string | null
  user: UserType | null
  setToken: (token: string) => void
  setUser: (user: UserType) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  token: localStorage.getItem('token'),
  user: null,

  setToken: token => {
    localStorage.setItem('token', token)
    set({ token })
  },

  setUser: user => {
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  }
}))
