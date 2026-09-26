import { api } from './api'
import type { ContactPayload } from '@/types'

export const contactService = {
  async submit(payload: ContactPayload): Promise<{ success: boolean }> {
    await api.post('/contact/', payload)
    return { success: true }
  },
}
