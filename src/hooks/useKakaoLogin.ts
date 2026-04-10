import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { kakaoLogin } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'

export function useKakaoLogin() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: (authorizationCode: string) => kakaoLogin(authorizationCode),
    onSuccess: ({ accessToken, refreshToken, user }) => {
      login(accessToken, refreshToken, user)
      navigate('/')
    },
  })
}
