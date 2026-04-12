import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { withdraw } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'
import type { ApiError } from '@/types/api'

export default function useWithdraw() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      navigate('/login', { replace: true })
    },
    onError: (error: ApiError) => {
      console.error('[useWithdraw]', error.code, error.message)
      // TODO: show error toast
    },
  })
}
