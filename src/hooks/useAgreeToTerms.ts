import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { agreeToTerms } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'

export default function useAgreeToTerms() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      agreeToTerms({
        termsOfService: true,
        privacyPolicy: true,
        locationTerms: true,
      }),
    onSuccess: async () => {
      login()
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      navigate('/', { replace: true })
    },
  })
}
