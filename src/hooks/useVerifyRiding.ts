import { useMutation } from '@tanstack/react-query'
import { verifyRiding } from '@/lib/api/riding'
import useRidingStore from '@/stores/ridingStore'
import type { ApiError } from '@/types/api'

export default function useVerifyRiding(options?: { onFailure?: () => void }) {
  const setVerified = useRidingStore((s) => s.setVerified)

  return useMutation({
    mutationFn: verifyRiding,
    onSuccess: (data) => {
      if (data.verified) {
        setVerified()
      } else {
        options?.onFailure?.()
      }
    },
    onError: (error: ApiError) => {
      console.error('[useVerifyRiding]', error.code, error.message)
      options?.onFailure?.()
    },
  })
}
