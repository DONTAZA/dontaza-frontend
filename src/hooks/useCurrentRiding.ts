import { useQuery } from '@tanstack/react-query'
import { getCurrentRiding } from '@/lib/api/riding'
import type { ApiError } from '@/types/api'

export default function useCurrentRiding() {
  return useQuery({
    queryKey: ['riding', 'current'],
    queryFn: getCurrentRiding,
    staleTime: 0,
    refetchOnMount: 'always',
    retry: (failureCount, error) => {
      if ((error as unknown as ApiError)?.code === 'R02') return false
      return failureCount < 1
    },
  })
}
