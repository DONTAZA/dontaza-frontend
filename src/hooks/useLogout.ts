import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { logout } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'
import type { ApiError } from '@/types/api'

export default function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    clearAuth()
    queryClient.clear()
    navigate('/login', { replace: true })
  }

  return useMutation({
    mutationFn: logout,
    onSuccess: handleLogout,
    onError: (error: ApiError) => {
      console.error('[useLogout]', error.code, error.message)
      handleLogout()
    },
  })
}
