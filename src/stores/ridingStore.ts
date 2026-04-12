import { create } from 'zustand'

interface RidingState {
  rentedAt: string | null
  verified: boolean
  start: (rentedAt: string) => void
  setVerified: () => void
  reset: () => void
}

const useRidingStore = create<RidingState>((set) => ({
  rentedAt: null,
  verified: false,
  start: (rentedAt) => set({ rentedAt, verified: false }),
  setVerified: () => set({ verified: true }),
  reset: () => set({ rentedAt: null, verified: false }),
}))

export default useRidingStore
