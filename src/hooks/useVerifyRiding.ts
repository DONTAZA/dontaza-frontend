import { useQuery } from '@tanstack/react-query'
import { verifyRiding } from '@/lib/api/riding'

export default function useVerifyRiding(enabled = true) {
  return useQuery({
    queryKey: ['riding', 'verify'],
    queryFn: verifyRiding,
    enabled,
  })
}
