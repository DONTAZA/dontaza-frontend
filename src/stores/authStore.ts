import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean | null
  login: () => void
  logout: () => void
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: null,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}))

export default useAuthStore
