import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { returnBike } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import type { ReturnRequest } from '@/types/riding'

export default function useEndRide() {
  const resetRiding = useRidingStore((s) => s.reset)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: ReturnRequest) => returnBike(body),
    onSuccess: (data) => {
      resetRiding()
      toast.success(`${data.earnedPoints} 포인트 적립되었습니다.`)
      void queryClient.invalidateQueries({ queryKey: ['points', 'me'] })
      void queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}
