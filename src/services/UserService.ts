import axios from 'axios'
import type {
  UserCreationDto,
  UserType,
  UserUpdateDto
} from '../types/UserTypes'

const API_BASE_URL = import.meta.env.VITE_API_URL as string

class UserService {
  async getAllUsers(token: string): Promise<UserType[]> {
    const response = await axios.get(`${API_BASE_URL}/all`, {
      headers: {
        Authorization: token
      }
    })
    return response.data
  }

  async findUsersByProfile(
    profileId: number,
    token: string
  ): Promise<UserType[]> {
    const response = await axios.get(`${API_BASE_URL}/profile/${profileId}`, {
      headers: {
        Authorization: token
      }
    })
    return response.data
  }

  async findUserById(userId: string, token: string): Promise<UserType> {
    const response = await axios.get(`${API_BASE_URL}/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    return response.data
  }

  async createUser(
    userData: UserCreationDto,
    token: string
  ): Promise<UserType> {
    const response = await axios.post(`${API_BASE_URL}/create`, userData, {
      headers: {
        Authorization: token
      }
    })
    return response.data
  }

  async updateUser(userData: UserUpdateDto, token: string): Promise<UserType> {
    const response = await axios.put(`${API_BASE_URL}/update`, userData, {
      headers: {
        Authorization: token
      }
    })
    return response.data
  }

  async deleteUser(userId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${userId}`, {
      headers: {
        Authorization: token
      }
    })
  }
}

export default new UserService()
