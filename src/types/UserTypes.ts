import type { ProfileDto } from './ProfileType'

export type UserType = {
  id: string
  cpf: string
  name: string
  email?: string
  gender?: string
  placeOfBirth?: string
  nationality?: string
  idProfile: number
}

export type UserCreationDto = {
  name: string
  cpf: string
  password: string
  email?: string
  placeOfBirth?: string
  nationality?: string
  idProfile: number
}

export type UserUpdateDto = {
  id: string
  cpf: string
  name: string
  email: string
  placeOfBirth?: string
  nationality?: string
}

export type UserResponseDto = {
  id: string
  cpf: string
  name: string
  email?: string
  placeOfBirth?: string
  nationality?: string
  profile: ProfileDto
}

export type LoginDto = {
  cpf: string
  password: string
}
