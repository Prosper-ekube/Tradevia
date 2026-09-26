import { api } from './api'

export interface Credentials {
  email: string
  password: string
}

export interface RegisterPayload extends Credentials {
  fullName: string
}

export const authService = {
  login: (payload: Credentials) => api.post<{ token: string }>('/auth/login/', payload),
  register: (payload: RegisterPayload) => api.post<{ token: string }>('/auth/register/', payload),
}
