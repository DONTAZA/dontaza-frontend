import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { logout } from '@/lib/api/auth'
import useAuthStore from '@/stores/authStore'
import type { ApiError } from '@/types/api'

export default function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.logout)

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth()
      navigate('/login')
    },
    onError: (error: ApiError) => {
      console.error('[useLogout]', error.code, error.message)
      // 서버 에러여도 로컬 인증 상태는 제거
      clearAuth()
      navigate('/login')
    },
  })
}
