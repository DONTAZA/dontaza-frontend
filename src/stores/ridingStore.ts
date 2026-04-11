import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RidingState {
  rentedAt: string | null
  start: (rentedAt: string) => void
  reset: () => void
}

const useRidingStore = create<RidingState>()(
  persist(
    (set) => ({
      rentedAt: null,
      start: (rentedAt) => set({ rentedAt }),
      reset: () => set({ rentedAt: null }),
    }),
    {
      name: 'riding-storage',
    },
  ),
)

export default useRidingStore
