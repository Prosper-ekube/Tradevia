import { api } from './api'
import type { AuthResponse } from '@/types'

export interface Credentials {
  email: string
  password: string
}

export interface RegisterPayload extends Credentials {
  fullName: string
}

export const authService = {
  login: (payload: Credentials) => api.post<AuthResponse>('/auth/login/', payload),
  register: (payload: RegisterPayload) => api.post<AuthResponse>('/auth/register/', payload),
  logout: () => api.post<void>('/auth/logout/', {}),
}