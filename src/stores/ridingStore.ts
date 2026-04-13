import { create } from 'zustand'

interface RidingState {
  rentedAt: string | null
  verified: boolean
  dismissedRestore: boolean
  start: (rentedAt: string) => void
  setVerified: () => void
  reset: () => void
  dismissRestore: () => void
  allowRestore: () => void
}

const useRidingStore = create<RidingState>((set) => ({
  rentedAt: null,
  verified: false,
  dismissedRestore: false,
  start: (rentedAt) => set({ rentedAt, verified: false, dismissedRestore: false }),
  setVerified: () => set({ verified: true }),
  reset: () => set({ rentedAt: null, verified: false }),
  dismissRestore: () => set({ rentedAt: null, verified: false, dismissedRestore: true }),
  allowRestore: () => set({ dismissedRestore: false }),
}))

export default useRidingStore
