import { useQuery } from '@tanstack/react-query'
import { getCurrentRiding } from '@/lib/api/riding'

export default function useCurrentRiding(enabled = true) {
  return useQuery({
    queryKey: ['riding', 'current'],
    queryFn: getCurrentRiding,
    enabled,
  })
}
