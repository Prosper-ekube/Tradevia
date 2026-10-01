import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'

export function useLogout() {
  const navigate = useNavigate()
  const { clear } = useAuth()

  return async function logout() {
    try {
      await authService.logout()
    } catch {
      // token may already be invalid server-side; clear locally regardless
    }
    clear()
    navigate('/', { replace: true })
  }
}