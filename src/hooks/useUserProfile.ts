import { useQuery } from '@tanstack/react-query'
import getUserProfile from '@/lib/api/user'

export default function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
  })
}
