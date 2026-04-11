import { useMutation } from '@tanstack/react-query'
import { rentBike } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import type { RentRequest } from '@/types/riding'
import type { ApiError } from '@/types/api'

export default function useStartRide() {
  const startRiding = useRidingStore((s) => s.start)

  return useMutation({
    mutationFn: (body: RentRequest) => rentBike(body),
    onSuccess: (data) => {
      startRiding(data.ridingId, new Date().toISOString())
    },
    onError: (error: ApiError) => {
      console.error('[useStartRide]', error.code, error.message)
    },
  })
}
