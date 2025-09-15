import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserType } from '../types/UserTypes'

interface AuthState {
  token: string | null
  user: UserType | null
  setToken: (token: string) => void
  setUser: (user: UserType) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,

      setToken: token => {
        set({ token })
      },

      setUser: user => {
        set({ user })
      },

      logout: () => {
        set({ token: null, user: null })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
