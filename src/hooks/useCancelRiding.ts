import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cancelRiding } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import { getErrorMessage } from '@/lib/errorMessages'
import type { ApiError } from '@/types/api'

interface Options {
  onSuccess?: () => void
}

export default function useCancelRiding(options?: Options) {
  const resetRiding = useRidingStore((s) => s.reset)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => cancelRiding(),
    onSuccess: () => {
      resetRiding()
      void queryClient.invalidateQueries({ queryKey: ['riding', 'current'] })
      options?.onSuccess?.()
    },
    onError: (error: ApiError) => {
      toast.error(getErrorMessage(error))
    },
  })
}
