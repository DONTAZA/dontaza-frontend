import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RidingState {
  ridingId: number | null
  rentedAt: string | null
  start: (ridingId: number, rentedAt: string) => void
  reset: () => void
}

const useRidingStore = create<RidingState>()(
  persist(
    (set) => ({
      ridingId: null,
      rentedAt: null,
      start: (ridingId, rentedAt) => set({ ridingId, rentedAt }),
      reset: () => set({ ridingId: null, rentedAt: null }),
    }),
    {
      name: 'riding-storage',
    },
  ),
)

export default useRidingStore
