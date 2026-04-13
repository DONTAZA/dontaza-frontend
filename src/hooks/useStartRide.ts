import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { rentBike } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import { getErrorMessage, isApiError } from '@/lib/errorMessages'
import type { RentRequest } from '@/types/riding'
import type { ApiError } from '@/types/api'

export default function useStartRide() {
  const startRiding = useRidingStore((s) => s.start)
  const allowRestore = useRidingStore((s) => s.allowRestore)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: RentRequest) => rentBike(body),
    onSuccess: () => {
      startRiding(new Date().toISOString())
      void queryClient.invalidateQueries({ queryKey: ['riding', 'current'] })
    },
    onError: (error: ApiError) => {
      if (isApiError(error) && error.code === 'R01') {
        console.error('[useStartRide] R01 - 이미 진행 중인 라이딩 존재, 복원 시도')
        allowRestore()
        void queryClient.invalidateQueries({ queryKey: ['riding', 'current'] })
        return
      }
      toast.error(getErrorMessage(error))
    },
  })
}
