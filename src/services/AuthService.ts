import axios, { AxiosError } from 'axios'
import type { LoginDto, UserType } from '../types/UserTypes'

class AuthService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL as string
  }

  async login(loginDto: LoginDto): Promise<{ token: string; status: number }> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, loginDto)
      return { token: response.data.token, status: response.status }
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        return { token: '', status: axiosError.response.status }
      }
      throw new Error('Ocorreu um erro inesperado ao realizar o login.')
    }
  }

  async getLoggedUser(token: string): Promise<UserType> {
    const response = await axios.get(`${this.baseUrl}/infos_of_logged_user`, {
      headers: {
        Authorization: token
      }
    })

    return response.data
  }
}

export default new AuthService()
