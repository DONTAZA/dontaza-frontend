import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { kakaoLogin } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'

export default function useKakaoLogin() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: ({ code, redirectUri }: { code: string; redirectUri: string }) =>
      kakaoLogin(code, redirectUri),
    onSuccess: ({ accessToken, refreshToken, user }) => {
      login(accessToken, refreshToken, user)
      navigate('/')
    },
  })
}
