import { useMutation, useQueryClient } from '@tanstack/react-query'
import { returnBike } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import type { ReturnRequest } from '@/types/riding'
import type { ApiError } from '@/types/api'

export default function useEndRide() {
  const resetRiding = useRidingStore((s) => s.reset)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: ReturnRequest) => returnBike(body),
    onSuccess: () => {
      resetRiding()
      void queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
    onError: (error: ApiError) => {
      console.error('[useEndRide]', error.code, error.message)
    },
  })
}
