import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { kakaoLogin } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'

export default function useKakaoLogin() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ code, redirectUri }: { code: string; redirectUri: string }) =>
      kakaoLogin(code, redirectUri),
    onSuccess: async () => {
      login()
      await queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      navigate('/', { replace: true })
    },
  })
}
