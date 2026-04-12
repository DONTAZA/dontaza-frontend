import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { agreeToTerms } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'
import type { ApiError } from '@/types/api'

export default function useAgreeToTerms() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => agreeToTerms(),
    onSuccess: async () => {
      login()
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      navigate('/', { replace: true })
    },
    onError: (error: ApiError) => {
      console.error('[useAgreeToTerms]', error.code, error.message)
      // TODO: show error toast
    },
  })
}
