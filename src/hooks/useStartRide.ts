import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rentBike } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import type { RentRequest } from '@/types/riding'

export default function useStartRide() {
  const startRiding = useRidingStore((s) => s.start)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: RentRequest) => rentBike(body),
    onSuccess: () => {
      startRiding(new Date().toISOString())
      void queryClient.invalidateQueries({ queryKey: ['riding', 'current'] })
    },
  })
}
