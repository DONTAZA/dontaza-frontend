import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import getUserProfile from '@/lib/api/user'
import useAuthStore from '@/stores/authStore'

export default function useUserProfile() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setAuthenticated = useAuthStore((s) => s.login)
  const setUnauthenticated = useAuthStore((s) => s.logout)

  const query = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
    enabled: isAuthenticated !== false,
  })

  useEffect(() => {
    if (query.isSuccess) setAuthenticated()
    else if (query.isError) setUnauthenticated()
  }, [query.isSuccess, query.isError, setAuthenticated, setUnauthenticated])

  return query
}
