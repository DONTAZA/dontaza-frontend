import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getErrorMessage, isApiError } from '@/lib/errorMessages'
import router from './router'

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      // 훅에서 onError를 지정한 경우엔 거기서 처리 → 글로벌 토스트 생략
      if (mutation.options.onError) return
      // 401은 client.ts가 /login 리다이렉트로 처리
      if (isApiError(error) && error.status === 401) return
      toast.error(getErrorMessage(error))
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default function Providers() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
