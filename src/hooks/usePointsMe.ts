import { useQuery } from '@tanstack/react-query'
import { getPointsMe } from '@/lib/api/points'

export default function usePointsMe() {
  return useQuery({
    queryKey: ['points', 'me'],
    queryFn: getPointsMe,
  })
}
