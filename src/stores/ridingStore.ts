import { create } from 'zustand'

interface RidingState {
  rentedAt: string | null
  start: (rentedAt: string) => void
  reset: () => void
}

const useRidingStore = create<RidingState>((set) => ({
  rentedAt: null,
  start: (rentedAt) => set({ rentedAt }),
  reset: () => set({ rentedAt: null }),
}))

export default useRidingStore
